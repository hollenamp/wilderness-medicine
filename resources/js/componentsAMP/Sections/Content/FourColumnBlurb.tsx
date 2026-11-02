/**
 * **CURSOR INFO**
 * SECTION TYPE: Four-column process steps with icons and copy
 * BEST FOR: Home and service pages explaining how projects move from inquiry to completion
 * VISUAL STYLE: Modern, minimal, professional, and editorial
 * LAYOUT: Centered section title and support line; four equal columns on large screens, stacking on small screens
 * CONTENT ELEMENTS: Section heading, supporting sentence, per-step icon, step index, title, and short description
 * CONVERSION ROLE: Reduce uncertainty by clarifying the build process and setting expectations
 * IDEAL POSITION: Mid-page after credibility or gallery blocks, or before a CTA
 * NOTES / MODIFIERS: Responsive grid; semantic ordered list for steps; icons from lucide-react
 */

import type { ReactNode } from 'react';
import { ClipboardList, FileCheck2, HardHat, KeyRound } from 'lucide-react';
import { IconDivider } from '@/components/UI/IconDivider';
import { ClipboardCheck } from 'lucide-react';

type ProcessStep = {
  id: string;
  stepNumber: string;
  icon: ReactNode;
  title: string;
  description: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discover',
    stepNumber: '01',
    icon: (
      <ClipboardList
        className="text-zinc-100 h-7 w-7 md:h-14 md:w-14 "
        strokeWidth={0.8}
        aria-hidden
      />
    ),
    title: 'Discover & evaluate',
    description:
      'We define objectives, evaluate existing conditions, and clarify scope priorities before any work begins.',
  },
  {
    id: 'design-permit',
    stepNumber: '02',
    icon: (
      <FileCheck2
        className="text-zinc-100 h-7 w-7 md:h-14 md:w-14 "
        strokeWidth={0.9}
        aria-hidden
      />
    ),
    title: 'Plan & coordinate',
    description:
      'Design input, budgeting, sequencing, and consultant coordination are organized into a practical execution roadmap.',
  },
  {
    id: 'build',
    stepNumber: '03',
    icon: (
      <HardHat
        className="text-zinc-100 h-7 w-7 md:h-14 md:w-14 "
        strokeWidth={0.9}
        aria-hidden
      />
    ),
    title: 'Controlled execution',
    description:
      'Trades are managed with disciplined supervision, quality standards, and consistent communication throughout construction.',
  },
  {
    id: 'handoff',
    stepNumber: '04',
    icon: (
      <KeyRound
        className="text-zinc-100 h-7 w-7 md:h-14 md:w-14 "
        strokeWidth={0.9}
        aria-hidden
      />
    ),
    title: 'Close out with confidence',
    description:
      'Final review, documentation, and punch completion deliver a clean handoff and long-term confidence in the work.',
  },
];

export function FourColumnBlurb() {
  return (
    <section
      aria-labelledby="four-column-blurb-title"
      className="bg-zinc-950 py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
    >
      <div className="container mx-auto max-w-[1280px]">
      <IconDivider icon={<ClipboardCheck className="w-15 h-15 p-2"  strokeWidth={0.8}  />} tagline="Our Process" variant="light" />
        <h2
          id="four-column-blurb-title"
          className="max-w-3xl text-3xl font-medium capitalize leading-tight tracking-tight text-white md:text-4xl lg:text-5xl pt-8 md:pt-12"
        >
          A transparent process from first conversation to keys in hand.
        </h2>

        <ol className="mt-12 grid list-none grid-cols-1 gap-10 p-0 md:mt-14 md:grid-cols-2 md:gap-12 lg:mt-16 lg:grid-cols-4 lg:gap-10">
          {PROCESS_STEPS.map((step) => (
            <li key={step.id} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center md:h-16 md:w-16 text-white"
                  aria-hidden
                >
                  {step.icon}
                </div>
                <span className="text-3xl font-bold leading-none md:text-4xl text-transparent [-webkit-text-stroke:1.5px_#FFFFFF]">
                  {step.stepNumber}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white md:text-base">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
