// Application Logo Component

import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx } from "@/lib/utils"

const applicationLogoVariants = tv({
  base: "space-y-1",
  variants: {
    variant: {
      default: [
        // SVG fill color
        "[&>svg]:fill-zinc-700 [&>svg]:dark:fill-zinc-700",
        // Text color
        "[&>div]:text-zinc-700 [&>div]:dark:text-zinc-700",
      ],
      white: [
        // SVG fill color
        "[&>svg]:fill-white",
        // Text color
        "[&>div]:text-white",
      ],
      zinc: [
        // SVG fill color
        "[&>svg]:fill-zinc-400",
        // Text color
        "[&>div]:text-zinc-400",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface AMPLogoProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof applicationLogoVariants> {
  "aria-label"?: string
}

const AMPLogo = React.forwardRef<HTMLDivElement, AMPLogoProps>(
  (
    {
      className,
      variant,
      "aria-label": ariaLabel = "AMP CMS Logo",
      ...props
    }: AMPLogoProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cx(applicationLogoVariants({ variant }), className)}
        role="img"
        aria-label={ariaLabel}
        tremor-id="tremor-raw"
        {...props}
      >
        <svg
          className="block h-9 w-auto"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 735 200"
          aria-hidden="true"
        >
          <title>AMP CMS Logo</title>
          <desc>AMP CMS Logo</desc>
          <g>
            <path d="M656.7,0H545c-7.2,0-13,5.8-13,13v174c0,7.2,5.8,13,13,13h31c7.2,0,13-5.8,13-13v-28h75c39,0,71-32,71-71V71
                        C735,24.2,695.4,0,656.7,0z M677.5,90.6c0,10.5-8.5,19-19,19h-69.3V46h54.2c21.1,0,34.1,11.1,34.1,26.3V90.6z"/>
            <path d="M499.5,13v174c0,7.2-5.8,13-13,13h-31.1c-7.2,0-13-5.8-13-13V70.9l-42.2,120.4c-1.8,5.2-6.7,8.7-12.3,8.7
                        h-31.3c-5.5,0-10.4-3.5-12.3-8.7L302.1,70.9V187c0,7.2-5.8,13-13,13H258c-7.2,0-13-5.8-13-13V13c0-7.2,5.8-13,13-13h57.9
                        c8,0,15.1,5,17.7,12.6l38.6,110l38.3-109.1C413.4,5.4,421.1,0,429.6,0h56.9C493.7,0,499.5,5.8,499.5,13z"/>
            <path d="M200,0h-89.6C75.1,0,44.2,23.6,34.9,57.6l-34.5,126c-2.3,8.3,4,16.4,12.5,16.4h30.7c6,0,11.2-4.1,12.6-10
                        l8.4-35H156v32c0,7.2,5.8,13,13,13h31c7.2,0,13-5.8,13-13V13C213,5.8,207.2,0,200,0z M156,109.6H75.2l8.1-36.1
                        C86.9,57.4,101.2,46,117.6,46H156V109.6z"/>
          </g>
        </svg>
      </div>
    )
  },
)

AMPLogo.displayName = "AMPLogo"

export { AMPLogo, applicationLogoVariants, type AMPLogoProps }
export default AMPLogo