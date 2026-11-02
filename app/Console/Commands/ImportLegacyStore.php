<?php

namespace App\Console\Commands;

use App\Models\Media;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Redirect;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Imports the product catalog exported from the legacy Drupal 7 store
 * (wildernessmedicine.com/store) into products + product_categories.
 *
 * Idempotent: products are matched on slug, so re-running updates in place.
 */
class ImportLegacyStore extends Command
{
    protected $signature = 'store:import-legacy
                            {--file= : Path to the exported JSON (defaults to database/data/legacy-store.json)}
                            {--fresh : Delete existing imported products before importing}
                            {--download : Re-fetch product images from the legacy site if missing}
                            {--insecure : Skip TLS verification while downloading (the legacy host serves an incomplete certificate chain)}
                            {--scrape : Fetch the live catalog into the JSON file before importing}';

    protected $description = 'Import legacy Drupal store products into the products table';

    private const IMAGE_DIR = 'media/store';

    private const LEGACY_HOST = 'https://wildernessmedicine.com';

    private const PLACEHOLDER_PATH = 'default_images/book_uncertain_times.jpg';

    /**
     * Drupal products that are the same item listed twice. Keep the canonical slug.
     *
     * @var array<string, string>
     */
    private const SLUG_ALIASES = [
        'new-book-released-10-10-24' => 'uncertain-times',
    ];

    /**
     * @var array<int, array{name: string, slug: string, sort_order: int}>
     */
    private const CATEGORIES = [
        ['name' => 'Blended Learning', 'slug' => 'blended-learning', 'sort_order' => 0],
        ['name' => 'Distance Learning', 'slug' => 'distance-learning', 'sort_order' => 1],
        ['name' => 'In-person Classes', 'slug' => 'in-person', 'sort_order' => 2],
        ['name' => 'Books', 'slug' => 'books', 'sort_order' => 3],
        ['name' => 'Medical Kits', 'slug' => 'medical-kit', 'sort_order' => 4],
        ['name' => 'Survival Items', 'slug' => 'survival-items', 'sort_order' => 5],
        ['name' => 'Over the Counter Med Items', 'slug' => 'over-the-counter-med-items', 'sort_order' => 6],
        ['name' => 'Individual Items', 'slug' => 'individual-items', 'sort_order' => 7],
        ['name' => 'Non-Medical Items', 'slug' => 'non-medical-items', 'sort_order' => 8],
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
        $file = $this->option('file') ?: database_path('data/legacy-store.json');

        if ($this->option('scrape')) {
            $this->scrapeCatalog($file);
        }

        if (! is_file($file)) {
            $this->error("Export file not found: {$file}");

            return self::FAILURE;
        }

        $payload = json_decode((string) file_get_contents($file), true);

        if (! is_array($payload) || ! isset($payload['products'], $payload['categories'])) {
            $this->error('Export file must be JSON with categories and products keys.');

            return self::FAILURE;
        }

        if ($this->option('fresh')) {
            $slugs = array_column($payload['products'], 'slug');
            $deleted = Product::withTrashed()->whereIn('slug', $slugs)->forceDelete();
            $this->warn("Removed {$deleted} previously imported products.");
        }

        $this->seedCategories($payload['categories']);

        $created = 0;
        $updated = 0;

        foreach ($payload['products'] as $row) {
            $existing = Product::withTrashed()->where('slug', $row['slug'])->first();
            $featuredImageId = $this->featuredImageId($row);

            $attributes = [
                'title' => $row['title'],
                'excerpt' => $row['excerpt'] ?? $this->buildExcerpt((string) ($row['body_html'] ?? '')),
                'author' => Product::detectAuthor(
                    $row['excerpt'] ?? null,
                    (string) ($row['body_html'] ?? ''),
                    $row['slug'] ?? null,
                ),
                'content' => $this->tidy((string) ($row['body_html'] ?? '')),
                'price' => $row['price'] ?? null,
                'featured_image_id' => $featuredImageId,
                'status' => 'published',
                'published_at' => now()->subDay(),
                'variants' => $this->normalizeVariants($row['variants'] ?? []),
                'meta_title' => $row['title'],
                'meta_description' => Str::limit(strip_tags((string) ($row['excerpt'] ?? $row['body_html'] ?? '')), 155),
            ];

            if ($existing) {
                $existing->restore();
                $existing->update($attributes);
                $product = $existing;
                $updated++;
            } else {
                $product = Product::create($attributes + ['slug' => $row['slug']]);
                $created++;
            }

            $product->categories()->sync($this->categorySync($row['category_slugs'] ?? []));
            $this->registerRedirect($row['original_url'] ?? null, $product->slug);
        }

        $this->info("Imported store products: {$created} created, {$updated} updated.");

        return self::SUCCESS;
    }

    /**
     * @param  array<int, array<string, mixed>>  $categories
     */
    private function seedCategories(array $categories): void
    {
        foreach ($categories as $index => $row) {
            ProductCategory::updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'name' => $row['name'],
                    'description' => $row['description'] ?? null,
                    'sort_order' => $row['sort_order'] ?? $index,
                ]
            );
        }
    }

    /**
     * @param  array<int, string>  $slugs
     * @return array<int, array{sort_order: int}>
     */
    private function categorySync(array $slugs): array
    {
        $sync = [];

        foreach (array_values($slugs) as $index => $slug) {
            $category = ProductCategory::query()->where('slug', $slug)->first();

            if ($category === null) {
                continue;
            }

            $sync[$category->id] = ['sort_order' => $index];
        }

        return $sync;
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

        // Drupal reused this book cover as the store-wide fallback; skip it for
        // every product except the Uncertain Times book itself.
        if ($this->isPlaceholder($url) && ($row['slug'] ?? null) !== 'uncertain-times') {
            return null;
        }

        $filename = $this->localFilename($url);
        $path = self::IMAGE_DIR.'/'.$filename;

        if ($this->option('download') && ! Storage::disk('public')->exists($path)) {
            $this->downloadImage($url, $path);
        }

        if (! Storage::disk('public')->exists($path)) {
            return null;
        }

        $media = Media::firstOrCreate(
            ['path' => $path],
            [
                'uuid' => (string) Str::uuid(),
                'filename' => $filename,
                'original_name' => basename(parse_url($url, PHP_URL_PATH) ?: $filename),
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

            if ($this->option('insecure')) {
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

    private function isPlaceholder(string $url): bool
    {
        return str_contains($url, self::PLACEHOLDER_PATH);
    }

    private function localFilename(string $src): string
    {
        $path = parse_url($src, PHP_URL_PATH) ?: $src;
        $base = basename($path);
        $base = str_replace(['%2B', '%20', '+', ' '], '-', $base);

        return strtolower(rawurldecode($base));
    }

    /**
     * @param  array<int, mixed>  $variants
     * @return array<int, array{label: string, price: float|null}>|null
     */
    private function normalizeVariants(array $variants): ?array
    {
        $normalized = [];

        foreach ($variants as $variant) {
            if (! is_array($variant) || empty($variant['label'])) {
                continue;
            }

            $normalized[] = [
                'label' => (string) $variant['label'],
                'price' => isset($variant['price']) ? (float) $variant['price'] : null,
            ];
        }

        return $normalized === [] ? null : $normalized;
    }

    private function registerRedirect(?string $originalUrl, string $slug): void
    {
        if ($originalUrl === null || $originalUrl === '') {
            return;
        }

        $from = '/'.ltrim(parse_url($originalUrl, PHP_URL_PATH) ?: $originalUrl, '/');
        $to = '/product/'.$slug;

        if ($from === $to) {
            return;
        }

        Redirect::updateOrCreate(
            ['from_path' => $from],
            ['to_path' => $to, 'status_code' => 301, 'is_active' => true]
        );
    }

    private function scrapeCatalog(string $file): void
    {
        $this->info('Scraping the live wildernessmedicine.com store…');

        $products = [];

        foreach (self::CATEGORIES as $category) {
            $this->line("  category {$category['slug']}");
            $paths = $this->scrapeCategoryPaths($category['slug']);

            foreach ($paths as $path) {
                $canonicalSlug = $this->canonicalSlug($path);

                if (! isset($products[$canonicalSlug])) {
                    $detail = $this->scrapeProduct($path, $category['slug']);

                    if ($detail === null) {
                        continue;
                    }

                    $products[$canonicalSlug] = $detail;
                } elseif (! in_array($category['slug'], $products[$canonicalSlug]['category_slugs'], true)) {
                    $products[$canonicalSlug]['category_slugs'][] = $category['slug'];
                }
            }
        }

        $payload = [
            'categories' => array_map(fn (array $category) => [
                'name' => $category['name'],
                'slug' => $category['slug'],
                'description' => null,
                'sort_order' => $category['sort_order'],
            ], self::CATEGORIES),
            'products' => array_values($products),
        ];

        $directory = dirname($file);

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        file_put_contents($file, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        $this->info('Wrote '.count($products).' unique products to '.$file);
    }

    /**
     * @return array<int, string>
     */
    private function scrapeCategoryPaths(string $slug): array
    {
        $paths = [];
        $page = 0;

        while (true) {
            $url = self::LEGACY_HOST.'/store/'.$slug.($page > 0 ? '?page='.$page : '');
            $html = $this->fetchHtml($url);

            if ($html === null) {
                break;
            }

            $doc = $this->document($html);
            $xpath = new \DOMXPath($doc);
            $nodes = $xpath->query('//*[contains(concat(" ", normalize-space(@class), " "), " node-product-display ")]');
            $found = 0;

            if ($nodes instanceof \DOMNodeList) {
                foreach ($nodes as $node) {
                    if (! $node instanceof \DOMElement) {
                        continue;
                    }

                    $about = $node->getAttribute('about');
                    $href = $about !== '' ? $about : $this->firstHref($xpath, $node);

                    if ($href === null || $href === '') {
                        continue;
                    }

                    $path = parse_url($href, PHP_URL_PATH) ?: $href;
                    $paths[] = '/'.ltrim($path, '/');
                    $found++;
                }
            }

            $hasNext = $xpath->query('//li[contains(@class,"pager-next")]//a')->length > 0;

            if ($found === 0 || ! $hasNext) {
                break;
            }

            $page++;
        }

        return array_values(array_unique($paths));
    }

    /**
     * @return array<string, mixed>|null
     */
    private function scrapeProduct(string $path, string $categorySlug): ?array
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
            ?: $this->firstText($xpath, '//title');

        $title = trim(str_replace(' | Wilderness Medicine Outfitters', '', (string) $title));

        if ($title === '') {
            return null;
        }

        $priceText = $this->firstText($xpath, '//*[contains(concat(" ", normalize-space(@class), " "), " field-name-commerce-price ")]//*[contains(@class,"field-item")]');
        $body = $this->innerHtml($xpath, '//*[contains(@class,"view-mode-full")]//*[contains(concat(" ", normalize-space(@class), " "), " field-name-body ")]//*[contains(@class,"field-item")]')
            ?: $this->innerHtml($xpath, '//*[contains(concat(" ", normalize-space(@class), " "), " field-name-body ")]//*[contains(@class,"field-item")]');
        $image = $this->originalImageUrl(
            $this->firstAttr($xpath, '//*[contains(@class,"view-mode-full")]//*[contains(@class,"field-name-field-product-image")]//img/@src')
            ?: $this->firstAttr($xpath, '//*[contains(@class,"field-name-field-product-image")]//img/@src')
        );

        $variants = [];
        $options = $xpath->query('//select[@name="product_id"]/option');

        if ($options instanceof \DOMNodeList) {
            foreach ($options as $option) {
                if (! $option instanceof \DOMElement) {
                    continue;
                }

                $label = trim($option->textContent);

                if ($label === '') {
                    continue;
                }

                $variants[] = [
                    'label' => $label,
                    'price' => $this->parsePrice($priceText),
                ];
            }
        }

        $slug = $this->canonicalSlug($path);

        return [
            'slug' => $slug,
            'title' => $title,
            'excerpt' => $this->buildExcerpt((string) $body),
            'body_html' => $body,
            'price' => $this->parsePrice($priceText),
            'image_url' => $image,
            'category_slugs' => [$categorySlug],
            'variants' => $variants,
            'original_url' => $path,
        ];
    }

    private function canonicalSlug(string $path): string
    {
        $path = trim($path, '/');
        $slug = str_starts_with($path, 'product/') ? substr($path, strlen('product/')) : $path;
        $slug = Str::slug($slug);

        return self::SLUG_ALIASES[$slug] ?? $slug;
    }

    private function fetchHtml(string $url): ?string
    {
        try {
            $request = Http::timeout(45)->withHeaders([
                'User-Agent' => 'WildernessMedicineStoreImporter/1.0',
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

        $node = $nodes->item(0);

        return $node?->nodeValue;
    }

    private function firstHref(\DOMXPath $xpath, \DOMElement $context): ?string
    {
        $nodes = $xpath->query('.//h2//a[@href]', $context);

        if (! $nodes instanceof \DOMNodeList || $nodes->length === 0) {
            return null;
        }

        $node = $nodes->item(0);

        return $node instanceof \DOMElement ? $node->getAttribute('href') : null;
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

    private function parsePrice(?string $text): ?float
    {
        if ($text === null || $text === '') {
            return null;
        }

        if (! preg_match('/[\d,.]+/', $text, $matches)) {
            return null;
        }

        return (float) str_replace(',', '', $matches[0]);
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
