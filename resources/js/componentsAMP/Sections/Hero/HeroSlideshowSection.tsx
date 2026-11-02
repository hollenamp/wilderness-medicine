'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-screen hero with slideshow background and dual CTAs
 * BEST FOR: Landing pages or Home page where rotating hero imagery and strong CTAs are needed
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Full-viewport hero with crossfading background slides, left-aligned copy column, button row, and scroll cue
 * CONTENT ELEMENTS: Rotating background images, tagline, headline, subheadline, primary and secondary CTA buttons, scroll indicator
 * CONVERSION ROLE: First impression, establish positioning, and drive initial contact or inquiry
 * IDEAL POSITION: Top of page as the primary hero
 * NOTES / MODIFIERS: Parallax blur on scroll (shared across slides), motion animations, auto-advancing slideshow, scroll-to-next-section button
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/UI/Button';

const DEFAULT_SLIDES: readonly { src: string; alt: string }[] = [
  {
    src: 'https://images.pexels.com/photos/1235719/pexels-photo-1235719.jpeg?auto=compress&cs=tinysrgb&w=2000',
    alt: 'Calm ocean horizon at sunrise',
  },
  {
    src: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=2000',
    alt: 'Fishing boat on open water',
  },
  {
    src: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=2000',
    alt: 'Boat cutting across blue water',
  },
];

const SLIDE_INTERVAL_MS = 6500;
const CROSSFADE_DURATION_S = 1.2;

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

const scrollCueFloatTransition = {
  duration: 9,
  repeat: Infinity,
  ease: 'easeInOut' as const,
  times: [0, 0.25, 0.5, 0.75, 1],
};

export type HeroCharterSlideshowSectionProps = {
  phone: string;
  tagline?: string;
  headlineAccent?: string;
  headlineRest?: string;
  subheadline?: string;
  verticalLabel?: string;
  /** Background slides; defaults to hero-slide-01..03 */
  slides?: readonly { src: string; alt: string }[];
  slideIntervalMs?: number;
};

export function HeroCharterSlideshowSection({
  phone,
  tagline = 'Excellence in every detail',
  headlineAccent = 'Your Headline',
  headlineRest = 'goes here',
  subheadline = 'Replace this placeholder with your value proposition and primary message',
  verticalLabel = 'Hero Section',
  slides = DEFAULT_SLIDES,
  slideIntervalMs = SLIDE_INTERVAL_MS,
}: HeroCharterSlideshowSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const blurPx = useTransform(scrollYProgress, [0, 0.6], [0, 12]);
  const filterValue = useTransform(blurPx, (v) => `blur(${v}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    if (slideCount <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slideCount);
    }, slideIntervalMs);
    return () => window.clearInterval(id);
  }, [slideCount, slideIntervalMs]);

  const handleScrollToNextSection = () => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const nextSection = currentSection.nextElementSibling as HTMLElement | null;
    if (!nextSection) return;

    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={sectionRef} id="home" className="relative min-h-screen max-h-screen overflow-hidden w-full">
      <div className="absolute z-10 right-0 top-0 uppercase w-24 h-24">
        <span className="absolute inset-0 mr-8 pl-12 rotate-90 text-nowrap text-[5vh] md:text-[9vh] font-extrabold tracking-tight leading-none text-white/20">
          {verticalLabel}
        </span>
      </div>
      <div className="container mx-auto relative z-10 flex flex-col justify-end min-h-screen px-4 md:px-8 lg:px-12 py-24 space-y-6">
        <motion.div
          className="text-left max-w-4xl pb-[5vh] md:pb-0"
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
          <div className='pr-16 sm:pr-0'>
            <motion.p
              className="text-white text-base md:text-xl tracking-wide uppercase font-light leading-none"
              variants={taglineVariants}
            >
              {tagline}
            </motion.p>
            <motion.h1
              className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight flex flex-col"
              variants={headlineVariants}
            >
              <motion.span
                className="text-primary-500 inline-block tracking-tight leading-none -ml-0.5"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {headlineAccent}
              </motion.span>
              <motion.span
                className="inline-block text-[0.75em] tracking-widest leading-none"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              >
                {headlineRest}
              </motion.span>
            </motion.h1>
            <motion.h2
              className="text-white text-base md:text-xl tracking-wide uppercase leading-tight font-normal"
              variants={taglineVariants}
            >
              {subheadline}
            </motion.h2>
          </div>
          <motion.div className="mt-8 flex flex-col sm:flex-row gap-4" variants={taglineVariants}>
            <Button asChild variant="primary">
              <a href={`tel:${phone}`}>Call Now</a>
            </Button>
            <Button asChild variant="primaryOutline">
              <a href="#contact">Book a Trip</a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.button
          type="button"
          aria-label="Scroll to next section"
          onClick={handleScrollToNextSection}
          className="absolute w-18 h-18 inset-x-0 bottom-10 mx-auto flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          initial={{ opacity: 0, y: 12, rotate: 0 }}
          animate={{
            opacity: [0.4, 1, 0.55, 1, 0.4],
            y: [0, -10, 0, -8, 0],
            rotate: [0, 8, 0, -6, 0],
          }}
          transition={scrollCueFloatTransition}
        >
          <Image
            src="/images/hook-icon.webp"
            alt=""
            width={40}
            height={40}
            className="w-18 h-18 object-contain object-center"
            aria-hidden
          />
        </motion.button>
      </div>

      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="absolute inset-0" style={{ filter: filterValue, scale }}>
            {slides.map((slide, i) => (
              <motion.div
                key={slide.src}
                className="absolute inset-0"
                style={{ zIndex: i === activeIndex ? 2 : 1 }}
                initial={false}
                animate={{ opacity: i === activeIndex ? 1 : 0 }}
                transition={{
                  duration: CROSSFADE_DURATION_S,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Image
                  alt={slide.alt}
                  src={slide.src}
                  quality={75}
                  fill
                  priority={i === 0}
                  sizes="2000"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'right center',
                  }}
                  className="bg-top max-h-screen"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-black/40 to-black/10"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-secondary-950/85 via-primary-800/35 to-primary-500/25"
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <span className="sr-only" aria-live="polite">
        Background image {activeIndex + 1} of {slideCount}
      </span>
    </div>
  );
}
