/**
 * **CURSOR INFO**
 * SECTION TYPE: Two-column text CTA cards with stats
 * BEST FOR: Home page funnel into Distance Learning and Expert Outdoor Witness
 * VISUAL STYLE: Zinc-50 band, paired light/dark editorial cards, tea-green accents
 * LAYOUT: Heading left and intro right, then two equal text cards with a large stat and CTA
 * CONTENT ELEMENTS: Section heading, intro, stat, eyebrow, title, description, arrow CTA
 * CONVERSION ROLE: Route visitors to Distance Learning or Expert Outdoor Witness
 * IDEAL POSITION: After featured courses, before the footer
 * NOTES / MODIFIERS: No images; heading/intro split two-up from tablet; whole card is a link; light then dark pairing
 */

import { Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, Scale, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { cx } from '@/lib/utils';

export type PathCard = {
    title: string;
    description: string;
    href: string;
    ctaLabel?: string;
    eyebrow?: string;
    stat?: string;
};

type TwoPathCardsSectionProps = {
    heading?: string;
    intro?: string;
    items?: PathCard[];
};

const defaultItems: PathCard[] = [
    {
        title: 'Distance Learning',
        eyebrow: 'Blended since',
        stat: '2004',
        description:
            'Wilderness medicine on your schedule — online lessons plus hands-on skills near you. AWFA, converting AWFA to WFR, EPI, and more.',
        href: '/distance-learning/other-dl-classes',
        ctaLabel: 'Explore Distance Learning',
    },
    {
        title: 'Expert Outdoor Witness',
        eyebrow: 'Cases worked',
        stat: '300+',
        description:
            'Carl Weil has reviewed about 3,000 outdoor businesses and worked on 300+ cases. Free initial review — call (303) 688-5176.',
        href: '/expert-witness',
        ctaLabel: 'Explore Expert Witness',
    },
];

const cardIcons: LucideIcon[] = [BookOpen, Scale];

export function TwoPathCardsSection({
    heading = 'Train or Consult',
    intro = 'Take a blended course on your schedule, or hire Carl Weil as an outdoor recreation expert witness.',
    items = defaultItems,
}: TwoPathCardsSectionProps) {
    return (
        <section className="bg-zinc-50 py-8 md:py-16 lg:py-24">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
                    <SectionHeading title={heading} />
                    {intro ? (
                        <p className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                            {intro}
                        </p>
                    ) : null}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
                    {items.map((item, index) => {
                        const Icon = cardIcons[index % cardIcons.length];
                        const isDark = index % 2 === 1;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                aria-label={`${item.title}: ${item.ctaLabel ?? 'Learn more'}`}
                                className={cx(
                                    'group flex h-full flex-col gap-6 rounded-lg p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-400 focus-visible:ring-offset-2 md:gap-8 md:p-8 lg:p-10',
                                    isDark
                                        ? 'bg-gradient-to-br from-charcoal-brown-800 via-charcoal-brown-900 to-charcoal-brown-950 text-white'
                                        : 'border border-zinc-200 bg-white text-charcoal-brown-950',
                                )}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span
                                        className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-tea-green-500 text-white"
                                        aria-hidden
                                    >
                                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                                    </span>
                                    {item.stat ? (
                                        <div className="text-right">
                                            {item.eyebrow ? (
                                                <p
                                                    className={cx(
                                                        'text-xs font-semibold uppercase tracking-widest',
                                                        isDark ? 'text-tea-green-400' : 'text-tea-green-600',
                                                    )}
                                                >
                                                    {item.eyebrow}
                                                </p>
                                            ) : null}
                                            <p className="text-3xl font-bold tracking-tight md:text-4xl">{item.stat}</p>
                                        </div>
                                    ) : item.eyebrow ? (
                                        <p
                                            className={cx(
                                                'text-xs font-semibold uppercase tracking-widest',
                                                isDark ? 'text-tea-green-400' : 'text-tea-green-600',
                                            )}
                                        >
                                            {item.eyebrow}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex flex-1 flex-col gap-4">
                                    <h3 className="flex items-stretch gap-3 text-lg font-bold md:text-xl">
                                        <span className="w-1 shrink-0 bg-tea-green-500" aria-hidden />
                                        <span>{item.title}</span>
                                    </h3>
                                    <p
                                        className={cx(
                                            'flex-1 text-sm font-light leading-relaxed md:text-base',
                                            isDark ? 'text-zinc-200' : 'text-charcoal-brown-800',
                                        )}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                                <span
                                    className={cx(
                                        'mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide transition-colors md:text-base',
                                        isDark
                                            ? 'text-tea-green-400 group-hover:text-tea-green-300'
                                            : 'text-forest-green-700 group-hover:text-forest-green-600',
                                    )}
                                >
                                    {item.ctaLabel ?? 'Learn more'}
                                    <ArrowRight
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                        strokeWidth={2}
                                        aria-hidden
                                    />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
