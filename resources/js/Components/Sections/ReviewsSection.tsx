/**
 * **CURSOR INFO**
 * SECTION TYPE: Client reviews / testimonials grid
 * BEST FOR: Reviews pages, social proof on About or Home
 * VISUAL STYLE: Modern, minimal, clean
 * LAYOUT: Centered section header above responsive card grid
 * CONTENT ELEMENTS: Eyebrow, heading, intro, testimonial cards (quote, rating, name, avatar)
 * CONVERSION ROLE: Social proof before CTA or contact
 * IDEAL POSITION: Middle of Reviews page after intro, before CTA
 * NOTES / MODIFIERS: Uses TestimonialCard; responsive 1–3 column grid
 */

import { motion } from 'framer-motion';
import { TestimonialCard } from '@/Components/UI/TestimonialCard';

export type ReviewItem = {
  testimonial: string;
  name?: string;
  title?: string;
  date?: string;
  avatar?: string;
  starRating?: number;
};

type ReviewsSectionProps = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  items?: ReviewItem[];
  id?: string;
};

const defaultItems: ReviewItem[] = [
  {
    name: 'Alex Rivera',
    title: 'Product lead',
    testimonial:
      'AMP CMS gave us a polished admin shell on day one. We skipped months of scaffolding and went straight to features our clients notice.',
    starRating: 5,
  },
  {
    name: 'Jordan Lee',
    title: 'Agency founder',
    testimonial:
      'The authenticated dashboard, themes, and page editing patterns are exactly what we need when spinning up client CMS projects.',
    starRating: 5,
  },
  {
    name: 'Sam Patel',
    title: 'Engineering manager',
    testimonial:
      'Laravel, Inertia, and React already wired together meant our team could focus on domain work instead of debating starter kits.',
    starRating: 5,
  },
];

export function ReviewsSection({
  eyebrow = 'Testimonials',
  heading = 'What teams say about starting here',
  intro = 'Agencies and product teams use AMP CMS as a dependable foundation—so they ship branded admin experiences faster.',
  items = defaultItems,
  id = 'reviews',
}: ReviewsSectionProps = {}) {
  return (
    <section
      id={id}
      className="bg-white py-8 md:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <motion.div
          className="mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-600">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-4 text-base leading-relaxed text-zinc-700 md:text-lg">
              {intro}
            </p>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
          {items.map((item, index) => (
            <motion.div
              key={`${item.name ?? 'review'}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <TestimonialCard
                testimonial={item.testimonial}
                name={item.name}
                title={item.title}
                date={item.date}
                avatar={item.avatar}
                starRating={item.starRating}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
