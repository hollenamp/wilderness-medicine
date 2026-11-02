import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/Components/Admin/ui/sidebar';
import {
    getVisibleNavItems,
    isNavLink,
    isNavLinkActive,
    navData,
} from '@/Components/Admin/layout/nav-data';
import { NavMainSubGroup } from '@/Components/Admin/layout/nav-main-subgroup';
import { User } from '@/types';

export function NavMain({ user }: { user: User }) {
    const { setOpenMobile } = useSidebar();

    const handleNavClick = () => {
        setOpenMobile(false);
    };

    const isAdmin = Boolean(user.admin);

    return (
        <>
            {navData.map((group) => {
                const items = getVisibleNavItems(group.items, isAdmin);
                if (items.length === 0) return null;

                return (
                    <SidebarGroup key={group.title || 'untitled'}>
                        {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => {
                                    if (isNavLink(item)) {
                                        const isActive = isNavLinkActive(item);

                                        return (
                                            <SidebarMenuItem key={item.routeName}>
                                                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                                                    <Link href={route(item.routeName)} onClick={handleNavClick}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    }

                                    return (
                                        <NavMainSubGroup
                                            key={item.title}
                                            subgroup={item}
                                            isAdmin={isAdmin}
                                            onNavClick={handleNavClick}
                                        />
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                );
            })}
        </>
    );
}
