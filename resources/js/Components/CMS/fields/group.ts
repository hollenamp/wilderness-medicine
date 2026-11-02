import type { GroupNode, SchemaShape } from '../types';

export function group<S extends SchemaShape>(config: { label?: string; fields: S }): GroupNode & { fields: S } {
    return { __group: true, label: config.label, fields: config.fields };
}
