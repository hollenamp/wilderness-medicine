<?php

function layoutResolverSource(): string
{
    $source = file_get_contents(resource_path('js/lib/resolvePageLayouts.ts'));

    expect($source)->not->toBeFalse();

    return $source;
}

it('excludes filesystem layouts from the inertia page glob so they are not mixed-imported', function () {
    $app = file_get_contents(resource_path('js/app.tsx'));
    $ssr = file_get_contents(resource_path('js/ssr.tsx'));

    expect($app)->not->toBeFalse();
    expect($ssr)->not->toBeFalse();

    expect($app)
        ->toContain("import.meta.glob(['./Pages/**/*.tsx', '!./Pages/**/layout.tsx'])")
        ->not->toContain("import.meta.glob('./Pages/**/*.tsx')");

    expect($ssr)
        ->toContain("import.meta.glob(['./Pages/**/*.tsx', '!./Pages/**/layout.tsx'])")
        ->not->toContain("import.meta.glob('./Pages/**/*.tsx')");
});

it('loads filesystem layouts lazily from a dedicated glob', function () {
    $source = layoutResolverSource();

    expect($source)
        ->toContain("import.meta.glob<{ default: LayoutComponent }>(\n    '../Pages/**/layout.tsx',\n)")
        ->not->toContain('eager: true')
        ->toContain('export async function applyPageLayouts')
        ->toContain('await Promise.all');
});

it('walks parent directories so nested layouts wrap inner pages', function () {
    $source = layoutResolverSource();

    expect($source)
        ->toContain("name.split('/').slice(0, -1)")
        ->toContain('`../Pages/${dir}/layout.tsx`')
        ->toContain('dir = dir ? `${dir}/${segment}` : segment');

    expect(file_exists(resource_path('js/Pages/Public/layout.tsx')))->toBeTrue();
    expect(file_exists(resource_path('js/Pages/Admin/layout.tsx')))->toBeTrue();
    expect(file_exists(resource_path('js/Pages/Auth/layout.tsx')))->toBeTrue();
    expect(file_exists(resource_path('js/Pages/Collections/layout.tsx')))->toBeTrue();
});

it('shares the public layout with collection pages via a re-export', function () {
    $layout = file_get_contents(resource_path('js/Pages/Collections/layout.tsx'));

    expect($layout)->not->toBeFalse();
    expect($layout)
        ->toContain("export { default } from '../Public/layout'")
        ->not->toContain('Navigation')
        ->not->toContain('Footer');
});
