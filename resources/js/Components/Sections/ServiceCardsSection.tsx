/**
 * **CURSOR INFO**
 * SECTION TYPE: Dark service/practice-area card grid with line CTA
 * BEST FOR: Services pages, expert practice-area listings, course overviews
 * VISUAL STYLE: Charcoal band, rounded charcoal cards, tea-green eyebrow and CTA
 * LAYOUT: Bar heading with eyebrow and intro, then a two/three-column card grid, CTA below
 * CONTENT ELEMENTS: Eyebrow, heading, intro, cards with title and description, optional CTA button
 * CONVERSION ROLE: Communicate scope of services and route visitors deeper
 * IDEAL POSITION: Between white content sections, before testimonials or the closing CTA
 * NOTES / MODIFIERS: Dark counterpart to the home IconServiceCardsSection; provides the dark band that breaks up adjacent white sections; CTA hidden when `ctaHref` is omitted; intro and card descriptions render inline `**bold**` / `[label](url)` markdown
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { LineButton } from '@/Components/UI/LineButton';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

export type ServiceCard = {
    title: string;
    description: string;
};

type ServiceCardsSectionProps = {
    eyebrow?: string;
    heading?: string;
    headingLine2?: string;
    intro?: string;
    items?: ServiceCard[];
    ctaLabel?: string;
    ctaHref?: string;
    id?: string;
    spacing?: SectionSpacing;
};

export function ServiceCardsSection({
    eyebrow,
    heading = 'Our Services',
    headingLine2,
    intro,
    items = [],
    ctaLabel = 'View all courses',
    ctaHref,
    id = 'services',
    spacing = 'standard',
}: ServiceCardsSectionProps) {
    return (
        <section id={id} className={cx('bg-charcoal-brown-950 text-white', sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                <div className="flex flex-col gap-4">
                    {eyebrow ? (
                        <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-400 md:text-sm">
                            {eyebrow}
                        </p>
                    ) : null}
                    <SectionHeading title={heading} titleLine2={headingLine2} tone="dark" />
                    {intro ? (
                        <p className="max-w-2xl text-base font-light leading-relaxed text-zinc-200 md:text-lg">
                            <FormattedText text={intro} tone="dark" />
                        </p>
                    ) : null}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
                    {items.map((service) => (
                        <article
                            key={service.title}
                            className="flex flex-col gap-4 rounded-lg bg-gradient-to-br from-charcoal-brown-800 via-charcoal-brown-900 to-charcoal-brown-950 p-6 md:p-8"
                        >
                            <h3 className="text-lg font-bold md:text-xl">
                                <FormattedText text={service.title} tone="dark" />
                            </h3>
                            <p className="text-sm font-light leading-relaxed text-zinc-200">
                                <FormattedText text={service.description} tone="dark" />
                            </p>
                        </article>
                    ))}
                </div>

                {ctaHref ? (
                    <div className="flex">
                        <LineButton href={ctaHref}>{ctaLabel}</LineButton>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
