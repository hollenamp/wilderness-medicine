<?php

use App\Http\Controllers\PageController;

beforeEach(function () {
    $this->withoutVite();
});

it('uses the original wildernessmedicine.com about WMO slugs', function (string $routeName, string $uri) {
    expect(route($routeName, absolute: false))->toBe($uri);
})->with([
    'why-choose-wmo' => ['why-choose-wmo', '/why-choose-wmo'],
    'wmo-testimonials' => ['wmo-testimonials', '/wmo-testimonials'],
    'director-carl-weil' => ['director-carl-weil', '/director-carl-weil'],
    'faq-page' => ['faq-page', '/faq-page'],
    'staff-members' => ['staff-members', '/staff-members'],
    'gallery' => ['gallery', '/gallery'],
    'new-students-information' => ['new-students-information', '/new-students-information'],
    'under-age-21' => ['under-age-21', '/under-age-21'],
    'links' => ['links', '/links'],
    'elizabeth-wildlife' => ['elizabeth-wildlife', '/elizabeth-wildlife'],
    'solar-facilities' => ['solar-facilities', '/solar-facilities'],
    'why-paypal' => ['why-paypal', '/why-paypal'],
    'contact' => ['contact', '/contact-us'],
]);

it('keeps original about WMO photos, files, and copy in page schemas', function (string $relativePath, array $needles) {
    $schema = file_get_contents(base_path($relativePath));

    expect($schema)->not->toBeFalse();

    foreach ($needles as $needle) {
        expect($schema)->toContain($needle);
    }
})->with([
    'why-choose' => [
        'resources/js/Pages/Public/WhyChooseWmo/schema.ts',
        [
            'WMO answers yes to all 30 of the following quality determination questions',
            'You can recertify your WMO WFR almost anywhere',
            '[Professional Outdoor Medical Educators](/resource#pome)',
            '[Carl Weil](/director-carl-weil)',
            '++**NO OTHER SCHOOL MATCHES THAT**++',
            'These quality determination questions are from [Professional Outdoor Medical Educators (POME)](/resource#pome).',
            'Is training recognized in writing by at least 3 state or national sources?',
            'Do all instructors have a least 5 hours biannual instructional skills training?',
            'yes answers to 27 out of the 30 questions',
        ],
    ],
    'testimonials' => [
        'resources/js/Pages/Public/Testimonials/schema.ts',
        [
            '/images/content/MarineLetter.jpg',
            'BRUCE D. PARTINGTON',
            'Heather Mohr',
            'Honolulu, Hawaii',
            'Paul Nicolazzo',
            'Shawn Hostetter',
            'Katadyn CEO',
        ],
    ],
    'director' => [
        'resources/js/Pages/Public/Director/schema.ts',
        [
            '/images/content/carlstanding.png',
            'Nationally Registered EMT',
            'EARLY WMO HISTORY',
            'Sandy Long and Allan Duckworth',
            'Master Fellow',
        ],
    ],
    'questions' => [
        'resources/js/Pages/Public/CommonQuestions/schema.ts',
        [
            'WFR or WEMT  which and why?',
            'Class size is limited to 24 students.',
            'Are Scholarships available?',
            'Lilly Bell Fox Weil',
        ],
    ],
    'instructors' => [
        'resources/js/Pages/Public/Instructors/schema.ts',
        [
            'Wilderness Medicine Outfitters Staff Members',
            'Prevention - Assessment - Treatment',
            'Steve Anderson - WEMT',
            'Dr. John Fedack',
            'Instructor Certifications',
        ],
    ],
    'gallery' => [
        'resources/js/Pages/Public/Gallery/schema.ts',
        [
            '/images/content/CARL.jpg',
            '/images/content/MarinesClass1.jpg',
            '/images/content/WinterClass10000_250.png',
            'Director Carl Weil',
            'Class Photos',
            'Wilderness First Responder students learning',
        ],
    ],
    'students' => [
        'resources/js/Pages/Public/NewStudents/schema.ts',
        [
            'PROFESSIONAL RESCUER CPR is required for WFR/WEMT',
            '/files/AWFA48-Registration2016.pdf',
            '/files/house.doc',
            '/files/under21.doc',
        ],
    ],
    'under-age' => [
        'resources/js/Pages/Public/UnderAge21/schema.ts',
        [
            'Parental Acknowledgement and Release',
            'for Minors Wishing to Participate in WMO Classes',
            'WMO offers education only not custodial supervision',
            'life threatening issue history',
        ],
    ],
    'links' => [
        'resources/js/Pages/Public/Links/schema.ts',
        [
            'Gunjitsu.com - Advanced pistol training',
            'http://www.wms.org',
            'American Mountain Guides Association',
            'http://amga.com',
        ],
    ],
    'wildlife' => [
        'resources/js/Pages/Public/ElizabethWildlife/schema.ts',
        [
            '/images/content/hawk.jpg',
            '/images/content/DeerClose3.jpg',
            'Smart deer hiding in the WMO target range',
        ],
    ],
    'solar' => [
        'resources/js/Pages/Public/SolarFacilities/schema.ts',
        [
            '/images/content/WMOSign.jpg',
            '/images/content/Solar7.jpg',
            'Phase Change Water Heater',
            'Solar Tracker',
        ],
    ],
    'paypal' => [
        'resources/js/Pages/Public/WhyPaypal/schema.ts',
        [
            'Why does WMO use PayPal?',
            'You DO NOT have to create a PayPal account',
            'Carl Weil - Director',
        ],
    ],
]);

it('omits the gallery eyebrow, combined-photos description, and PracticingPassing photo', function () {
    $schema = file_get_contents(base_path('resources/js/Pages/Public/Gallery/schema.ts'));

    expect($schema)->not->toBeFalse()
        ->and($schema)->toContain("label: 'Gallery Eyebrow',\n            default: ''")
        ->and($schema)->toContain("label: 'Gallery Description',\n            default: ''")
        ->and($schema)->not->toContain('Class photos from Wilderness Medicine Outfitters courses, combined from the original Photos pages 1–3.')
        ->and($schema)->not->toContain('PracticingPassing_250.jpg');
});

it('places numbered titles under gallery photos', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/Gallery/Page.tsx'));
    $gallery = file_get_contents(base_path('resources/js/Components/UI/Gallery.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/Gallery/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($gallery)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($schema)->toContain("title: field.text({ label: 'Title', default: '' })")
        ->and(substr_count($schema, 'src: "'))->toBeGreaterThan(0)
        ->and(substr_count($schema, 'title: "'))->toBe(substr_count($schema, 'src: "'))
        ->and($page)->toContain('title: item.title.trim() || `Photo ${index + 1}`')
        ->and($gallery)->toContain('title?: string')
        ->and($gallery)->toContain('<figcaption')
        ->and($gallery)->toContain('{title}');
});

it('stores original about WMO media in public content', function (string $relativePath) {
    expect(is_file(public_path($relativePath)))->toBeTrue();
})->with([
    'carl' => ['images/content/CARL.jpg'],
    'marines' => ['images/content/MarinesClass1.jpg'],
    'winter' => ['images/content/WinterClass10000_250.png'],
    'letter' => ['images/content/MarineLetter.jpg'],
    'hawk' => ['images/content/hawk.jpg'],
    'solar' => ['images/content/Solar1.jpg'],
    'registration' => ['files/AWFA48-Registration2016.pdf'],
    'under21' => ['files/under21.doc'],
]);

it('lists about WMO pages in the sitemap', function () {
    PageController::syncPages();

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();
    $response->assertSee('/why-choose-wmo', false);
    $response->assertSee('/wmo-testimonials', false);
    $response->assertSee('/director-carl-weil', false);
    $response->assertSee('/faq-page', false);
    $response->assertSee('/staff-members', false);
    $response->assertSee('/gallery', false);
    $response->assertSee('/new-students-information', false);
    $response->assertSee('/under-age-21', false);
    $response->assertSee('/links', false);
    $response->assertSee('/elizabeth-wildlife', false);
    $response->assertSee('/solar-facilities', false);
    $response->assertSee('/why-paypal', false);
    $response->assertDontSee('/photos-page-1', false);
    $response->assertDontSee('/photos-page-2', false);
    $response->assertDontSee('/photos-page-3', false);
});

it('adds the about WMO dropdown to default navigation', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->toContain("label: 'About WMO'")
        ->and($navigation)->toContain("href: '/why-choose-wmo'")
        ->and($navigation)->toContain("href: '/contact-us'")
        ->and($navigation)->toContain("href: '/wmo-testimonials'")
        ->and($navigation)->toContain("href: '/director-carl-weil'")
        ->and($navigation)->toContain("href: '/faq-page'")
        ->and($navigation)->toContain("href: '/staff-members'")
        ->and($navigation)->toContain("href: '/gallery'")
        ->and($navigation)->toContain("href: '/new-students-information'")
        ->and($navigation)->toContain("href: '/under-age-21'")
        ->and($navigation)->toContain("href: '/links'")
        ->and($navigation)->toContain("href: '/elizabeth-wildlife'")
        ->and($navigation)->toContain("href: '/solar-facilities'")
        ->and($navigation)->toContain("href: '/why-paypal'")
        ->and($navigation)->not->toContain("href: '/photos-page-1'")
        ->and($navigation)->not->toContain("href: '/photos-page-2'")
        ->and($navigation)->not->toContain("href: '/photos-page-3'")
        ->and($navigation)->toContain('megaCta')
        ->and($navigation)->toContain('The oldest wilderness medicine school');
});

it('keeps the expert outdoor witness mega menu layout for about WMO', function () {
    $panel = file_get_contents(base_path('resources/js/Components/Sections/Navigation/mega-nav/NavMegaPanel.tsx'));

    expect($panel)->not->toBeFalse()
        ->and($panel)->toContain('lg:grid-cols-4')
        ->and($panel)->toContain('lg:col-span-3')
        ->and($panel)->toContain('bg-gradient-to-br from-charcoal-brown-900 via-charcoal-brown-950 to-charcoal-brown-950')
        ->and($panel)->toContain('item.megaCta');
});

it('follows the expert outdoor witness sub-page section pattern', function (string $relativePath) {
    $page = file_get_contents(base_path($relativePath));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('<SubpageBannerSection')
        ->and($page)->toContain('<PageCTASection')
        ->and($page)->not->toContain('ctaLabel="Call now"')
        ->and($page)->not->toContain('ctaHref=')
        ->and($page)->not->toContain('spacing="first"')
        ->and($page)->not->toContain('spacing="last"');
})->with([
    'why-choose' => ['resources/js/Pages/Public/WhyChooseWmo/Page.tsx'],
    'testimonials' => ['resources/js/Pages/Public/Testimonials/Page.tsx'],
    'director' => ['resources/js/Pages/Public/Director/Page.tsx'],
    'questions' => ['resources/js/Pages/Public/CommonQuestions/Page.tsx'],
    'instructors' => ['resources/js/Pages/Public/Instructors/Page.tsx'],
    'gallery' => ['resources/js/Pages/Public/Gallery/Page.tsx'],
    'students' => ['resources/js/Pages/Public/NewStudents/Page.tsx'],
    'under-age' => ['resources/js/Pages/Public/UnderAge21/Page.tsx'],
    'links' => ['resources/js/Pages/Public/Links/Page.tsx'],
    'wildlife' => ['resources/js/Pages/Public/ElizabethWildlife/Page.tsx'],
    'solar' => ['resources/js/Pages/Public/SolarFacilities/Page.tsx'],
    'paypal' => ['resources/js/Pages/Public/WhyPaypal/Page.tsx'],
]);

it('renders common questions as a full-width accordion without a title block', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/CommonQuestions/Page.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/CommonQuestions/schema.ts'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/FaqAccordionSection.tsx'));

    expect($page)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($section)->not->toBeFalse()
        ->and($page)->toContain('layout="stack"')
        ->and($page)->not->toContain('eyebrow={')
        ->and($page)->not->toContain('heading={data.faqs')
        ->and($page)->not->toContain('intro={data.faqs')
        ->and($schema)->not->toContain('FAQs Eyebrow')
        ->and($schema)->not->toContain('FAQs Heading')
        ->and($schema)->not->toContain('camping at Elizabeth')
        ->and($section)->toContain('const hasHeader = Boolean(eyebrow || heading || headingLine2 || intro)');
});

it('splits why-choose intro copy and quality questions into two columns', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/WhyChooseWmo/Page.tsx'));
    $intro = file_get_contents(base_path('resources/js/Components/Sections/PageIntroSection.tsx'));
    $list = file_get_contents(base_path('resources/js/Components/Sections/NumberedListSection.tsx'));

    expect($page)->not->toBeFalse()
        ->and($intro)->not->toBeFalse()
        ->and($list)->not->toBeFalse()
        ->and(substr_count($page, 'columns={2}'))->toBe(2)
        ->and($intro)->toContain('md:grid-cols-2')
        ->and($intro)->toContain('bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950')
        ->and($intro)->toContain('md:sticky md:top-28')
        ->and($intro)->toContain('text-tea-green-400')
        ->and($intro)->toContain('Math.floor(paragraphs.length / 5)')
        ->and($intro)->toContain('asideBody')
        ->and($intro)->toContain('styleAsideAsTagline')
        ->and($list)->toContain('md:grid-cols-2')
        ->and($list)->toContain('start={firstColumnItems.length + 1}')
        ->and($list)->toContain('bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950')
        ->and($list)->toContain('bodyAside')
        ->and($intro)->toContain("from '@/Components/UI/FormattedText'")
        ->and($list)->toContain("from '@/Components/UI/FormattedText'");
});
