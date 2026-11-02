<?php

use App\Mail\ContactFormSubmitted;
use Illuminate\Support\Facades\Mail;

it('accepts a contact form submission with name, email, phone, and message', function () {
    Mail::fake();

    $response = $this->postJson('/api/contact', [
        'name' => 'Test Student',
        'email' => 'student@example.com',
        'phone' => '303-555-0100',
        'message' => 'I would like to join a WFR class.',
    ]);

    $response->assertSuccessful();
    $response->assertJson(['success' => true]);

    Mail::assertSent(ContactFormSubmitted::class, function (ContactFormSubmitted $mail): bool {
        return $mail->submission['name'] === 'Test Student'
            && $mail->submission['email'] === 'student@example.com'
            && $mail->submission['phone'] === '303-555-0100'
            && $mail->submission['message'] === 'I would like to join a WFR class.';
    });
});

it('rejects a contact form submission without a message', function () {
    Mail::fake();

    $response = $this->postJson('/api/contact', [
        'name' => 'Test Student',
        'email' => 'student@example.com',
        'phone' => '303-555-0100',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['message']);

    Mail::assertNothingSent();
});

it('sends the contact form to the configured site email', function () {
    Mail::fake();
    config(['site.email' => 'x@example.com']);

    $this->postJson('/api/contact', [
        'name' => 'Test Student',
        'email' => 'student@example.com',
        'subject' => 'Website Contact Form Submission',
        'message' => 'I would like to join a WFR class.',
    ])->assertSuccessful();

    Mail::assertSent(ContactFormSubmitted::class, fn (ContactFormSubmitted $mail): bool => $mail->hasTo('x@example.com'));
});

it('falls back to the mail from address when no site email is configured', function () {
    Mail::fake();
    config(['site.email' => null, 'mail.from.address' => 'from@example.com']);

    $this->postJson('/api/contact', [
        'name' => 'Test Student',
        'email' => 'student@example.com',
        'subject' => 'Website Contact Form Submission',
        'message' => 'I would like to join a WFR class.',
    ])->assertSuccessful();

    Mail::assertSent(ContactFormSubmitted::class, fn (ContactFormSubmitted $mail): bool => $mail->hasTo('from@example.com'));
});

it('returns per-field validation errors the contact form can show', function () {
    Mail::fake();

    $this->postJson('/api/contact', [
        'name' => 'Test Student',
        'email' => 'student@example.com',
        'message' => str_repeat('a', 5001),
    ])
        ->assertUnprocessable()
        ->assertJsonPath('errors.message.0', 'The message field must not be greater than 5000 characters.');

    Mail::assertNothingSent();
});

it('rate limits the contact form with a 429 after five messages a minute', function () {
    Mail::fake();

    $payload = [
        'name' => 'Test Student',
        'email' => 'student@example.com',
        'message' => 'I would like to join a WFR class.',
    ];

    foreach (range(1, 5) as $attempt) {
        $this->postJson('/api/contact', $payload)->assertSuccessful();
    }

    $this->postJson('/api/contact', $payload)->assertTooManyRequests();
});
