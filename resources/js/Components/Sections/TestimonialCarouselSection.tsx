/**
 * **CURSOR INFO**
 * SECTION TYPE: Auto-rotating testimonial / recommendation letter carousel
 * BEST FOR: Expert witness letters of recommendation and other quote sets with four or more items
 * VISUAL STYLE: Home zinc band, white bordered QuoteCards, tea-green chevrons
 * LAYOUT: Heading above a three-column carousel; previous and next arrows sit left and right of the cards
 * CONTENT ELEMENTS: Eyebrow, heading, intro, quote cards, previous/next controls
 * CONVERSION ROLE: Social proof ahead of the closing CTA
 * IDEAL POSITION: After the story section, before fees or CTA
 * NOTES / MODIFIERS: 1 column on mobile, 2 on tablet, 3 on desktop; auto-rotates every 6 seconds; pauses on hover; uses shared Carousel and QuoteCard
 */

import type { TestimonialItem } from '@/Components/Sections/TestimonialWallSection';
import { Carousel, CarouselItem } from '@/Components/UI/Carousel';
import { FormattedText } from '@/Components/UI/FormattedText';
import { QuoteCard } from '@/Components/UI/QuoteCard';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type TestimonialCarouselSectionProps = {
    eyebrow?: string;
    heading?: string;
    headingLine2?: string;
    intro?: string;
    items?: TestimonialItem[];
    id?: string;
    spacing?: SectionSpacing;
    autoRotateInterval?: number;
};

export function TestimonialCarouselSection({
    eyebrow,
    heading = 'What attorneys have written',
    headingLine2,
    intro,
    items = [],
    id = 'reviews',
    spacing = 'standard',
    autoRotateInterval = 6000,
}: TestimonialCarouselSectionProps) {
    if (!items.length) {
        return null;
    }

    return (
        <section id={id} className={cx('bg-zinc-50', sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
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

                <Carousel
                    columns={{ sm: 1, md: 2, lg: 3 }}
                    autoRotateInterval={autoRotateInterval}
                    showIndicators={false}
                    showControls
                    controlTone="brand"
                    prevAriaLabel="Previous recommendation"
                    nextAriaLabel="Next recommendation"
                    aria-roledescription="carousel"
                    aria-label={heading}
                >
                    {items.map((item, index) => (
                        <CarouselItem key={`${item.name ?? 'quote'}-${index}`}>
                            <QuoteCard
                                testimonial={item.testimonial}
                                name={item.name}
                                title={item.title}
                                date={item.date}
                                avatar={item.avatar}
                                starRating={item.starRating}
                                className="h-full"
                            />
                        </CarouselItem>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}
