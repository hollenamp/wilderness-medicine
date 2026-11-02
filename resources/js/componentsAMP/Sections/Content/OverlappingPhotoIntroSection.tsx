/**
 * **CURSOR INFO**
 * SECTION TYPE: Overlapping split intro with card and full-height photography
 * BEST FOR: Home or landing pages after a hero, charter or lifestyle brands
 * VISUAL STYLE: Minimal, editorial, high contrast on a deep cool background
 * LAYOUT: Twelve-column grid with left white card overlapping a right column image
 * CONTENT ELEMENTS: Heading with accent rule, inset photo, body copy, italic supporting line
 * CONVERSION ROLE: Deepen the story after the hero and set expectations before services
 * IDEAL POSITION: Immediately below the hero
 * NOTES / MODIFIERS: Server component with client Parallax on side image, responsive stack, semantic section
 */

import Image from 'next/image';
import { Parallax } from '@/components/UI/Parallax';

const CARD_IMAGE = {
  src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  alt: 'Team collaborating around a table in a bright workspace',
} as const;

const SIDE_IMAGE = {
  src: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600',
  alt: 'Modern home exterior with clean architectural lines',
} as const;

export function OverlappingPhotoIntroSection() {
  return (
    <section
      id="intro"
      className="scroll-mt-24 relative bg-secondary-950 text-zinc-900 py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      aria-labelledby="overlapping-intro-heading"
    >
      <div className="container mx-auto">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-1 gap-8 lg:gap-0 lg:items-stretch lg:min-h-[min(70vh,40rem)]">
          {/* Right column: sits under the card on large screens */}
          <div className="relative order-2 lg:order-0 lg:col-span-7 lg:col-start-6 lg:row-start-1 z-0 h-80 sm:h-72 lg:h-full rounded-sm lg:rounded-none overflow-hidden shadow-lg lg:shadow-none">
            <Parallax className="absolute inset-0" speed={0.45}>
              <div className="absolute inset-0">
                <Image
                  src={SIDE_IMAGE.src}
                  alt={SIDE_IMAGE.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[75%_center] lg:object-[80%_center]"
                  priority={false}
                />
              </div>
            </Parallax>
          </div>

          {/* Left column: white card with photo + copy, overlaps the right image */}
          <div className="relative py-8 md:py-16 lg:py-24 order-1 lg:order-0 lg:col-span-7 lg:col-start-1 lg:row-start-1 z-10 lg:self-center">
            <article className="bg-floral-50 shadow-2xl shadow-black/25 px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
              <header className="mb-6 md:mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-600">
                  About us
                </p>
                <h2
                  id="overlapping-intro-heading"
                  className="text-3xl font-normal uppercase tracking-tight text-zinc-900 sm:text-4xl md:text-5xl"
                >
                  Your Story Starts Here
                </h2>
              </header>

              <div className="relative mb-6 md:mb-8 aspect-4/2 w-full overflow-hidden bg-zinc-100">
                <Image
                  src={CARD_IMAGE.src}
                  alt={CARD_IMAGE.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[35%_center]"
                />
              </div>

              <div className="space-y-4 text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                <p>
                  Replace this paragraph with a concise introduction to your business, what you
                  offer, and why clients choose you. Keep the tone clear, confident, and easy to
                  scan.
                </p>
                <p className="italic text-zinc-700">
                  Add a supporting detail here, such as credentials, service area, or what clients
                  can expect when they get started.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
