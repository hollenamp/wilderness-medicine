'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-screen hero with headline and background image
 * BEST FOR: Landing pages, home page top fold
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Full-viewport hero, centered headline and tagline, scroll cue
 * CONTENT ELEMENTS: Background image, headline, tagline, scroll indicator
 * CONVERSION ROLE: First impression, set tone, encourage scroll
 * IDEAL POSITION: Top of page
 * NOTES / MODIFIERS: Parallax blur on scroll, motion animations
 */

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const blurPx = useTransform(scrollYProgress, [0, 0.6], [0, 12]);
  const filterValue = useTransform(blurPx, (v) => `blur(${v}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

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
              alt="Banner image"
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
      </div>

      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-8 py-32 space-y-4">
        <motion.div
          className="text-center max-w-4xl"
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
          <motion.p
            className="text-white text-base md:text-xl tracking-wide uppercase font-light"
            variants={taglineVariants}
          >
            Luxury Real Estate Excellence
          </motion.p>
          <motion.div
            className="h-px bg-white/50 max-w-24 mx-auto my-4"
            variants={taglineVariants}
          />
          <motion.h1
            className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-tight tracking-tight"
            variants={headlineVariants}
          >
            Elevating Luxury
            <br />
            Property Experiences
          </motion.h1>
          <motion.div
            className="h-px bg-white/50 max-w-24 mx-auto my-4"
            variants={taglineVariants}
          />
          <motion.h2
            className="text-white text-base md:text-xl tracking-wide uppercase font-light"
            variants={taglineVariants}
          >
            Discover Exceptional Properties
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
}
