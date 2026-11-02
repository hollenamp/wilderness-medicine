"use client";

/**
 * **CURSOR INFO**
 * SECTION TYPE: Call-to-action block with primary CTAs
 * BEST FOR: Landing pages before contact or footer, sub pages after content or before footer, not ideal for contact pages
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Full-width section, centered headline and copy, button row
 * CONTENT ELEMENTS: Headline, supporting copy, Call Now and Send Message buttons, optional parallax bg
 * CONVERSION ROLE: Drive call or contact form visit
 * IDEAL POSITION: Before footer or before contact section
 * NOTES / MODIFIERS: Parallax background, scroll-in animation
 */

import { Phone, Mail, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { Parallax } from '@/components/UI/Parallax';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function ThreeColumnStaggered() {
  return (
    <div className="bg-secondary-900 text-white">
      <section className="py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,2fr)_1fr] gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Left image column */}
            <div className="hidden lg:block">
              <div className="relative aspect-[3/5] overflow-hidden rounded-3xl -translate-y-6 lg:-translate-y-10">
                <Parallax className="absolute inset-0" speed={0.4}>
                  <Image
                    alt="Luxury real estate property with modern exterior design"
                    src="/images/luxury-property-02.jpg"
                    quality={75}
                    fill
                    sizes="900px"
                    className="object-cover object-center"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-zinc-900/10 to-transparent" />
              </div>
            </div>

            {/* Center CTA content */}
            <div className="relative z-10">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide mb-6 text-primary-500">
                    Ready to talk real estate?
                  </h2>
                  <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 text-zinc-100">
                    Let&apos;s discuss your plans with Theresa at Vantage Point Brokers. Whether you&apos;re buying or
                    selling in Oregon, you&apos;ll have a committed partner guiding you through every step.
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.15, ease }}
                >
                  <Button asChild variant="primary">
                    <a href="tel:+17027874385">
                      <Phone size={20} />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild variant="primaryOutline">
                    <a href="#contact">
                      <Mail size={20} />
                      Send Message
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-zinc-300 mb-4">
                    Or scroll down for more ways to connect
                  </p>
                  <div className="animate-bounce">
                    <ArrowDown size={24} className="mx-auto text-primary-300" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right image column */}
            <div className="hidden lg:block">
              <div className="relative aspect-[3/5] overflow-hidden rounded-3xl translate-y-6 lg:translate-y-10">
                <Parallax className="absolute inset-0" speed={0.4}>
                  <Image
                    alt="Luxury real estate property with modern exterior design"
                    src="/images/luxury-property-02.jpg"
                    quality={75}
                    fill
                    sizes="600px"
                    className="object-cover object-center"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
