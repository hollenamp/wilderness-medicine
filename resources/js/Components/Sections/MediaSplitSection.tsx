/**
 * **CURSOR INFO**
 * SECTION TYPE: Editorial split with copy left and video or figure right
 * BEST FOR: Resource pages, lesson pages, or any sub-page that pairs explanation with a video or diagram
 * VISUAL STYLE: Home editorial style — bar heading, charcoal body, rounded media, optional zinc-50 band
 * LAYOUT: Copy left, sticky media right on tablet and up; stacks on mobile; `titlePosition="full"` places the heading above the two-column grid; `layout="centered"` shows media only in a single centered column with a wider max width
 * CONTENT ELEMENTS: Optional eyebrow, two-line heading, body paragraphs, HTML5 video or image figure
 * CONVERSION ROLE: Teach a skill or show original footage, then route visitors toward training or contact
 * IDEAL POSITION: After the page intro, between list sections, or before the closing CTA
 * NOTES / MODIFIERS: Video takes precedence over image; diagrams use object-contain so flowcharts are not cropped; `background` can be `zinc-50` to separate neighboring white sections; `titlePosition="full"` keeps body and media in two columns beneath a full-width heading; body renders blank lines as separate paragraphs and inline `**bold**` / `[label](url)` markdown
 */

import { FormattedText } from '@/Components/UI/FormattedText';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type MediaSplitBackground = 'white' | 'zinc-50';
type MediaSplitEyebrowPosition = 'copy' | 'media';
type MediaSplitTitlePosition = 'copy' | 'full';
type MediaSplitLayout = 'split' | 'centered';

type MediaSplitSectionProps = {
    eyebrow?: string;
    eyebrowPosition?: MediaSplitEyebrowPosition;
    title?: string;
    titleLine2?: string;
    titlePosition?: MediaSplitTitlePosition;
    body?: string;
    videoSrc?: string;
    imageSrc?: string;
    imageAlt?: string;
    background?: MediaSplitBackground;
    layout?: MediaSplitLayout;
    id?: string;
    spacing?: SectionSpacing;
};

const backgroundClasses: Record<MediaSplitBackground, string> = {
    white: 'bg-white',
    'zinc-50': 'bg-zinc-50',
};

const eyebrowClasses =
    'text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm';

export function MediaSplitSection({
    eyebrow,
    eyebrowPosition = 'copy',
    title = 'Resource',
    titleLine2,
    titlePosition = 'copy',
    body,
    videoSrc,
    imageSrc,
    imageAlt = '',
    background = 'white',
    layout = 'split',
    id,
    spacing = 'standard',
}: MediaSplitSectionProps) {
    const paragraphs = (body ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const hasVideo = Boolean(videoSrc?.trim());
    const hasImage = Boolean(imageSrc?.trim());
    const mediaTitle = title?.trim() || imageAlt?.trim() || 'Video';
    const showFullWidthTitle = titlePosition === 'full';
    const showEyebrowAboveCopy = Boolean(eyebrow?.trim()) && eyebrowPosition === 'copy';
    const showEyebrowBelowMedia = Boolean(eyebrow?.trim()) && eyebrowPosition === 'media';

    const bodyParagraphs = paragraphs.map((paragraph) => (
        <p
            key={paragraph.slice(0, 48)}
            className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
        >
            <FormattedText text={paragraph} />
        </p>
    ));

    const mediaColumn =
        hasVideo || hasImage ? (
            <div className="relative flex flex-col gap-4 md:sticky md:top-28 md:gap-6">
                {hasVideo ? (
                    <video
                        className="w-full rounded-lg bg-charcoal-brown-950"
                        controls
                        playsInline
                        preload="metadata"
                        title={mediaTitle}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full rounded-lg object-contain"
                    />
                )}
                {showEyebrowBelowMedia ? (
                    <p className={cx(eyebrowClasses, 'text-center')}>{eyebrow}</p>
                ) : null}
            </div>
        ) : null;

    if (layout === 'centered' && (hasVideo || hasImage)) {
        return (
            <section id={id} className={cx(backgroundClasses[background], sectionSpacing(spacing))}>
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                    <div className="mx-auto w-full max-w-3xl">
                        {hasVideo ? (
                            <video
                                className="w-full rounded-lg bg-charcoal-brown-950"
                                controls
                                playsInline
                                preload="metadata"
                                title={mediaTitle}
                            >
                                <source src={videoSrc} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="w-full rounded-lg object-contain"
                            />
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id={id} className={cx(backgroundClasses[background], sectionSpacing(spacing))}>
            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                {showFullWidthTitle ? (
                    <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
                        <div className="flex flex-col gap-3 md:gap-4">
                            {showEyebrowAboveCopy ? (
                                <p className={eyebrowClasses}>{eyebrow}</p>
                            ) : null}
                            <SectionHeading title={title} titleLine2={titleLine2} />
                        </div>

                        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                            <div className="flex flex-col gap-6 md:gap-8">{bodyParagraphs}</div>
                            {mediaColumn}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                        <div className="flex flex-col gap-6 md:gap-8">
                            {showEyebrowAboveCopy ? (
                                <p className={eyebrowClasses}>{eyebrow}</p>
                            ) : null}
                            <SectionHeading title={title} titleLine2={titleLine2} />
                            {bodyParagraphs}
                        </div>

                        {mediaColumn}
                    </div>
                )}
            </div>
        </section>
    );
}
