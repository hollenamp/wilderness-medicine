/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-bleed photographic call-to-action banner
 * BEST FOR: Mid-page conversion after services
 * VISUAL STYLE: Immersive photo, large uppercase overlay, tea-green CTA
 * LAYOUT: Full-width background image with left-aligned headline and CTA
 * CONTENT ELEMENTS: Overlay headline, CTA button
 * CONVERSION ROLE: Drive contact, booking, or class inquiry
 * IDEAL POSITION: After services cards, before gallery or courses
 * NOTES / MODIFIERS: Dark overlay; hero-style spacing exception
 */

import { LineButton } from '@/Components/UI/LineButton';

type ImageCtaBannerSectionProps = {
    heading?: string;
    ctaLabel?: string;
    ctaHref?: string;
    image?: string;
    imageAlt?: string;
};

export function ImageCtaBannerSection({
    heading = 'Free mini-lessons, plus we’re hiring instructors',
    ctaLabel = 'Contact Us',
    ctaHref = '/contact-us',
    image = '/images/content/web3half.jpg',
    imageAlt = 'Students practicing wilderness first aid beside a vehicle',
}: ImageCtaBannerSectionProps) {
    return (
        <section className="relative flex min-h-[22rem] items-end overflow-hidden md:min-h-[28rem] lg:min-h-[32rem]">
            <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-charcoal-brown-950/50" aria-hidden />
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 py-12 px-4 md:gap-12 md:py-16 md:px-8 lg:py-24 lg:px-12">
                <h2 className="max-w-4xl text-2xl font-bold uppercase leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                    {heading}
                </h2>
                <LineButton href={ctaHref}>
                    {ctaLabel}
                </LineButton>
            </div>
        </section>
    );
}
