<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\User;
use App\Support\PublicPageData;
use App\Support\PublishedAt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function list(Request $request): Response
    {
        $posts = BlogPost::query()
            ->with(['author:id,name', 'featuredImage', 'categories'])
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Admin/Blog/List', [
            'posts' => $posts,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Admin/Blog/Edit', [
            'post' => null,
            'categories' => BlogCategory::query()->orderBy('name')->get(),
            'authors' => User::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function edit(Request $request, int $id): Response
    {
        $post = BlogPost::query()
            ->with(['author:id,name', 'featuredImage', 'categories'])
            ->findOrFail($id);

        return Inertia::render('Admin/Blog/Edit', [
            'post' => $post,
            'categories' => BlogCategory::query()->orderBy('name')->get(),
            'authors' => User::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreBlogPostRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $post = BlogPost::create($this->postAttributes($validated));
        $post->categories()->sync($validated['category_ids'] ?? []);

        return Redirect::route('admin.blog.edit', $post->id);
    }

    public function update(UpdateBlogPostRequest $request, int $id): RedirectResponse
    {
        $post = BlogPost::findOrFail($id);
        $validated = $request->validated();

        $post->update($this->postAttributes($validated, $post));
        $post->categories()->sync($validated['category_ids'] ?? []);

        return Redirect::route('admin.blog.edit', $post->id);
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();

        return Redirect::route('admin.blog.list');
    }

    public function trash(Request $request): Response
    {
        $posts = BlogPost::onlyTrashed()
            ->with(['author:id,name', 'featuredImage', 'categories'])
            ->orderByDesc('deleted_at')
            ->get();

        return Inertia::render('Admin/Blog/Trash', [
            'posts' => $posts,
        ]);
    }

    public function restore(Request $request, int $id): RedirectResponse
    {
        $post = BlogPost::onlyTrashed()->findOrFail($id);
        $post->restore();

        return Redirect::route('admin.blog.trash');
    }

    public function forceDestroy(Request $request, int $id): RedirectResponse
    {
        $post = BlogPost::onlyTrashed()->findOrFail($id);
        $post->categories()->detach();
        $post->forceDelete();

        return Redirect::route('admin.blog.trash');
    }

    public function publicIndex(Request $request): Response
    {
        $posts = BlogPost::query()
            ->where('status', 'published')
            ->where(fn ($query) => $query->whereNull('published_at')->orWhere('published_at', '<=', now()))
            ->with(['featuredImage', 'author:id,name', 'categories'])
            ->orderByDesc('published_at')
            ->paginate(9);

        $title = $posts->currentPage() > 1 ? "Blog – Page {$posts->currentPage()}" : 'Blog';

        return Inertia::render('Collections/Blog/Index', [
            'posts' => $posts,
            'siteConfig' => PublicPageData::siteConfig(),
            'seo' => [
                'meta_title' => $title,
                'meta_description' => 'Wilderness medicine articles, field notes, and training news from Wilderness Medicine Outfitters.',
                'og_title' => $title,
                'og_description' => 'Wilderness medicine articles, field notes, and training news.',
                'og_image' => null,
                'canonical_url' => null,
                'robots' => 'index, follow',
                'structured_data' => null,
            ],
        ]);
    }

    public function publicShow(Request $request, string $slug): Response
    {
        $post = BlogPost::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where(fn ($query) => $query->whereNull('published_at')->orWhere('published_at', '<=', now()))
            ->with(['featuredImage', 'author:id,name', 'categories'])
            ->firstOrFail();

        return Inertia::render('Collections/Blog/Show', [
            'post' => $post,
            'siteConfig' => PublicPageData::siteConfig(),
            'seo' => [
                'meta_title' => $post->meta_title ?: $post->title,
                'meta_description' => $post->meta_description ?: $post->excerpt,
                'og_title' => $post->og_title,
                'og_description' => $post->og_description,
                'og_image' => $post->og_image,
                'canonical_url' => $post->canonical_url,
                'robots' => $post->robots,
                'structured_data' => $post->structured_data,
            ],
        ]);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function postAttributes(array $validated, ?BlogPost $post = null): array
    {
        $status = $validated['status'];
        $publishedAt = PublishedAt::resolve($status, $validated['published_at'] ?? null, $post?->published_at);

        return [
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'] ?? null,
            'featured_image_id' => $validated['featured_image_id'] ?? null,
            'status' => $status,
            'published_at' => $publishedAt,
            'user_id' => $validated['user_id'] ?? null,
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
}
