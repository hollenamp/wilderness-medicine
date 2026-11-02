import { Link } from '@inertiajs/react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/Components/Admin/ui/sidebar';
import { AppTitle } from '@/Components/Admin/layout/app-title';
import { NavMain } from '@/Components/Admin/layout/nav-main';
import { NavUser } from '@/Components/Admin/layout/nav-user';
import { useLayout } from '@/Contexts/LayoutProvider';
import { User } from '@/types';

export function AppSidebar({ user }: { user: User }) {
    const { collapsible, variant } = useLayout();

    return (
        <Sidebar collapsible={collapsible} variant={variant}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
                            <Link href={route('admin.dashboard')}>
                                <AppTitle />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain user={user} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
