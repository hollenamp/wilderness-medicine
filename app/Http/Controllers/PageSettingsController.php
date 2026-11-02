<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PageSettingsController extends Controller
{
    public function index(Request $request): Response
    {
        PageController::syncPages();

        $pages = Page::query()
            ->orderBy('title')
            ->get();

        return Inertia::render('Admin/Settings/Pages', [
            'pages' => $pages,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $page = Page::findOrFail($id);
        $page->is_visible = $request->boolean('is_visible');
        $page->save();

        return Redirect::route('admin.settings.pages');
    }
}
