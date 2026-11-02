<?php

use App\Http\Controllers\PageController;
use App\Models\Page;

beforeEach(function () {
    $this->withoutVite();
});

it('reads site config from config/site.php', function () {
    config([
        'site.name' => 'Configured Site',
        'site.title' => 'Configured Title',
        'site.description' => 'Configured description',
        'site.email' => 'configured@example.com',
    ]);

    $this->get('/contact-us')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->where('siteConfig.site', 'Configured Site')
            ->where('siteConfig.title', 'Configured Title')
            ->where('siteConfig.description', 'Configured description')
            ->where('siteConfig.email', 'configured@example.com'));
});

it('renders public pages with site config', function (string $uri, string $component) {
    $response = $this->get($uri);

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component($component)
        ->has('siteConfig')
        ->has('siteConfig.site')
        ->has('siteConfig.email')
        ->has('content'));
})->with([
    'gallery' => ['/gallery', 'Public/Gallery/Page'],
    'contact' => ['/contact-us', 'Public/Contact/Page'],
    'expert-witness' => ['/expert-witness', 'Public/ExpertWitness/Page'],
    'expert-climbing' => ['/expert-page-rock-climbing-gyms-traditional-climbing-and-mountaineering', 'Public/ExpertClimbing/Page'],
    'expert-shooting' => ['/expert-page-shooting-activities-archery-pistol-shotgun-and-rifle', 'Public/ExpertShooting/Page'],
    'expert-horses' => ['/expert-page-horses-livestock-ranches', 'Public/ExpertHorses/Page'],
    'expert-camps' => ['/expert-page-camps-and-guest-ranches', 'Public/ExpertCamps/Page'],
    'resource' => ['/resource', 'Public/Resource/Page'],
    'wfa-bsa' => ['/wfa-bsa', 'Public/DistanceWfaBsa/Page'],
    'distance-awfa' => ['/distance-learning/awfa', 'Public/DistanceAwfa/Page'],
    'distance-awfa-wfr' => ['/distance-learning/converting-awfa-wfr', 'Public/DistanceAwfaToWfr/Page'],
    'distance-other' => ['/distance-learning/other-dl-classes', 'Public/DistanceOther/Page'],
    'distance-promo' => ['/distance-learning/promo', 'Public/DistancePromo/Page'],
    'epi-course' => ['/epi-course', 'Public/DistanceEpi/Page'],
    'why-choose-wmo' => ['/why-choose-wmo', 'Public/WhyChooseWmo/Page'],
    'wmo-testimonials' => ['/wmo-testimonials', 'Public/Testimonials/Page'],
    'director-carl-weil' => ['/director-carl-weil', 'Public/Director/Page'],
    'faq-page' => ['/faq-page', 'Public/CommonQuestions/Page'],
    'staff-members' => ['/staff-members', 'Public/Instructors/Page'],
    'new-students-information' => ['/new-students-information', 'Public/NewStudents/Page'],
    'under-age-21' => ['/under-age-21', 'Public/UnderAge21/Page'],
    'links' => ['/links', 'Public/Links/Page'],
    'elizabeth-wildlife' => ['/elizabeth-wildlife', 'Public/ElizabethWildlife/Page'],
    'solar-facilities' => ['/solar-facilities', 'Public/SolarFacilities/Page'],
    'why-paypal' => ['/why-paypal', 'Public/WhyPaypal/Page'],
    'to-register' => ['/to-register', 'Public/ToRegister/Page'],
    'classes-information' => ['/classes-information', 'Public/ClassesInformation/Page'],
    'survival-expo' => ['/survival-expo', 'Public/SurvivalExpo/Page'],
]);

it('redirects unused public pages to home', function (string $uri) {
    $this->get($uri)->assertRedirect('/');
})->with([
    'about' => '/about',
    'services' => '/services',
]);

it('redirects original photo pages to the combined gallery', function (string $uri) {
    $this->get($uri)->assertRedirect('/gallery');
})->with([
    'photos-1' => '/photos-page-1',
    'photos-2' => '/photos-page-2',
    'photos-3' => '/photos-page-3',
]);

it('redirects original reviews and faqs slugs to the About WMO pages', function (string $from, string $to) {
    $this->get($from)->assertRedirect($to);
})->with([
    'reviews' => ['/reviews', '/wmo-testimonials'],
    'faqs' => ['/faqs', '/faq-page'],
]);

it('removes unused public pages when syncing', function () {
    Page::query()->create([
        'route_name' => 'about',
        'title' => 'About',
        'is_visible' => true,
        'component' => 'Public/About',
    ]);

    PageController::syncPages();

    expect(Page::query()->whereIn('route_name', ['about', 'faqs', 'reviews', 'services'])->exists())->toBeFalse();
});

it('does not sync sitemap and robots as CMS pages', function () {
    Page::query()->create([
        'route_name' => 'sitemap',
        'title' => 'Sitemap',
        'is_visible' => true,
        'component' => 'Sitemap',
    ]);

    PageController::syncPages();

    expect(Page::query()->whereIn('route_name', ['sitemap', 'robots'])->exists())->toBeFalse()
        ->and(Page::query()->where('route_name', 'welcome')->exists())->toBeTrue();
});

it('syncs welcome page to the Public/Welcome component', function () {
    PageController::syncPages();

    $page = Page::query()->where('route_name', 'welcome')->first();

    expect($page)->not->toBeNull()
        ->and($page->title)->toBe('Home')
        ->and($page->component)->toBe('Public/Welcome');
});

it('syncs expert outdoor witness page titles and components', function (string $routeName, string $title, string $component) {
    PageController::syncPages();

    $page = Page::query()->where('route_name', $routeName)->first();

    expect($page)->not->toBeNull()
        ->and($page->title)->toBe($title)
        ->and($page->component)->toBe($component);
})->with([
    'expert-witness' => ['expert-witness', 'Expert Witness', 'Public/ExpertWitness'],
    'expert-climbing' => ['expert-climbing', 'Climbing - Mountaineering', 'Public/ExpertClimbing'],
    'expert-shooting' => ['expert-shooting', 'Archery, Shotguns, Rifles, and Pistols', 'Public/ExpertShooting'],
    'expert-horses' => ['expert-horses', 'Horses - Ranching', 'Public/ExpertHorses'],
    'expert-camps' => ['expert-camps', 'Camps - Guest Ranches', 'Public/ExpertCamps'],
]);

it('syncs about WMO page titles and components', function (string $routeName, string $title, string $component) {
    PageController::syncPages();

    $page = Page::query()->where('route_name', $routeName)->first();

    expect($page)->not->toBeNull()
        ->and($page->title)->toBe($title)
        ->and($page->component)->toBe($component);
})->with([
    'why-choose-wmo' => ['why-choose-wmo', 'Why choose WMO', 'Public/WhyChooseWmo'],
    'wmo-testimonials' => ['wmo-testimonials', 'Testimonials', 'Public/Testimonials'],
    'director-carl-weil' => ['director-carl-weil', 'Director', 'Public/Director'],
    'faq-page' => ['faq-page', 'Common Questions', 'Public/CommonQuestions'],
    'staff-members' => ['staff-members', 'WMO Instructors', 'Public/Instructors'],
    'gallery' => ['gallery', 'Gallery', 'Public/Gallery'],
    'new-students-information' => ['new-students-information', 'Students must Read', 'Public/NewStudents'],
    'under-age-21' => ['under-age-21', 'Under Age 21', 'Public/UnderAge21'],
    'links' => ['links', 'Links', 'Public/Links'],
    'elizabeth-wildlife' => ['elizabeth-wildlife', 'Elizabeth Wildlife', 'Public/ElizabethWildlife'],
    'solar-facilities' => ['solar-facilities', 'Solar Facilities', 'Public/SolarFacilities'],
    'why-paypal' => ['why-paypal', 'Why PayPal?', 'Public/WhyPaypal'],
]);

it('syncs distance learning page titles and components', function (string $routeName, string $title, string $component) {
    PageController::syncPages();

    $page = Page::query()->where('route_name', $routeName)->first();

    expect($page)->not->toBeNull()
        ->and($page->title)->toBe($title)
        ->and($page->component)->toBe($component);
})->with([
    'wfa-bsa' => ['wfa-bsa', 'WFA-BSA', 'Public/DistanceWfaBsa'],
    'distance-awfa' => ['distance-awfa', 'AWFA', 'Public/DistanceAwfa'],
    'distance-awfa-wfr' => ['distance-awfa-wfr', 'Converting AWFA to WFR', 'Public/DistanceAwfaToWfr'],
    'distance-other' => ['distance-other', 'Other DL Classes', 'Public/DistanceOther'],
    'distance-promo' => ['distance-promo', 'Distance Learning Promo video', 'Public/DistancePromo'],
    'epi-course' => ['epi-course', 'EPI Course', 'Public/DistanceEpi'],
]);
