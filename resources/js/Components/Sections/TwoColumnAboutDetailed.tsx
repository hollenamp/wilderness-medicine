/**
 * **CURSOR INFO**
 * SECTION TYPE: Detailed two-column about with trust signals and credential grid
 * BEST FOR: About pages, team/story pages needing depth beyond a short intro
 * VISUAL STYLE: Modern, minimal, professional, clean
 * LAYOUT: Two-column story + image/trust signals, then four-column credential cards
 * CONTENT ELEMENTS: Eyebrow, title, body, support copy, image, trust signals, optional CV link, credential cards, contact CTA
 * CONVERSION ROLE: Build credibility and route visitors to contact
 * IDEAL POSITION: Middle of About page after intro, before CTA
 * NOTES / MODIFIERS: CMS-friendly props; icons default when omitted; credential cards optional
 */

import { Award, BookOpen, Flame, Scale, ShieldCheck, Users, type LucideIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/UI/Button';

export type TrustSignalInput = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

export type CredentialColumn = {
  icon?: LucideIcon;
  title: string;
  bullets: string[];
};

interface TwoColumnAboutDetailedProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  supportContent?: string;
  imageSrc?: string;
  imageAlt?: string;
  trustSignals?: TrustSignalInput[];
  credentials?: CredentialColumn[];
  cvHref?: string;
  cvLabel?: string;
  contactHref?: string;
  contactLabel?: string;
  id?: string;
}

const defaultTrustSignals: TrustSignalInput[] = [
  {
    value: 'Auth',
    label: 'Authenticated admin shell with roles and profile flows included',
    icon: ShieldCheck,
  },
  {
    value: 'CMS',
    label: 'Editable page content via schema-driven fields out of the box',
    icon: Award,
  },
  {
    value: 'Stack',
    label: 'Laravel, Inertia, and React foundation ready to brand and extend',
    icon: Flame,
  },
];

const defaultCredentials: CredentialColumn[] = [
  {
    icon: Flame,
    title: 'Admin essentials',
    bullets: [
      'Authenticated dashboard and user management',
      'Theme and appearance preferences',
      'Media and gallery tools',
      'Mail logging for outbound messages',
    ],
  },
  {
    icon: Scale,
    title: 'Content control',
    bullets: [
      'Schema-driven page editing',
      'SEO fields per page',
      'Reusable section composition',
      'Business info centralized in settings',
    ],
  },
  {
    icon: BookOpen,
    title: 'Developer experience',
    bullets: [
      'Laravel 12 application structure',
      'Inertia React pages with TypeScript',
      'Pest feature tests as the default',
      'Vite bundling for admin and public UI',
    ],
  },
  {
    icon: Users,
    title: 'Built for teams',
    bullets: [
      'Agencies shipping client admin apps',
      'Product teams skipping boilerplate',
      'Clear separation of public and admin',
      'Extensible without fighting the architecture',
    ],
  },
];

export function TwoColumnAboutDetailed({
  eyebrow = 'Experience and credentials',
  title = 'A production-ready admin foundation you can brand and extend',
  body = 'AMP CMS gives teams a dependable Laravel, Inertia, and React shell—auth, users, themes, and a clean dashboard—so you can move straight to the product work that sets you apart.',
  supportContent = 'Agencies and product teams use it as a starting point: keep the architecture, swap in your brand, and ship features instead of rebuilding the basics every time.',
  imageSrc = '/images/hero-bg.jpg',
  imageAlt = 'AMP CMS dashboard preview',
  trustSignals = defaultTrustSignals,
  credentials = defaultCredentials,
  cvHref,
  cvLabel = 'View details',
  contactHref = '/contact-us',
  contactLabel = 'Contact Us',
  id = 'about',
}: TwoColumnAboutDetailedProps) {
  return (
    <section
      id={id}
      className="bg-white py-8 md:py-16 lg:py-24"
      tremor-id="tremor-raw"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12 items-start">
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-sm font-semibold tracking-wide text-primary-600 uppercase">
              {eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900">
              {title}
            </h2>
            <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
              {body}
            </p>
            <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
              {supportContent}
            </p>
            {cvHref ? (
              <motion.div
                className="mt-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              >
                <Button variant="primary" asChild>
                  <a href={cvHref} target="_blank" rel="noopener noreferrer">
                    {cvLabel}
                  </a>
                </Button>
              </motion.div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-zinc-100 bg-zinc-50 max-w-[600px] mx-auto">
              <img
                src={imageSrc}
                alt={imageAlt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-full inset-0 absolute object-cover"
              />
            </div>

            {trustSignals?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 md:gap-3">
                {trustSignals.map((signal) => {
                  const Icon = signal.icon ?? Award;
                  return (
                    <div
                      key={signal.label}
                      className="flex items-start gap-3 rounded-[3px] border border-zinc-100 bg-zinc-50 p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-primary-50 text-primary-700">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="space-y-1">
                        <div className="text-xl font-semibold text-primary-700">
                          {signal.value}
                        </div>
                        <p className="text-sm text-zinc-700 leading-snug">
                          {signal.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {credentials?.length ? (
        <div className="mx-auto max-w-7xl mt-8 px-4 md:mt-12 md:px-8 lg:mt-16 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
            {credentials.map((service, i) => {
              const Icon = service.icon ?? Award;
              return (
                <motion.div
                  key={service.title}
                  className="bg-white p-6 md:p-8 rounded-[3px] border border-tea-green-500 shadow-[-10px_10px_0_0_var(--color-tea-green-500)] transition ms-3 md:ms-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                >
                  <div
                    className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[3px] bg-primary-500 text-white mb-6"
                    aria-hidden="true"
                  >
                    <Icon className="size-7" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary-700 mb-2">
                    {service.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-800">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-400" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          {contactHref ? (
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              <Button variant="primary" asChild>
                <Link href={contactHref}>{contactLabel}</Link>
              </Button>
            </motion.div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

TwoColumnAboutDetailed.displayName = 'TwoColumnAboutDetailed';
