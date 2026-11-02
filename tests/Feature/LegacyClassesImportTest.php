<?php

use App\Console\Commands\ImportLegacyClasses;
use App\Models\Course;
use App\Models\Redirect;

beforeEach(function () {
    $this->withoutVite();
});

it('ships the legacy classes export alongside the importer', function () {
    $file = database_path('data/legacy-classes.json');

    expect($file)->toBeFile();

    $payload = json_decode((string) file_get_contents($file), true);

    expect($payload)->toBeArray()
        ->and($payload['classes'])->toHaveCount(12);

    $slugs = array_column($payload['classes'], 'slug');

    expect($slugs)->toHaveCount(count(array_unique($slugs)))
        ->and($slugs)->toContain('wfr')
        ->and($slugs)->toContain('wals')
        ->and($slugs)->not->toContain('to-register');

    foreach ($payload['classes'] as $course) {
        expect($course['title'])->not->toBeEmpty()
            ->and($course['slug'])->not->toBeEmpty()
            ->and($course['body_html'])->not->toBeEmpty()
            ->and($course['original_url'])->not->toBeEmpty();
    }
});

it('skips the two non-class dropdown urls', function (string $path) {
    expect(ImportLegacyClasses::shouldSkipPath($path))->toBeTrue();
})->with([
    'to-register' => '/to-register',
    'survival-expo-encoded' => '/november-22-2025%C2%A0%C2%A010am-4pm%C2%A0survival%C2%A0expo-%C2%A0free-grid-seminar-free-self-reliant%C2%A0seminar-awfa%C2%A0-advanced',
    'pome' => '/pome',
    'pome-evaluation' => '/pome-evaluation',
]);

it('imports a fixture without importing the two page urls', function () {
    $this->artisan('classes:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-classes.json'),
    ])->assertSuccessful();

    expect(Course::count())->toBe(2)
        ->and(Course::where('slug', 'wfr')->exists())->toBeTrue()
        ->and(Course::where('slug', 'wals')->exists())->toBeTrue()
        ->and(Course::where('slug', 'to-register')->exists())->toBeFalse()
        ->and(Course::where('slug', 'november-22-2025-survival-expo')->exists())->toBeFalse();
});

it('can be re-run without duplicating classes', function () {
    $file = ['--file' => base_path('tests/Fixtures/legacy-classes.json')];

    $this->artisan('classes:import-legacy', $file)->assertSuccessful();
    $this->artisan('classes:import-legacy', $file)->assertSuccessful();

    expect(Course::withTrashed()->count())->toBe(2)
        ->and(Course::query()->distinct('slug')->count('slug'))->toBe(2);
});

it('redirects legacy class paths that are not /classes/{slug}', function () {
    $this->artisan('classes:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-classes.json'),
    ])->assertSuccessful();

    expect(Redirect::where('from_path', '/wals')->exists())->toBeTrue();

    $this->get('/wals')
        ->assertRedirect('/classes/wals');
});

it('registers a redirect from the survival expo Drupal path', function () {
    $this->artisan('classes:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-classes.json'),
    ])->assertSuccessful();

    expect(Redirect::where('to_path', '/classes-information')->exists())->toBeTrue();
});

it('imports the full catalog with unique slugs', function () {
    $this->artisan('classes:import-legacy')->assertSuccessful();

    expect(Course::count())->toBe(12)
        ->and(Course::where('status', 'published')->count())->toBe(12)
        ->and(Course::where('slug', 'wfr')->exists())->toBeTrue()
        ->and(Course::where('slug', 'become-instructor-lnt-trainer')->exists())->toBeTrue()
        ->and(Course::where('slug', 'to-register')->exists())->toBeFalse()
        ->and(Course::where('slug', 'pome')->exists())->toBeFalse()
        ->and(Course::where('slug', 'pome-evaluation')->exists())->toBeFalse();
});

it('retires legacy pome class pages and redirects them to the resource section', function () {
    Course::factory()->published()->create([
        'title' => 'Professional Outdoor Medical Educators',
        'slug' => 'pome',
    ]);
    Course::factory()->published()->create([
        'title' => 'POME',
        'slug' => 'pome-evaluation',
    ]);

    $this->artisan('classes:import-legacy')->assertSuccessful();

    expect(Course::withTrashed()->whereIn('slug', ['pome', 'pome-evaluation'])->count())->toBe(0)
        ->and(Redirect::where('from_path', '/pome')->where('to_path', '/resource#pome')->exists())->toBeTrue()
        ->and(Redirect::where('from_path', '/classes/pome')->where('to_path', '/resource#pome')->exists())->toBeTrue()
        ->and(Redirect::where('from_path', '/pome-evaluation')->where('to_path', '/resource#pome')->exists())->toBeTrue()
        ->and(Redirect::where('from_path', '/classes/pome-evaluation')->where('to_path', '/resource#pome')->exists())->toBeTrue();

    $this->get('/classes/pome')->assertRedirect('/resource#pome');
    $this->get('/classes/pome-evaluation')->assertRedirect('/resource#pome');
    $this->get('/pome')->assertRedirect('/resource#pome');
    $this->get('/pome-evaluation')->assertRedirect('/resource#pome');
});

it('renders an imported class at its public url', function () {
    $this->artisan('classes:import-legacy', [
        '--file' => base_path('tests/Fixtures/legacy-classes.json'),
    ])->assertSuccessful();

    $this->get('/classes/wals')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Collections/Classes/Show')
            ->where('course.slug', 'wals'));
});
