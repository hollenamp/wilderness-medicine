/**
 * **CURSOR INFO**
 * SECTION TYPE: Three-column photo feature grid
 * BEST FOR: Home page differentiators and “why choose us” stories
 * VISUAL STYLE: Editorial zinc cards, square photography, tea-green title bars
 * LAYOUT: Heading with vertical bar, then three equal padded zinc-50 photo-and-copy cards
 * CONTENT ELEMENTS: Section heading, square images, titles with accent bar, descriptions
 * CONVERSION ROLE: Highlight what sets the school apart
 * IDEAL POSITION: Directly after the home hero
 * NOTES / MODIFIERS: Square photos with hover zoom; padded equal-height zinc-50 cards; responsive 1–3 columns
 */

import { SectionHeading } from '@/Components/UI/SectionHeading';

export type WhyChooseUsCard = {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt?: string;
};

type WhyChooseUsSectionProps = {
    heading?: string;
    cards?: WhyChooseUsCard[];
};

const defaultCards: WhyChooseUsCard[] = [
    {
        title: 'Training since 1967',
        description:
            'One of the longest-running wilderness medicine programs in the industry — Wilderness Medicine Classes since 1967, blended and online since 2004.',
        imageSrc: '/images/content/practicing-passing-01.jpg',
        imageAlt: 'Students practicing a litter carry during wilderness medicine training',
    },
    {
        title: 'Master Fellow leadership',
        description:
            'Director Carl Weil is the first Master Fellow of the Academy of Wilderness Medicine, and the first non-physician Fellow.',
        imageSrc: '/images/content/WMO-archery400.jpg',
        imageAlt: 'Carl Weil at Wilderness Medicine Outfitters in Elizabeth, Colorado',
    },
    {
        title: 'Fellow-level WFR classes',
        description:
            'Every WFR/WEMT class since 2012 includes a Fellow of the Academy of Wilderness Medicine — a distinction WMO says no other school matches.',
        imageSrc: '/images/content/shadybrook400.jpg',
        imageAlt: 'Instructor-led wilderness medicine class',
    },
];

export function WhyChooseUsSection({
    heading = 'Why Choose Us',
    cards = defaultCards,
}: WhyChooseUsSectionProps) {
    return (
        <section className="bg-white py-8 md:py-16 lg:py-24">
            <div className="mx-auto max-w-7xl flex flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                <SectionHeading title={heading} />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-12">
                    {cards.map((card) => (
                        <article
                            key={card.title}
                            className="group flex h-full flex-col gap-4 rounded-lg bg-zinc-50 p-4 md:p-6"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <img
                                    src={card.imageSrc}
                                    alt={card.imageAlt ?? card.title}
                                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-charcoal-brown-950/45 via-transparent to-charcoal-brown-950/15"
                                    aria-hidden
                                />
                            </div>
                            <h3 className="flex items-stretch gap-3 text-lg font-bold text-charcoal-brown-950 md:text-xl">
                                <span className="w-1 shrink-0 bg-tea-green-500" aria-hidden />
                                <span>{card.title}</span>
                            </h3>
                            <p className="flex-1 text-base font-light leading-relaxed text-charcoal-brown-800">
                                {card.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
