/**
 * **CURSOR INFO**
 * SECTION TYPE: Story split with overlapping proof bar and optional credential cards
 * BEST FOR: About pages, expert/credential pages needing depth plus proof points
 * VISUAL STYLE: Home editorial style — bar heading, tall rounded photo, charcoal proof bar, tea-green figures
 * LAYOUT: Copy left, tall rounded image right, dark proof bar overlapping the image, then white store-style credential cards; `headingFullWidth` stacks the eyebrow and heading above a 3/2 copy/image split with a zinc-50 numbered fields card in the left column; `wideCopyColumn` uses the same 3/2 split without moving the heading full width
 * CONTENT ELEMENTS: Eyebrow, two-line heading, body paragraphs or numbered fields card, image, optional image caption, proof/trust signals, optional associates intro, credential cards with bullets, CTA button
 * CONVERSION ROLE: Build credibility with history and credentials, then route to contact
 * IDEAL POSITION: After the page intro, before testimonials or the closing CTA
 * NOTES / MODIFIERS: Mirrors the home AboutWithStatsSection proof bar; proof bar and credentials are both optional; credential cards use the store `shadow-store-card` halo on white; long body copy splits on blank lines and renders inline `**bold**` / `[label](url)` markdown; `headingFullWidth` also places body copy in a left-column zinc-50 card with a numbered tea-green list, widens the copy column, and lengthens the photo; `imageAspect` controls photo height — `tall` (default), `square`, or `wide` (16:9)
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { LineButton } from '@/Components/UI/LineButton';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

export type StoryProofSignal = {
    value: string;
    label: string;
};

export type StoryCredential = {
    title: string;
    bullets: string[];
};

type FieldsCard = {
    heading: string;
    items: string[];
};

const stripFieldItem = (value: string): string =>
    value
        .trim()
        .replace(/^\d+\.\s*/, '')
        .replace(/^[-•]\s*/, '')
        .replace(/^and\s+/i, '')
        .replace(/\.+$/, '')
        .trim();

const parseFieldsCard = (value?: string): FieldsCard | null => {
    if (!value?.trim()) {
        return null;
    }

    const parts = value
        .split(/\n{2,}/)
        .map((part) => part.trim())
        .filter(Boolean);

    if (parts.length >= 2) {
        const items = parts
            .slice(1)
            .flatMap((part) => part.split(/\n/))
            .map(stripFieldItem)
            .filter(Boolean);

        return items.length > 1 ? { heading: parts[0], items } : null;
    }

    const match = parts[0].match(/^(.*?fields of:)\s*(.+)$/is);

    if (!match?.[2]) {
        return null;
    }

    const items = match[2].split(',').map(stripFieldItem).filter(Boolean);

    return items.length > 1 ? { heading: match[1].trim(), items } : null;
};

type StorySplitSectionProps = {
    eyebrow?: string;
    title?: string;
    titleLine2?: string;
    body?: string;
    supportContent?: string;
    imageSrc?: string;
    imageAlt?: string;
    imageCaption?: string;
    proofSignals?: StoryProofSignal[];
    credentials?: StoryCredential[];
    credentialsIntro?: string;
    ctaHref?: string;
    ctaLabel?: string;
    headingFullWidth?: boolean;
    wideCopyColumn?: boolean;
    /** Photo crop: `tall` (default portrait), `square`, or `wide` (16:9). */
    imageAspect?: 'tall' | 'square' | 'wide';
    id?: string;
    spacing?: SectionSpacing;
};

export function StorySplitSection({
    eyebrow,
    title = 'About Wilderness Medicine Outfitters',
    titleLine2,
    body,
    supportContent,
    imageSrc = '/images/hero-bg.jpg',
    imageAlt = 'Wilderness Medicine Outfitters training in the field',
    imageCaption,
    proofSignals = [],
    credentials = [],
    credentialsIntro,
    ctaHref,
    ctaLabel = 'Contact Us',
    headingFullWidth = false,
    wideCopyColumn = false,
    imageAspect = 'tall',
    id = 'about',
    spacing = 'standard',
}: StorySplitSectionProps) {
    const toParagraphs = (value?: string): string[] =>
        value
            ?.split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean) ?? [];

    const bodyParagraphs = toParagraphs(body);
    const supportParagraphs = toParagraphs(supportContent);
    const columnParagraphs = headingFullWidth
        ? supportParagraphs
        : [...bodyParagraphs, ...supportParagraphs];
    const fieldsCard = headingFullWidth ? parseFieldsCard(body) : null;
    const wideLayout = headingFullWidth || wideCopyColumn;

    const imageClassName =
        imageAspect === 'square'
            ? 'aspect-square'
            : imageAspect === 'wide'
              ? 'aspect-video'
              : headingFullWidth
                ? 'h-128 md:h-160'
                : 'h-112 md:h-144';

    const hasProofSignals = proofSignals.length > 0;
    const hasCredentials = credentials.length > 0;

    const heading = (
        <>
            {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                    {eyebrow}
                </p>
            ) : null}
            <SectionHeading title={title} titleLine2={titleLine2} />
        </>
    );

    const renderParagraphs = (paragraphs: string[]) =>
        paragraphs.map((paragraph) => (
            <p
                key={paragraph.slice(0, 48)}
                className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
            >
                <FormattedText text={paragraph} />
            </p>
        ));

    return (
        <section id={id} className={cx('relative bg-white', sectionSpacing(spacing))}>
            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                {headingFullWidth ? (
                    <div className="mb-8 flex w-full flex-col gap-6 md:mb-12 md:gap-8 lg:mb-16">
                        {heading}
                    </div>
                ) : null}
                <div
                    className={cx(
                        'grid grid-cols-1 items-start gap-8 md:gap-12 lg:gap-16',
                        wideLayout ? 'md:grid-cols-5' : 'md:grid-cols-2',
                        hasProofSignals && 'pb-24 md:pb-28 lg:pb-32',
                    )}
                >
                    <div
                        className={cx(
                            'flex flex-col gap-6 md:gap-8',
                            wideLayout && 'md:col-span-3',
                        )}
                    >
                        {headingFullWidth ? null : heading}
                        {headingFullWidth && fieldsCard ? (
                            <div className="rounded-lg bg-zinc-50 px-6 py-8 md:px-8 md:py-10">
                                <div className="flex flex-col gap-4 md:gap-6">
                                    <p className="text-base font-bold leading-relaxed text-charcoal-brown-950 md:text-lg">
                                        <FormattedText text={fieldsCard.heading} />
                                    </p>
                                    <ol className="flex list-none flex-col gap-3 p-0 text-base font-light leading-relaxed text-charcoal-brown-800 md:gap-4 md:text-lg">
                                        {fieldsCard.items.map((item, index) => (
                                            <li
                                                key={`${index}-${item.slice(0, 32)}`}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="shrink-0 font-bold text-tea-green-600">
                                                    {index + 1}.
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ) : headingFullWidth ? (
                            renderParagraphs(bodyParagraphs)
                        ) : null}
                        {renderParagraphs(columnParagraphs)}
                    </div>
                    <div
                        className={cx(
                            'relative md:sticky md:top-28',
                            wideLayout && 'md:col-span-2',
                        )}
                    >
                        <figure className="m-0">
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className={cx('w-full rounded-lg object-cover', imageClassName)}
                            />
                            {imageCaption?.trim() ? (
                                <figcaption
                                    className={cx(
                                        'mt-3 text-center text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:mt-4 md:text-sm',
                                    )}
                                >
                                    {imageCaption}
                                </figcaption>
                            ) : null}
                        </figure>
                    </div>
                </div>

                {hasProofSignals ? (
                    <div className="relative z-10 -mt-16 rounded-lg bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 md:-mt-24">
                        <div className="grid grid-cols-1 divide-y divide-tea-green-500 py-8 md:grid-cols-3 md:divide-x md:divide-y-0 md:py-10">
                            {proofSignals.map((signal) => (
                                <div key={signal.label} className="flex flex-col items-center gap-2 px-6 py-4 text-center">
                                    <span className="text-3xl font-bold text-tea-green-400 md:text-4xl">
                                        {signal.value}
                                    </span>
                                    <span className="text-sm font-light leading-relaxed text-zinc-200">
                                        {signal.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                {hasCredentials ? (
                    <div className="mt-8 flex flex-col gap-6 md:mt-12 md:gap-8 lg:mt-16">
                        {credentialsIntro?.trim() ? (
                            <p className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                                <FormattedText text={credentialsIntro} />
                            </p>
                        ) : null}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-12">
                            {credentials.map((credential) => (
                                <article
                                    key={credential.title}
                                    className="flex h-full flex-col gap-4 rounded-lg bg-white p-4 shadow-store-card md:p-6"
                                >
                                    <h3 className="text-lg font-bold text-charcoal-brown-950">
                                        {credential.title}
                                    </h3>
                                    <ul className="flex flex-col gap-2">
                                        {credential.bullets.map((bullet) => (
                                            <li
                                                key={bullet}
                                                className="flex items-start gap-3 text-sm font-light leading-relaxed text-charcoal-brown-800"
                                            >
                                                <span
                                                    className="mt-2 h-1.5 w-1.5 shrink-0 bg-tea-green-600"
                                                    aria-hidden
                                                />
                                                <FormattedText text={bullet} />
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                ) : null}

                {ctaHref ? (
                    <div className="mt-8 flex md:mt-12 lg:mt-16">
                        <LineButton href={ctaHref}>{ctaLabel}</LineButton>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
