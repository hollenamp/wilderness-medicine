"use client";

/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-bleed parallax background with three-column glass icon cards
 * BEST FOR: Landing pages, services page, value proposition
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Full-bleed parallax image with gradient, centered header, three glass cards with icons
 * CONTENT ELEMENTS: Eyebrow, two-line headline, intro copy, icon cards (title, description)
 * CONVERSION ROLE: Highlight services, build credibility
 * IDEAL POSITION: Middle of page, after hero or about
 * NOTES / MODIFIERS: Staggered animations; parallax + scroll blur/zoom on background after ~half out of view (Hero pattern)
 */

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Briefcase, ShieldCheck, UsersRound } from "lucide-react";
import { Parallax } from "@/components/UI/Parallax";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const BACKGROUND_IMAGE = {
  src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2000",
  alt: "Bright modern interior with clean lines and natural light",
} as const;

const SERVICE_COLUMNS: readonly { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: "Service one",
    body: "Replace this with a short description of your first core offering. Focus on the outcome clients receive and what makes your approach distinct.",
    Icon: Briefcase,
  },
  {
    title: "Service two",
    body: "Use this card for a second key service or benefit. Keep the copy concise, specific, and easy to scan on mobile and desktop.",
    Icon: UsersRound,
  },
  {
    title: "Service three",
    body: "Highlight a third pillar of your work here, such as quality standards, process, or ongoing support after the initial engagement.",
    Icon: ShieldCheck,
  },
];

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
    transition: { duration: 0.5, ease },
  },
};

const imageZoomVariants = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: { duration: 1.2, ease },
  },
};

export function FullBleedParallaxThreeColumnCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blurPx = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 12]);
  const filterValue = useTransform(blurPx, (v) => `blur(${v}px)`);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div id="services" className="scroll-mt-24 bg-secondary-950 text-white overflow-hidden">
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      >
        <div className="relative z-10 container mx-auto lg:px-12">
          <motion.div
            className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-300">
              What we offer
            </p>
            <h2 className="text-3xl font-normal uppercase tracking-tight sm:text-4xl md:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-zinc-200 md:text-xl">
              Replace this intro with a brief overview of your services and the value you deliver.
              Summarize who you serve and what clients can expect when they work with you.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-3 md:gap-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {SERVICE_COLUMNS.map((col) => {
              const Icon = col.Icon;
              return (
                <motion.div key={col.title} variants={item}>
                  <div className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-md md:p-8">
                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-primary-300 ring-1 ring-white/10"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-4 font-semibold uppercase text-base md:text-lg">
                      {col.title}
                    </h3>
                    <p className="text-base font-light leading-relaxed text-zinc-200 md:text-lg">
                      {col.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 opacity-35 md:opacity-40">
          <Parallax className="h-full w-full" speed={0.5}>
            <motion.div
              className="absolute inset-0 h-full w-full"
              variants={imageZoomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={{ filter: filterValue, scale: scrollScale }}
              >
                <Image
                  alt={BACKGROUND_IMAGE.alt}
                  src={BACKGROUND_IMAGE.src}
                  quality={75}
                  fill
                  sizes="(min-width: 1024px) 100vw, 100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  className="max-h-none min-h-full"
                />
              </motion.div>
            </motion.div>
          </Parallax>
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-secondary-950 via-secondary-950/60 to-secondary-950/10"
          aria-hidden
        />
      </section>
    </div>
  );
}
