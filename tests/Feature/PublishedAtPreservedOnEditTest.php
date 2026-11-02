<?php

use App\Models\BlogPost;
use App\Models\Course;
use App\Models\Product;
use App\Models\User;

beforeEach(function () {
    $this->withoutVite();
});

/**
 * The admin edit forms send published_at back as a date-only value
 * (`<input type="date">`), so re-saving must not reset the stored time.
 */
dataset('publishable admin resources', [
    'blog post' => [
        fn () => BlogPost::factory()->published()->create(['published_at' => '2026-10-16 21:14:05']),
        'admin.blog.update',
    ],
    'class' => [
        fn () => Course::factory()->published()->create(['published_at' => '2026-10-16 21:14:05']),
        'admin.classes.update',
    ],
    'product' => [
        fn () => Product::factory()->published()->create(['published_at' => '2026-10-16 21:14:05']),
        'admin.store.products.update',
    ],
]);

function editFormPayload(BlogPost|Course|Product $model, string $publishedAt): array
{
    return [
        'title' => $model->title,
        'slug' => $model->slug,
        'excerpt' => $model->excerpt,
        'content' => $model->content,
        'status' => 'published',
        'published_at' => $publishedAt,
    ];
}

test('re-saving with the same publish date keeps the stored publish time', function (Closure $makeModel, string $updateRoute) {
    $admin = User::factory()->admin()->create();
    $model = $makeModel();

    $this->actingAs($admin)
        ->patch(route($updateRoute, $model->id), editFormPayload($model, '2026-10-16'))
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    expect($model->fresh()->published_at->format('Y-m-d H:i:s'))->toBe('2026-10-16 21:14:05');
})->with('publishable admin resources');

test('changing the publish date in the form still changes published_at', function (Closure $makeModel, string $updateRoute) {
    $admin = User::factory()->admin()->create();
    $model = $makeModel();

    $this->actingAs($admin)
        ->patch(route($updateRoute, $model->id), editFormPayload($model, '2026-11-02'))
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    expect($model->fresh()->published_at->format('Y-m-d'))->toBe('2026-11-02');
})->with('publishable admin resources');
