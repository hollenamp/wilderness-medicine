/**
 * **CURSOR INFO**
 * SECTION TYPE: Two-column section with image grid and supporting content
 * BEST FOR: About pages, craftsmanship highlights, and credibility storytelling
 * VISUAL STYLE: Modern, minimal, professional, and editorial
 * LAYOUT: Main two-column layout with nested image grid left and text content right
 * CONTENT ELEMENTS: Image collage, headline, support sentence, paragraph copy, 4-item accordion, and CTA link
 * CONVERSION ROLE: Build trust and move users toward contact or discovery actions
 * IDEAL POSITION: Mid-page after hero or intro sections
 * NOTES / MODIFIERS: Left column uses a 3-image stack plus one full-height image, responsive single-column on mobile
 */

import Image from 'next/image';
import Link from 'next/link';
import { Crown } from 'lucide-react';
import { IconDivider } from '@/components/UI/IconDivider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';

export function TwoColumnGridImages() {
  const whyChooseUsItems = [
    {
      title: "Discovery-driven planning",
      description:
        "Each project begins with discovery to evaluate goals, site conditions, scope priorities, and constraints before construction starts.",
    },
    {
      title: "Preparation before production",
      description:
        "Careful review, practical planning, and thoughtful sequencing help reduce surprises and protect schedule and budget expectations.",
    },
    {
      title: "Technical depth in the field",
      description:
        "Hands-on experience across carpentry, electrical, and plumbing supports better decisions and higher-quality execution on site.",
    },
    {
      title: "Operating Standards of Service",
      description:
        "Plain-language estimates, regular updates, and direct access to project leadership keep communication clear from start to finish.",
    },
  ];

  return (
    <section
      className="bg-zinc-50 py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      aria-labelledby="two-column-grid-images-heading"
    >
      <div className="container mx-auto max-w-[1280px]">
        <IconDivider
          icon={<Crown className="h-15 w-15 p-2" strokeWidth={0.8} />}
          tagline="Why Choose Us"
          variant="primary"
        />

        <div className="grid grid-cols-1 items-stretch gap-8 pt-8 md:pt-12 lg:grid-cols-2 lg:gap-12">
          <div className="grid md:min-h-[32rem] grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="grid hidden md:grid grid-rows-3 gap-4 md:gap-5">
              <div className="relative overflow-hidden rounded-[3px] shadow-sm">
                <Image
                  src="/images/luxury-bedroom.jpg"
                  alt="Built-in storage and interior finish detail"
                  fill
                  sizes="(min-width: 1024px) 220px, 50vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
              <div className="relative overflow-hidden rounded-[3px] shadow-sm">
                <Image
                  src="/images/luxury-interior-02.jpg"
                  alt="Exterior architecture with landscaping"
                  fill
                  sizes="(min-width: 1024px) 220px, 50vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
              <div className="relative overflow-hidden rounded-[3px] shadow-sm">
                <Image
                  src="/images/luxury-interior.jpg"
                  alt="Kitchen and custom millwork details"
                  fill
                  sizes="(min-width: 1024px) 220px, 50vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
            </div>

            <div className="relative min-h-[16rem] overflow-hidden rounded-[3px] shadow-sm md:min-h-0">
              <Image
                src="/images/luxury-property-04.jpg"
                alt="Completed high-end residential project"
                fill
                sizes="(min-width: 1024px) 320px, 50vw"
                className="object-cover"
                quality={80}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-start gap-4 md:gap-6">
            <h2
              id="two-column-grid-images-heading"
              className="text-3xl font-medium capitalize leading-tight tracking-tight text-zinc-900 md:text-4xl lg:text-5xl"
            >
              A Higher Standard of Residential Construction
            </h2>
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-600 md:text-base">
              Built by professionals who understand both construction and reconstruction
            </p>
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
            KC Gregory LLC brings a higher level of oversight and understanding to residential construction and reconstruction. With experience spanning multiple trades and complex project types, we approach each engagement with a focus on preparation, accuracy, and execution. The result is a more controlled process, clearer communication, and outcomes that reflect both technical capability and professional discipline.
            </p>
            <Accordion
              type="single"
              collapsible
              defaultValue="why-choose-us-1"
              className="w-full pt-2"
              aria-label="Why choose us"
            >
              {whyChooseUsItems.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  value={`why-choose-us-${index + 1}`}
                  className="border-zinc-300"
                >
                  <AccordionTrigger className="py-2 text-sm font-semibold uppercase tracking-wide text-zinc-900 hover:text-primary-500 md:text-base [&>svg]:text-zinc-500">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pr-6 text-sm leading-relaxed text-zinc-600 md:text-base">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link
              href="/contact"
              className="inline-flex items-center border-b border-zinc-900 pb-1 text-sm font-semibold uppercase tracking-wide text-zinc-900 transition-colors hover:text-primary-500 hover:border-primary-500 md:text-base"
            >
              Start your project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
