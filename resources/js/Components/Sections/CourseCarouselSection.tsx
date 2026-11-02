/**
 * **CURSOR INFO**
 * SECTION TYPE: Featured course carousel of dark detail cards
 * BEST FOR: Home page course highlights
 * VISUAL STYLE: Charcoal cards, tea-green duration and CTA, optional ribbon badge
 * LAYOUT: Heading with carousel chevrons, then a row of image-top course cards
 * CONTENT ELEMENTS: Image, badge, title, icon-and-label grid, duration, view-more link
 * CONVERSION ROLE: Push visitors toward a specific course page
 * IDEAL POSITION: After training-grounds masonry, before testimonials
 * NOTES / MODIFIERS: Local-state carousel; 1/2/3 visible cards; standalone white section between zinc-50 bands; cards link to /classes/{slug}
 */

import { useRef } from 'react';
import { Award, BookOpen, ChevronLeft, ChevronRight, Clock, MapPin, ShieldCheck, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export type CourseCard = {
    title: string;
    imageSrc: string;
    imageAlt?: string;
    badge?: string;
    durationLabel?: string;
    durationValue: string;
    href?: string;
    ctaLabel?: string;
    features: string;
};

type CourseCarouselSectionProps = {
    heading?: string;
    courses?: CourseCard[];
};

const featureIcons = [Clock, BookOpen, Award, Users, MapPin, ShieldCheck];

const defaultCourses: CourseCard[] = [
    {
        title: 'Wilderness First Aid',
        imageSrc: '/images/content/web3half.jpg',
        imageAlt: 'Wilderness First Aid skills practice',
        badge: 'Blended',
        durationLabel: 'Duration',
        durationValue: '16 hrs',
        href: '/classes/wfa16',
        ctaLabel: 'View More',
        features: '16 hours\nIn person or blended\n4 online lessons\nHands-on skills\nYour location or ours\nCap of 24',
    },
    {
        title: 'Wilderness First Aid Intermediate',
        imageSrc: '/images/content/water_mid.jpg',
        imageAlt: 'Intermediate wilderness first aid training',
        durationLabel: 'Duration',
        durationValue: '24 hrs',
        href: '/classes/wfa24',
        ctaLabel: 'View More',
        features: '24 hours\nIn person or blended\nExpanded skills\n4 online lessons\nNationwide classes\nCap of 24',
    },
    {
        title: 'Advanced Wilderness First Aid',
        imageSrc: '/images/content/ring-carry-01.jpg',
        imageAlt: 'Advanced wilderness first aid field session',
        durationLabel: 'Duration',
        durationValue: '4 days',
        href: '/classes/awfa',
        ctaLabel: 'View More',
        features: '4 days in person\nOr blended format\n6 online lessons\n2 days of skills\nCertification track\nCap of 24',
    },
    {
        title: 'Wilderness First Responder / WEMT',
        imageSrc: '/images/content/shadybrook400.jpg',
        imageAlt: 'Wilderness First Responder class',
        badge: 'College credit',
        durationLabel: 'Duration',
        durationValue: '9 days',
        href: '/classes/wfr',
        ctaLabel: 'View More',
        features: '9 days or 6 weeks\nIn person or blended\n~60 online lessons\n5-day skills session\nCollege credit\nFellow instructor',
    },
];

const classPageByTitle: Record<string, string> = {
    'Wilderness First Aid': '/classes/wfa16',
    'Wilderness First Aid Intermediate': '/classes/wfa24',
    'Advanced Wilderness First Aid': '/classes/awfa',
    'Wilderness First Responder / WEMT': '/classes/wfr',
};

const courseHref = (course: CourseCard): string => {
    if (course.href && course.href !== '/contact-us' && course.href !== '/services') {
        return course.href;
    }

    return classPageByTitle[course.title] ?? course.href ?? '/classes';
};

function parseFeatures(features: string): string[] {
    return features.split('\n').map((line) => line.trim()).filter(Boolean).slice(0, 6);
}

export function CourseCarouselSection({
    heading = 'Featured Courses',
    courses = defaultCourses,
}: CourseCarouselSectionProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const handlePrev = () => {
        const scroller = scrollerRef.current;
        if (!scroller) {
            return;
        }
        scroller.scrollBy({ left: -scroller.clientWidth * 0.85, behavior: 'smooth' });
    };

    const handleNext = () => {
        const scroller = scrollerRef.current;
        if (!scroller) {
            return;
        }
        scroller.scrollBy({ left: scroller.clientWidth * 0.85, behavior: 'smooth' });
    };

    return (
        <section className="bg-white py-8 md:py-16 lg:py-24">
            <div className="mx-auto max-w-7xl flex flex-col gap-8 px-4 md:gap-12 md:px-8 lg:px-12">
                <div className="flex items-center justify-between gap-4">
                    <SectionHeading title={heading} />
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous courses"
                            className="p-2 text-charcoal-brown-700 transition-colors hover:text-tea-green-500"
                        >
                            <ChevronLeft className="h-6 w-6" strokeWidth={1.75} />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next courses"
                            className="p-2 text-tea-green-500 transition-colors hover:text-forest-green-600"
                        >
                            <ChevronRight className="h-6 w-6" strokeWidth={1.75} />
                        </button>
                    </div>
                </div>
                <div
                    ref={scrollerRef}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none md:gap-8 lg:gap-12"
                >
                        {courses.map((course) => {
                            const features = parseFeatures(course.features);

                            return (
                                <Link
                                    key={course.title}
                                    href={courseHref(course)}
                                    className="group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-lg bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-400 focus-visible:ring-offset-2 md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)]"
                                >
                                    <div className="relative aspect-16/10 overflow-hidden">
                                        <img
                                            src={course.imageSrc}
                                            alt={course.imageAlt ?? course.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {course.badge ? (
                                            <span className="absolute top-3 right-0 bg-tea-green-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                                                {course.badge}
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                                        <h3 className="text-lg font-semibold group-hover:underline">{course.title}</h3>
                                        <ul className="grid grid-cols-2 gap-3 text-sm text-zinc-200">
                                            {features.map((feature, featureIndex) => {
                                                const Icon = featureIcons[featureIndex % featureIcons.length];

                                                return (
                                                    <li key={feature} className="flex items-center gap-2">
                                                        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                                                        <span>{feature}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
                                            <p className="text-sm">
                                                <span className="block text-zinc-300">{course.durationLabel ?? 'Duration'}</span>
                                                <span className="text-lg font-semibold text-tea-green-400">
                                                    {course.durationValue}
                                                </span>
                                            </p>
                                            <span className="bg-tea-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors group-hover:bg-forest-green-600">
                                                {course.ctaLabel ?? 'View More'}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
