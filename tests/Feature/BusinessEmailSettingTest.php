<?php

use App\Mail\ContactFormSubmitted;
use App\Models\BusinessInfo;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    $this->withoutVite();

    $this->contactPayload = [
        'name' => 'Test Student',
        'email' => 'student@example.com',
        'subject' => 'Website Contact Form Submission',
        'message' => 'I would like to join a WFR class.',
    ];
});

it('shares the saved business email as the public site email', function () {
    config(['site.email' => 'config@example.com']);
    BusinessInfo::current()->update(['business_email' => 'new@example.com']);

    $this->get('/contact-us')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page->where('siteConfig.email', 'new@example.com'));
});

it('falls back to the configured site email when the business email is empty', function () {
    config(['site.email' => 'config@example.com']);
    BusinessInfo::current()->update(['business_email' => null]);

    $this->get('/contact-us')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page->where('siteConfig.email', 'config@example.com'));
});

it('sends contact form messages to the saved business email', function () {
    Mail::fake();
    config(['site.email' => 'config@example.com']);
    BusinessInfo::current()->update(['business_email' => 'new@example.com']);

    $this->postJson('/api/contact', $this->contactPayload)->assertSuccessful();

    Mail::assertSent(ContactFormSubmitted::class, fn (ContactFormSubmitted $mail): bool => $mail->hasTo('new@example.com')
        && ! $mail->hasTo('config@example.com'));
});

it('sends contact form messages to the configured site email when the business email is empty', function () {
    Mail::fake();
    config(['site.email' => 'config@example.com']);
    BusinessInfo::current()->update(['business_email' => '']);

    $this->postJson('/api/contact', $this->contactPayload)->assertSuccessful();

    Mail::assertSent(ContactFormSubmitted::class, fn (ContactFormSubmitted $mail): bool => $mail->hasTo('config@example.com'));
});
