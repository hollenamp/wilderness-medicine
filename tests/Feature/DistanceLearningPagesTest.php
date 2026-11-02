<?php

use App\Http\Controllers\PageController;

beforeEach(function () {
    $this->withoutVite();
});

it('uses the original wildernessmedicine.com distance learning slugs', function (string $routeName, string $uri) {
    expect(route($routeName, absolute: false))->toBe($uri);
})->with([
    'wfa-bsa' => ['wfa-bsa', '/wfa-bsa'],
    'distance-awfa' => ['distance-awfa', '/distance-learning/awfa'],
    'distance-awfa-wfr' => ['distance-awfa-wfr', '/distance-learning/converting-awfa-wfr'],
    'distance-other' => ['distance-other', '/distance-learning/other-dl-classes'],
    'distance-promo' => ['distance-promo', '/distance-learning/promo'],
    'epi-course' => ['epi-course', '/epi-course'],
]);

it('keeps original distance learning photos, videos, and copy in page schemas', function (string $relativePath, array $needles) {
    $schema = file_get_contents(base_path($relativePath));

    expect($schema)->not->toBeFalse();

    foreach ($needles as $needle) {
        expect($schema)->toContain($needle);
    }
})->with([
    'wfa-bsa' => [
        'resources/js/Pages/Public/DistanceWfaBsa/schema.ts',
        [
            'WFA-BSA Information',
            'WFA-BSA.com',
            'Philmont Treks',
            'Northern Tier',
            'Seabase',
            'WFA TEXTO ESPAÑOL',
            'WFA 20 Hour Course',
            '12 Schools',
        ],
    ],
    'awfa' => [
        'resources/js/Pages/Public/DistanceAwfa/schema.ts',
        [
            '/images/content/distant.jpg',
            'Advanced Wilderness First Aid (AWFA)',
            '48 hr Advanced Wilderness First Aid distance learning',
            'Larry T.',
            'http://www.linkedin.com/pub/larry-tyler/7a/835/451',
            'Lesson One:',
            'Lesson Twelve:',
            '$445 tuition',
            'Clorine dioxide tabs',
            '[Click for Registration Information PDF format](/files/AWFA48-Registration2016.pdf)',
            '[Order and Pay](/product/awfa48)',
            '30 days without submitting work',
        ],
    ],
    'converting' => [
        'resources/js/Pages/Public/DistanceAwfaToWfr/schema.ts',
        [
            'Wilderness Advanced Aid First',
            'This program is designed for those who can not attend a full 9-day regular class',
            '$350 fee',
            '$400 later',
            '4- special day',
            'room and board',
        ],
    ],
    'other' => [
        'resources/js/Pages/Public/DistanceOther/schema.ts',
        [
            'Distance Learning Classes including AWFA, EPI Administration, Anaphylaxis and more!',
            'Distance Learning Courses offered',
            'Twinject',
            'Cost is $95',
            'WMO Instructors Course',
            '47 years of knowledge',
            'Backcountry water treatment',
            'Hollywood',
            'FAWM credit',
        ],
    ],
    'promo' => [
        'resources/js/Pages/Public/DistancePromo/schema.ts',
        [
            'Distance Learning Promo video',
            '/videos/WMO-DLPromo1-480x360.mp4',
        ],
    ],
    'epi' => [
        'resources/js/Pages/Public/DistanceEpi/schema.ts',
        [
            'EPI Course',
            'Twinject',
            'EpiPen',
            'white board marker',
            'level 2 and 3',
            'Learn more on the EPI page: [epi](/classes/epi)',
        ],
    ],
]);

it('stores original distance learning media in public content', function (string $relativePath) {
    expect(is_file(public_path($relativePath)))->toBeTrue();
})->with([
    'photo' => ['images/content/distant.jpg'],
    'promo' => ['videos/WMO-DLPromo1-480x360.mp4'],
    'registration' => ['files/AWFA48-Registration2016.pdf'],
]);

it('lists distance learning pages in the sitemap', function () {
    PageController::syncPages();

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();
    $response->assertSee('/wfa-bsa', false);
    $response->assertSee('/distance-learning/awfa', false);
    $response->assertSee('/distance-learning/converting-awfa-wfr', false);
    $response->assertSee('/distance-learning/other-dl-classes', false);
    $response->assertSee('/distance-learning/promo', false);
    $response->assertSee('/epi-course', false);
});

it('adds the distance learning dropdown to default navigation', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->toContain("label: 'Distance Blended Learning'")
        ->and($navigation)->toContain("href: '/wfa-bsa'")
        ->and($navigation)->toContain("href: '/distance-learning/awfa'")
        ->and($navigation)->toContain("href: '/distance-learning/converting-awfa-wfr'")
        ->and($navigation)->toContain("href: '/distance-learning/other-dl-classes'")
        ->and($navigation)->toContain("href: '/distance-learning/promo'")
        ->and($navigation)->toContain("href: '/epi-course'")
        ->and($navigation)->toContain('megaCta')
        ->and($navigation)->toContain('Train on your schedule');
});

it('hardcodes the distance learning catalog in the Distance Blended Learning mega menu', function (string $label, string $href) {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->toContain("label: '{$label}'")
        ->and($navigation)->toContain("href: '{$href}'");
})->with([
    'wfa-bsa' => ['Wilderness First Aid - Boy Scouts of America (WFA-BSA)', '/wfa-bsa'],
    'awfa' => ['Advanced Wilderness First Aid (AWFA)', '/distance-learning/awfa'],
    'awfa-wfr' => ['Converting Advanced Wilderness First Aid (AWFA) to Wilderness First Responder (WFR)', '/distance-learning/converting-awfa-wfr'],
    'other-dl' => ['Other Distance Learning (DL) Classes', '/distance-learning/other-dl-classes'],
    'promo' => ['Distance Learning (DL) Promo Video', '/distance-learning/promo'],
    'epi' => ['Epinephrine (EPI) Course', '/epi-course'],
]);

it('keeps the expert outdoor witness mega menu layout for distance learning', function () {
    $panel = file_get_contents(base_path('resources/js/Components/Sections/Navigation/mega-nav/NavMegaPanel.tsx'));

    expect($panel)->not->toBeFalse()
        ->and($panel)->toContain('lg:grid-cols-4')
        ->and($panel)->toContain('lg:col-span-3')
        ->and($panel)->toContain('bg-gradient-to-br from-charcoal-brown-900 via-charcoal-brown-950 to-charcoal-brown-950')
        ->and($panel)->toContain('item.megaCta')
        ->and($panel)->toContain('Need an outdoor expert?');
});

it('uses two-column numbered lists with a body aside like why-choose-wmo', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/DistanceAwfa/Page.tsx'));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('<NumberedListSection')
        ->and($page)->toContain('items={data.lessons.items}')
        ->and($page)->toContain('columns={2}')
        ->and($page)->toContain('bodyAside')
        ->and($page)->not->toContain('tagline={data.lessons.tagline}')
        ->and($page)->toContain('background="zinc-50"')
        ->and($page)->toContain('facts={data.package.highlights}')
        ->and($page)->toContain('asideCompact')
        ->and($page)->toContain('asideTone="forest"');
});

it('follows the why-choose-wmo sub-page section pattern', function (string $relativePath) {
    $page = file_get_contents(base_path($relativePath));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('<SubpageBannerSection')
        ->and($page)->toContain('<PageIntroSection')
        ->and($page)->toContain('background="zinc-50"')
        ->and($page)->toContain('columns={2}')
        ->and($page)->toContain('<PageCTASection')
        ->and($page)->not->toContain('ctaLabel="Call now"')
        ->and($page)->not->toContain('ctaHref=')
        ->and($page)->not->toContain('spacing="first"')
        ->and($page)->not->toContain('spacing="last"')
        ->and($page)->not->toContain('<section');
})->with([
    'wfa-bsa' => ['resources/js/Pages/Public/DistanceWfaBsa/Page.tsx'],
    'promo' => ['resources/js/Pages/Public/DistancePromo/Page.tsx'],
    'epi' => ['resources/js/Pages/Public/DistanceEpi/Page.tsx'],
]);

it('combines the awfa intro copy with the distance learning photo', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/DistanceAwfa/Page.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/DistanceAwfa/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('<SubpageBannerSection')
        ->and($page)->toContain('<MediaSplitSection')
        ->and($page)->toContain('eyebrow={data.intro.tagline}')
        ->and($page)->toContain('eyebrowPosition="media"')
        ->and($page)->toContain('title={data.intro.headline}')
        ->and($page)->toContain('titlePosition="full"')
        ->and($page)->toContain('body={data.intro.body}')
        ->and($page)->toContain('imageSrc={data.intro.image}')
        ->and($page)->toContain('layout="split"')
        ->and($page)->toContain('background="zinc-50"')
        ->and($page)->toContain('<PageCTASection')
        ->and($page)->not->toContain('<PageIntroSection')
        ->and($page)->not->toContain('data.photo')
        ->and($page)->not->toContain('ctaLabel="Call now"')
        ->and($page)->not->toContain('ctaHref=')
        ->and($page)->not->toContain('spacing="first"')
        ->and($page)->not->toContain('spacing="last"')
        ->and($page)->not->toContain('<section');

    expect($schema)->not->toBeFalse()
        ->and($schema)->toContain('/images/content/distant.jpg')
        ->and($schema)->not->toContain('The twelve lessons each representing 4 hours work. You are keeping over $150 worth of medical items.')
        ->and($schema)->not->toContain('photo:')
        ->and($schema)->not->toContain('Items you keep');
});

it('places the awfa graduate quote beside the heading without a card', function () {
    $section = file_get_contents(base_path('resources/js/Components/Sections/TestimonialWallSection.tsx'));
    $card = file_get_contents(base_path('resources/js/Components/UI/QuoteCard.tsx'));

    expect($section)->not->toBeFalse()
        ->and($section)->toContain('layout?: TestimonialWallLayout')
        ->and($section)->toContain("layout === 'split'")
        ->and($section)->toContain('md:grid-cols-2')
        ->and($section)->toContain('variant="plain"');

    expect($card)->not->toBeFalse()
        ->and($card)->toContain('variant?: QuoteCardVariant')
        ->and($card)->toContain('border-l-2 border-tea-green-500')
        ->and($card)->not->toContain('compact');
});

it('uses a single-column intro on the converting awfa to wfr page', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/DistanceAwfaToWfr/Page.tsx'));
    $intro = file_get_contents(base_path('resources/js/Components/Sections/PageIntroSection.tsx'));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('<PageIntroSection')
        ->and($page)->toContain('headline={data.intro.headline}')
        ->and($page)->toContain('tagline={data.intro.tagline}')
        ->and($page)->not->toContain('columns={2}')
        ->and($page)->not->toContain('contentWidth=');

    expect($intro)->not->toBeFalse()
        ->and($intro)->toContain('flex w-full flex-col gap-4 md:gap-6')
        ->and($intro)->not->toContain('max-w-3xl');
});

it('centers the promo video without duplicate section headings', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/DistancePromo/Page.tsx'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/MediaSplitSection.tsx'));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('<MediaSplitSection')
        ->and($page)->toContain('layout="centered"')
        ->and($page)->toContain('videoSrc={data.video.src}')
        ->and($page)->not->toContain('eyebrow={data.video.eyebrow}')
        ->and($page)->not->toContain('title={data.video.title}');

    expect($section)->not->toBeFalse()
        ->and($section)->toContain("layout === 'centered'")
        ->and($section)->toContain('max-w-3xl');
});

it('splits distance learning intro copy into two columns like why-choose-wmo', function (string $relativePath) {
    $page = file_get_contents(base_path($relativePath));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('columns={2}')
        ->and($page)->toContain('headline={data.intro.headline}');
})->with([
    'wfa-bsa' => ['resources/js/Pages/Public/DistanceWfaBsa/Page.tsx'],
    'other' => ['resources/js/Pages/Public/DistanceOther/Page.tsx'],
    'promo' => ['resources/js/Pages/Public/DistancePromo/Page.tsx'],
    'epi' => ['resources/js/Pages/Public/DistanceEpi/Page.tsx'],
]);
