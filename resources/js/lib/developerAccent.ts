export const DEVELOPER_ACCENT_COLORS = [
    'blue',
    'emerald',
    'violet',
    'amber',
    'cyan',
    'pink',
    'lime',
    'fuchsia',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'sky',
    'indigo',
    'purple',
    'rose',
    'slate',
    'zinc',
    'stone',
] as const;

export type DeveloperAccentColor = (typeof DEVELOPER_ACCENT_COLORS)[number];

const accentBgClasses: Record<DeveloperAccentColor, string> = {
    blue: '!bg-blue-500',
    emerald: '!bg-emerald-500',
    violet: '!bg-violet-500',
    amber: '!bg-amber-500',
    cyan: '!bg-cyan-500',
    pink: '!bg-pink-500',
    lime: '!bg-lime-500',
    fuchsia: '!bg-fuchsia-500',
    red: '!bg-red-500',
    orange: '!bg-orange-500',
    yellow: '!bg-yellow-500',
    green: '!bg-green-500',
    teal: '!bg-teal-500',
    sky: '!bg-sky-500',
    indigo: '!bg-indigo-500',
    purple: '!bg-purple-500',
    rose: '!bg-rose-500',
    slate: '!bg-slate-500',
    zinc: '!bg-zinc-500',
    stone: '!bg-stone-500',
};

const accentRingClasses: Record<DeveloperAccentColor, string> = {
    blue: 'ring-blue-500',
    emerald: 'ring-emerald-500',
    violet: 'ring-violet-500',
    amber: 'ring-amber-500',
    cyan: 'ring-cyan-500',
    pink: 'ring-pink-500',
    lime: 'ring-lime-500',
    fuchsia: 'ring-fuchsia-500',
    red: 'ring-red-500',
    orange: 'ring-orange-500',
    yellow: 'ring-yellow-500',
    green: 'ring-green-500',
    teal: 'ring-teal-500',
    sky: 'ring-sky-500',
    indigo: 'ring-indigo-500',
    purple: 'ring-purple-500',
    rose: 'ring-rose-500',
    slate: 'ring-slate-500',
    zinc: 'ring-zinc-500',
    stone: 'ring-stone-500',
};

export function developerAccentBgClass(color?: string | null): string {
    if (color && color in accentBgClasses) {
        return accentBgClasses[color as DeveloperAccentColor];
    }

    return '!bg-zinc-500';
}

export function developerAccentRingClass(color?: string | null): string {
    if (color && color in accentRingClasses) {
        return accentRingClasses[color as DeveloperAccentColor];
    }

    return 'ring-zinc-500';
}
