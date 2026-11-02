<?php

namespace App\Listeners;

use App\Models\MailLog;
use App\Models\MailLogSetting;
use Illuminate\Mail\Events\MessageSent;
use Symfony\Component\Mime\Address;

class LogSentMail
{
    public function handle(MessageSent $event): void
    {
        if (! MailLogSetting::current()->enabled) {
            return;
        }

        $message = $event->message;

        $to = implode(', ', array_map(
            fn (Address $address) => $address->getAddress(),
            $message->getTo()
        ));

        $from = $message->getFrom()[0]->getAddress() ?? null;

        MailLog::create([
            'to' => $to,
            'subject' => (string) $message->getSubject(),
            'body' => $message->getHtmlBody() ?? $message->getTextBody(),
            'from' => $from,
        ]);
    }
}
