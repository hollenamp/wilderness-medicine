<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, ?int $id = null): Response
    {
        $user = $this->resolveUser($request, $id);

        return Inertia::render('Admin/Profile/Edit', [
            'profile' => $user,
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, ?int $id = null): RedirectResponse
    {
        $user = $this->resolveUser($request, $id);

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return $id
            ? Redirect::route('admin.profile.edit', ['id' => $id])
            : Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, ?int $id = null): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        if ($id) {
            User::findOrFail($id)->delete();

            return Redirect::route('admin.users.list');
        }

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Resolve the user being edited from the route or authenticated session.
     */
    private function resolveUser(Request $request, ?int $id): User
    {
        return $id
            ? User::findOrFail($id)
            : $request->user();
    }
}
