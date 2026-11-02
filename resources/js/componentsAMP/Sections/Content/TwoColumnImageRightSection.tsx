'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Two-column copy with right image
 * BEST FOR: Landing pages, About pages, brand story
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Two-column grid, copy left, image right
 * CONTENT ELEMENTS: Headline, body copy, CTA button, image
 * CONVERSION ROLE: Learn more about the business and/or owner
 * IDEAL POSITION: anywhere in a landing page, after intro in a about page
 * NOTES / MODIFIERS: Image zoom on scroll-in, responsive gradient background
 */

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { ArrowRight } from 'lucide-react';

const imageZoomVariants = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export type TwoColumnImageRightSectionProps = {
  headingLine1?: string;
  headingLine2?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function TwoColumnImageRightSection({
  headingLine1 = "Meet Captain",
  headingLine2 = "Eric Gonzalez",
  body = "Eric started deckhanding at fourteen and has spent the years since building time on Galveston Bay, the jetties, and nearshore waters. Island Adventure Charters keeps trips calm, organized, and focused on teaching as much as catching, so families, beginners, and seasoned anglers all feel at home on a thirty-foot boat built for full days on the water.",
  imageSrc = "/images/meet-captain-eric-gonzalez-01.webp",
  imageAlt = "Captain at the helm scanning the bay during a Galveston charter",
}: TwoColumnImageRightSectionProps) {
  return (
    <div
      id="captain"
      className="scroll-mt-24 md:bg-[linear-gradient(270deg,theme(colors.secondary.950)_33%,theme(colors.floral.50)_33%)] w-full overflow-hidden"
    >
      <section className="container mx-auto py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <header>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-secondary-500">
                Your captain
              </p>
              <h2 className="text-3xl font-normal uppercase tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
                {headingLine1}
                <br />
                {headingLine2}
              </h2>
            </header>
            <p className="text-base font-light leading-relaxed text-zinc-900 md:text-xl">
              {body}
            </p>
            <Button variant="secondary" asChild>
              <Link href="#contact">
                <span>Book a Trip</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
          
          <div className="relative h-64 sm:h-96 w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              variants={imageZoomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                alt={imageAlt}
                src={imageSrc}
                quality={75}
                fill
                priority
                sizes="2000"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center center',
                }}
                className="bg-top max-h-[100vh]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
