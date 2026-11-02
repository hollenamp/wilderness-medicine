<?php

it('defines content.md brand palette tokens in app.css', function () {
    $css = file_get_contents(dirname(__DIR__, 2).'/resources/css/app.css');

    expect($css)->not->toBeFalse()
        ->and($css)->toContain('--color-charcoal-brown-500: oklch(61.35% 0.028 132.28)')
        ->and($css)->toContain('--color-forest-green-500: oklch(68.85% 0.170 141.97)')
        ->and($css)->toContain('--color-tea-green-500: oklch(67.22% 0.153 142.83)')
        // Semantic primary/secondary map to brand so shared Components stay themeable
        ->and($css)->toContain('--color-primary-500: var(--color-charcoal-brown-500)')
        ->and($css)->toContain('--color-secondary-500: var(--color-forest-green-500)');
});

it('remaps primary and secondary scales to violet under admin-theme', function () {
    $css = file_get_contents(dirname(__DIR__, 2).'/resources/css/admin.css');

    expect($css)->not->toBeFalse()
        ->and($css)->toContain('--color-primary-500: oklch(0.606 0.25 292.717)')
        ->and($css)->toContain('--color-secondary-500: oklch(0.606 0.25 292.717)');
});
