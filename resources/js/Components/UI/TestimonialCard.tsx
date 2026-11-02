import React, { useEffect, useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cx } from "@/lib/utils";

const testimonialCardVariants = tv({
  base: [
    "bg-white text-zinc-700 p-6 md:p-8 lg:p-10 flex flex-col",
    "border border-zinc-200",
    "min-h-0",
    "md:h-full md:overflow-visible",
  ],
  variants: {
    variant: {
      default: [
        "bg-white",
      ],
      parchment: [
        "bg-parchment-50",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TestimonialCardProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof testimonialCardVariants> {
  /** The testimonial text content */
  testimonial: string;
  /** Star rating (1-5) */
  starRating?: number;
  /** Optional title/summary text */
  title?: string;
  /** Optional date string */
  date?: string;
  /** Optional avatar image URL */
  avatar?: string;
  /** Optional name of the person giving the testimonial */
  name?: string;
  /** Character limit before showing expand link (default: 200) */
  maxLength?: number;
}

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  (
    {
      className,
      variant,
      testimonial,
      starRating,
      title,
      date,
      avatar,
      name,
      maxLength = 200,
      ...props
    }: TestimonialCardProps,
    forwardedRef,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);

    useEffect(() => {
      setAvatarFailed(false);
    }, [avatar]);
    
    // Get first letter of name for avatar fallback, or use "?" if no name
    const avatarInitial = name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?";

    // Determine if testimonial exceeds max length
    const exceedsMaxLength = testimonial.length > maxLength;
    const displayText = exceedsMaxLength && !isExpanded
      ? `${testimonial.slice(0, maxLength)}...`
      : testimonial;

    return (
      <div
        ref={forwardedRef}
        className={cx(
          testimonialCardVariants({ variant }),
          isExpanded && "h-auto overflow-hidden",
          !isExpanded && "h-[320px] overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Header: Avatar, Name, Date */}
        {(avatar || name || date) && (
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              {avatar && !avatarFailed ? (
                <img
                  src={avatar}
                  alt={name ? `Profile photo of ${name}` : "Client avatar"}
                  className="w-12 h-12 object-cover"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "";
                    setAvatarFailed(true);
                  }}
                />
              ) : name ? (
                <div className="flex-none w-12 h-12 flex items-center justify-center bg-zinc-800 text-white text-sm font-semibold">
                  <span>{avatarInitial}</span>
                </div>
              ) : null}
              {name && (
                <div className="grow flex flex-col">
                  <p className="text-base font-normal text-zinc-700">{name}</p>
                </div>
              )}
            </div>
            {date && (
              <p className="text-sm font-normal text-zinc-400">{date}</p>
            )}
          </div>
        )}

        {/* Star Rating */}
        {starRating !== undefined && starRating > 0 && (
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cx(
                  "w-5 h-5",
                  index < starRating
                    ? "fill-[#C7AE7F] text-[#C7AE7F]"
                    : "fill-zinc-200 text-zinc-200",
                )}
                strokeWidth={1.5}
              />
            ))}
          </div>
        )}

        {/* Title */}
        {title && (
          <p className="text-base font-semibold text-zinc-700 mb-4">{title}</p>
        )}

        {/* Testimonial Text + Fade + Expand */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <p className="text-base font-light leading-relaxed pr-0 pb-2">
              &ldquo;{displayText}&rdquo;
            </p>
            {/* Gradient fade overlay when collapsed (matches card bg) */}
            {exceedsMaxLength && !isExpanded && (
              <div
                className={cx(
                  "absolute inset-x-0 bottom-0 h-20 pointer-events-none",
                  variant === "parchment"
                    ? "bg-gradient-to-t from-parchment-50 to-transparent"
                    : "bg-gradient-to-t from-white to-transparent"
                )}
                aria-hidden
              />
            )}
          </div>
          {exceedsMaxLength && (
            <div
              className={cx(
                "mt-auto -mx-6 -mb-6 md:-mx-8 md:-mb-8 lg:-mx-10 lg:-mb-10",
                "transition-colors bg-gradient-to-t from-zinc-100 hover:from-zinc-200 to-transparent"
              )}
            >
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={cx(
                  "w-full flex items-center justify-center gap-2 py-4 transition-colors",
                  "text-sm font-normal text-zinc-400 hover:text-zinc-500 tracking-wide"
                )}
              >
                {isExpanded ? "Show less" : "Expand"}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard, testimonialCardVariants };
export type { TestimonialCardProps };
