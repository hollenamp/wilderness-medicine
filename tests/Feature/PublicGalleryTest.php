<?php

use App\Models\Category;
use App\Models\Gallery;
use App\Models\Media;
use Illuminate\Support\Str;

it('serves Project Gallery images and category tabs on the public gallery page', function () {
    $interiors = Category::query()->create([
        'name' => 'Interiors',
        'slug' => 'interiors',
    ]);
    $exteriors = Category::query()->create([
        'name' => 'Exteriors',
        'slug' => 'exteriors',
    ]);
    $orphan = Category::query()->create([
        'name' => 'Unused Tab',
        'slug' => 'unused-tab',
    ]);

    $projectGallery = Gallery::query()->create([
        'name' => 'Project Gallery',
        'description' => 'A curated collection of project photography.',
    ]);
    $otherGallery = Gallery::query()->create([
        'name' => 'Other Gallery',
        'description' => 'Should not appear on the public gallery page.',
    ]);

    $interiorMedia = createGalleryMedia('Interior shot');
    $exteriorMedia = createGalleryMedia('Exterior shot');
    $otherMedia = createGalleryMedia('Other gallery shot');

    $interiorMedia->categories()->sync([$interiors->id]);
    $exteriorMedia->categories()->sync([$exteriors->id]);
    $otherMedia->categories()->sync([$orphan->id]);

    $projectGallery->media()->attach($interiorMedia->id, [
        'sort_order' => 1,
        'title' => 'Interior 1',
    ]);
    $projectGallery->media()->attach($exteriorMedia->id, [
        'sort_order' => 2,
        'title' => 'Exterior 1',
    ]);
    $otherGallery->media()->attach($otherMedia->id, [
        'sort_order' => 1,
        'title' => 'Other 1',
    ]);

    $response = $this->get(route('gallery'));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('Public/Gallery/Page')
        ->has('galleryCategories', 2)
        ->where('galleryCategories.0.name', 'Exteriors')
        ->where('galleryCategories.1.name', 'Interiors')
        ->has('galleryImages', 2)
        ->where('galleryImages.0.alt_text', 'Interior 1')
        ->where('galleryImages.0.category_ids', [$interiors->id])
        ->where('galleryImages.1.alt_text', 'Exterior 1')
        ->where('galleryImages.1.category_ids', [$exteriors->id]));
});

it('returns empty gallery props when Project Gallery does not exist', function () {
    Gallery::query()->create([
        'name' => 'Some Other Gallery',
        'description' => 'Not the public project gallery.',
    ]);

    $response = $this->get(route('gallery'));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('Public/Gallery/Page')
        ->has('galleryCategories', 0)
        ->has('galleryImages', 0));
});

function createGalleryMedia(string $label): Media
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
