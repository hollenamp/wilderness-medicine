<?php

use App\Models\Media;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Redirect;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->withoutVite();
});

it('ships the legacy store export alongside the importer', function () {
    $file = database_path('data/legacy-store.json');

    expect($file)->toBeFile();

    $payload = json_decode((string) file_get_contents($file), true);

    expect($payload)->toBeArray()
        ->and($payload['categories'])->toHaveCount(9)
        ->and($payload['products'])->toHaveCount(141);

    $slugs = array_column($payload['products'], 'slug');

    expect($slugs)->toHaveCount(count(array_unique($slugs)));

    foreach ($payload['products'] as $product) {
        expect($product['title'])->not->toBeEmpty()
            ->and($product['slug'])->not->toBeEmpty()
            ->and($product['body_html'])->not->toBeEmpty()
            ->and($product['category_slugs'])->not->toBeEmpty();
    }

    $uncertainTimes = collect($payload['products'])->firstWhere('slug', 'uncertain-times');
    $awfa = collect($payload['products'])->firstWhere('slug', 'awfa40-blended');
    $categoryNames = array_column($payload['categories'], 'name');

    expect($uncertainTimes)->not->toBeNull()
        ->and($uncertainTimes['title'])->toBe('Uncertain Times')
        ->and($uncertainTimes['image_url'])->toContain('default_images/book_uncertain_times.jpg')
        ->and($categoryNames)->toBe([
            'Blended Learning',
            'Distance Learning',
            'In-person Classes',
            'Books',
            'Medical Kits',
            'Survival Items',
            'Over the Counter Med Items',
            'Individual Items',
            'Non-Medical Items',
        ])
        ->and($awfa['variants'])->toBe([
            ['label' => 'WFR-Recert 2 Yrs or less', 'price' => 310],
            ['label' => 'WFR-Recert 3 Yrs or less', 'price' => 350],
            ['label' => 'WFR-Recert 5 Yrs or less', 'price' => 445],
        ]);
});

it('imports a fixture without duplicating multi-category products', function () {
    $this->artisan('store:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-store.json'),
    ])->assertSuccessful();

    expect(Product::count())->toBe(3)
        ->and(ProductCategory::count())->toBe(3);

    $dual = Product::query()->where('slug', 'awfa40-blended')->with('categories')->first();

    expect($dual)->not->toBeNull()
        ->and($dual->categories->pluck('slug')->sort()->values()->all())
        ->toBe(['blended-learning', 'in-person'])
        ->and((float) $dual->price)->toBe(310.0);
});

it('can be re-run without duplicating products', function () {
    $file = ['--file' => base_path('tests/Fixtures/legacy-store.json')];

    $this->artisan('store:import-legacy', $file)->assertSuccessful();
    $this->artisan('store:import-legacy', $file)->assertSuccessful();

    expect(Product::withTrashed()->count())->toBe(3)
        ->and(Product::withTrashed()->distinct('slug')->count('slug'))->toBe(3);
});

it('skips the Drupal fallback placeholder image', function () {
    $this->artisan('store:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-store.json'),
    ])->assertSuccessful();

    $placeholder = Product::query()->where('slug', 'placeholder-kit')->first();

    expect($placeholder)->not->toBeNull()
        ->and($placeholder->featured_image_id)->toBeNull()
        ->and(Media::query()->where('path', 'like', '%book_uncertain_times%')->count())->toBe(0);
});

it('attaches the Uncertain Times book cover even though Drupal stored it under default_images', function () {
    Storage::fake('public');

    $path = 'media/store/book_uncertain_times.jpg';
    // Minimal valid JPEG (1x1) so mime/size helpers succeed.
    Storage::disk('public')->put(
        $path,
        base64_decode('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//Z')
    );

    $this->artisan('store:import-legacy')->assertSuccessful();

    $book = Product::query()->where('slug', 'uncertain-times')->with('featuredImage')->first();

    expect($book)->not->toBeNull()
        ->and($book->featured_image_id)->not->toBeNull()
        ->and($book->featuredImage?->path)->toBe($path);
});

it('redirects legacy product paths that are not /product/{slug}', function () {
    $this->artisan('store:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-store.json'),
    ])->assertSuccessful();

    expect(Redirect::where('from_path', '/awfa40-blended')->exists())->toBeTrue();

    $this->get('/awfa40-blended')
        ->assertRedirect('/product/awfa40-blended');

    expect(Redirect::where('from_path', '/product/wfa20')->exists())->toBeFalse();
});

it('imports the full catalog with unique slugs and dual-category products', function () {
    $this->artisan('store:import-legacy')->assertSuccessful();

    expect(Product::count())->toBe(141)
        ->and(ProductCategory::count())->toBe(9)
        ->and(Product::where('status', 'published')->count())->toBe(141);

    $dual = Product::query()->where('slug', 'awfa40-blended')->with('categories')->first();
    $book = Product::query()->where('slug', 'uncertain-times')->with('categories')->first();

    expect($dual)->not->toBeNull()
        ->and($dual->categories->pluck('slug')->sort()->values()->all())
        ->toBe(['blended-learning', 'in-person'])
        ->and(collect($dual->variants)->map(fn (array $variant) => [
            'label' => $variant['label'],
            'price' => (float) $variant['price'],
        ])->all())->toBe([
            ['label' => 'WFR-Recert 2 Yrs or less', 'price' => 310.0],
            ['label' => 'WFR-Recert 3 Yrs or less', 'price' => 350.0],
            ['label' => 'WFR-Recert 5 Yrs or less', 'price' => 445.0],
        ])
        ->and($book)->not->toBeNull()
        ->and($book->title)->toBe('Uncertain Times')
        ->and($book->author)->toBe(Product::AUTHOR_CARL_WEIL)
        ->and($book->categories->pluck('slug')->values()->all())
        ->toBe(['books'])
        ->and(Product::where('slug', 'wilderness-medicine-beyond-first-aid')->value('author'))
        ->toBe('William W. Forgey')
        ->and(Product::where('slug', 'surviving-wilderness-emergency')->value('author'))
        ->toBe('Peter Kummerfeldt')
        ->and(Product::where('slug', 'medicinal-plants-mountain-west')->value('author'))
        ->toBe('Michael Moore')
        ->and(Product::where('slug', 'going-higher')->value('author'))
        ->toBe('Charles Houston')
        ->and(Product::where('slug', 'wfrwemt-book-set')->value('author'))
        ->toBeNull()
        ->and(ProductCategory::query()->where('slug', 'distance-learning')->value('name'))
        ->toBe('Distance Learning')
        ->and(ProductCategory::query()->where('slug', 'in-person')->value('name'))
        ->toBe('In-person Classes')
        ->and(ProductCategory::query()->where('slug', 'over-the-counter-med-items')->value('name'))
        ->toBe('Over the Counter Med Items')
        ->and(Product::where('slug', 'new-book-released-10-10-24')->exists())->toBeFalse();
});

it('lists store pages in the sitemap after import', function () {
    $this->artisan('store:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-store.json'),
    ])->assertSuccessful();

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();
    expect($response->getContent())
        ->toContain('/store')
        ->toContain('/store/blended-learning')
        ->toContain('/product/wfa20');
});

it('renders an imported product at its public url', function () {
    $this->artisan('store:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-store.json'),
    ])->assertSuccessful();

    $this->get('/product/wfa20')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Store/Product')
            ->where('product.title', 'WFA20 Hr Course')
            ->has('seo'));
});
