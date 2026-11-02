/**
 * **CURSOR INFO**
 * SECTION TYPE: Services overview with cards and imagery
 * BEST FOR: Landing pages, services page, value proposition
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Section header, then grid of service cards with images
 * CONTENT ELEMENTS: Headline, intro copy, service cards (icon/image, title, description)
 * CONVERSION ROLE: Highlight services, build credibility
 * IDEAL POSITION: Middle of page, after hero or about
 * NOTES / MODIFIERS: Staggered animations, parallax on images
 */

import { motion } from "framer-motion";

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

const defaultServices = [
  {
    title: "Wilderness First Aid (Standard)",
    description:
      "16 hours in person, or blended with 4 online lessons plus hands-on skills.",
  },
  {
    title: "Wilderness First Responder / WEMT",
    description:
      "9 days in person, evening format over 6 weeks, or blended online lessons with a concentrated skills session.",
  },
  {
    title: "Medical Supplies & Outdoor Skills",
    description:
      "Wholesale kits and hard-to-find items, plus Survival, Shelter & Fire, Map & Compass, and more.",
  },
];

interface ServiceItem {
  title: string;
  description: string;
}

interface ServicesOverviewProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  items?: ServiceItem[];
}

export function ServicesOverview({
  eyebrow = "Courses & offerings",
  heading = "Wilderness First Aid through Advanced Life Support",
  intro = "From standard Wilderness First Aid to Wilderness First Responder, WEMT modules, and advanced courses — plus medical supplies and outdoor skills training.",
  items = defaultServices,
}: ServicesOverviewProps = {}) {
  return (
    <div id="features" className="overflow-hidden bg-charcoal-brown-950 py-8 text-white md:py-16 lg:py-24">
      <section className="flex flex-col gap-16">
        <div className="border-b border-white/20 py-8">
          <motion.div
            className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-tea-green-400">
              {eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-normal uppercase tracking-tight sm:text-4xl md:text-5xl">
              {heading}
            </h2>
            <p className="max-w-3xl text-base font-light leading-relaxed md:text-xl">
              {intro}
            </p>
          </motion.div>
        </div>

        <div className="py-8">
          <motion.div
            className="mx-auto max-w-7xl mb-16 grid grid-cols-1 gap-4 px-4 md:grid-cols-2 md:gap-8 md:px-8 lg:grid-cols-3 lg:gap-12 lg:px-12"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {items.map((service) => (
              <motion.div
                key={service.title}
                variants={item}
                className="border border-tea-green-500/25 bg-charcoal-brown-950/60 p-6 md:p-8"
              >
                <h3 className="mb-4 text-2xl uppercase tracking-wide md:text-3xl">{service.title}</h3>
                <p className="text-base font-light leading-relaxed md:text-xl">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-forest-green-400 px-6 py-3 text-sm font-medium uppercase tracking-wide text-tea-green-100 transition-colors duration-300 hover:bg-forest-green-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-brown-950"
            aria-label="Explore wilderness medicine courses"
          >
            View all courses
          </a>
        </motion.div>
      </section>
    </div>
  );
}
