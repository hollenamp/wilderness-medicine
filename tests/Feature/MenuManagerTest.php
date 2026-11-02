<?php

use App\Models\Menu;
use App\Models\Page;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin menus page creates a menu row for the requested location', function () {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->get(route('admin.menus.index', [
            'location' => 'header',
            'name' => 'Header Navigation',
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Menus/Index')
            ->where('selectedLocation', 'header')
            ->where('selectedMenu.location', 'header')
            ->where('selectedMenu.name', 'Header Navigation')
            ->where('selectedMenu.is_customized', false)
            ->has('menuItems')
            ->has('pages'));

    $this->assertDatabaseHas('menus', [
        'location' => 'header',
        'name' => 'Header Navigation',
    ]);
});

test('admin menus page picker does not offer sitemap or robots', function () {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->get(route('admin.menus.index', ['location' => 'header']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('pages', fn ($pages) => collect($pages)->pluck('url')
                ->filter(fn (string $url) => str_ends_with($url, '/sitemap.xml') || str_ends_with($url, '/robots.txt'))
                ->isEmpty()));
});

test('admin can select the footer location', function () {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->get(route('admin.menus.index', [
            'location' => 'footer',
            'name' => 'Footer Navigation',
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('selectedLocation', 'footer')
            ->where('selectedMenu.location', 'footer')
            ->where('selectedMenu.name', 'Footer Navigation'));

    $this->assertDatabaseHas('menus', ['location' => 'footer']);
});

test('admin can sync items into a location menu, which marks it customized', function () {
    $user = User::factory()->admin()->create();
    $menu = Menu::factory()->create([
        'name' => 'Header Navigation',
        'location' => 'header',
    ]);

    $this->actingAs($user)
        ->put(route('admin.menus.sync', $menu->id), [
            'name' => $menu->name,
            'items' => [
                ['id' => null, 'label' => 'Home', 'url' => '/', 'parent_id' => null, 'sort_order' => 0],
            ],
        ])
        ->assertRedirect(route('admin.menus.index', ['location' => 'header']));

    $this->assertDatabaseHas('menus', ['id' => $menu->id, 'is_customized' => true]);
    $this->assertDatabaseHas('menu_items', ['menu_id' => $menu->id, 'label' => 'Home', 'url' => '/']);
});

test('syncing keeps a new child under a new parent listed below it', function () {
    $user = User::factory()->admin()->create();
    $menu = Menu::factory()->create(['name' => 'Header', 'location' => 'header']);

    $this->actingAs($user)
        ->put(route('admin.menus.sync', $menu->id), [
            'name' => 'Header',
            'items' => [
                ['id' => -3, 'label' => 'Child', 'url' => '/c', 'parent_id' => -2, 'sort_order' => 0],
                ['id' => -2, 'label' => 'Parent', 'url' => '/p', 'parent_id' => null, 'sort_order' => 1],
            ],
        ])
        ->assertRedirect(route('admin.menus.index', ['location' => 'header']));

    $parent = $menu->items()->where('label', 'Parent')->firstOrFail();
    $child = $menu->items()->where('label', 'Child')->firstOrFail();

    expect($parent->parent_id)->toBeNull()
        ->and($child->parent_id)->toBe($parent->id);
});

test('syncing keeps every parent link across existing and new items in any order', function () {
    $user = User::factory()->admin()->create();
    $menu = Menu::factory()->create(['name' => 'Header', 'location' => 'header']);

    $about = $menu->items()->create(['parent_id' => null, 'type' => 'custom_link', 'url' => '/about', 'label' => 'About', 'sort_order' => 0]);
    $team = $menu->items()->create(['parent_id' => null, 'type' => 'custom_link', 'url' => '/team', 'label' => 'Team', 'sort_order' => 1]);
    $staff = $menu->items()->create(['parent_id' => $team->id, 'type' => 'custom_link', 'url' => '/staff', 'label' => 'Staff', 'sort_order' => 2]);

    $this->actingAs($user)
        ->put(route('admin.menus.sync', $menu->id), [
            'name' => 'Header',
            'items' => [
                ['id' => $staff->id, 'label' => 'Staff', 'url' => '/staff', 'parent_id' => $team->id, 'sort_order' => 0],
                ['id' => -4, 'label' => 'History', 'url' => '/history', 'parent_id' => $about->id, 'sort_order' => 1],
                ['id' => $team->id, 'label' => 'Team', 'url' => '/team', 'parent_id' => -2, 'sort_order' => 2],
                ['id' => -3, 'label' => 'Grandchild', 'url' => '/gc', 'parent_id' => -4, 'sort_order' => 3],
                ['id' => $about->id, 'label' => 'About', 'url' => '/about', 'parent_id' => null, 'sort_order' => 4],
                ['id' => -2, 'label' => 'People', 'url' => '/people', 'parent_id' => null, 'sort_order' => 5],
            ],
        ])
        ->assertRedirect(route('admin.menus.index', ['location' => 'header']));

    $parentOf = fn (string $label) => $menu->items()->where('label', $label)->firstOrFail()->parent_id;
    $idOf = fn (string $label) => $menu->items()->where('label', $label)->firstOrFail()->id;

    expect($parentOf('Staff'))->toBe($team->id)
        ->and($parentOf('History'))->toBe($about->id)
        ->and($parentOf('Team'))->toBe($idOf('People'))
        ->and($parentOf('Grandchild'))->toBe($idOf('History'))
        ->and($parentOf('About'))->toBeNull()
        ->and($parentOf('People'))->toBeNull()
        ->and($menu->items()->count())->toBe(6);
});

test('syncing rejects circular parent relationships', function () {
    $user = User::factory()->admin()->create();
    $menu = Menu::factory()->create(['name' => 'Header', 'location' => 'header']);

    $this->actingAs($user)
        ->put(route('admin.menus.sync', $menu->id), [
            'name' => 'Header',
            'items' => [
                ['id' => -2, 'label' => 'A', 'url' => '/a', 'parent_id' => -3, 'sort_order' => 0],
                ['id' => -3, 'label' => 'B', 'url' => '/b', 'parent_id' => -2, 'sort_order' => 1],
            ],
        ])
        ->assertStatus(422);

    expect($menu->items()->count())->toBe(0);
});

test('admin can reset a customized menu to defaults', function () {
    $user = User::factory()->admin()->create();
    $menu = Menu::factory()->create([
        'name' => 'Header Navigation',
        'location' => 'header',
        'is_customized' => true,
    ]);

    $menu->items()->create([
        'parent_id' => null,
        'type' => 'custom_link',
        'url' => '/custom',
        'label' => 'Custom Link',
        'sort_order' => 0,
    ]);

    $this->actingAs($user)
        ->post(route('admin.menus.reset', $menu->id))
        ->assertRedirect(route('admin.menus.index', ['location' => 'header']));

    $this->assertDatabaseHas('menus', ['id' => $menu->id, 'is_customized' => false]);
    $this->assertDatabaseMissing('menu_items', ['menu_id' => $menu->id, 'label' => 'Custom Link']);
});

test('visiting menus without a location does not create menu rows', function () {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->get(route('admin.menus.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('selectedLocation', null)
            ->where('selectedMenu', null));

    expect(Menu::query()->whereNotNull('location')->count())->toBe(0);
});

test('menus page syncs visible pages without visiting page settings first', function () {
    $user = User::factory()->admin()->create();

    expect(Page::query()->count())->toBe(0);

    $this->actingAs($user)
        ->get(route('admin.menus.index', [
            'location' => 'header',
            'name' => 'Header Navigation',
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Menus/Index')
            ->has('pages.0.id')
            ->has('pages.0.title')
            ->has('pages.0.url'));

    expect(Page::query()->where('is_visible', true)->count())->toBeGreaterThan(0);
});
