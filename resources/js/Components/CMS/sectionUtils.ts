import { isFieldConfig, isGroupNode, type SchemaNode, type SchemaShape } from './types';

const PREVIEW_MAX_LENGTH = 120;

export interface TopLevelSection {
    key: string;
    node: SchemaNode;
}

export function getTopLevelSections(schema: SchemaShape): TopLevelSection[] {
    return Object.entries(schema).map(([key, node]) => ({ key, node }));
}

export function resolveSectionSchema(node: SchemaNode): SchemaShape {
    if (isGroupNode(node)) {
        return node.fields;
    }

    return node as SchemaShape;
}

export function humanizeSectionKey(key: string): string {
    return key.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getSectionLabel(key: string, node: SchemaNode): string {
    if (isGroupNode(node) && node.label) {
        return node.label;
    }

    return humanizeSectionKey(key);
}

function truncatePreview(text: string): string {
    const normalized = text.replace(/\s+/g, ' ').trim();

    if (normalized.length <= PREVIEW_MAX_LENGTH) {
        return normalized;
    }

    return `${normalized.slice(0, PREVIEW_MAX_LENGTH).trimEnd()}…`;
}

function findPreviewInSchema(
    sectionSchema: SchemaShape,
    sectionData: Record<string, unknown>,
): string | null {
    for (const [fieldKey, fieldNode] of Object.entries(sectionSchema)) {
        const value = sectionData[fieldKey];

        if (isFieldConfig(fieldNode)) {
            if (fieldNode.type === 'text' || fieldNode.type === 'textarea') {
                const text = typeof value === 'string' ? value.trim() : '';

                if (text) {
                    return truncatePreview(text);
                }
            }

            continue;
        }

        if (isGroupNode(fieldNode)) {
            const nestedPreview = findPreviewInSchema(
                fieldNode.fields,
                (value as Record<string, unknown>) ?? {},
            );

            if (nestedPreview) {
                return nestedPreview;
            }

            continue;
        }

        const nestedPreview = findPreviewInSchema(
            fieldNode as SchemaShape,
            (value as Record<string, unknown>) ?? {},
        );

        if (nestedPreview) {
            return nestedPreview;
        }
    }

    return null;
}

export function getSectionPreview(
    sectionData: Record<string, unknown> | undefined,
    sectionSchema: SchemaShape,
): string {
    const preview = findPreviewInSchema(sectionSchema, sectionData ?? {});

    return preview ?? 'No content yet';
}
