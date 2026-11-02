import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/Components/Admin/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/Admin/ui/dropdown-menu';
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/Components/Admin/ui/sidebar';
import { Badge } from '@/Components/Admin/ui/badge';
import {
    getVisibleSubGroupItems,
    isNavLinkActive,
    isSubGroupActive,
    type NavSubGroup,
} from '@/Components/Admin/layout/nav-data';
import type { PageProps } from '@/types';

type NavMainSubGroupProps = {
    subgroup: NavSubGroup;
    isAdmin: boolean;
    onNavClick: () => void;
};

export function NavMainSubGroup({ subgroup, isAdmin, onNavClick }: NavMainSubGroupProps) {
    const { state } = useSidebar();
    const items = getVisibleSubGroupItems(subgroup, isAdmin);
    const hasActiveChild = isSubGroupActive(subgroup, isAdmin);
    const Icon = subgroup.icon;
    const pageProps = usePage<PageProps>().props;
    const badgeCount = subgroup.badgeCountKey ? pageProps[subgroup.badgeCountKey] : undefined;
    const hasBadge = Boolean(badgeCount);

    if (state === 'collapsed') {
        return (
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            tooltip={hasBadge ? `${subgroup.title} (${badgeCount})` : subgroup.title}
                            isActive={hasActiveChild}
                        >
                            <Icon />
                            <span>{subgroup.title}</span>
                            <ChevronRight className="ms-auto transition-transform" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="min-w-48">
                        <DropdownMenuLabel>{subgroup.title}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {items.map((item) => {
                            const isActive = isNavLinkActive(item);

                            return (
                                <DropdownMenuItem key={item.routeName} asChild>
                                    <Link
                                        href={route(item.routeName)}
                                        onClick={onNavClick}
                                        className={isActive ? 'bg-admin-accent text-admin-accent-foreground' : undefined}
                                    >
                                        <item.icon />
                                        {item.title}
                                    </Link>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        );
    }

    return (
        <Collapsible defaultOpen={hasActiveChild} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={subgroup.title} isActive={hasActiveChild}>
                        <Icon />
                        <span>{subgroup.title}</span>
                        {hasBadge && (
                            <Badge variant="secondary" className="ml-auto px-1.5 py-0 text-[10px]">
                                {badgeCount}
                            </Badge>
                        )}
                        <ChevronRight
                            className={
                                hasBadge
                                    ? 'transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
                                    : 'ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
                            }
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((item) => {
                            const isActive = isNavLinkActive(item);

                            return (
                                <SidebarMenuSubItem key={item.routeName}>
                                    <SidebarMenuSubButton asChild isActive={isActive}>
                                        <Link href={route(item.routeName)} onClick={onNavClick}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            );
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}
