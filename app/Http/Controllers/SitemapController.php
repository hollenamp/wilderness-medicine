<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Course;
use App\Models\Page;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Support\RouteScanner;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class SitemapController extends Controller
{
    /**
     * Live pages deliberately kept out of the sitemap (pulled from the nav by the client).
     */
    private const EXCLUDED_ROUTES = [
        'survival-expo',
    ];

    public function sitemap(): Response
    {
        $routeNames = collect(RouteScanner::frontendPages())
            ->pluck('name')
            ->reject(fn (string $name) => in_array($name, self::EXCLUDED_ROUTES, true));

        $pages = Page::query()->whereIn('route_name', $routeNames)->get()->keyBy('route_name');

        $urls = [];

        foreach ($routeNames as $routeName) {
            $page = $pages->get($routeName);

            if ($page && $this->isNoIndex($page->robots)) {
                continue;
            }

            $urls[] = [
                'loc' => route($routeName),
                'lastmod' => $page?->updated_at,
            ];
        }

        $urls[] = ['loc' => route('blog.index'), 'lastmod' => null];
        $urls[] = ['loc' => route('store.index'), 'lastmod' => null];
        $urls[] = ['loc' => route('classes.index'), 'lastmod' => null];

        $posts = BlogPost::query()
            ->where('status', 'published')
            ->where(fn ($query) => $query->whereNull('published_at')->orWhere('published_at', '<=', now()))
            ->get(['slug', 'robots', 'updated_at']);

        foreach ($posts as $post) {
            if ($this->isNoIndex($post->robots)) {
                continue;
            }

            $urls[] = [
                'loc' => route('blog.show', $post->slug),
                'lastmod' => $post->updated_at,
            ];
        }

        $courses = Course::query()
            ->published()
            ->get(['slug', 'robots', 'updated_at']);

        foreach ($courses as $course) {
            if ($this->isNoIndex($course->robots)) {
                continue;
            }

            $urls[] = [
                'loc' => route('classes.show', $course->slug),
                'lastmod' => $course->updated_at,
            ];
        }

        $categories = ProductCategory::query()->orderBy('sort_order')->get(['slug', 'updated_at']);

        foreach ($categories as $category) {
            $urls[] = [
                'loc' => route('store.category', $category->slug),
                'lastmod' => $category->updated_at,
            ];
        }

        $products = Product::query()
            ->published()
            ->get(['slug', 'robots', 'updated_at']);

        foreach ($products as $product) {
            if ($this->isNoIndex($product->robots)) {
                continue;
            }

            $urls[] = [
                'loc' => route('store.show', $product->slug),
                'lastmod' => $product->updated_at,
            ];
        }

        return response()
            ->view('sitemap', ['urls' => $urls])
            ->header('Content-Type', 'application/xml');
    }

    public function robots(): Response
    {
        $lines = app()->environment('production')
            ? [
                'User-agent: *',
                'Disallow: /admin',
                'Disallow: /profile',
                '',
                'Sitemap: '.route('sitemap'),
            ]
            : [
                'User-agent: *',
                'Disallow: /',
            ];

        return response(implode("\n", $lines))
            ->header('Content-Type', 'text/plain');
    }

    private function isNoIndex(?string $robots): bool
    {
        return $robots !== null && Str::contains($robots, 'noindex');
    }
}
