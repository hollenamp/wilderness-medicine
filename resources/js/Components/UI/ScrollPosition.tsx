import { motion, useScroll } from "framer-motion";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "@/lib/utils";

const scrollPositionVariants = tv({
  base: ["h-full w-full origin-left"],
  variants: {
    variant: {
      primary: ["bg-primary-500"],
      secondary: ["bg-secondary"],
      default: ["bg-zinc-500"],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ScrollPositionProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof scrollPositionVariants> {}

function ScrollPosition({
  className,
  variant,
  ...props
}: ScrollPositionProps) {
  const { scrollYProgress } = useScroll();

  return (
    <div
      className={cx(
        "fixed top-0 left-0 right-0 z-50 h-0.5 overflow-hidden",
        className
      )}
      {...props}
    >
      <motion.div
        className={scrollPositionVariants({ variant })}
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

export default ScrollPosition;
