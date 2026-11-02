<?php

use App\Models\BlogPost;
use App\Models\Redirect;

beforeEach(function () {
    $this->withoutVite();
});

it('ships the legacy blog export alongside the importer', function () {
    $file = database_path('data/legacy-blog-posts.json');

    expect($file)->toBeFile();

    $posts = json_decode((string) file_get_contents($file), true);

    expect($posts)->toBeArray()
        ->and(count($posts))->toBe(58);

    foreach ($posts as $post) {
        expect($post['title'])->not->toBeEmpty()
            ->and($post['slug'])->not->toBeEmpty()
            ->and($post['published_at'])->not->toBeEmpty()
            ->and($post['body_html'])->not->toBeEmpty();
    }
});

it('imports the archive when the database is seeded', function () {
    $this->seed();

    expect(BlogPost::count())->toBe(58)
        ->and(BlogPost::where('status', 'published')->count())->toBe(58);
});

it('imports every legacy post with its original slug and publish date', function () {
    $this->artisan('blog:import-legacy')->assertSuccessful();

    expect(BlogPost::count())->toBe(58)
        ->and(BlogPost::where('status', 'published')->count())->toBe(58);

    $post = BlogPost::where('slug', 'best-way-remove-tick')->first();

    expect($post)->not->toBeNull()
        ->and($post->title)->toBe('BEST way to remove tick')
        ->and($post->published_at->year)->toBe(2015)
        ->and($post->author?->name)->toBe('Carl Weil');
});

it('can be re-run without duplicating posts', function () {
    $this->artisan('blog:import-legacy')->assertSuccessful();
    $this->artisan('blog:import-legacy')->assertSuccessful();

    expect(BlogPost::withTrashed()->count())->toBe(58)
        ->and(BlogPost::withTrashed()->distinct('slug')->count('slug'))->toBe(58);
});

it('rewrites legacy asset references to locally hosted media', function () {
    $this->artisan('blog:import-legacy')->assertSuccessful();

    $content = implode('', BlogPost::pluck('content')->all());

    expect($content)->not->toContain('/sites/wildernessmedicine.com/')
        ->and($content)->not->toContain('msnbcmedia.msn.com');

    $post = BlogPost::where('slug', 'best-way-remove-tick')->first();

    expect($post->content)->toContain('/storage/media/');
});

it('strips scripts, styles and word markup from imported content', function () {
    $this->artisan('blog:import-legacy')->assertSuccessful();

    $content = implode('', BlogPost::pluck('content')->all());

    expect($content)->not->toMatch('~<script~i')
        ->and($content)->not->toMatch('~<style~i')
        ->and($content)->not->toMatch('~<xml~i')
        ->and($content)->not->toMatch('~<w:~i')
        ->and($content)->not->toMatch('~\son[a-z]+=~i')
        ->and($content)->not->toMatch('~javascript:~i');
});

it('redirects the legacy dated permalinks to the new blog routes', function () {
    $this->artisan('blog:import-legacy')->assertSuccessful();

    expect(Redirect::where('to_path', 'like', '/blog/%')->count())->toBe(58);

    $this->get('/2015/07/best-way-remove-tick')
        ->assertRedirect('/blog/best-way-remove-tick');
});

it('renders the public blog index with imported posts', function () {
    $this->artisan('blog:import-legacy')->assertSuccessful();

    $this->get('/blog')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Blog/Index')
            ->has('posts.data', 9)
            ->has('siteConfig'));
});

it('renders an imported post at its original slug', function () {
    $this->artisan('blog:import-legacy')->assertSuccessful();

    $this->get('/blog/best-way-remove-tick')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Blog/Show')
            ->where('post.title', 'BEST way to remove tick')
            ->has('seo'));
});

it('lists every imported post in the sitemap', function () {
    $this->artisan('blog:import-legacy')->assertSuccessful();

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();
    expect(substr_count($response->getContent(), '/blog/'))->toBe(58);
});

it('links the blog from the site navigation', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->toContain("label: 'Blog'")
        ->and($navigation)->toContain("href: '/blog'");
});

it('renders post content as html rather than escaped text', function () {
    $article = file_get_contents(base_path('resources/js/Components/Sections/BlogArticleSection.tsx'));

    expect($article)->toContain('dangerouslySetInnerHTML')
        ->and($article)->toContain('blog-content');
});
