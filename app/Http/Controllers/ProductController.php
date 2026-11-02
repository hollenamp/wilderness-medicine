<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Support\PublicPageData;
use App\Support\PublishedAt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function list(Request $request): Response
    {
        $products = Product::query()
            ->with(['featuredImage', 'categories'])
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Admin/Store/Products/List', [
            'products' => $products,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Admin/Store/Products/Edit', [
            'product' => null,
            'categories' => ProductCategory::query()->orderBy('sort_order')->orderBy('name')->get(),
        ]);
    }

    public function edit(Request $request, int $id): Response
    {
        $product = Product::query()
            ->with(['featuredImage', 'categories'])
            ->findOrFail($id);

        return Inertia::render('Admin/Store/Products/Edit', [
            'product' => $product,
            'categories' => ProductCategory::query()->orderBy('sort_order')->orderBy('name')->get(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $product = Product::create($this->productAttributes($validated));
        $product->categories()->sync($this->categorySync($validated['category_ids'] ?? []));

        return Redirect::route('admin.store.products.edit', $product->id);
    }

    public function update(UpdateProductRequest $request, int $id): RedirectResponse
    {
        $product = Product::findOrFail($id);
        $validated = $request->validated();

        $product->update($this->productAttributes($validated, $product));
        $product->categories()->sync($this->categorySync($validated['category_ids'] ?? []));

        return Redirect::route('admin.store.products.edit', $product->id);
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return Redirect::route('admin.store.products.list');
    }

    public function trash(Request $request): Response
    {
        $products = Product::onlyTrashed()
            ->with(['featuredImage', 'categories'])
            ->orderByDesc('deleted_at')
            ->get();

        return Inertia::render('Admin/Store/Products/Trash', [
            'products' => $products,
        ]);
    }

    public function restore(Request $request, int $id): RedirectResponse
    {
        $product = Product::onlyTrashed()->findOrFail($id);
        $product->restore();

        return Redirect::route('admin.store.products.trash');
    }

    public function forceDestroy(Request $request, int $id): RedirectResponse
    {
        $product = Product::onlyTrashed()->findOrFail($id);
        $product->categories()->detach();
        $product->forceDelete();

        return Redirect::route('admin.store.products.trash');
    }

    public function publicIndex(Request $request): Response
    {
        $categories = ProductCategory::query()
            ->withCount(['products' => fn ($query) => $query->published()])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Collections/Store/Index', [
            'categories' => $categories,
            'siteConfig' => PublicPageData::siteConfig(),
            'seo' => [
                'meta_title' => 'Store',
                'meta_description' => 'Wilderness medicine kits, books, and training materials from Wilderness Medicine Outfitters. Call (303) 688-5176 to order.',
                'og_title' => 'Store',
                'og_description' => 'Wilderness medicine kits, books, and training materials. Call to order.',
                'og_image' => null,
                'canonical_url' => null,
                'robots' => 'index, follow',
                'structured_data' => null,
            ],
        ]);
    }

    public function publicCategory(Request $request, string $category): Response
    {
        $productCategory = ProductCategory::query()
            ->where('slug', $category)
            ->firstOrFail();

        $products = $productCategory->publishedProducts()
            ->paginate(24)
            ->withQueryString();

        return Inertia::render('Collections/Store/Category', [
            'category' => $productCategory,
            'products' => $products,
            'siteConfig' => PublicPageData::siteConfig(),
            'seo' => [
                'meta_title' => $productCategory->name,
                'meta_description' => $productCategory->description ?: $productCategory->name.' from Wilderness Medicine Outfitters. Call (303) 688-5176 to order.',
                'og_title' => $productCategory->name,
                'og_description' => $productCategory->description,
                'og_image' => null,
                'canonical_url' => null,
                'robots' => 'index, follow',
                'structured_data' => null,
            ],
        ]);
    }

    public function publicShow(Request $request, string $slug): Response
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->published()
            ->with(['featuredImage', 'categories'])
            ->firstOrFail();

        return Inertia::render('Collections/Store/Product', [
            'product' => $product,
            'siteConfig' => PublicPageData::siteConfig(),
            'seo' => [
                'meta_title' => $product->meta_title ?: $product->title,
                'meta_description' => $product->meta_description ?: $product->excerpt,
                'og_title' => $product->og_title,
                'og_description' => $product->og_description,
                'og_image' => $product->og_image,
                'canonical_url' => $product->canonical_url,
                'robots' => $product->robots,
                'structured_data' => $product->structured_data,
            ],
        ]);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function productAttributes(array $validated, ?Product $product = null): array
    {
        $status = $validated['status'];
        $publishedAt = PublishedAt::resolve($status, $validated['published_at'] ?? null, $product?->published_at);

        $variants = $validated['variants'] ?? null;

        if (is_array($variants) && $variants === []) {
            $variants = null;
        }

        return [
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'excerpt' => $validated['excerpt'] ?? null,
            'author' => $validated['author'] ?? null,
            'content' => $validated['content'] ?? null,
            'price' => $validated['price'] ?? null,
            'featured_image_id' => $validated['featured_image_id'] ?? null,
            'status' => $status,
            'published_at' => $publishedAt,
            'variants' => $variants,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'og_title' => $validated['og_title'] ?? null,
            'og_description' => $validated['og_description'] ?? null,
            'og_image' => $validated['og_image'] ?? null,
            'canonical_url' => $validated['canonical_url'] ?? null,
            'robots' => $validated['robots'] ?? null,
            'structured_data' => $validated['structured_data'] ?? null,
        ];
    }

    /**
     * @param  array<int, int|string>  $categoryIds
     * @return array<int, array{sort_order: int}>
     */
    private function categorySync(array $categoryIds): array
    {
        $sync = [];

        foreach (array_values($categoryIds) as $index => $id) {
            $sync[(int) $id] = ['sort_order' => $index];
        }

        return $sync;
    }
}
