'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Property image gallery with category filters
 * BEST FOR: Homepages and portfolio pages that showcase luxury real estate work
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Centered heading with filter row above a responsive image grid gallery
 * CONTENT ELEMENTS: Section title, description, filter buttons, image gallery with lightbox
 * CONVERSION ROLE: Build trust through visual proof of quality and style
 * IDEAL POSITION: Middle of the page after featured properties and before testimonials or contact
 * NOTES / MODIFIERS: Uses shared Gallery UI component, responsive, keyboard-accessible, supports lightbox and pagination
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { SectionHeaderBlock } from '@/components/Blocks/SectionHeaderBlock';
import { Button } from '@/components/UI/Button';
import { Gallery, type GalleryImageInput } from '@/components/UI/Gallery';

const galleryCategories: Array<{ id: number; name: string }> = [
  { id: 1, name: 'Penthouses' },
  { id: 2, name: 'Waterfront Estates' },
  { id: 3, name: 'Modern Villas' },
  { id: 4, name: 'Historic Residences' },
];

const galleryImages: GalleryImageInput[] = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Sunlit penthouse living room with city skyline views',
    gallery_ids: [1],
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Infinity pool overlooking the ocean at a waterfront estate',
    gallery_ids: [2],
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Modern villa exterior with clean lines and glass facade',
    gallery_ids: [3],
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Historic townhouse with classic stonework and grand entry',
    gallery_ids: [4],
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Open-concept penthouse kitchen and dining area',
    gallery_ids: [1, 3],
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Waterfront terrace with lounge seating at sunset',
    gallery_ids: [2],
  },
  {
    id: 7,
    url: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Minimalist bedroom with floor-to-ceiling windows',
    gallery_ids: [1, 3],
  },
  {
    id: 8,
    url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Restored historic residence with manicured gardens',
    gallery_ids: [2, 4],
  },
  {
    id: 9,
    url: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Luxury living room with marble finishes and art pieces',
    gallery_ids: [1, 3, 4],
  },
  {
    id: 10,
    url: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt_text: 'Terrace dining area overlooking a private harbor',
    gallery_ids: [2],
  },
];

export const FourColumnImageFilter: React.FC = () => {
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
    if (activeFilterId === null) return galleryImages;
    return galleryImages.filter((image) =>
      image.gallery_ids?.includes(activeFilterId),
    );
  }, [activeFilterId]);

  const hasImages = filteredImages.length > 0;

  return (
    <section className="bg-white py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch">
        <SectionHeaderBlock
          eyebrow="Property Gallery"
          title="A curated view of our most exceptional listings."
          description="Explore a selection of residences that showcase the level of design, craftsmanship, and location we represent. Each property is chosen for its unique character, architectural detail, and lifestyle potential."
        />

        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          role="tablist"
          aria-label="Filter properties by collection"
        >
          <Button
            variant={activeFilterId === null ? 'primary' : 'primaryOutline'}
            size="sm"
            onClick={() => setActiveFilterId(null)}
          >
            All collections
          </Button>
          {galleryCategories.map((category) => (
            <Button
              key={category.id}
              variant={
                activeFilterId === category.id ? 'primary' : 'primaryOutline'
              }
              size="sm"
              onClick={() => setActiveFilterId(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

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
            There are no properties to display in this collection yet. Please
            check back soon.
          </p>
        )}
        </div>
      </div>
    </section>
  );
};

