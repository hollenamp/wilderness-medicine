/**
 * **CURSOR INFO**
 * SECTION TYPE: Closing call-to-action band
 * BEST FOR: Sub-pages that end with contact copy; not needed on the contact page itself
 * VISUAL STYLE: Photographic charcoal band, tea-green primary and outline line buttons
 * LAYOUT: Left-aligned heading and copy, button row beneath, optional closing hint
 * CONTENT ELEMENTS: Heading, body copy, primary and secondary CTA buttons, optional hint line
 * CONVERSION ROLE: Drive calls, emails, and contact-page visits
 * IDEAL POSITION: Last section before the footer
 * NOTES / MODIFIERS: Parallax background image with a charcoal gradient overlay above it; flat square buttons like the rest of the site — no pill shapes; body renders inline `**bold**` / `[label](url)` markdown
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { LineButton } from '@/Components/UI/LineButton';
import { Parallax } from '@/Components/UI/Parallax';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type PageCTASectionProps = {
    heading?: string;
    headingLine2?: string;
    body?: string;
    hint?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    image?: string;
    imageAlt?: string;
    id?: string;
    spacing?: SectionSpacing;
};

export function PageCTASection({
    heading = 'Ready to train with the oldest program in the field?',
    headingLine2,
    body,
    hint,
    primaryLabel = 'Contact Us',
    primaryHref = '/contact-us',
    secondaryLabel = 'Ask a Question',
    secondaryHref = '/contact-us#message',
    image = '/images/cta-bg-01.webp',
    imageAlt = '',
    id = 'cta',
    spacing = 'standard',
}: PageCTASectionProps = {}) {
    return (
        <section
            id={id}
            className={cx(
                'relative overflow-hidden bg-charcoal-brown-900 text-white',
                sectionSpacing(spacing),
            )}
        >
            <div className="absolute inset-0" aria-hidden>
                <Parallax className="h-full w-full" speed={0.45}>
                    <img
                        src={image}
                        alt={imageAlt}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </Parallax>
            </div>
            <div
                className="absolute inset-0 bg-gradient-to-r from-charcoal-brown-950/90 via-charcoal-brown-900/70 to-charcoal-brown-900/35"
                aria-hidden
            />
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-8 lg:px-12">
                <SectionHeading title={heading} titleLine2={headingLine2} tone="dark" />
                {body ? (
                    <p className="max-w-3xl text-base font-light leading-relaxed text-zinc-100 md:text-lg">
                        <FormattedText text={body} tone="dark" />
                    </p>
                ) : null}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <LineButton href={primaryHref}>{primaryLabel}</LineButton>
                    <LineButton
                        href={secondaryHref}
                        className="border border-tea-green-400 bg-transparent text-tea-green-100 hover:bg-forest-green-600 hover:text-white"
                    >
                        {secondaryLabel}
                    </LineButton>
                </div>
                {hint ? (
                    <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-400 md:text-sm">
                        {hint}
                    </p>
                ) : null}
            </div>
        </section>
    );
}
