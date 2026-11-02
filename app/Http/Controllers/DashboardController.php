<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Media;
use App\Models\Page;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display dashboard.
     */
    public function view(): Response
    {
        $isAdmin = (bool) Auth::user()?->admin;

        return Inertia::render('Admin/Dashboard/View', [
            'stats' => [
                'pages' => [
                    'total' => Page::count(),
                    'visible' => Page::where('is_visible', true)->count(),
                ],
                'media' => [
                    'total' => Media::count(),
                    'size' => Media::sum('size'),
                ],
                'galleries' => [
                    'total' => Gallery::count(),
                ],
                'users' => $isAdmin ? [
                    'total' => User::count(),
                ] : null,
            ],
            'recentPages' => Page::query()
                ->orderByDesc('updated_at')
                ->limit(5)
                ->get(['id', 'title', 'route_name', 'is_visible', 'updated_at']),
            'recentMedia' => Media::query()
                ->orderByDesc('created_at')
                ->limit(6)
                ->get(),
        ]);
    }
}
