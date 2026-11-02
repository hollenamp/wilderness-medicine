'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Trip or package cards with published starting rates
 * BEST FOR: Home and landing pages that showcase bookable packages or service tiers
 * VISUAL STYLE: Luxury marina card layout, clean sans headlines, muted slate details
 * LAYOUT: Section heading, responsive card grid (1–3 columns)
 * CONTENT ELEMENTS: Trip image, price badge, title, spec line, two-column footer, CTA to #contact
 * CONVERSION ROLE: Compare options at a glance and move visitors into the contact form
 * IDEAL POSITION: After services or intro, before deeper editorial sections
 * NOTES / MODIFIERS: Motion on scroll; replace trip data and images with live offerings
 */

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Anchor, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/UI/Button';

type TripCardData = {
  title: string;
  price: number;
  specLine: string;
  footerLeft: string;
  footerRight: string;
  imageSrc: string;
  imageAlt: string;
};

const TRIPS: TripCardData[] = [
  {
    title: 'Starter Package',
    price: 299,
    specLine: '2 HR / FLEXIBLE / INTRO LEVEL',
    footerLeft: 'DURATION: 2 HOURS',
    footerRight: 'LEVEL: BEGINNER',
    imageSrc:
      'https://images.pexels.com/photos/1235719/pexels-photo-1235719.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Calm ocean horizon at sunrise',
  },
  {
    title: 'Standard Package',
    price: 495,
    specLine: '4 HR / MORNING / FULL EXPERIENCE',
    footerLeft: 'DURATION: 4 HOURS',
    footerRight: 'WINDOW: MORNING',
    imageSrc:
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Boat on open water during daylight',
  },
  {
    title: 'Premium Package',
    price: 750,
    specLine: '6 HR / AFTERNOON / EXTENDED',
    footerLeft: 'DURATION: 6 HOURS',
    footerRight: 'WINDOW: AFTERNOON',
    imageSrc:
      'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Boat cutting across blue water',
  },
];

const cardMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

function TripCard({ trip, index }: { trip: TripCardData; index: number }) {
  return (
    <motion.article
      custom={index}
      variants={cardMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col overflow-hidden bg-floral-50 shadow-md "
    >
      <div className="group relative aspect-16/11 w-full shrink-0 overflow-hidden">
        <Image
          src={trip.imageSrc}
          alt={trip.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="pointer-events-none absolute right-3 top-3 z-10 bg-floral-50 px-4 py-3 text-center font-sans shadow-md sm:right-4 sm:top-4">
          <p className="text-2xl font-semibold tabular-nums leading-none tracking-tight text-secondary-900">
            ${trip.price.toLocaleString('en-US')}
          </p>
          <div className="mx-auto my-2 h-px w-12 bg-secondary-200" aria-hidden />
          <p className="text-[0.65rem] font-sans font-medium uppercase tracking-[0.2em] text-secondary-500">
            Starting at
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-4 pt-6 sm:px-6">
        <h3 className="text-center text-lg font-semibold leading-snug tracking-tight text-secondary-950 sm:text-xl">
          {trip.title}
        </h3>
        <p className="mt-3 text-center text-[0.7rem] font-sans font-medium uppercase leading-relaxed tracking-[0.14em] text-secondary-700">
          {trip.specLine}
        </p>

        <div className="mt-6 border-t border-secondary-200/80" />

        <div className="grid min-h-17 grid-cols-2 divide-x divide-secondary-200/80">
          <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-4 text-center">
            <Clock className="h-4 w-4 text-secondary-400" strokeWidth={1.5} aria-hidden />
            <span className="text-[0.65rem] font-sans font-medium uppercase leading-tight tracking-wide text-secondary-400">
              {trip.footerLeft}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-4 text-center">
            <Anchor className="h-4 w-4 text-secondary-400" strokeWidth={1.5} aria-hidden />
            <span className="text-[0.65rem] font-sans font-medium uppercase leading-tight tracking-wide text-secondary-400">
              {trip.footerRight}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Button variant="secondary" size="sm" className="w-full" asChild>
            <Link href="#contact">
              Get Started
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function CharterTripsRatesSection() {
  return (
    <section
      id="trips"
      aria-labelledby="charter-trips-heading"
      className="scroll-mt-24 bg-floral-50 px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-secondary-500">
            Our packages
          </p>
          <h2
            id="charter-trips-heading"
            className="text-3xl font-normal uppercase tracking-tight text-secondary-950 sm:text-4xl md:text-5xl"
          >
            Plans and Pricing
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-secondary-800 md:text-xl">
            Replace this section with your real packages, trip lengths, and starting rates. Final
            price and availability can be confirmed when visitors submit an inquiry.
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-secondary-600 md:text-base">
            Choose the option that fits your needs. We will confirm current availability and details
            when you get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {TRIPS.map((trip, index) => (
            <TripCard key={trip.title} trip={trip} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
