// Tremor Button [v0.2.0]

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { RiLoader2Fill } from "@remixicon/react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx, focusRing } from "@/lib/utils"

const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-center text-sm font-medium shadow-sm transition-all duration-100 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      // Add, Create, Plus — colors come from app.css / admin.css theme tokens
      primary: [
        // border
        "border-primary-700 dark:border-zinc-800",
        // text color
        "text-primary-foreground dark:text-primary-foreground",
        // background color
        "bg-primary-500 dark:bg-primary-500",
        // hover color
        "hover:bg-primary-600 dark:hover:bg-primary-600",
        // disabled
        "disabled:bg-primary-300 disabled:text-primary-foreground",
        "disabled:dark:bg-primary-800 disabled:dark:text-primary-400",
      ],
      primaryOutline: [
        "border-primary-400 hover:border-primary-500",
        "text-primary-500 hover:text-primary-foreground",
        "bg-transparent hover:bg-primary-400",
        "disabled:bg-transparent disabled:text-primary-400/60",
      ],
      secondaryOutline: [
        "border-secondary-600 hover:border-secondary-900",
        "text-secondary-600 hover:text-secondary-200",
        "bg-transparent hover:bg-secondary-900",
        "disabled:bg-transparent disabled:text-secondary-600/50",
      ],
      // Save and Post(submit forms)
      secondary: [
        // border
        "border-secondary-700 dark:border-secondary-700",
        // text color
        "text-secondary-foreground dark:text-secondary-50",
        // background color
        "bg-secondary-500 dark:bg-secondary-800",
        // hover color
        "hover:bg-secondary-600 dark:hover:bg-secondary-900/60",
        // disabled
        "disabled:text-secondary-400",
        "disabled:dark:text-secondary-600",
      ],
      lime: [
        // border
        "border-transparent",
        // text color
        "text-white dark:text-white",
        // background color
        "bg-lime-500 dark:bg-lime-500",
        // hover color
        "hover:bg-lime-600 dark:hover:bg-lime-600",
        // disabled
        "disabled:bg-lime-300 disabled:text-white",
        "disabled:dark:bg-lime-800 disabled:dark:text-lime-400",
      ],
      light: [
        // base
        "shadow-none",
        // border
        "border-transparent",
        // text color
        "text-gray-900 dark:text-gray-50",
        // background color
        "bg-gray-200 dark:bg-gray-900",
        // hover color
        "hover:bg-gray-300/70 dark:hover:bg-gray-800/80",
        // disabled
        "disabled:bg-gray-100 disabled:text-gray-400",
        "disabled:dark:bg-gray-800 disabled:dark:text-gray-600",
      ],
      dark: [
        // border
        "border-transparent",
        // text color
        "text-white dark:text-white",
        // background color
        "bg-zinc-500 dark:bg-zinc-900",
        // hover color
        "hover:bg-zinc-600 dark:hover:bg-zinc-600",
        // disabled
        "disabled:bg-zinc-300 disabled:text-white",
        "disabled:dark:bg-zinc-800 disabled:dark:text-zinc-400",
      ],
      ghost: [
        // base
        "shadow-none",
        // border
        "border-transparent",
        // text color
        "text-gray-900 dark:text-gray-50",
        // hover color
        "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800/80",
        // disabled
        "disabled:text-gray-400",
        "disabled:dark:text-gray-600",
      ],
      destructive: [
        // text color
        "text-white",
        // border
        "border-transparent",
        // background color
        "bg-red-600 dark:bg-red-700",
        // hover color
        "hover:bg-red-700 dark:hover:bg-red-600",
        // disabled
        "disabled:bg-red-300 disabled:text-white",
        "disabled:dark:bg-red-950 disabled:dark:text-red-400",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      children,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant }), className)}
        disabled={disabled || isLoading}
        tremor-id="tremor-raw"
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <RiLoader2Fill
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants, type ButtonProps }