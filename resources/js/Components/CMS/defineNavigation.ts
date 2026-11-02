/**
 * Identity helper for the public navigation registry — mirrors `definePage`
 * so location keys, labels, and defaults stay co-located in navigation.ts.
 */
export function defineNavigation<T extends Record<string, { label: string; defaults: unknown }>>(
    locations: T,
): T {
    return locations;
}
