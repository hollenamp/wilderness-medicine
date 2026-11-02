import { cx } from '@/lib/utils';

type MainProps = React.HTMLAttributes<HTMLElement> & {
    fixed?: boolean;
    fluid?: boolean;
};

export function Main({ fixed = false, fluid = true, className, ...props }: MainProps) {
    return (
        <main
            data-layout={fixed ? 'fixed' : 'auto'}
            className={cx(
                'w-full px-4 py-6 bg-background text-foreground',
                fixed && 'flex grow flex-col overflow-hidden',
                !fluid && '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
                className
            )}
            {...props}
        />
    );
}
