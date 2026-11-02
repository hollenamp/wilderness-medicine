/**
 * **CURSOR INFO**
 * SECTION TYPE: Single class description body
 * BEST FOR: Public class pages at /classes/{slug}
 * VISUAL STYLE: Home editorial style — bar heading, tea-green labels, charcoal body
 * LAYOUT: Narrow centered column under the interior banner
 * CONTENT ELEMENTS: Title, featured image, HTML article body
 * CONVERSION ROLE: Deliver the class details, then hand off to the closing CTA
 * IDEAL POSITION: Directly after the subpage banner, before the closing CTA
 * NOTES / MODIFIERS: Featured image is omitted when it already appears in the imported article HTML; body markup is sanitised on import
 */

import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';
import type { Course } from '@/types';

type ClassArticleSectionProps = {
    course: Course;
    id?: string;
    spacing?: SectionSpacing;
};

export function ClassArticleSection({
    course,
    id = 'article',
    spacing = 'standard',
}: ClassArticleSectionProps) {
    const featuredFilename = course.featured_image?.url?.split('/').pop() ?? null;
    const showFeaturedImage =
        !!course.featured_image &&
        !(featuredFilename && (course.content ?? '').includes(featuredFilename));

    return (
        <section id={id} className={cx('bg-white', sectionSpacing(spacing))}>
            <article className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                <div className="mx-auto flex max-w-3xl flex-col gap-8 md:gap-12">
                    <header className="flex flex-col gap-4">
                        <SectionHeading title={course.title} as="h1" />
                    </header>

                    {showFeaturedImage && course.featured_image ? (
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-charcoal-brown-100">
                            <img
                                src={course.featured_image.url}
                                alt={course.featured_image.alt_text ?? course.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : null}

                    <div
                        className="blog-content class-content text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
                        dangerouslySetInnerHTML={{ __html: course.content ?? '' }}
                    />
                </div>
            </article>
        </section>
    );
}
