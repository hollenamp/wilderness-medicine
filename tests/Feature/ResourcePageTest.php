<?php

use App\Http\Controllers\PageController;
use App\Models\Page;

beforeEach(function () {
    $this->withoutVite();
});

it('uses the original wildernessmedicine.com resource slug', function () {
    expect(route('resource', absolute: false))->toBe('/resource');
});

it('redirects the original seen-tv path to the resource page', function () {
    $this->get('/seen-tv')->assertRedirect('/resource');
});

it('redirects retired pome class urls to the resource pome section', function (string $uri) {
    $this->get($uri)->assertRedirect('/resource#pome');
})->with([
    'pome' => ['/pome'],
    'pome-evaluation' => ['/pome-evaluation'],
    'classes-pome' => ['/classes/pome'],
    'classes-pome-evaluation' => ['/classes/pome-evaluation'],
]);

it('renders the resource page with site config', function () {
    $response = $this->get('/resource');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('Public/Resource/Page')
        ->has('siteConfig')
        ->has('content'));
});

it('syncs the resource page title and component', function () {
    PageController::syncPages();

    $page = Page::query()->where('route_name', 'resource')->first();

    expect($page)->not->toBeNull()
        ->and($page->title)->toBe('Free lessons and Resources')
        ->and($page->component)->toBe('Public/Resource');
});

it('uses the original wildernessmedicine.com page title as the intro headline', function () {
    $schema = file_get_contents(base_path('resources/js/Pages/Public/Resource/schema.ts'));

    expect($schema)->not->toBeFalse()
        ->and($schema)->toMatch("/label: 'Intro Headline',\s+default: 'Free lessons and Resources'/");
});

it('keeps original resource copy, videos, and the medical algorithm in the page schema', function () {
    $schema = file_get_contents(base_path('resources/js/Pages/Public/Resource/schema.ts'));

    expect($schema)->not->toBeFalse()
        ->and($schema)->toMatch("/label: 'Intro Headline',\s+default: 'Free lessons and Resources'/")
        ->and($schema)->toContain('http://learn.wildernessmedicine.com/course/view.php?id=22')
        ->and($schema)->toContain('mailto:carl@wildernessmedicine.com')
        ->and($schema)->toContain('27 mini lessons for FREE')
        ->and($schema)->toContain("label: 'Intro Card'")
        ->and($schema)->toContain('Check out our other free Resources:')
        ->and($schema)->toMatch("/label: 'Intro Tagline',\s+default: 'Wilderness Medicine certificate available upon completion'/")
        ->and($schema)->toContain('WMO-DenverTV.mp4')
        ->and($schema)->toContain('Attn: Free Trip Tips')
        ->and($schema)->toContain('2477 County Road 132')
        ->and($schema)->toContain('preparedness prevents the necessity of requiring rescue')
        ->and($schema)->toContain('2 sacks cat litter')
        ->and($schema)->toContain('FOX TV chose Carl of WMO')
        ->and($schema)->toContain('keep hikers save on their weekend hikes')
        ->and($schema)->toContain('Katadyn water purifier tablets')
        ->and($schema)->toContain('WMO-SAMSplintForearm.mp4')
        ->and($schema)->toContain('WMO-TriangleArmSling.mp4')
        ->and($schema)->toContain('MedicalAlgorithm2016.png')
        ->and($schema)->toContain('University Student Evaluation system')
        ->and($schema)->toContain('5. Arrived to class on time making all sessions')
        ->and($schema)->toContain('0. Student did not come to class')
        ->and($schema)->toContain('Student did not come to class.')
        ->and($schema)->toContain('Professional Outdoor Medical Educators')
        ->and($schema)->toContain('helping  students')
        ->and($schema)->toContain('[POM-E.com](http://pom-e.com)');
});

it('stores original resource videos and the medical algorithm locally', function (string $relativePath) {
    expect(is_file(public_path($relativePath)))->toBeTrue();
})->with([
    'denver-tv' => ['videos/WMO-DenverTV.mp4'],
    'sam-splint' => ['videos/WMO-SAMSplintForearm.mp4'],
    'arm-sling' => ['videos/WMO-TriangleArmSling.mp4'],
    'algorithm' => ['images/content/MedicalAlgorithm2016.png'],
]);

it('lists the resource page in the sitemap', function () {
    PageController::syncPages();

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();
    $response->assertSee('/resource', false);
});

it('adds resource to default navigation', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->toContain("label: 'Resource'")
        ->and($navigation)->toContain("href: '/resource'");
});

it('follows the expert outdoor witness sub-page section pattern', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/Resource/Page.tsx'));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('<SubpageBannerSection')
        ->and($page)->toContain('<PageIntroSection')
        ->and($page)->toContain('background="zinc-50"')
        ->and($page)->toContain('<MediaSplitSection')
        ->and($page)->toContain('<TwoColumnMediaSection')
        ->and($page)->toContain('<NumberedListSection')
        ->and($page)->toContain('<FaqAccordionSection')
        ->and($page)->toContain('id="pome"')
        ->and($page)->toContain('data.pome.headline')
        ->and($page)->toContain('data.pome.body')
        ->and($page)->toContain('<PageCTASection')
        ->and($page)->not->toContain('ctaLabel="Call now"')
        ->and($page)->not->toContain('ctaHref=')
        ->and($page)->not->toContain('spacing="first"')
        ->and($page)->not->toContain('spacing="last"')
        ->and($page)->not->toContain('<section');
});

it('splits resource intro copy and auto gear list into two columns like why-choose-wmo', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/Resource/Page.tsx'));

    expect($page)->not->toBeFalse()
        ->and(substr_count($page, 'columns={2}'))->toBe(2)
        ->and($page)->toContain('tagline={data.intro.tagline}')
        ->and($page)->toContain('asideBody={data.intro.card}')
        ->and($page)->toContain('items={data.autoGear.items}');
});

it('pairs skill videos in one two-column media section', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/Resource/Page.tsx'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/TwoColumnMediaSection.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/Resource/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($section)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($page)->toContain('<TwoColumnMediaSection')
        ->and($page)->toContain('id="skill-videos"')
        ->and($page)->toContain('items={skillVideos}')
        ->and($section)->toContain('md:grid-cols-2')
        ->and($section)->toContain('<video')
        ->and($schema)->toContain('WMO-SAMSplintForearm.mp4')
        ->and($schema)->toContain('WMO-TriangleArmSling.mp4')
        ->and($schema)->toContain("label: 'Skill Videos'");
});

it('plays original lesson videos in a split media section', function () {
    $section = file_get_contents(base_path('resources/js/Components/Sections/MediaSplitSection.tsx'));

    expect($section)->not->toBeFalse()
        ->and($section)->toContain('<video')
        ->and($section)->toContain('object-contain')
        ->and($section)->toContain("from '@/Components/UI/SectionHeading'")
        ->and($section)->toContain('sectionSpacing')
        ->and($section)->toContain('titlePosition?: MediaSplitTitlePosition')
        ->and($section)->toContain("titlePosition === 'full'")
        ->and($section)->not->toContain('rounded-full');
});
