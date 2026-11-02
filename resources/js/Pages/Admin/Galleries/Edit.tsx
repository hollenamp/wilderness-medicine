import { useEffect, useState, type FormEventHandler } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Category, GalleryEditPageProps, Media } from '@/types';
import { Reorder } from 'framer-motion';
import { ChevronLeft, ImageMinus, ImagePlus, Loader2 } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { Textarea } from '@/Components/Inputs/TextArea';
import { MediaManagerDialog } from '@/Components/Admin/Media/MediaManagerDialog';
import { CategoryMultiSelect } from '@/Components/Admin/Categories/CategoryMultiSelect';
import { toast } from '@/lib/useToast';

export default function Edit({ auth, gallery }: GalleryEditPageProps) {
    const isCreate = gallery === null;
    const [media, setMedia] = useState<Media[]>(gallery?.media ?? []);
    const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
    const { flash } = usePage().props as unknown as { flash?: { success?: string; error?: string } };

    useEffect(() => {
        setMedia(gallery?.media ?? []);
    }, [gallery]);

    useEffect(() => {
        if (flash?.success) toast({ title: flash.success, variant: 'success' });
        if (flash?.error) toast({ title: flash.error, variant: 'error' });
    }, [flash?.success, flash?.error]);

    const form = useForm({
        name: gallery?.name ?? '',
        description: gallery?.description ?? '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isCreate) {
            form.post(route('admin.galleries.store'));
        } else {
            form.patch(route('admin.galleries.update', gallery!.id));
        }
    };

    const handleReorder = (newOrder: Media[]) => {
        setMedia(newOrder);
        if (!gallery) return;
        router.patch(
            route('admin.galleries.media.reorder', gallery.id),
            { order: newOrder.map((m) => m.id) },
            { preserveScroll: true },
        );
    };

    const handleRemove = (item: Media) => {
        if (!gallery) return;
        router.delete(route('admin.galleries.media.destroy', { id: gallery.id, mediaId: item.id }), {
            preserveScroll: true,
            onSuccess: () => setMedia((prev) => prev.filter((m) => m.id !== item.id)),
        });
    };

    const handleCategoriesChange = (item: Media, categories: Category[]) => {
        setMedia((prev) => prev.map((m) => (m.id === item.id ? { ...m, categories } : m)));
        router.patch(
            route('admin.media.categories.update', item.id),
            { category_ids: categories.map((c) => c.id) },
            { preserveScroll: true },
        );
    };

    const headerStart = (
        <>
            <Link
                href={route('admin.galleries.list')}
                className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>
            <span className="max-w-48 truncate text-sm font-medium text-foreground">
                {isCreate ? 'New gallery' : gallery!.name}
            </span>
        </>
    );

    const headerEnd = (
        <Button type="submit" form="gallery-edit-form" disabled={form.processing} className="h-8 gap-1.5 px-3 text-sm">
            {form.processing && <Loader2 className="size-3.5 animate-spin" />}
            Save
        </Button>
    );

    return (
        <AdminPage headerStart={headerStart} headerEnd={headerEnd}>
            <Head title={isCreate ? 'New gallery' : `Edit ${gallery!.name}`} />

                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">{isCreate ? 'New Gallery' : 'Edit Gallery'}</h1>
                </div>

                <form id="gallery-edit-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="mt-1"
                                value={form.data.name}
                                hasError={Boolean(form.errors.name)}
                                onChange={(e) => form.setData('name', e.target.value)}
                            />
                            {form.errors.name && <p className="mt-1 text-sm text-destructive">{form.errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                rows={3}
                                className="mt-1"
                                value={form.data.description}
                                hasError={Boolean(form.errors.description)}
                                onChange={(e) => form.setData('description', e.target.value)}
                            />
                            {form.errors.description && (
                                <p className="mt-1 text-sm text-destructive">{form.errors.description}</p>
                            )}
                        </div>
                    </div>

                    {!isCreate && (
                        <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-foreground">Gallery images</h3>
                                <Button
                                    type="button"
                                    variant="primary"
                                    className="h-8 gap-2 px-3 text-sm"
                                    onClick={() => setMediaDialogOpen(true)}
                                >
                                    <ImagePlus className="size-4" />
                                    Add images
                                </Button>
                            </div>

                            {media.length === 0 ? (
                                <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                                    No images in this gallery. Click Add images to select from the media library.
                                </p>
                            ) : (
                                <Reorder.Group axis="y" values={media} onReorder={handleReorder} className="space-y-2">
                                    {media.map((item) => (
                                        <Reorder.Item
                                            key={item.id}
                                            value={item}
                                            className="flex list-none items-start gap-4 rounded-lg border border-border bg-background p-3 cursor-grab active:cursor-grabbing"
                                        >
                                            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded bg-muted">
                                                <img
                                                    src={item.url}
                                                    alt={item.alt_text ?? item.original_name ?? ''}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1 space-y-2">
                                                <span className="block truncate text-sm text-foreground">
                                                    {item.original_name ?? item.filename ?? `Image ${item.id}`}
                                                </span>
                                                <CategoryMultiSelect
                                                    value={item.categories ?? []}
                                                    onChange={(categories) => handleCategoriesChange(item, categories)}
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="h-8 gap-1.5 px-2 text-sm text-destructive hover:text-destructive"
                                                onClick={() => handleRemove(item)}
                                            >
                                                <ImageMinus className="size-4" />
                                                Remove
                                            </Button>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                            )}
                        </div>
                    )}
                </form>

                {!isCreate && gallery && (
                    <MediaManagerDialog open={mediaDialogOpen} onOpenChange={setMediaDialogOpen} galleryId={gallery.id} />
                )}
        </AdminPage>
    );
}
