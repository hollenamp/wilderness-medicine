import type { TextField } from '../types';

export function text(config: Omit<TextField, 'type' | 'label'> & { label?: string }): TextField {
    return { type: 'text', label: config.label ?? '', ...config };
}
