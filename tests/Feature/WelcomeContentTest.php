<?php

use App\Models\BusinessInfo;
use App\Support\FeaturedCourseLinks;
use Database\Seeders\BusinessInfoSeeder;

beforeEach(function () {
    $this->withoutVite();
    $this->seed(BusinessInfoSeeder::class);
});

test('welcome page site config reflects wilderness medicine outfitters', function () {
    $response = $this->get('/');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('Public/Welcome/Page')
        ->where('siteConfig.site', 'Wilderness Medicine Outfitters')
        ->where('siteConfig.email', 'carl@wildernessmedicine.com')
        ->where('siteConfig.phone', '(303) 688-5176')
        ->where('siteConfig.address', '2477 County Road 132, Elizabeth, Colorado 80107')
        ->where('siteConfig.tagline', 'Wilderness medicine training since 1967.')
        ->where(
            'siteConfig.description',
            'Wilderness medicine training since 1967. Hands-on Wilderness First Aid, Advanced Wilderness First Aid, Wilderness First Responder, Wilderness Emergency Medical Responder, Wilderness First Responder and advanced courses — in person or blended, at your location or ours.'
        ));
});

test('welcome schema defaults use content photos in page sections', function () {
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');

    expect($schema)->not->toBeFalse();

    $contentPhotos = [
        '/images/content/practicing-passing-01.jpg',
        '/images/content/CARL.jpg',
        '/images/content/shadybrook400.jpg',
        '/images/content/web3half.jpg',
        '/images/content/water_mid.jpg',
        '/images/content/ring-carry-01.jpg',
    ];

    foreach ($contentPhotos as $photo) {
        expect($schema)->toContain($photo);
    }

    $whyChooseUsPos = strpos($schema, 'whyChooseUs:');

    expect($whyChooseUsPos)->not->toBeFalse();

    $heroBlock = substr($schema, 0, $whyChooseUsPos);
    $contentBlock = substr($schema, $whyChooseUsPos);

    expect($heroBlock)->toContain('/images/hero-04.webp')
        ->and($heroBlock)->toContain('/images/wilderness-medicine-outfitters-logo-color-01.png')
        ->and($contentBlock)->not->toContain('/images/hero-02.webp')
        ->and($contentBlock)->not->toContain('/images/hero-03.webp')
        ->and($contentBlock)->not->toContain('/images/hero-04.webp');
});

test('home page copy says wilderness medicine classes since 1967', function () {
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');
    $hero = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/HeroSplitHeadlineSection.tsx');
    $whyChooseUs = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/WhyChooseUsSection.tsx');

    expect($schema)->not->toBeFalse();
    expect($hero)->not->toBeFalse();
    expect($whyChooseUs)->not->toBeFalse();
    expect($schema)
        ->toContain('Wilderness Medicine Classes since 1967')
        ->not->toContain('in person since 1967');
    expect($hero)
        ->toContain('Wilderness Medicine Classes since 1967')
        ->not->toContain('in person since 1967');
    expect($whyChooseUs)
        ->toContain('Wilderness Medicine Classes since 1967')
        ->not->toContain('in person since 1967');
});

test('hero subheading does not list state ems and nremt certification options', function () {
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');
    $hero = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/HeroSplitHeadlineSection.tsx');

    expect($schema)->not->toBeFalse();
    expect($hero)->not->toBeFalse();
    expect($schema)
        ->toContain('Wilderness Medicine Classes since 1967 — blended/online since 2004.')
        ->not->toContain('State EMS and National NREMT Certification')
        ->not->toContain('In your own group class')
        ->not->toContain('With one of our classes')
        ->not->toContain('Private blended online lectures & Skill demos in person or Zoom');
    expect($hero)
        ->toContain('Wilderness Medicine Classes since 1967 — blended/online since 2004.')
        ->not->toContain('State EMS and National NREMT Certification')
        ->not->toContain('In your own group class')
        ->not->toContain('With one of our classes')
        ->not->toContain('Private blended online lectures & Skill demos in person or Zoom');
});

test('about highlight bar uses readable text blocks for since 1967 and masters director credential', function () {
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/AboutWithStatsSection.tsx');

    expect($schema)->not->toBeFalse();
    expect($section)->not->toBeFalse();
    expect($schema)
        ->toContain('Wilderness Medicine Classes since 1967')
        ->toContain('1st wilderness medicine school with Wilderness Medicine Masters degree holder as director')
        ->toContain('Student class cap of 24')
        ->not->toContain('57+')
        ->not->toContain('Years of experience')
        ->not->toContain('Master Fellow director');
    expect($section)
        ->toContain('Wilderness Medicine Classes since 1967')
        ->toContain('1st wilderness medicine school with Wilderness Medicine Masters degree holder as director')
        ->toContain('Student class cap of 24')
        ->toContain('text-sm font-medium leading-snug')
        ->not->toContain('text-4xl')
        ->not->toContain('text-5xl')
        ->not->toContain('57+')
        ->not->toContain('Years of experience')
        ->not->toContain('Master Fellow director');
});

test('about section right image uses parallax', function () {
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/AboutWithStatsSection.tsx');

    expect($section)->not->toBeFalse();
    expect($section)
        ->toContain("from '@/Components/UI/Parallax'")
        ->toContain('<Parallax')
        ->toContain('h-112 overflow-hidden rounded-lg md:h-144');
});

test('welcome hero does not show the business address in the bottom right', function () {
    $page = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/Page.tsx');

    expect($page)->not->toBeFalse();
    expect($page)
        ->not->toContain('location={siteConfig.address}')
        ->not->toContain('location=');
});

test('hero eases wilderness up and medicine down on load', function () {
    $hero = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/HeroSplitHeadlineSection.tsx');

    expect($hero)->not->toBeFalse();
    expect($hero)
        ->toContain("const headlineTravel = '0.55em'")
        ->toContain('const wildernessFrom = prefersReducedMotion ? 0 : headlineTravel')
        ->toContain('const medicineFrom = prefersReducedMotion ? 0 : `-${headlineTravel}`');

    $leftPos = strpos($hero, '{headlineLeft}');
    $rightPos = strpos($hero, '{headlineRight}');

    expect($leftPos)->not->toBeFalse();
    expect($rightPos)->not->toBeFalse();
    expect($leftPos)->toBeLessThan($rightPos);

    $leftBlock = substr($hero, 0, $leftPos);
    $rightBlock = substr($hero, $leftPos, $rightPos - $leftPos);

    expect($leftBlock)->toContain('initial={{ y: wildernessFrom }}');
    expect($rightBlock)->toContain('initial={{ y: medicineFrom }}');
});

test('home hero image is cropped center right', function () {
    $hero = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/HeroSplitHeadlineSection.tsx');

    expect($hero)->not->toBeFalse();
    expect($hero)
        ->toContain('object-cover object-right')
        ->toContain('bg-cover bg-right')
        ->not->toContain('object-center')
        ->not->toContain('bg-center');
});

test('hero uses the wilderness medicine mark as its logo', function () {
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');
    $hero = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/HeroSplitHeadlineSection.tsx');

    expect($schema)->not->toBeFalse();
    expect($hero)->not->toBeFalse();
    expect($schema)->toContain("default: '/images/wilderness-medicine-outfitters-logo-color-01.png'");
    expect($hero)
        ->toContain('logo = DEFAULT_HERO_LOGO')
        ->toContain('resolveSiteLogoUrl')
        ->toContain('logoSrc');
});

test('home hero drops the glass pane and pins the logo top left', function () {
    $hero = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/HeroSplitHeadlineSection.tsx');
    $page = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/Page.tsx');

    expect($hero)->not->toBeFalse();
    expect($page)->not->toBeFalse();
    expect($hero)
        ->toContain('pointer-events-auto absolute left-0 top-0 z-10 p-4 md:p-8 lg:p-12')
        ->toContain('h-20 w-auto md:h-24 lg:h-28')
        ->toContain('flex flex-wrap items-baseline justify-center')
        ->toContain('gap-x-1.5 md:gap-x-2.5 lg:gap-x-3')
        ->not->toContain('grid grid-cols-2')
        ->not->toContain('backdrop-blur')
        ->not->toContain('mix-blend-destination-out')
        ->not->toContain('isolate transform-gpu');
    expect($page)
        ->toContain('<HeroSplitHeadlineSection')
        ->not->toContain('<HeroHalfGlassSection');
});

test('half-glass hero section is kept for rollback', function () {
    $hero = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/HeroHalfGlassSection.tsx');

    expect($hero)->not->toBeFalse();
    expect($hero)
        ->toContain('export function HeroHalfGlassSection')
        ->toContain('backdrop-blur-lg')
        ->toContain('mix-blend-destination-out');
});

test('home page showcases the original fox tv press cta after the hero', function () {
    $page = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/Page.tsx');
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/PressCtaSection.tsx');

    expect($page)->not->toBeFalse();
    expect($schema)->not->toBeFalse();
    expect($section)->not->toBeFalse();

    $heroPos = strpos($page, '<HeroSplitHeadlineSection');
    $foxPos = strpos($page, '<PressCtaSection');
    $aboutPos = strpos($page, '<AboutWithStatsSection');

    expect($heroPos)->not->toBeFalse();
    expect($foxPos)->not->toBeFalse();
    expect($aboutPos)->not->toBeFalse();
    expect($heroPos)->toBeLessThan($foxPos);
    expect($foxPos)->toBeLessThan($aboutPos);

    expect($schema)
        ->toContain("default: 'Fox TV !!'")
        ->toContain("default: 'Carl as seen on several TV Feature Sessions'")
        ->toContain('Car Survival Tips')
        ->toContain('Safe Hiking Tips')
        ->toContain("default: '/resource'")
        ->toContain("default: 'wilderness medicine training since 1967'");
    expect($section)
        ->toContain("ctaHref = '/resource'")
        ->toContain("heading = 'Fox TV !!'")
        ->toContain('Car Survival Tips')
        ->toContain('Safe Hiking Tips')
        ->toContain('items-center gap-4 px-4 text-center')
        ->toContain('py-4 md:py-8 lg:py-12')
        ->not->toContain('SectionHeading')
        ->not->toContain('py-8 md:py-16 lg:py-24');
});

test('welcome page does not include the contact form', function () {
    $page = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/Page.tsx');
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');

    expect($page)->not->toBeFalse();
    expect($schema)->not->toBeFalse();
    expect($page)
        ->not->toContain('<ContactSection')
        ->not->toContain("from '@/Components/Sections/ContactSection'");
    expect($schema)->not->toContain('contact:');
});

test('welcome page lists upcoming classes before the explore pathways', function () {
    $page = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/Page.tsx');

    expect($page)->not->toBeFalse();

    $upcomingPos = strpos($page, '<UpcomingClassesSection');
    $pathwaysPos = strpos($page, '<TwoPathCardsSection');

    expect($upcomingPos)->not->toBeFalse();
    expect($pathwaysPos)->not->toBeFalse();
    expect($upcomingPos)->toBeLessThan($pathwaysPos);
});

test('home page replaces our services with distance learning and expert witness pathways', function () {
    $page = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/Page.tsx');
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/TwoPathCardsSection.tsx');

    expect($page)->not->toBeFalse();
    expect($schema)->not->toBeFalse();
    expect($section)->not->toBeFalse();
    expect($page)
        ->toContain('<TwoPathCardsSection')
        ->not->toContain('<IconServiceCardsSection')
        ->not->toContain('ctaHref="/services"')
        ->not->toContain('ctaHref="/contact-us"');
    expect($schema)
        ->toContain('pathways:')
        ->toContain("default: 'Train or Consult'")
        ->toContain("title: 'Distance Learning'")
        ->toContain("title: 'Expert Outdoor Witness'")
        ->toContain("href: '/distance-learning/other-dl-classes'")
        ->toContain("href: '/expert-witness'")
        ->not->toContain('services:')
        ->not->toContain("default: 'Our Services'")
        ->not->toContain("default: 'Keep Exploring'");
    expect($section)
        ->toContain("href: '/distance-learning/other-dl-classes'")
        ->toContain("href: '/expert-witness'")
        ->toContain("heading = 'Train or Consult'")
        ->not->toContain("heading = 'Our Services'")
        ->not->toContain("heading = 'Keep Exploring'")
        ->not->toContain('<img')
        ->not->toContain('imageSrc');
});

test('featured courses link to their class pages', function () {
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/CourseCarouselSection.tsx');

    expect($schema)->not->toBeFalse();
    expect($section)->not->toBeFalse();
    expect($schema)
        ->toContain("href: '/classes/wfa16'")
        ->toContain("href: '/classes/wfa24'")
        ->toContain("href: '/classes/awfa'")
        ->toContain("href: '/classes/wfr'")
        ->not->toContain("href: '/services'")
        ->not->toContain("href: '/contact-us'");
    expect($section)
        ->toContain("href: '/classes/wfa16'")
        ->toContain("href: '/classes/wfa24'")
        ->toContain("href: '/classes/awfa'")
        ->toContain("href: '/classes/wfr'")
        ->toContain('courseHref(course)')
        ->toContain("'/classes/wfa16'")
        ->not->toContain("href: '/contact-us'");
});

test('featured course remapper points saved welcome cards at class pages', function () {
    $content = FeaturedCourseLinks::remapWelcomeContent([
        'courses' => [
            'items' => [
                ['title' => 'Wilderness First Aid', 'href' => '/contact-us'],
                ['title' => 'Wilderness First Aid Intermediate', 'href' => '/contact-us'],
                ['title' => 'Advanced Wilderness First Aid', 'href' => '/contact-us'],
                ['title' => 'Wilderness First Responder / WEMT', 'href' => '/contact-us'],
                ['title' => 'Custom Course', 'href' => '/contact-us'],
            ],
        ],
    ]);

    expect($content['courses']['items'][0]['href'])->toBe('/classes/wfa16')
        ->and($content['courses']['items'][1]['href'])->toBe('/classes/wfa24')
        ->and($content['courses']['items'][2]['href'])->toBe('/classes/awfa')
        ->and($content['courses']['items'][3]['href'])->toBe('/classes/wfr')
        ->and($content['courses']['items'][4]['href'])->toBe('/contact-us');
});

test('contact section uses a two-column layout without a background image', function () {
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Contact/schema.ts');
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/ContactSection.tsx');

    expect($schema)->not->toBeFalse();
    expect($section)->not->toBeFalse();
    expect($schema)->not->toContain('contact-bg-01.webp');
    expect($section)
        ->not->toContain("from '@/Components/UI/Parallax'")
        ->not->toContain('<Parallax')
        ->toContain('grid grid-cols-1 items-start gap-4 md:grid-cols-2')
        ->toContain('id="directions"')
        ->toContain('id="message"')
        ->toContain('rounded-lg bg-zinc-50');
});

test('contact section keeps content within the max-w-7xl well', function () {
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/ContactSection.tsx');

    expect($section)->not->toBeFalse();
    expect($section)->toContain('mx-auto max-w-7xl');
});

test('welcome sections share max-w-7xl and leave the hero full-bleed', function () {
    $sectionFiles = [
        'AboutWithStatsSection.tsx',
        'PressCtaSection.tsx',
        'WhyChooseUsSection.tsx',
        'UpcomingClassesSection.tsx',
        'CourseCarouselSection.tsx',
        'TwoPathCardsSection.tsx',
    ];

    foreach ($sectionFiles as $file) {
        $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/'.$file);

        expect($section)->not->toBeFalse();
        expect($section)->toContain('max-w-7xl');
        expect($section)->not->toContain('container mx-auto');
        expect($section)->not->toContain('max-w-6xl');
    }

    $hero = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Heros/HeroSplitHeadlineSection.tsx');

    expect($hero)->not->toBeFalse();
    expect($hero)->not->toContain('max-w-7xl');
    expect($hero)->not->toContain('container mx-auto');
});

test('nav is genuinely full-width, not capped to max-w-7xl', function () {
    $nav = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Navigation/Navigation.tsx');

    expect($nav)->not->toBeFalse();
    expect($nav)->not->toContain('max-w-7xl');
    expect($nav)->not->toContain('container mx-auto');
    expect($nav)->toContain('grid-cols-[1fr_auto_1fr]');
});

test('footer spans the full viewport width', function () {
    $footer = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/Footer.tsx');

    expect($footer)->not->toBeFalse();
    expect($footer)->toContain('w-full py-6 px-4');
    expect($footer)->not->toContain('max-w-7xl');
    expect($footer)->not->toContain('container mx-auto');
});

test('why choose us columns use padded zinc-50 cards with square photos', function () {
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/WhyChooseUsSection.tsx');

    expect($section)->not->toBeFalse();
    expect($section)
        ->toContain('rounded-lg bg-zinc-50 p-4 md:p-6')
        ->toContain('h-full flex-col')
        ->toContain('aspect-square')
        ->toContain('group-hover:scale-105')
        ->not->toContain("padStart(2, '0')")
        ->not->toContain('items-start')
        ->toContain('bg-white py-8 md:py-16 lg:py-24');
});

test('upcoming classes section uses zinc-50 for its main container', function () {
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/UpcomingClassesSection.tsx');

    expect($section)->not->toBeFalse();
    expect($section)->toContain('bg-zinc-50');
});

test('explore pathways section uses zinc-50 for its main container', function () {
    $section = file_get_contents(dirname(__DIR__, 2).'/resources/js/Components/Sections/TwoPathCardsSection.tsx');

    expect($section)->not->toBeFalse();
    expect($section)
        ->toContain('bg-zinc-50 py-8 md:py-16 lg:py-24')
        ->toContain('grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-8 lg:gap-12')
        ->toContain('<SectionHeading title={heading} />')
        ->toContain('border border-zinc-200 bg-white')
        ->toContain('bg-gradient-to-br from-charcoal-brown-800 via-charcoal-brown-900 to-charcoal-brown-950')
        ->not->toContain('<img');
});

test('welcome schema includes upcoming classes from wildernessmedicine.com', function () {
    $schema = file_get_contents(dirname(__DIR__, 2).'/resources/js/Pages/Public/Welcome/schema.ts');

    expect($schema)->not->toBeFalse();
    expect($schema)
        ->toContain('upcomingClasses:')
        ->toContain('Upcoming Classes')
        ->toContain('27 Free Mini-Lessons')
        ->toContain('10 to 30 FAWM Credits for WMS members')
        ->toContain('20-hour Wilderness First Aid')
        ->toContain('WFA blended classes')
        ->toContain('EMR & AWFA')
        ->toContain('WFA Texto Español')
        ->toContain('Pennsylvania, Louisiana, Kansas, Colorado, Utah, Idaho')
        ->toContain('mediccarl@gmail.com');
});

test('business info seeder stores content from content.md', function () {
    $businessInfo = BusinessInfo::current();

    expect($businessInfo->business_name)->toBe('Wilderness Medicine Outfitters')
        ->and($businessInfo->business_phone)->toBe('(303) 688-5176')
        ->and($businessInfo->business_email)->toBe('carl@wildernessmedicine.com')
        ->and($businessInfo->linkedin_url)->toBe('http://www.linkedin.com/pub/carl-weil/11/770/245');
});
