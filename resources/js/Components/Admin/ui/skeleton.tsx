import { cx } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="skeleton"
            className={cx('animate-pulse rounded-admin-md bg-admin-muted', className)}
            {...props}
        />
    );
}

export { Skeleton };
