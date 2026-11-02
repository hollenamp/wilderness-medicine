<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin dashboard page is displayed for verified users', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Dashboard/View')
            ->has('auth.user'));
});

test('auth user admin flag is shared as a boolean so the sidebar can show admin-only items', function () {
    $admin = User::factory()->admin()->create();
    $member = User::factory()->create(['admin' => false]);

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('auth.user.admin', true)
            ->where('stats.users.total', User::count()));

    $memberResponse = $this->actingAs($member)
        ->get(route('admin.dashboard'))
        ->assertOk();

    $memberResponse->assertInertia(fn (Assert $page) => $page
        ->where('auth.user.id', $member->id)
        ->where('stats.users', null));

    // AssertableInertia::where() is unreliable with false; assert the cast boolean directly.
    $memberProps = $memberResponse->original->getData()['page']['props'];
    expect($memberProps['auth']['user']['admin'])->toBeFalse();
});

test('view site link targets the frontend welcome route', function () {
    expect(route('welcome', absolute: false))->toBe('/');

    $this->get(route('welcome'))->assertOk();
});
