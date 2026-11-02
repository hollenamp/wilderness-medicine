<?php

use App\Models\User;
use Illuminate\Cookie\CookieValuePrefix;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

/**
 * Build the X-XSRF-TOKEN header value axios sends: the encrypted XSRF-TOKEN cookie.
 */
function xsrfHeaderFor(string $token): string
{
    $encrypter = app('encrypter');

    return $encrypter->encrypt(CookieValuePrefix::create('XSRF-TOKEN', $encrypter->getKey()).$token, false);
}

test('admins can upload a CMS image', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)
        ->postJson(route('admin.cms.uploads.store'), ['image' => UploadedFile::fake()->image('hero.jpg')])
        ->assertOk();

    expect($response->json('url'))->toMatch('#/storage/cms/uploads/[0-9a-f-]{36}\.jpg$#');
    Storage::disk('public')->assertExists('cms/uploads/'.basename($response->json('url')));
});

test('CMS uploads reject non-image files', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->postJson(route('admin.cms.uploads.store'), [
            'image' => UploadedFile::fake()->create('notes.pdf', 10, 'application/pdf'),
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('image');

    expect(Storage::disk('public')->allFiles('cms/uploads'))->toBeEmpty();
});

test('CMS uploads reject images over 5 MB', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->postJson(route('admin.cms.uploads.store'), [
            'image' => UploadedFile::fake()->image('huge.jpg')->size(5121),
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('image');
});

test('CMS uploads need a CSRF token outside the testing environment', function () {
    // Laravel skips CSRF checks when APP_ENV=testing, which hid the missing token in the page editor.
    app()->detectEnvironment(fn () => 'local');
    $admin = User::factory()->admin()->create();
    $image = UploadedFile::fake()->image('hero.jpg');

    // The old raw fetch() sent no token at all.
    $this->actingAs($admin)
        ->withSession(['_token' => 'cms-upload-token'])
        ->withHeaders(['X-Requested-With' => 'XMLHttpRequest'])
        ->post(route('admin.cms.uploads.store'), ['image' => $image])
        ->assertStatus(419);

    // window.axios sends the encrypted XSRF-TOKEN cookie back as X-XSRF-TOKEN.
    $this->actingAs($admin)
        ->withSession(['_token' => 'cms-upload-token'])
        ->withHeaders([
            'X-Requested-With' => 'XMLHttpRequest',
            'X-XSRF-TOKEN' => xsrfHeaderFor('cms-upload-token'),
        ])
        ->post(route('admin.cms.uploads.store'), ['image' => $image])
        ->assertOk()
        ->assertJsonStructure(['url']);
});
