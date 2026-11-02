<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

test('guests cannot view the users manager', function () {
    $this->get(route('admin.users.list'))
        ->assertRedirect(route('admin'));
});

test('non-admin users are redirected away from the users manager', function () {
    $member = User::factory()->create(['admin' => false]);

    $this->actingAs($member)
        ->get(route('admin.users.list'))
        ->assertRedirect('/admin');
});

test('admins can view the users list', function () {
    $admin = User::factory()->admin()->create(['name' => 'Admin User']);
    User::factory()->create(['name' => 'Member User', 'admin' => false]);

    $this->actingAs($admin)
        ->get(route('admin.users.list'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Users/List')
            ->has('users', 2)
            ->where('users.0.name', 'Admin User')
            ->where('users.1.name', 'Member User'));
});

test('users list sends admin and suspended as booleans', function () {
    $admin = User::factory()->admin()->create(['name' => 'Admin User']);
    User::factory()->create(['name' => 'Suspended User', 'admin' => false, 'suspended' => true]);

    $this->actingAs($admin)
        ->get(route('admin.users.list'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Users/List')
            ->where('users.0.admin', true)
            ->where('users.0.suspended', false)
            ->where('users.1.admin', false)
            ->where('users.1.suspended', true));
});
