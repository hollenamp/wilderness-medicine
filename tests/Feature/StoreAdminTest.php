<?php

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

test('guests cannot view the store product manager', function () {
    $this->get(route('admin.store.products.list'))
        ->assertRedirect(route('admin'));
});

test('non-admin users are redirected away from the store manager', function () {
    $member = User::factory()->create(['admin' => false]);

    $this->actingAs($member)
        ->get(route('admin.store.products.list'))
        ->assertRedirect('/admin');
});

test('admins can view the product list', function () {
    $admin = User::factory()->admin()->create();
    Product::factory()->create(['title' => 'WFA20 Hr Course']);

    $this->actingAs($admin)
        ->get(route('admin.store.products.list'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Store/Products/List')
            ->has('products', 1)
            ->where('products.0.title', 'WFA20 Hr Course'));
});

test('admins can create a product assigned to two categories', function () {
    $admin = User::factory()->admin()->create();
    $blended = ProductCategory::factory()->create(['name' => 'Blended Learning', 'slug' => 'blended-learning']);
    $inPerson = ProductCategory::factory()->create(['name' => 'In-Person Classes', 'slug' => 'in-person']);

    $this->actingAs($admin)
        ->post(route('admin.store.products.store'), [
            'title' => '2 Day WFR Recert',
            'slug' => 'awfa40-blended',
            'excerpt' => 'Dual purpose class',
            'content' => '<p>Online lessons plus in-person skills.</p>',
            'price' => 310,
            'status' => 'published',
            'category_ids' => [$blended->id, $inPerson->id],
            'variants' => [
                ['label' => 'WFR-Recert 2 Yrs or less', 'price' => 310],
            ],
        ])
        ->assertRedirect();

    $product = Product::query()->where('slug', 'awfa40-blended')->first();

    expect($product)->not->toBeNull()
        ->and(Product::count())->toBe(1)
        ->and($product->title)->toBe('2 Day WFR Recert')
        ->and((float) $product->price)->toBe(310.0)
        ->and($product->categories()->pluck('slug')->sort()->values()->all())
        ->toBe(['blended-learning', 'in-person']);
});

test('admins can update a product without duplicating it', function () {
    $admin = User::factory()->admin()->create();
    $category = ProductCategory::factory()->create(['slug' => 'books']);
    $product = Product::factory()->create([
        'title' => 'Old title',
        'slug' => 'backcountry-medical-care',
        'price' => 10.75,
    ]);
    $product->categories()->attach($category->id, ['sort_order' => 0]);

    $this->actingAs($admin)
        ->patch(route('admin.store.products.update', $product->id), [
            'title' => 'Backcountry Medical Care [4th edition]',
            'slug' => 'backcountry-medical-care',
            'excerpt' => $product->excerpt,
            'content' => $product->content,
            'price' => 10.75,
            'status' => 'published',
            'category_ids' => [$category->id],
        ])
        ->assertRedirect(route('admin.store.products.edit', $product->id));

    expect(Product::count())->toBe(1)
        ->and($product->fresh()->title)->toBe('Backcountry Medical Care [4th edition]');
});

test('admins can soft delete and restore a product', function () {
    $admin = User::factory()->admin()->create();
    $product = Product::factory()->create(['title' => 'SAM Splint']);

    $this->actingAs($admin)
        ->delete(route('admin.store.products.destroy', $product->id))
        ->assertRedirect(route('admin.store.products.list'));

    expect(Product::count())->toBe(0)
        ->and(Product::onlyTrashed()->count())->toBe(1);

    $this->actingAs($admin)
        ->post(route('admin.store.products.restore', $product->id))
        ->assertRedirect(route('admin.store.products.trash'));

    expect(Product::count())->toBe(1);
});

test('admins can create and update a store category', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('admin.store.categories.store'), [
            'name' => 'Medical Kits',
            'slug' => 'medical-kit',
            'description' => 'Ready-made kits',
            'sort_order' => 4,
        ])
        ->assertRedirect();

    $category = ProductCategory::query()->where('slug', 'medical-kit')->first();

    expect($category)->not->toBeNull()
        ->and($category->name)->toBe('Medical Kits');

    $this->actingAs($admin)
        ->patch(route('admin.store.categories.update', $category->id), [
            'name' => 'Medical Kits',
            'slug' => 'medical-kit',
            'description' => 'Updated description',
            'sort_order' => 4,
        ])
        ->assertRedirect(route('admin.store.categories.edit', $category->id));

    expect($category->fresh()->description)->toBe('Updated description');
});

test('creating a product requires a title and slug', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->from(route('admin.store.products.create'))
        ->post(route('admin.store.products.store'), [
            'title' => '',
            'slug' => '',
            'status' => 'draft',
        ])
        ->assertRedirect(route('admin.store.products.create'))
        ->assertSessionHasErrors(['title', 'slug']);
});
