<?php

use App\Models\Category;
use App\Models\Gallery;
use App\Models\Media;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();

    $this->admin = User::factory()->admin()->create();
    $this->gallery = Gallery::query()->create(['name' => 'Project Gallery']);
    $this->media = galleryAdminMedia('Gallery shot');
});

test('removing an image takes it out of the gallery and the public gallery page', function () {
    $this->actingAs($this->admin)
        ->post(route('admin.galleries.media.store', $this->gallery->id), ['ids' => [$this->media->id]])
        ->assertRedirect();

    expect($this->gallery->fresh()->media)->toHaveCount(1);

    $this->actingAs($this->admin)
        ->delete(route('admin.galleries.media.destroy', [$this->gallery->id, $this->media->id]))
        ->assertRedirect();

    expect($this->gallery->fresh()->media)->toHaveCount(0);

    $this->get(route('gallery'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page->has('galleryImages', 0));
});

test('a removed image can be added back to the gallery', function () {
    $this->gallery->media()->attach($this->media->id, ['sort_order' => 1]);

    $this->actingAs($this->admin)
        ->delete(route('admin.galleries.media.destroy', [$this->gallery->id, $this->media->id]))
        ->assertRedirect();

    expect($this->gallery->fresh()->media)->toHaveCount(0);

    $this->actingAs($this->admin)
        ->post(route('admin.galleries.media.store', $this->gallery->id), ['ids' => [$this->media->id]])
        ->assertRedirect();

    expect($this->gallery->fresh()->media->pluck('id')->all())->toBe([$this->media->id]);
});

test('image category lists do not show galleries an image was removed from', function () {
    $category = Category::query()->create(['name' => 'Interiors', 'slug' => 'interiors']);
    $this->media->categories()->sync([$category->id]);
    $this->gallery->media()->attach($this->media->id, ['sort_order' => 1]);

    $this->actingAs($this->admin)
        ->delete(route('admin.galleries.media.destroy', [$this->gallery->id, $this->media->id]))
        ->assertRedirect();

    $this->actingAs($this->admin)
        ->get(route('admin.image-categories.list'))
        ->assertInertia(fn (Assert $page) => $page->has('categories.0.galleries', 0));

    $this->actingAs($this->admin)
        ->get(route('admin.image-categories.edit', $category->id))
        ->assertInertia(fn (Assert $page) => $page->has('category.galleries', 0));
});

function galleryAdminMedia(string $label): Media
{
    $uuid = (string) Str::uuid();

    return Media::query()->create([
        'uuid' => $uuid,
        'filename' => "{$uuid}.jpg",
        'original_name' => "{$uuid}.jpg",
        'mime_type' => 'image/jpeg',
        'extension' => 'jpg',
        'size' => 100,
        'path' => "media/{$uuid}.jpg",
        'disk' => 'public',
        'alt_text' => $label,
        'url' => "/storage/media/{$uuid}.jpg",
    ]);
}
