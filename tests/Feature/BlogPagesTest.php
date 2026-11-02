<?php

use App\Models\BlogPost;
use App\Support\PublicPageData;

beforeEach(function () {
    $this->withoutVite();
});

test('phpunit isolates tests from the local mysql database', function () {
    $xml = file_get_contents(base_path('phpunit.xml'));

    expect($xml)
        ->toContain('name="DB_CONNECTION" value="sqlite"')
        ->toContain('name="DB_DATABASE" value=":memory:"')
        ->not->toContain('<!-- <env name="DB_CONNECTION" value="sqlite"/> -->');
});

test('the blog index uses the subpage banner, listing section, and closing cta', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Collections/Blog/Index.tsx'));

    expect($page)->not->toBeFalse();
    expect($page)
        ->toContain("from '@/Components/Sections/Heros/SubpageBannerSection'")
        ->toContain('<SubpageBannerSection')
        ->toContain('headline="Blog"')
        ->toContain('image="/images/hero-04.webp"')
        ->toContain('<BlogIndexSection')
        ->toContain('<PageCTASection')
        ->not->toContain('<HeroSection')
        ->not->toContain('<HeroHalfGlassSection')
        ->not->toContain('<HeroSplitHeadlineSection')
        ->not->toContain('<section')
        ->not->toContain('text-zinc-900')
        ->not->toContain('Navigation')
        ->not->toContain('Footer');
});

test('blog posts use the subpage banner, article section, and closing cta', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Collections/Blog/Show.tsx'));
    $index = file_get_contents(base_path('resources/js/Components/Sections/BlogIndexSection.tsx'));
    $preview = file_get_contents(base_path('resources/js/Components/Sections/BlogPreviewSection.tsx'));
    $article = file_get_contents(base_path('resources/js/Components/Sections/BlogArticleSection.tsx'));

    expect($page)->not->toBeFalse();
    expect($index)->not->toBeFalse();
    expect($preview)->not->toBeFalse();
    expect($article)->not->toBeFalse();
    expect($page)
        ->toContain("from '@/Components/Sections/Heros/SubpageBannerSection'")
        ->toContain('<SubpageBannerSection')
        ->toContain('headline="Blog"')
        ->toContain('image="/images/hero-04.webp"')
        ->toContain('<BlogArticleSection')
        ->toContain('<PageCTASection')
        ->not->toContain('<HeroSection')
        ->not->toContain('<HeroHalfGlassSection')
        ->not->toContain('<HeroSplitHeadlineSection')
        ->not->toContain('<section')
        ->not->toContain('text-zinc-900')
        ->not->toContain('Navigation')
        ->not->toContain('Footer');
    expect($index)
        ->toContain('FeaturedImageWithLogoFallback')
        ->toContain('Written by Carl Weil')
        ->toContain('NREMT school director')
        ->toContain('State of Colorado EMS school director')
        ->toContain('rounded-lg bg-white p-4 shadow-store-card')
        ->not->toContain('No image');
    expect($preview)
        ->toContain('FeaturedImageWithLogoFallback')
        ->not->toContain('No image');
    expect($article)
        ->toContain('FeaturedImageWithLogoFallback')
        ->not->toContain('No image');
});

test('the public blog index renders published posts', function () {
    BlogPost::factory()->published()->create([
        'title' => 'Field notes from Elizabeth',
        'slug' => 'field-notes-from-elizabeth',
    ]);

    $this->get('/blog')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Blog/Index')
            ->has('posts.data', 1)
            ->where('posts.data.0.title', 'Field notes from Elizabeth')
            ->has('siteConfig'));
});

test('a published blog post renders on its public show page', function () {
    BlogPost::factory()->published()->create([
        'title' => 'Field notes from Elizabeth',
        'slug' => 'field-notes-from-elizabeth',
        'content' => '<p>Practice skills before you need them.</p>',
    ]);

    $this->get('/blog/field-notes-from-elizabeth')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Blog/Show')
            ->where('post.title', 'Field notes from Elizabeth')
            ->has('seo')
            ->has('siteConfig'));
});

test('the blog index has its own seo title and description', function () {
    $siteDescription = PublicPageData::siteConfig()['description'];

    $this->get('/blog')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Blog/Index')
            ->where('seo.meta_title', 'Blog')
            ->where('seo.meta_description', fn ($description) => filled($description) && $description !== $siteDescription)
            ->where('seo.robots', 'index, follow'));
});

test('later blog index pages add the page number to the seo title', function () {
    BlogPost::factory()->published()->count(10)->create();

    $this->get('/blog?page=2')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->where('seo.meta_title', 'Blog – Page 2'));
});
