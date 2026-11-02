<?php

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

test('the store hub uses the subpage banner, category grid, and closing cta', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Collections/Store/Index.tsx'));

    expect($page)->not->toBeFalse();
    expect($page)
        ->toContain("from '@/Components/Sections/Heros/SubpageBannerSection'")
        ->toContain('<SubpageBannerSection')
        ->toContain('headline="Store"')
        ->toContain('<StoreCategoryGridSection')
        ->toContain('<PageCTASection')
        ->not->toContain('<HeroSection')
        ->not->toContain('<section')
        ->not->toContain('Navigation')
        ->not->toContain('Footer')
        ->not->toContain('Add to cart');
});

test('store category pages use the product grid and call-to-order cta', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Collections/Store/Category.tsx'));

    expect($page)->not->toBeFalse();
    expect($page)
        ->toContain('<SubpageBannerSection')
        ->toContain('<StoreProductGridSection')
        ->toContain('<PageCTASection')
        ->not->toContain('Add to cart')
        ->not->toContain('Navigation')
        ->not->toContain('Footer');
});

test('store product pages use the detail section and call-to-order cta', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Collections/Store/Product.tsx'));
    $detail = file_get_contents(base_path('resources/js/Components/Sections/StoreProductDetailSection.tsx'));
    $grid = file_get_contents(base_path('resources/js/Components/Sections/StoreProductGridSection.tsx'));

    expect($page)->not->toBeFalse();
    expect($detail)->not->toBeFalse();
    expect($grid)->not->toBeFalse();
    expect($page)
        ->toContain('<StoreProductDetailSection')
        ->toContain('<PageCTASection')
        ->not->toContain('Add to cart');
    expect($detail)
        ->toContain('Call to order')
        ->toContain('FeaturedImageWithLogoFallback')
        ->toContain('objectFit="contain"')
        ->toContain('dangerouslySetInnerHTML')
        ->toContain('store-content')
        ->not->toContain('Add to cart')
        ->not->toContain('No image');
    expect($grid)
        ->toContain('Call to order')
        ->toContain('FeaturedImageWithLogoFallback')
        ->toContain('objectFit="contain"')
        ->toContain('product.author')
        ->toContain('by {product.author}')
        ->not->toContain('Add to cart')
        ->not->toContain('No image');

    $featuredImage = file_get_contents(base_path('resources/js/Components/Sections/FeaturedImageWithLogoFallback.tsx'));

    expect($featuredImage)->not->toBeFalse();
    expect($featuredImage)
        ->toContain('DEFAULT_SITE_LOGO')
        ->toContain('bg-zinc-50');
});

test('the public store hub lists categories', function () {
    ProductCategory::factory()->create([
        'name' => 'Blended Learning',
        'slug' => 'blended-learning',
        'sort_order' => 0,
    ]);

    $this->get('/store')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Collections/Store/Index')
            ->has('categories', 1)
            ->where('categories.0.slug', 'blended-learning')
            ->has('siteConfig'));
});

test('a category page lists only published products in that category', function () {
    $blended = ProductCategory::factory()->create(['name' => 'Blended Learning', 'slug' => 'blended-learning']);
    $books = ProductCategory::factory()->create(['name' => 'Books', 'slug' => 'books']);

    $listed = Product::factory()->published()->create([
        'title' => 'WFA20 Hr Course',
        'slug' => 'wfa20',
        'price' => 275,
    ]);
    $listed->categories()->attach($blended->id, ['sort_order' => 0]);

    $other = Product::factory()->published()->create([
        'title' => 'Backcountry Medical Care',
        'slug' => 'backcountry-medical-care',
        'price' => 10.75,
    ]);
    $other->categories()->attach($books->id, ['sort_order' => 0]);

    $draft = Product::factory()->create([
        'title' => 'Draft blended course',
        'slug' => 'draft-blended',
        'status' => 'draft',
    ]);
    $draft->categories()->attach($blended->id, ['sort_order' => 1]);

    $this->get('/store/blended-learning')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Collections/Store/Category')
            ->where('category.slug', 'blended-learning')
            ->has('products.data', 1)
            ->where('products.data.0.title', 'WFA20 Hr Course')
            ->where('products.data.0.price', '275.00')
            ->has('siteConfig'));
});

test('the books category lists carl weil books first', function () {
    $books = ProductCategory::factory()->create(['name' => 'Books', 'slug' => 'books']);

    $forgeyBook = Product::factory()->published()->create([
        'title' => 'Wilderness Medicine, Beyond First Aid',
        'slug' => 'wilderness-medicine-beyond-first-aid',
        'author' => 'William W. Forgey',
    ]);
    $forgeyBook->categories()->attach($books->id, ['sort_order' => 0]);

    $carlBook = Product::factory()->published()->create([
        'title' => 'Backcountry Medical Care',
        'slug' => 'backcountry-medical-care',
        'author' => 'Carl Weil',
    ]);
    $carlBook->categories()->attach($books->id, ['sort_order' => 1]);

    $this->get('/store/books')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Collections/Store/Category')
            ->where('category.slug', 'books')
            ->has('products.data', 2)
            ->where('products.data.0.title', 'Backcountry Medical Care')
            ->where('products.data.0.author', 'Carl Weil')
            ->where('products.data.1.title', 'Wilderness Medicine, Beyond First Aid')
            ->where('products.data.1.author', 'William W. Forgey'));
});

test('the books category detects carl weil books from excerpt when author is unset', function () {
    $books = ProductCategory::factory()->create(['name' => 'Books', 'slug' => 'books']);

    $otherBook = Product::factory()->published()->create([
        'title' => 'Surviving a Wilderness Emergency',
        'slug' => 'surviving-wilderness-emergency',
        'excerpt' => 'Surviving a Wilderness Emergency By Peter Kummerfeldt',
    ]);
    $otherBook->categories()->attach($books->id, ['sort_order' => 0]);

    $carlBook = Product::factory()->published()->create([
        'title' => 'Wilderness First Aid WMO Text',
        'slug' => 'wfa-text',
        'excerpt' => 'Wilderness First Aid WMO Text 2020 edition by Carl Weil / Wilderness Medicine Outfitters',
    ]);
    $carlBook->categories()->attach($books->id, ['sort_order' => 1]);

    $this->get('/store/books')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->where('products.data.0.title', 'Wilderness First Aid WMO Text')
            ->where('products.data.1.title', 'Surviving a Wilderness Emergency'));
});

test('a published product renders on its public show page with catalog price', function () {
    $category = ProductCategory::factory()->create(['slug' => 'blended-learning']);
    $product = Product::factory()->published()->create([
        'title' => 'WFA20 Hr Course',
        'slug' => 'wfa20',
        'price' => 275,
        'content' => '<p>Four online video lessons plus in-person skills.</p>',
        'variants' => [
            ['label' => 'Full course', 'price' => 275],
        ],
    ]);
    $product->categories()->attach($category->id, ['sort_order' => 0]);

    $this->get('/product/wfa20')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Collections/Store/Product')
            ->where('product.title', 'WFA20 Hr Course')
            ->where('product.price', '275.00')
            ->where('product.variants.0.label', 'Full course')
            ->has('seo')
            ->has('siteConfig'));
});

test('unpublished products are hidden from the public catalog', function () {
    Product::factory()->create([
        'title' => 'Hidden kit',
        'slug' => 'hidden-kit',
        'status' => 'draft',
    ]);

    $this->get('/product/hidden-kit')->assertNotFound();
});

test('the store megamenu is included in default top-level navigation', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse();
    expect($navigation)
        ->toMatch("/^    \\{\\s+label: 'Store'/m")
        ->toContain("href: '/store'")
        ->toContain("href: '/store/blended-learning'")
        ->toContain("heading: 'Kits, books, and gear'");

    expect($navigation)->toMatch(
        "/label: 'Store'.*?children: \\[\\s*\\{ label: 'Books', href: '\\/store\\/books'/s"
    );
});

test('admins can preview the create product form', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('admin.store.products.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Store/Products/Edit')
            ->where('product', null));
});
