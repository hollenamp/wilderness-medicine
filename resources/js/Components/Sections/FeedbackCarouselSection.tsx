/**
 * **CURSOR INFO**
 * SECTION TYPE: Dark testimonial carousel
 * BEST FOR: Home page social proof and press mentions
 * VISUAL STYLE: Dark charcoal, gold-style tea-green stars, photo-backed cards
 * LAYOUT: Heading, intro, chevrons, then two-up quote cards with avatar
 * CONTENT ELEMENTS: Heading, intro, avatar, name, star rating, quote
 * CONVERSION ROLE: Social proof before blog and contact
 * IDEAL POSITION: After featured courses, before blog preview
 * NOTES / MODIFIERS: Local-state carousel; 1 card on mobile, 2 on md+
 */

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export type FeedbackItem = {
    name: string;
    title?: string;
    testimonial: string;
    starRating?: string;
    avatar?: string;
};

type FeedbackCarouselSectionProps = {
    heading?: string;
    intro?: string;
    items?: FeedbackItem[];
};

const defaultItems: FeedbackItem[] = [
    {
        name: 'National Geographic',
        title: 'Adventure issue',
        testimonial:
            'Listed among “eight tools to save your hide abroad,” National Geographic advised readers to get their facts straight with Wilderness Medicine Outfitters’ Quick Reference Backcountry Medical Care.',
        starRating: '5',
    },
    {
        name: 'Broadcast features',
        title: 'Including Fox TV',
        testimonial:
            'Carl Weil and Wilderness Medicine Outfitters have been featured in television segments, bringing practical wilderness medicine and outdoor safety tips to a wider audience.',
        starRating: '5',
    },
    {
        name: 'Academy of Wilderness Medicine',
        title: 'Fellow & Master Fellow',
        testimonial:
            'Carl Weil was the first non-physician Fellow of the Academy of Wilderness Medicine and later the first to complete the Master Fellow degree — credentials that shape every advanced WMO class.',
        starRating: '5',
    },
];

function ratingCount(value?: string): number {
    const parsed = Number.parseInt(value ?? '5', 10);

    if (Number.isNaN(parsed)) {
        return 5;
    }

    return Math.min(5, Math.max(1, parsed));
}

export function FeedbackCarouselSection({
    heading = 'Your Feedback',
    intro = 'Press, professional recognition, and the credentials behind every WMO class — from National Geographic to the Academy of Wilderness Medicine.',
    items = defaultItems,
}: FeedbackCarouselSectionProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const handlePrev = () => {
        const scroller = scrollerRef.current;
        if (!scroller) {
            return;
        }
        scroller.scrollBy({ left: -scroller.clientWidth * 0.9, behavior: 'smooth' });
    };

    const handleNext = () => {
        const scroller = scrollerRef.current;
        if (!scroller) {
            return;
        }
        scroller.scrollBy({ left: scroller.clientWidth * 0.9, behavior: 'smooth' });
    };

    return (
        <section className="bg-charcoal-brown-950 py-8 text-white md:py-16 lg:py-24">
            <div className="mx-auto max-w-7xl flex flex-col gap-8 px-4 md:gap-12 md:px-8 lg:px-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex max-w-2xl flex-col gap-4">
                        <SectionHeading title={heading} tone="dark" />
                        <p className="text-base font-light leading-relaxed text-zinc-200 md:text-lg">{intro}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous testimonials"
                            className="p-2 text-zinc-400 transition-colors hover:text-tea-green-400"
                        >
                            <ChevronLeft className="h-6 w-6" strokeWidth={1.75} />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next testimonials"
                            className="p-2 text-tea-green-400 transition-colors hover:text-tea-green-300"
                        >
                            <ChevronRight className="h-6 w-6" strokeWidth={1.75} />
                        </button>
                    </div>
                </div>
                <div
                    ref={scrollerRef}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none md:gap-8"
                >
                        {items.map((item) => {
                            const stars = ratingCount(item.starRating);
                            const initial = item.name.charAt(0).toUpperCase();

                            return (
                                <article
                                    key={`${item.name}-${item.title ?? ''}`}
                                    className="relative min-w-[90%] snap-start overflow-hidden rounded-lg md:min-w-[calc(50%-1rem)]"
                                >
                                    <img
                                        src="/images/hero-03.webp"
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover opacity-30"
                                    />
                                    <div className="relative flex h-full flex-col gap-4 bg-charcoal-brown-950/70 p-6 md:p-8">
                                        <div className="flex items-center gap-4">
                                            {item.avatar ? (
                                                <img
                                                    src={item.avatar}
                                                    alt=""
                                                    className="h-14 w-14 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tea-green-500 text-lg font-semibold text-white">
                                                    {initial}
                                                </span>
                                            )}
                                            <div className="flex flex-col gap-1">
                                                <p className="font-semibold">{item.name}</p>
                                                <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
                                                    {Array.from({ length: 5 }).map((_, starIndex) => (
                                                        <Star
                                                            key={starIndex}
                                                            className={`h-4 w-4 ${starIndex < stars ? 'fill-tea-green-400 text-tea-green-400' : 'text-zinc-500'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm font-light leading-relaxed text-zinc-100 md:text-base">
                                            {item.testimonial}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
