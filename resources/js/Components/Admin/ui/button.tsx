import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';
import { cx } from '@/lib/utils';

const buttonVariants = tv({
    base: [
        'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-admin-md text-sm font-medium transition-colors outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        'focus-visible:ring-2 focus-visible:ring-admin-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    ],
    variants: {
        variant: {
            default: 'bg-admin-primary text-admin-primary-foreground shadow-sm hover:bg-admin-primary/90',
            destructive: 'bg-admin-destructive text-white shadow-sm hover:bg-admin-destructive/90',
            outline:
                'border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-admin-secondary text-admin-secondary-foreground shadow-sm hover:bg-admin-secondary/80',
            ghost: 'hover:bg-admin-accent hover:text-admin-accent-foreground',
            link: 'text-admin-primary underline-offset-4 hover:underline',
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 px-6 has-[>svg]:px-4',
            icon: 'size-9',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                ref={ref}
                data-slot="button"
                type={asChild ? undefined : type}
                className={cx(buttonVariants({ variant, size }), className)}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
