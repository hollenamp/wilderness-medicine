<?php

namespace App\Http\Middleware;

use App\Models\BusinessInfo;
use App\Models\MailLog;
use App\Support\PublicPageData;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'statusUnchanged' => $request->session()->get('statusUnchanged'),
            ],
            'businessInfo' => fn () => BusinessInfo::current(),
            'navigation' => fn () => PublicPageData::navigation(),
            'classNavItems' => fn () => PublicPageData::classNavItems(),
            'mailLogCount' => fn () => $request->user()?->admin ? MailLog::count() : null,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
