<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductCategoryRequest;
use App\Http\Requests\UpdateProductCategoryRequest;
use App\Models\ProductCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductCategoryController extends Controller
{
    public function list(Request $request): Response
    {
        $categories = ProductCategory::query()
            ->withCount('products')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Store/Categories/List', [
            'categories' => $categories,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Admin/Store/Categories/Edit', [
            'category' => null,
        ]);
    }

    public function edit(Request $request, int $id): Response
    {
        $category = ProductCategory::query()
            ->withCount('products')
            ->findOrFail($id);

        return Inertia::render('Admin/Store/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function store(StoreProductCategoryRequest $request): RedirectResponse|JsonResponse
    {
        $category = ProductCategory::create($this->categoryAttributes($request->validated()));

        if ($request->wantsJson()) {
            return response()->json($category);
        }

        return Redirect::route('admin.store.categories.edit', $category->id);
    }

    public function update(UpdateProductCategoryRequest $request, int $id): RedirectResponse
    {
        $category = ProductCategory::findOrFail($id);
        $category->update($this->categoryAttributes($request->validated(), $category));

        return Redirect::route('admin.store.categories.edit', $category->id);
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $category = ProductCategory::findOrFail($id);
        $category->products()->detach();
        $category->delete();

        return Redirect::route('admin.store.categories.list');
    }

    public function apiList(Request $request): JsonResponse
    {
        $categories = ProductCategory::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return response()->json($categories);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function categoryAttributes(array $validated, ?ProductCategory $existing = null): array
    {
        $slug = $validated['slug'] ?? null;

        if (empty($slug)) {
            $slug = $existing?->slug ?: Str::slug($validated['name']);
        }

        return [
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'sort_order' => $validated['sort_order'] ?? $existing?->sort_order ?? 0,
        ];
    }
}
