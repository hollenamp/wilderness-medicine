import { Link } from '@inertiajs/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/utils';

type LineButtonProps = {
    children: ReactNode;
    href?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled?: boolean;
    className?: string;
};

const buttonClass =
    'inline-flex items-center justify-center bg-tea-green-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-forest-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 md:px-8 md:text-base';

export function LineButton({
    children,
    href,
    type = 'button',
    disabled = false,
    className,
}: LineButtonProps) {
    if (href) {
        return (
            <Link href={href} className={cx(buttonClass, className)}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} className={cx(buttonClass, className)}>
            {children}
        </button>
    );
}
