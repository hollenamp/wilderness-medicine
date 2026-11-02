"use client";

/**
 * **CURSOR INFO**
 * SECTION TYPE: Services overview with cards and imagery
 * BEST FOR: Landing pages, services page, value proposition
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Section header, followed by grid of service cards descriptions, followed by a parallax image
 * CONTENT ELEMENTS: Headline, intro copy, service cards (icon/image, title, description)
 * CONVERSION ROLE: Highlight services, build credibility
 * IDEAL POSITION: Middle of page, after hero or about
 * NOTES / MODIFIERS: Staggered animations, parallax on images
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { Parallax } from '@/components/UI/Parallax';

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const imageZoomVariants = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function ThreeColumnCardsParallax() {
  return (
    <div id="services" className="bg-zinc-900 text-white overflow-hidden">
      <section className="container mx-auto py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-tight mb-6">
            Your trusted<br />
            luxury partner
          </h2>
          <p className="text-base md:text-xl font-light leading-relaxed max-w-2xl">
            Our mission is clear. To provide unparalleled service in luxury real estate, 
            helping you discover, acquire, and sell the most exceptional properties.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-16 mb-16"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={item}>
            <h3 className="text-2xl md:text-3xl uppercase tracking-wide mb-4">Market Expertise</h3>
            <p className="text-base md:text-xl font-light leading-relaxed">
              With deep knowledge of luxury markets worldwide, we provide 
              insights that help you make informed decisions on premium properties.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-2xl md:text-3xl uppercase tracking-wide mb-4">Exclusive Access</h3>
            <p className="text-base md:text-xl font-light leading-relaxed">
              Gain access to off-market properties and exclusive listings 
              that aren&rsquo;t available to the general public.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-2xl md:text-3xl uppercase tracking-wide mb-4">Concierge Service</h3>
            <p className="text-base md:text-xl font-light leading-relaxed">
              From property tours to closing support, our comprehensive 
              concierge service ensures a seamless luxury experience.
            </p>
          </motion.div>
        </motion.div>

        {/* Luxury Property Image */}
        <div className="mt-16 h-[250px] sm:h-[400px] md:h-[600px] w-full relative overflow-hidden">
          <Parallax className="absolute inset-0" speed={0.5}>
            <motion.div
              className="absolute inset-0"
              variants={imageZoomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                alt="Luxury Property"
                src="/images/luxury-property-04.jpg"
                quality={75}
                fill
                priority
                sizes="2000"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="max-h-[100vh]"
              />
            </motion.div>
          </Parallax>
        </div>
      </section>  
    </div>
  );
}
