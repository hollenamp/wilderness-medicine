import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "@/lib/utils";

const agentProfileVariants = tv({
  base: [
    "flex items-center gap-3",
  ],
  variants: {
    variant: {
      default: ["text-zinc-100"],
      dark: ["text-zinc-100"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AgentProfileProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof agentProfileVariants> {
  /** Optional avatar image URL */
  avatar?: string;
  /** Business or brand name */
  businessName?: string;
  /** Owner or agent name */
  ownerName?: string;
}

const AgentProfile = React.forwardRef<HTMLDivElement, AgentProfileProps>(
  (
    {
      className,
      variant,
      avatar,
      businessName,
      ownerName,
      ...props
    }: AgentProfileProps,
    forwardedRef,
  ) => {
    const avatarInitial = ownerName
      ? ownerName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?";

    const hasContent = avatar || businessName || ownerName;
    if (!hasContent) return null;

    return (
      <div
        ref={forwardedRef}
        className={cx(agentProfileVariants({ variant }), className)}
        {...props}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={ownerName ? `Profile photo of ${ownerName}` : "Agent avatar"}
            className="w-12 h-12 rounded-full object-cover flex-none"
          />
        ) : (ownerName || businessName) ? (
          <div className="flex-none w-12 h-12 rounded-full flex items-center justify-center bg-zinc-700 text-white text-sm font-semibold shrink-0">
            <span>{avatarInitial}</span>
          </div>
        ) : null}
        {(ownerName || businessName) && (
          <div className="grow min-w-0 flex flex-col gap-0.5">
            {ownerName && (
              <p
                className={cx(
                  "text-base font-semibold leading-tight",
                  variant === "dark" ? "text-zinc-100" : "text-zinc-900",
                )}
              >
                {ownerName}
              </p>
            )}
            {businessName && (
              <p
                className={cx(
                  "text-sm font-normal leading-tight",
                  variant === "dark" ? "text-zinc-400" : "text-zinc-500",
                )}
              >
                {businessName}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

AgentProfile.displayName = "AgentProfile";

export { AgentProfile, agentProfileVariants };
export type { AgentProfileProps };
