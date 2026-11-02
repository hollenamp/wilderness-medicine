/**
 * **CURSOR INFO**
 * SECTION TYPE: Interior page banner — short photographic header with page title
 * BEST FOR: All CMS sub-pages (About, Services, Contact, FAQs, Gallery, Reviews, expert pages)
 * VISUAL STYLE: Same as the home half-glass hero — cinematic photo, rounded card, light overlay, clean type
 * LAYOUT: Not full-viewport; inset rounded card over a blurred photo, title bottom-left
 * CONTENT ELEMENTS: Top-left logo, background image (center-right crop), optional eyebrow/tagline, headline, optional second headline line, optional subheading
 * CONVERSION ROLE: Orient the visitor — name the page and set the wilderness tone without repeating the home hero
 * IDEAL POSITION: Top of every sub-page, under the fixed transparent Navigation
 * NOTES / MODIFIERS: Shares home hero chrome (blurred outer photo, rounded inner card, nav-clearing padding); image defaults to hero-04.webp with object-right; logo top-left matches home hero; title sits bottom-left; no glass split or scroll cue
 */

import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { DEFAULT_HERO_LOGO, resolveSiteLogoUrl } from '@/lib/siteConfig';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease },
  }),
};

interface SubpageBannerSectionProps {
  tagline?: string;
  headline?: string;
  headlineLine2?: string;
  subheading?: string;
  image?: string;
  imageAlt?: string;
  logo?: string;
  id?: string;
}

export function SubpageBannerSection({
  tagline,
  headline = 'Page title',
  headlineLine2,
  subheading,
  image = '/images/hero-04.webp',
  imageAlt = 'Wilderness medicine students practicing field skills',
  logo = DEFAULT_HERO_LOGO,
  id = 'hero',
}: SubpageBannerSectionProps = {}) {
  const logoSrc = resolveSiteLogoUrl(logo, DEFAULT_HERO_LOGO);
  return (
    <section
      id={id}
      className="relative w-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-right blur-sm brightness-[0.65]"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-charcoal-brown-950/15" aria-hidden />

      <div className="relative z-10 flex w-full flex-col px-4 pt-24 pb-4 md:px-8 md:pt-28 md:pb-6 lg:px-12 lg:pb-8">
        <div className="relative flex h-56 w-full items-end justify-start overflow-hidden rounded-3xl border border-white/20 md:h-72 md:rounded-[2.5rem] lg:h-80">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
          <div className="pointer-events-none absolute inset-0 bg-charcoal-brown-950/20" aria-hidden />

          <motion.div
            className="pointer-events-none absolute inset-0"
            initial="hidden"
            animate="visible"
          >
            {logoSrc ? (
              <motion.div
                className="pointer-events-auto absolute left-0 top-0 z-10 p-4 md:p-8 lg:p-12"
                custom={0}
                variants={fadeInUp}
              >
                <Link
                  href="/"
                  className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <img
                    src={logoSrc}
                    alt="Wilderness Medicine Outfitters"
                    className="h-20 w-auto md:h-24 lg:h-28"
                  />
                </Link>
              </motion.div>
            ) : null}
          </motion.div>

          <motion.div
            className="relative z-10 w-full p-4 text-left md:p-8 lg:p-12"
            initial="hidden"
            animate="visible"
          >
            {tagline ? (
              <motion.p
                className="text-xs font-semibold uppercase tracking-widest text-white md:text-sm"
                custom={1}
                variants={fadeInUp}
              >
                {tagline}
              </motion.p>
            ) : null}

            <motion.h1
              className="mt-2 whitespace-nowrap text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
              custom={2}
              variants={fadeInUp}
            >
              {headline}
              {headlineLine2 ? (
                <>
                  <br />
                  {headlineLine2}
                </>
              ) : null}
            </motion.h1>

            {subheading ? (
              <motion.p
                className="mt-3 text-sm font-light leading-relaxed text-white/90 md:mt-4 md:text-base"
                custom={3}
                variants={fadeInUp}
              >
                {subheading}
              </motion.p>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
