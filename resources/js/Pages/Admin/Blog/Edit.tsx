import { useState, type FormEventHandler } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Separator } from '@/Components/Admin/ui/separator';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BlogCategory, BlogPostEditPageProps, Media } from '@/types';
import { ChevronLeft, ExternalLink, ImagePlus, Loader2 } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { Textarea } from '@/Components/Inputs/TextArea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/UI/Tabs';
import { MediaManagerDialog } from '@/Components/Admin/Media/MediaManagerDialog';
import { RichTextEditor } from '@/Components/Admin/RichTextEditor';
import { BlogCategoryMultiSelect } from '@/Components/Admin/Blog/BlogCategoryMultiSelect';
import { cx } from '@/lib/utils';

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function toDateInputValue(value: string | null): string {
    if (!value) return '';
    return value.slice(0, 10);
}

export default function Edit({ auth, post, categories: allCategories, authors }: BlogPostEditPageProps) {
    const isCreate = post === null;
    const [slugTouched, setSlugTouched] = useState(!isCreate);
    const [selectedCategories, setSelectedCategories] = useState<BlogCategory[]>(post?.categories ?? []);
    const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
    const [featuredImage, setFeaturedImage] = useState<Media | null>(post?.featured_image ?? null);

    const form = useForm({
        title: post?.title ?? '',
        slug: post?.slug ?? '',
        excerpt: post?.excerpt ?? '',
        content: post?.content ?? '',
        featured_image_id: post?.featured_image_id ?? null,
        status: post?.status ?? 'draft',
        published_at: toDateInputValue(post?.published_at ?? null),
        user_id: (post?.user_id ?? auth.user.id) as number | null,
        category_ids: (post?.categories ?? []).map((c) => c.id),
        meta_title: post?.meta_title ?? '',
        meta_description: post?.meta_description ?? '',
        og_title: post?.og_title ?? '',
        og_description: post?.og_description ?? '',
        og_image: post?.og_image ?? '',
        canonical_url: post?.canonical_url ?? '',
        robots: post?.robots ?? 'index, follow',
        structured_data: post?.structured_data ?? '',
    });

    const handleTitleChange = (value: string) => {
        form.setData('title', value);
        if (!slugTouched) {
            form.setData('slug', slugify(value));
        }
    };

    const handleCategoriesChange = (next: BlogCategory[]) => {
        setSelectedCategories(next);
        form.setData('category_ids', next.map((c) => c.id));
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isCreate) {
            form.post(route('admin.blog.store'));
        } else {
            form.patch(route('admin.blog.update', post!.id));
        }
    };

    const headerStart = (
        <>
            <Link
                href={route('admin.blog.list')}
                className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>
            <span className="max-w-48 truncate text-sm font-medium text-foreground">
                {isCreate ? 'New post' : post!.title}
            </span>
        </>
    );

    const headerEnd = (
        <div className="flex items-center gap-1">
            <Button type="submit" form="blog-edit-form" disabled={form.processing} className="h-8 gap-1.5 px-3 text-sm">
                {form.processing && <Loader2 className="size-3.5 animate-spin" />}
                Save
            </Button>

            {!isCreate && post!.status === 'published' && (
                <>
                    <Separator orientation="vertical" />
                    <a
                        href={route('blog.show', post!.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View post"
                        className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" />
                        <span className="hidden sm:inline">View</span>
                    </a>
                </>
            )}
        </div>
    );

    const metaTitleLen = form.data.meta_title.length;
    const metaDescLen = form.data.meta_description.length;

    return (
        <AdminPage headerStart={headerStart} headerEnd={headerEnd}>
            <Head title={isCreate ? 'New post' : `Edit ${post!.title}`} />

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">{isCreate ? 'New Post' : 'Edit Post'}</h1>
            </div>

            <form id="blog-edit-form" onSubmit={handleSubmit}>
                <Tabs defaultValue="content">
                    <div className="border-b border-border">
                        <TabsList variant="line" className="border-b-0">
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="seo">SEO</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="content" className="py-6">
                        <div className="space-y-6">
                            <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        className="mt-1"
                                        value={form.data.title}
                                        hasError={Boolean(form.errors.title)}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                    />
                                    {form.errors.title && <p className="mt-1 text-sm text-destructive">{form.errors.title}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        className="mt-1 font-mono"
                                        value={form.data.slug}
                                        hasError={Boolean(form.errors.slug)}
                                        onChange={(e) => {
                                            setSlugTouched(true);
                                            form.setData('slug', e.target.value);
                                        }}
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">/blog/{form.data.slug || 'your-post-slug'}</p>
                                    {form.errors.slug && <p className="mt-1 text-sm text-destructive">{form.errors.slug}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        rows={2}
                                        className="mt-1"
                                        value={form.data.excerpt}
                                        hasError={Boolean(form.errors.excerpt)}
                                        onChange={(e) => form.setData('excerpt', e.target.value)}
                                    />
                                    {form.errors.excerpt && <p className="mt-1 text-sm text-destructive">{form.errors.excerpt}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <div className="mt-1">
                                        <RichTextEditor
                                            id="content"
                                            value={form.data.content}
                                            hasError={Boolean(form.errors.content)}
                                            onChange={(html) => form.setData('content', html)}
                                        />
                                    </div>
                                    {form.errors.content && <p className="mt-1 text-sm text-destructive">{form.errors.content}</p>}
                                </div>
                            </div>

                            <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                                <h3 className="font-semibold text-foreground">Publishing</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            value={form.data.status}
                                            onChange={(e) => form.setData('status', e.target.value as 'draft' | 'published')}
                                            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="published_at">Published date</Label>
                                        <Input
                                            id="published_at"
                                            type="date"
                                            className="mt-1"
                                            value={form.data.published_at}
                                            onChange={(e) => form.setData('published_at', e.target.value)}
                                        />
                                        <p className="mt-1 text-xs text-muted-foreground">Defaults to today when left blank and published.</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="user_id">Author</Label>
                                        <select
                                            id="user_id"
                                            value={form.data.user_id ?? ''}
                                            onChange={(e) => form.setData('user_id', e.target.value ? Number(e.target.value) : null)}
                                            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            <option value="">No author</option>
                                            {authors.map((author) => (
                                                <option key={author.id} value={author.id}>
                                                    {author.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-foreground">Featured image</h3>
                                    <Button
                                        type="button"
                                        variant="secondaryOutline"
                                        className="h-8 gap-1.5 px-3 text-sm"
                                        onClick={() => setMediaDialogOpen(true)}
                                    >
                                        <ImagePlus className="size-4" />
                                        {form.data.featured_image_id ? 'Change image' : 'Select image'}
                                    </Button>
                                </div>
                                {featuredImage ? (
                                    <img
                                        src={featuredImage.url}
                                        alt={featuredImage.alt_text ?? ''}
                                        className="h-40 w-auto rounded border border-border object-cover"
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">No featured image selected.</p>
                                )}
                            </div>

                            <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                                <h3 className="font-semibold text-foreground">Categories</h3>
                                <BlogCategoryMultiSelect value={selectedCategories} onChange={handleCategoriesChange} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="seo" className="py-6">
                        <div className="mx-auto max-w-3xl space-y-8">
                            {/* SERP Preview */}
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search Preview</p>
                                <div className="rounded-lg border border-border bg-card p-4 space-y-0.5">
                                    <p className="text-xs text-muted-foreground truncate">
                                        {typeof window !== 'undefined' ? window.location.origin : ''}/blog/{form.data.slug}
                                    </p>
                                    <p className="text-base font-medium text-blue-600 dark:text-blue-400 truncate">
                                        {form.data.meta_title || form.data.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {form.data.meta_description || 'No meta description set.'}
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
                                        value={form.data.meta_title}
                                        onChange={(e) => form.setData('meta_title', e.target.value)}
                                        placeholder={form.data.title}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <p className="text-xs text-muted-foreground">Overrides the browser tab title and search result headline. Leave blank to use the post title.</p>
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
                                        value={form.data.meta_description}
                                        onChange={(e) => form.setData('meta_description', e.target.value)}
                                        placeholder="Brief summary of this post shown in search results…"
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
                                        value={form.data.og_title}
                                        onChange={(e) => form.setData('og_title', e.target.value)}
                                        placeholder={form.data.meta_title || form.data.title}
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
                                        value={form.data.og_description}
                                        onChange={(e) => form.setData('og_description', e.target.value)}
                                        placeholder={form.data.meta_description || 'Description shown when shared on social media…'}
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
                                        value={form.data.og_image}
                                        onChange={(e) => form.setData('og_image', e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <p className="text-xs text-muted-foreground">Recommended size: 1200×630px. Shown as the link preview image on social platforms.</p>
                                    {form.data.og_image && (
                                        <img
                                            src={form.data.og_image}
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
                                        value={form.data.canonical_url}
                                        onChange={(e) => form.setData('canonical_url', e.target.value)}
                                        placeholder="https://yourdomain.com/blog/post"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <p className="text-xs text-muted-foreground">Only set if this post has duplicate content elsewhere. Leave blank for the default URL.</p>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="seo-robots" className="text-sm font-medium text-foreground block">
                                        Robots
                                    </label>
                                    <select
                                        id="seo-robots"
                                        value={form.data.robots}
                                        onChange={(e) => form.setData('robots', e.target.value)}
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
                                    <p className="mt-1 text-xs text-muted-foreground">JSON-LD schema markup injected into the page <code>&lt;head&gt;</code>. Helps Google understand your content (Article, BlogPosting, etc).</p>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="seo-structured-data" className="text-sm font-medium text-foreground block">
                                        JSON-LD Schema
                                    </label>
                                    <textarea
                                        id="seo-structured-data"
                                        rows={10}
                                        value={form.data.structured_data}
                                        onChange={(e) => form.setData('structured_data', e.target.value)}
                                        placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "Your post title"\n}'}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                                        spellCheck={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </form>

            <MediaManagerDialog
                open={mediaDialogOpen}
                onOpenChange={setMediaDialogOpen}
                selectTitle="Select featured image"
                onSelect={(media) => {
                    setFeaturedImage(media);
                    form.setData('featured_image_id', media.id);
                }}
            />
        </AdminPage>
    );
}
