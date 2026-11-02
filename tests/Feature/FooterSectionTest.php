<?php

beforeEach(function () {
    $this->withoutVite();
});

test('footer uses four columns with explore and about top-level menus', function () {
    $footer = file_get_contents(base_path('resources/js/Components/Sections/Footer.tsx'));

    expect($footer)->not->toBeFalse();

    expect($footer)
        ->toContain('lg:grid-cols-4')
        ->toContain('h4 className="text-xl font-semibold uppercase tracking-wide">Explore</h4>')
        ->toContain('h4 className="text-xl font-semibold uppercase tracking-wide">About</h4>')
        ->toContain('exploreItems')
        ->toContain('aboutItems')
        ->toContain('exploreItems.map((item)')
        ->toContain('aboutItems.map((item)')
        ->toContain('{item.label}')
        ->toContain('href={item.href}')
        ->not->toContain('xl:grid-cols-6')
        ->not->toContain('nestedNavItems')
        ->not->toContain('item.children?.map((child)')
        ->not->toContain('href={child.href}')
        ->not->toContain('{child.label}');
});

test('footer brand column shows the logo above the company name', function () {
    $footer = file_get_contents(base_path('resources/js/Components/Sections/Footer.tsx'));

    expect($footer)->not->toBeFalse();

    expect($footer)
        ->toContain('DEFAULT_SITE_LOGO')
        ->toContain('resolveSiteLogoUrl')
        ->toContain('src={logoSrc}')
        ->toContain('alt={site}')
        ->toContain('logo_path')
        ->toContain('<h3 className="text-2xl font-bold text-tea-green-400">');
});

test('navigation defaults still include nested class about and expert witness pages', function () {
    $navigation = file_get_contents(base_path('resources/js/Pages/Public/navigation.ts'));

    expect($navigation)->not->toBeFalse();

    expect($navigation)
        ->toContain("label: 'Expert Outdoor Witness'")
        ->toContain("href: '/expert-witness'")
        ->toContain("href: '/expert-page-rock-climbing-gyms-traditional-climbing-and-mountaineering'")
        ->toContain("href: '/expert-page-shooting-activities-archery-pistol-shotgun-and-rifle'")
        ->toContain("href: '/expert-page-horses-livestock-ranches'")
        ->toContain("href: '/expert-page-camps-and-guest-ranches'")
        ->toContain("label: 'Distance Blended Learning'")
        ->toContain("href: '/wfa-bsa'")
        ->toContain("href: '/distance-learning/awfa'")
        ->toContain("href: '/distance-learning/converting-awfa-wfr'")
        ->toContain("href: '/distance-learning/other-dl-classes'")
        ->toContain("href: '/distance-learning/promo'")
        ->toContain("href: '/epi-course'")
        ->toContain("label: 'About WMO'")
        ->toContain("href: '/why-choose-wmo'")
        ->toContain("href: '/wmo-testimonials'")
        ->toContain("href: '/director-carl-weil'")
        ->toContain("href: '/faq-page'")
        ->toContain("href: '/staff-members'")
        ->toContain("href: '/gallery'")
        ->toContain("href: '/new-students-information'")
        ->toContain("href: '/under-age-21'")
        ->toContain("href: '/links'")
        ->toContain("href: '/elizabeth-wildlife'")
        ->toContain("href: '/solar-facilities'")
        ->toContain("href: '/why-paypal'");
});
