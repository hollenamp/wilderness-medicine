'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Text-only intro block with headline, tagline, and body copy
 * BEST FOR: All pages, immediately after hero or before content
 * VISUAL STYLE: Modern, minimal, luxury, clean, text-focused
 * LAYOUT: Centered block; headline and tagline centered, body in centered max-width block (text left-aligned)
 * CONTENT ELEMENTS: Main headline (uppercase, thin), tagline (uppercase, thin), body paragraph
 * CONVERSION ROLE: Set credibility and context, or intro to page content
 * IDEAL POSITION: Directly after hero section
 * NOTES / MODIFIERS: No images or CTAs; optional scroll-in animation
 */

import { motion } from 'framer-motion';

const defaultHeadline = "Luxury Real Estate Expertise";
const defaultTagline = "Unparalleled Service, Exceptional Results";
const defaultBody =
  "We deliver world-class representation for buyers and sellers of fine homes. Our team combines deep market knowledge with a commitment to discretion, integrity, and the highest standards of service.";

type IntroSectionProps = {
  headline?: string;
  tagline?: string;
  body?: string;
};

export function SingleColumnContent({ headline = defaultHeadline, tagline = defaultTagline, body = defaultBody }: IntroSectionProps = {}) {
  return (
    <section className="bg-white py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-tight text-zinc-900 leading-tight">
            {headline}
          </h2>
          <p className="text-sm md:text-base font-light uppercase tracking-tight text-zinc-900">
            {tagline}
          </p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 md:mt-10 text-base md:text-lg font-normal text-zinc-700 leading-relaxed max-w-2xl mx-auto"
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}
