export function getAtPath(obj: unknown, path: string): unknown {
    const segments = path.split('.');
    let current: unknown = obj;

    for (const segment of segments) {
        if (current === null || current === undefined) return undefined;
        current = (current as Record<string, unknown>)[segment];
    }

    return current;
}

export function setAtPath<T>(obj: T, path: string, value: unknown): T {
    const segments = path.split('.');
    return setAtPathSegments(obj, segments, value) as T;
}

function setAtPathSegments(obj: unknown, segments: string[], value: unknown): unknown {
    const [head, ...rest] = segments;
    const isArrayIndex = /^\d+$/.test(head);

    if (Array.isArray(obj)) {
        const index = Number(head);
        const next = [...obj];
        next[index] = rest.length === 0 ? value : setAtPathSegments(next[index], rest, value);
        return next;
    }

    const base = (obj as Record<string, unknown> | null | undefined) ?? (isArrayIndex ? [] : {});
    const next: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    next[head] = rest.length === 0 ? value : setAtPathSegments(next[head], rest, value);
    return next;
}
