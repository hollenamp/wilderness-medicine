import * as React from "react"
import * as NavigationMenuPrimitives from "@radix-ui/react-navigation-menu"

import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "@/lib/utils"
import { RiArrowDownSLine } from "@remixicon/react"

const NavigationMenu = NavigationMenuPrimitives.Root
NavigationMenu.displayName = "NavigationMenu"

const navigationVariants = tv({
  base: [
    "flex",
    "data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:space-x-2",
    "data-[orientation=vertical]:flex-col data-[orientation=vertical]:space-y-2",
  ],
})

interface NavigationMenuListProps
  extends React.ComponentPropsWithoutRef<"ul">,
    VariantProps<typeof navigationVariants> {
        //    
    }

const NavigationMenuList = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  (
    { 
        className, 
        children, 
        ...props 
    }: NavigationMenuListProps,
    forwardedRef,
  ) => {
    return (
      <NavigationMenuPrimitives.List
        ref={forwardedRef}
        className={cx(navigationVariants(), className)}
        {...props}
      >
          {children}
      </NavigationMenuPrimitives.List>
    )
  }
)
NavigationMenuList.displayName = "NavigationMenuList"

interface NavigationMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Item> {
    // You can add custom props here if needed
    className?: string;
  }

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Item>,
  NavigationMenuItemProps
>(({ className, children, ...props }, forwardedRef) => {
    return (
      <NavigationMenuPrimitives.Item
        ref={forwardedRef}
        className={cx(className)}
        {...props}
      >
          {children}
      </NavigationMenuPrimitives.Item>
    )
  }
)

NavigationMenuItem.displayName = "NavigationMenuItem"

interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Trigger> {
    className?: string;
  }

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Trigger>,
  NavigationMenuTriggerProps
>(
  (
    {
      className,
      children,
      asChild,
      ...props
    }: NavigationMenuTriggerProps,
    forwardedRef,
  ) => {
    return (
      <NavigationMenuPrimitives.Trigger
        ref={forwardedRef}
        asChild={asChild}
        className={cx(
          'flex h-full shrink-0 items-center gap-1 whitespace-nowrap',
          className,
        )}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {children}
            <RiArrowDownSLine size={16} />
          </>
        )}
      </NavigationMenuPrimitives.Trigger>
    )
  },
)

NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

interface NavigationMenuContentProps
  extends NavigationMenuPrimitives.NavigationMenuContentProps {
    children?: React.ReactNode
    variant?: "panel" | "dropdown"
}

const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  (
    { 
        className, 
        children, 
        variant = "panel",
        ...props 
    }: NavigationMenuContentProps,
    forwardedRef,
  ) => {
    const isDropdown = variant === "dropdown"

    return (
      <NavigationMenuPrimitives.Content
        ref={forwardedRef}
        className={cx(
          "z-50 overflow-hidden",
          isDropdown
            ? "absolute right-0 top-full w-max min-w-48 border-0 border-t-2 border-forest-green-600 bg-white py-2 text-charcoal-brown-950 shadow-xl"
            : // Full-bleed panel: fixed to the viewport below the fixed h-20 header.
              // Avoid transform ancestors on NavigationMenu so left-0/w-full span the screen.
              "fixed left-0 top-20 w-full border border-zinc-300 bg-popover bg-zinc-50 py-8 text-popover-foreground",
          className
        )}
        {...props}
      >
          {isDropdown ? children : (
            <div className="mx-auto w-full px-4 md:px-8 lg:px-12">{children}</div>
          )}
      </NavigationMenuPrimitives.Content>
    )
  }
)

NavigationMenuContent.displayName = "NavigationMenuContent"

interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Link> {
    active?: boolean
    children?: React.ReactNode
}

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, children, active, ...props }, forwardedRef) => {
    return (
      <NavigationMenuPrimitives.Link
        ref={forwardedRef}
        className={cx(
            "px-2 py-0 flex items-center h-full",
            "hover:text-forest-green-700 hover:border-b hover:border-t hover:border-b-forest-green-600 hover:border-t-transparent",
            active ? "text-forest-green-700 border-b border-t border-b-forest-green-600 border-t-transparent" : "text-charcoal-brown-700",
            className
        )}
        {...props}
      >
        {children}
      </NavigationMenuPrimitives.Link>
    )
  }
)

NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuSub = NavigationMenuPrimitives.Sub
NavigationMenuSub.displayName = "NavigationMenuSub"

const NavigationMenuViewport = NavigationMenuPrimitives.Viewport
NavigationMenuViewport.displayName = "NavigationMenuViewport"

const NavigationMenuIndicator = NavigationMenuPrimitives.Indicator
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuSub,
  NavigationMenuViewport,
  NavigationMenuIndicator
}