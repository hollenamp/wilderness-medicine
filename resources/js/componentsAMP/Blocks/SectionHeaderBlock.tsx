'use client';

/**
 * **CURSOR INFO**
 * BLOCK TYPE: Centered section header with eyebrow label, title, and description
 * BEST FOR: Section intros that need a consistent heading + supporting copy (e.g. gallery, services, features)
 * VISUAL STYLE: Modern, minimal, clean, text-centered
 * LAYOUT: Single centered column; eyebrow above title, description below
 * CONTENT ELEMENTS: Eyebrow (small uppercase label), title (h3), description paragraph
 * REUSE: Use wherever a section needs a standardized intro block; content passed via props
 * NOTES / MODIFIERS: No rounded corners; responsive typography; optional className for wrapper
 */

import React from 'react';

export interface SectionHeaderBlockProps {
  /** Small uppercase label above the title (e.g. "Property Gallery") */
  eyebrow: string;
  /** Main section title */
  title: string;
  /** Supporting description paragraph below the title */
  description: string;
  /** Optional class for the outer wrapper div */
  className?: string;
}

export const SectionHeaderBlock: React.FC<SectionHeaderBlockProps> = ({
  eyebrow,
  title,
  description,
  className = '',
}) => {
  return (
    <div
      className={[ 'mb-8 text-center md:mb-12 lg:mb-16', className ].filter(Boolean).join(' ')}
      role="presentation"
    >
      <header>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {eyebrow}
        </h2>
        <h3 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
          {title}
        </h3>
      </header>
      <p className="mt-4 text-sm text-zinc-600 md:text-base md:leading-relaxed">
        {description}
      </p>
    </div>
  );
};
