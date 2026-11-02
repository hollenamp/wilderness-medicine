<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class GoogleLoginController extends Controller
{
    public function redirectToGoogle()
    {
        /*
            Inertia is making the GET request on the app and per Inertia documentation
            all redirects need to be made through Inertia.
            https://inertiajs.com/redirects#external-redirects
            I stored the google redirect URL that's obtained from Socailite in a variable
            and used Inertia to redirect the request to that URL.
        */

        Log::info('Showing authentication call back {callback}', ['callback' => 'handling redirection to Google']);

        $redirectUrl = Socialite::driver('google')
            ->redirect()
            ->getTargetUrl();
        // Log::info('Showing redirect URL {url}', ['url' => $redirectUrl]);

        return Inertia::location($redirectUrl);
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();
        $user = User::where('email', $googleUser->email)->first();

        if (! $user) {
            return redirect()->route('admin')
                ->with('status', 'No account found for this email. Contact an administrator for access.');
        }

        $user->forceFill([
            'google_id' => $googleUser->id,
            'email_verified_at' => $user->email_verified_at ?? now(),
        ])->save();

        Auth::login($user);

        return redirect()->intended(route('admin.dashboard', absolute: false));
    }
}