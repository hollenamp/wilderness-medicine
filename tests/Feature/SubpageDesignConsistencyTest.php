<?php

/**
 * Guards that public sub-pages are composed from the home-styled section set
 * rather than the starter-kit sections they replaced, and that those sections
 * keep using the shared brand primitives instead of the old zinc/pill styling.
 */
beforeEach(function () {
    $this->withoutVite();
});

function resourcePath(string $relative): string
{
    return dirname(__DIR__, 2).'/resources/js/'.$relative;
}

function readResource(string $relative): string
{
    $contents = file_get_contents(resourcePath($relative));

    expect($contents)->not->toBeFalse();

    return $contents;
}

$subPages = [
    'Contact/Page.tsx',
    'Gallery/Page.tsx',
    'ExpertWitness/Page.tsx',
    'ExpertHorses/Page.tsx',
    'ExpertShooting/Page.tsx',
    'ExpertClimbing/Page.tsx',
    'ExpertCamps/Page.tsx',
    'Resource/Page.tsx',
    'DistanceWfaBsa/Page.tsx',
    'DistanceAwfa/Page.tsx',
    'DistanceAwfaToWfr/Page.tsx',
    'DistanceOther/Page.tsx',
    'DistancePromo/Page.tsx',
    'DistanceEpi/Page.tsx',
    'WhyChooseWmo/Page.tsx',
    'Testimonials/Page.tsx',
    'Director/Page.tsx',
    'CommonQuestions/Page.tsx',
    'Instructors/Page.tsx',
    'NewStudents/Page.tsx',
    'UnderAge21/Page.tsx',
    'Links/Page.tsx',
    'ElizabethWildlife/Page.tsx',
    'SolarFacilities/Page.tsx',
    'WhyPaypal/Page.tsx',
];

$brandSections = [
    'Sections/PageIntroSection.tsx',
    'Sections/StorySplitSection.tsx',
    'Sections/ServiceCardsSection.tsx',
    'Sections/TestimonialWallSection.tsx',
    'Sections/TestimonialCarouselSection.tsx',
    'Sections/PageCTASection.tsx',
    'Sections/FaqAccordionSection.tsx',
    'Sections/GalleryGridSection.tsx',
    'Sections/CopyAsideSection.tsx',
    'Sections/MediaSplitSection.tsx',
    'Sections/TwoColumnMediaSection.tsx',
    'Sections/NumberedListSection.tsx',
    'Sections/BlogIndexSection.tsx',
    'Sections/BlogArticleSection.tsx',
];

test('sub-pages no longer import the starter-kit sections', function (string $page) {
    $contents = readResource('Pages/Public/'.$page);

    expect($contents)
        ->not->toContain("from '@/Components/Sections/IntroSection'")
        ->not->toContain("from '@/Components/Sections/CTASection'")
        ->not->toContain("from '@/Components/Sections/ReviewsSection'")
        ->not->toContain("from '@/Components/Sections/TwoColumnAboutDetailed'")
        ->not->toContain("from '@/Components/Sections/Services/ServicesOverview'")
        ->not->toContain("from '@/Components/Sections/GallerySection'")
        ->not->toContain("from '@/Components/Sections/FaqSection'");
})->with($subPages);

test('every sub-page composes only shared section components', function (string $page) {
    $contents = readResource('Pages/Public/'.$page);

    expect($contents)
        ->toContain('<SubpageBannerSection')
        ->toContain('mergeDefaults(schema, content)')
        ->not->toContain('<section');
})->with($subPages);

test('sub-page sections use the home page heading and button primitives', function (string $section) {
    $contents = readResource('Components/'.$section);

    expect($contents)->toContain("from '@/Components/UI/SectionHeading'");
    expect($contents)->toContain('sectionSpacing');
})->with($brandSections);

test('sub-page sections drop the starter-kit palette and shapes', function (string $section) {
    $contents = readResource('Components/'.$section);

    expect($contents)
        ->not->toContain('text-zinc-900')
        ->not->toContain('text-zinc-700')
        ->not->toContain('text-primary-600')
        ->not->toContain('rounded-[3px]')
        ->not->toContain('rounded-full')
        ->not->toContain('shadow-[')
        ->not->toContain('#C7AE7F');
})->with($brandSections);

test('sub-page copy is left aligned like the home page', function (string $section) {
    expect(readResource('Components/'.$section))->not->toContain('text-center');
})->with([
    'Sections/ServiceCardsSection.tsx',
    'Sections/TestimonialWallSection.tsx',
    'Sections/TestimonialCarouselSection.tsx',
    'Sections/PageCTASection.tsx',
    'Sections/FaqAccordionSection.tsx',
    'Sections/GalleryGridSection.tsx',
    'Sections/CopyAsideSection.tsx',
    'Sections/TwoColumnMediaSection.tsx',
    'Sections/BlogIndexSection.tsx',
    'Sections/BlogArticleSection.tsx',
]);

test('page intro copy is left aligned unless a page opts into centering', function () {
    $section = readResource('Components/Sections/PageIntroSection.tsx');

    expect($section)
        ->toContain("align = 'left',")
        ->toContain("align === 'center' && 'mx-auto max-w-4xl text-center'")
        ->and(substr_count($section, 'text-center'))->toBe(1);
});

test('media split only centers the eyebrow caption under the media', function () {
    $section = readResource('Components/Sections/MediaSplitSection.tsx');

    expect($section)
        ->toContain("<p className={cx(eyebrowClasses, 'text-center')}>{eyebrow}</p>")
        ->and(substr_count($section, 'text-center'))->toBe(1);
});

test('numbered list footer card is the only centered band in that section', function () {
    $contents = readResource('Components/Sections/NumberedListSection.tsx');

    expect($contents)
        ->toContain('footerCard')
        ->toContain('bg-gradient-to-br from-secondary-800')
        ->toContain('justify-center')
        ->toContain('text-center');
});

test('sub-page sections use the brand palette', function (string $section) {
    $contents = readResource('Components/'.$section);

    expect($contents)->toMatch('/charcoal-brown|tea-green/');
})->with($brandSections);

test('closing CTA uses a parallax background image with a charcoal gradient overlay', function () {
    $contents = readResource('Components/Sections/PageCTASection.tsx');

    expect($contents)
        ->toContain("image = '/images/cta-bg-01.webp'")
        ->toContain("from '@/Components/UI/Parallax'")
        ->toContain('bg-gradient-to-r from-charcoal-brown-950/90')
        ->toContain('bg-charcoal-brown-900')
        ->toContain("from '@/Components/UI/LineButton'")
        ->toContain('tone="dark"')
        ->not->toContain("from '../UI/Button'");
});

test('story split reuses the home stats bar treatment', function () {
    $contents = readResource('Components/Sections/StorySplitSection.tsx');

    expect($contents)
        ->toContain('divide-tea-green-500')
        ->toContain('text-tea-green-400')
        ->toContain('rounded-lg bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900')
        ->toContain('shadow-store-card');

    expect(readResource('Components/Sections/AboutWithStatsSection.tsx'))
        ->toContain('divide-tea-green-500')
        ->toContain('rounded-lg bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900');
});

test('testimonial cards match the home card treatment', function () {
    $contents = readResource('Components/UI/QuoteCard.tsx');

    expect($contents)
        ->toContain('rounded-lg border border-zinc-200 bg-white')
        ->toContain('fill-tea-green-500 text-tea-green-500')
        ->toContain('text-charcoal-brown-800')
        ->toContain('border-l-2 border-tea-green-500')
        ->not->toContain('#C7AE7F');
});

test('section spacing helper follows the site design padding rhythm', function () {
    $contents = readResource('lib/sectionSpacing.ts');

    expect($contents)
        ->toContain('py-8 md:py-16 lg:py-24')
        ->toContain('pt-8 pb-4 md:pt-16 md:pb-8 lg:pt-24 lg:pb-16')
        ->toContain('pb-8 pt-4 md:pb-16 md:pt-8 lg:pb-24 lg:pt-16');
});

test('home page sections are left untouched by the sub-page restyle', function () {
    $contents = readResource('Pages/Public/Welcome/Page.tsx');

    expect($contents)
        ->toContain('<HeroSplitHeadlineSection')
        ->not->toContain('<HeroHalfGlassSection')
        ->toContain('<AboutWithStatsSection')
        ->toContain('<TwoPathCardsSection')
        ->not->toContain('<PageIntroSection')
        ->not->toContain('<PageCTASection');
});

test('sub-page restyle leaves the shared header and footer chrome alone', function () {
    $layout = readResource('Pages/Public/layout.tsx');

    expect($layout)
        ->toContain('Navigation')
        ->toContain('Footer');

    foreach ([
        'Public/Contact/Page.tsx',
        'Public/ExpertWitness/Page.tsx',
        'Public/Gallery/Page.tsx',
        'Public/Resource/Page.tsx',
        'Public/DistanceAwfa/Page.tsx',
        'Public/DistanceWfaBsa/Page.tsx',
        'Collections/Blog/Index.tsx',
        'Collections/Blog/Show.tsx',
    ] as $page) {
        expect(readResource('Pages/'.$page))
            ->not->toContain('Navigation')
            ->not->toContain('Footer');
    }
});
