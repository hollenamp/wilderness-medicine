<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForwardMailLogRequest;
use App\Http\Requests\UpdateMailLogSettingsRequest;
use App\Models\MailLog;
use App\Models\MailLogSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class MailLogController extends Controller
{
    public function list(Request $request): Response
    {
        $mailLogs = MailLog::query()
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 10))
            ->withQueryString();

        return Inertia::render('Admin/MailLog/List', [
            'mailLogs' => $mailLogs,
        ]);
    }

    public function show(Request $request, int $id): Response
    {
        $mail = MailLog::findOrFail($id);

        $previousId = MailLog::query()->where('id', '<', $id)->max('id');
        $nextId = MailLog::query()->where('id', '>', $id)->min('id');

        return Inertia::render('Admin/MailLog/Show', [
            'mail' => $mail,
            'previousId' => $previousId,
            'nextId' => $nextId,
        ]);
    }

    public function destroy(int $id): RedirectResponse
    {
        MailLog::findOrFail($id)->delete();

        return Redirect::route('admin.mail-log.list')
            ->with('success', 'Email deleted.');
    }

    public function forward(ForwardMailLogRequest $request, int $id): RedirectResponse
    {
        $mail = MailLog::findOrFail($id);
        $email = $request->validated('email');

        Mail::html($mail->body ?? '', function ($message) use ($mail, $email) {
            $message->to($email)->subject($mail->subject);
        });

        return Redirect::back()->with('success', "Email forwarded to {$email}.");
    }

    public function settings(Request $request): Response
    {
        return Inertia::render('Admin/MailLog/Settings', [
            'mailLogSettings' => MailLogSetting::current(),
        ]);
    }

    public function updateSettings(UpdateMailLogSettingsRequest $request): RedirectResponse
    {
        MailLogSetting::current()->update($request->validated());

        return Redirect::route('admin.mail-log.settings')
            ->with('success', 'Mail log settings saved.');
    }
}
