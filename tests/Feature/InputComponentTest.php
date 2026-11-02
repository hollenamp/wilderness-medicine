<?php

it('applies disabled styles before the file pseudo-element so generated CSS stays valid', function () {
    $source = file_get_contents(resource_path('js/Components/Inputs/Input.tsx'));

    expect($source)->not->toBeFalse();
    expect($source)
        ->toContain('disabled:file:pointer-events-none')
        ->toContain('disabled:file:border-border')
        ->toContain('disabled:file:bg-muted')
        ->toContain('disabled:file:text-muted-foreground')
        ->not->toContain('file:disabled:');
});

it('excludes compiled assets and tests from tailwind class detection', function () {
    $css = file_get_contents(resource_path('css/app.css'));

    expect($css)->not->toBeFalse();
    expect($css)
        ->toContain('@source not "../../public_html/build"')
        ->toContain('@source not "../../bootstrap/ssr"')
        ->toContain('@source not "../../tests"');
});
