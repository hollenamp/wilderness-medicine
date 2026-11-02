<?php

use App\Models\Course;
use App\Support\PublicPageData;

beforeEach(function () {
    $this->withoutVite();
});

test('the classes index uses the subpage banner, listing section, and closing cta', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Collections/Classes/Index.tsx'));

    expect($page)->not->toBeFalse();
    expect($page)
        ->toContain("from '@/Components/Sections/Heros/SubpageBannerSection'")
        ->toContain('<SubpageBannerSection')
        ->toContain('headline="Classes"')
        ->toContain('image="/images/hero-04.webp"')
        ->toContain('<ClassIndexSection')
        ->toContain('<PageCTASection')
        ->not->toContain('<HeroSection')
        ->not->toContain('<HeroHalfGlassSection')
        ->not->toContain('<HeroSplitHeadlineSection')
        ->not->toContain('<section')
        ->not->toContain('text-zinc-900')
        ->not->toContain('Navigation')
        ->not->toContain('Footer');
});

test('class pages use the subpage banner, article section, and closing cta', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Collections/Classes/Show.tsx'));
    $article = file_get_contents(base_path('resources/js/Components/Sections/ClassArticleSection.tsx'));

    expect($page)->not->toBeFalse();
    expect($article)->not->toBeFalse();
    expect($page)
        ->toContain("from '@/Components/Sections/Heros/SubpageBannerSection'")
        ->toContain('<SubpageBannerSection')
        ->toContain('headline="Classes"')
        ->toContain('image="/images/hero-04.webp"')
        ->toContain('<ClassArticleSection')
        ->toContain('<PageCTASection')
        ->not->toContain('<HeroSection')
        ->not->toContain('<HeroHalfGlassSection')
        ->not->toContain('<HeroSplitHeadlineSection')
        ->not->toContain('<section')
        ->not->toContain('text-zinc-900')
        ->not->toContain('Navigation')
        ->not->toContain('Footer');
    expect($article)->not->toContain('Back to Classes');
});

test('the public classes index renders published classes', function () {
    Course::factory()->published()->create([
        'title' => 'WALS Wilderness Advanced Life Support Course & Training',
        'slug' => 'wals',
        'nav_label' => 'Wilderness Advanced Life Support (WALS) Expedition Medic',
    ]);

    $this->get('/classes')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Classes/Index')
            ->has('courses.data', 1)
            ->where('courses.data.0.title', 'WALS Wilderness Advanced Life Support Course & Training')
            ->has('siteConfig'));
});

test('a published class renders on its public show page', function () {
    Course::factory()->published()->create([
        'title' => 'WALS Wilderness Advanced Life Support Course & Training',
        'slug' => 'wals',
        'content' => '<p>Hands on learning with cadaver lab days.</p>',
    ]);

    $this->get('/classes/wals')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Classes/Show')
            ->where('course.title', 'WALS Wilderness Advanced Life Support Course & Training')
            ->has('seo')
            ->has('siteConfig'));
});

test('unpublished classes are hidden from the public catalog', function () {
    Course::factory()->create([
        'title' => 'Hidden class',
        'slug' => 'hidden-class',
        'status' => 'draft',
    ]);

    $this->get('/classes/hidden-class')->assertNotFound();
});

test('published classes appear in the shared class nav items', function () {
    Course::factory()->published()->create([
        'title' => 'WALS Wilderness Advanced Life Support Course & Training',
        'slug' => 'wals',
        'nav_label' => 'Wilderness Advanced Life Support (WALS) Expedition Medic',
        'sort_order' => 0,
    ]);

    $this->get('/')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->has('classNavItems', 1)
            ->where('classNavItems.0.title', 'Wilderness Advanced Life Support (WALS) Expedition Medic')
            ->where('classNavItems.0.href', '/classes/wals'));
});

test('the Classes mega menu merge skips catalog hrefs already in the defaults', function () {
    $source = file_get_contents(base_path('resources/js/lib/resolveNavigation.ts'));

    expect($source)->not->toBeFalse()
        ->and($source)->toContain('existingHrefs')
        ->and($source)->toContain('classPageHrefs')
        ->and($source)->not->toContain("'/to-register'")
        ->and($source)->not->toContain("'/classes-information'")
        ->and($source)->not->toContain("'/survival-expo'");
});

test('the sitemap lists classes index and published classes', function () {
    Course::factory()->published()->create([
        'title' => 'WFA 16 Hr - Wilderness First Aid',
        'slug' => 'wfa16',
    ]);

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();
    expect($response->getContent())
        ->toContain('/classes')
        ->toContain('/classes/wfa16');
});

test('the classes index has its own seo title and description', function () {
    $siteDescription = PublicPageData::siteConfig()['description'];

    $this->get('/classes')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Classes/Index')
            ->where('seo.meta_title', 'Classes')
            ->where('seo.meta_description', fn ($description) => filled($description) && $description !== $siteDescription)
            ->where('seo.robots', 'index, follow'));
});

test('later classes index pages add the page number to the seo title', function () {
    Course::factory()->published()->count(13)->create();

    $this->get('/classes?page=2')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->where('seo.meta_title', 'Classes – Page 2'));
});
