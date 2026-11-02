/**
 * **CURSOR INFO**
 * SECTION TYPE: Centered intro with interactive three-card CTA grid
 * BEST FOR: Service highlights, practice areas, or featured offerings sections
 * VISUAL STYLE: Minimal, sharp, professional, and modern
 * LAYOUT: Centered eyebrow and title over a responsive three-card row
 * CONTENT ELEMENTS: Eyebrow text, title, card titles, background image with gradient overlay per card, hover overlay eyebrow, CTA label, card links
 * CONVERSION ROLE: Encourage exploration of key offerings and drive click-through actions
 * IDEAL POSITION: Mid page after credibility or overview sections
 * NOTES / MODIFIERS: Cards are fully clickable with hover overlay reveal and keyboard focus support
 */

import Image from "next/image";
import Link from "next/link";

type HoverCard = {
  title: string;
  overlayEyebrow: string;
  ctaLabel: string;
  href: string;
  /** Path under `public/` (defaults to placeholder). */
  imageSrc?: string;
  /** Use when the image adds meaning beyond the card title (otherwise leave unset for decorative backgrounds). */
  imageAlt?: string;
};

interface ThreeHoverCardsSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  cards?: [HoverCard, HoverCard, HoverCard];
}

const defaultCards: [HoverCard, HoverCard, HoverCard] = [
  {
    title: "Fire and explosion investigations",
    overlayEyebrow: "Residential through industrial",
    ctaLabel: "View services",
    href: "/services",
    imageSrc: "/images/luxury-property.png",
  },
  {
    title: "Case review and consulting",
    overlayEyebrow: "NFPA 921 and 1033",
    ctaLabel: "View services",
    href: "/services",
    imageSrc: "/images/luxury-interior.jpg",
  },
  {
    title: "Structure, Wildland & Vehicle Fire Investigations",
    overlayEyebrow: "Ignition and factors",
    ctaLabel: "View services",
    href: "/services",
    imageSrc: "/images/luxury-property-04.jpg",
  },
];

export const ThreeHoverCardsSection = ({
  id = "three-hover-cards",
  eyebrow = "Core expertise",
  title = "Investigations and consulting for carriers, counsel, and private clients",
  cards = defaultCards,
}: ThreeHoverCardsSectionProps) => {
  return (
    <section
      id={id}
      aria-label="Interactive cards section"
      className="bg-zinc-100 py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-600">
            {eyebrow}
          </p>
          <h2 className="text-2xl tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 lg:gap-12">
          {cards.map((card) => {
            const src = card.imageSrc ?? "/images/luxury-property.png";
            const alt = card.imageAlt ?? "";

            return (
              <Link
                key={card.title}
                href={card.href}
                aria-label={`${card.title} card link`}
                className="group relative min-h-64 overflow-hidden rounded-[3px] border border-gold-500 transition-all duration-300 hover:border-gold-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-[-15px_15px_0_0_var(--color-gold-500)] mt-5 md:mt-0 ms-5 md:ms-0"
              >
                <span className="absolute inset-0">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/10 to-black/10"
                  aria-hidden
                />
                <span
                  className="absolute inset-0 bg-gradient-to-br from-primary-950/25 to-transparent"
                  aria-hidden
                />

                <div className="relative z-10 flex min-h-64 items-center justify-center p-6">
                  <h3 className="text-center text-base font-semibold uppercase tracking-wide text-white drop-shadow-sm md:text-lg">
                    {card.title}
                  </h3>
                </div>

                <div className="absolute inset-0 z-20 flex translate-y-full flex-col items-center justify-center gap-4 bg-zinc-950/92 p-6 text-center opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-300 md:text-sm">
                    {card.overlayEyebrow}
                  </p>
                  <span className="inline-flex items-center justify-center rounded-[3px] bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 group-hover:bg-primary-600">
                    {card.ctaLabel}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
