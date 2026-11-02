/**
 * **CURSOR INFO**
 * SECTION TYPE: Two-column copy with a scheduling/facts aside
 * BEST FOR: Fees, policies, scheduling, or any long copy that needs scannable highlights
 * VISUAL STYLE: Home editorial style — bar heading, charcoal body, charcoal-brown or forest-green aside card
 * LAYOUT: Heading and tagline full-width above by default; copy left, sticky aside card right on tablet and up; stacks on mobile; `headingInColumn` places the heading and tagline in the copy column
 * CONTENT ELEMENTS: Optional tagline, two-line heading, body paragraphs, aside heading, title/detail fact list
 * CONVERSION ROLE: Make terms easy to scan so visitors can move to contact with fewer questions
 * IDEAL POSITION: After testimonials or story, before the closing CTA
 * NOTES / MODIFIERS: Body splits on blank lines and renders inline `**bold**` / `[label](url)` markdown; aside is optional and omitted when empty; aside heading is omitted when blank; `asideCompact` tightens aside padding for title-only lists; `asideTone="forest"` uses the dark secondary green card from page intros; `background` defaults to white and can be `zinc-50`; `spacing` collapses padding when neighbouring sections share the same background; `headingInColumn` keeps the aside aligned with the heading instead of sitting beside a full-width title
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

export type CopyAsideFact = {
    title: string;
    detail: string;
};

type CopyAsideBackground = 'white' | 'zinc-50';
type CopyAsideTone = 'charcoal' | 'forest';

type CopyAsideSectionProps = {
    headline?: string;
    headlineLine2?: string;
    tagline?: string;
    body?: string;
    asideHeading?: string;
    facts?: CopyAsideFact[];
    asideCompact?: boolean;
    asideTone?: CopyAsideTone;
    background?: CopyAsideBackground;
    headingInColumn?: boolean;
    id?: string;
    spacing?: SectionSpacing;
};

const backgroundClasses: Record<CopyAsideBackground, string> = {
    white: 'bg-white',
    'zinc-50': 'bg-zinc-50',
};

const asideToneClasses: Record<CopyAsideTone, string> = {
    charcoal:
        'rounded-lg bg-gradient-to-br from-charcoal-brown-800 via-charcoal-brown-900 to-charcoal-brown-950',
    forest: 'rounded-lg bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950',
};

export function CopyAsideSection({
    headline = 'Fees & scheduling',
    headlineLine2,
    tagline,
    body,
    asideHeading = 'At a glance',
    facts = [],
    asideCompact = false,
    asideTone = 'charcoal',
    background = 'white',
    headingInColumn = false,
    id,
    spacing = 'standard',
}: CopyAsideSectionProps) {
    const paragraphs = (body ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const visibleFacts = facts.filter((fact) => fact.title.trim() || fact.detail.trim());
    const hasAside = visibleFacts.length > 0;

    const heading = (
        <div className="flex flex-col gap-3 md:gap-4">
            <SectionHeading title={headline} titleLine2={headlineLine2} />
            {tagline ? (
                <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                    <FormattedText text={tagline} />
                </p>
            ) : null}
        </div>
    );

    return (
        <section id={id} className={cx(backgroundClasses[background], sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:gap-8 md:px-8 lg:px-12">
                {headingInColumn ? null : heading}

                <div
                    className={cx(
                        'grid grid-cols-1 items-start gap-8 md:gap-12 lg:gap-16',
                        hasAside && 'md:grid-cols-2',
                    )}
                >
                    <div className="flex flex-col gap-6 md:gap-8">
                        {headingInColumn ? heading : null}
                        {paragraphs.map((paragraph) => (
                            <p
                                key={paragraph.slice(0, 48)}
                                className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
                            >
                                <FormattedText text={paragraph} />
                            </p>
                        ))}
                    </div>

                    {hasAside ? (
                        <aside
                            className={cx(
                                'text-white md:sticky md:top-28 md:self-start',
                                asideToneClasses[asideTone],
                                asideCompact ? 'p-4 md:p-5' : 'p-6 md:p-8',
                            )}
                            aria-label={asideHeading.trim() || 'Highlights'}
                        >
                            <div className={cx('flex flex-col', asideCompact ? 'gap-4' : 'gap-6 md:gap-8')}>
                                {asideHeading.trim() ? (
                                    <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-400 md:text-sm">
                                        <FormattedText text={asideHeading} tone="dark" />
                                    </p>
                                ) : null}
                                <ul className="flex flex-col divide-y divide-zinc-700">
                                    {visibleFacts.map((fact) => (
                                        <li
                                            key={fact.title}
                                            className={cx(
                                                'flex flex-col first:pt-0 last:pb-0',
                                                asideCompact ? 'gap-1 py-3' : 'gap-2 py-6',
                                            )}
                                        >
                                            {fact.title ? (
                                                <h3 className={asideCompact ? 'text-base font-bold' : 'text-lg font-bold'}>
                                                    {fact.title}
                                                </h3>
                                            ) : null}
                                            {fact.detail ? (
                                                <p className="text-sm font-light leading-relaxed text-zinc-200">
                                                    <FormattedText text={fact.detail} tone="dark" />
                                                </p>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
