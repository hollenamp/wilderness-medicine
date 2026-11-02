'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Two-column split with stats and imagery
 * BEST FOR: Landing pages, credibility and portfolio highlights
 * VISUAL STYLE: Modern, minimal, professional, and clean
 * LAYOUT: Copy left; right split into tall image card and stacked image with stat blocks
 * CONTENT ELEMENTS: Headline, supporting line, body copy, CTA, images, animated metrics
 * CONVERSION ROLE: Build trust with proof points and invite deeper exploration
 * IDEAL POSITION: Mid-page after intro or about content
 * NOTES / MODIFIERS: Intersection-triggered count-up animations, responsive stack on small screens
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { HousePlus } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { IconDivider } from '@/components/UI/IconDivider';

function useCountUp(end: number, enabled: boolean, durationMs = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now();
    let frame = 0;

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(Math.round(easeOutCubic(progress) * end));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, enabled, durationMs]);

  return value;
}

function useInViewTrigger(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active };
}

export function TwoColumnRightImageGrid() {
  const { ref: statsRef, active: statsActive } = useInViewTrigger(0.12);
  const count200 = useCountUp(200, statsActive);
  // const count300 = useCountUp(300, statsActive);
  const countUpTo = useCountUp(25, statsActive);

  return (
    <section
      className="bg-zinc-50 py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      aria-labelledby="two-column-right-images-heading"
    >
      <div className="container max-w-[1280px] mx-auto">
        <IconDivider icon={<HousePlus className="w-15 h-15 p-2"  strokeWidth={0.8}  />} tagline="About Us" variant="primary" />
        <div className="grid grid-cols-1 gap-8 items-stretch pt-8 md:pt-12 lg:grid-cols-2 lg:gap-12 "> 
          <div className="flex flex-col justify-start items-start gap-4 md:gap-6">
            <h2 className="mb-0 text-3xl font-medium capitalize leading-tight tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
            Experience That Informs Every Decision
            </h2>
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-600 md:text-base">
            Premium execution for selective residential projects
            </p>
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
            KC Gregory LLC was developed as a specialized platform for premium residential construction and reconstruction, expanding on a long-standing foundation in the building industry. With over 25 years of experience behind every project, the focus is not just on building—but on understanding, evaluating, and executing with intention. Each project is approached with a disciplined process that prioritizes planning, coordination, and clear communication, resulting in a more controlled and predictable outcome from start to finish.
            </p>
            <div className="pt-2">
                  <Button asChild variant="primary" className="w-full sm:w-auto">
                    <a href="/contact">Discuss your project</a>
                  </Button>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8 min-h-[28rem] lg:min-h-[32rem]">
            <div className="flex flex-col overflow-hidden">
              <div className="relative min-h-[220px] flex-1 ">
                <Image
                  src="/images/luxury-interior-02.jpg"
                  alt="Completed construction project exterior"
                  fill
                  sizes="(min-width: 1024px) 400px, 50vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
              <div className=" px-4 py-4 md:px-5 md:py-5">
                
                <p className="mt-1 text-base font-semibold uppercase tracking-wide text-zinc-900 md:text-lg">
                  <span className="tabular-nums">{count200}</span>+ Projects Done
                </p>
              </div>
            </div>

            <div className="flex h-full min-h-0 flex-col gap-4 md:gap-5">
              <div className="relative min-h-[11rem] shrink-0 overflow-hidden border border-zinc-200 bg-white shadow-sm md:h-1/2 md:min-h-0">
                <Image
                  src="/images/luxury-interior.jpg"
                  alt="Interior craftsmanship detail"
                  fill
                  sizes="(min-width: 1024px) 400px, 50vw"
                  className="object-cover"
                  quality={80}
                />
              </div>

              <p className="shrink-0 text-left text-base font-semibold uppercase tracking-wide text-zinc-900 md:text-lg ps-4 md:ps-5">
                Complex Reconstruction
              </p>

              <div className="flex flex-1 flex-col justify-center border border-zinc-200 bg-white px-6 py-8 text-center shadow-sm md:px-8 md:py-10 md:text-left">
                <p className="text-5xl font-medium tabular-nums tracking-tight text-zinc-900 md:text-6xl lg:text-7xl">
                  {countUpTo}+
                </p>
                <p className="mt-2 text-base font-medium uppercase tracking-wide text-zinc-500 md:text-sm">
                  years of experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
