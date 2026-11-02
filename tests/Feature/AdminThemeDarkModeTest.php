<?php

it('scopes dark admin theme tokens under html.admin-theme.dark for nested wrappers', function () {
    $css = file_get_contents(resource_path('css/admin.css'));

    expect($css)
        ->toContain('html.admin-theme.dark .admin-theme')
        ->toContain('.admin-theme.dark');
});

it('applies resolvedTheme on admin and auth layout roots', function () {
    expect(file_get_contents(resource_path('js/Pages/Admin/layout.tsx')))
        ->toContain('resolvedTheme')
        ->toContain("cx('admin-theme min-h-svh w-full', resolvedTheme)");

    expect(file_get_contents(resource_path('js/Pages/Auth/layout.tsx')))
        ->toContain('resolvedTheme')
        ->toContain("cx('admin-theme min-h-svh w-full bg-background text-foreground', resolvedTheme, className)");
});
