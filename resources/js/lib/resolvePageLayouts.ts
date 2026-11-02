import { ComponentType, ReactNode } from 'react';

type LayoutComponent = ComponentType<{ children: ReactNode }>;
type PageModule = { default: { layout?: LayoutComponent | LayoutComponent[] } };

// Mirrors Next.js's app-router convention: a `layout.tsx` file in a Pages/
// directory automatically wraps every page in that directory and below it,
// nesting outer-to-inner with any layout.tsx files in parent directories.
// Loaded lazily so layouts code-split instead of landing in the main chunk
// (and so they are not both statically and dynamically imported).
const layoutModules = import.meta.glob<{ default: LayoutComponent }>(
    '../Pages/**/layout.tsx',
);

/**
 * Given an Inertia page name (e.g. "Admin/Settings/Theme") and its resolved
 * module, assigns the matching chain of layout.tsx components to the page's
 * `.layout` static property (Inertia's persistent-layout API), unless the
 * page already defines its own `.layout` — a manual override always wins.
 */
export async function applyPageLayouts(
    name: string,
    module: PageModule,
): Promise<PageModule> {
    if (module.default.layout) {
        return module;
    }

    const segments = name.split('/').slice(0, -1);
    const loaders: Array<() => Promise<{ default: LayoutComponent }>> = [];

    let dir = '';
    for (const segment of segments) {
        dir = dir ? `${dir}/${segment}` : segment;
        const loader = layoutModules[`../Pages/${dir}/layout.tsx`];
        if (loader) {
            loaders.push(loader);
        }
    }

    if (loaders.length === 0) {
        return module;
    }

    const loaded = await Promise.all(loaders.map((load) => load()));
    module.default.layout = loaded.map((layoutModule) => layoutModule.default);

    return module;
}
