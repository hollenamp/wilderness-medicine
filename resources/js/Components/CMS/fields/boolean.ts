import type { BooleanField } from '../types';

export function boolean(config: Omit<BooleanField, 'type' | 'label'> & { label?: string }): BooleanField {
    return { type: 'boolean', label: config.label ?? '', ...config };
}
