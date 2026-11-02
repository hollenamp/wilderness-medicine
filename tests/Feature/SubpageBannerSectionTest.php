<?php

beforeEach(function () {
    $this->withoutVite();
});

test('subpage banner is a short interior hero using the home image aligned right', function () {
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/SubpageBannerSection.tsx');

    expect($section)->not->toBeFalse();
    expect($section)
        ->toContain("image = '/images/hero-04.webp'")
        ->toContain('object-right')
        ->toContain('bg-right')
        ->toContain('rounded-3xl')
        ->toContain('pt-24')
        ->toContain('items-end justify-start')
        ->toContain('text-left')
        ->toContain('bg-charcoal-brown-950/20')
        ->toContain('tracking-widest')
        ->toContain('whitespace-nowrap')
        ->toContain('resolveSiteLogoUrl')
        ->toContain('h-20 w-auto md:h-24 lg:h-28')
        ->toContain('pointer-events-auto absolute left-0 top-0 z-10')
        ->not->toContain('max-w-4xl')
        ->not->toContain('min-h-screen')
        ->not->toContain('max-h-screen')
        ->not->toContain('text-center');
});

test('sub-page banners match the contact banner structure', function (string $schema, string $eyebrow) {
    $contents = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/'.$schema);

    expect($contents)->not->toBeFalse();
    expect($contents)
        ->toMatch("/label: 'Hero Tagline',\s+default: '".preg_quote($eyebrow, '/')."'/")
        ->toMatch("/label: 'Hero Headline',\s+default: '".preg_quote('Wilderness Medicine Outfitters', '/')."'/")
        ->toMatch("/label: 'Hero Headline \(Line 2\)',\s+default: ''/")
        ->toMatch("/label: 'Hero Subheading',\s+default: ''/");
})->with([
    'contact' => ['Contact/schema.ts', 'contact'],
]);

test('expert outdoor witness banners use a shared eyebrow and the page name as the title', function (string $schema, string $title) {
    $contents = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/'.$schema);

    expect($contents)->not->toBeFalse();
    expect($contents)
        ->toMatch("/label: 'Hero Tagline',\s+default: 'Expert Outdoor Witness'/")
        ->toMatch("/label: 'Hero Headline',\s+default: '".preg_quote($title, '/')."'/")
        ->toMatch("/label: 'Hero Headline \(Line 2\)',\s+default: ''/")
        ->toMatch("/label: 'Hero Subheading',\s+default: ''/");
})->with([
    'expert-witness' => ['ExpertWitness/schema.ts', 'Expert Witness'],
    'expert-horses' => ['ExpertHorses/schema.ts', 'Horses - Ranching'],
    'expert-shooting' => ['ExpertShooting/schema.ts', 'Archery, Shotguns, Rifles, and Pistols'],
    'expert-climbing' => ['ExpertClimbing/schema.ts', 'Climbing - Mountaineering'],
    'expert-camps' => ['ExpertCamps/schema.ts', 'Camps - Guest Ranches'],
]);

test('distance learning banners use a shared eyebrow and the page name as the title', function (string $schema, string $title) {
    $contents = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/'.$schema);

    expect($contents)->not->toBeFalse();
    expect($contents)
        ->toMatch("/label: 'Hero Tagline',\s+default: 'Distance Learning'/")
        ->toMatch("/label: 'Hero Headline',\s+default: '".preg_quote($title, '/')."'/")
        ->toMatch("/label: 'Hero Headline \(Line 2\)',\s+default: ''/")
        ->toMatch("/label: 'Hero Subheading',\s+default: ''/");
})->with([
    'wfa-bsa' => ['DistanceWfaBsa/schema.ts', 'WFA-BSA'],
    'awfa' => ['DistanceAwfa/schema.ts', 'AWFA'],
    'converting' => ['DistanceAwfaToWfr/schema.ts', 'Converting AWFA to WFR'],
    'other' => ['DistanceOther/schema.ts', 'Other DL Classes'],
    'promo' => ['DistancePromo/schema.ts', 'Distance Learning Promo video'],
    'epi' => ['DistanceEpi/schema.ts', 'EPI Course'],
]);

test('about WMO banners use a shared eyebrow and the page name as the title', function (string $schema, string $title) {
    $contents = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/'.$schema);

    expect($contents)->not->toBeFalse();
    expect($contents)
        ->toMatch("/label: 'Hero Tagline',\s+default: 'About WMO'/")
        ->toMatch("/label: 'Hero Headline',\s+default: [\"']".preg_quote($title, '/')."[\"']/")
        ->toMatch("/label: 'Hero Headline \(Line 2\)',\s+default: ''/")
        ->toMatch("/label: 'Hero Subheading',\s+default: ''/");
})->with([
    'why-choose' => ['WhyChooseWmo/schema.ts', 'Why choose WMO'],
    'testimonials' => ['Testimonials/schema.ts', 'Testimonials'],
    'director' => ['Director/schema.ts', 'Director'],
    'questions' => ['CommonQuestions/schema.ts', 'Common Questions'],
    'instructors' => ['Instructors/schema.ts', 'WMO Instructors'],
    'gallery' => ['Gallery/schema.ts', 'Gallery'],
    'students' => ['NewStudents/schema.ts', 'Students must Read'],
    'under-age' => ['UnderAge21/schema.ts', 'Under Age 21'],
    'links' => ['Links/schema.ts', 'Links'],
    'wildlife' => ['ElizabethWildlife/schema.ts', 'Elizabeth Wildlife'],
    'solar' => ['SolarFacilities/schema.ts', 'Solar Facilities'],
    'paypal' => ['WhyPaypal/schema.ts', 'Why PayPal?'],
]);

test('resource banner uses the original page title with a resources eyebrow', function () {
    $contents = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Resource/schema.ts');

    expect($contents)->not->toBeFalse();
    expect($contents)
        ->toMatch("/label: 'Hero Tagline',\s+default: 'Resources'/")
        ->toMatch("/label: 'Hero Headline',\s+default: 'Free lessons and Resources'/")
        ->toMatch("/label: 'Hero Headline \(Line 2\)',\s+default: ''/")
        ->toMatch("/label: 'Hero Subheading',\s+default: ''/");
});

test('cms sub-pages use the subpage banner instead of the full-height hero', function (string $page) {
    $contents = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/'.$page);

    expect($contents)->not->toBeFalse();
    expect($contents)
        ->toContain("from '@/Components/Sections/Heros/SubpageBannerSection'")
        ->toContain('<SubpageBannerSection')
        ->not->toContain("from '@/Components/Sections/HeroSection'")
        ->not->toContain('<HeroSection');
})->with([
    'Public/Contact/Page.tsx',
    'Public/Gallery/Page.tsx',
    'Public/ExpertWitness/Page.tsx',
    'Public/ExpertHorses/Page.tsx',
    'Public/ExpertShooting/Page.tsx',
    'Public/ExpertClimbing/Page.tsx',
    'Public/ExpertCamps/Page.tsx',
    'Public/Resource/Page.tsx',
    'Public/DistanceWfaBsa/Page.tsx',
    'Public/DistanceAwfa/Page.tsx',
    'Public/DistanceAwfaToWfr/Page.tsx',
    'Public/DistanceOther/Page.tsx',
    'Public/DistancePromo/Page.tsx',
    'Public/DistanceEpi/Page.tsx',
    'Public/WhyChooseWmo/Page.tsx',
    'Public/Testimonials/Page.tsx',
    'Public/Director/Page.tsx',
    'Public/CommonQuestions/Page.tsx',
    'Public/Instructors/Page.tsx',
    'Public/NewStudents/Page.tsx',
    'Public/UnderAge21/Page.tsx',
    'Public/Links/Page.tsx',
    'Public/ElizabethWildlife/Page.tsx',
    'Public/SolarFacilities/Page.tsx',
    'Public/WhyPaypal/Page.tsx',
    'Collections/Blog/Index.tsx',
    'Collections/Blog/Show.tsx',
]);

test('cms sub-page schemas default the banner to the home hero image', function (string $schema) {
    $contents = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/'.$schema);

    expect($contents)->not->toBeFalse();
    expect($contents)->toMatch("/label: 'Hero Background',\s+default: '\/images\/hero-04\.webp'/");
})->with([
    'Contact/schema.ts',
    'Gallery/schema.ts',
    'ExpertWitness/schema.ts',
    'ExpertHorses/schema.ts',
    'ExpertShooting/schema.ts',
    'ExpertClimbing/schema.ts',
    'ExpertCamps/schema.ts',
    'Resource/schema.ts',
    'DistanceWfaBsa/schema.ts',
    'DistanceAwfa/schema.ts',
    'DistanceAwfaToWfr/schema.ts',
    'DistanceOther/schema.ts',
    'DistancePromo/schema.ts',
    'DistanceEpi/schema.ts',
    'WhyChooseWmo/schema.ts',
    'Testimonials/schema.ts',
    'Director/schema.ts',
    'CommonQuestions/schema.ts',
    'Instructors/schema.ts',
    'NewStudents/schema.ts',
    'UnderAge21/schema.ts',
    'Links/schema.ts',
    'ElizabethWildlife/schema.ts',
    'SolarFacilities/schema.ts',
    'WhyPaypal/schema.ts',
]);

test('home page keeps the full-height split-headline hero', function () {
    $page = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/Page.tsx');

    expect($page)->not->toBeFalse();
    expect($page)
        ->toContain('<HeroSplitHeadlineSection')
        ->not->toContain('<HeroHalfGlassSection')
        ->not->toContain('<SubpageBannerSection');
});

test('contact page shows driving directions before the contact form', function () {
    $page = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Contact/Page.tsx');
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/ContactSection.tsx');

    expect($page)->not->toBeFalse();
    expect($section)->not->toBeFalse();

    expect($page)->toContain('directionsTagline={data.directions.tagline}');
    expect($page)->not->toContain('<PageIntroSection');

    $directionsPos = strpos($section, 'id="directions"');
    $formPos = strpos($section, 'id="message"');

    expect($directionsPos)->not->toBeFalse();
    expect($formPos)->not->toBeFalse();
    expect($directionsPos)->toBeLessThan($formPos);
});

test('mobile message tab links to the contact page form', function () {
    $layout = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/layout.tsx');

    expect($layout)->not->toBeFalse();
    expect($layout)
        ->toContain("if (pathname === '/contact-us') return '/contact-us#message'")
        ->toContain("return '/contact-us'")
        ->not->toContain('/#message');
});
