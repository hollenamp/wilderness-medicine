<?php

beforeEach(function () {
    $this->withoutVite();
});

test('welcome page renders with site config', function () {
    $response = $this->get('/');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('Public/Welcome/Page')
        ->has('siteConfig')
        ->has('siteConfig.site')
        ->has('siteConfig.email')
        ->has('siteConfig.description')
        ->has('siteConfig.address')
        ->has('content'));
});
