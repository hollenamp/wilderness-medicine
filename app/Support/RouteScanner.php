<?php

namespace App\Support;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class RouteScanner
{
    /**
     * Scan all registered routes and return the ones that look like
     * public-facing GET pages, excluding admin/auth/utility routes.
     *
     * @return array<int, array{name: string, uri: string}>
     */
    public static function frontendPages(): array
    {
        $pages = [];

        foreach (Route::getRoutes() as $route) {
            $name = $route->getName();

            if (! $name) {
                continue;
            }

            if (! in_array('GET', $route->methods(), true)) {
                continue;
            }

            $uri = $route->uri();

            if (Str::startsWith($uri, 'admin') || Str::startsWith($name, 'admin.')) {
                continue;
            }

            if (Str::startsWith($uri, 'auth') || Str::startsWith($name, 'auth.')) {
                continue;
            }

            if (Str::startsWith($name, 'blog.') || Str::startsWith($name, 'store.') || Str::startsWith($name, 'classes.')) {
                continue;
            }

            if (Str::contains($uri, '{')) {
                continue;
            }

            // File-like URIs (sitemap.xml, robots.txt) aren't HTML pages.
            if (Str::contains($uri, '.')) {
                continue;
            }

            if (Str::startsWith($name, 'password.') || Str::startsWith($name, 'sanctum.') || Str::startsWith($name, 'verification.')) {
                continue;
            }

            if (Str::startsWith($uri, 'sanctum') || Str::startsWith($uri, 'confirm-password') || Str::startsWith($uri, 'forgot-password') || Str::startsWith($uri, 'reset-password')) {
                continue;
            }

            if (in_array($name, ['login', 'logout', 'register', 'profile.edit', 'profile.update', 'profile.destroy', 'storage.local'], true)) {
                continue;
            }

            $pages[$name] = ['name' => $name, 'uri' => $uri];
        }

        return array_values($pages);
    }
}
