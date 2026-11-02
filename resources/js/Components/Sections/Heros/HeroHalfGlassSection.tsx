/**
 * **CURSOR INFO**
 * SECTION TYPE: Half-glass split hero — frosted left pane, sharp photo right, split headline
 * BEST FOR: Home page first impression with a cinematic landscape photo
 * VISUAL STYLE: Glassmorphism, editorial, high-contrast, cinematic
 * LAYOUT: Full-viewport blurred photo behind a rounded split card (glass left / sharp right)
 * CONTENT ELEMENTS: Logo, split headline with photo cutout, kicker, body copy, location pin, scroll cue
 * CONVERSION ROLE: First impression — set the wilderness tone and pull the visitor into the page
 * IDEAL POSITION: Top of the home page, under the fixed transparent Navigation
 * NOTES / MODIFIERS: Mix-blend cutout on the left word; Wilderness eases up and Medicine eases down on load; keep 50/50 split on mobile; reduced-transparency fallback; scroll-to-next-section; subheading parses a numbered list; photo crop is center-right so the sharp right pane keeps the subject in frame
 */

import { useRef } from 'react';
import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { DEFAULT_HERO_LOGO, resolveSiteLogoUrl } from '@/lib/siteConfig';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const defaultSubheading =
  'Wilderness Medicine Classes since 1967 — blended/online since 2004.';

const splitSubheadingList = (text: string): { intro: string; items: string[] } => {
  const match = /\s*1\.\s+/.exec(text);
  if (!match || match.index === undefined) {
    return { intro: text.trim(), items: [] };
  }

  const intro = text.slice(0, match.index).trim();
  const items = text
    .slice(match.index)
    .split(/\s*(?:\d+\.|or\s+\d+)\s+/i)
    .map((item) => item.replace(/^[;.]+\s*/, '').replace(/[;.]+$/, '').trim())
    .filter(Boolean);

  return { intro, items };
};

const HeroSubheading = ({ text }: { text: string }) => {
  const { intro, items } = splitSubheadingList(text);
  const copyClassName = 'mt-2 text-xs font-light leading-relaxed text-white/90 md:mt-3 md:text-sm lg:text-base';

  if (items.length === 0) {
    return (
      <p className={`${copyClassName} whitespace-pre-line`}>
        {intro}
      </p>
    );
  }

  return (
    <div className={copyClassName}>
      {intro ? <p className="whitespace-pre-line">{intro}</p> : null}
      <ol className="mt-2 list-decimal space-y-0.5 pl-4">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease },
  }),
};

const headlineTravel = '0.55em';
const headlineEnter = {
  duration: 1.1,
  ease,
};

interface HeroHalfGlassSectionProps {
  headlineLeft?: string;
  headlineRight?: string;
  headlineSub?: string;
  kicker?: string;
  subheading?: string;
  image?: string;
  imageAlt?: string;
  logo?: string;
  location?: string | null;
}

export function HeroHalfGlassSection({
  headlineLeft = 'Wilderness',
  headlineRight = 'Medicine',
  headlineSub = 'Outfitters',
  kicker = 'Since 1967',
  subheading = defaultSubheading,
  image = '/images/hero-04.webp',
  imageAlt = 'Wilderness medicine students practicing field skills',
  logo = DEFAULT_HERO_LOGO,
  location = null,
}: HeroHalfGlassSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const logoSrc = resolveSiteLogoUrl(logo, DEFAULT_HERO_LOGO);
  const prefersReducedMotion = useReducedMotion() === true;
  const accessibleTitle = [headlineLeft, headlineRight, headlineSub, kicker].filter(Boolean).join(' ');
  const wildernessFrom = prefersReducedMotion ? 0 : headlineTravel;
  const medicineFrom = prefersReducedMotion ? 0 : `-${headlineTravel}`;

  const handleScrollToNextSection = () => {
    const currentSection = sectionRef.current;
    if (!currentSection) {
      return;
    }

    const nextSection = currentSection.nextElementSibling as HTMLElement | null;
    if (!nextSection) {
      return;
    }

    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-right blur-sm brightness-[0.65]"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-charcoal-brown-950/25" aria-hidden />

      <div className="relative z-10 flex w-full flex-1 flex-col px-4 pt-24 md:px-8 md:pt-28 lg:px-12">
        <div className="relative min-h-112 w-full flex-1 overflow-hidden rounded-3xl border border-white/20 md:min-h-144 md:rounded-[2.5rem]">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-right"
          />

          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative isolate transform-gpu">
              <div
                className="absolute inset-0 bg-white/10 backdrop-blur-lg [@media(prefers-reduced-transparency:reduce)]:bg-charcoal-brown-900/80 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
                aria-hidden
              />
              <div className="absolute inset-0 flex items-center justify-end pr-3 md:pr-4 lg:pr-6" aria-hidden>
                <motion.span
                  className="inline-block mix-blend-destination-out text-[clamp(1.5rem,6.2vw,5.5rem)] font-bold leading-none tracking-tighter text-white"
                  initial={{ y: wildernessFrom }}
                  animate={{ y: 0 }}
                  transition={headlineEnter}
                >
                  {headlineLeft}
                </motion.span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-start pl-3 md:pl-4 lg:pl-6" aria-hidden>
                <span className="inline-block translate-y-3 md:translate-y-4 lg:translate-y-6">
                  <motion.span
                    className="inline-block text-[clamp(1.5rem,6.2vw,5.5rem)] font-bold leading-none tracking-tighter text-white"
                    initial={{ y: medicineFrom }}
                    animate={{ y: 0 }}
                    transition={headlineEnter}
                  >
                    {headlineRight}
                  </motion.span>
                </span>
              </div>
            </div>
          </div>

          {headlineSub ? (
            <div
              className="pointer-events-none absolute inset-x-0 top-[calc(50%+clamp(2.75rem,6.5vw,5.5rem))] flex items-center justify-center bg-transparent"
              aria-hidden
            >
              <span className="text-[clamp(1rem,2.3vw,1.5rem)] font-medium tracking-[0.55em] text-white">
                {headlineSub}
              </span>
            </div>
          ) : null}

          <h1 className="sr-only">{accessibleTitle}</h1>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial="hidden"
            animate="visible"
          >
            {logoSrc ? (
              <motion.div
                className="pointer-events-auto absolute inset-x-0 top-[calc(50%-clamp(2rem,5vw,4.25rem))] z-10 flex -translate-x-4 -translate-y-full items-center justify-center"
                custom={0}
                variants={fadeInUp}
              >
                <Link href="/" className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                  <img
                    src={logoSrc}
                    alt="Wilderness Medicine Outfitters"
                    className="h-28 w-auto md:h-40 lg:h-52"
                  />
                </Link>
              </motion.div>
            ) : null}

            <motion.div
              className="pointer-events-auto absolute bottom-0 left-0 max-w-[min(100%,28rem)] p-4 md:max-w-md md:p-8 lg:max-w-lg lg:p-12"
              custom={1}
              variants={fadeInUp}
            >
              {kicker ? (
                <p className="text-xs font-semibold uppercase tracking-widest text-white md:text-sm">
                  {kicker}
                </p>
              ) : null}
              {subheading ? (
                <HeroSubheading text={subheading} />
              ) : null}
            </motion.div>

            {location ? (
              <motion.p
                className="absolute bottom-16 right-4 flex max-w-[9rem] items-start gap-2 text-right text-xs font-medium text-white md:bottom-8 md:right-8 md:max-w-[11rem] md:text-sm lg:bottom-12 lg:right-12 lg:max-w-xs"
                custom={2}
                variants={fadeInUp}
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{location}</span>
              </motion.p>
            ) : null}
          </motion.div>
        </div>

        <div className="flex h-10 shrink-0 items-center justify-center md:h-12 lg:h-16">
          <motion.button
            type="button"
            aria-label="Scroll to next section"
            onClick={handleScrollToNextSection}
            className="flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUp}
          >
            <motion.span
              className="flex"
              animate={{ opacity: [0.4, 1, 0.4], y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-8 w-8 md:h-10 md:w-10" aria-hidden />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
