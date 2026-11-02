<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateBusinessInfoRequest;
use App\Models\BusinessInfo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Display theme settings.
     */
    public function theme(Request $request): Response
    {
        return Inertia::render('Admin/Settings/Theme');
    }

    /**
     * Display business contact info settings.
     */
    public function business(Request $request): Response
    {
        return Inertia::render('Admin/Settings/Business', [
            'businessInfo' => BusinessInfo::current(),
        ]);
    }

    public function updateBusiness(UpdateBusinessInfoRequest $request): RedirectResponse
    {
        $businessInfo = BusinessInfo::current();
        $data = $request->safe()->except('logo');

        if ($request->hasFile('logo')) {
            if ($businessInfo->logo_path) {
                Storage::disk('public')->delete($businessInfo->logo_path);
            }

            $data['logo_path'] = $request->file('logo')->store('business', 'public');
        }

        $businessInfo->update($data);

        return Redirect::route('admin.settings.business')
            ->with('success', 'Business info saved.');
    }
}
