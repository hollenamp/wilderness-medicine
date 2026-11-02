import type { ColorField } from '../types';

export function color(config: Omit<ColorField, 'type' | 'label'> & { label?: string }): ColorField {
    return { type: 'color', label: config.label ?? '', ...config };
}
