import type { SelectField } from '../types';

export function select<TOption extends string = string>(
    config: Omit<SelectField<TOption>, 'type' | 'label'> & { label?: string },
): SelectField<TOption> {
    return { type: 'select', label: config.label ?? '', ...config };
}
