import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tv } from "tailwind-variants";

import { cx } from "@/lib/utils";

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024 } as const;

function getColumnsForWidth(
  w: number,
  responsive: { sm?: 1 | 2 | 3; md?: 1 | 2 | 3; lg?: 1 | 2 | 3 },
  fallback: 1 | 2 | 3,
): 1 | 2 | 3 {
  if (w >= BREAKPOINTS.lg && responsive.lg != null) return responsive.lg;
  if (w >= BREAKPOINTS.md && responsive.md != null) return responsive.md;
  if (w >= BREAKPOINTS.sm && responsive.sm != null) return responsive.sm;
  return responsive.sm ?? fallback;
}

function useResponsiveColumns(
  responsive?: { sm?: 1 | 2 | 3; md?: 1 | 2 | 3; lg?: 1 | 2 | 3 },
  fallback: 1 | 2 | 3 = 1,
): 1 | 2 | 3 {
  // Always use fallback for initial state so server and client render the same (avoids hydration mismatch)
  const [columns, setColumns] = useState<1 | 2 | 3>(fallback);

  useEffect(() => {
    if (!responsive) return;

    const update = () =>
      setColumns(getColumnsForWidth(window.innerWidth, responsive, fallback));

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [responsive, fallback]);

  return responsive ? columns : fallback;
}

const carouselIndicatorVariants = tv({
  base: "shrink-0 transition-colors duration-200",
  variants: {
    active: {
      true: "bg-zinc-700",
      false: "bg-zinc-300",
    },
  },
  defaultVariants: {
    active: false,
  },
});

type ResponsiveColumns = { sm?: 1 | 2 | 3; md?: 1 | 2 | 3; lg?: 1 | 2 | 3 };

interface CarouselProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  children: React.ReactNode;
  autoRotateInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  defaultIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
  /** Columns: number or responsive { sm, md, lg }. e.g. { sm: 1, md: 2, lg: 3 } */
  columns?: 1 | 2 | 3 | ResponsiveColumns;
  controlTone?: "zinc" | "brand";
  prevAriaLabel?: string;
  nextAriaLabel?: string;
}

function isResponsiveColumns(
  c: 1 | 2 | 3 | ResponsiveColumns,
): c is ResponsiveColumns {
  return typeof c === "object" && c !== null;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      autoRotateInterval = 6000,
      showIndicators = true,
      showControls = true,
      defaultIndex = 0,
      index: controlledIndex,
      onIndexChange,
      columns = 1,
      controlTone = "zinc",
      prevAriaLabel = "Previous slide",
      nextAriaLabel = "Next slide",
      className,
      ...props
    }: CarouselProps,
    forwardedRef,
  ) => {
    const isControlled = controlledIndex !== undefined;
    const responsive = isResponsiveColumns(columns) ? columns : undefined;
    const staticColumns = !isResponsiveColumns(columns) ? columns : 1;
    const columnsResolved = useResponsiveColumns(
      responsive,
      typeof columns === "number" ? columns : 1,
    );
    const slidesPerView = responsive ? columnsResolved : staticColumns;
    const isMultiColumn = slidesPerView > 1;

    const rawSlides = React.Children.toArray(children);

    // Single-card slide mode: track with duplicated slides for seamless loop
    const totalSlides = rawSlides.length;
    const trackSlides =
      isMultiColumn && totalSlides > slidesPerView
        ? [...rawSlides, ...rawSlides.slice(0, slidesPerView)]
        : rawSlides;
    const [internalStep, setInternalStep] = useState(defaultIndex);
    const step = isControlled ? controlledIndex : internalStep;
    const skipTransitionRef = useRef(false);
    const [isHovered, setIsHovered] = useState(false);

    const updateStep = useCallback(
      (next: number | ((prev: number) => number)) => {
        const resolved =
          typeof next === "function"
            ? next(isControlled ? controlledIndex! : internalStep)
            : next;

        if (!isControlled) {
          setInternalStep(resolved);
        }

        onIndexChange?.(resolved);
      },
      [controlledIndex, internalStep, isControlled, onIndexChange],
    );

    const goToNext = useCallback(() => {
      if (isMultiColumn && totalSlides > slidesPerView) {
        updateStep((prev) => (prev >= totalSlides ? 0 : prev + 1));
      } else {
        updateStep((prev) => (prev + 1) % totalSlides);
      }
    }, [isMultiColumn, totalSlides, slidesPerView, updateStep]);

    const goToPrev = useCallback(() => {
      if (isMultiColumn && totalSlides > slidesPerView) {
        updateStep((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
      } else {
        updateStep((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }, [isMultiColumn, totalSlides, slidesPerView, updateStep]);

    const handleAnimationComplete = useCallback(() => {
      if (step === totalSlides) {
        skipTransitionRef.current = true;
        updateStep(0);
      }
    }, [step, totalSlides, updateStep]);

    useEffect(() => {
      if (step === 0 && skipTransitionRef.current) {
        skipTransitionRef.current = false;
      }
    }, [step]);

    useEffect(() => {
      if (totalSlides <= 1 || autoRotateInterval <= 0 || isHovered) return;
      const timer = setInterval(goToNext, autoRotateInterval);
      return () => clearInterval(timer);
    }, [autoRotateInterval, goToNext, totalSlides, isHovered]);

    const gridColsClass = responsive
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"
      : {
          1: "",
          2: "grid grid-cols-1 sm:grid-cols-2 items-stretch",
          3: "grid grid-cols-1 md:grid-cols-3 items-stretch",
        }[slidesPerView];

    // Translate by one card width per step (each card = 100/trackSlides.length of track)
    const translatePercent =
      isMultiColumn && totalSlides > slidesPerView
        ? -(step * (100 / trackSlides.length))
        : 0;

    const displayPages = Math.ceil(totalSlides / slidesPerView) || 1;
    const activeIndicator = step % displayPages;
    const isBrandControls = controlTone === "brand";
    const controlClassName = isBrandControls
      ? "shrink-0 p-2 text-charcoal-brown-700 transition-colors hover:text-tea-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 rounded-none"
      : "shrink-0 p-2 text-zinc-600 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-none transition-colors";
    const nextControlClassName = isBrandControls
      ? "shrink-0 p-2 text-tea-green-500 transition-colors hover:text-forest-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 rounded-none"
      : controlClassName;

    return (
      <div
        ref={forwardedRef}
        className={cx("relative overflow-hidden", className)}
        tremor-id="tremor-raw"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div className="relative flex items-center gap-2">
          {showControls && displayPages > 1 && (
            <button
              type="button"
              onClick={goToPrev}
              aria-label={prevAriaLabel}
              className={controlClassName}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
            </button>
          )}
          <div className="relative flex-1 min-w-0">
          {isMultiColumn && totalSlides > slidesPerView ? (
            <div className="overflow-hidden">
              <motion.div
                className="grid md:gap-4 xl:gap-8 items-stretch"
                style={{
                  width: `${(trackSlides.length / slidesPerView) * 100}%`,
                  gridTemplateColumns: `repeat(${trackSlides.length}, 1fr)`,
                }}
                animate={{ x: `${translatePercent}%` }}
                transition={{
                  duration: skipTransitionRef.current ? 0 : 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onAnimationComplete={handleAnimationComplete}
              >
                {trackSlides.map((slide, i) => (
                  <div key={i} className="min-w-0 h-full">
                    {slide}
                  </div>
                ))}
              </motion.div>
            </div>
          ) : isMultiColumn ? (
            <div className={gridColsClass}>
              {rawSlides
                .slice(0, slidesPerView)
                .map((slide, i) => (
                  <React.Fragment key={i}>{slide}</React.Fragment>
                ))}
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {rawSlides[step % totalSlides]}
              </motion.div>
            </AnimatePresence>
          )}
          </div>
          {showControls && displayPages > 1 && (
            <button
              type="button"
              onClick={goToNext}
              aria-label={nextAriaLabel}
              className={nextControlClassName}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {showIndicators && displayPages > 1 && (
          <div className="flex justify-center gap-3 mt-12" role="tablist" aria-label="Carousel navigation">
            {Array.from({ length: displayPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeIndicator}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => updateStep(index)}
                className={cx(
                  "w-3 h-3 rounded-full",
                  carouselIndicatorVariants({
                    active: index === activeIndicator,
                  }),
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

Carousel.displayName = "Carousel";

interface CarouselItemProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={cx("w-full h-full min-h-0", className)}
      {...props}
    >
      {children}
    </div>
  ),
);

CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselItem, carouselIndicatorVariants };
export type { CarouselProps, CarouselItemProps };
