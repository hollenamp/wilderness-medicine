/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-bleed hero card — left copy column over background image
 * BEST FOR: Home page, organizations that need a strong first impression plus an immediate call/contact CTA
 * VISUAL STYLE: Porto-inspired — large rounded dark card floating on the white page, bold, high contrast
 * LAYOUT: Single copy column (max-width constrained) left-aligned inside a rounded card; background image fills the card
 * CONTENT ELEMENTS: Eyebrow pill (icon + label), headline, subheading, dual CTA (pill w/ circular arrow icon + outline call button), trust line, background image
 * CONVERSION ROLE: First impression — drive a consultation click or an immediate phone call
 * IDEAL POSITION: Top of the home page, directly below the (white, fixed) Navigation
 * NOTES / MODIFIERS: Not full-viewport; fade/slide-in animations; background image positioned center-right
 */

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease },
  }),
};

interface HeroSplitSectionProps {
  eyebrow?: string;
  headline?: string;
  headlineAccent?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  phone?: string | null;
  trustLine?: string;
  image?: string;
}

export function HeroSplitSection({
  eyebrow = 'Wilderness Medicine Training',
  headline = 'Confidence',
  headlineAccent = 'When It Matters Most',
  subheading = 'Hands-on wilderness first aid and medicine courses that prepare you to respond when help is hours away.',
  primaryCtaLabel = 'View Course Schedule',
  primaryCtaHref = '/contact-us',
  phone = null,
  trustLine = 'Certified Instructors  •  Field-Tested Curriculum  •  Small Class Sizes',
  image = '/images/hero-04.webp',
}: HeroSplitSectionProps = {}) {
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined;

  return (
    <section id="home" className="w-full bg-white pt-0 pb-8 md:px-4 md:pt-4 md:pb-16 lg:px-6 lg:pt-6 lg:pb-20">
      <div className="relative w-full overflow-hidden rounded-none bg-zinc-900 md:rounded-xl">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center right' }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/40 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 py-8 md:px-8 md:py-16 lg:px-12 lg:py-24">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-900"
              custom={0}
              variants={fadeInUp}
            >
              <Sparkles className="h-4 w-4 shrink-0 text-tea-green-500" aria-hidden />
              {eyebrow}
            </motion.span>

            <motion.h1
              className="mt-6 text-[2.5rem] font-semibold leading-none tracking-tighter text-white lg:text-[3.0625rem]"
              custom={1}
              variants={fadeInUp}
            >
              {headline}
              {headlineAccent ? (
                <>
                  {' '}
                  <span className="text-tea-green-400">{headlineAccent}</span>
                </>
              ) : null}
            </motion.h1>

            <motion.p
              className="mt-6 text-base leading-relaxed text-tea-green-100 md:text-lg"
              custom={2}
              variants={fadeInUp}
            >
              {subheading}
            </motion.p>

            <motion.div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center" custom={3} variants={fadeInUp}>
              <Link
                href={primaryCtaHref}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-base font-semibold text-zinc-900 transition-colors hover:bg-white/90"
              >
                <span>{primaryCtaLabel}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal-brown-950 text-white transition-colors group-hover:bg-forest-green-600">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
              {phoneHref && (
                <a
                  href={phoneHref}
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-white/40 px-6 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  Call {phone}
                </a>
              )}
            </motion.div>

            {trustLine && (
              <motion.p
                className="mt-6 flex items-center gap-2 text-sm font-medium text-tea-green-200"
                custom={4}
                variants={fadeInUp}
              >
                <Sparkles className="h-4 w-4 shrink-0 text-tea-green-400" aria-hidden />
                {trustLine}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
