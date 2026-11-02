/**
 * **CURSOR INFO**
 * SECTION TYPE: Four dark icon service cards with line CTA
 * BEST FOR: Home page service overview
 * VISUAL STYLE: Zinc-50 section, charcoal cards, tea-green CTA
 * LAYOUT: Heading, intro plus View More, then four-column icon cards
 * CONTENT ELEMENTS: Section heading, intro, CTA button, icon, title, description
 * CONVERSION ROLE: Route visitors to contact to inquire about courses
 * IDEAL POSITION: After featured courses, before contact
 * NOTES / MODIFIERS: Lucide line-art icons; rounded charcoal cards; zinc-50 band after the white course carousel
 */

import { BookOpen, Compass, Package, ShieldCheck, type LucideIcon } from 'lucide-react';
import { LineButton } from '@/Components/UI/LineButton';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export type IconServiceCard = {
    title: string;
    description: string;
};

type IconServiceCardsSectionProps = {
    heading?: string;
    intro?: string;
    ctaLabel?: string;
    ctaHref?: string;
    items?: IconServiceCard[];
};

const defaultItems: IconServiceCard[] = [
    {
        title: 'Wilderness First Aid',
        description:
            '16- and 24-hour WFA courses, plus Advanced WFA — in person or blended with online lessons and hands-on skills.',
    },
    {
        title: 'WFR / WEMT',
        description:
            '9-day intensives or 6-week evening format, plus blended options. College credit available for the 76-hour course.',
    },
    {
        title: 'Medical Supplies',
        description:
            'Wholesale, factory-direct kits and hard-to-find items — wound closure, airway supplies, off-the-shelf or custom.',
    },
    {
        title: 'Outdoor Skills',
        description:
            'Survival, Shelter & Fire, Archery, Firearms, Map & Compass, and Remote Travel — at our property or yours.',
    },
];

const cardIcons: LucideIcon[] = [BookOpen, ShieldCheck, Package, Compass];

export function IconServiceCardsSection({
    heading = 'Our Services',
    intro = 'From standard Wilderness First Aid to Wilderness First Responder, WEMT modules, and cadaver-based Wilderness Advanced Life Support — plus medical supplies and outdoor skills training.',
    ctaLabel = 'View More',
    ctaHref = '/contact-us',
    items = defaultItems,
}: IconServiceCardsSectionProps) {
    return (
        <section className="bg-zinc-50 py-8 md:py-16 lg:py-24">
            <div className="mx-auto max-w-7xl flex flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                <SectionHeading title={heading} />
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_auto] md:gap-8 lg:gap-12">
                    <p className="max-w-2xl text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                        {intro}
                    </p>
                    <LineButton href={ctaHref}>
                        {ctaLabel}
                    </LineButton>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 lg:gap-12">
                    {items.map((item, index) => {
                        const Icon = cardIcons[index % cardIcons.length];

                        return (
                            <article
                                key={item.title}
                                className="flex flex-col gap-4 rounded-lg bg-gradient-to-br from-charcoal-brown-800 via-charcoal-brown-900 to-charcoal-brown-950 p-6 text-white md:p-8"
                            >
                                <Icon className="h-8 w-8 text-white" strokeWidth={1.5} aria-hidden />
                                <h3 className="text-lg font-bold">{item.title}</h3>
                                <p className="text-sm font-light leading-relaxed text-zinc-200">{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
