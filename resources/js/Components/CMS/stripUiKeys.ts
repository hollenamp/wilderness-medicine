export function stripUiKeys<T>(value: T): T {
    if (Array.isArray(value)) {
        return value.map((item) => stripUiKeys(item)) as unknown as T;
    }

    if (value !== null && typeof value === 'object') {
        const out: Record<string, unknown> = {};
        for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
            if (key === '_uiKey') continue;
            out[key] = stripUiKeys(val);
        }
        return out as T;
    }

    return value;
}
