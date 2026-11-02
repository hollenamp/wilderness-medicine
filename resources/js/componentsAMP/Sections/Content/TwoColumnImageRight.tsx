'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: About with image
 * BEST FOR: Landing pages, About pages, brand story
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Two-column grid, copy left, image right
 * CONTENT ELEMENTS: Headline, body copy, CTA button, image
 * CONVERSION ROLE: Learn more about the business and/or owner
 * IDEAL POSITION: anywhere in a landing page, after intro in a about page
 * NOTES / MODIFIERS: Image zoom on scroll-in, responsive gradient background
 */

import Image from 'next/image';
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

export function TwoColumnImageRight() {
  return (
    <div id="about" className="md:bg-[linear-gradient(270deg,theme(colors.zinc.900)_33%,white_33%)] w-full overflow-hidden">
      <section className="container mx-auto py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-tight text-zinc-900 leading-tight">
              Join Our<br />
              Excellence
            </h2>
            <p className="text-base md:text-xl font-light leading-relaxed text-zinc-900">
              Want to join our team of world-class luxury real estate professionals? 
              We&rsquo;re expanding in markets across the country and would love to hear from you.
            </p>
            <Button variant="primary">
              <span>View Opportunities</span>
              <ArrowRight size={20} />
            </Button>
          </div>
          
          <div className="relative h-96 w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              variants={imageZoomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                alt="Luxury property"
                src="/images/luxury-property-02.jpg"
                quality={75}
                fill
                priority
                sizes="2000"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'right center',
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
