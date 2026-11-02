/**
 * **CURSOR INFO**
 * SECTION TYPE: Asymmetric two-column imagery with taglines and inline links
 * BEST FOR: Portfolio highlights, service pairings, and editorial project storytelling
 * VISUAL STYLE: Modern, minimal, professional, and editorial
 * LAYOUT: Left single image stack; right column ~10% wider with two stacked image blocks; link anchored beside copy
 * CONTENT ELEMENTS: Three image figures, taglines, small titles, short descriptions, and icon links (accessible labels)
 * CONVERSION ROLE: Showcase work and nudge users toward detail pages or contact
 * IDEAL POSITION: Mid-page after intro or gallery sections
 * NOTES / MODIFIERS: Responsive stack; right column uses CSS grid `1fr 1.1fr` ratio; icon link uses absolute positioning with reserved padding; optional props override header and CTA target (same pattern as IntroSection)
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Images } from 'lucide-react';
import { IconDivider } from '@/components/UI/IconDivider';

const defaultHeading = 'Selected work. Construction at a Higher Standard';
const defaultSubheading =
  'From premium execution to complex reconstruction, each project reflects planning discipline and finish quality.';

type TwoColumnImagesProps = {
  dividerTagline?: string;
  heading?: string;
  subheading?: string;
};

export function TwoColumnImages({
  heading = defaultHeading,
  subheading = defaultSubheading,
}: TwoColumnImagesProps = {}) {
  const iconLinkClassName =
    'absolute right-0 top-4 md:top-5 inline-flex size-11 items-center justify-center  border border-zinc-200 bg-primary-500 text-zinc-100 shadow-sm transition-colors hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 md:size-14';

  return (
    <section
      className="bg-white py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      aria-labelledby="two-column-images-heading"
    >
      <div className="container mx-auto max-w-[1280px]">
        <IconDivider
          icon={<Images className="h-15 w-15 p-2" strokeWidth={0.8} />}
          tagline="Project Galleries"
          variant="primary"
        />
        <h2
          id="two-column-images-heading"
          className="text-3xl font-medium capitalize leading-tight tracking-tight text-zinc-900 md:text-4xl lg:text-5xl pt-8 md:pt-12"
        >
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-sm font-medium uppercase tracking-wide text-zinc-600 md:text-base">
          {subheading}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:items-start">
          <div>
            <article className="flex flex-col">
              <div className="relative md:aspect-[4/5] min-h-[280px] w-full overflow-hidden rounded-[3px] shadow-sm md:aspect-[3/4] md:min-h-[360px]">
                <Image
                  src="/images/luxury-bedroom.jpg"
                  alt="Completed residential exterior at dusk"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
              <div className="relative pt-4 pr-14 md:pt-5 md:pr-16">
                <Link
                  href="/services/renovations"
                  aria-label="Discuss scope"
                  className={iconLinkClassName}
                >
                  <ArrowRight className="size-5 md:size-[1.375rem]" strokeWidth={1.25} aria-hidden />
                </Link>
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-600 md:text-base">
                  Renovations
                </p>
                <h3 className="mt-2 text-lg font-medium capitalize leading-tight tracking-tight text-zinc-900 md:text-xl">
                  Renovation and restoration, fully coordinated
                </h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-700 md:text-lg">
                  Existing-condition review, phased construction, and detail-focused execution for high-quality outcomes.
                </p>
              </div>
            </article>
          </div>

          <div className="flex flex-col gap-10 md:gap-12">
            <article className="flex flex-col">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[3px] shadow-sm md:aspect-[5/4]">
                <Image
                  src="/images/luxury-home.jpg"
                  alt="Interior millwork and lighting detail"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
              <div className="relative pt-4 pr-14 md:pt-5 md:pr-16">
                <Link
                  href="/services/adu"
                  aria-label="See approach"
                  className={iconLinkClassName}
                >
                  <ArrowRight className="size-5 md:size-[1.375rem]" strokeWidth={1.25} aria-hidden />
                </Link>
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-600 md:text-base">
                  ADU
                </p>
                <h3 className="mt-2 text-lg font-medium capitalize leading-tight tracking-tight text-zinc-900 md:text-xl">
                  ADUs built for flexibility and value
                </h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-700 md:text-lg">
                  From zoning and planning to construction and closeout, ADUs are delivered as practical long-term assets.
                </p>
              </div>
            </article>

            <article className="flex flex-col">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[3px] shadow-sm md:aspect-[5/4]">
                <Image
                  src="/images/luxury-property-03.jpg"
                  alt="Commercial-scale structural progress"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
              <div className="relative pt-4 pr-14 md:pt-5 md:pr-16">
                <Link
                  href="/services/cusom-home-building"
                  aria-label="View timeline"
                  className={iconLinkClassName}
                >
                  <ArrowRight className="size-5 md:size-[1.375rem]" strokeWidth={1.25} aria-hidden />
                </Link>
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-600 md:text-base">
                  Custom Home
                </p>
                <h3 className="mt-2 text-lg font-medium capitalize leading-tight tracking-tight text-zinc-900 md:text-xl">
                  Custom homes with premium execution
                </h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-700 md:text-lg">
                  Structure, systems, and finishes are coordinated under one accountable process from first decisions to final handoff.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
