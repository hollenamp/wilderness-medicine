import { PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { ThemeProvider, useTheme } from '@/Contexts/ThemeProvider';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { cx } from '@/lib/utils';
import '../../../css/admin.css';

function AuthLayoutInner({
    user,
    header,
    className,
    children,
}: PropsWithChildren<{
    user?: User;
    header?: ReactNode;
    className?: string;
}>) {
    const { resolvedTheme } = useTheme();
    const year = new Date().getFullYear();

    return (
        <div className={cx('admin-theme min-h-svh w-full bg-background text-foreground', resolvedTheme, className)}>
            <div className="relative flex min-h-svh flex-col selection:bg-admin-primary selection:text-admin-primary-foreground">
                <header className="w-full flex-none bg-transparent">
                    <div className="container flex items-center justify-between py-4">
                        <div className="flex h-12 py-2 lg:col-start-2 lg:justify-center">
                            <ApplicationLogo className="h-full fill-foreground" />
                        </div>
                        <nav className="-mx-3 flex flex-1 justify-end">
                            {user ? (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="rounded-md px-3 py-2 text-foreground ring-1 ring-transparent transition hover:text-muted-foreground focus:outline-none"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('admin')}
                                    className="rounded-md px-3 py-2 text-foreground ring-1 ring-transparent transition hover:text-muted-foreground focus:outline-none"
                                >
                                    Log in
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>
                {header}
                <main className="container flex grow">{children}</main>
                <footer className="flex w-full flex-none flex-col gap-1 bg-transparent py-8 text-zinc-800 dark:text-white">
                    <ul className="container flex flex-col items-center justify-center gap-2 text-center text-sm divide-solid divide-white dark:text-zinc-50 dark:hover:text-zinc-50/80 md:flex-row md:gap-0 md:divide-x-2">
                        <li className="px-2">Copyright &copy; {year} AMP CMS</li>
                    </ul>
                </footer>
            </div>
        </div>
    );
}

export default function AuthLayout({
    user,
    header,
    className,
    children,
}: PropsWithChildren<{
    user?: User;
    header?: ReactNode;
    className?: string;
}>) {
    return (
        <ThemeProvider storageKey="admin-ui-theme">
            <AuthLayoutInner user={user} header={header} className={className}>
                {children}
            </AuthLayoutInner>
        </ThemeProvider>
    );
}
