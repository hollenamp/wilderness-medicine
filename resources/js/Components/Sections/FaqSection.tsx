/**
 * **CURSOR INFO**
 * SECTION TYPE: FAQ accordion list
 * BEST FOR: FAQs pages, support/help content before contact CTA
 * VISUAL STYLE: Modern, minimal, clean, light background
 * LAYOUT: Centered header above single-column accordion
 * CONTENT ELEMENTS: Eyebrow, heading, intro, question/answer accordion items
 * CONVERSION ROLE: Answer objections and reduce support friction before CTA
 * IDEAL POSITION: Middle of FAQs page after intro, before CTA
 * NOTES / MODIFIERS: Uses Accordion UI with light-theme class overrides for public pages
 */

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/Components/UI/Accordion';

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  items?: FaqItem[];
  id?: string;
};

const defaultItems: FaqItem[] = [
  {
    question: 'What is AMP CMS?',
    answer:
      'AMP CMS is a Laravel, Inertia, and React admin starter with authentication, users, themes, and CMS-editable public pages—so you can brand it and build what matters.',
  },
  {
    question: 'Can I edit page content from the admin?',
    answer:
      'Yes. Each public page has a schema-driven editor. Defaults ship in the codebase so pages look complete before any CMS content is saved.',
  },
  {
    question: 'Which stack versions does it use?',
    answer:
      'Laravel 12, Inertia v2 with React 18, Tailwind CSS v3, and Pest for feature tests—aligned with current Laravel ecosystem conventions.',
  },
  {
    question: 'How do I add a new public page?',
    answer:
      'Create a Public/{PageName} folder with schema.ts and Page.tsx, register a named route, and add a PageController component override so admin editing resolves the schema.',
  },
];

export function FaqSection({
  eyebrow = 'FAQs',
  heading = 'Common questions',
  intro = 'Quick answers about the starter, editing content, and extending the public site.',
  items = defaultItems,
  id = 'faqs',
}: FaqSectionProps = {}) {
  return (
    <section
      id={id}
      className="bg-white py-8 md:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-8 text-center md:mb-12"
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

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem
              key={`${item.question}-${index}`}
              value={`item-${index}`}
              className="border-zinc-200"
            >
              <AccordionTrigger className="text-zinc-900 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </div>
    </section>
  );
}
