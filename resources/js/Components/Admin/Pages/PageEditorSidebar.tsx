import { FormRenderer } from '@/Components/CMS/FormRenderer';
import { resolveSectionSchema } from '@/Components/CMS/sectionUtils';
import type { SchemaShape } from '@/Components/CMS/types';
import { Separator } from '@/Components/Admin/ui/separator';
import { Button } from '@/Components/UI/Button';
import { cx } from '@/lib/utils';
import type { Page } from '@/types';
import { Calendar, ExternalLink, Eye, EyeOff, Layout, Route, X } from 'lucide-react';

export type SidebarPanel = 'page-details' | 'section-settings';

interface PageEditorSidebarProps {
    open: boolean;
    panel: SidebarPanel;
    page: Page;
    selectedSectionKey: string | null;
    selectedSectionLabel: string | null;
    schema: SchemaShape | null;
    content: Record<string, unknown>;
    errors: Record<string, string>;
    onChange: (path: string, value: unknown) => void;
    onCloseSectionSettings: () => void;
    formattedDate: (date: string) => string;
}

export function PageEditorSidebar({
    open,
    panel,
    page,
    selectedSectionKey,
    selectedSectionLabel,
    schema,
    content,
    errors,
    onChange,
    onCloseSectionSettings,
    formattedDate,
}: PageEditorSidebarProps) {
    const sectionNode =
        selectedSectionKey && schema ? schema[selectedSectionKey] : null;

    return (
        <aside
            className={cx(
                'shrink-0 overflow-x-hidden overflow-y-auto border-l border-border bg-card transition-[width] duration-200 ease-in-out',
                open ? 'w-[26rem]' : 'w-0 overflow-hidden border-l-0',
            )}
        >
            <div className="w-[26rem] p-5 space-y-5">
                {panel === 'section-settings' ? (
                    <>
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Section Settings
                                </p>
                                {selectedSectionLabel && (
                                    <p className="mt-1 truncate text-sm font-medium text-foreground">
                                        {selectedSectionLabel}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                className="h-8 w-8 shrink-0 p-0"
                                onClick={onCloseSectionSettings}
                                aria-label="Close section settings"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="border-t border-border" />

                        {sectionNode && selectedSectionKey ? (
                            <FormRenderer
                                schema={resolveSectionSchema(sectionNode)}
                                data={(content[selectedSectionKey] as Record<string, unknown>) ?? {}}
                                errors={errors}
                                onChange={onChange}
                                basePath={selectedSectionKey}
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">Select a section to edit its settings.</p>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Page Details
                        </p>

                        <div className="border-t border-border" />

                        <div>
                            <p className="mb-2 text-xs text-muted-foreground">Status</p>
                            <div className="flex items-center gap-2">
                                {page.is_visible ? (
                                    <>
                                        <Eye className="h-4 w-4 text-green-500" />
                                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                            Published
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium text-muted-foreground">Hidden</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-border" />

                        <div>
                            <p className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Route className="h-3.5 w-3.5" />
                                Route
                            </p>
                            <p className="break-all font-mono text-sm text-foreground">{page.route_name}</p>
                        </div>

                        <div>
                            <p className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Layout className="h-3.5 w-3.5" />
                                Template
                            </p>
                            <p className="break-all font-mono text-sm text-foreground">{page.component}</p>
                        </div>

                        <div className="border-t border-border" />

                        <div>
                            <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                Dates
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Created</span>
                                    <span className="text-foreground">{formattedDate(page.created_at)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last edited</span>
                                    <span className="text-foreground">{formattedDate(page.updated_at)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-border" />

                        <a
                            href={route(page.route_name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            <ExternalLink className="h-4 w-4" />
                            View Page
                        </a>
                    </>
                )}
            </div>
        </aside>
    );
}
