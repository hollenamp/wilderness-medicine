<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddMediaToGalleryRequest;
use App\Http\Requests\ReorderGalleryMediaRequest;
use App\Http\Requests\StoreGalleryRequest;
use App\Http\Requests\UpdateGalleryRequest;
use App\Models\Gallery;
use App\Models\GalleryMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function list(Request $request): Response
    {
        $galleries = Gallery::query()
            ->withCount('media')
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Admin/Galleries/List', [
            'galleries' => $galleries,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => null,
        ]);
    }

    public function edit(Request $request, int $id): Response
    {
        $gallery = Gallery::query()->with('media.categories')->findOrFail($id);

        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => $gallery,
        ]);
    }

    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        $gallery = Gallery::create($request->validated());

        return Redirect::route('admin.galleries.edit', $gallery->id);
    }

    public function update(UpdateGalleryRequest $request, int $id): RedirectResponse
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->update($request->validated());

        return Redirect::route('admin.galleries.edit', $gallery->id);
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();

        return Redirect::route('admin.galleries.list');
    }

    public function addMedia(AddMediaToGalleryRequest $request, int $id): RedirectResponse
    {
        $gallery = Gallery::findOrFail($id);

        $maxOrder = (int) GalleryMedia::query()->where('gallery_id', $gallery->id)->max('sort_order');
        $order = $maxOrder + 1;

        foreach ($request->validated('ids') as $mediaId) {
            if ($gallery->media()->where('media.id', $mediaId)->exists()) {
                continue;
            }

            $gallery->media()->attach($mediaId, ['sort_order' => $order]);
            $order++;
        }

        return Redirect::back();
    }

    public function removeMedia(Request $request, int $id, int $mediaId): RedirectResponse
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->media()->detach($mediaId);

        return Redirect::back();
    }

    public function reorder(ReorderGalleryMediaRequest $request, int $id): RedirectResponse
    {
        $gallery = Gallery::findOrFail($id);

        foreach ($request->validated('order') as $index => $mediaId) {
            GalleryMedia::query()
                ->where('gallery_id', $gallery->id)
                ->where('media_id', $mediaId)
                ->update(['sort_order' => $index + 1]);
        }

        return Redirect::back();
    }
}
