<?php

namespace App\Http\Controllers;

use App\Http\Requests\PageUpdateRequest;
use App\Models\Page;
use App\Support\RouteScanner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Friendly titles for known static route pages.
     *
     * @var array<string, string>
     */
    private static array $titleOverrides = [
        'welcome' => 'Home',
        'expert-witness' => 'Expert Witness',
        'expert-climbing' => 'Climbing - Mountaineering',
        'expert-shooting' => 'Archery, Shotguns, Rifles, and Pistols',
        'expert-horses' => 'Horses - Ranching',
        'expert-camps' => 'Camps - Guest Ranches',
        'resource' => 'Free lessons and Resources',
        'wfa-bsa' => 'WFA-BSA',
        'distance-awfa' => 'AWFA',
        'distance-awfa-wfr' => 'Converting AWFA to WFR',
        'distance-other' => 'Other DL Classes',
        'distance-promo' => 'Distance Learning Promo video',
        'epi-course' => 'EPI Course',
        'why-choose-wmo' => 'Why choose WMO',
        'wmo-testimonials' => 'Testimonials',
        'director-carl-weil' => 'Director',
        'faq-page' => 'Common Questions',
        'staff-members' => 'WMO Instructors',
        'new-students-information' => 'Students must Read',
        'under-age-21' => 'Under Age 21',
        'links' => 'Links',
        'elizabeth-wildlife' => 'Elizabeth Wildlife',
        'solar-facilities' => 'Solar Facilities',
        'why-paypal' => 'Why PayPal?',
        'gallery' => 'Gallery',
        'to-register' => 'To Register',
        'classes-information' => 'Class Information',
        'survival-expo' => 'Survival Expo',
    ];

    /**
     * Maps a page's route_name to the folder name under resources/js/Pages/
     * that holds its schema.ts (used by the frontend schemaRegistry
     * glob to resolve the right schema without a hand-maintained registry).
     *
     * @var array<string, string>
     */
    private static array $componentOverrides = [
        'welcome' => 'Public/Welcome',
        'gallery' => 'Public/Gallery',
        'contact' => 'Public/Contact',
        'expert-witness' => 'Public/ExpertWitness',
        'expert-climbing' => 'Public/ExpertClimbing',
        'expert-shooting' => 'Public/ExpertShooting',
        'expert-horses' => 'Public/ExpertHorses',
        'expert-camps' => 'Public/ExpertCamps',
        'resource' => 'Public/Resource',
        'wfa-bsa' => 'Public/DistanceWfaBsa',
        'distance-awfa' => 'Public/DistanceAwfa',
        'distance-awfa-wfr' => 'Public/DistanceAwfaToWfr',
        'distance-other' => 'Public/DistanceOther',
        'distance-promo' => 'Public/DistancePromo',
        'epi-course' => 'Public/DistanceEpi',
        'why-choose-wmo' => 'Public/WhyChooseWmo',
        'wmo-testimonials' => 'Public/Testimonials',
        'director-carl-weil' => 'Public/Director',
        'faq-page' => 'Public/CommonQuestions',
        'staff-members' => 'Public/Instructors',
        'new-students-information' => 'Public/NewStudents',
        'under-age-21' => 'Public/UnderAge21',
        'links' => 'Public/Links',
        'elizabeth-wildlife' => 'Public/ElizabethWildlife',
        'solar-facilities' => 'Public/SolarFacilities',
        'why-paypal' => 'Public/WhyPaypal',
        'to-register' => 'Public/ToRegister',
        'classes-information' => 'Public/ClassesInformation',
        'survival-expo' => 'Public/SurvivalExpo',
    ];

    private static function titleForRouteName(string $name): string
    {
        return self::$titleOverrides[$name] ?? Str::title(str_replace(['.', '-'], ' ', $name));
    }

    private static function componentForRouteName(string $name): string
    {
        return self::$componentOverrides[$name] ?? Str::studly($name);
    }

    /**
     * Sync scanned frontend routes into the pages table.
     */
    public static function syncPages(): void
    {
        $routeNames = [];

        foreach (RouteScanner::frontendPages() as $route) {
            $routeNames[] = $route['name'];

            $page = Page::firstOrCreate(
                ['route_name' => $route['name']],
                [
                    'title' => self::titleForRouteName($route['name']),
                    'is_visible' => true,
                    'component' => self::componentForRouteName($route['name']),
                ]
            );

            $expectedComponent = self::componentForRouteName($route['name']);
            if ($page->component !== $expectedComponent) {
                $page->update(['component' => $expectedComponent]);
            }
        }

        if ($routeNames !== []) {
            Page::query()->whereNotIn('route_name', $routeNames)->delete();
        }
    }

    public function list(Request $request): Response
    {
        self::syncPages();

        $pages = Page::query()
            ->where('is_visible', true)
            ->orderBy('title')
            ->get();

        return Inertia::render('Admin/Pages/List', [
            'pages' => $pages,
        ]);
    }

    public function edit(Request $request, int $id): Response
    {
        $page = Page::findOrFail($id);

        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page,
        ]);
    }

    public function update(PageUpdateRequest $request, int $id): RedirectResponse
    {
        $page = Page::findOrFail($id);

        $validated = $request->validated();
        $page->update([
            'content' => $validated['content'],
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'og_title' => $validated['og_title'] ?? null,
            'og_description' => $validated['og_description'] ?? null,
            'og_image' => $validated['og_image'] ?? null,
            'canonical_url' => $validated['canonical_url'] ?? null,
            'robots' => $validated['robots'] ?? null,
            'structured_data' => $validated['structured_data'] ?? null,
        ]);

        return Redirect::route('admin.pages.edit', $page->id);
    }
}
