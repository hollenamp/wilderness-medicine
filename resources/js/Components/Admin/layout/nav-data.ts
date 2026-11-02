import { LayoutDashboard, Users, ShieldCheck, Settings, Sun, FileText, Images, ListTree, Building2, Mail, Tag, Newspaper, Layout, ArrowRightLeft, Trash2, ShoppingBag, GraduationCap, type LucideIcon } from 'lucide-react';

export type NavLink = {
    type: 'link';
    title: string;
    routeName: string;
    icon: LucideIcon;
    adminOnly?: boolean;
    isActive?: () => boolean;
};

export type NavSubGroup = {
    type: 'subgroup';
    title: string;
    icon: LucideIcon;
    items: Omit<NavLink, 'type'>[];
    /** Key into the shared Inertia page props holding a numeric badge count for this subgroup's trigger. */
    badgeCountKey?: 'mailLogCount';
};

export type NavItem = NavLink | NavSubGroup;

export type NavGroup = {
    title: string;
    items: NavItem[];
};

export const isNavLink = (item: NavItem): item is NavLink => item.type === 'link';

export const isNavSubGroup = (item: NavItem): item is NavSubGroup => item.type === 'subgroup';

export const navData: NavGroup[] = [
    {
        title: 'General',
        items: [
            { type: 'link', title: 'Dashboard', routeName: 'admin.dashboard', icon: LayoutDashboard },
        ],
    },
    {
        title: 'Management',
        items: [
            {
                type: 'subgroup',
                title: 'Access',
                icon: ShieldCheck,
                items: [
                    { title: 'Users', routeName: 'admin.users.list', icon: Users, adminOnly: true },
                ],
            },
            {
                type: 'subgroup',
                title: 'Pages',
                icon: FileText,
                items: [
                    {
                        title: 'List All Pages',
                        routeName: 'admin.pages.list',
                        icon: FileText,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.pages.list') || route().current('admin.pages.edit')),
                    },
                    {
                        title: 'Settings',
                        routeName: 'admin.settings.pages',
                        icon: Settings,
                    },
                ],
            },
            {
                type: 'subgroup',
                title: 'Blog',
                icon: Newspaper,
                items: [
                    {
                        title: 'All Posts',
                        routeName: 'admin.blog.list',
                        icon: Newspaper,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.blog.list') || route().current('admin.blog.edit') || route().current('admin.blog.create')),
                    },
                    {
                        title: 'Trash',
                        routeName: 'admin.blog.trash',
                        icon: Trash2,
                        adminOnly: true,
                    },
                ],
            },
            {
                type: 'subgroup',
                title: 'Classes',
                icon: GraduationCap,
                items: [
                    {
                        title: 'All Classes',
                        routeName: 'admin.classes.list',
                        icon: GraduationCap,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.classes.list') || route().current('admin.classes.edit') || route().current('admin.classes.create')),
                    },
                    {
                        title: 'Trash',
                        routeName: 'admin.classes.trash',
                        icon: Trash2,
                        adminOnly: true,
                    },
                ],
            },
            {
                type: 'subgroup',
                title: 'Store',
                icon: ShoppingBag,
                items: [
                    {
                        title: 'Products',
                        routeName: 'admin.store.products.list',
                        icon: ShoppingBag,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.store.products.list') || route().current('admin.store.products.edit') || route().current('admin.store.products.create')),
                    },
                    {
                        title: 'Categories',
                        routeName: 'admin.store.categories.list',
                        icon: Tag,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.store.categories.list') || route().current('admin.store.categories.edit') || route().current('admin.store.categories.create')),
                    },
                    {
                        title: 'Trash',
                        routeName: 'admin.store.products.trash',
                        icon: Trash2,
                        adminOnly: true,
                    },
                ],
            },
            {
                type: 'subgroup',
                title: 'Redirects',
                icon: ArrowRightLeft,
                items: [
                    {
                        title: 'All Redirects',
                        routeName: 'admin.redirects.list',
                        icon: ArrowRightLeft,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.redirects.list') || route().current('admin.redirects.edit') || route().current('admin.redirects.create')),
                    },
                ],
            },
            {
                type: 'subgroup',
                title: 'Media',
                icon: Images,
                items: [
                    {
                        title: 'Galleries',
                        routeName: 'admin.galleries.list',
                        icon: Images,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.galleries.list') || route().current('admin.galleries.edit') || route().current('admin.galleries.create')),
                    },
                    {
                        title: 'Image Categories',
                        routeName: 'admin.image-categories.list',
                        icon: Tag,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.image-categories.list') || route().current('admin.image-categories.edit') || route().current('admin.image-categories.create')),
                    },
                    {
                        title: 'Media Library',
                        routeName: 'admin.media.index',
                        icon: Images,
                        adminOnly: true,
                    },
                ],
            },
            {
                type: 'subgroup',
                title: 'Layout',
                icon: Layout,
                items: [
                    {
                        title: 'Menus',
                        routeName: 'admin.menus.index',
                        icon: ListTree,
                        adminOnly: true,
                    },
                ],
            },
            {
                type: 'subgroup',
                title: 'Mail Log',
                icon: Mail,
                badgeCountKey: 'mailLogCount',
                items: [
                    {
                        title: 'Sent Mail',
                        routeName: 'admin.mail-log.list',
                        icon: Mail,
                        adminOnly: true,
                        isActive: () => Boolean(route().current('admin.mail-log.list') || route().current('admin.mail-log.show')),
                    },
                    {
                        title: 'Settings',
                        routeName: 'admin.mail-log.settings',
                        icon: Settings,
                        adminOnly: true,
                    },
                ],
            },
        ],
    },
    {
        title: 'Other',
        items: [
            {
                type: 'subgroup',
                title: 'Settings',
                icon: Settings,
                items: [
                    { title: 'Appearance', routeName: 'admin.settings.theme', icon: Sun },
                    { title: 'Business Info', routeName: 'admin.settings.business', icon: Building2 },
                ],
            },
        ],
    },
];

export const isNavLinkActive = (item: Pick<NavLink, 'routeName' | 'isActive'>): boolean => {
    return item.isActive ? item.isActive() : Boolean(route().current(item.routeName));
};

export const getVisibleSubGroupItems = (
    subgroup: NavSubGroup,
    isAdmin: boolean
): Omit<NavLink, 'type'>[] => {
    return subgroup.items.filter((item) => !item.adminOnly || isAdmin);
};

export const isSubGroupActive = (subgroup: NavSubGroup, isAdmin: boolean): boolean => {
    return getVisibleSubGroupItems(subgroup, isAdmin).some((item) => isNavLinkActive(item));
};

export const getVisibleNavItems = (items: NavItem[], isAdmin: boolean): NavItem[] => {
    return items
        .map((item) => {
            if (isNavLink(item)) {
                return !item.adminOnly || isAdmin ? item : null;
            }

            const visibleChildren = getVisibleSubGroupItems(item, isAdmin);

            return visibleChildren.length > 0 ? item : null;
        })
        .filter((item): item is NavItem => item !== null);
};
