import type { SchemaShape } from './types';

export function definePage<S extends SchemaShape>(schema: S): S {
    return schema;
}
