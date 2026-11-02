import { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';
import { ThemeProvider, useTheme } from '@/Contexts/ThemeProvider';
import { LayoutProvider } from '@/Contexts/LayoutProvider';
import { AdminUserProvider } from '@/Contexts/AdminUserProvider';
import { Toaster } from '@/Components/UI/Toaster';
import { cx } from '@/lib/utils';
import { getCookie } from '@/lib/cookies';
import { SidebarInset, SidebarProvider } from '@/Components/Admin/ui/sidebar';
import { AppSidebar } from '@/Components/Admin/layout/app-sidebar';
import { SkipToMain } from '@/Components/Admin/layout/skip-to-main';
import { NavigationProgress } from '@/Components/Admin/NavigationProgress';

function AdminLayoutInner({ children }: PropsWithChildren) {
    const { auth } = usePage().props;
    const { resolvedTheme } = useTheme();
    const defaultOpen = getCookie('admin_sidebar_state') !== 'false';

    return (
        <div className={cx('admin-theme min-h-svh w-full', resolvedTheme)}>
            <AdminUserProvider user={auth.user}>
                <NavigationProgress />
                <SidebarProvider defaultOpen={defaultOpen}>
                    <SkipToMain />
                    <AppSidebar user={auth.user} />
                    <SidebarInset className="@container/content has-data-[layout=fixed]:h-svh peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]">
                        {children}
                    </SidebarInset>
                </SidebarProvider>
                <Toaster />
            </AdminUserProvider>
        </div>
    );
}

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider storageKey="admin-ui-theme">
            <LayoutProvider>
                <AdminLayoutInner>{children}</AdminLayoutInner>
            </LayoutProvider>
        </ThemeProvider>
    );
}
