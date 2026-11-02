import { PageSectionBlock } from './PageSectionBlock';
import {
    getSectionLabel,
    getSectionPreview,
    getTopLevelSections,
    resolveSectionSchema,
} from './sectionUtils';
import type { SchemaShape } from './types';

interface SectionCanvasProps {
    schema: SchemaShape;
    data: Record<string, unknown>;
    selectedSectionKey: string | null;
    onSelectSection: (key: string) => void;
    onOpenSectionSettings: (key: string) => void;
}

export function SectionCanvas({
    schema,
    data,
    selectedSectionKey,
    onSelectSection,
    onOpenSectionSettings,
}: SectionCanvasProps) {
    const sections = getTopLevelSections(schema);

    return (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 md:p-6">
            <div className="space-y-3">
                {sections.map(({ key, node }) => {
                    const sectionSchema = resolveSectionSchema(node);
                    const sectionData = (data[key] as Record<string, unknown>) ?? {};

                    return (
                        <PageSectionBlock
                            key={key}
                            label={getSectionLabel(key, node)}
                            preview={getSectionPreview(sectionData, sectionSchema)}
                            isSelected={selectedSectionKey === key}
                            onSelect={() => onSelectSection(key)}
                            onOpenSettings={() => onOpenSectionSettings(key)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
