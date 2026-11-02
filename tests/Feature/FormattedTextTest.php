<?php

beforeEach(function () {
    $this->withoutVite();
});

it('parses bold, underline, and markdown links for CMS copy', function () {
    $formatter = file_get_contents(base_path('resources/js/Components/UI/FormattedText.tsx'));

    expect($formatter)->not->toBeFalse()
        ->and($formatter)->toContain("from '@inertiajs/react'")
        ->and($formatter)->toContain("type: 'link', regex: /\\[([^\\]]+)\\]\\(([^)]+)\\)/")
        ->and($formatter)->toContain("type: 'strong', regex: /\\*\\*(.+?)\\*\\*/")
        ->and($formatter)->toContain("type: 'underline', regex: /\\+\\+(.+?)\\+\\+/")
        ->and($formatter)->toContain("type: 'em'")
        ->and($formatter)->toContain('isInternalHref')
        ->and($formatter)->toContain('<Link')
        ->and($formatter)->toContain('text-forest-green-800')
        ->and($formatter)->toContain('text-tea-green-400');
});

it('renders formatted CMS copy in public page sections', function (string $relativePath) {
    $contents = file_get_contents(base_path($relativePath));

    expect($contents)->not->toBeFalse()
        ->and($contents)->toContain("from '@/Components/UI/FormattedText'")
        ->and($contents)->toContain('<FormattedText');
})->with([
    'intro' => ['resources/js/Components/Sections/PageIntroSection.tsx'],
    'copy-aside' => ['resources/js/Components/Sections/CopyAsideSection.tsx'],
    'numbered-list' => ['resources/js/Components/Sections/NumberedListSection.tsx'],
    'cta' => ['resources/js/Components/Sections/PageCTASection.tsx'],
    'story-split' => ['resources/js/Components/Sections/StorySplitSection.tsx'],
    'media-split' => ['resources/js/Components/Sections/MediaSplitSection.tsx'],
    'two-column-media' => ['resources/js/Components/Sections/TwoColumnMediaSection.tsx'],
    'faq-accordion' => ['resources/js/Components/Sections/FaqAccordionSection.tsx'],
    'service-cards' => ['resources/js/Components/Sections/ServiceCardsSection.tsx'],
    'testimonial-wall' => ['resources/js/Components/Sections/TestimonialWallSection.tsx'],
    'testimonial-carousel' => ['resources/js/Components/Sections/TestimonialCarouselSection.tsx'],
    'quote-card' => ['resources/js/Components/UI/QuoteCard.tsx'],
]);

it('keeps original why-choose-wmo links and emphasis in schema defaults', function () {
    $schema = file_get_contents(base_path('resources/js/Pages/Public/WhyChooseWmo/schema.ts'));

    expect($schema)->not->toBeFalse()
        ->and($schema)->toContain('[Professional Outdoor Medical Educators](/resource#pome)')
        ->and($schema)->toContain('[Carl Weil](/director-carl-weil)')
        ->and($schema)->toContain('[Carl Weil, Director](/director-carl-weil)')
        ->and($schema)->toContain('++**NO OTHER SCHOOL MATCHES THAT**++')
        ->and($schema)->toContain('[(303) 688-5176](tel:+13036885176)')
        ->and($schema)->toContain('[carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com)')
        ->and($schema)->toContain('**Ask these questions of any school you plan to take classes from.**');
});

it('keeps original class-information links and emphasis in schema defaults', function () {
    $schema = file_get_contents(base_path('resources/js/Pages/Public/ClassesInformation/schema.ts'));

    expect($schema)->not->toBeFalse()
        ->and($schema)->toContain('WMO Mission')
        ->and($schema)->toContain('**Core values**')
        ->and($schema)->toContain('What Makes WMO Unusual')
        ->and($schema)->not->toContain('++')
        ->and($schema)->toContain('[See photos of our classes, facilities, and wildlife](/gallery)')
        ->and($schema)->toContain('[View class details](/classes/wfa24)')
        ->and($schema)->toContain('[View class details](/classes/leave-no-trace)')
        ->and($schema)->toContain('**Best deal re: time, money & knowledge**')
        ->and($schema)->toContain('[(303) 688-5176](tel:+13036885176)');
});

it('does not underline WFA-BSA intro copy', function () {
    $schema = file_get_contents(base_path('resources/js/Pages/Public/DistanceWfaBsa/schema.ts'));

    expect($schema)->not->toBeFalse()
        ->and($schema)->toContain('for English as 2 language students')
        ->and($schema)->not->toContain('++');
});

it('keeps original-site links and emphasis in remaining public page schemas', function (string $relativePath, array $needles) {
    $schema = file_get_contents(base_path($relativePath));

    expect($schema)->not->toBeFalse();

    foreach ($needles as $needle) {
        expect($schema)->toContain($needle);
    }
})->with([
    'links' => [
        'resources/js/Pages/Public/Links/schema.ts',
        [
            '[Link](http://www.gunjitsu.net)',
            '[Link](http://www.wms.org)',
            '[Link](http://amga.com)',
        ],
    ],
    'new-students' => [
        'resources/js/Pages/Public/NewStudents/schema.ts',
        [
            '[Advanced Wilderness First Aid (AWFA48) Registration Form](/files/AWFA48-Registration2016.pdf)',
            '[Download the form](/files/AWFA48-Registration2016.pdf)',
            '[accompanying form](/under-age-21)',
            '[carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com)',
        ],
    ],
    'director' => [
        'resources/js/Pages/Public/Director/schema.ts',
        [
            '[answering your questions](/contact-us)',
            '[Click Here to see a list of our qualified instructors.](/staff-members)',
        ],
    ],
    'instructors' => [
        'resources/js/Pages/Public/Instructors/schema.ts',
        [
            '**Prevention - Assessment - Treatment**',
            '[Director - Carl Weil](/director-carl-weil)',
            '++**Staff**++',
            '**FAWM**',
        ],
    ],
    'wfa-bsa' => [
        'resources/js/Pages/Public/DistanceWfaBsa/schema.ts',
        [
            '[WFA-BSA.com](http://WFA-BSA.com)',
            '[Read more about the WFA20 Course details](/classes/wfa20)',
            '**Scouting and Scouts BSA Guidelines**',
            '**Having TWO trained is far better**',
            'for English as 2 language students',
        ],
    ],
    'distance-other' => [
        'resources/js/Pages/Public/DistanceOther/schema.ts',
        [
            '[Advanced Wilderness First Aid (AWFA)](/distance-learning/awfa)',
            '[Converting AWFA to WFR](/distance-learning/converting-awfa-wfr)',
            '++**WMO Instructors Course**++',
        ],
    ],
    'common-questions' => [
        'resources/js/Pages/Public/CommonQuestions/schema.ts',
        [
            '**Background:**',
            '[WFR Outline](/classes/wfr)',
            '[CLICK HERE TO LEARN MORE AND FIND OTHER MEMBER SCHOOLS AROUND THE USA](/resource#pome)',
            '**Lilly Bell Fox Weil**',
        ],
    ],
    'expert-camps' => [
        'resources/js/Pages/Public/ExpertCamps/schema.ts',
        [
            '**Expertise in youth camps',
            '[(303) 688-5176](tel:+13036885176)',
        ],
    ],
    'expert-witness' => [
        'resources/js/Pages/Public/ExpertWitness/schema.ts',
        [
            '**Hire Mr. Weil before you take your first opposition deposition**',
            '**Expert Witness Main Areas:**',
            '**60% Plaintive and 40% Defense**',
            '**Civil and Criminal**',
            '**With today\\\'s expensive airline tickets and 8 hr fee days, as well as overnight expenses, your client can still easily afford his modest zoom fees and pay only for the hours involved with a little extra to have him on location, as opposed to a local, less experienced person.**',
        ],
    ],
    'distance-awfa' => [
        'resources/js/Pages/Public/DistanceAwfa/schema.ts',
        [
            '**Simply put - take this course at your own speed',
            '[Order and Pay](/product/awfa48)',
            '**Lesson One:',
            '[Click for Registration Information PDF format](/files/AWFA48-Registration2016.pdf)',
            '[Larry T.](http://www.linkedin.com/pub/larry-tyler/7a/835/451)',
        ],
    ],
    'testimonials' => [
        'resources/js/Pages/Public/Testimonials/schema.ts',
        [
            '**WMO’s Advanced Wilderness First Aid class was impressive and thorough.**',
            '[Shawn Hostetter](https://www.linkedin.com/pub/shawn-hostetter/3/234/18b)',
            '[Heather Mohr](https://www.linkedin.com/pub/heather-mohr/3a/b10/389)',
        ],
    ],
    'resource' => [
        'resources/js/Pages/Public/Resource/schema.ts',
        [
            '[http://learn.wildernessmedicine.com](http://learn.wildernessmedicine.com/course/view.php?id=22)',
            '*preparedness prevents the necessity of requiring rescue*',
            '[(303) 688-5176](tel:+13036885176)',
        ],
    ],
]);
