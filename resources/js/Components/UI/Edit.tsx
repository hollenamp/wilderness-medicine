import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

import { cx, focusRing } from "@/lib/utils"

const editVariants = tv({
  base: [
    // base
    "relative p-0 m-0 flex items-center justify-center border-0 text-center text-sm font-medium",
    // disabled
    "disabled:pointer-events-none",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      // Add, Create, Plus
      primary: [
        // text color
        "text-zinc-50",
        // background color
        "bg-zinc-900",
        // hover color
        "hover:bg-zinc-900/90",
        // disabled
        "disabled:bg-zinc-900/75 disabled:text-white",
      ],
      primaryOutline: [
        // text color
        "text-zinc-800",
        // background color
        "bg-white",
        // hover color
        "hover:bg-zinc-100",
        // disabled
        "disabled:bg-zinc-50 disabled:text-zinc-400",
      ],
      // Save and Post(submit forms)
      secondary: [
        // text color
        "text-zinc-700",
        // background color
        "bg-white",
        //hover color
        "hover:text-zinc-800/60",
        // disabled
        "disabled:text-zinc-800/50 disabled:border-zinc-900/50",
      ],
      destructive: [
        // text color
        "text-white",
        // border
        "border-transparent",
        // background color
        "bg-red-600 dark:bg-red-700",
        // hover color
        "hover:bg-red-700 dark:hover:bg-red-700",
        // disabled
        "disabled:bg-red-300 disabled:text-white",
        "disabled:dark:bg-red-950 disabled:dark:text-red-950",
      ],
    },
    size: {
      default: [
        // width and height
        "w-8 h-8",
        // padding
        "p-0",
        // text size
        "text-sm",
      ],
      sm: [
        // width and height
        "w-6 h-6",
        // padding
        "p-0",
        // text size
        "text-xs",
      ],
      lg: [
        // width and height
        "w-10 h-10",
        // padding
        "p-0",
        // text size
        "text-base",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

interface EditProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof editVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  size?: "default" | "sm" | "lg"
}

const Edit = React.forwardRef<HTMLButtonElement, EditProps>(
  (
    {
      asChild,
      className,
      variant,
      children,
      size,
      ...props
    }: EditProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        ref={forwardedRef}
        className={cx(
            editVariants({ variant, size }), 
            className
        )}
        {...props}
      >
        { children }
      </Component>
    )
  },
)

Edit.displayName = "Edit"

export { Edit, editVariants, type EditProps }