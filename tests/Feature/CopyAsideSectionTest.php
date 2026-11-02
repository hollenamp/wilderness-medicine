<?php

beforeEach(function () {
    $this->withoutVite();
});

test('fees section is a two-column copy and aside split', function () {
    $section = file_get_contents(base_path('resources/js/Components/Sections/CopyAsideSection.tsx'));

    expect($section)->not->toBeFalse();
    expect($section)
        ->toContain('md:grid-cols-2')
        ->toContain('text-white md:sticky md:top-28 md:self-start')
        ->toContain('rounded-lg bg-gradient-to-br from-charcoal-brown-800 via-charcoal-brown-900 to-charcoal-brown-950')
        ->toContain('rounded-lg bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950')
        ->toContain('text-tea-green-400')
        ->toContain('text-charcoal-brown-800')
        ->toContain("'zinc-50': 'bg-zinc-50'")
        ->toContain("from '@/Components/UI/SectionHeading'")
        ->toContain('sectionSpacing')
        ->not->toContain('text-center')
        ->not->toContain('rounded-full');
});

test('expert witness fees use the copy aside instead of a single-column intro', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/ExpertWitness/Page.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/ExpertWitness/schema.ts'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/CopyAsideSection.tsx'));

    expect($page)->not->toBeFalse();
    expect($schema)->not->toBeFalse();
    expect($section)->not->toBeFalse();

    expect($page)
        ->toContain('<CopyAsideSection')
        ->toContain('facts={data.fees.highlights}')
        ->toContain('headingInColumn')
        ->toContain('id="fees"');

    $introCount = substr_count($page, '<PageIntroSection');

    expect($introCount)->toBe(1)
        ->and($schema)->toContain('At a glance')
        ->and($schema)->toContain('Free initial review')
        ->and($schema)->not->toContain('Overnight & trial days')
        ->and($schema)->toContain('Local depositions')
        ->and($schema)->toContain('Expert associates')
        ->and($schema)->not->toContain('evening-coverage charges')
        ->and($schema)->toContain('prepays travel costs')
        ->and($section)->toContain('<SectionHeading title={headline} titleLine2={headlineLine2} />')
        ->and($section)->toContain('headingInColumn')
        ->and($section)->toContain('text-white md:sticky md:top-28')
        ->and($section)->toContain('sticky aside card right');
});

test('why choose WMO notes use a zinc band with a full-width heading above the aside', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/WhyChooseWmo/Page.tsx'));
    $section = file_get_contents(base_path('resources/js/Components/Sections/CopyAsideSection.tsx'));

    expect($page)->not->toBeFalse()
        ->and($section)->not->toBeFalse()
        ->and($page)->toContain('facts={data.notes.highlights}')
        ->and($page)->toContain('background="zinc-50"')
        ->and($page)->toContain('id="notes"')
        ->and($section)->toContain('<SectionHeading title={headline} titleLine2={headlineLine2} />')
        ->and($section)->toContain('grid grid-cols-1 items-start gap-8 md:gap-12 lg:gap-16')
        ->and($section)->toContain('text-white md:sticky md:top-28')
        ->and($section)->toContain("asideHeading.trim() || 'Highlights'")
        ->and($section)->toContain('asideCompact ? \'gap-1 py-3\' : \'gap-2 py-6\'');
});
