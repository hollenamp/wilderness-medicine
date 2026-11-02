import { buildNavigationTree } from '@/Components/CMS/buildNavigationTree';
import { navigation, type NavItem, type NavigationLocation } from '@/Pages/Public/navigation';
import type { ClassNavItem, MenuItem } from '@/types';

export type NavigationLocationData = {
    isCustomized: boolean;
    items: MenuItem[];
};

export type NavigationBag = Partial<Record<NavigationLocation, NavigationLocationData>>;

const classPageHrefs = new Set<string>([]);

export function mergeClassNavItems(items: NavItem[], classNavItems: ClassNavItem[] = []): NavItem[] {
    if (classNavItems.length === 0) {
        return items;
    }

    return items.map((item) => {
        if (item.label !== 'Classes') {
            return item;
        }

        const existingChildren = item.children ?? [];
        const existingHrefs = new Set(existingChildren.map((child) => child.href));
        const extras: NavItem[] = classNavItems
            .filter((course) => !existingHrefs.has(course.href))
            .map((course) => ({
                label: course.title,
                href: course.href,
            }));

        if (extras.length === 0) {
            return item;
        }

        const catalog = existingChildren.filter((child) => !classPageHrefs.has(child.href));
        const pages = existingChildren.filter((child) => classPageHrefs.has(child.href));

        return {
            ...item,
            children: [...catalog, ...extras, ...pages],
        };
    });
}

export function resolveNavigation(
    location: NavigationLocationData | undefined,
    defaults: NavItem[],
    classNavItems: ClassNavItem[] = [],
): NavItem[] {
    if (!location?.isCustomized) {
        return mergeClassNavItems(defaults, classNavItems);
    }

    return buildNavigationTree(location.items);
}

export function resolveLocation(
    bag: NavigationBag,
    key: NavigationLocation,
    classNavItems: ClassNavItem[] = [],
): NavItem[] {
    return resolveNavigation(bag[key], navigation[key].defaults, classNavItems);
}
