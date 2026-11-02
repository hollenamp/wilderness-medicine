/**
 * **CURSOR INFO**
 * SECTION TYPE: Call-to-action block with primary CTAs
 * BEST FOR: Landing pages before contact or footer, sub pages after content or before footer, not ideal for contact pages
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Full-width section, centered headline and copy, button row
 * CONTENT ELEMENTS: Headline, supporting copy, primary and secondary CTA buttons, optional parallax bg
 * CONVERSION ROLE: Drive sign-ups or contact form visits
 * IDEAL POSITION: Before footer or before contact section
 * NOTES / MODIFIERS: Parallax background, scroll-in animation
 */

import { Download, Mail, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../UI/Button';
import { Parallax } from '../UI/Parallax';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface CTASectionProps {
  heading?: string;
  body?: string;
  scrollHint?: string;
}

export function CTASection({
  heading = 'Ready to train with the oldest program in the field?',
  body = 'Call (303) 688-5176 — best time to reach Carl is 9:00–10:00 am MT — or email carl@wildernessmedicine.com to schedule a class.',
  scrollHint = 'Prefer to talk it through? Reach out below',
}: CTASectionProps = {}) {
  return (
    <div className='bg-charcoal-brown-900 text-white'>
      <section className="relative overflow-hidden py-8 md:py-16 lg:py-24">

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
                {heading}
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 text-zinc-100">
                {body}
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
                <a href="/contact-us">
                  <Download size={20} />
                  Contact Us
                </a>
              </Button>
              <Button
                asChild
                variant="primaryOutline"
                className="border-tea-green-300 text-tea-green-100 hover:border-tea-green-200 hover:bg-forest-green-600/25 hover:text-white"
              >
                <a href="/contact-us">
                  <Mail size={20} />
                  Ask a Question
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
              <p className="text-zinc-300 mb-4">{scrollHint}</p>
              <div className="animate-bounce">
                <ArrowDown size={24} className="mx-auto text-tea-green-400" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-30">
          <Parallax className="h-full w-full" speed={0.5}>
            <img
              alt=""
              src="/images/hero-bg.jpg"
              sizes="2000"
              style={{
                objectFit: 'cover',
                objectPosition: 'right center',
              }}
              className="w-full h-full inset-0 absolute bg-top max-h-[100vh]"
            />
          </Parallax>
        </div>
        <div className="absolute inset-0 bg-zinc-900/50" />
      </section>
    </div>
  );
}
