<?php

/**
 * @return list<string>
 */
function headerNavigationTopLevelLabels(): array
{
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse();

    preg_match('/const mainDefaults: NavItem\[\] = \[(.*?)\n\];/s', $navigation, $matches);

    expect($matches[1] ?? null)->not->toBeNull();

    preg_match_all(
        "/^    (?:\{ label: '([^']+)'|\{\s+label: '([^']+)')/m",
        $matches[1],
        $labelMatches,
        PREG_SET_ORDER
    );

    return array_map(
        fn (array $match): string => $match[1] !== '' ? $match[1] : $match[2],
        $labelMatches
    );
}

test('header navigation top-level order keeps resource blog and contact us together at the end', function () {
    expect(headerNavigationTopLevelLabels())->toBe([
        'Classes',
        'Distance Blended Learning',
        'Expert Outdoor Witness',
        'Store',
        'About WMO',
        'Resource',
        'Blog',
        'Contact Us',
    ]);
});

test('header site label stays smaller than the previous wordmark size', function () {
    $nav = file_get_contents(base_path('resources/js/Components/Sections/Navigation/Navigation.tsx'));

    expect($nav)->not->toBeFalse();
    expect($nav)
        ->toContain('text-white uppercase tracking-[2px] font-normal text-sm')
        ->not->toContain('text-white uppercase tracking-[2px] font-normal text-lg');
});

test('header contact cta uses contact wmo label', function () {
    $nav = file_get_contents(base_path('resources/js/Components/Sections/Navigation/Navigation.tsx'));

    expect($nav)->not->toBeFalse();
    expect($nav)
        ->toContain('Contact WMO')
        ->not->toContain('Get in touch');
});

test('mobile nav does not prompt to install the app', function () {
    $nav = file_get_contents(base_path('resources/js/Components/Sections/Navigation/Navigation.tsx'));

    expect($nav)->not->toBeFalse();
    expect($nav)
        ->not->toContain('Install our app for a better experience')
        ->not->toContain('Click to download')
        ->not->toContain('InstallPWA');
});

test('smaller desktop header collapses resource blog and contact us into a more dropdown', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));
    $nav = file_get_contents(base_path('resources/js/Components/Sections/Navigation/Navigation.tsx'));
    $more = file_get_contents(base_path('resources/js/Components/Sections/Navigation/mega-nav/NavMorePanel.tsx'));
    $menu = file_get_contents(base_path('resources/js/Components/UI/NavigationMenu.tsx'));

    expect($navigation)->not->toBeFalse();
    expect($nav)->not->toBeFalse();
    expect($more)->not->toBeFalse();
    expect($menu)->not->toBeFalse();

    expect($navigation)
        ->toContain("export const headerMoreItemHrefs = ['/resource', '/blog', '/contact-us'] as const")
        ->toContain('export function isHeaderMoreItem');

    expect($nav)
        ->toContain('items.filter(isHeaderMoreItem)')
        ->toContain('className="max-2xl:hidden"')
        ->toContain('<NavMorePanel items={moreItems} className="2xl:hidden" />')
        ->toContain('flex-nowrap')
        ->toContain('whitespace-nowrap');

    expect($more)
        ->toContain('More')
        ->toContain('variant="dropdown"')
        ->toContain('hover:bg-forest-green-50');

    expect($menu)
        ->toContain('variant?: "panel" | "dropdown"')
        ->toContain('absolute right-0 top-full');
});
