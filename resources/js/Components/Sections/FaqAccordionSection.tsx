/**
 * **CURSOR INFO**
 * SECTION TYPE: FAQ accordion list
 * BEST FOR: FAQs pages, course catalogs, and support content ahead of a contact CTA
 * VISUAL STYLE: Home editorial style — left bar heading, charcoal type, tea-green focus ring
 * LAYOUT: Default split — sticky heading column left, accordion right; `layout="stack"` — heading above a full-width accordion
 * CONTENT ELEMENTS: Eyebrow, heading, intro, question/answer accordion items
 * CONVERSION ROLE: Answer objections and reduce support friction before the CTA
 * IDEAL POSITION: Middle of the page after the intro, before the CTA
 * NOTES / MODIFIERS: Uses the shared Accordion UI with light-theme overrides; `background` can be `zinc-50` to separate neighboring white sections; renders nothing without items; omits the title block when eyebrow/heading/intro are empty; intro and answers render blank lines as separate paragraphs and inline `**bold**` / `[label](url)` markdown; accordion titles are plain text (keep links in answers)
 */

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/UI/Accordion';
import { FormattedText } from '@/Components/UI/FormattedText';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

export type FaqAccordionItem = {
    question: string;
    answer: string;
};

type FaqAccordionBackground = 'white' | 'zinc-50';
type FaqAccordionLayout = 'split' | 'stack';

type FaqAccordionSectionProps = {
    eyebrow?: string;
    heading?: string;
    headingLine2?: string;
    intro?: string;
    items?: FaqAccordionItem[];
    id?: string;
    spacing?: SectionSpacing;
    background?: FaqAccordionBackground;
    layout?: FaqAccordionLayout;
};

const backgroundClasses: Record<FaqAccordionBackground, string> = {
    white: 'bg-white',
    'zinc-50': 'bg-zinc-50',
};

const renderFormattedParagraphs = (text: string, className: string) =>
    text
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className={className}>
                <FormattedText text={paragraph} />
            </p>
        ));

export function FaqAccordionSection({
    eyebrow,
    heading,
    headingLine2,
    intro,
    items = [],
    id = 'faqs',
    spacing = 'standard',
    background = 'white',
    layout = 'split',
}: FaqAccordionSectionProps = {}) {
    if (!items.length) {
        return null;
    }

    const hasHeader = Boolean(eyebrow || heading || headingLine2 || intro);

    const header = hasHeader ? (
        <div className="flex flex-col gap-4">
            {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                    {eyebrow}
                </p>
            ) : null}
            {heading ? (
                <SectionHeading title={heading} titleLine2={headingLine2} />
            ) : null}
            {intro
                ? renderFormattedParagraphs(
                      intro,
                      'text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg',
                  )
                : null}
        </div>
    ) : null;

    const accordion = (
        <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
                <AccordionItem
                    key={`${item.question}-${index}`}
                    value={`item-${index}`}
                    className="border-zinc-200"
                >
                    <AccordionTrigger className="py-5 text-base font-bold text-charcoal-brown-950 hover:no-underline focus-visible:ring-tea-green-400 md:text-lg">
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 text-base font-light leading-relaxed text-charcoal-brown-800">
                        {renderFormattedParagraphs(item.answer, '')}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );

    return (
        <section id={id} className={cx(backgroundClasses[background], sectionSpacing(spacing))}>
            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                {layout === 'stack' ? (
                    <div className="flex flex-col gap-8 md:gap-12">
                        {header ? <div className="max-w-3xl">{header}</div> : null}
                        {accordion}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.5fr] md:gap-12 lg:gap-16">
                        {header ? (
                            <div className="md:sticky md:top-28 md:self-start">{header}</div>
                        ) : null}
                        {accordion}
                    </div>
                )}
            </div>
        </section>
    );
}
