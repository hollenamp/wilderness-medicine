import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { cx } from '@/lib/utils';
import { Button } from '@/Components/Admin/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/Admin/ui/dropdown-menu';

type TopNavLink = {
    title: string;
    href: string;
    isActive: boolean;
    disabled?: boolean;
};

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
    links: TopNavLink[];
};

export function TopNav({ className, links, ...props }: TopNavProps) {
    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        className={cx('md:size-7 lg:hidden', className)}
                    >
                        <Menu />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start">
                    {links.map(({ title, href, isActive, disabled }) => (
                        <DropdownMenuItem key={`${title}-${href}`} asChild disabled={disabled}>
                            <Link
                                href={href}
                                className={!isActive ? 'text-muted-foreground' : undefined}
                            >
                                {title}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <nav
                className={cx(
                    'hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6',
                    className
                )}
                {...props}
            >
                {links.map(({ title, href, isActive, disabled }) => (
                    <Link
                        key={`${title}-${href}`}
                        href={href}
                        className={cx(
                            'text-sm font-medium transition-colors hover:text-primary',
                            !isActive && 'text-muted-foreground',
                            disabled && 'pointer-events-none opacity-50'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {title}
                    </Link>
                ))}
            </nav>
        </>
    );
}
