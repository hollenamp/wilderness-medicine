/**
 * **CURSOR INFO**
 * SECTION TYPE: Interior page hero with fixed background, title, and breadcrumbs
 * BEST FOR: About, services, and inner pages that need clear hierarchy below the main nav
 * VISUAL STYLE: Modern, minimal, and clean with strong contrast over imagery
 * LAYOUT: Full-width band with centered container; breadcrumb row above large page title
 * CONTENT ELEMENTS: Fixed background image, gradient overlay, breadcrumb trail, H1 page title
 * CONVERSION ROLE: Orient visitors and reinforce site structure before main content
 * IDEAL POSITION: First section on inner pages (below global navigation)
 * NOTES / MODIFIERS: bg-fixed attachment; breadcrumb current page as text only; optional background URL
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type PageHeaderBreadcrumb = {
  label: string;
  /** Omit for the current page (renders as plain text). */
  href?: string;
};

export type PageHeaderProps = {
  title: string;
  breadcrumbs: PageHeaderBreadcrumb[];
  /** CSS background URL, e.g. `url('/images/hero.jpg')` or a path passed to url(). */
  backgroundImage?: string;
};

const DEFAULT_BG = "/images/hero-bg.jpg";

export function PageHeader({
  title,
  breadcrumbs,
  backgroundImage = DEFAULT_BG,
}: PageHeaderProps) {
  const bg =
    backgroundImage.startsWith("url(") ? backgroundImage : `url('${backgroundImage}')`;

  return (
    <section
      aria-labelledby="page-header-title"
      className="relative overflow-hidden bg-zinc-900 bg-cover bg-center bg-no-repeat bg-fixed px-4 pt-42 pb-8 md:pt-52 md:px-8 lg:px-12"
      style={{ backgroundImage: bg }}
    >
      <div className="absolute inset-0 bg-zinc-900/60" aria-hidden />

      <div className="relative z-10 container mx-auto max-w-[1280px]">
        <h1
            id="page-header-title"
            className="text-balance text-3xl font-medium capitalize leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
          >
          {title}
        </h1>
        <nav aria-label="Breadcrumb" className="mb-4 md:mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/85 md:gap-x-3 md:text-base">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-x-2 md:gap-x-3">
                  {index > 0 && (
                    <ChevronRight
                      className="size-4 shrink-0 text-white/50"
                      aria-hidden
                      strokeWidth={2}
                    />
                  )}
                  {!isLast && crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        isLast
                          ? "font-medium text-white"
                          : "font-medium text-white/90"
                      }
                      aria-current={isLast ? "page" : undefined}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        
      </div>
    </section>
  );
}
