/**
 * **CURSOR INFO**
 * SECTION TYPE: Text-only page intro with bar heading and body copy
 * BEST FOR: Sub-pages directly under the interior banner, or a mid-page copy block
 * VISUAL STYLE: Home editorial style — left bar heading, uppercase tagline, charcoal body; two-column mode uses a sticky dark secondary (forest-green) card
 * LAYOUT: Left-aligned single column by default; `columns={2}` keeps the heading full-width above a left/right split with a sticky secondary card on tablet and up
 * CONTENT ELEMENTS: Optional uppercase tagline, two-line heading, body paragraphs, optional dedicated aside/card body
 * CONVERSION ROLE: Orient the visitor and set context before the page content
 * IDEAL POSITION: Directly after the subpage banner, or between content sections
 * NOTES / MODIFIERS: Matches the home page SectionHeading rhythm; `background` defaults to white and can be `zinc-50` to separate it from a following white section; `spacing` collapses padding when neighbouring sections share the same background; body renders blank lines as separate paragraphs and inline `**bold**` / `[label](url)` markdown; single-column body spans the same width as the heading within the section container; `columns={2}` with `asideBody` puts all body copy on the left and the dedicated card content on the right (styled like the uppercase tagline when no separate tagline is set); without `asideBody`, most copy stays left and a short closing highlight block is auto-split into the sticky dark green card
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type PageIntroBackground = 'white' | 'zinc-50';

type PageIntroSectionProps = {
    headline?: string;
    headlineLine2?: string;
    tagline?: string;
    body?: string;
    /** Dedicated card copy for two-column mode; when set, body paragraphs stay on the left. */
    asideBody?: string;
    background?: PageIntroBackground;
    columns?: 1 | 2;
    /** Center body copy within the section container. */
    align?: 'left' | 'center';
    id?: string;
    spacing?: SectionSpacing;
};

const backgroundClasses: Record<PageIntroBackground, string> = {
    white: 'bg-white',
    'zinc-50': 'bg-zinc-50',
};

/** Keep the narrative on the left; only a short closing highlight block goes in the card. */
const splitParagraphColumns = (paragraphs: string[]): [string[], string[]] => {
    if (paragraphs.length < 2) {
        return [paragraphs, []];
    }

    const asideCount = Math.min(2, Math.max(1, Math.floor(paragraphs.length / 5)));
    const splitAt = paragraphs.length - asideCount;

    return [paragraphs.slice(0, splitAt), paragraphs.slice(splitAt)];
};

const renderParagraphs = (paragraphs: string[], className: string, tone: 'light' | 'dark' = 'light') =>
    paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={className}>
            <FormattedText text={paragraph} tone={tone} />
        </p>
    ));

export function PageIntroSection({
    headline = 'Wilderness medicine training since 1967',
    headlineLine2,
    tagline,
    body,
    asideBody,
    background = 'white',
    columns = 1,
    align = 'left',
    id,
    spacing = 'standard',
}: PageIntroSectionProps = {}) {
    const paragraphs = (body ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const asideParagraphs = (asideBody ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const hasDedicatedAside = asideParagraphs.length > 0;
    const [splitLeftParagraphs, splitRightParagraphs] = splitParagraphColumns(paragraphs);
    const leftParagraphs = hasDedicatedAside ? paragraphs : splitLeftParagraphs;
    const rightParagraphs = hasDedicatedAside ? asideParagraphs : splitRightParagraphs;
    const bodyClassName = 'text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg';
    const cardBodyClassName = 'text-base font-light leading-relaxed text-zinc-100 md:text-lg';
    const cardTaglineClassName =
        'text-xs font-semibold uppercase tracking-widest text-tea-green-400 md:text-sm';
    /** Dedicated card-only copy keeps the original uppercase tagline treatment when no separate tagline is set. */
    const styleAsideAsTagline = hasDedicatedAside && !tagline?.trim();

    if (columns === 2 && rightParagraphs.length) {
        return (
            <section id={id} className={cx(backgroundClasses[background], sectionSpacing(spacing))}>
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:gap-8 md:px-8 lg:px-12">
                    <SectionHeading title={headline} titleLine2={headlineLine2} />

                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                        <div className="flex flex-col gap-4 md:gap-6">
                            {renderParagraphs(leftParagraphs, bodyClassName)}
                        </div>

                        <aside
                            className="rounded-lg bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950 p-6 text-white md:sticky md:top-28 md:p-8"
                            aria-label={tagline || rightParagraphs[0] || 'Highlights'}
                        >
                            <div className="flex flex-col gap-6 md:gap-8">
                                {tagline ? (
                                    <p className={cardTaglineClassName}>
                                        <FormattedText text={tagline} tone="dark" />
                                    </p>
                                ) : null}
                                {styleAsideAsTagline
                                    ? renderParagraphs(rightParagraphs, cardTaglineClassName, 'dark')
                                    : renderParagraphs(rightParagraphs, cardBodyClassName, 'dark')}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id={id} className={cx(backgroundClasses[background], sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:gap-8 md:px-8 lg:px-12">
                <div className="flex flex-col gap-3 md:gap-4">
                    <SectionHeading title={headline} titleLine2={headlineLine2} />
                    {tagline ? (
                        <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                            <FormattedText text={tagline} />
                        </p>
                    ) : null}
                </div>
                {paragraphs.length ? (
                    <div
                        className={cx(
                            'flex w-full flex-col gap-4 md:gap-6',
                            align === 'center' && 'mx-auto max-w-4xl text-center',
                        )}
                    >
                        {renderParagraphs(paragraphs, bodyClassName)}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
