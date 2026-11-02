import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { usePWAInstall } from "./PWAInstallProvider";
import { cx } from "@/lib/utils";

interface InstallPWAProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function InstallPWA({ 
  children, 
  className,
  asChild = false
}: InstallPWAProps) {
  const { isInstallable, promptInstall } = usePWAInstall();

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    if (!isInstallable) return;
    
    e.preventDefault();
    e.stopPropagation();
    await promptInstall();
  };

  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cx(
        isInstallable ? "cursor-pointer" : "cursor-default",
        className
      )}
      onClick={handleClick}
      role={isInstallable ? "button" : undefined}
      tabIndex={isInstallable ? 0 : undefined}
      onKeyDown={isInstallable ? (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLElement>);
        }
      } : undefined}
    >
      {children}
    </Component>
  );
}
