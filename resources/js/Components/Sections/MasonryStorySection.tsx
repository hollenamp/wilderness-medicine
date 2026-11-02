/**
 * **CURSOR INFO**
 * SECTION TYPE: Asymmetrical masonry photo story
 * BEST FOR: Home page atmosphere and property/field storytelling
 * VISUAL STYLE: Editorial, staggered images, generous whitespace
 * LAYOUT: Heading with vertical bar, mixed portrait/landscape images and short copy blocks
 * CONTENT ELEMENTS: Section heading, multiple images, supporting paragraphs
 * CONVERSION ROLE: Show the training environment and build desire
 * IDEAL POSITION: After the image CTA, before featured courses
 * NOTES / MODIFIERS: Rounded images; CSS grid masonry-style placement; adjacent light-section spacing
 */

import { SectionHeading } from '@/Components/UI/SectionHeading';

export type MasonryImage = {
    src: string;
    alt: string;
};

type MasonryStorySectionProps = {
    heading?: string;
    body?: string;
    closing?: string;
    images?: MasonryImage[];
};

const defaultImages: MasonryImage[] = [
    { src: '/images/content/water_mid.jpg', alt: 'Outdoor skills training at a mountain lake' },
    { src: '/images/content/practicing-passing-01.jpg', alt: 'Students practicing a patient carry on the Elizabeth, Colorado property' },
    { src: '/images/content/ring-carry-01.jpg', alt: 'Wilderness medicine students with rescue equipment at camp' },
];

export function MasonryStorySection({
    heading = 'Training Grounds',
    body = 'Classes are held at WMO’s rural Elizabeth, Colorado property — or we travel to teach at your location. A typical 9-day intensive runs 8am–6pm, mixing lecture, demonstration, and hands-on practice, capped at 24 students.',
    closing = 'Come train where the work actually happens: woods, weather, and the skills you will need when help is hours away.',
    images = defaultImages,
}: MasonryStorySectionProps) {
    const [wide, portrait, landscape] = [
        images[0] ?? defaultImages[0],
        images[1] ?? defaultImages[1],
        images[2] ?? defaultImages[2],
    ];

    return (
        <section className="bg-white pt-8 pb-4 md:pt-16 md:pb-8 lg:pt-24 lg:pb-16">
            <div className="mx-auto max-w-7xl flex flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                <SectionHeading title={heading} />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8 lg:gap-12">
                    <div className="md:col-span-5">
                        <img
                            src={wide.src}
                            alt={wide.alt}
                            className="h-48 w-full rounded-lg object-cover md:h-56"
                        />
                    </div>
                    <div className="md:col-span-7">
                        <img
                            src={portrait.src}
                            alt={portrait.alt}
                            className="h-72 w-full rounded-lg object-cover md:h-[28rem]"
                        />
                    </div>
                    <div className="md:col-span-4">
                        <img
                            src={landscape.src}
                            alt={landscape.alt}
                            className="h-80 w-full rounded-lg object-cover"
                        />
                    </div>
                    <div className="flex items-center md:col-span-8">
                        <p className="max-w-xl text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                            {body}
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <img
                            src={wide.src}
                            alt={wide.alt}
                            className="h-56 w-full rounded-lg object-cover md:h-64"
                        />
                    </div>
                    <div className="flex items-end md:col-span-4">
                        <p className="text-base font-light leading-relaxed text-charcoal-brown-800">
                            {closing}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
