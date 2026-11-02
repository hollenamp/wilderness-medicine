import React from "react";
import { Link, usePage } from '@inertiajs/react';
import { Home, Mail, MessageCircle } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "@/lib/utils";

const mobileTabBarVariants = tv({
  base: [
    "fixed bottom-0 left-0 right-0 z-50 md:hidden",
    "flex items-center justify-around border-t",
    "pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
    "tracking-wide text-xs uppercase",
  ],
  variants: {
    variant: {
      primary: [
        "bg-primary-400",
        "text-primary-foreground",
        "border-primary-500",
      ],
      secondary: [
        "bg-secondary",
        "text-secondary-foreground",
        "border-secondary-600",
      ],
      light: [
        "bg-white",
        "text-zinc-900",
        "border-zinc-200",
      ],
      dark: [
        "bg-zinc-900",
        "text-zinc-100",
        "border-zinc-700",
        "divide-x divide-zinc-700/10"
      ],
    },
  },
  defaultVariants: {
    variant: "dark",
  },
});

const tabLinkBase =
  "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-opacity hover:opacity-90 active:opacity-80 gap-2";

interface MobileTabBarProps
  extends React.ComponentPropsWithoutRef<"nav">,
    VariantProps<typeof mobileTabBarVariants> {
  /** Email link (mailto:). */
  contactEmail?: string;
  /** Message / chat link (e.g. #message or external URL). */
  messageLink?: string;
}

export function MobileTabBar({
  variant = "dark",
  className,
  contactEmail,
  messageLink,
  ...props
}: MobileTabBarProps) {
  const pathname = usePage().url.split('?')[0];
  const isHome = pathname === "/";

  const handleHomeClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Mobile quick links"
      className={cx(mobileTabBarVariants({ variant }), className)}
      {...props}
    >
      {isHome ? (
        <button
          type="button"
          onClick={handleHomeClick}
          className={tabLinkBase}
          aria-label="Home"
        >
          <Home className="h-5 w-5 shrink-0" aria-hidden />
          <span>Home</span>
        </button>
      ) : (
        <Link href="/" className={tabLinkBase} aria-label="Home">
          <Home className="h-5 w-5 shrink-0" aria-hidden />
          <span>Home</span>
        </Link>
      )}
      <a
        href={contactEmail}
        className={tabLinkBase}
        aria-label="Email"
      >
        <Mail className="h-5 w-5 shrink-0" aria-hidden />
        <span className="test-xs uppercase tracking-wide">Email</span>
      </a>
      <a
        href={messageLink}
        className={tabLinkBase}
        aria-label="Message"
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
        <span>Message</span>
      </a>
    </nav>
  );
}

MobileTabBar.displayName = "MobileTabBar";

export { mobileTabBarVariants, type MobileTabBarProps };
