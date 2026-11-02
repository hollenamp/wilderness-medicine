<?php

use App\Models\BlogCategory;
use App\Models\Category;
use App\Models\ProductCategory;
use App\Models\User;

beforeEach(function () {
    $this->withoutVite();

    $this->admin = User::factory()->admin()->create();
});

test('creating an image category whose name slugifies to an existing slug is a validation error', function () {
    $this->actingAs($this->admin)
        ->postJson(route('admin.api.categories.store'), ['name' => 'Foo Bar'])
        ->assertSuccessful();

    $this->actingAs($this->admin)
        ->postJson(route('admin.api.categories.store'), ['name' => 'Foo-Bar'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name' => 'A category with a similar name already exists.']);

    expect(Category::query()->count())->toBe(1);
});

test('creating an image category from the admin form with a colliding slug shows a name error', function () {
    Category::query()->create(['name' => 'Foo Bar']);

    $this->actingAs($this->admin)
        ->from(route('admin.image-categories.create'))
        ->post(route('admin.image-categories.store'), ['name' => 'Foo-Bar'])
        ->assertRedirect(route('admin.image-categories.create'))
        ->assertSessionHasErrors('name');
});

test('renaming an image category to a name whose slug belongs to another category is a validation error', function () {
    Category::query()->create(['name' => 'Foo Bar']);
    $other = Category::query()->create(['name' => 'Other']);

    $this->actingAs($this->admin)
        ->patchJson(route('admin.api.categories.update', $other->id), ['name' => 'Foo-Bar'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('name');

    $this->actingAs($this->admin)
        ->from(route('admin.image-categories.edit', $other->id))
        ->patch(route('admin.image-categories.update', $other->id), ['name' => 'foo bar!'])
        ->assertRedirect(route('admin.image-categories.edit', $other->id))
        ->assertSessionHasErrors('name');

    expect($other->fresh()->slug)->toBe('other');
});

test('renaming an image category to a different spelling of its own name keeps working', function () {
    $category = Category::query()->create(['name' => 'Foo Bar']);

    $this->actingAs($this->admin)
        ->patchJson(route('admin.api.categories.update', $category->id), ['name' => 'Foo-Bar'])
        ->assertSuccessful();

    expect($category->fresh())
        ->name->toBe('Foo-Bar')
        ->slug->toBe('foo-bar');
});

test('creating a blog category whose name slugifies to an existing slug is a validation error', function () {
    $this->actingAs($this->admin)
        ->postJson(route('admin.api.blog-categories.store'), ['name' => 'X Y'])
        ->assertSuccessful();

    $this->actingAs($this->admin)
        ->postJson(route('admin.api.blog-categories.store'), ['name' => 'X-Y'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name' => 'A category with a similar name already exists.']);

    expect(BlogCategory::query()->count())->toBe(1);
});

test('creating a store category without a slug whose name slugifies to an existing slug is a validation error', function () {
    ProductCategory::factory()->create(['name' => 'Med Kits', 'slug' => 'med-kits']);

    $this->actingAs($this->admin)
        ->postJson(route('admin.api.product-categories.store'), ['name' => 'Med-Kits'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('name');

    $this->actingAs($this->admin)
        ->postJson(route('admin.api.product-categories.store'), ['name' => 'Med-Kits', 'slug' => 'med-kits-2'])
        ->assertSuccessful();
});
