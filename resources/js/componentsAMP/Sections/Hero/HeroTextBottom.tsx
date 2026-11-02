'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-screen hero with bottom-aligned copy, blockquote lead-in, and dual CTAs
 * BEST FOR: Landing pages or Home page where the hero anchors copy to the viewport foot and pairs a quote-style line with actions
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Full-viewport hero with background image; single-row title; two-column row (blockquote + side-by-side buttons); scroll cue
 * CONTENT ELEMENTS: Background image, headline, blockquote-style sentence, primary and outline CTA buttons, scroll indicator
 * CONVERSION ROLE: First impression, establish positioning, and drive initial contact or inquiry
 * IDEAL POSITION: Top of page or alternative hero variant at the start of a layout
 * NOTES / MODIFIERS: Parallax blur on scroll, motion animations, scroll-to-next-section button, content pinned to section bottom
 */

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/UI/Button';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const imageVariants = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const taglineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function HeroTextBottom() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const handleScrollToNextSection = () => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const nextSection = currentSection.nextElementSibling as HTMLElement | null;
    if (!nextSection) return;

    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute inset-0"
          >
            <Image
              alt="Steel framing and crane activity on a high-end commercial construction site at dusk"
              src="images/background-01.webp"
              quality={75}
              fill
              priority
              sizes="2000"
              style={{
                objectFit: 'cover',
                objectPosition: 'right center',
              }}
              className="bg-top max-h-[100vh]"
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-end">
          <div className="container mx-auto w-full px-4 pb-28 pt-8 md:px-8 md:pb-32 md:pt-16 lg:px-12 lg:pb-36 lg:pt-24">
            <motion.div
              className="w-full text-left"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              <motion.h1
                className="text-balance text-left text-4xl font-medium capitalize leading-tight tracking-tight text-white md:text-5xl lg:text-6xl xl:text-8xl"
                variants={headlineVariants}
              >
              
                <span>Precision Construction. Elevated Execution.</span>
              </motion.h1>

              <motion.div
                className="mt-6 grid grid-cols-1 items-start gap-4 md:mt-8 md:gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
                variants={taglineVariants}
              >
                <blockquote className="border-l-4 border-red-900 pl-4 text-left text-base leading-relaxed text-white/90 md:pl-6 md:text-lg">
                Specialized residential construction and reconstruction delivered with clarity, control, and expertise.
                </blockquote>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
                  <Button asChild variant="primary" className="w-full sm:w-auto">
                    <a href="tel:+19253441571">Call the office</a>
                  </Button>
                  <Button asChild variant="primaryOutline" className="w-full sm:w-auto">
                    <a href="/contact">Start your project</a>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
