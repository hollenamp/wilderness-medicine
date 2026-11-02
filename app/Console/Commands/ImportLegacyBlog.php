<?php

namespace App\Console\Commands;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\Media;
use App\Models\Redirect;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Imports the blog archive exported from the legacy Drupal 7 site
 * (wildernessmedicine.com/blog) into blog_posts.
 *
 * Idempotent: posts are matched on slug, so re-running updates in place.
 */
class ImportLegacyBlog extends Command
{
    protected $signature = 'blog:import-legacy
                            {--file= : Path to the exported JSON (defaults to database/data/legacy-blog-posts.json)}
                            {--fresh : Delete existing imported posts before importing}
                            {--download : Re-fetch the post images/attachments from the legacy site if missing}
                            {--insecure : Skip TLS verification while downloading (the legacy host serves an incomplete certificate chain)}';

    protected $description = 'Import legacy Drupal blog posts into the blog_posts table';

    /**
     * Images that were downloaded from the legacy site into the public disk,
     * keyed by the original src as it appears in the legacy markup.
     */
    private const IMAGE_DIR = 'media';

    /**
     * Assets that posts link to (rather than embed) on the legacy site.
     * The full-size photos keep a "-full" suffix so they do not collide with
     * the thumbnails, which share a basename.
     *
     * @var array<string, string>
     */
    private const LINKED_ASSETS = [
        '/sites/wildernessmedicine.com/files/blogger_importer/s1600/photo2.jpg' => '/storage/media/photo2-full.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s1600/photo3.jpg' => '/storage/media/photo3-full.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s1600/photo4.jpg' => '/storage/media/photo4-full.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s1600/hydro%2Bpack.jpg' => '/storage/media/hydro-pack-full.jpg',
        '/sites/wildernessmedicine.com/files/WFA-SOP-Dec2012.pdf' => '/storage/files/WFA-SOP-Dec2012.pdf',
    ];

    public function handle(): int
    {
        $file = $this->option('file') ?: database_path('data/legacy-blog-posts.json');

        if (! is_file($file)) {
            $this->error("Export file not found: {$file}");

            return self::FAILURE;
        }

        $posts = json_decode((string) file_get_contents($file), true);

        if (! is_array($posts)) {
            $this->error('Export file is not valid JSON.');

            return self::FAILURE;
        }

        if ($this->option('fresh')) {
            $slugs = array_column($posts, 'slug');
            $deleted = BlogPost::whereIn('slug', $slugs)->forceDelete();
            $this->warn("Removed {$deleted} previously imported posts.");
        }

        if ($this->option('download')) {
            $this->downloadAssets();
        }

        $author = $this->resolveAuthor();
        $created = 0;
        $updated = 0;
        $missingImages = [];

        foreach ($posts as $row) {
            [$content, $featuredImageId, $missing] = $this->prepareContent($row);
            $missingImages = array_merge($missingImages, $missing);

            $existing = BlogPost::withTrashed()->where('slug', $row['slug'])->first();

            $attributes = [
                'title' => $row['title'],
                'excerpt' => $this->buildExcerpt($content),
                'content' => $content,
                'featured_image_id' => $featuredImageId,
                'status' => 'published',
                'published_at' => $row['published_at'],
                'user_id' => $author?->id,
                'meta_title' => $row['title'],
                'meta_description' => $this->buildExcerpt($content, 155),
                'canonical_url' => null,
            ];

            if ($existing) {
                $existing->restore();
                $existing->update($attributes);
                $post = $existing;
                $updated++;
            } else {
                $post = BlogPost::create($attributes + ['slug' => $row['slug']]);
                $created++;
            }

            $post->categories()->sync($this->resolveCategories($row['tags'] ?? []));

            $this->registerRedirect($row['original_url'] ?? null, $post->slug);
        }

        $this->info("Imported blog posts: {$created} created, {$updated} updated.");
        $this->info('Legacy URL redirects in place: '.Redirect::where('to_path', 'like', '/blog/%')->count().'.');

        if ($missingImages !== []) {
            $this->warn('Images referenced by posts but not available locally (left out of content):');
            foreach (array_unique($missingImages) as $src) {
                $this->line("  - {$src}");
            }
        }

        return self::SUCCESS;
    }

    /**
     * Pulls any missing archive assets from the legacy site onto the public
     * disk. Existing files are left alone so the command stays cheap to re-run.
     */
    private function downloadAssets(): void
    {
        $disk = Storage::disk('public');
        $fetched = 0;
        $skipped = 0;

        foreach (self::ASSET_MANIFEST as $legacyPath => $target) {
            if ($disk->exists($target)) {
                $skipped++;

                continue;
            }

            try {
                $request = Http::timeout(30);

                if ($this->option('insecure')) {
                    $request = $request->withoutVerifying();
                }

                $response = $request->get(self::LEGACY_HOST.$legacyPath);
            } catch (\Throwable $e) {
                $this->warn("  could not download {$legacyPath}: {$e->getMessage()}");

                continue;
            }

            if (! $response->successful() || strlen($response->body()) < 500) {
                $this->warn("  could not download {$legacyPath} (HTTP {$response->status()})");

                continue;
            }

            $disk->put($target, $response->body());
            $fetched++;
        }

        $this->info("Assets: {$fetched} downloaded, {$skipped} already present.");
    }

    /**
     * Keeps the legacy /YYYY/MM/slug permalinks working by pointing them at
     * the new /blog/slug route.
     */
    private function registerRedirect(?string $originalUrl, string $slug): void
    {
        if ($originalUrl === null || $originalUrl === '') {
            return;
        }

        $from = '/'.ltrim($originalUrl, '/');
        $to = '/blog/'.$slug;

        if ($from === $to) {
            return;
        }

        Redirect::updateOrCreate(
            ['from_path' => $from],
            ['to_path' => $to, 'status_code' => 301, 'is_active' => true]
        );
    }

    private function resolveAuthor(): ?User
    {
        return User::firstOrCreate(
            ['email' => 'carl@wildernessmedicine.com'],
            [
                'name' => 'Carl Weil',
                'password' => bcrypt(Str::random(40)),
                'admin' => false,
            ]
        );
    }

    /**
     * @param  array<int, string>  $tags
     * @return array<int, int>
     */
    private function resolveCategories(array $tags): array
    {
        $ids = [];

        foreach ($tags as $tag) {
            $name = trim($tag);

            if ($name === '') {
                continue;
            }

            $category = BlogCategory::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name]
            );

            $ids[] = $category->id;
        }

        return $ids;
    }

    /**
     * Rewrites legacy image references to locally stored media and strips
     * markup that only made sense on the old site.
     *
     * @param  array<string, mixed>  $row
     * @return array{0: string, 1: int|null, 2: array<int, string>}
     */
    private function prepareContent(array $row): array
    {
        $html = (string) $row['body_html'];
        $featuredImageId = null;
        $missing = [];

        foreach (($row['images'] ?? []) as $src) {
            $media = $this->mediaForLegacySrc($src);

            if ($media === null) {
                // The asset 404s on the legacy site too - drop the broken <img>.
                $html = $this->removeImageTag($html, $src);
                $missing[] = $src;

                continue;
            }

            $html = str_replace(
                [htmlspecialchars($src, ENT_QUOTES), $src],
                '/storage/'.self::IMAGE_DIR.'/'.$media->filename,
                $html
            );

            $featuredImageId ??= $media->id;
        }

        return [$this->tidy($html), $featuredImageId, $missing];
    }

    private function mediaForLegacySrc(string $src): ?Media
    {
        $filename = $this->localFilename($src);
        $path = self::IMAGE_DIR.'/'.$filename;

        if (! Storage::disk('public')->exists($path)) {
            return null;
        }

        return Media::firstOrCreate(
            ['path' => $path],
            [
                'uuid' => (string) Str::uuid(),
                'filename' => $filename,
                'original_name' => basename(parse_url($src, PHP_URL_PATH) ?: $filename),
                'mime_type' => Storage::disk('public')->mimeType($path) ?: 'image/jpeg',
                'extension' => pathinfo($filename, PATHINFO_EXTENSION),
                'size' => Storage::disk('public')->size($path),
                'disk' => 'public',
                'alt_text' => null,
                'url' => Storage::disk('public')->url($path),
            ]
        );
    }

    /**
     * Mirrors the naming used when the legacy assets were downloaded.
     */
    private function localFilename(string $src): string
    {
        $path = parse_url($src, PHP_URL_PATH) ?: $src;
        $base = basename($path);
        $base = str_replace(['%2B', '%20', '+', ' '], '-', $base);

        return strtolower(rawurldecode($base));
    }

    private function removeImageTag(string $html, string $src): string
    {
        $quoted = preg_quote($src, '~');
        $quotedEscaped = preg_quote(htmlspecialchars($src, ENT_QUOTES), '~');

        return (string) preg_replace(
            "~<img[^>]*src=[\"'](?:{$quoted}|{$quotedEscaped})[\"'][^>]*/?>~i",
            '',
            $html
        );
    }

    /**
     * Tags kept when sanitising. Everything else is unwrapped (its text is
     * preserved) or, for the blacklist below, removed outright.
     *
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
     * Elements removed together with their contents.
     *
     * @var array<int, string>
     */
    private const STRIPPED_TAGS = ['script', 'style', 'xml', 'link', 'meta', 'iframe', 'object', 'embed'];

    private const LEGACY_HOST = 'https://wildernessmedicine.com';

    /**
     * Every asset the archive needs, as legacy path => destination on the
     * public disk. storage/app is not tracked in git, so `--download` rebuilds
     * these on a fresh environment.
     *
     * @var array<string, string>
     */
    private const ASSET_MANIFEST = [
        '/sites/wildernessmedicine.com/files/blogger_importer/s320/photo1.jpg' => 'media/photo1.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s320/photo2.jpg' => 'media/photo2.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s320/photo3.jpg' => 'media/photo3.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s1600/photo4.jpg' => 'media/photo4.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s320/photo.JPG' => 'media/photo.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s320/Auvi-Q-epinephrine-injector%2B8-22.jpg' => 'media/auvi-q-epinephrine-injector-8-22.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s320/hydro%2Bpack.jpg' => 'media/hydro-pack.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s320/adrenaclick%2Bphoto.jpg' => 'media/adrenaclick-photo.jpg',
        '/sites/wildernessmedicine.com/files/logo_compass_rose_WALS_revised_2_color_medium.jpg' => 'media/logo_compass_rose_wals_revised_2_color_medium.jpg',
        '/sites/wildernessmedicine.com/files/TK4_medium.jpg' => 'media/tk4_medium.jpg',
        '/sites/wildernessmedicine.com/files/anakit.jpg' => 'media/anakit.jpg',
        '/sites/wildernessmedicine.com/files/WMO_Creatures_03_640x428_6.jpg' => 'media/wmo_creatures_03_640x428_6.jpg',
        '/sites/wildernessmedicine.com/files/WMO_Creatures_04.jpg' => 'media/wmo_creatures_04.jpg',
        // Full-size variants the posts link to; suffixed so they do not
        // collide with the thumbnails, which share a basename.
        '/sites/wildernessmedicine.com/files/blogger_importer/s1600/photo2.jpg' => 'media/photo2-full.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s1600/photo3.jpg' => 'media/photo3-full.jpg',
        '/sites/wildernessmedicine.com/files/blogger_importer/s1600/hydro%2Bpack.jpg' => 'media/hydro-pack-full.jpg',
        '/sites/wildernessmedicine.com/files/WFA-SOP-Dec2012.pdf' => 'files/WFA-SOP-Dec2012.pdf',
    ];

    /**
     * Normalises legacy markup: drops Drupal wrappers/attributes and makes
     * internal links relative to the new site.
     */
    private function tidy(string $html): string
    {
        // Word paste artefacts: <xml> islands and the w:/m:/o: namespaces.
        $html = preg_replace('~<!--\[if[^\]]*\]>.*?<!\[endif\]-->~is', '', $html) ?? $html;
        $html = preg_replace('~<(xml|style|script)\b[^>]*>.*?</\1>~is', '', $html) ?? $html;
        $html = preg_replace('~</?[a-z]+:[a-z0-9]+[^>]*>~i', '', $html) ?? $html;
        // RDFa / Drupal-only attributes that carry no meaning here.
        $html = preg_replace('~\s(typeof|property|datatype|rel|about|resource)="[^"]*"~i', '', $html) ?? $html;

        // Assets the posts link to were copied onto the public disk.
        foreach (self::LINKED_ASSETS as $legacy => $local) {
            $html = str_replace(
                [htmlspecialchars($legacy, ENT_QUOTES), $legacy, rawurldecode($legacy)],
                $local,
                $html
            );
        }

        // Absolute links back to the legacy host become root-relative.
        $html = str_replace(
            ['https://wildernessmedicine.com/', 'http://wildernessmedicine.com/'],
            '/',
            $html
        );

        // Collapse the whitespace Drupal's editor left behind.
        $html = preg_replace('~(\s*<br\s*/?>\s*){3,}~i', '<br /><br />', $html) ?? $html;
        $html = preg_replace('~<p>(\s|&nbsp;|<br\s*/?>)*</p>~i', '', $html) ?? $html;
        $html = preg_replace('~[ \t]{2,}~', ' ', $html) ?? $html;

        $html = $this->sanitize($html);

        // Re-run the empty-paragraph pass now that stray wrappers are gone.
        $html = preg_replace('~<p>(\s|&nbsp;|<br\s*/?>)*</p>~i', '', $html) ?? $html;

        return trim($html);
    }

    /**
     * Allowlist sanitiser. The archive is first-party content, but it was
     * scraped from HTML and carries Word/Drupal cruft, so it is reduced to a
     * known-safe tag and attribute set before it is rendered as HTML.
     */
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
        // Iterate over a snapshot: the loop mutates the live child list.
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

    /**
     * Replaces an element with its children, keeping the text intact.
     */
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
