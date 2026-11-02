<?php

namespace App\Console\Commands;

use App\Models\Course;
use App\Models\Media;
use App\Models\Redirect;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Imports class description pages from the wildernessmedicine.com Classes dropdown.
 *
 * Idempotent: courses are matched on slug, so re-running updates in place.
 */
class ImportLegacyClasses extends Command
{
    protected $signature = 'classes:import-legacy
                            {--file= : Path to the exported JSON (defaults to database/data/legacy-classes.json)}
                            {--fresh : Delete existing imported classes before importing}
                            {--download : Re-fetch class images from the legacy site if missing}
                            {--insecure : Skip TLS verification while downloading (the legacy host serves an incomplete certificate chain)}
                            {--scrape : Fetch the live Classes dropdown into the JSON file before importing}';

    protected $description = 'Import legacy Drupal class pages into the courses table';

    private const IMAGE_DIR = 'media/classes';

    private const LEGACY_HOST = 'https://wildernessmedicine.com';

    /**
     * Dropdown items that are CMS pages, not class records.
     *
     * @var array<int, string>
     */
    private const SKIP_PATH_NEEDLES = [
        '/to-register',
        'november-22-2025',
        'survival-expo',
        '/pome',
        '/pome-evaluation',
    ];

    /**
     * @var array<int, string>
     */
    private const ALLOWED_TAGS = [
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li',
        'img', 'h2', 'h3', 'h4', 'blockquote', 'sup', 'sub', 'hr',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ];

    /**
     * @var array<string, array<int, string>>
     */
    private const ALLOWED_ATTRS = [
        'a' => ['href', 'target', 'rel', 'title'],
        'img' => ['src', 'alt', 'title', 'width', 'height'],
    ];

    /**
     * @var array<int, string>
     */
    private const STRIPPED_TAGS = ['script', 'style', 'xml', 'link', 'meta', 'iframe', 'object', 'embed'];

    public function handle(): int
    {
        $file = $this->option('file') ?: database_path('data/legacy-classes.json');

        if ($this->option('scrape')) {
            $this->scrapeCatalog($file);
        }

        if (! is_file($file)) {
            $this->error("Export file not found: {$file}");

            return self::FAILURE;
        }

        $payload = json_decode((string) file_get_contents($file), true);

        if (! is_array($payload) || ! isset($payload['classes']) || ! is_array($payload['classes'])) {
            $this->error('Export file must be JSON with a classes key.');

            return self::FAILURE;
        }

        if ($this->option('fresh')) {
            $slugs = array_column($payload['classes'], 'slug');
            $deleted = Course::withTrashed()->whereIn('slug', $slugs)->forceDelete();
            $this->warn("Removed {$deleted} previously imported classes.");
        }

        $created = 0;
        $updated = 0;
        $skipped = 0;

        foreach ($payload['classes'] as $row) {
            if (! is_array($row) || empty($row['slug']) || empty($row['title'])) {
                continue;
            }

            if ($this->shouldSkipPath((string) ($row['original_url'] ?? $row['slug']))) {
                $skipped++;

                continue;
            }

            $existing = Course::withTrashed()->where('slug', $row['slug'])->first();
            $featuredImageId = $this->featuredImageId($row);

            $attributes = [
                'title' => $row['title'],
                'slug' => $row['slug'],
                'nav_label' => $row['nav_label'] ?? null,
                'excerpt' => $row['excerpt'] ?? $this->buildExcerpt((string) ($row['body_html'] ?? '')),
                'content' => $this->tidy((string) ($row['body_html'] ?? '')),
                'featured_image_id' => $featuredImageId,
                'status' => 'published',
                'published_at' => $existing?->published_at ?? now(),
                'sort_order' => $row['sort_order'] ?? 0,
                'original_url' => $row['original_url'] ?? null,
            ];

            if ($existing) {
                $existing->restore();
                $existing->update($attributes);
                $updated++;
                $course = $existing;
            } else {
                $course = Course::create($attributes);
                $created++;
            }

            $this->registerRedirect($course->original_url, $course->slug);
        }

        $this->retirePomeClassPages();
        $this->registerPageRedirects();

        $this->info("Imported classes: {$created} created, {$updated} updated, {$skipped} skipped.");

        return self::SUCCESS;
    }

    public static function shouldSkipPath(string $path): bool
    {
        $normalized = '/'.ltrim(strtolower(rawurldecode($path)), '/');

        foreach (self::SKIP_PATH_NEEDLES as $needle) {
            if (str_contains($normalized, strtolower($needle))) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param  array<string, mixed>  $row
     */
    private function featuredImageId(array $row): ?int
    {
        $url = $row['image_url'] ?? null;

        if (! is_string($url) || $url === '') {
            return null;
        }

        $filename = $this->localFilename($url);
        $path = self::IMAGE_DIR.'/'.$filename;

        if (! Storage::disk('public')->exists($path) && $this->option('download')) {
            $this->downloadImage($url, $path);
        }

        if (! Storage::disk('public')->exists($path)) {
            return null;
        }

        $media = Media::query()->firstOrCreate(
            ['path' => $path],
            [
                'uuid' => (string) Str::uuid(),
                'filename' => $filename,
                'original_name' => $filename,
                'mime_type' => Storage::disk('public')->mimeType($path) ?: 'image/jpeg',
                'extension' => pathinfo($filename, PATHINFO_EXTENSION) ?: 'jpg',
                'size' => Storage::disk('public')->size($path),
                'disk' => 'public',
                'alt_text' => $row['title'] ?? null,
                'url' => Storage::disk('public')->url($path),
            ]
        );

        return $media->id;
    }

    private function downloadImage(string $url, string $path): void
    {
        try {
            $request = Http::timeout(30);

            if ($this->option('insecure') || $this->option('scrape')) {
                $request = $request->withoutVerifying();
            }

            $response = $request->get($url);
        } catch (\Throwable $e) {
            $this->warn("  could not download {$url}: {$e->getMessage()}");

            return;
        }

        if (! $response->successful() || strlen($response->body()) < 200) {
            $this->warn("  could not download {$url} (HTTP {$response->status()})");

            return;
        }

        Storage::disk('public')->put($path, $response->body());
    }

    private function localFilename(string $src): string
    {
        $path = parse_url($src, PHP_URL_PATH) ?: $src;
        $base = basename($path);
        $base = str_replace(['%2B', '%20', '+', ' '], '-', $base);

        return strtolower(rawurldecode($base));
    }

    private function registerRedirect(?string $originalUrl, string $slug): void
    {
        if ($originalUrl === null || $originalUrl === '') {
            return;
        }

        $from = '/'.ltrim(parse_url($originalUrl, PHP_URL_PATH) ?: $originalUrl, '/');
        $to = '/classes/'.$slug;

        if ($from === $to) {
            return;
        }

        Redirect::updateOrCreate(
            ['from_path' => $from],
            ['to_path' => $to, 'status_code' => 301, 'is_active' => true]
        );
    }

    private function retirePomeClassPages(): void
    {
        Course::withTrashed()->whereIn('slug', ['pome', 'pome-evaluation'])->forceDelete();
    }

    private function registerPageRedirects(): void
    {
        $encodedSurvivalPath = '/november-22-2025'.rawurldecode('%C2%A0%C2%A0').'10am-4pm'.rawurldecode('%C2%A0').'survival'.rawurldecode('%C2%A0').'expo-'.rawurldecode('%C2%A0').'free-grid-seminar-free-self-reliant'.rawurldecode('%C2%A0').'seminar-awfa'.rawurldecode('%C2%A0').'-advanced';

        Redirect::updateOrCreate(
            ['from_path' => $encodedSurvivalPath],
            ['to_path' => '/classes-information', 'status_code' => 301, 'is_active' => true]
        );

        Redirect::updateOrCreate(
            ['from_path' => '/november-22-2025%C2%A0%C2%A010am-4pm%C2%A0survival%C2%A0expo-%C2%A0free-grid-seminar-free-self-reliant%C2%A0seminar-awfa%C2%A0-advanced'],
            ['to_path' => '/classes-information', 'status_code' => 301, 'is_active' => true]
        );

        foreach (['/pome', '/classes/pome', '/pome-evaluation', '/classes/pome-evaluation'] as $fromPath) {
            Redirect::updateOrCreate(
                ['from_path' => $fromPath],
                ['to_path' => '/resource#pome', 'status_code' => 301, 'is_active' => true]
            );
        }
    }

    private function scrapeCatalog(string $file): void
    {
        $this->info('Scraping the live wildernessmedicine.com Classes dropdown…');

        $html = $this->fetchHtml(self::LEGACY_HOST.'/');

        if ($html === null) {
            $this->error('Could not fetch the homepage.');

            return;
        }

        $items = $this->parseClassesDropdown($html);
        $classes = [];
        $sortOrder = 0;

        foreach ($items as $item) {
            if ($this->shouldSkipPath($item['path'])) {
                $this->line("  skipped page {$item['path']}");

                continue;
            }

            $detail = $this->scrapeClass($item['path'], $item['label'], $sortOrder);

            if ($detail === null) {
                continue;
            }

            $classes[] = $detail;
            $sortOrder++;
        }

        $payload = ['classes' => $classes];
        $directory = dirname($file);

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        file_put_contents($file, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        $this->info('Wrote '.count($classes).' classes to '.$file);
    }

    /**
     * @return array<int, array{label: string, path: string}>
     */
    private function parseClassesDropdown(string $html): array
    {
        $doc = $this->document($html);
        $xpath = new \DOMXPath($doc);
        $links = $xpath->query('//a[contains(@class,"sf-depth-1") and normalize-space()="Classes"]/following-sibling::ul[1]//a[contains(@class,"sf-depth-2") or contains(@class,"sf-depth-3")]');
        $items = [];

        if (! $links instanceof \DOMNodeList) {
            return [];
        }

        foreach ($links as $link) {
            if (! $link instanceof \DOMElement) {
                continue;
            }

            $href = trim($link->getAttribute('href'));
            $label = trim(preg_replace('~\s+~u', ' ', $link->textContent) ?? '');

            if ($href === '' || $href === '#' || $label === '') {
                continue;
            }

            $path = parse_url($href, PHP_URL_PATH) ?: $href;
            $path = '/'.ltrim($path, '/');
            $items[] = ['label' => $label, 'path' => $path];
        }

        return $items;
    }

    /**
     * @return array<string, mixed>|null
     */
    private function scrapeClass(string $path, string $navLabel, int $sortOrder): ?array
    {
        $html = $this->fetchHtml(self::LEGACY_HOST.$path);

        if ($html === null) {
            $this->warn("  skipped {$path}");

            return null;
        }

        $doc = $this->document($html);
        $xpath = new \DOMXPath($doc);

        $title = $this->firstText($xpath, '//h1[@id="page-title"]')
            ?: $this->firstText($xpath, '//meta[@property="og:title"]/@content')
            ?: $navLabel;

        $title = trim(str_replace(' | Wilderness Medicine Outfitters', '', (string) $title));

        if ($title === '') {
            $title = $navLabel;
        }

        $body = $this->innerHtml($xpath, '//*[contains(concat(" ", normalize-space(@class), " "), " field-name-body ")]//*[contains(@class,"field-item")]');
        $image = $this->originalImageUrl(
            $this->firstAttr($xpath, '//*[contains(@class,"field-name-field-image")]//img/@src')
            ?: $this->firstAttr($xpath, '//meta[@property="og:image"]/@content')
        );

        $slug = $this->canonicalSlug($path);

        $this->line("  {$navLabel} ({$slug})");

        return [
            'title' => $title,
            'nav_label' => $navLabel,
            'slug' => $slug,
            'excerpt' => $this->buildExcerpt((string) $body),
            'body_html' => $body,
            'image_url' => $image,
            'original_url' => $path,
            'sort_order' => $sortOrder,
        ];
    }

    private function canonicalSlug(string $path): string
    {
        $path = trim(rawurldecode($path), '/');
        $path = str_replace(["\u{00A0}", ' '], '-', $path);

        return Str::slug($path);
    }

    private function fetchHtml(string $url): ?string
    {
        try {
            $request = Http::timeout(45)->withHeaders([
                'User-Agent' => 'WildernessMedicineClassesImporter/1.0',
            ]);

            if ($this->option('insecure') || $this->option('scrape')) {
                $request = $request->withoutVerifying();
            }

            $response = $request->get($url);
        } catch (\Throwable $e) {
            $this->warn("  fetch failed {$url}: {$e->getMessage()}");

            return null;
        }

        if (! $response->successful()) {
            return null;
        }

        return $response->body();
    }

    private function document(string $html): \DOMDocument
    {
        $previous = libxml_use_internal_errors(true);
        $doc = new \DOMDocument;
        $doc->loadHTML($html, LIBXML_NOERROR | LIBXML_NOWARNING);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        return $doc;
    }

    private function firstText(\DOMXPath $xpath, string $query): ?string
    {
        $nodes = $xpath->query($query);

        if (! $nodes instanceof \DOMNodeList || $nodes->length === 0) {
            return null;
        }

        return trim($nodes->item(0)?->textContent ?? '');
    }

    private function firstAttr(\DOMXPath $xpath, string $query): ?string
    {
        $nodes = $xpath->query($query);

        if (! $nodes instanceof \DOMNodeList || $nodes->length === 0) {
            return null;
        }

        return $nodes->item(0)?->nodeValue;
    }

    private function innerHtml(\DOMXPath $xpath, string $query): string
    {
        $nodes = $xpath->query($query);

        if (! $nodes instanceof \DOMNodeList || $nodes->length === 0) {
            return '';
        }

        $node = $nodes->item(0);

        if (! $node instanceof \DOMElement) {
            return trim($node?->textContent ?? '');
        }

        $html = '';

        foreach ($node->childNodes as $child) {
            $html .= $node->ownerDocument?->saveHTML($child) ?? '';
        }

        return trim($html);
    }

    private function originalImageUrl(?string $src): ?string
    {
        if ($src === null || $src === '') {
            return null;
        }

        $src = preg_replace('~[?].*$~', '', $src) ?? $src;
        $src = str_replace('/styles/medium/public/', '/', $src);

        if (str_starts_with($src, '//')) {
            $src = 'https:'.$src;
        } elseif (str_starts_with($src, '/')) {
            $src = self::LEGACY_HOST.$src;
        }

        return $src;
    }

    private function tidy(string $html): string
    {
        $html = preg_replace('~<!--\[if[^\]]*\]>.*?<!\[endif\]-->~is', '', $html) ?? $html;
        $html = preg_replace('~<(xml|style|script)\b[^>]*>.*?</\1>~is', '', $html) ?? $html;
        $html = preg_replace('~</?[a-z]+:[a-z0-9]+[^>]*>~i', '', $html) ?? $html;
        $html = preg_replace('~\s(typeof|property|datatype|rel|about|resource)="[^"]*"~i', '', $html) ?? $html;
        $html = str_replace(
            ['https://wildernessmedicine.com/', 'http://wildernessmedicine.com/'],
            '/',
            $html
        );
        $html = preg_replace('~(\s*<br\s*/?>\s*){3,}~i', '<br /><br />', $html) ?? $html;
        $html = preg_replace('~<p>(\s|&nbsp;|<br\s*/?>)*</p>~i', '', $html) ?? $html;
        $html = $this->sanitize($html);
        $html = preg_replace('~<p>(\s|&nbsp;|<br\s*/?>)*</p>~i', '', $html) ?? $html;

        return trim($html);
    }

    private function sanitize(string $html): string
    {
        if (trim($html) === '') {
            return '';
        }

        $previous = libxml_use_internal_errors(true);
        $doc = new \DOMDocument;
        $doc->loadHTML(
            '<?xml encoding="utf-8" ?><div id="__root">'.$html.'</div>',
            LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED
        );
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        $root = $doc->getElementById('__root');

        if (! $root instanceof \DOMElement) {
            return strip_tags($html, '<p><br><strong><em><a><ul><li><img>');
        }

        $this->sanitizeNode($root);

        $out = '';

        foreach ($root->childNodes as $child) {
            $out .= $doc->saveHTML($child);
        }

        return $out;
    }

    private function sanitizeNode(\DOMNode $node): void
    {
        foreach (iterator_to_array($node->childNodes) as $child) {
            if ($child instanceof \DOMComment) {
                $child->parentNode?->removeChild($child);

                continue;
            }

            if (! $child instanceof \DOMElement) {
                continue;
            }

            $tag = strtolower($child->tagName);

            if (in_array($tag, self::STRIPPED_TAGS, true)) {
                $child->parentNode?->removeChild($child);

                continue;
            }

            $this->sanitizeNode($child);

            if (! in_array($tag, self::ALLOWED_TAGS, true)) {
                $this->unwrap($child);

                continue;
            }

            $allowed = self::ALLOWED_ATTRS[$tag] ?? [];

            foreach (iterator_to_array($child->attributes) as $attr) {
                if (! in_array(strtolower($attr->nodeName), $allowed, true)) {
                    $child->removeAttribute($attr->nodeName);
                }
            }

            if ($tag === 'a') {
                $href = trim($child->getAttribute('href'));

                if (preg_match('~^\s*(javascript|data|vbscript):~i', $href)) {
                    $child->removeAttribute('href');
                } elseif ($child->getAttribute('target') === '_blank') {
                    $child->setAttribute('rel', 'noopener noreferrer');
                }
            }
        }
    }

    private function unwrap(\DOMElement $element): void
    {
        $parent = $element->parentNode;

        if ($parent === null) {
            return;
        }

        while ($element->firstChild !== null) {
            $parent->insertBefore($element->firstChild, $element);
        }

        $parent->removeChild($element);
    }

    private function buildExcerpt(string $html, int $length = 200): string
    {
        $text = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = trim(preg_replace('~\s+~u', ' ', $text) ?? '');

        return Str::limit($text, $length);
    }
}
