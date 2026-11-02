// Curated set of Lucide icon names available to `field.icon()`, seeded from
// icons already used across Components/Sections. Kept as a closed allowlist
// (not free text) so the admin UI can't typo an icon name, and so a future
// AI generation pipeline has a validatable set of values to choose from.
export const iconAllowlist = [
    'arrow-down',
    'arrow-right',
    'award',
    'book-open',
    'building-2',
    'chevron-down',
    'chevron-right',
    'clock',
    'compass',
    'facebook',
    'flame',
    'globe',
    'handshake',
    'instagram',
    'linkedin',
    'mail',
    'map-pin',
    'package',
    'phone',
    'search',
    'server',
    'shield-check',
    'sparkles',
    'users',
    'wrench',
] as const;

export type IconName = (typeof iconAllowlist)[number];
