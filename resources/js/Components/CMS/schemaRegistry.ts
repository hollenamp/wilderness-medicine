import type { SchemaShape } from './types';

// Auto-discovers every Pages/{Component}/schema.ts at build time — adding a
// new page folder makes its schema available with no manual registration.
const schemaModules = import.meta.glob<{ default: SchemaShape }>('../../Pages/**/schema.ts');

export function resolveSchema(component: string): Promise<SchemaShape> {
    const path = `../../Pages/${component}/schema.ts`;
    const loader = schemaModules[path];

    if (!loader) {
        throw new Error(`No schema.ts found for page component "${component}"`);
    }

    return loader().then((m) => m.default);
}
