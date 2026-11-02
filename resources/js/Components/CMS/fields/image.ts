import type { ImageField } from '../types';

export function image(config: Omit<ImageField, 'type' | 'label'> & { label?: string }): ImageField {
    return { type: 'image', label: config.label ?? '', ...config };
}
