import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cx } from '@/lib/utils';

const badgeVariants = tv({
    base: 'inline-flex w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium',
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-white',
            secondary: 'border-transparent bg-secondary text-secondary-foreground',
            destructive: 'border-transparent bg-destructive text-white',
            outline: 'text-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface BadgeProps extends React.ComponentPropsWithoutRef<'span'>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, ...props }, forwardedRef) => {
    return <span ref={forwardedRef} className={cx(badgeVariants({ variant }), className)} {...props} />;
});
Badge.displayName = 'Badge';

export { Badge, badgeVariants, type BadgeProps };
