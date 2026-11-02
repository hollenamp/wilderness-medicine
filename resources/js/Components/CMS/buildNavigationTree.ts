import type { NavItem } from '@/Pages/Public/navigation';
import type { MenuItem } from '@/types';

export function buildNavigationTree(items: MenuItem[]): NavItem[] {
    const byParent = new Map<number | null, MenuItem[]>();

    items.forEach((item) => {
        const siblings = byParent.get(item.parent_id) ?? [];
        siblings.push(item);
        byParent.set(item.parent_id, siblings);
    });

    const build = (parentId: number | null): NavItem[] =>
        (byParent.get(parentId) ?? [])
            .slice()
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((item) => {
                const children = build(item.id);
                return {
                    label: item.label,
                    href: item.url,
                    ...(children.length > 0 ? { children } : {}),
                };
            });

    return build(null);
}
