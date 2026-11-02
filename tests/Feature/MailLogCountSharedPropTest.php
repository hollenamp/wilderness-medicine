<?php

use App\Models\MailLog;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

function seedMailLogs(int $count): void
{
    foreach (range(1, $count) as $i) {
        MailLog::create([
            'to' => "person{$i}@example.com",
            'subject' => "Message {$i}",
            'body' => 'Body',
            'from' => 'site@example.com',
        ]);
    }
}

test('guests do not receive the mail log count on public pages', function () {
    seedMailLogs(3);

    $response = $this->get(route('links'))->assertOk();

    $props = $response->original->getData()['page']['props'];
    expect($props['mailLogCount'] ?? null)->toBeNull();
});

test('non-admin users do not receive the mail log count', function () {
    seedMailLogs(2);
    $member = User::factory()->create(['admin' => false]);

    $response = $this->actingAs($member)->get(route('admin.dashboard'))->assertOk();

    $props = $response->original->getData()['page']['props'];
    expect($props['mailLogCount'] ?? null)->toBeNull();
});

test('admins receive the mail log count for the sidebar badge', function () {
    seedMailLogs(4);
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('mailLogCount', MailLog::count())
            ->where('mailLogCount', 4));
});
