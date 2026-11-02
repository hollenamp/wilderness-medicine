<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory, SoftDeletes;

    public const AUTHOR_CARL_WEIL = 'Carl Weil';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'author',
        'content',
        'price',
        'featured_image_id',
        'status',
        'published_at',
        'variants',
        'meta_title',
        'meta_description',
        'og_title',
        'og_description',
        'og_image',
        'canonical_url',
        'robots',
        'structured_data',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'published_at' => 'datetime',
            'variants' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Product $product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->title);
            }
        });
    }

    /**
     * @param  Builder<Product>  $query
     * @return Builder<Product>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', 'published')
            ->where(fn (Builder $published) => $published
                ->whereNull('published_at')
                ->orWhere('published_at', '<=', now()));
    }

    /**
     * Known catalog authors that cannot be parsed reliably from excerpt/body alone.
     *
     * @var array<string, string|null>
     */
    private const AUTHORS_BY_SLUG = [
        'wilderness-ems-book' => self::AUTHOR_CARL_WEIL,
        'medicinal-plants-mountain-west' => 'Michael Moore',
        'medicinal-plants-desert-and-canyon-west' => 'Michael Moore',
        'wfrwemt-book-set' => null,
    ];

    /**
     * Last-name-only catalog shorthand expanded to the full author name.
     *
     * @var array<string, string>
     */
    private const AUTHOR_ALIASES = [
        'wilkerson' => 'James Wilkerson',
        'houston' => 'Charles Houston',
        'coffee' => 'Hugh Coffee',
        'wm. forgey' => 'William W. Forgey',
        'william w. forgey' => 'William W. Forgey',
    ];

    /**
     * Publisher / imprint phrases that look like "by …" attributions but are not authors.
     *
     * @var list<string>
     */
    private const AUTHOR_EXCLUSIONS = [
        'globe pequot',
        'ics',
    ];

    public static function detectAuthor(?string $excerpt, ?string $content, ?string $slug = null): ?string
    {
        if ($slug !== null && array_key_exists($slug, self::AUTHORS_BY_SLUG)) {
            return self::AUTHORS_BY_SLUG[$slug];
        }

        $text = trim(strip_tags(($excerpt ?? '').' '.($content ?? '')));

        if ($text === '') {
            return null;
        }

        if (preg_match('/\bby Carl Weil\b/i', $text)
            || preg_match('/Author:\s*Carl Weil/i', $text)
            || preg_match('/\bCARL WEIL\s*&/i', $text)) {
            return self::AUTHOR_CARL_WEIL;
        }

        if (preg_match('/\bby\s+(Wilkerson|Houston|Coffee)\b/i', $text, $matches)) {
            return self::normalizeDetectedAuthor($matches[1]);
        }

        if (preg_match(
            '/\b(?:Author:\s*|(?i)by\s+)([A-Z][a-z]+(?:\s+[A-Z]\.)?\s+[A-Z][a-z]+)(?=\s|$|\/|,)/',
            $text,
            $matches
        )) {
            return self::normalizeDetectedAuthor(trim($matches[1]));
        }

        return null;
    }

    private static function normalizeDetectedAuthor(string $author): ?string
    {
        if (stripos($author, 'Carl Weil') === 0) {
            return self::AUTHOR_CARL_WEIL;
        }

        if (in_array(strtolower($author), self::AUTHOR_EXCLUSIONS, true)) {
            return null;
        }

        return self::AUTHOR_ALIASES[strtolower($author)] ?? $author;
    }

    /**
     * SQL CASE expression that ranks Carl Weil books ahead of all others.
     */
    public static function carlWeilFirstOrderSql(): string
    {
        return 'CASE WHEN products.author = ?
            OR products.excerpt LIKE ?
            OR products.excerpt LIKE ?
            OR products.excerpt LIKE ?
            OR products.content LIKE ?
            OR products.content LIKE ?
            OR products.content LIKE ?
            OR products.slug = ?
        THEN 0 ELSE 1 END';
    }

    /**
     * @return array<int, string>
     */
    public static function carlWeilFirstOrderBindings(): array
    {
        return [
            self::AUTHOR_CARL_WEIL,
            '%by Carl Weil%',
            '%Author: Carl Weil%',
            '%CARL WEIL &%',
            '%by Carl Weil%',
            '%Author: Carl Weil%',
            '%CARL WEIL &%',
            'wilderness-ems-book',
        ];
    }

    /**
     * @return BelongsTo<Media, $this>
     */
    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_image_id');
    }

    /**
     * @return BelongsToMany<ProductCategory, $this>
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ProductCategory::class, 'product_category')
            ->withPivot('sort_order')
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }
}
