import React from "react";
import type { LucideIcon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cx } from "@/lib/utils";

const blurbVariants = tv({
  base: [
    "bg-zinc-900 text-white flex flex-col text-left",
    "p-8 md:p-10",
    "min-h-0",
    "md:h-full",
  ],
  variants: {
    variant: {
      default: ["bg-zinc-900"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface BlurbProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof blurbVariants> {
  /** Lucide icon component (e.g. Eye, Brain) */
  icon: LucideIcon;
  /** Main title; rendered in primary-400, uppercase */
  title: string;
  /** Optional second part of title rendered in white (e.g. "REHABILITATION" after "LOW VISION") */
  titleSuffix?: string;
  /** Descriptive blurb text below the title */
  blurb: string;
}

const Blurb = React.forwardRef<HTMLDivElement, BlurbProps>(
  (
    {
      className,
      variant,
      icon: Icon,
      title,
      titleSuffix,
      blurb,
      ...props
    }: BlurbProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cx(blurbVariants({ variant }), className)}
        {...props}
      >
        <Icon
          className="h-12 w-12 md:h-14 md:w-14 text-white mb-6 shrink-0"
          strokeWidth={1.5}
          aria-hidden
        />
        <h3 className="font-bold text-xl md:text-2xl uppercase tracking-tight leading-snug mb-4">
          <span className="text-primary-400">{title}</span>
          {titleSuffix != null && titleSuffix !== "" && (
            <span className="text-white"> {titleSuffix}</span>
          )}
        </h3>
        <p className="text-base md:text-lg text-white font-normal leading-relaxed">
          {blurb}
        </p>
      </div>
    );
  },
);

Blurb.displayName = "Blurb";

export { Blurb, blurbVariants };
export type { BlurbProps };
