import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { PageEditorSidebar, type SidebarPanel } from '@/Components/Admin/Pages/PageEditorSidebar';
import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import { setAtPath } from '@/Components/CMS/paths';
import { resolveSchema } from '@/Components/CMS/schemaRegistry';
import { SectionCanvas } from '@/Components/CMS/SectionCanvas';
import { getSectionLabel } from '@/Components/CMS/sectionUtils';
import { stripUiKeys } from '@/Components/CMS/stripUiKeys';
import type { SchemaShape } from '@/Components/CMS/types';
import { Separator } from '@/Components/Admin/ui/separator';
import { Button } from '@/Components/UI/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/UI/Tabs';
import { cx } from '@/lib/utils';
import { PageEditPageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, ExternalLink, PanelRight } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';

export default function Edit({ auth, page }: PageEditPageProps) {
    const [schema, setSchema] = useState<SchemaShape | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(true);
    const [sidebarPanel, setSidebarPanel] = useState<SidebarPanel>('page-details');
    const [selectedSectionKey, setSelectedSectionKey] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, setData, transform, patch, processing, errors, recentlySuccessful } = useForm<{
        content: Record<string, any>;
        meta_title: string;
        meta_description: string;
        og_title: string;
        og_description: string;
        og_image: string;
        canonical_url: string;
        robots: string;
        structured_data: string;
    }>({
        content: {} as Record<string, any>,
        meta_title: page.meta_title ?? '',
        meta_description: page.meta_description ?? '',
        og_title: page.og_title ?? '',
        og_description: page.og_description ?? '',
        og_image: page.og_image ?? '',
        canonical_url: page.canonical_url ?? '',
        robots: page.robots ?? 'index, follow',
        structured_data: page.structured_data ?? '',
    });

    transform((formData) => ({ ...formData, content: stripUiKeys(formData.content) }));

    useEffect(() => {
        let cancelled = false;

        resolveSchema(page.component)
            .then((resolvedSchema) => {
                if (cancelled) return;
                setSchema(resolvedSchema);
                setData('content', mergeDefaults(resolvedSchema, page.content));
            })
            .catch((error: Error) => {
                if (!cancelled) setLoadError(error.message);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.id]);

    const selectedSectionLabel = useMemo(() => {
        if (!selectedSectionKey || !schema) {
            return null;
        }

        return getSectionLabel(selectedSectionKey, schema[selectedSectionKey]);
    }, [schema, selectedSectionKey]);

    const handleOpenSectionSettings = (key: string) => {
        setSelectedSectionKey(key);
        setSidebarPanel('section-settings');
        setDetailsOpen(true);
    };

    const handleCloseSectionSettings = () => {
        setSidebarPanel('page-details');
        setSelectedSectionKey(null);
    };

    const handleContentChange = (path: string, value: unknown) => {
        setData('content', setAtPath(data.content, path, value));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.pages.update', page.id));
    };

    const formattedDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

    const headerStart = (
        <>
            <Link
                href={route('admin.pages.list')}
                className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>

            <span className="truncate text-sm font-medium text-foreground max-w-48">
                {page.title}
            </span>
        </>
    );

    const headerEnd = (
        <div className="flex items-center gap-1">
            {recentlySuccessful && (
                <span className="text-sm text-muted-foreground hidden sm:inline">Saved.</span>
            )}

            <Button
                type="submit"
                form="page-edit-form"
                disabled={processing}
                className="h-8 px-3 text-sm"
            >
                Save
            </Button>

            <Separator orientation="vertical" />

            <a
                href={route(page.route_name)}
                target="_blank"
                rel="noopener noreferrer"
                title="View page"
                className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">View</span>
            </a>

            <button
                type="button"
                onClick={() => setDetailsOpen((open) => !open)}
                title={detailsOpen ? 'Hide sidebar' : 'Show sidebar'}
                className={cx(
                    'flex items-center justify-center rounded p-1.5 transition-colors',
                    detailsOpen
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
            >
                <PanelRight className="h-4 w-4" />
            </button>
        </div>
    );

    const metaTitleLen = data.meta_title.length;
    const metaDescLen = data.meta_description.length;

    return (
        <>
            <Head title={`Edit ${page.title}`} />
            <AdminPage fixed headerStart={headerStart} headerEnd={headerEnd}>
                <div className="flex h-full min-w-0 overflow-hidden -mx-4 -my-6">

                    {/* Main editor scroll area */}
                    <div className="min-w-0 flex-1 overflow-y-auto">
                        <form id="page-edit-form" onSubmit={submit}>
                            <Tabs defaultValue="content" className="flex flex-col h-full">
                                {/* Tab bar */}
                                <div className="border-b border-border px-4 pt-1">
                                    <TabsList variant="line" className="border-b-0">
                                        <TabsTrigger value="content">Content</TabsTrigger>
                                        <TabsTrigger value="seo">SEO</TabsTrigger>
                                    </TabsList>
                                </div>

                                {/* Content tab */}
                                <TabsContent value="content" className="flex-1 overflow-y-auto px-4 py-10">
                                    <div className="mx-auto max-w-4xl">
                                        {loadError && (
                                            <p className="mb-4 rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                                {loadError}
                                            </p>
                                        )}

                                        {schema && !loadError && (
                                            <SectionCanvas
                                                schema={schema}
                                                data={data.content}
                                                selectedSectionKey={selectedSectionKey}
                                                onSelectSection={handleOpenSectionSettings}
                                                onOpenSectionSettings={handleOpenSectionSettings}
                                            />
                                        )}

                                        {!schema && !loadError && (
                                            <div className="flex items-center justify-center py-24 text-sm text-muted-foreground">
                                                Loading schema…
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                {/* SEO tab */}
                                <TabsContent value="seo" className="flex-1 overflow-y-auto px-4 py-10">
                                    <div className="mx-auto max-w-3xl space-y-8">

                                        {/* SERP Preview */}
                                        <div>
                                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search Preview</p>
                                            <div className="rounded-lg border border-border bg-card p-4 space-y-0.5">
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {typeof window !== 'undefined' ? window.location.origin : ''}{data.canonical_url || `/${page.route_name}`}
                                                </p>
                                                <p className="text-base font-medium text-blue-600 dark:text-blue-400 truncate">
                                                    {data.meta_title || page.title}
                                                </p>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {data.meta_description || 'No meta description set.'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Basic SEO */}
                                        <div className="space-y-5">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Basic SEO</p>

                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="seo-meta-title" className="text-sm font-medium text-foreground">
                                                        Title Tag
                                                    </label>
                                                    <span className={cx('text-xs', metaTitleLen > 60 ? 'text-destructive' : 'text-muted-foreground')}>
                                                        {metaTitleLen}/60
                                                    </span>
                                                </div>
                                                <input
                                                    id="seo-meta-title"
                                                    type="text"
                                                    value={data.meta_title}
                                                    onChange={(e) => setData('meta_title', e.target.value)}
                                                    placeholder={page.title}
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                                <p className="text-xs text-muted-foreground">Overrides the browser tab title and search result headline. Leave blank to use the page title.</p>
                                            </div>

                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="seo-meta-desc" className="text-sm font-medium text-foreground">
                                                        Meta Description
                                                    </label>
                                                    <span className={cx('text-xs', metaDescLen > 160 ? 'text-destructive' : 'text-muted-foreground')}>
                                                        {metaDescLen}/160
                                                    </span>
                                                </div>
                                                <textarea
                                                    id="seo-meta-desc"
                                                    rows={3}
                                                    value={data.meta_description}
                                                    onChange={(e) => setData('meta_description', e.target.value)}
                                                    placeholder="Brief summary of this page shown in search results…"
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="border-t border-border" />

                                        {/* Open Graph */}
                                        <div className="space-y-5">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Open Graph / Social Sharing</p>

                                            <div className="space-y-1.5">
                                                <label htmlFor="seo-og-title" className="text-sm font-medium text-foreground block">
                                                    OG Title
                                                </label>
                                                <input
                                                    id="seo-og-title"
                                                    type="text"
                                                    value={data.og_title}
                                                    onChange={(e) => setData('og_title', e.target.value)}
                                                    placeholder={data.meta_title || page.title}
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                                <p className="text-xs text-muted-foreground">Title shown when shared on Facebook, LinkedIn, etc. Defaults to Title Tag.</p>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="seo-og-desc" className="text-sm font-medium text-foreground block">
                                                    OG Description
                                                </label>
                                                <textarea
                                                    id="seo-og-desc"
                                                    rows={3}
                                                    value={data.og_description}
                                                    onChange={(e) => setData('og_description', e.target.value)}
                                                    placeholder={data.meta_description || 'Description shown when shared on social media…'}
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="seo-og-image" className="text-sm font-medium text-foreground block">
                                                    OG Image URL
                                                </label>
                                                <input
                                                    id="seo-og-image"
                                                    type="url"
                                                    value={data.og_image}
                                                    onChange={(e) => setData('og_image', e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                                <p className="text-xs text-muted-foreground">Recommended size: 1200×630px. Shown as the link preview image on social platforms.</p>
                                                {data.og_image && (
                                                    <img
                                                        src={data.og_image}
                                                        alt="OG image preview"
                                                        className="mt-2 h-24 w-auto rounded border border-border object-cover"
                                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="border-t border-border" />

                                        {/* Advanced */}
                                        <div className="space-y-5">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Advanced</p>

                                            <div className="space-y-1.5">
                                                <label htmlFor="seo-canonical" className="text-sm font-medium text-foreground block">
                                                    Canonical URL
                                                </label>
                                                <input
                                                    id="seo-canonical"
                                                    type="url"
                                                    value={data.canonical_url}
                                                    onChange={(e) => setData('canonical_url', e.target.value)}
                                                    placeholder="https://yourdomain.com/page"
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                                <p className="text-xs text-muted-foreground">Only set if this page has duplicate content elsewhere. Leave blank for the default URL.</p>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="seo-robots" className="text-sm font-medium text-foreground block">
                                                    Robots
                                                </label>
                                                <select
                                                    id="seo-robots"
                                                    value={data.robots}
                                                    onChange={(e) => setData('robots', e.target.value)}
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                                >
                                                    <option value="index, follow">index, follow (default)</option>
                                                    <option value="noindex, follow">noindex, follow — hide from search, follow links</option>
                                                    <option value="index, nofollow">index, nofollow — index page, don't follow links</option>
                                                    <option value="noindex, nofollow">noindex, nofollow — hide from search entirely</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="border-t border-border" />

                                        {/* Structured Data */}
                                        <div className="space-y-5">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Structured Data</p>
                                                <p className="mt-1 text-xs text-muted-foreground">JSON-LD schema markup injected into the page <code>&lt;head&gt;</code>. Helps Google understand your content (LocalBusiness, FAQPage, etc).</p>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="seo-structured-data" className="text-sm font-medium text-foreground block">
                                                    JSON-LD Schema
                                                </label>
                                                <textarea
                                                    id="seo-structured-data"
                                                    rows={10}
                                                    value={data.structured_data}
                                                    onChange={(e) => setData('structured_data', e.target.value)}
                                                    placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "name": "Your Business"\n}'}
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                                                    spellCheck={false}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </TabsContent>
                            </Tabs>
                        </form>
                    </div>

                    <PageEditorSidebar
                        open={detailsOpen}
                        panel={sidebarPanel}
                        page={page}
                        selectedSectionKey={selectedSectionKey}
                        selectedSectionLabel={selectedSectionLabel}
                        schema={schema}
                        content={data.content}
                        errors={errors as Record<string, string>}
                        onChange={handleContentChange}
                        onCloseSectionSettings={handleCloseSectionSettings}
                        formattedDate={formattedDate}
                    />
                </div>
            </AdminPage>
        </>
    );
}
