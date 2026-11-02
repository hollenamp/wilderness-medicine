'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-screen hero with left-aligned content and dual CTAs
 * BEST FOR: Landing pages or Home page where a strong primary call and secondary contact option are needed
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Full-viewport hero with background image, left-aligned copy column, button row, and scroll cue
 * CONTENT ELEMENTS: Background image, tagline, headline, subheadline, primary and secondary CTA buttons, scroll indicator
 * CONVERSION ROLE: First impression, establish positioning, and drive initial contact or inquiry
 * IDEAL POSITION: Top of page or alternative hero variant at the start of a layout
 * NOTES / MODIFIERS: Parallax blur on scroll, motion animations, scroll-to-next-section button
 */

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TreePine } from 'lucide-react';
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

export function HeroLeftButtonsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const blurPx = useTransform(scrollYProgress, [0, 0.6], [0, 12]);
  const filterValue = useTransform(blurPx, (v) => `blur(${v}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const handleScrollToNextSection = () => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const nextSection = currentSection.nextElementSibling as HTMLElement | null;
    if (!nextSection) return;

    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={sectionRef} id="home" className="relative min-h-screen max-h-screen overflow-hidden w-full">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute inset-0"
            style={{ filter: filterValue, scale }}
          >
            <Image
              alt="Luxury real estate property with modern exterior design"
              src="/images/hero-bg.jpg"
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col justify-end min-h-screen px-4 md:px-8 lg:px-12 py-24 space-y-6">
        <motion.div
          className="text-left max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.p className="text-white text-base md:text-xl tracking-wide uppercase font-light" variants={taglineVariants}>
            Luxury Real Estate · Bespoke Representation
          </motion.p>
          <motion.div
            className="h-px bg-white/50 max-w-24 my-4"
            variants={taglineVariants}
          />
          <motion.h1
            className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight leading-tight flex flex-col"
            variants={headlineVariants}
          >
            <motion.span
              className="text-primary-500 inline-block"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Elevated
            </motion.span>
            <motion.span
              className="inline-block text-[0.7em]"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            >
              Luxury Property Experiences
            </motion.span>
          </motion.h1>
          <motion.div
            className="h-px bg-white/50 max-w-24 my-4"
            variants={taglineVariants}
          />
          <motion.h2
            className="text-white text-base md:text-xl tracking-wide uppercase font-light"
            variants={taglineVariants}
          >
            Serving discerning buyers and sellers in premier markets
          </motion.h2>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            variants={taglineVariants}
          >
            <Button asChild variant="primary">
              <a href="tel:+18884757532">
                Call Now
              </a>
            </Button>
            <Button asChild variant="primaryOutline">
              <a href="#contact">
                Schedule a Consultation
              </a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.button
          type="button"
          aria-label="Scroll to next section"
          onClick={handleScrollToNextSection}
          className="absolute inset-x-0 bottom-10 mx-auto flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <TreePine className="w-10 h-10 text-white" aria-hidden />
        </motion.button>
      </div>
    </div>
  );
}
