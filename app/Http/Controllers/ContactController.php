<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactFormSubmitted;
use App\Models\BusinessInfo;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(ContactFormRequest $request): JsonResponse
    {
        $submission = $request->validated();

        Mail::to(BusinessInfo::current()->business_email ?: config('site.email') ?: config('mail.from.address'))
            ->send(new ContactFormSubmitted($submission));

        return response()->json(['success' => true]);
    }
}
