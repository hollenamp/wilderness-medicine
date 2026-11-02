/**
 * **CURSOR INFO**
 * SECTION TYPE: Filterable image gallery grid with lightbox
 * BEST FOR: Gallery and portfolio pages showing course and field photography
 * VISUAL STYLE: Home editorial style — white section, left bar heading, square tea-green filter buttons
 * LAYOUT: Bar heading with eyebrow and description, filter row, then a responsive four-column grid
 * CONTENT ELEMENTS: Eyebrow, heading, description, category filter buttons, image grid with optional titles under photos, lightbox and pagination
 * CONVERSION ROLE: Build trust through visual proof of real classes and field work
 * IDEAL POSITION: Main content of the gallery page, before the closing CTA
 * NOTES / MODIFIERS: Categories and images come from the CMS project gallery; filters are square tea-green/outline buttons matching the site CTAs; empty state shown when a collection has no images
 */

import { useEffect, useMemo, useRef, useState } from 'react';

import { SectionHeading } from '@/Components/UI/SectionHeading';
import { Gallery, type GalleryImageInput } from '@/Components/UI/Gallery';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

export type GalleryFilterCategory = { id: number; name: string };

type GalleryGridSectionProps = {
    eyebrow?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    categories?: GalleryFilterCategory[];
    images?: GalleryImageInput[];
    id?: string;
    spacing?: SectionSpacing;
};

const filterBaseClass =
    'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2';
const filterActiveClass = 'bg-tea-green-500 text-white hover:bg-forest-green-600';
const filterInactiveClass =
    'border border-charcoal-brown-950 text-charcoal-brown-950 hover:bg-charcoal-brown-950 hover:text-white';

export function GalleryGridSection({
    eyebrow,
    title = 'Gallery',
    titleLine2,
    description,
    categories = [],
    images = [],
    id = 'gallery',
    spacing = 'standard',
}: GalleryGridSectionProps) {
    const [activeFilterId, setActiveFilterId] = useState<number | null>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        galleryRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
        });
    }, [activeFilterId]);

    const filteredImages = useMemo(() => {
        if (activeFilterId === null) {
            return images;
        }

        return images.filter((image) => image.category_ids?.includes(activeFilterId));
    }, [activeFilterId, images]);

    const hasImages = filteredImages.length > 0;

    return (
        <section id={id} className={cx('bg-white', sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-8 lg:px-12">
                <div className="flex flex-col gap-4">
                    {eyebrow ? (
                        <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                            {eyebrow}
                        </p>
                    ) : null}
                    <SectionHeading title={title} titleLine2={titleLine2} />
                    {description ? (
                        <p className="max-w-2xl text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                            {description}
                        </p>
                    ) : null}
                </div>

                {categories.length ? (
                    <div className="flex flex-wrap items-center gap-3 md:gap-4" aria-label="Filter gallery by collection">
                        <button
                            type="button"
                            onClick={() => setActiveFilterId(null)}
                            aria-pressed={activeFilterId === null}
                            className={cx(
                                filterBaseClass,
                                activeFilterId === null ? filterActiveClass : filterInactiveClass,
                            )}
                        >
                            All collections
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setActiveFilterId(category.id)}
                                aria-pressed={activeFilterId === category.id}
                                className={cx(
                                    filterBaseClass,
                                    activeFilterId === category.id ? filterActiveClass : filterInactiveClass,
                                )}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                ) : null}

                <div ref={galleryRef}>
                    {hasImages ? (
                        <Gallery
                            key={activeFilterId ?? 'all'}
                            images={filteredImages}
                            columns={4}
                            itemsPerPage={8}
                        />
                    ) : (
                        <p className="text-base font-light leading-relaxed text-charcoal-brown-800">
                            There are no images in this collection yet. Please check back soon.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
