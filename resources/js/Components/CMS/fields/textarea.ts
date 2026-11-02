import type { TextareaField } from '../types';

export function textarea(config: Omit<TextareaField, 'type' | 'label'> & { label?: string }): TextareaField {
    return { type: 'textarea', label: config.label ?? '', ...config };
}
