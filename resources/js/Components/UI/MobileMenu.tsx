import * as React from "react";
import { Link, usePage } from '@inertiajs/react';
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";
import { HamburgerButton } from "../UI/HamburgerButton";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface MobileMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenuContext = React.createContext<
  MobileMenuContextValue | undefined
>(undefined);

const MobileMenuVariantContext = React.createContext<
  "primary" | "secondary"
>("primary");

function useMobileMenuContext() {
  const context = React.useContext(MobileMenuContext);
  if (!context) {
    throw new Error(
      "MobileMenu compound components must be used within MobileMenu"
    );
  }
  return context;
}

function useMobileMenuVariant() {
  return React.useContext(MobileMenuVariantContext);
}

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const mobileMenuContentVariants = tv({
  base: [
    "fixed right-0 top-0 h-full w-full max-w-[350px] mr-0 ml-auto flex flex-col border-none !p-0",
    "bg-white text-zinc-800",
  ],
  variants: {
    variant: {
      primary: [],
      secondary: [],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const mobileMenuLinkVariants = tv({
  base: [
    "text-lg font-normal tracking-wide transition-colors px-3 py-2 px-3 md:px-6",
    "text-zinc-800 hover:text-zinc-600 hover:bg-zinc-100 grow flex items-center gap-3",
  ],
  variants: {
    variant: {
      primary: ["data-[active]:text-primary-600"],
      secondary: ["data-[active]:text-secondary-600"],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const mobileMenuFooterVariants = tv({
  base: [
    "flex flex-col gap-4 mt-auto shrink-0 py-3 md:py-6",
  ],
  variants: {
    variant: {
      primary: ["border-zinc-200"],
      secondary: ["border-zinc-200"],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

interface MobileMenuProps {
  children: React.ReactNode;
}

function MobileMenu({ children }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false);

  const contextValue: MobileMenuContextValue = React.useMemo(
    () => ({ open, onOpenChange: setOpen }),
    [open]
  );

  return (
    <MobileMenuContext.Provider value={contextValue}>
      <Drawer open={open} onOpenChange={setOpen} tremor-id="tremor-raw">
        {children}
      </Drawer>
    </MobileMenuContext.Provider>
  );
}
MobileMenu.displayName = "MobileMenu";

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

interface MobileMenuTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

const MobileMenuTrigger = React.forwardRef<HTMLButtonElement, MobileMenuTriggerProps>(
  ({ asChild, children }, forwardedRef) => {
    const { open } = useMobileMenuContext();

    const child = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<{ isOpen?: boolean }>, {
          isOpen: open,
        })
      : children;

    if (asChild) {
      return (
        <DrawerTrigger asChild ref={forwardedRef}>
          {child}
        </DrawerTrigger>
      );
    }

    return (
      <DrawerTrigger ref={forwardedRef}>
        {child}
      </DrawerTrigger>
    );
  }
);
MobileMenuTrigger.displayName = "MobileMenuTrigger";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

interface MobileMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerContent>,
    VariantProps<typeof mobileMenuContentVariants> {}

const MobileMenuContent = React.forwardRef<
  React.ElementRef<typeof DrawerContent>,
  MobileMenuContentProps
>(({ variant = "primary", className, children, ...props }, forwardedRef) => {
  return (
    <DrawerContent
      ref={forwardedRef}
      className={cx(mobileMenuContentVariants({ variant }), className)}
      tremor-id="tremor-raw"
      {...props}
    >
      <MobileMenuVariantContext.Provider value={variant}>
        {children}
      </MobileMenuVariantContext.Provider>
    </DrawerContent>
  );
});
MobileMenuContent.displayName = "MobileMenuContent";

// ---------------------------------------------------------------------------
// Panel (Radix-aligned container for header, body, footer)
// ---------------------------------------------------------------------------

interface MobileMenuPanelProps
  extends React.ComponentPropsWithoutRef<typeof DrawerContent>,
    VariantProps<typeof mobileMenuContentVariants> {}

const MobileMenuPanel = React.forwardRef<
  React.ElementRef<typeof DrawerContent>,
  MobileMenuPanelProps
>(({ variant = "primary", className, children, ...props }, forwardedRef) => {
  return (
    <DrawerContent
      ref={forwardedRef}
      className={cx(mobileMenuContentVariants({ variant }), className)}
      tremor-id="tremor-raw"
      {...props}
    >
      <MobileMenuVariantContext.Provider value={variant}>
        {children}
      </MobileMenuVariantContext.Provider>
    </DrawerContent>
  );
});
MobileMenuPanel.displayName = "MobileMenuPanel";

// ---------------------------------------------------------------------------
// Body (scrollable middle section)
// ---------------------------------------------------------------------------

interface MobileMenuBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const MobileMenuBody = React.forwardRef<HTMLDivElement, MobileMenuBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("grow overflow-hidden py-3 md:py-6 space-y-4 md:space-y-6", className)}
      {...props}
    >
      {children}
    </div>
  )
);
MobileMenuBody.displayName = "MobileMenuBody";

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

interface MobileMenuHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const MobileMenuHeader = React.forwardRef<HTMLDivElement, MobileMenuHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(
        "flex justify-between items-center shrink-0",
        "px-6 md:px-12 pt-6 md:pt-12 pb-3 md:pb-6",
        className
      )}
      {...props}
    >
      {children}
      <div className="flex justify-end">
        <DrawerClose asChild>
          <HamburgerButton isOpen title="Close navigation" />
        </DrawerClose>
      </div>
    </div>
  )
);
MobileMenuHeader.displayName = "MobileMenuHeader";

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

interface MobileMenuTitleProps
  extends React.ComponentPropsWithoutRef<typeof DrawerTitle> {}

const MobileMenuTitle = React.forwardRef<
  React.ElementRef<typeof DrawerTitle>,
  MobileMenuTitleProps
>(({ className, ...props }, ref) => (
    <div>
      <DrawerTitle
        ref={ref}
        className={cx("text-zinc-600 text-xl px-6 md:px-12 dark:text-zinc-600", className)}
        {...props}
      />
      <div className="border-b border-zinc-200 mx-6 md:mx-12 pt-3" />
    </div>
));
MobileMenuTitle.displayName = "MobileMenuTitle";

// ---------------------------------------------------------------------------
// Nav (with ScrollArea)
// ---------------------------------------------------------------------------

interface MobileMenuNavProps {
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

const MobileMenuNav = React.forwardRef<HTMLDivElement, MobileMenuNavProps>(
  ({ children, orientation = "vertical", className }, ref) => {

    return (
      <NavigationMenuPrimitive.Root
        orientation={orientation}
        className="relative"
      >
        <NavigationMenuPrimitive.List
          className={cx(
            "flex flex-col space-y-1",
            "px-3 md:px-6"
          )}
        >
          {children}
        </NavigationMenuPrimitive.List>
      </NavigationMenuPrimitive.Root>
    );
  }
);
MobileMenuNav.displayName = "MobileMenuNav";

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------

interface MobileMenuLinkProps extends VariantProps<typeof mobileMenuLinkVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const MobileMenuLink = React.forwardRef<
  HTMLAnchorElement,
  MobileMenuLinkProps
>(({ href, children, variant, className }, ref) => {
  const pathname = usePage().url.split('?')[0];
  const { onOpenChange } = useMobileMenuContext();
  const contextVariant = useMobileMenuVariant();
  const resolvedVariant = (variant ?? contextVariant) as 'primary' | 'secondary';
  const isActive = pathname === href;

  return (
    <NavigationMenuPrimitive.Item className="flex items-center w-full">
      <NavigationMenuPrimitive.Link asChild active={isActive}>
        <Link
          ref={ref}
          href={href}
          onClick={() => onOpenChange(false)}
          className={cx(mobileMenuLinkVariants({ variant: resolvedVariant }), className)}
          data-active={isActive ? "" : undefined}
        >
          {children}
        </Link>
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  );
});
MobileMenuLink.displayName = "MobileMenuLink";

// ---------------------------------------------------------------------------
// Group (with sub-items)
// ---------------------------------------------------------------------------

interface MobileMenuGroupProps
  extends VariantProps<typeof mobileMenuLinkVariants> {
  label: string;
  href: string;
  children: React.ReactNode;
}

const MobileMenuGroup = React.forwardRef<HTMLLIElement, MobileMenuGroupProps>(
  ({ label, href, children, variant }, ref) => {
    const contextVariant = useMobileMenuVariant();
    const resolvedVariant = (variant ?? contextVariant) as 'primary' | 'secondary';
    const pathname = usePage().url.split('?')[0];
    const { onOpenChange } = useMobileMenuContext();
    const hasActiveChild = React.Children.toArray(children).some((child) => {
      if (React.isValidElement<{ href?: string }>(child) && child.props.href) {
        return pathname === child.props.href;
      }
      return false;
    });
    const isActive = pathname === href || hasActiveChild;

    return (
      <NavigationMenuPrimitive.Item ref={ref}>
        <div className="space-y-2">
          <div className="flex items-center justify-between w-full gap-2">
            <NavigationMenuPrimitive.Link asChild active={isActive}>
              <Link
                href={href}
                onClick={() => onOpenChange(false)}
                className={cx(mobileMenuLinkVariants({ variant: resolvedVariant }))}
                data-active={isActive ? "" : undefined}
              >
                {label}
              </Link>
            </NavigationMenuPrimitive.Link>
            <NavigationMenuPrimitive.Trigger
              className="p-1 hover:bg-zinc-100 rounded"
              aria-label={`Toggle ${label} menu`}
            >
              <ChevronDown
                className="size-4 transition-transform text-zinc-800 data-[state=open]:rotate-180"
                aria-hidden
              />
            </NavigationMenuPrimitive.Trigger>
          </div>
          <NavigationMenuPrimitive.Content
            className={cx(
              "data-[state=open]:animate-accordion-open data-[state=closed]:animate-accordion-close",
              "overflow-hidden"
            )}
          >
            <ul className="list-none pl-4 space-y-3 pt-2">
              {React.Children.map(children, (child) => {
                if (React.isValidElement<{ className?: string }>(child) && child.type === MobileMenuLink) {
                  return React.cloneElement(child, {
                    className: cx("text-base", child.props.className),
                  });
                }
                return child;
              })}
            </ul>
          </NavigationMenuPrimitive.Content>
        </div>
      </NavigationMenuPrimitive.Item>
    );
  }
);
MobileMenuGroup.displayName = "MobileMenuGroup";

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

interface MobileMenuFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mobileMenuFooterVariants> {}

const MobileMenuFooter = React.forwardRef<HTMLDivElement, MobileMenuFooterProps>(
  ({ variant, className, children, ...props }, ref) => {
    const contextVariant = useMobileMenuVariant();
    const resolvedVariant = variant ?? contextVariant;
    return (
      <>
        <div className="border-t border-zinc-200 mx-6 md:mx-12" />
        <div
          ref={ref}
          className={cx(mobileMenuFooterVariants({ variant: resolvedVariant }), className)}
          tremor-id="tremor-raw"
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
MobileMenuFooter.displayName = "MobileMenuFooter";

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  MobileMenu,
  MobileMenuBody,
  MobileMenuContent,
  MobileMenuFooter,
  MobileMenuGroup,
  MobileMenuHeader,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuPanel,
  MobileMenuTitle,
  MobileMenuTrigger,
  mobileMenuContentVariants,
  mobileMenuLinkVariants,
  mobileMenuFooterVariants,
};
