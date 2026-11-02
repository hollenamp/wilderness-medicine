/**
 * **CURSOR INFO**
 * SECTION TYPE: Property image gallery with category filters
 * BEST FOR: Homepages and portfolio pages that showcase visual work
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Centered heading with filter row above a responsive image grid gallery
 * CONTENT ELEMENTS: Section title, description, filter buttons, image gallery with lightbox
 * CONVERSION ROLE: Build trust through visual proof of quality and style
 * IDEAL POSITION: Middle of the page after featured content and before testimonials or contact
 * NOTES / MODIFIERS: Uses shared Gallery UI component; categories/images should come from Project Gallery (CMS); empty props show an empty state; responsive, keyboard-accessible, lightbox and pagination
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { SectionHeaderBlock } from '@/components/Blocks/SectionHeaderBlock';
import { Button } from '@/components/UI/Button';
import { Gallery, type GalleryImageInput } from '@/components/UI/Gallery';

export type GalleryCategory = { id: number; name: string };

type GallerySectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  categories?: GalleryCategory[];
  images?: GalleryImageInput[];
};

export const GallerySection: React.FC<GallerySectionProps> = ({
  eyebrow = 'Property Gallery',
  title = 'A curated view of our most exceptional listings.',
  description = 'Explore a selection of residences that showcase the level of design, craftsmanship, and location we represent. Each property is chosen for its unique character, architectural detail, and lifestyle potential.',
  categories = [],
  images = [],
}) => {
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
  const hasCategoryTabs = categories.length > 0;

  return (
    <section className="bg-white py-8 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl flex flex-col items-stretch px-4 md:px-8 lg:px-12">
        <SectionHeaderBlock
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {hasCategoryTabs && (
          <div
            className="mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-4"
            role="tablist"
            aria-label="Filter gallery by collection"
          >
            <Button
              variant={activeFilterId === null ? 'primary' : 'primaryOutline'}
              onClick={() => setActiveFilterId(null)}
            >
              All collections
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  activeFilterId === category.id ? 'primary' : 'primaryOutline'
                }
                onClick={() => setActiveFilterId(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        )}

        <div ref={galleryRef}>
          {hasImages ? (
            <Gallery
              key={activeFilterId ?? 'all'}
              images={filteredImages}
              columns={4}
              itemsPerPage={8}
            />
          ) : (
            <p className="py-12 text-center text-sm text-zinc-500 md:text-base">
              There are no images to display in this collection yet. Please
              check back soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
