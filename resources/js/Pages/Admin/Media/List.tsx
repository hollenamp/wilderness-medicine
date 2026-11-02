import { useState } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, router } from '@inertiajs/react';
import { MediaListPageProps, Media } from '@/types';
import { ChevronLeft, ChevronRight, Loader2, Tags, Trash2, Upload } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/Components/UI/Dialog';
import { CategoryManagerDialog } from '@/Components/Admin/Categories/CategoryManagerDialog';
import { toast } from '@/lib/useToast';

function getCsrfToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute('content') ?? '';
}

export default function List({ auth, media }: MediaListPageProps) {
    const [uploading, setUploading] = useState(false);
    const [hasFilesSelected, setHasFilesSelected] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<Media | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [categoryManagerOpen, setCategoryManagerOpen] = useState(false);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem('files') as HTMLInputElement;
        const files = input?.files;
        if (!files?.length) return;

        setUploading(true);
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }

        try {
            await window.axios.post(route('admin.media.store'), formData, {
                headers: { 'X-XSRF-TOKEN': getCsrfToken() },
            });
            toast({
                title: files.length === 1 ? 'Image uploaded' : `${files.length} images uploaded`,
                variant: 'success',
            });
            router.reload({ only: ['media'] });
        } catch {
            toast({ title: 'Upload failed', variant: 'error' });
        } finally {
            input.value = '';
            setHasFilesSelected(false);
            setUploading(false);
        }
    };

    const handleDelete = () => {
        if (!pendingDelete) return;
        setDeleting(true);
        router.delete(route('admin.media.destroy', pendingDelete.id), {
            preserveScroll: true,
            onSuccess: () => setPendingDelete(null),
            onFinish: () => setDeleting(false),
        });
    };

    const goToPage = (page: number) => {
        router.get(route('admin.media.index'), { page }, { preserveScroll: true, preserveState: true });
    };

    return (
        <AdminPage>
            <Head title="Media Library" />
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
                    <Button
                        type="button"
                        variant="secondaryOutline"
                        className="gap-2"
                        onClick={() => setCategoryManagerOpen(true)}
                    >
                        <Tags className="size-4" />
                        Manage categories
                    </Button>
                </div>

                <div className="space-y-4">
                    <form
                        onSubmit={handleUpload}
                        className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
                    >
                        <Label htmlFor="media-files" className="sr-only">
                            Upload images
                        </Label>
                        <Input
                            id="media-files"
                            name="files"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            className="max-w-xs"
                            onChange={(e) => setHasFilesSelected((e.target.files?.length ?? 0) > 0)}
                        />
                        {(hasFilesSelected || uploading) && (
                            <Button type="submit" variant="primary" disabled={uploading} className="gap-2">
                                {uploading ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="size-4" />
                                        Upload
                                    </>
                                )}
                            </Button>
                        )}
                        <p className="text-sm text-muted-foreground">JPEG, PNG, or WebP. Max 5MB each.</p>
                    </form>

                    {media.data.length === 0 ? (
                        <p className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
                            No images yet. Upload your first image above.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {media.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                                >
                                    <div className="flex aspect-square items-center justify-center overflow-hidden bg-muted">
                                        <img
                                            src={item.url}
                                            alt={item.alt_text ?? item.original_name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="truncate p-2 text-xs text-muted-foreground">{item.original_name}</div>
                                    <button
                                        type="button"
                                        onClick={() => setPendingDelete(item)}
                                        title="Delete"
                                        className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
                                    >
                                        <Trash2 className="size-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {media.last_page > 1 && (
                        <nav className="flex items-center justify-center gap-2 pt-2">
                            <Button
                                type="button"
                                variant="light"
                                className="gap-1.5 px-2 py-1 text-xs"
                                disabled={media.current_page <= 1}
                                onClick={() => goToPage(media.current_page - 1)}
                            >
                                <ChevronLeft className="size-4" />
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {media.current_page} of {media.last_page}
                            </span>
                            <Button
                                type="button"
                                variant="light"
                                className="gap-1.5 px-2 py-1 text-xs"
                                disabled={media.current_page >= media.last_page}
                                onClick={() => goToPage(media.current_page + 1)}
                            >
                                Next
                                <ChevronRight className="size-4" />
                            </Button>
                        </nav>
                    )}
                </div>

                <Dialog open={pendingDelete !== null} onOpenChange={(open) => !open && setPendingDelete(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete image</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete &quot;{pendingDelete?.original_name}&quot;? This will
                                remove it from any galleries it belongs to. This cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="button" variant="light" onClick={() => setPendingDelete(null)}>
                                Cancel
                            </Button>
                            <Button type="button" variant="destructive" disabled={deleting} onClick={handleDelete} className="gap-2">
                                {deleting && <Loader2 className="size-4 animate-spin" />}
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <CategoryManagerDialog open={categoryManagerOpen} onOpenChange={setCategoryManagerOpen} />
        </AdminPage>
    );
}
