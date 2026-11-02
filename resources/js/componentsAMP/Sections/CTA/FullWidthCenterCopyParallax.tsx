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

type CTASectionProps = {
  phone: string;
};

export function FullWidthCenterCopyParallax({ phone }: CTASectionProps) {
  return (
    <div className='bg-zinc-900 text-white'>
      <section className="py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12 overflow-hidden relative">
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 text-zinc-100">
                Let&apos;s discuss your luxury real estate goals. Whether you&apos;re buying, 
                selling, or investing, I&apos;m here to guide you through every step of the process.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <Button asChild variant="primary">
                <a href={`tel:${phone}`}>
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
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-zinc-300 mb-4">Or scroll down for more ways to connect</p>
              <div className="animate-bounce">
                <ArrowDown size={24} className="mx-auto text-gold-500" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-30">
          <Parallax className="h-full w-full" speed={0.5}>
            <Image
              alt="Luxury home"
              src="/images/luxury-home.jpg"
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
          </Parallax>
        </div>
        <div className="absolute inset-0 bg-zinc-900/50" />
      </section>
    </div>
  );
}
