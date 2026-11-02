<?php

beforeEach(function () {
    $this->withoutVite();
});

test('two-column mode splits numbered items across a tablet grid', function () {
    $section = file_get_contents(base_path('resources/js/Components/Sections/NumberedListSection.tsx'));

    expect($section)->not->toBeFalse();
    expect($section)
        ->toContain('columns?: 1 | 2')
        ->toContain('bodyAside?: boolean')
        ->toContain('listAside?: boolean')
        ->toContain('footerCard?: boolean')
        ->toContain('md:grid-cols-2')
        ->toContain('splitListColumns')
        ->toContain('start={firstColumnItems.length + 1}')
        ->toContain("from '@/Components/UI/SectionHeading'")
        ->toContain('sectionSpacing')
        ->toContain('bg-gradient-to-br from-charcoal-brown-800 via-charcoal-brown-900 to-charcoal-brown-950')
        ->toContain('bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950')
        ->toContain('flex flex-col gap-2')
        ->not->toContain('rounded-full');

    expect(substr_count($section, 'bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950'))
        ->toBe(2);
});

test('resource auto gear fall checklist uses a centered green footer card', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/Resource/Page.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/Resource/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($page)->toContain('id="auto-gear"')
        ->and($page)->toContain('footerCard')
        ->and($page)->toContain('footerNotes={data.autoGear.footerNotes}')
        ->and($schema)->toContain('Items to check in the fall')
        ->and($schema)->toContain('Anti freeze')
        ->and($schema)->toContain('greater invitation to theft');

    $section = file_get_contents(base_path('resources/js/Components/Sections/NumberedListSection.tsx'));

    expect($section)->not->toBeFalse()
        ->and($section)->toContain('font-bold leading-relaxed text-zinc-100')
        ->and($section)->toContain('text-2xl font-bold leading-none text-tea-green-400');
});

test('resource fox tv keeps a full-width heading with the list in a right card', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/Resource/Page.tsx'));
    $schema = file_get_contents(base_path('resources/js/Pages/Public/Resource/schema.ts'));

    expect($page)->not->toBeFalse()
        ->and($schema)->not->toBeFalse()
        ->and($page)->toContain('id="fox-tv"')
        ->and($page)->toContain('listAside')
        ->and($page)->toContain('listAsideHeading={data.foxTv.listHeading}')
        ->and($schema)->toContain("default: 'Take with you'")
        ->and($schema)->toContain('FOX TV chose Carl of WMO');
});

test('why choose WMO uses two-column quality questions', function () {
    $page = file_get_contents(base_path('resources/js/Pages/Public/WhyChooseWmo/Page.tsx'));

    expect($page)->not->toBeFalse()
        ->and($page)->toContain('<NumberedListSection')
        ->and($page)->toContain('items={data.questions.items}')
        ->and($page)->toContain('columns={2}')
        ->and($page)->toContain('bodyAside')
        ->and($page)->toContain('tagline={data.questions.tagline}');
});
