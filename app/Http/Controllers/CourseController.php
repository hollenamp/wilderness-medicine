<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use App\Support\PublicPageData;
use App\Support\PublishedAt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function list(Request $request): Response
    {
        $courses = Course::query()
            ->with(['featuredImage'])
            ->orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Admin/Classes/List', [
            'courses' => $courses,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Admin/Classes/Edit', [
            'course' => null,
        ]);
    }

    public function edit(Request $request, int $id): Response
    {
        $course = Course::query()
            ->with(['featuredImage'])
            ->findOrFail($id);

        return Inertia::render('Admin/Classes/Edit', [
            'course' => $course,
        ]);
    }

    public function store(StoreCourseRequest $request): RedirectResponse
    {
        $course = Course::create($this->courseAttributes($request->validated()));

        return Redirect::route('admin.classes.edit', $course->id);
    }

    public function update(UpdateCourseRequest $request, int $id): RedirectResponse
    {
        $course = Course::findOrFail($id);
        $course->update($this->courseAttributes($request->validated(), $course));

        return Redirect::route('admin.classes.edit', $course->id);
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return Redirect::route('admin.classes.list');
    }

    public function trash(Request $request): Response
    {
        $courses = Course::onlyTrashed()
            ->with(['featuredImage'])
            ->orderByDesc('deleted_at')
            ->get();

        return Inertia::render('Admin/Classes/Trash', [
            'courses' => $courses,
        ]);
    }

    public function restore(Request $request, int $id): RedirectResponse
    {
        $course = Course::onlyTrashed()->findOrFail($id);
        $course->restore();

        return Redirect::route('admin.classes.trash');
    }

    public function forceDestroy(Request $request, int $id): RedirectResponse
    {
        $course = Course::onlyTrashed()->findOrFail($id);
        $course->forceDelete();

        return Redirect::route('admin.classes.trash');
    }

    public function publicIndex(Request $request): Response
    {
        $courses = Course::query()
            ->published()
            ->with(['featuredImage'])
            ->orderBy('sort_order')
            ->orderBy('title')
            ->paginate(12);

        $title = $courses->currentPage() > 1 ? "Classes – Page {$courses->currentPage()}" : 'Classes';

        return Inertia::render('Collections/Classes/Index', [
            'courses' => $courses,
            'siteConfig' => PublicPageData::siteConfig(),
            'seo' => [
                'meta_title' => $title,
                'meta_description' => 'Wilderness First Aid, Wilderness First Responder, WEMT, and other wilderness medicine classes from Wilderness Medicine Outfitters.',
                'og_title' => $title,
                'og_description' => 'Wilderness First Aid, Wilderness First Responder, and other wilderness medicine classes.',
                'og_image' => null,
                'canonical_url' => null,
                'robots' => 'index, follow',
                'structured_data' => null,
            ],
        ]);
    }

    public function publicShow(Request $request, string $slug): Response
    {
        $course = Course::query()
            ->where('slug', $slug)
            ->published()
            ->with(['featuredImage'])
            ->firstOrFail();

        return Inertia::render('Collections/Classes/Show', [
            'course' => $course,
            'siteConfig' => PublicPageData::siteConfig(),
            'seo' => [
                'meta_title' => $course->meta_title ?: $course->title,
                'meta_description' => $course->meta_description ?: $course->excerpt,
                'og_title' => $course->og_title,
                'og_description' => $course->og_description,
                'og_image' => $course->og_image,
                'canonical_url' => $course->canonical_url,
                'robots' => $course->robots,
                'structured_data' => $course->structured_data,
            ],
        ]);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function courseAttributes(array $validated, ?Course $course = null): array
    {
        $status = $validated['status'];
        $publishedAt = PublishedAt::resolve($status, $validated['published_at'] ?? null, $course?->published_at);

        return [
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'nav_label' => $validated['nav_label'] ?? null,
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'] ?? null,
            'featured_image_id' => $validated['featured_image_id'] ?? null,
            'status' => $status,
            'published_at' => $publishedAt,
            'sort_order' => $validated['sort_order'] ?? 0,
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
