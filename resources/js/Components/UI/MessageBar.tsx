// Tremor MessageBar [v0.0.1]

import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx } from "@/lib/utils"

const messageBarVariants = tv({
  base: "w-full",
  variants: {
    variant: {
      default: [
        "bg-hunyadi_yellow-100/50 text-zinc-900",
      ],
      success: [
        "bg-emerald-50 text-emerald-900",
      ],
      warning: [
        "bg-yellow-50 text-yellow-900",
      ],
      error: [
        "bg-red-50 text-red-900",
      ],
      info: [
        "bg-blue-50 text-blue-900",
      ],
      neutral: [
        "bg-zinc-50 text-zinc-900",
      ],
    },
    size: {
      sm: "py-1",
      md: "py-2",
      lg: "py-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

const messageBarContentVariants = tv({
  base: "container flex justify-between items-center",
  variants: {
    layout: {
      default: "flex-row",
      reverse: "flex-row-reverse",
    },
  },
  defaultVariants: {
    layout: "default",
  },
})

interface MessageBarProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof messageBarVariants> {
  message: React.ReactNode
  actions?: React.ReactNode
  layout?: "default" | "reverse"
}

const MessageBar = React.forwardRef<HTMLDivElement, MessageBarProps>(
  (
    { message, actions, className, variant, size, layout = "default", ...props }: MessageBarProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cx(messageBarVariants({ variant, size }), className)}
        {...props}
      >
        <div className={cx(messageBarContentVariants({ layout }))}>
          <div className="flex items-center gap-2">
            {message}
          </div>
          {actions && (
            <div className="flex items-center justify-end gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    )
  },
)

MessageBar.displayName = "MessageBar"

export { MessageBar, messageBarVariants, type MessageBarProps }
