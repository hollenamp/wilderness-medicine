/**
 * **CURSOR INFO**
 * SECTION TYPE: Overlapping split about with card and full-height photography (mirrored layout)
 * BEST FOR: Home or landing pages after services or mid-page company story
 * VISUAL STYLE: Minimal, editorial, high contrast on a deep cool background (matches intro section)
 * LAYOUT: Twelve-column grid with right white card overlapping a left column image
 * CONTENT ELEMENTS: Heading with accent rule, inset photo, body copy, italic supporting line
 * CONVERSION ROLE: Establish trust and brand depth before testimonials or deeper bios
 * IDEAL POSITION: After services or rates, before testimonials or captain story
 * NOTES / MODIFIERS: Server component with client Parallax on side image, responsive stack, semantic section
 */

import Image from 'next/image';
import { Parallax } from '@/components/UI/Parallax';
import type { SiteConfig } from '@/lib/siteConfig';

export type OverlappingPhotoAboutSectionProps = {
  siteConfig: SiteConfig;
  /** Small uppercase label above the heading */
  eyebrow?: string;
  /** Main heading above the accent rule */
  heading?: string;
  /** Primary paragraph */
  lead?: string;
  /** Smaller italic line (differentiators or logistics) */
  italicNote?: string;
  /** In-card feature image */
  cardImageSrc?: string;
  cardImageAlt?: string;
  /** Left column background image */
  sideImageSrc?: string;
  sideImageAlt?: string;
};

export function OverlappingPhotoAboutSection({
  siteConfig,
  eyebrow,
  heading = 'About Island Adventure Charters',
  lead,
  italicNote,
  cardImageSrc = '/images/about-01.webp',
  cardImageAlt = 'Charter boat on Galveston Bay',
  sideImageSrc = '/images/about-03.webp',
  sideImageAlt = 'Open water and sky along the Texas coast',
}: OverlappingPhotoAboutSectionProps) {
  const resolvedEyebrow = eyebrow ?? 'About the captain';
  const resolvedLead =
    lead ??
    `${siteConfig.site} is a Galveston fishing charter built around patient instruction and local knowledge. Trips stay hands-on and kid-friendly, with species and techniques matched to the day's conditions and your crew's experience, from first casts to full days on the bay, jetties, and nearshore waters.`;
  const resolvedItalic =
    italicNote ??
    'You fish from a thirty-foot boat with an onboard toilet and a trolling motor, set up for comfortable family and beginner-friendly outings.';

  return (
    <section
      id="about"
      className="scroll-mt-24 relative bg-secondary-950 text-zinc-900 py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      aria-labelledby="overlapping-about-heading"
    >
      <div className="container mx-auto">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-1 gap-8 lg:gap-0 lg:items-stretch lg:min-h-[min(70vh,40rem)]">
          {/* Left column: full-height image (mirrored from intro) */}
          <div className="relative order-2 lg:order-0 lg:col-span-7 lg:col-start-1 lg:row-start-1 z-0 h-56 sm:h-72 lg:h-full rounded-sm lg:rounded-none overflow-hidden shadow-lg lg:shadow-none">
            <Parallax className="absolute inset-0" speed={0.45}>
              <div className="absolute inset-0">
                <Image
                  src={sideImageSrc}
                  alt={sideImageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[25%_center] lg:object-[20%_center]"
                  priority={false}
                />
              </div>
            </Parallax>
          </div>

          {/* Right column: white card overlaps the left image */}
          <div className="relative py-8 md:py-16 lg:py-24 order-1 lg:order-0 lg:col-span-7 lg:col-start-6 lg:row-start-1 z-10 lg:self-center">
            <article className="bg-floral-50 shadow-2xl shadow-black/25 px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
              <header className="mb-6 md:mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-600">
                  {resolvedEyebrow}
                </p>
                <h2
                  id="overlapping-about-heading"
                  className="text-3xl font-normal uppercase tracking-tight text-zinc-900 sm:text-4xl md:text-5xl"
                >
                  {heading}
                </h2>
              </header>

              <div className="relative mb-6 md:mb-8 aspect-4/2 w-full overflow-hidden bg-zinc-100">
                <Image
                  src={cardImageSrc}
                  alt={cardImageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[65%_center]"
                />
              </div>

              <div className="space-y-4 text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                <p>{resolvedLead}</p>
                <p className="italic text-zinc-700">{resolvedItalic}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
