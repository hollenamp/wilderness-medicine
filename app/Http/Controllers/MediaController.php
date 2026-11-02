<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaCategoriesRequest;
use App\Models\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(Request $request): Response
    {
        $media = Media::query()
            ->orderByDesc('created_at')
            ->paginate(24)
            ->withQueryString();

        return Inertia::render('Admin/Media/List', [
            'media' => $media,
        ]);
    }

    public function list(Request $request): JsonResponse
    {
        $media = Media::query()
            ->orderByDesc('created_at')
            ->paginate(min((int) $request->integer('per_page', 48), 48));

        return response()->json($media);
    }

    public function store(StoreMediaRequest $request): JsonResponse
    {
        $created = [];

        foreach ($request->file('files') as $file) {
            $extension = $file->extension();
            $filename = Str::uuid().'.'.$extension;
            $path = $file->storeAs('media', $filename, 'public');

            $created[] = Media::create([
                'uuid' => Str::uuid(),
                'filename' => $filename,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'extension' => $extension,
                'size' => $file->getSize(),
                'path' => $path,
                'disk' => 'public',
                'url' => Storage::disk('public')->url($path),
            ]);
        }

        return response()->json(['media' => $created]);
    }

    public function updateCategories(UpdateMediaCategoriesRequest $request, int $id): RedirectResponse
    {
        $media = Media::findOrFail($id);
        $media->categories()->sync($request->validated('category_ids') ?? []);

        return redirect()->back();
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $media = Media::findOrFail($id);

        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }

        $media->delete();

        return redirect()->back();
    }
}
