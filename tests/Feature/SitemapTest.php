<?php

use App\Http\Controllers\PageController;
use App\Models\Page;
use App\Support\RouteScanner;

beforeEach(function () {
    PageController::syncPages();
});

it('lists every frontend page route except deliberately excluded ones', function () {
    $response = $this->get('/sitemap.xml')->assertSuccessful();

    foreach (RouteScanner::frontendPages() as $route) {
        if ($route['name'] === 'survival-expo') {
            continue;
        }

        $response->assertSee('<loc>'.route($route['name']).'</loc>', false);
    }

    $response->assertDontSee('<loc>'.route('survival-expo').'</loc>', false);
});

it('lists a page hidden from the admin pages list', function () {
    Page::query()->where('route_name', 'links')->update(['is_visible' => false, 'robots' => null]);

    $this->get('/sitemap.xml')
        ->assertSuccessful()
        ->assertSee('<loc>'.route('links').'</loc>', false);
});

it('leaves out a page whose robots contains noindex', function () {
    Page::query()->where('route_name', 'links')->update(['robots' => 'noindex, follow']);

    $this->get('/sitemap.xml')
        ->assertSuccessful()
        ->assertDontSee('<loc>'.route('links').'</loc>', false);
});
