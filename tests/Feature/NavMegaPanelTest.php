<?php

beforeEach(function () {
    $this->withoutVite();
});

test('mega menu uses a four-column layout with a dark contact CTA', function () {
    $panel = file_get_contents(base_path('resources/js/Components/Sections/Navigation/mega-nav/NavMegaPanel.tsx'));

    expect($panel)->not->toBeFalse();
    expect($panel)
        ->toContain('lg:grid-cols-4')
        ->toContain('lg:col-span-3')
        ->toContain('bg-gradient-to-br from-charcoal-brown-900 via-charcoal-brown-950 to-charcoal-brown-950')
        ->toContain('Free initial review')
        ->toContain('Need an outdoor expert?')
        ->toContain('aria-label="Call to action"')
        ->toContain('tel:${phone.replace(/[^\\d+]/g, \'\')}')
        ->toContain('Call {phone}')
        ->toContain('Contact WMO')
        ->toContain('href="/contact-us"')
        ->toContain('<Phone')
        ->toContain('item.description')
        ->toContain('!item.hideViewAll')
        ->toContain('View all')
        ->not->toContain('rounded-full');
});

test('classes mega menu hides the view all link', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));
    $panel = file_get_contents(base_path('resources/js/Components/Sections/Navigation/mega-nav/NavMegaPanel.tsx'));

    expect($navigation)->not->toBeFalse();
    expect($panel)->not->toBeFalse();
    expect($navigation)
        ->toContain("label: 'Classes'")
        ->toContain('hideViewAll: true')
        ->toContain("href: '/classes-information'");
    expect($panel)->toContain('!item.hideViewAll');
});

test('about wmo mega menu hides the view all link', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse();
    expect($navigation)->toMatch(
        "/label: 'About WMO',\s+href: '\/why-choose-wmo',\s+icon: BadgeCheck,\s+hideViewAll: true/"
    );
});

test('distance blended learning mega menu hides the view all link', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse();
    expect($navigation)->toMatch(
        "/label: 'Distance Blended Learning',\s+href: '\/distance-learning\/other-dl-classes',\s+icon: GraduationCap,\s+hideViewAll: true/"
    );
});

test('expert outdoor witness mega menu hides the view all link', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse();
    expect($navigation)->toMatch(
        "/label: 'Expert Outdoor Witness',\s+href: '\/expert-witness',\s+icon: Gavel,\s+hideViewAll: true/"
    );
});

test('mega menu parent labels link to the item href', function () {
    $panel = file_get_contents(base_path('resources/js/Components/Sections/Navigation/mega-nav/NavMegaPanel.tsx'));

    expect($panel)->not->toBeFalse()
        ->and($panel)->toContain('asChild')
        ->and($panel)->toContain('<Link href={item.href}>')
        ->and($panel)->toContain('<RiArrowDownSLine');
});

test('mega menu parent trigger does not add a bottom border on open', function () {
    $panel = file_get_contents(base_path('resources/js/Components/Sections/Navigation/mega-nav/NavMegaPanel.tsx'));

    expect($panel)->not->toBeFalse();
    expect($panel)
        ->not->toContain('data-[state=open]:border-b-2')
        ->not->toContain('hover:border-b');
});

test('mega menu child links pad the hover background away from the label', function () {
    $panel = file_get_contents(base_path('resources/js/Components/Sections/Navigation/mega-nav/NavMegaPanel.tsx'));

    expect($panel)->not->toBeFalse();
    expect($panel)
        ->toContain('h-auto px-4 py-3 hover:border-transparent')
        ->toContain('hover:bg-forest-green-50');
});

test('navigation passes the site phone into the mega menu panel', function () {
    $nav = file_get_contents(base_path('resources/js/Components/Sections/Navigation/Navigation.tsx'));
    $layout = file_get_contents(base_path('resources/js/Pages/Public/layout.tsx'));

    expect($nav)->not->toBeFalse();
    expect($layout)->not->toBeFalse();
    expect($nav)
        ->toContain('phone?: string | null')
        ->toContain('<NavMegaPanel item={item} phone={phone}');
    expect($layout)->toContain('phone={siteConfig.phone}');
});
