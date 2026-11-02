/**
 * **CURSOR INFO**
 * SECTION TYPE: Paginated class card grid
 * BEST FOR: Public classes index
 * VISUAL STYLE: Home editorial style — square photos, bold charcoal titles, tea-green labels
 * LAYOUT: Responsive three-column card grid with square pagination under it
 * CONTENT ELEMENTS: Eyebrow, bar heading, featured image, title, excerpt, page numbers
 * CONVERSION ROLE: Route visitors into individual class description pages
 * IDEAL POSITION: Directly after the subpage banner, before the closing CTA
 * NOTES / MODIFIERS: Matches BlogIndexSection card treatment; empty state when nothing is published; pagination omitted on a single page
 */

import { Link } from '@inertiajs/react';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import type { Course, Paginated } from '@/types';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type ClassIndexSectionProps = {
    courses: Paginated<Course>;
    eyebrow?: string;
    heading?: string;
    id?: string;
    spacing?: SectionSpacing;
};

export function ClassIndexSection({
    courses,
    eyebrow = 'Since 1967',
    heading = 'Wilderness medicine classes',
    id = 'classes',
    spacing = 'standard',
}: ClassIndexSectionProps) {
    return (
        <section id={id} className={cx('bg-white', sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                <div className="flex flex-col gap-4">
                    {eyebrow ? (
                        <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                            {eyebrow}
                        </p>
                    ) : null}
                    <SectionHeading title={heading} />
                </div>
                {courses.data.length === 0 ? (
                    <p className="text-base font-light text-charcoal-brown-700">
                        No classes listed yet. Call (303) 688-5176 to ask about upcoming training.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                        {courses.data.map((course) => (
                            <Link
                                key={course.id}
                                href={route('classes.show', course.slug)}
                                className="group flex flex-col gap-4"
                            >
                                <div className="aspect-square overflow-hidden rounded-lg bg-charcoal-brown-100">
                                    {course.featured_image?.url ? (
                                        <img
                                            src={course.featured_image.url}
                                            alt={course.featured_image.alt_text ?? course.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-sm text-charcoal-brown-400">
                                            No image
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-base font-bold leading-snug text-charcoal-brown-950 group-hover:underline md:text-lg">
                                        {course.nav_label || course.title}
                                    </h2>
                                    {course.excerpt ? (
                                        <p className="line-clamp-3 text-sm font-light leading-relaxed text-charcoal-brown-800">
                                            {course.excerpt}
                                        </p>
                                    ) : null}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {courses.last_page > 1 ? (
                    <nav
                        aria-label="Classes pagination"
                        className="flex flex-wrap items-center justify-center gap-2"
                    >
                        {Array.from({ length: courses.last_page }, (_, i) => i + 1).map((pageNum) => {
                            const isCurrent = pageNum === courses.current_page;

                            return (
                                <Link
                                    key={pageNum}
                                    href={`${route('classes.index')}?page=${pageNum}`}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    className={cx(
                                        'inline-flex h-10 w-10 items-center justify-center text-sm font-semibold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2',
                                        isCurrent
                                            ? 'bg-tea-green-500 text-white hover:bg-forest-green-600'
                                            : 'border border-charcoal-brown-950 text-charcoal-brown-950 hover:bg-charcoal-brown-950 hover:text-white',
                                    )}
                                >
                                    {pageNum}
                                </Link>
                            );
                        })}
                    </nav>
                ) : null}
            </div>
        </section>
    );
}
