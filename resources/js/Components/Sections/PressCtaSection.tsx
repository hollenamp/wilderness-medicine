/**
 * **CURSOR INFO**
 * SECTION TYPE: Compact press announcement CTA
 * BEST FOR: Home page Fox TV / media mentions that send visitors to free lessons
 * VISUAL STYLE: Charcoal band, tea-green labels, centered type
 * LAYOUT: Centered heading, inline HERE link in the body, tagline underneath
 * CONTENT ELEMENTS: Two-line heading, click-here sentence, tagline, resource link
 * CONVERSION ROLE: Drive visitors to the TV lesson and free survival/hiking tips
 * IDEAL POSITION: Directly after the home hero
 * NOTES / MODIFIERS: Compact charcoal band with reduced vertical padding; no heading bar; HERE links to /resource; original /seen-tv URL redirects there
 */

import { Link } from '@inertiajs/react';

type PressCtaSectionProps = {
    heading?: string;
    headingLine2?: string;
    ctaPrefix?: string;
    ctaLabel?: string;
    ctaSuffix?: string;
    ctaHref?: string;
    tagline?: string;
    id?: string;
};

export function PressCtaSection({
    heading = 'Fox TV !!',
    headingLine2 = 'Carl as seen on several TV Feature Sessions',
    ctaPrefix = 'Click',
    ctaLabel = 'HERE',
    ctaSuffix = 'for TV lesson, download "Car Survival Tips" and "Safe Hiking Tips"',
    ctaHref = '/resource',
    tagline = 'wilderness medicine training since 1967',
    id = 'seen-on-tv',
}: PressCtaSectionProps) {
    return (
        <section id={id} className="bg-charcoal-brown-900 py-4 md:py-8 lg:py-12">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center md:gap-6 md:px-8 lg:px-12">
                <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight text-white md:text-3xl lg:text-3xl">
                    <span className="block">{heading}</span>
                    {headingLine2 ? <span className="block">{headingLine2}</span> : null}
                </h2>
                <p className="max-w-3xl text-base font-light leading-relaxed text-zinc-100 md:text-lg">
                    {ctaPrefix} [{' '}
                    <Link
                        href={ctaHref}
                        className="font-semibold text-tea-green-400 underline decoration-2 underline-offset-4 transition-colors hover:text-tea-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-brown-900"
                    >
                        {ctaLabel}
                    </Link>
                    {' '}] {ctaSuffix}
                </p>
                {tagline ? (
                    <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-400 md:text-sm">
                        {tagline}
                    </p>
                ) : null}
            </div>
        </section>
    );
}
