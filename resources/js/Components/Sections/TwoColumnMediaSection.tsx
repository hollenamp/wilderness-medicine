/**
 * **CURSOR INFO**
 * SECTION TYPE: Shared heading with two side-by-side video or figure columns
 * BEST FOR: Resource or lesson pages that pair two related skill videos or diagrams
 * VISUAL STYLE: Home editorial style — bar heading, charcoal titles, rounded media, optional zinc-50 band
 * LAYOUT: Shared eyebrow and heading above a two-column grid (stacks on mobile)
 * CONTENT ELEMENTS: Optional eyebrow, two-line heading, per-column title, optional body, HTML5 video or image
 * CONVERSION ROLE: Teach related skills in one scan, then route visitors toward training or contact
 * IDEAL POSITION: After list or TV sections, before a single diagram or the closing CTA
 * NOTES / MODIFIERS: Video takes precedence over image per column; `background` can be `zinc-50` to separate neighboring white sections; column body renders blank lines as separate paragraphs and inline `**bold**` / `[label](url)` markdown
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type TwoColumnMediaBackground = 'white' | 'zinc-50';

export type TwoColumnMediaItem = {
    title: string;
    body?: string;
    videoSrc?: string;
    imageSrc?: string;
    imageAlt?: string;
};

type TwoColumnMediaSectionProps = {
    eyebrow?: string;
    heading?: string;
    headingLine2?: string;
    items?: TwoColumnMediaItem[];
    background?: TwoColumnMediaBackground;
    id?: string;
    spacing?: SectionSpacing;
};

const backgroundClasses: Record<TwoColumnMediaBackground, string> = {
    white: 'bg-white',
    'zinc-50': 'bg-zinc-50',
};

const renderBody = (body: string | undefined) =>
    (body ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => (
            <p
                key={paragraph.slice(0, 48)}
                className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
            >
                <FormattedText text={paragraph} />
            </p>
        ));

export function TwoColumnMediaSection({
    eyebrow,
    heading,
    headingLine2,
    items = [],
    background = 'white',
    id,
    spacing = 'standard',
}: TwoColumnMediaSectionProps) {
    const visibleItems = items.filter(
        (item) => item.title.trim() || item.videoSrc?.trim() || item.imageSrc?.trim(),
    );

    if (!visibleItems.length) {
        return null;
    }

    return (
        <section id={id} className={cx(backgroundClasses[background], sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:gap-8 md:px-8 lg:px-12">
                {eyebrow || heading ? (
                    <div className="flex flex-col gap-3 md:gap-4">
                        {eyebrow ? (
                            <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                                {eyebrow}
                            </p>
                        ) : null}
                        {heading ? (
                            <SectionHeading title={heading} titleLine2={headingLine2} />
                        ) : null}
                    </div>
                ) : null}

                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-8 lg:gap-12">
                    {visibleItems.map((item, index) => {
                        const hasVideo = Boolean(item.videoSrc?.trim());
                        const hasImage = Boolean(item.imageSrc?.trim());
                        const title = item.title.trim() || `Media ${index + 1}`;

                        return (
                            <article key={`${title}-${index}`} className="flex flex-col gap-4 md:gap-6">
                                {item.title.trim() ? (
                                    <h3 className="text-xl font-bold tracking-tight text-charcoal-brown-950 md:text-2xl">
                                        {item.title}
                                    </h3>
                                ) : null}
                                {renderBody(item.body)}
                                {hasVideo ? (
                                    <video
                                        className="w-full rounded-lg bg-charcoal-brown-950"
                                        controls
                                        playsInline
                                        preload="metadata"
                                        title={title}
                                    >
                                        <source src={item.videoSrc} type="video/mp4" />
                                    </video>
                                ) : hasImage ? (
                                    <img
                                        src={item.imageSrc}
                                        alt={item.imageAlt ?? ''}
                                        className="w-full rounded-lg object-contain"
                                    />
                                ) : null}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
