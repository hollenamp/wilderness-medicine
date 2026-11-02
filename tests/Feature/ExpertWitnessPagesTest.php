<?php

use App\Http\Controllers\PageController;

beforeEach(function () {
    $this->withoutVite();
});

it('uses the original wildernessmedicine.com expert outdoor witness slugs', function (string $routeName, string $uri) {
    expect(route($routeName, absolute: false))->toBe($uri);
})->with([
    'expert-witness' => ['expert-witness', '/expert-witness'],
    'expert-climbing' => ['expert-climbing', '/expert-page-rock-climbing-gyms-traditional-climbing-and-mountaineering'],
    'expert-shooting' => ['expert-shooting', '/expert-page-shooting-activities-archery-pistol-shotgun-and-rifle'],
    'expert-horses' => ['expert-horses', '/expert-page-horses-livestock-ranches'],
    'expert-camps' => ['expert-camps', '/expert-page-camps-and-guest-ranches'],
]);

it('keeps original expert witness photos and copy in page schemas', function (string $relativePath, array $needles) {
    $schema = file_get_contents(base_path($relativePath));

    expect($schema)->not->toBeFalse();

    foreach ($needles as $needle) {
        expect($schema)->toContain($needle);
    }
})->with([
    'hub' => [
        'resources/js/Pages/Public/ExpertWitness/schema.ts',
        [
            '/images/content/carlstanding.png',
            'Expert Witness',
            'Hire Mr. Weil before you take your first opposition deposition',
            'modest zoom fees',
            '3,000 outdoor businesses',
            '**60% Plaintive and 40% Defense**',
            '38 states',
            'Joe D.',
            'James C. Plott',
            'Randy Godin',
            'Brad R. Irwin, Esq.',
            'IRWIN FRALEY, PLLC',
            "date: '2026'",
            'Attorney Letters of Recommendation',
            'indoor rock climbing case',
            'Edward J. O\\\'Brien, Esq.',
            'Walsh case',
            'Braintree, Massachusetts',
            'prepays travel costs',
            'At a glance',
            'Free initial review',
            'College Dean, retired',
            'four expert associates',
            'Registered Nurse, Paramedic, EMS Educator',
        ],
    ],
    'climbing' => [
        'resources/js/Pages/Public/ExpertClimbing/schema.ts',
        [
            '/images/content/carlinriver.png',
            'Expert Page on Rock Climbing Gyms, Traditional Climbing and Mountaineering',
            'over 400 climbing situations',
            'RC Everbeck v. Anonymous Content',
            'Randy Godin, Esq.',
            'American Mountain Guide Association',
        ],
    ],
    'shooting' => [
        'resources/js/Pages/Public/ExpertShooting/schema.ts',
        [
            '/images/content/WMO-archery400.jpg',
            'Expert Page Shooting activities Archery, Pistol, Shotgun and Rifle',
            'over 150 shooting activities',
            'Leal-Gomez',
            'James C. Plott, Esq.',
            'Adams County District Court',
        ],
    ],
    'horses' => [
        'resources/js/Pages/Public/ExpertHorses/schema.ts',
        [
            '/images/content/dad1967-400.jpg',
            'Expert Page Horses, Livestock, Ranches',
            'over 700 horse activities',
            'Capt. B.A. Weil',
            'imageCaption',
            'Britt K. Beckstrom',
            'attack by a bull',
        ],
    ],
    'camps' => [
        'resources/js/Pages/Public/ExpertCamps/schema.ts',
        [
            '/images/content/shadybrook400.jpg',
            'Expert Page on Camps and Guest Ranches',
            'over 200 camps',
            'James T Leavitt JR.',
            'injured camper',
            'Boy Scouts',
        ],
    ],
]);

it('stores original expert witness images in public content', function (string $filename) {
    expect(is_file(public_path('images/content/'.$filename)))->toBeTrue();
})->with([
    'carlstanding.png',
    'carlinriver.png',
    'dad1967-400.jpg',
    'WMO-archery400.jpg',
    'shadybrook400.jpg',
]);

it('lists expert outdoor witness pages in the sitemap', function () {
    PageController::syncPages();

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();
    $response->assertSee('/expert-witness', false);
    $response->assertSee('/expert-page-rock-climbing-gyms-traditional-climbing-and-mountaineering', false);
    $response->assertSee('/expert-page-shooting-activities-archery-pistol-shotgun-and-rifle', false);
    $response->assertSee('/expert-page-horses-livestock-ranches', false);
    $response->assertSee('/expert-page-camps-and-guest-ranches', false);
    $response->assertDontSee('<loc>'.url('/about').'</loc>', false);
    $response->assertDontSee('<loc>'.url('/reviews').'</loc>', false);
    $response->assertDontSee('<loc>'.url('/faqs').'</loc>', false);
    $response->assertDontSee('<loc>'.url('/services').'</loc>', false);
});

it('adds the expert outdoor witness dropdown to default navigation', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->toContain("label: 'Expert Outdoor Witness'")
        ->and($navigation)->toContain("href: '/expert-witness'")
        ->and($navigation)->toContain("label: 'Climbing Gyms, Rock Climbing, Mountaineering'")
        ->and($navigation)->toContain("href: '/expert-page-rock-climbing-gyms-traditional-climbing-and-mountaineering'")
        ->and($navigation)->toContain("href: '/expert-page-shooting-activities-archery-pistol-shotgun-and-rifle'")
        ->and($navigation)->toContain("label: 'Horses, Horse Events, Ranching'")
        ->and($navigation)->toContain("href: '/expert-page-horses-livestock-ranches'")
        ->and($navigation)->toContain("href: '/expert-page-camps-and-guest-ranches'")
        ->and($navigation)->toContain('Approximately 325 cases involving 40% defence clients and 60% plaintiffs');
});

it('shows expert witness recommendation letters in a three-column auto-rotating carousel', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/ExpertWitness/Page.tsx'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/TestimonialCarouselSection.tsx'));
    $carousel = file_get_contents(base_path('resources/js/Components/UI/Carousel.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/ExpertWitness/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($section)->not->toBeFalse()
        ->and($carousel)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($page)->toContain('<TestimonialCarouselSection')
        ->and($page)->not->toContain('TestimonialWallSection')
        ->and($schema)->toContain("default: 'Attorney Letters of Recommendation'")
        ->and($schema)->not->toContain("default: 'What attorneys have written'")
        ->and($schema)->not->toContain("default: 'Letters of recommendation'")
        ->and($schema)->toContain('Joe D.')
        ->and($schema)->toContain('James C. Plott')
        ->and($schema)->toContain('Randy Godin')
        ->and($schema)->toContain('Brad R. Irwin, Esq.')
        ->and($schema)->toContain("date: '2026'")
        ->and($schema)->toContain('Edward J. O\\\'Brien, Esq.')
        ->and($schema)->toContain('Walsh case')
        ->and($section)->toContain('columns={{ sm: 1, md: 2, lg: 3 }}')
        ->and($section)->toContain('autoRotateInterval={autoRotateInterval}')
        ->and($section)->toContain('controlTone="brand"')
        ->and($section)->toContain('Previous recommendation')
        ->and($section)->toContain('Next recommendation')
        ->and($section)->toContain('aria-roledescription="carousel"')
        ->and($carousel)->toContain('onMouseEnter={() => setIsHovered(true)}')
        ->and($carousel)->toContain('onMouseLeave={() => setIsHovered(false)}')
        ->and($carousel)->toContain('isHovered')
        ->and($carousel)->toContain('prevAriaLabel')
        ->and($carousel)->toContain('nextAriaLabel');
});

it('omits the practice-areas card grid from the expert witness hub', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/ExpertWitness/Page.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/ExpertWitness/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($page)->not->toContain('ServiceCardsSection')
        ->and($schema)->not->toContain('Practice areas')
        ->and($schema)->not->toContain('Outdoor recreation fields');
});

it('places the horses expert photo caption under the image', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/ExpertHorses/Page.tsx'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/StorySplitSection.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/ExpertHorses/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($section)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($schema)->toContain("default: 'Capt. B.A. Weil 4th Cav — Carl\\'s Father, 1967.'")
        ->and($schema)->not->toContain("Carl\\'s Father, 1967. Some of the various cases")
        ->and($page)->toContain('imageCaption={data.about.imageCaption}')
        ->and($page)->not->toContain('headingFullWidth')
        ->and($page)->toContain('wideCopyColumn')
        ->and($page)->toContain('imageAspect="square"')
        ->and($page)->not->toContain('squareImage')
        ->and($section)->toContain('imageCaption')
        ->and($section)->toContain('aspect-square')
        ->and($section)->toContain('aspect-video')
        ->and($section)->toContain('text-tea-green-600')
        ->and($section)->toContain('<figcaption');
});

it('places the expert witness story heading and body full width above a wider copy column', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/ExpertWitness/Page.tsx'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/StorySplitSection.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/ExpertWitness/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($section)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($schema)->toContain('**Expert Witness Main Areas:**')
        ->and($schema)->toContain('1. Rock Climbing; Gyms & Out Doors Traditional')
        ->and($schema)->toContain('7. Water Craft Accidents; Sail, Motor, Paddle')
        ->and($schema)->toContain('to testify.\\n\\nMr. Weil has reviewed')
        ->and($schema)->toContain('graduate work.\\n\\nHis field of cases')
        ->and($page)->toContain('headingFullWidth')
        ->and($section)->toContain('headingFullWidth')
        ->and($section)->toContain('bodyParagraphs')
        ->and($section)->toContain('columnParagraphs')
        ->and($section)->toContain('flex w-full flex-col')
        ->and($section)->toContain('renderParagraphs(bodyParagraphs)')
        ->and($section)->toContain('renderParagraphs(columnParagraphs)')
        ->and($section)->toContain('parseFieldsCard')
        ->and($section)->toContain('rounded-lg bg-zinc-50')
        ->and($section)->toContain('flex list-none flex-col gap-3')
        ->and($section)->toContain('font-bold text-tea-green-600')
        ->and($section)->toContain('headingFullWidth && fieldsCard')
        ->and($page)->toContain('credentialsIntro={data.about.credentialsIntro}')
        ->and($section)->toContain('credentialsIntro')
        ->and($section)->toContain('shadow-store-card')
        ->and($section)->toContain('rounded-lg bg-white p-4 shadow-store-card')
        ->and($section)->toContain('md:grid-cols-5')
        ->and($section)->toContain('md:col-span-3')
        ->and($section)->toContain('md:col-span-2')
        ->and($section)->toContain('h-128 md:h-160')
        ->and($section)->toContain('md:grid-cols-2')
        ->and($section)->toContain('h-112 md:h-144');
});

it('uses a wide photo crop on the camps expert story section', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/ExpertCamps/Page.tsx'));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('headingFullWidth')
        ->and($page)->toContain('imageAspect="wide"');
});

it('does not render a call now button on expert outdoor witness pages', function (string $relativePath) {
    $page = file_get_contents(base_path($relativePath));

    expect($page)->not->toBeFalse()
        ->and($page)->not->toContain('ctaLabel="Call now"')
        ->and($page)->not->toContain('ctaHref=');
})->with([
    'hub' => ['resources/js/Pages/Public/ExpertWitness/Page.tsx'],
    'climbing' => ['resources/js/Pages/Public/ExpertClimbing/Page.tsx'],
    'shooting' => ['resources/js/Pages/Public/ExpertShooting/Page.tsx'],
    'horses' => ['resources/js/Pages/Public/ExpertHorses/Page.tsx'],
    'camps' => ['resources/js/Pages/Public/ExpertCamps/Page.tsx'],
]);

it('sets the intro on a zinc-50 band so it separates from the white story section', function (string $relativePath) {
    $page = file_get_contents(base_path($relativePath));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('background="zinc-50"')
        ->and($page)->not->toContain('spacing="first"')
        ->and($page)->not->toContain('spacing="last"');
})->with([
    'hub' => ['resources/js/Pages/Public/ExpertWitness/Page.tsx'],
    'climbing' => ['resources/js/Pages/Public/ExpertClimbing/Page.tsx'],
    'shooting' => ['resources/js/Pages/Public/ExpertShooting/Page.tsx'],
    'horses' => ['resources/js/Pages/Public/ExpertHorses/Page.tsx'],
    'camps' => ['resources/js/Pages/Public/ExpertCamps/Page.tsx'],
]);

it('maps the zinc-50 intro background to a zinc-50 band', function () {
    $section = file_get_contents(base_path('resources/js/Components/Sections/PageIntroSection.tsx'));

    expect($section)->not->toBeFalse()
        ->and($section)->toContain("'zinc-50': 'bg-zinc-50'");
});

it('omits boilerplate pages from default navigation', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->not->toContain("href: '/about'")
        ->and($navigation)->not->toContain("href: '/reviews'")
        ->and($navigation)->not->toContain("href: '/faqs'")
        ->and($navigation)->not->toContain("href: '/services'");
});
