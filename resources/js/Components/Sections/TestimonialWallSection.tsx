/**
 * **CURSOR INFO**
 * SECTION TYPE: Testimonial / recommendation letter card grid
 * BEST FOR: Reviews pages, expert pages showing attorney letters, social proof anywhere
 * VISUAL STYLE: Home zinc band with white bordered cards, tea-green stars, charcoal type
 * LAYOUT: Bar heading with eyebrow and intro, then a responsive one/two/three-column card grid; `layout="split"` puts a plain pull quote beside the heading
 * CONTENT ELEMENTS: Eyebrow, heading, intro, quote cards with rating, name, title and date
 * CONVERSION ROLE: Social proof ahead of the closing CTA
 * IDEAL POSITION: After the story or services section, before the CTA
 * NOTES / MODIFIERS: Uses the zinc-50 band from the home schedule section so it separates adjacent white sections; QuoteCard truncates long letters behind a Read more toggle; renders nothing when there are no items; intro and quotes render inline `**bold**` / `[label](url)` markdown; split layout uses a plain pull quote instead of a bordered card
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { QuoteCard } from '@/Components/UI/QuoteCard';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

export type TestimonialItem = {
    testimonial: string;
    name?: string;
    title?: string;
    date?: string;
    avatar?: string;
    starRating?: number;
};

type TestimonialWallLayout = 'grid' | 'split';

type TestimonialWallSectionProps = {
    eyebrow?: string;
    heading?: string;
    headingLine2?: string;
    intro?: string;
    items?: TestimonialItem[];
    layout?: TestimonialWallLayout;
    id?: string;
    spacing?: SectionSpacing;
};

const headingBlock = (
    eyebrow: string | undefined,
    heading: string,
    headingLine2: string | undefined,
    intro: string | undefined,
) => (
    <div className="flex flex-col gap-4">
        {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                {eyebrow}
            </p>
        ) : null}
        <SectionHeading title={heading} titleLine2={headingLine2} />
        {intro ? (
            <p className="max-w-2xl text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                <FormattedText text={intro} />
            </p>
        ) : null}
    </div>
);

export function TestimonialWallSection({
    eyebrow,
    heading = 'What Our Students Say',
    headingLine2,
    intro,
    items = [],
    layout = 'grid',
    id = 'reviews',
    spacing = 'standard',
}: TestimonialWallSectionProps = {}) {
    if (!items.length) {
        return null;
    }

    const isSplit = layout === 'split';
    const quoteItems = isSplit ? items.slice(0, 1) : items;

    return (
        <section id={id} className={cx('bg-zinc-50', sectionSpacing(spacing))}>
            {isSplit ? (
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
                        {headingBlock(eyebrow, heading, headingLine2, intro)}
                        {quoteItems.map((item, index) => (
                            <QuoteCard
                                key={`${item.name ?? 'quote'}-${index}`}
                                testimonial={item.testimonial}
                                name={item.name}
                                title={item.title}
                                date={item.date}
                                avatar={item.avatar}
                                starRating={item.starRating}
                                variant="plain"
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                    {headingBlock(eyebrow, heading, headingLine2, intro)}

                    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
                        {quoteItems.map((item, index) => (
                            <QuoteCard
                                key={`${item.name ?? 'quote'}-${index}`}
                                testimonial={item.testimonial}
                                name={item.name}
                                title={item.title}
                                date={item.date}
                                avatar={item.avatar}
                                starRating={item.starRating}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
