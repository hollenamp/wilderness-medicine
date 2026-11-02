import { ReactNode, useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cx } from '@/lib/utils';
import { Separator } from '@/Components/Admin/ui/separator';
import { SidebarTrigger } from '@/Components/Admin/ui/sidebar';

type HeaderProps = {
    children?: ReactNode;
    fixed?: boolean;
    className?: string;
};

export function Header({ children, fixed, className }: HeaderProps) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(document.body.scrollTop || document.documentElement.scrollTop);
        document.addEventListener('scroll', onScroll, { passive: true });
        return () => document.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cx(
                'z-50 h-16',
                fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
                offset > 10 && fixed ? 'shadow' : 'shadow-none',
                className
            )}
        >
            <div
                className={cx(
                    'relative flex h-full items-center gap-3 p-4 sm:gap-4',
                    offset > 10 &&
                        fixed &&
                        'after:absolute after:inset-0 after:-z-10 after:bg-background/20 after:backdrop-blur-lg'
                )}
            >
                <SidebarTrigger variant="outline" className="max-md:scale-125" />
                <Separator orientation="vertical" className="h-6" />
                <a
                    href={route('welcome')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View site"
                    className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    <ExternalLink className="h-4 w-4" />
                    <span className="hidden sm:inline">View Site</span>
                </a>
                {children}
            </div>
        </header>
    );
}
