/**
 * **CURSOR INFO**
 * SECTION TYPE: Editorial numbered list with optional follow-on notes
 * BEST FOR: Gear lists, packing checklists, step-by-step resource copy
 * VISUAL STYLE: Home editorial style — bar heading, tea-green numerals, charcoal body; forest-green gradient cards for body/footer asides; charcoal gradient for list asides
 * LAYOUT: Left-aligned single column by default; heading and tagline above a numbered list and optional footer notes; `columns={2}` splits items into two equal columns from the tablet breakpoint up; `bodyAside` places body copy in a forest-green gradient card to the right of the headline; `listAside` keeps the heading full width and places body left with the numbered list in a sticky charcoal card on the right
 * CONTENT ELEMENTS: Optional eyebrow, two-line heading, tagline, body paragraphs, numbered items, optional list-aside heading, footer heading and notes
 * CONVERSION ROLE: Make practical checklists scannable so visitors can act on the advice or book training
 * IDEAL POSITION: Middle of a resource or skills page, between intro and media or CTA
 * NOTES / MODIFIERS: `background` can be `zinc-50` to separate neighboring white sections; footer notes split on single newlines so original line breaks stay intact; tagline, body, items, and footer notes render inline `**bold**` / `[label](url)` markdown; two-column mode reads top-to-bottom in each column (1–n left, remainder right); `bodyAside` shows the tagline as body copy under the heading (ranking scale stays in the card); without `bodyAside`, the tagline renders as an uppercase kicker below the heading unless `itemsAfterHeading` is also set; `listAside` ignores `columns` for the item grid; `itemsAfterHeading` places the numbered list directly under the heading; `itemsIntro` adds copy above the list when `itemsAfterHeading` is enabled; with `bodyAside` and `itemsAfterHeading` together, the list stays left and body copy moves into the right forest-green card; `footerCard` renders the footer as a full-width forest-green card with a centered heading, inline wrapping bullet items from `footerBody`, and blank-line note paragraphs from `footerNotes`
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type NumberedListBackground = 'white' | 'zinc-50';

export type NumberedListItem = {
    text: string;
};

type NumberedListSectionProps = {
    eyebrow?: string;
    heading?: string;
    headingLine2?: string;
    tagline?: string;
    body?: string;
    items?: NumberedListItem[];
    footerHeading?: string;
    footerBody?: string;
    /** Blank-line paragraphs under the footer card items when `footerCard` is enabled. */
    footerNotes?: string;
    /** Heading shown above the list when `listAside` is enabled. */
    listAsideHeading?: string;
    /** Intro copy shown above numbered items when `itemsAfterHeading` is enabled. */
    itemsIntro?: string;
    background?: NumberedListBackground;
    columns?: 1 | 2;
    bodyAside?: boolean;
    /** Full-width heading; body left, numbered list in a sticky dark card on the right. */
    listAside?: boolean;
    /** Full-width forest-green card with centered heading, inline bullet items, and notes. */
    footerCard?: boolean;
    /** Render numbered items directly under the heading, before body copy. */
    itemsAfterHeading?: boolean;
    id?: string;
    spacing?: SectionSpacing;
};

const backgroundClasses: Record<NumberedListBackground, string> = {
    white: 'bg-white',
    'zinc-50': 'bg-zinc-50',
};

const splitListColumns = (items: string[]): [string[], string[]] => {
    const midpoint = Math.ceil(items.length / 2);

    return [items.slice(0, midpoint), items.slice(midpoint)];
};

const renderNumberedItem = (text: string, index: number, tone: 'light' | 'dark' = 'light') => (
    <li key={`${index}-${text.slice(0, 32)}`} className="flex items-start gap-4">
        <span
            className={cx(
                'mt-0.5 w-8 shrink-0 text-sm font-bold tabular-nums md:text-base',
                tone === 'dark' ? 'text-tea-green-400' : 'text-tea-green-600',
            )}
        >
            {index + 1}.
        </span>
        <span
            className={cx(
                'text-base font-light leading-relaxed md:text-lg',
                tone === 'dark' ? 'text-zinc-100' : 'text-charcoal-brown-800',
            )}
        >
            <FormattedText text={text} tone={tone} />
        </span>
    </li>
);

const renderBodyParagraphs = (paragraphs: string[], className: string, tone: 'light' | 'dark' = 'light') =>
    paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={className}>
            <FormattedText text={paragraph} tone={tone} />
        </p>
    ));

export function NumberedListSection({
    eyebrow,
    heading = 'Checklist',
    headingLine2,
    tagline,
    body,
    items = [],
    footerHeading,
    footerBody,
    footerNotes,
    listAsideHeading,
    itemsIntro,
    background = 'white',
    columns = 1,
    bodyAside = false,
    listAside = false,
    footerCard = false,
    itemsAfterHeading = false,
    id,
    spacing = 'standard',
}: NumberedListSectionProps) {
    const paragraphs = (body ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const visibleItems = items
        .map((item) => item.text.trim())
        .filter(Boolean);

    const footerLines = (footerBody ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    const footerNoteParagraphs = (footerNotes ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const [firstColumnItems, secondColumnItems] = splitListColumns(visibleItems);
    const showBodyAside = bodyAside && !listAside && paragraphs.length > 0;
    const showListAside = listAside && (paragraphs.length > 0 || visibleItems.length > 0);
    const showItemsAfterHeading = itemsAfterHeading && !showListAside && visibleItems.length > 0;
    const showItemsAfterHeadingWithBodyAside = showBodyAside && showItemsAfterHeading;
    const titleBlock = (
        <div className="flex flex-col gap-3 md:gap-4">
            {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                    {eyebrow}
                </p>
            ) : null}
            <SectionHeading title={heading} titleLine2={headingLine2} />
            {showBodyAside && tagline?.trim() ? (
                <p className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                    <FormattedText text={tagline} />
                </p>
            ) : null}
        </div>
    );
    const taglineBlock =
        tagline && (!showBodyAside || showItemsAfterHeadingWithBodyAside) ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                <FormattedText text={tagline} />
            </p>
        ) : null;

    const itemsIntroBlock = itemsIntro?.trim() ? (
        <p className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
            <FormattedText text={itemsIntro} />
        </p>
    ) : null;

    const bodyAsideCard = showBodyAside ? (
        <aside
            className="rounded-lg bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950 p-6 text-white md:sticky md:top-28 md:p-8"
            aria-label={tagline || eyebrow || 'Highlights'}
        >
            <div className="flex flex-col gap-2">
                {renderBodyParagraphs(
                    paragraphs,
                    'text-base font-light leading-snug text-zinc-100 md:text-lg',
                    'dark',
                )}
            </div>
        </aside>
    ) : null;

    const itemsAfterHeadingList = showItemsAfterHeading
        ? columns === 2
            ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
                      <ol className="flex flex-col gap-3 md:gap-4">
                          {firstColumnItems.map((text, index) => renderNumberedItem(text, index))}
                      </ol>
                      {secondColumnItems.length ? (
                          <ol className="flex flex-col gap-3 md:gap-4" start={firstColumnItems.length + 1}>
                              {secondColumnItems.map((text, index) =>
                                  renderNumberedItem(text, firstColumnItems.length + index),
                              )}
                          </ol>
                      ) : null}
                  </div>
              )
            : (
                  <ol className="flex max-w-3xl flex-col gap-3 md:gap-4">
                      {visibleItems.map((text, index) => renderNumberedItem(text, index))}
                  </ol>
              )
        : null;

    return (
        <section id={id} className={cx(backgroundClasses[background], sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:gap-8 md:px-8 lg:px-12">
                {showItemsAfterHeadingWithBodyAside ? (
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                        <div className="flex flex-col gap-6 md:gap-8">
                            {titleBlock}
                            {itemsIntroBlock}
                            {itemsAfterHeadingList}
                            {taglineBlock}
                        </div>
                        {bodyAsideCard}
                    </div>
                ) : showBodyAside ? (
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                        {titleBlock}
                        {bodyAsideCard}
                    </div>
                ) : showItemsAfterHeading ? (
                    titleBlock
                ) : (
                    <div className="flex flex-col gap-3 md:gap-4">
                        {titleBlock}
                        {taglineBlock}
                    </div>
                )}

                {showItemsAfterHeading && !showItemsAfterHeadingWithBodyAside ? (
                    <>
                        {itemsIntroBlock}
                        {itemsAfterHeadingList}
                    </>
                ) : null}

                {showItemsAfterHeading && !showItemsAfterHeadingWithBodyAside ? taglineBlock : null}

                {showListAside ? (
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                        {paragraphs.length ? (
                            <div className="flex flex-col gap-4 md:gap-6">
                                {renderBodyParagraphs(
                                    paragraphs,
                                    'text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg',
                                )}
                            </div>
                        ) : (
                            <div />
                        )}

                        {visibleItems.length ? (
                            <aside
                                className="rounded-lg bg-gradient-to-br from-charcoal-brown-800 via-charcoal-brown-900 to-charcoal-brown-950 p-6 text-white md:sticky md:top-28 md:p-8"
                                aria-label={listAsideHeading?.trim() || tagline || eyebrow || 'Checklist'}
                            >
                                <div className="flex flex-col gap-4 md:gap-6">
                                    {(listAsideHeading?.trim()) ? (
                                        <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-400 md:text-sm">
                                            <FormattedText text={listAsideHeading} tone="dark" />
                                        </p>
                                    ) : null}
                                    <ol className="flex flex-col gap-3 md:gap-4">
                                        {visibleItems.map((text, index) =>
                                            renderNumberedItem(text, index, 'dark'),
                                        )}
                                    </ol>
                                </div>
                            </aside>
                        ) : null}
                    </div>
                ) : null}

                {!showBodyAside && !showListAside && !showItemsAfterHeading && paragraphs.length ? (
                    <div
                        className={cx(
                            columns === 2
                                ? 'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-12'
                                : 'flex max-w-3xl flex-col gap-4 md:gap-6',
                        )}
                    >
                        {renderBodyParagraphs(
                            paragraphs,
                            'text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg',
                        )}
                    </div>
                ) : null}

                {showItemsAfterHeading && !showBodyAside && !showListAside && paragraphs.length ? (
                    <div
                        className={cx(
                            columns === 2
                                ? 'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-12'
                                : 'flex max-w-3xl flex-col gap-4 md:gap-6',
                        )}
                    >
                        {renderBodyParagraphs(
                            paragraphs,
                            'text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg',
                        )}
                    </div>
                ) : null}

                {!showListAside && !showItemsAfterHeading && visibleItems.length ? (
                    columns === 2 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
                            <ol className="flex flex-col gap-3 md:gap-4">
                                {firstColumnItems.map((text, index) => renderNumberedItem(text, index))}
                            </ol>
                            {secondColumnItems.length ? (
                                <ol className="flex flex-col gap-3 md:gap-4" start={firstColumnItems.length + 1}>
                                    {secondColumnItems.map((text, index) =>
                                        renderNumberedItem(text, firstColumnItems.length + index),
                                    )}
                                </ol>
                            ) : null}
                        </div>
                    ) : (
                        <ol className="flex max-w-3xl flex-col gap-3 md:gap-4">
                            {visibleItems.map((text, index) => renderNumberedItem(text, index))}
                        </ol>
                    )
                ) : null}

                {footerCard && (footerHeading || footerLines.length || footerNoteParagraphs.length) ? (
                    <aside
                        className="rounded-lg bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950 px-6 py-10 text-white md:px-10 md:py-14 lg:px-16 lg:py-16"
                        aria-label={footerHeading?.trim() || 'Checklist'}
                    >
                        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:gap-8">
                            {footerHeading ? (
                                <h3 className="text-center text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                                    {footerHeading}
                                </h3>
                            ) : null}
                            {footerLines.length ? (
                                <ul className="flex list-none flex-wrap items-center justify-center gap-x-3 gap-y-2 p-0 text-center text-base font-bold leading-relaxed text-zinc-100 md:text-lg">
                                    {footerLines.map((item, index) => (
                                        <li
                                            key={`${index}-${item.slice(0, 32)}`}
                                            className="inline-flex items-center gap-3"
                                        >
                                            {index > 0 ? (
                                                <span
                                                    aria-hidden="true"
                                                    className="text-2xl font-bold leading-none text-tea-green-400 md:text-3xl"
                                                >
                                                    •
                                                </span>
                                            ) : null}
                                            <span>
                                                <FormattedText text={item} tone="dark" />
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                            {footerNoteParagraphs.length ? (
                                <div className="flex w-full max-w-3xl flex-col gap-4 md:gap-6">
                                    {footerNoteParagraphs.map((paragraph) => (
                                        <p
                                            key={paragraph.slice(0, 48)}
                                            className="text-center text-base font-light leading-relaxed text-zinc-200 md:text-lg"
                                        >
                                            <FormattedText text={paragraph} tone="dark" />
                                        </p>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </aside>
                ) : null}

                {!footerCard && (footerHeading || footerLines.length) ? (
                    <div className="flex max-w-3xl flex-col gap-4 md:gap-6">
                        {footerHeading ? (
                            <h3 className="text-lg font-bold uppercase tracking-tight text-charcoal-brown-950 md:text-xl">
                                {footerHeading}
                            </h3>
                        ) : null}
                        {footerLines.map((note) => (
                            <p
                                key={note.slice(0, 48)}
                                className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
                            >
                                <FormattedText text={note} />
                            </p>
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
