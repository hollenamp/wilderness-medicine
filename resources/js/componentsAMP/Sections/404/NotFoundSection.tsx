/**
 * **CURSOR INFO**
 * SECTION TYPE: 404 recovery and return-home section
 * BEST FOR: Global not-found pages and invalid route experiences
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Centered single-column content with primary CTA
 * CONTENT ELEMENTS: 404 label, headline, short explanation, home link button
 * CONVERSION ROLE: Recover navigation and guide users back to key entry point
 * IDEAL POSITION: Main content area between global header and footer
 * NOTES / MODIFIERS: Server-safe section, accepts site label for branded messaging
 */

import { Button } from "@/components/UI/Button";

type NotFoundSectionProps = {
  siteLabel: string;
};

export function NotFoundSection({ siteLabel }: NotFoundSectionProps) {
  return (
    <main className="bg-zinc-950 text-zinc-100">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-8 pt-28 text-center md:px-8 md:py-16 md:pt-32 lg:px-12 lg:py-24 lg:pt-36">
        <div className="w-full max-w-3xl border border-zinc-800 bg-zinc-900/80 px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-500">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:mx-auto md:text-lg">
            The page you requested is unavailable. Return to the homepage to
            continue browsing {siteLabel}.
          </p>
          <Button asChild variant="primary" className="mt-8">
            <a href="/">Go to homepage</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
