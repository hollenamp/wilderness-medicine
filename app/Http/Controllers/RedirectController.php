<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRedirectRequest;
use App\Http\Requests\UpdateRedirectRequest;
use App\Models\Redirect as RedirectModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RedirectController extends Controller
{
    public function list(Request $request): Response
    {
        $redirects = RedirectModel::query()
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Admin/Redirects/List', [
            'redirects' => $redirects,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Admin/Redirects/Edit', [
            'redirect' => null,
        ]);
    }

    public function edit(Request $request, int $id): Response
    {
        $redirect = RedirectModel::query()->findOrFail($id);

        return Inertia::render('Admin/Redirects/Edit', [
            'redirect' => $redirect,
        ]);
    }

    public function store(StoreRedirectRequest $request): RedirectResponse
    {
        $redirect = RedirectModel::create($request->validated());

        return Redirect::route('admin.redirects.edit', $redirect->id);
    }

    public function update(UpdateRedirectRequest $request, int $id): RedirectResponse
    {
        $redirect = RedirectModel::findOrFail($id);
        $redirect->update($request->validated());

        return Redirect::route('admin.redirects.edit', $redirect->id);
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $redirect = RedirectModel::findOrFail($id);
        $redirect->delete();

        return Redirect::route('admin.redirects.list');
    }
}
