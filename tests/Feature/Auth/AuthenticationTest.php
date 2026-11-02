<?php

use App\Models\User;

test('login screen can be rendered', function () {
    $response = $this->get('/admin');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Auth/Login/Page')
    );
});

test('login screen hides google auth when credentials are missing', function () {
    config([
        'services.google.client_id' => null,
        'services.google.client_secret' => null,
    ]);

    $response = $this->get('/admin');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Auth/Login/Page')
        ->where('canLoginWithGoogle', false)
    );
});

test('login screen shows google auth when credentials are configured', function () {
    config([
        'services.google.client_id' => 'test-client-id',
        'services.google.client_secret' => 'test-client-secret',
    ]);

    $response = $this->get('/admin');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Auth/Login/Page')
        ->where('canLoginWithGoogle', true)
    );
});

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post('/admin', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('admin.dashboard', absolute: false));
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post('/admin', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
