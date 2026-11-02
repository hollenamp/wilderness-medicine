import type { RepeaterField, SchemaShape } from '../types';

export function repeater<TItemSchema extends SchemaShape>(
    config: Omit<RepeaterField<TItemSchema>, 'type' | 'label' | 'default'> & {
        label?: string;
        default?: Record<string, unknown>[];
    },
): RepeaterField<TItemSchema> {
    return {
        type: 'repeater',
        label: config.label ?? '',
        default: config.default ?? [],
        ...config,
    };
}
