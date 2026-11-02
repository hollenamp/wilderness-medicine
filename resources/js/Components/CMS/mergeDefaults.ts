import { isFieldConfig, isGroupNode, isRepeaterField, type SchemaShape } from './types';

export function mergeDefaults(schema: SchemaShape, saved: unknown): Record<string, unknown> {
    return mergeNode(schema, saved) as Record<string, unknown>;
}

function mergeNode(node: unknown, saved: unknown): unknown {
    if (isRepeaterField(node)) {
        const items = Array.isArray(saved)
            ? saved
            : Array.isArray(node.default)
              ? node.default
              : node.minRows
                ? Array(node.minRows).fill({})
                : [];
        return items.map((item) => ({
            ...(mergeNode(node.itemSchema, item) as Record<string, unknown>),
            _uiKey: crypto.randomUUID(),
        }));
    }

    if (isFieldConfig(node)) {
        const value = saved;
        return value !== undefined && value !== null ? value : node.default;
    }

    if (isGroupNode(node)) {
        return mergeNode(node.fields, saved);
    }

    // plain nested object — recurse over schema keys only
    const schemaObj = node as SchemaShape;
    const savedObj = (saved as Record<string, unknown> | null) ?? {};
    const out: Record<string, unknown> = {};

    for (const key of Object.keys(schemaObj)) {
        out[key] = mergeNode(schemaObj[key], savedObj[key]);
    }

    return out;
}
