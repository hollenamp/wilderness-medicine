<?php

use App\Support\SiteLogo;

test('site logo resolver maps retired wm logo paths to the current default', function () {
    expect(SiteLogo::resolve('/images/wm-logo.png'))
        ->toBe(SiteLogo::DEFAULT_PATH)
        ->and(SiteLogo::resolve('images/wm-logo.png'))
        ->toBe(SiteLogo::DEFAULT_PATH);
});

test('site logo resolver keeps custom paths and falls back when empty', function () {
    expect(SiteLogo::resolve('/images/custom-logo.png'))
        ->toBe('/images/custom-logo.png')
        ->and(SiteLogo::resolve(''))
        ->toBe(SiteLogo::DEFAULT_PATH)
        ->and(SiteLogo::resolve(null))
        ->toBe(SiteLogo::DEFAULT_PATH);
});

test('site logo remapper updates saved welcome hero logo content', function () {
    $content = SiteLogo::remapPageContent([
        'hero' => [
            'logo' => '/images/wm-logo.png',
        ],
    ]);

    expect($content['hero']['logo'])->toBe(SiteLogo::DEFAULT_PATH);
});
