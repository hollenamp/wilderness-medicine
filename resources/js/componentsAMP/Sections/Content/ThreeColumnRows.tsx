/**
 * **CURSOR INFO**
 * SECTION TYPE: Three-column service rows with icon, image, and copy
 * BEST FOR: Landing pages, services highlights, capability breakdowns
 * VISUAL STYLE: Modern, minimal, professional, and clean
 * LAYOUT: IconDivider header; title and CTA row; repeated three-column rows (icon/title, image, description + link)
 * CONTENT ELEMENTS: IconDivider, section title, primary CTA, per-row icon, service title, image, blurb, text link
 * CONVERSION ROLE: Explain offerings and route visitors to deeper content or contact
 * IDEAL POSITION: Mid-page after intro, about, or hero content
 * NOTES / MODIFIERS: Stacks to a single column on small screens; equal-width columns from md breakpoint up
 */

import type { ReactNode } from "react";
import Image from "next/image";
import { Hammer, Home, HousePlus, Paintbrush } from "lucide-react";
import { Button } from "@/components/UI/Button";
import { IconDivider } from "@/components/UI/IconDivider";
import Link from "next/link";  

type ServiceRow = {
  id: string;
  icon: ReactNode;
  serviceTitle: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  moreHref: string;
  moreLabel: string;
};

const SERVICE_ROWS: ServiceRow[] = [
  {
    id: "service-row-1",
    icon: (
      <HousePlus
        className="h-8 w-8 text-primary-500 p-1 md:h-9 md:w-9"
        strokeWidth={0.85}
        aria-hidden
      />
    ),
    imageSrc: "/images/luxury-home.jpg",
    imageAlt: "Accessory dwelling unit exterior and yard",
    description:
      "Accessory dwelling units planned around zoning, utilities, and permitting so new space is practical, code-aligned, and built for long-term value.",
    moreHref: "#",
    moreLabel: "Learn more",
    serviceTitle: "Accessory dwelling units",
  },
  {
    id: "service-row-2",
    icon: (
      <Paintbrush
        className="h-8 w-8 text-primary-500 p-1 md:h-9 md:w-9"
        strokeWidth={0.85}
        aria-hidden
      />
    ),
    imageSrc: "/images/luxury-bedroom.jpg",
    imageAlt: "Renovated interior with refined finishes",
    description:
      "Renovations and restoration managed with clear phasing, quality controls, and thoughtful sequencing to reduce disruption in occupied homes.",
    moreHref: "#",
    moreLabel: "Read more",
    serviceTitle: "Renovation and restoration",
  },
  {
    id: "service-row-3",
    icon: (
      <Home
        className="h-8 w-8 text-primary-500 p-1 md:h-9 md:w-9"
        strokeWidth={0.85}
        aria-hidden
      />
    ),
    imageSrc: "/images/hero-bg.jpg",
    imageAlt: "Custom residence under construction",
    description:
      "Custom residential construction delivered with documented milestones, disciplined trade coordination, and finish quality expected on premium projects.",
    moreHref: "#",
    moreLabel: "Learn more",
    serviceTitle: "Custom residential construction",
  },
];

export function ThreeColumnRows() {
  return (
    <section
      className="bg-zinc-100 py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      aria-labelledby="three-column-rows-heading"
    >
      <div className="container mx-auto max-w-[1280px]">
        <IconDivider
          icon={
            <Hammer className="h-15 w-15 p-2" strokeWidth={0.8} aria-hidden />
          }
          tagline="Core Services"
          variant="primary"
        />

        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-end sm:justify-between md:pt-12">
          <h2
            id="three-column-rows-heading"
            className="mb-0 max-w-3xl text-3xl font-medium capitalize leading-tight tracking-tight text-zinc-900 md:text-4xl lg:text-5xl"
          >
            Premium and specialty construction services
          </h2>
          <div className="shrink-0 pt-1 sm:pt-0">
            <Button asChild variant="primary" className="w-full sm:w-auto">
              <Link href="/contact">Request a consultation</Link>
            </Button>
          </div>
        </div>

        <ul className="flex list-none flex-col pt-12 gap-12 p-0 md:mt-14 md:gap-16 lg:gap-20">
          {SERVICE_ROWS.map((row) => (
            <li key={row.id}>
              <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3 md:gap-8 lg:gap-12">
                <div className="flex flex-col items-start gap-3 text-center md:items-start md:justify-start md:text-left">
                  <div className="flex shrink-0 items-start justify-start" aria-hidden>
                    {row.icon}
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900 md:text-base">
                    {row.serviceTitle}
                  </h3>
                </div>

                <div className="relative min-h-[200px] w-full overflow-hidden shadow-sm md:min-h-[220px]">
                  <Image
                    src={row.imageSrc}
                    alt={row.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>

                <div className="flex flex-col justify-start gap-4 md:gap-5">
                  <p className="m-0 text-base leading-relaxed text-zinc-700 md:text-lg">
                    {row.description}
                  </p>
                  <Link
                    href={row.moreHref}
                    className="inline-flex w-fit text-sm font-semibold uppercase tracking-wide text-primary-500 underline-offset-4 transition-colors hover:text-primary-600 hover:underline"
                  >
                    {row.moreLabel}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
