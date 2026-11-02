<?php

use App\Http\Controllers\PageController;
use App\Models\Page;

beforeEach(function () {
    $this->withoutVite();
});

it('uses the original wildernessmedicine.com class page slugs', function (string $routeName, string $uri) {
    expect(route($routeName, absolute: false))->toBe($uri);
})->with([
    'to-register' => ['to-register', '/to-register'],
    'classes-information' => ['classes-information', '/classes-information'],
    'survival-expo' => ['survival-expo', '/survival-expo'],
]);

it('renders the class CMS pages with site config', function (string $uri, string $component) {
    $response = $this->get($uri);

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component($component)
        ->has('siteConfig')
        ->has('content'));
})->with([
    'to-register' => ['/to-register', 'Public/ToRegister/Page'],
    'classes-information' => ['/classes-information', 'Public/ClassesInformation/Page'],
    'survival-expo' => ['/survival-expo', 'Public/SurvivalExpo/Page'],
]);

it('keeps original to-register and survival expo copy in page schemas', function (string $relativePath, array $needles) {
    $schema = file_get_contents(base_path($relativePath));

    expect($schema)->not->toBeFalse();

    foreach ($needles as $needle) {
        expect($schema)->toContain($needle);
    }
})->with([
    'to-register' => [
        'resources/js/Pages/Public/ToRegister/schema.ts',
        [
            'To Register: transfer funds and call',
            '2477 Co Rd 132, Elizabeth CO 80107',
            'PayPal',
            'WFR/WEMT 76 hr',
            'carl@wildernessmedicine.com',
        ],
    ],
    'classes-information' => [
        'resources/js/Pages/Public/ClassesInformation/schema.ts',
        [
            'WMO Mission',
            'What Makes WMO Unusual',
            '[See a list of our qualified instructors](/staff-members)',
            '[View class details](/classes/wfr)',
            '[View class details](/classes/awfa)',
            'University Student Evaluation system adopted by WMO 2003-',
            '[(303) 688-5176](tel:+13036885176)',
        ],
    ],
    'survival-expo' => [
        'resources/js/Pages/Public/SurvivalExpo/schema.ts',
        [
            'Survival Expo',
            'November 22, 2025',
            'Jefferson County Fairgrounds',
            'Golden, Colorado',
            'Free off-grid seminar',
        ],
    ],
]);

it('syncs class CMS page titles and components', function (string $routeName, string $title, string $component) {
    PageController::syncPages();

    $page = Page::query()->where('route_name', $routeName)->first();

    expect($page)->not->toBeNull()
        ->and($page->title)->toBe($title)
        ->and($page->component)->toBe($component);
})->with([
    'to-register' => ['to-register', 'To Register', 'Public/ToRegister'],
    'classes-information' => ['classes-information', 'Class Information', 'Public/ClassesInformation'],
    'survival-expo' => ['survival-expo', 'Survival Expo', 'Public/SurvivalExpo'],
]);

it('lists class CMS pages in the sitemap', function () {
    PageController::syncPages();

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();
    $response->assertSee('/to-register', false);
    $response->assertSee('/classes-information', false);
    $response->assertDontSee('/survival-expo', false);
});

it('adds class pages to the Classes mega menu defaults', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->toContain("label: 'Classes'")
        ->and($navigation)->toContain("href: '/classes-information'")
        ->and($navigation)->toContain('hideViewAll: true')
        ->and($navigation)->not->toContain("label: 'To Register'")
        ->and($navigation)->toContain("heading: 'To Register'")
        ->and($navigation)->toContain("buttonLabel: 'Learn More'")
        ->and($navigation)->toContain("buttonHref: '/to-register'")
        ->and($navigation)->not->toContain("label: 'Survival Expo'")
        ->and($navigation)->not->toContain("href: '/survival-expo'")
        ->and($navigation)->not->toContain('Train with WMO');
});

it('renders the class catalog as a full-width accordion instead of cards', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/ClassesInformation/Page.tsx'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/FaqAccordionSection.tsx'));

    expect($page)->not->toBeFalse()
        ->and($section)->not->toBeFalse()
        ->and($page)->not->toContain('ServiceCardsSection')
        ->and($page)->toContain('layout="stack"')
        ->and($page)->toContain('id="courses"')
        ->and($section)->toContain("layout === 'stack'");
});

it('hardcodes the wildernessmedicine.com class catalog in the Classes mega menu', function (string $label, string $href) {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->toContain("label: '{$label}'")
        ->and($navigation)->toContain("href: '{$href}'");
})->with([
    'wfr' => ['Wilderness First Responder (WFR) / Wilderness Emergency Medical Technician (WEMT)', '/classes/wfr'],
    'wfr-recert' => ['Wilderness First Responder (WFR) Recertification', '/classes/wilderness-first-responder-recertification-course'],
    'wals' => ['Wilderness Advanced Life Support (WALS) Expedition Medic', '/classes/wals'],
    'instructor' => ['Become an Instructor / Leave No Trace (LNT) Trainer', '/classes/become-instructor-lnt-trainer'],
    'at-your-location' => ['Class at your Location', '/classes/setting-class-your-location'],
    'hard-skills' => ['Hard [Survival] Skills', '/classes/hard-survival-skills'],
    'wfa16' => ['Wilderness First Aid (WFA) 16 Hr', '/classes/wfa16'],
    'wfa20' => ['Wilderness First Aid (WFA) 20 Hr', '/classes/wfa20'],
    'wfa24' => ['Wilderness First Aid (WFA) 24 Hr', '/classes/wfa24'],
    'awfa' => ['Advanced Wilderness First Aid(AWFA) & Emergency Medical Respond (EMR)', '/classes/awfa'],
    'epi' => ['Anaphylaxis and Epinephrine', '/classes/epi'],
    'lnt' => ['Leave No Trace', '/classes/leave-no-trace'],
]);

it('does not list retired POME class pages in the Classes mega menu', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse()
        ->and($navigation)->not->toContain("href: '/classes/pome'")
        ->and($navigation)->not->toContain("href: '/classes/pome-evaluation'")
        ->and($navigation)->not->toContain('POME and other Ratings')
        ->and($navigation)->not->toContain('Professional Outdoor Medical Educators (POME) Evaluation');
});

it('seeds legacy classes with the rest of the catalog', function () {
    $seeder = file_get_contents(base_path('database/seeders/DatabaseSeeder.php'));

    expect($seeder)->not->toBeFalse()
        ->and($seeder)->toContain('LegacyClassesSeeder::class');
});
