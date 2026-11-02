<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ImageCategoryController extends Controller
{
    public function list(Request $request): Response
    {
        $categories = Category::query()
            ->withCount('media')
            ->with(['media.galleries:id,name'])
            ->orderBy('name')
            ->get()
            ->each($this->attachGalleries(...));

        return Inertia::render('Admin/ImageCategories/List', [
            'categories' => $categories,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Admin/ImageCategories/Edit', [
            'category' => null,
        ]);
    }

    public function edit(Request $request, int $id): Response
    {
        $category = Category::query()
            ->withCount('media')
            ->with(['media.galleries:id,name'])
            ->findOrFail($id);

        $this->attachGalleries($category);

        return Inertia::render('Admin/ImageCategories/Edit', [
            'category' => $category,
        ]);
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $category = Category::create($request->validated());

        return Redirect::route('admin.image-categories.edit', $category->id);
    }

    public function update(UpdateCategoryRequest $request, int $id): RedirectResponse
    {
        $category = Category::findOrFail($id);
        $category->update([
            'name' => $request->validated('name'),
            'slug' => Str::slug($request->validated('name')),
        ]);

        return Redirect::route('admin.image-categories.edit', $category->id);
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return Redirect::route('admin.image-categories.list');
    }

    /**
     * Compute the distinct galleries whose images carry this category, via
     * category -> media -> galleries, and hide the intermediate relation.
     */
    private function attachGalleries(Category $category): Category
    {
        $category->galleries = $category->media
            ->flatMap(fn ($media) => $media->galleries)
            ->unique('id')
            ->values();

        $category->makeHidden('media');

        return $category;
    }
}
