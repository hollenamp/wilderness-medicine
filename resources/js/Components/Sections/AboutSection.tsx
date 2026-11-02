/**
 * **CURSOR INFO**
 * SECTION TYPE: About with image
 * BEST FOR: Landing pages, About pages, brand story
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Two-column grid, copy left, image right
 * CONTENT ELEMENTS: Headline, body copy, CTA button, image
 * CONVERSION ROLE: Learn more about the business and/or owner
 * IDEAL POSITION: anywhere in a landing page, after intro in a about page
 * NOTES / MODIFIERS: Image zoom on scroll-in, responsive gradient background
 */

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../UI/Button';

const imageZoomVariants = {
    hidden: { scale: 1.1 },
    visible: {
        scale: 1,
        transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
};

interface AboutSectionProps {
    heading?: string;
    paragraph1?: string;
    paragraph2?: string;
    ctaLabel?: string;
    image?: string;
    imageAlt?: string;
}

export function AboutSection({
    heading = 'We believe WMO to be the best in Wilderness Medicine training',
    paragraph1 = 'Wilderness Medicine Outfitters was founded by Carl Weil, a 3rd-generation guide, who began teaching advanced first aid and backcountry care to ski patrollers in 1967 at Colorado State University.',
    paragraph2 = 'Since 2012, every WMO WFR/WEMT class has included at least one Fellow of the Academy of Wilderness Medicine as an instructor — a distinction WMO states no other school matches.',
    ctaLabel = 'Get in touch',
    image = '/images/hero-bg.jpg',
    imageAlt = 'Wilderness Medicine Outfitters field training',
}: AboutSectionProps = {}) {
    return (
        <div
            id="about"
            className="w-full overflow-hidden bg-charcoal-brown-950 md:bg-[linear-gradient(270deg,var(--color-charcoal-brown-900)_33%,white_33%)]"
        >
            <section className="mx-auto max-w-7xl py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-normal uppercase leading-tight tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
                            {heading}
                        </h2>
                        <p className="text-base font-light leading-relaxed text-zinc-900 md:text-xl">
                            {paragraph1}
                        </p>
                        <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                            {paragraph2}
                        </p>
                        <Button asChild variant="primary">
                            <a href="#contact" className="inline-flex items-center gap-2">
                                <span>{ctaLabel}</span>
                                <ArrowRight size={20} aria-hidden />
                            </a>
                        </Button>
                    </div>

                    <div className="relative h-96 w-full overflow-hidden">
                        <motion.div
                            className="absolute inset-0"
                            variants={imageZoomVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            <img
                                alt={imageAlt}
                                src={image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'right center',
                                }}
                                className="w-full h-full inset-0 absolute bg-top max-h-screen"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
