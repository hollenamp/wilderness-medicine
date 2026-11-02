<?php

use App\Models\Course;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

test('guests cannot view the classes manager', function () {
    $this->get(route('admin.classes.list'))
        ->assertRedirect(route('admin'));
});

test('non-admin users are redirected away from the classes manager', function () {
    $member = User::factory()->create(['admin' => false]);

    $this->actingAs($member)
        ->get(route('admin.classes.list'))
        ->assertRedirect('/admin');
});

test('admins can view the class list', function () {
    $admin = User::factory()->admin()->create();
    Course::factory()->create(['title' => 'WALS / Expedition Medic']);

    $this->actingAs($admin)
        ->get(route('admin.classes.list'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Classes/List')
            ->has('courses', 1)
            ->where('courses.0.title', 'WALS / Expedition Medic'));
});

test('admins can create a class', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('admin.classes.store'), [
            'title' => 'WFA 16 Hr - Wilderness First Aid',
            'slug' => 'wfa16',
            'nav_label' => 'Wilderness First Aid (WFA) 16 Hr',
            'excerpt' => 'Two-day wilderness first aid',
            'content' => '<p>This class meets camp staff requirements.</p>',
            'status' => 'published',
            'sort_order' => 7,
        ])
        ->assertRedirect();

    $course = Course::query()->where('slug', 'wfa16')->first();

    expect($course)->not->toBeNull()
        ->and(Course::count())->toBe(1)
        ->and($course->title)->toBe('WFA 16 Hr - Wilderness First Aid')
        ->and($course->nav_label)->toBe('Wilderness First Aid (WFA) 16 Hr')
        ->and($course->status)->toBe('published');
});

test('admins can update a class without duplicating it', function () {
    $admin = User::factory()->admin()->create();
    $course = Course::factory()->create([
        'title' => 'Old title',
        'slug' => 'wals',
    ]);

    $this->actingAs($admin)
        ->patch(route('admin.classes.update', $course->id), [
            'title' => 'WALS Wilderness Advanced Life Support Course & Training',
            'slug' => 'wals',
            'excerpt' => $course->excerpt,
            'content' => $course->content,
            'status' => 'published',
            'sort_order' => 2,
        ])
        ->assertRedirect(route('admin.classes.edit', $course->id));

    expect(Course::count())->toBe(1)
        ->and($course->fresh()->title)->toBe('WALS Wilderness Advanced Life Support Course & Training');
});

test('admins can soft delete and restore a class', function () {
    $admin = User::factory()->admin()->create();
    $course = Course::factory()->create(['title' => 'Leave No Trace']);

    $this->actingAs($admin)
        ->delete(route('admin.classes.destroy', $course->id))
        ->assertRedirect(route('admin.classes.list'));

    expect(Course::count())->toBe(0)
        ->and(Course::onlyTrashed()->count())->toBe(1);

    $this->actingAs($admin)
        ->post(route('admin.classes.restore', $course->id))
        ->assertRedirect(route('admin.classes.trash'));

    expect(Course::count())->toBe(1);
});

test('creating a class requires a title and slug', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->from(route('admin.classes.create'))
        ->post(route('admin.classes.store'), [
            'title' => '',
            'slug' => '',
            'status' => 'draft',
        ])
        ->assertRedirect(route('admin.classes.create'))
        ->assertSessionHasErrors(['title', 'slug']);
});

test('admins can preview the create class form', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('admin.classes.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Classes/Edit')
            ->where('course', null));
});
