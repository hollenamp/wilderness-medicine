<?php

namespace App\Http\Controllers;

use App\Http\Requests\SyncMenuRequest;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Show the menu manager for a location slug from the frontend registry.
     * Location keys/labels live in navigation.ts — PHP only firstOrCreates
     * a row when the admin visits a given slug.
     */
    public function index(Request $request): Response
    {
        $location = $request->query('location');
        $name = $request->query('name');

        $selectedMenu = null;
        $menuItems = collect();

        if (is_string($location) && $location !== '') {
            $selectedMenu = Menu::firstOrCreate(
                ['location' => $location],
                [
                    'name' => is_string($name) && $name !== ''
                        ? $name
                        : Str::headline($location),
                    'is_customized' => false,
                ],
            );

            $menuItems = $selectedMenu->items()->get([
                'id',
                'menu_id',
                'parent_id',
                'type',
                'url',
                'label',
                'sort_order',
            ]);
        }

        PageController::syncPages();

        $pages = Page::query()
            ->where('is_visible', true)
            ->orderBy('title')
            ->get(['id', 'route_name', 'title'])
            ->map(fn (Page $page) => [
                'id' => $page->id,
                'title' => $page->title,
                'url' => route($page->route_name),
            ]);

        return Inertia::render('Admin/Menus/Index', [
            'selectedLocation' => is_string($location) ? $location : null,
            'selectedMenu' => $selectedMenu,
            'menuItems' => $menuItems,
            'pages' => $pages,
        ]);
    }

    public function sync(SyncMenuRequest $request, int $id): RedirectResponse
    {
        $menu = Menu::findOrFail($id);
        $validated = $request->validated();
        $items = $validated['items'];

        $this->validateNoCycles($items);

        DB::transaction(function () use ($menu, $validated, $items) {
            $menu->update(['name' => $validated['name'], 'is_customized' => true]);

            $payloadIds = collect($items)
                ->pluck('id')
                ->filter(fn ($id) => is_int($id) || (is_numeric($id) && (int) $id > 0))
                ->map(fn ($id) => (int) $id)
                ->all();

            if (count($payloadIds) > 0) {
                $menu->items()->whereNotIn('id', $payloadIds)->delete();
            } else {
                $menu->items()->delete();
            }

            $idMap = [];
            $savedItems = [];

            // Pass 1: save every item so each temp id has a real id before any parent is resolved.
            foreach ($items as $index => $itemData) {
                $rawId = $itemData['id'] ?? null;
                $isExisting = $rawId !== null && is_numeric($rawId) && (int) $rawId > 0;

                if ($isExisting) {
                    $item = MenuItem::query()
                        ->where('menu_id', $menu->id)
                        ->where('id', (int) $rawId)
                        ->firstOrFail();

                    $item->update([
                        'type' => 'custom_link',
                        'url' => $itemData['url'],
                        'label' => $itemData['label'],
                        'sort_order' => $itemData['sort_order'],
                    ]);

                    $idMap[(int) $rawId] = $item->id;
                } else {
                    $item = $menu->items()->create([
                        'parent_id' => null,
                        'type' => 'custom_link',
                        'url' => $itemData['url'],
                        'label' => $itemData['label'],
                        'sort_order' => $itemData['sort_order'],
                    ]);

                    if ($rawId !== null) {
                        $idMap[$rawId] = $item->id;
                    }
                }

                $savedItems[$index] = $item;
            }

            // Pass 2: link parents now that the id map is complete.
            foreach ($items as $index => $itemData) {
                $savedItems[$index]->update([
                    'parent_id' => $this->resolveParentId($itemData['parent_id'] ?? null, $idMap),
                ]);
            }
        });

        return Redirect::route('admin.menus.index', ['location' => $menu->location])
            ->with('success', 'Menu saved.');
    }

    public function reset(int $id): RedirectResponse
    {
        $menu = Menu::findOrFail($id);

        DB::transaction(function () use ($menu) {
            $menu->items()->forceDelete();
            $menu->update(['is_customized' => false]);
        });

        return Redirect::route('admin.menus.index', ['location' => $menu->location])
            ->with('success', 'Menu reset to defaults.');
    }

    /**
     * @param  int|string|null  $parentId
     * @param  array<int|string, int>  $idMap
     */
    private function resolveParentId($parentId, array $idMap): ?int
    {
        if ($parentId === null) {
            return null;
        }

        if (isset($idMap[$parentId])) {
            return $idMap[$parentId];
        }

        if (is_numeric($parentId) && (int) $parentId > 0) {
            return (int) $parentId;
        }

        return null;
    }

    /**
     * @param  array<int, array{id?: int|null, parent_id?: int|null}>  $items
     */
    private function validateNoCycles(array $items): void
    {
        $parentMap = [];

        foreach ($items as $index => $item) {
            $key = $item['id'] ?? "new-{$index}";
            $parentMap[$key] = $item['parent_id'] ?? null;
        }

        foreach ($parentMap as $key => $parentId) {
            if ($parentId === null) {
                continue;
            }

            $visited = [$key => true];
            $current = $parentId;

            while ($current !== null) {
                if (isset($visited[$current])) {
                    abort(422, 'Menu items cannot have circular parent relationships.');
                }

                $visited[$current] = true;
                $current = $parentMap[$current] ?? null;
            }
        }
    }
}
