<?php

namespace App\Support;

use App\Models\BusinessInfo;
use App\Models\Category;
use App\Models\Course;
use App\Models\Gallery;
use App\Models\Menu;
use App\Models\Page;

class PublicPageData
{
    /**
     * Build the shared Inertia props for a public CMS page.
     *
     * @return array{siteConfig: array<string, mixed>, content: array<string, mixed>, seo: array<string, mixed>|null}
     */
    public static function for(string $routeName): array
    {
        $page = Page::query()->where('route_name', $routeName)->first();

        return [
            'siteConfig' => self::siteConfig(),
            'content' => $page?->content ?? [],
            'seo' => $page ? $page->only([
                'meta_title', 'meta_description', 'og_title', 'og_description',
                'og_image', 'canonical_url', 'robots', 'structured_data',
            ]) : null,
        ];
    }

    /**
     * Build the shared site-wide config props used by every public page,
     * independent of any particular `Page` row.
     *
     * @return array<string, mixed>
     */
    public static function siteConfig(): array
    {
        $businessInfo = BusinessInfo::current();

        return [
            'site' => config('site.name'),
            'title' => config('site.title'),
            'description' => config('site.description'),
            'email' => $businessInfo->business_email ?: config('site.email'),
            'phone' => $businessInfo->business_phone,
            'phone_two' => $businessInfo->business_phone_two,
            'sms' => $businessInfo->business_sms,
            'sms_two' => $businessInfo->business_sms_two,
            'address' => $businessInfo->business_address,
            'hours' => $businessInfo->business_hours,
            'tagline' => $businessInfo->tagline,
            'logo_path' => $businessInfo->logo_path,
            'facebook_url' => $businessInfo->facebook_url,
            'instagram_url' => $businessInfo->instagram_url,
            'twitter_url' => $businessInfo->twitter_url,
            'linkedin_url' => $businessInfo->linkedin_url,
        ];
    }

    /**
     * Build Inertia props for the public gallery from the seeded "Project Gallery"
     * (and its Media/Category relations). Category tabs only include categories
     * that have images in that gallery.
     *
     * @return array{galleryCategories: array<int, array<string, mixed>>, galleryImages: array<int, array<string, mixed>>}
     */
    public static function galleryData(): array
    {
        $gallery = Gallery::query()
            ->where('name', 'Project Gallery')
            ->with('media.categories')
            ->first();

        if (! $gallery) {
            return [
                'galleryCategories' => [],
                'galleryImages' => [],
            ];
        }

        $galleryImages = $gallery->media->map(fn ($media) => [
            'id' => $media->id,
            'url' => $media->url,
            'alt_text' => $media->pivot->title ?: $media->alt_text,
            'category_ids' => $media->categories->pluck('id')->all(),
        ])->values();

        $categoryIds = $gallery->media
            ->flatMap(fn ($media) => $media->categories->pluck('id'))
            ->unique()
            ->all();

        $galleryCategories = Category::query()
            ->whereIn('id', $categoryIds)
            ->orderBy('name')
            ->get(['id', 'name']);

        return [
            'galleryCategories' => $galleryCategories,
            'galleryImages' => $galleryImages,
        ];
    }

    /**
     * Build the DB state for every menu that has a location slug. The frontend
     * navigation.ts registry decides which keys exist and whether to render
     * this or fall back to defaults — mirrored after how `content` is handed
     * to the client raw for `mergeDefaults()` to reconcile with schema.ts,
     * with no location schema knowledge here in PHP.
     *
     * @return array<string, array{isCustomized: bool, items: array<int, array<string, mixed>>}>
     */
    public static function navigation(): array
    {
        return Menu::query()
            ->whereNotNull('location')
            ->with(['items' => fn ($query) => $query->select([
                'id', 'menu_id', 'parent_id', 'type', 'url', 'label', 'sort_order',
            ])])
            ->get()
            ->mapWithKeys(fn (Menu $menu) => [
                $menu->location => [
                    'isCustomized' => (bool) $menu->is_customized,
                    'items' => $menu->items->toArray(),
                ],
            ])
            ->all();
    }

    /**
     * Published classes for the default Classes mega menu.
     *
     * @return array<int, array{title: string, href: string}>
     */
    public static function classNavItems(): array
    {
        return Course::query()
            ->published()
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get(['title', 'nav_label', 'slug'])
            ->map(fn (Course $course) => [
                'title' => $course->navLabel(),
                'href' => '/classes/'.$course->slug,
            ])
            ->all();
    }
}
