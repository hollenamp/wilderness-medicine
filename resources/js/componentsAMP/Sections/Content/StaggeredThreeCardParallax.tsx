/**
 * **CURSOR INFO**
 * SECTION TYPE: Intro copy with parallax image and staggered three-card services overlay
 * BEST FOR: Home pages that need to highlight three key services after hero
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Centered intro text followed by parallax image container with overlaid staggered three-card grid
 * CONTENT ELEMENTS: Eyebrow text, section heading, supporting copy, parallax background image, three service cards with icons
 * CONVERSION ROLE: Reinforce trust and value immediately after first impression
 * IDEAL POSITION: Directly below the main hero section
 * NOTES / MODIFIERS: Uses existing hero background image, first and third cards offset lower, center card offset higher
 */

import Image from 'next/image';
import { Building2, Handshake, Search } from 'lucide-react';
import { Parallax } from '@/components/UI/Parallax';

const serviceCards = [
  {
    title: 'Buyer support across Oregon',
    description:
      'Thoughtful guidance for buyers, from understanding your goals to touring homes and writing strong offers.',
    icon: Search,
    staggerClass: 'md:translate-y-8 lg:translate-y-12',
  },
  {
    title: 'Listing and sale preparation',
    description:
      'Clear recommendations on pricing, presentation, and timing so your home is ready for the market with confidence.',
    icon: Building2,
    staggerClass: 'md:-translate-y-4 lg:-translate-y-8',
  },
  {
    title: 'From first call to closing',
    description:
      'Steady coordination with you, the other side, and your brokerage so each milestone stays organized and on track.',
    icon: Handshake,
    staggerClass: 'md:translate-y-8 lg:translate-y-12',
  },
] as const;

export function StaggeredThreeCardParallax() {
  return (
    <section
      aria-labelledby="three-card-banner-heading"
      className="bg-white py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm md:text-base uppercase tracking-[0.18em] text-primary-600">
            Why clients choose Theresa
          </p>
          <h2
            id="three-card-banner-heading"
            className="mt-3 text-2xl md:text-3xl lg:text-4xl tracking-tight text-zinc-900 uppercase"
          >
            Clear, personal service at every step of your move
          </h2>
          <p className="mt-4 text-base md:text-lg text-zinc-700 leading-relaxed">
            You&apos;ll work directly with Theresa for a high-touch experience that keeps you informed, prepared, and confident.
          </p>
        </div>

        <div className="relative mt-8 md:mt-12 lg:mt-16">
          <div className="relative h-[280px] md:h-[360px] lg:h-[440px] overflow-hidden rounded-3xl">
            <Parallax className="absolute inset-0" speed={0.35}>
              <Image
                alt="Modern luxury home exterior at sunset"
                src="/images/luxury-property-04.jpg"
                fill
                quality={75}
                sizes="100vw"
                className="object-cover object-center"
                priority={false}
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/75" />
          </div>

          <div className="relative z-10 -mt-16 px-4 md:-mt-24 md:px-8 lg:-mt-28 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
              {serviceCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className={`rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-xl p-6 md:p-8 transition-transform duration-300 ${card.staggerClass}`}
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary-700 text-white">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight uppercase">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-zinc-700">
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
