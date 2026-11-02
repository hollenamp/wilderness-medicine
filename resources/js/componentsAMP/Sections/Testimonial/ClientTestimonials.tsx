"use client";

/**
 * **CURSOR INFO**
 * SECTION TYPE: Testimonials carousel
 * BEST FOR: Landing pages, about pages, social proof
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Centered header, responsive carousel (1–3 columns)
 * CONTENT ELEMENTS: Section headline, testimonial cards (quote, stars, name)
 * CONVERSION ROLE: Social proof, build trust
 * IDEAL POSITION: Middle to before footer
 * NOTES / MODIFIERS: Auto-rotate carousel, motion on scroll
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Carousel, CarouselItem } from "@/components/UI/Carousel";
import { TestimonialCard } from "@/components/UI/TestimonialCard";

export function ClientTestimonials() {
  type TestimonialItem = {
    testimonial: string;
    starRating?: number;
    name?: string;
    avatar?: string;
    date?: string;
  };

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadTestimonials = async () => {
      try {
        setErrorMessage(null);

        // Always use the PHP proxy (served from `public_html/api/google-reviews.php`).
        // This keeps the AMP API key server-side.
        const bust = `?t=${Date.now()}`;
        const res = await fetch(`/api/google-reviews.php${bust}`, { cache: "no-store" });

        if (!res.ok) {
          setErrorMessage(`Failed to load reviews (HTTP ${res.status}).`);
          return;
        }

        const data = (await res.json()) as {
          reviews?: Array<{
            author_name?: string;
            profile_photo_url?: string;
            rating?: number;
            relative_time_description?: string;
            text?: string;
          }>;
        };

        const reviews = Array.isArray(data.reviews) ? data.reviews : [];
        if (reviews.length === 0) {
          setErrorMessage("No reviews returned from the API.");
          return;
        }

        const mapped: TestimonialItem[] = reviews
          .map((r) => ({
            testimonial: typeof r.text === "string" ? r.text : "",
            starRating:
              typeof r.rating === "number" && !Number.isNaN(r.rating)
                ? Math.max(1, Math.min(5, Math.round(r.rating)))
                : undefined,
            name: r.author_name,
            avatar: r.profile_photo_url,
            date: r.relative_time_description,
          }))
          .filter((t) => t.testimonial.trim().length > 0);

        if (!cancelled && mapped.length > 0) {
          setTestimonials(mapped);
        }
      } catch {
        // No hardcoded fallback: keep testimonials empty on any error.
        if (!cancelled) setTestimonials([]);
        if (!cancelled) setErrorMessage("Failed to load reviews.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadTestimonials();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-zinc-900 text-white overflow-hidden">
      <section className="container mx-auto py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-tight mb-8">Results</h2>
          <p className="text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
          Serving 100,000+ residents weekly.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center text-zinc-400 mt-12">Loading reviews...</div>
        ) : testimonials.length > 0 ? (
          <Carousel
            columns={{ sm: 1, md: 2, lg: 3 }}
            autoRotateInterval={6000}
          >
            {testimonials.map((t, idx) => (
              <CarouselItem key={`${t.name ?? "anon"}-${idx}`}>
                <TestimonialCard
                  variant="default"
                  testimonial={t.testimonial}
                  starRating={t.starRating}
                  name={t.name}
                  avatar={t.avatar}
                  date={t.date}
                />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <div className="text-center text-zinc-400 mt-12">
            {errorMessage ?? "No reviews available."}
          </div>
        )}
      </section>
    </div>
  );
}
