'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Property image gallery (category filters disabled for now)
 * BEST FOR: Homepages and portfolio pages that showcase luxury real estate work
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Centered heading above a responsive image grid gallery
 * CONTENT ELEMENTS: Section title, description, image gallery with lightbox
 * CONVERSION ROLE: Build trust through visual proof of quality and style
 * IDEAL POSITION: Middle of the page after featured properties and before testimonials or contact
 * NOTES / MODIFIERS: Uses shared Gallery UI component, responsive, keyboard-accessible, supports lightbox and pagination; trip-style filters can be re-enabled later
 */

import React from 'react';

import { SectionHeaderBlock } from '@/components/Blocks/SectionHeaderBlock';
import { Gallery, type GalleryImageInput } from '@/components/UI/Gallery';

/** All images in `public/images/gallery/` (gallery-01.webp … gallery-25.webp). */
const GALLERY_IMAGE_COUNT = 24;

const galleryImages: GalleryImageInput[] = Array.from(
  { length: GALLERY_IMAGE_COUNT },
  (_, index) => {
    const id = index + 1;
    const num = String(id).padStart(2, '0');
    return {
      id,
      url: `/images/gallery/gallery-${num}.webp`,
      alt_text: `Island Adventure Charters, Galveston trip photo ${id}`,
    };
  },
);

export const GallerySection: React.FC = () => {
  const hasImages = galleryImages.length > 0;

  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-floral-50 py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-stretch">
        <SectionHeaderBlock
          eyebrow="On the water"
          title="Moments from Galveston trips."
          description="Real moments from bay, jetty, nearshore, and family days on the water with Island Adventure Charters."
        />

        <div>
          {hasImages ? (
            <Gallery
              images={galleryImages}
              columns={4}
              itemsPerPage={8}
            />
          ) : (
            <p className="py-12 text-center text-sm text-zinc-500 md:text-base">
              Photos are coming soon. Please check back later.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

