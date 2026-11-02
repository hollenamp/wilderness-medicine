import * as React from "react";
import * as AvatarPrimitives from "@radix-ui/react-avatar";
import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "@/lib/utils"

const avatarVariants = tv({
  base: cx(
    "inline-flex select-none items-center justify-center overflow-hidden align-middle",
  ),
  variants: {
    variant: {
      default: [
        "size-[45px]",
        "bg-[#C7AE7F]/10 text-[#C7AE7F] ring-[#C7AE7F]/30",
        "dark:bg-[#C7AE7F]/10 dark:text-[#C7AE7F] dark:ring-[#C7AE7F]/30",
      ],
      developer: [
        "rounded-full text-xs font-semibold text-white",
      ],
      neutral: [
        "bg-zinc-700/50 text-zinc-200 ring-zinc-500/30",
        "dark:bg-zinc-700/50 dark:text-zinc-200 dark:ring-zinc-500/30",
      ],
      success: [
        "bg-emerald-50 text-emerald-900 ring-emerald-600/30",
        "dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20",
      ],
      error: [
        "bg-red-50 text-red-900 ring-red-600/20",
        "dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
      ],
      warning: [
        "bg-yellow-50 text-yellow-900 ring-yellow-600/30",
        "dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface AvatarProps
  extends React.ComponentPropsWithoutRef<"div">,
  VariantProps<typeof avatarVariants> { 
    avatarSrc?: string;
  }

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { 
      className, 
      variant, 
      ...props 
    }: AvatarProps
  ) => {
    return (
      <AvatarPrimitives.Root {...props} className={cx(avatarVariants({ variant }), className)} />
    )
  },
)
Avatar.displayName = "Avatar"

interface AvatarImageProps extends React.ComponentPropsWithoutRef<"div"> {
  avatarSrc?: string;
  className?: string;
}

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  AvatarImageProps
>(({ avatarSrc, className, ...props }, ref) => {
  return (
      <AvatarPrimitives.Image
        {...props}
        ref={ref}
        src={avatarSrc}
        className={cx("size-full object-cover", className)}
      />
  );
});

AvatarImage.displayName = "Avatar.Image"

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<"div"> {
  value?: string;
}

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  AvatarFallbackProps
>(({ value }) => {
  return (
      <AvatarPrimitives.Fallback
          className="leading-1 flex size-full items-center justify-center bg-[inherit] text-base font-medium text-[inherit]"
          delayMs={600}
      >
          {value}
      </AvatarPrimitives.Fallback>
  );
});

AvatarFallback.displayName = "Avatar.Fallback"

export { 
  Avatar, 
  AvatarImage, 
  avatarVariants, 
  AvatarFallback,
  type AvatarProps 
}