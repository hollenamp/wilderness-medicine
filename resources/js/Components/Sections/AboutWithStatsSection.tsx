/**
 * **CURSOR INFO**
 * SECTION TYPE: About split with overlapping highlight bar
 * BEST FOR: Home and about pages that need a founder story plus proof points
 * VISUAL STYLE: Editorial split, dark overlay, equal tea-green text blocks
 * LAYOUT: Copy left, tall rounded image right, charcoal highlight bar overlapping the image
 * CONTENT ELEMENTS: Two-line heading, body paragraphs, three equal text blocks
 * CONVERSION ROLE: Build trust with history and credentials
 * IDEAL POSITION: After why-choose-us, before services
 * NOTES / MODIFIERS: Right image uses Parallax inside a clipped rounded frame; highlight bar overlaps the image as readable text blocks (no oversized figures); standard top spacing after the charcoal press CTA
 */

import { SectionHeading } from '@/Components/UI/SectionHeading';
import { Parallax } from '@/Components/UI/Parallax';

export type AboutStat = {
    text?: string;
    value?: string;
    label?: string;
};

type AboutWithStatsSectionProps = {
    id?: string;
    heading?: string;
    headingLine2?: string;
    paragraph1?: string;
    paragraph2?: string;
    image?: string;
    imageAlt?: string;
    stats?: AboutStat[];
};

const defaultStats: AboutStat[] = [
    { text: 'Wilderness Medicine Classes since 1967' },
    { text: '1st wilderness medicine school with Wilderness Medicine Masters degree holder as director' },
    { text: 'Student class cap of 24' },
];

const aboutStatText = (stat: AboutStat): string => {
    if (stat.text?.trim()) {
        return stat.text.trim();
    }

    return [stat.value, stat.label]
        .filter((part): part is string => Boolean(part?.trim()))
        .join(' ')
        .trim();
};

export function AboutWithStatsSection({
    id = 'about',
    heading = 'About',
    headingLine2 = 'Wilderness Medicine Outfitters',
    paragraph1 = 'Since 1967, Wilderness Medicine Outfitters has trained people to access and treat injuries and illness when help is hours — not minutes — away. Founded by 3rd-generation guide Carl Weil, WMO teaches Wilderness First Aid through Wilderness Advanced Life Support, in person or blended online, at our Elizabeth, Colorado property or your own location.',
    paragraph2 = 'Every WFR/WEMT class since 2012 has included at least one Fellow of the Academy of Wilderness Medicine — a distinction WMO says no other school matches. Beyond training, WMO supplies wholesale, factory-direct medical kits and hard-to-find items, and teaches outdoor skills from map & compass to wilderness survival.',
    image = '/images/content/ring-carry-01.jpg',
    imageAlt = 'Wilderness Medicine Outfitters students with rescue gear on the Elizabeth property',
    stats = defaultStats,
}: AboutWithStatsSectionProps) {
    return (
        <section id={id} className="relative bg-white pb-0 pt-8 md:pt-16 lg:pt-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 items-start gap-8 pb-24 md:grid-cols-2 md:gap-12 md:pb-28 lg:gap-16 lg:pb-32">
                    <div className="flex flex-col gap-6 md:gap-8">
                        <SectionHeading title={heading} titleLine2={headingLine2} />
                        <p className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                            {paragraph1}
                        </p>
                        <p className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                            {paragraph2}
                        </p>
                    </div>
                    <div className="relative h-112 overflow-hidden rounded-lg md:h-144">
                        <Parallax className="absolute inset-0" speed={0.35}>
                            <img
                                src={image}
                                alt={imageAlt}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </Parallax>
                    </div>
                </div>
                <div className="relative z-10 -mt-16 rounded-lg bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 md:-mt-24">
                    <div className="grid grid-cols-1 divide-y divide-tea-green-500 py-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:py-8">
                        {stats.map((stat) => {
                            const text = aboutStatText(stat);

                            return (
                                <div
                                    key={text}
                                    className="flex items-center justify-center px-6 py-4 text-center"
                                >
                                    <p className="text-sm font-medium leading-snug text-tea-green-400 md:text-base">
                                        {text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
