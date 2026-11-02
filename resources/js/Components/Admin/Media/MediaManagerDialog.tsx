import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/UI/Dialog';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { Media } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Check, ImagePlus, Loader2, Upload } from 'lucide-react';
import { toast } from '@/lib/useToast';

interface MediaListResponse {
    data: Media[];
    current_page: number;
    last_page: number;
}

function getCsrfToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute('content') ?? '';
}

interface MediaManagerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** When set, "Add to Gallery" posts selected media to this gallery. */
    galleryId?: number;
    /** When set, selecting an image calls this callback (single selection). */
    onSelect?: (media: Media) => void;
    selectTitle?: string;
}

export function MediaManagerDialog({
    open,
    onOpenChange,
    galleryId,
    onSelect,
    selectTitle = 'Select image',
}: MediaManagerDialogProps) {
    const isSelectMode = onSelect != null;
    const [media, setMedia] = useState<MediaListResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [page, setPage] = useState(1);
    const [hasFilesSelected, setHasFilesSelected] = useState(false);

    const fetchMedia = useCallback(async (pageNum: number = 1) => {
        setLoading(true);
        try {
            const url = `${route('admin.api.media.list')}?page=${pageNum}&per_page=24`;
            const res = await window.axios.get<MediaListResponse>(url);
            setMedia(res.data);
            setPage(pageNum);
        } catch {
            toast({ title: 'Failed to load media', variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (open) {
            setSelectedIds(new Set());
            setHasFilesSelected(false);
            fetchMedia(1);
        }
    }, [open, fetchMedia]);

    const toggleSelection = (id: number) => {
        setSelectedIds((prev) => {
            if (isSelectMode) {
                return prev.has(id) ? new Set() : new Set([id]);
            }

            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleSelectImage = () => {
        if (!onSelect || !media?.data?.length) return;

        const selectedId = Array.from(selectedIds)[0];
        const selected = media.data.find((item) => item.id === selectedId);

        if (!selected) return;

        onSelect(selected);
        onOpenChange(false);
    };

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
        const token = getCsrfToken();
        try {
            await window.axios.post(route('admin.media.store'), formData, {
                headers: token ? { 'X-XSRF-TOKEN': token } : {},
            });
            toast({
                title: files.length === 1 ? 'Image uploaded' : `${files.length} images uploaded`,
                variant: 'success',
            });
            await fetchMedia(page);
        } catch (err: unknown) {
            let message = files.length === 1 ? 'Upload failed' : 'Upload failed for one or more images';
            if (err && typeof err === 'object' && 'response' in err) {
                const res = (err as { response?: { data?: unknown } }).response;
                const data = res?.data;
                if (data && typeof data === 'object' && 'message' in data) {
                    message = String((data as { message: string }).message);
                } else if (data && typeof data === 'object' && 'errors' in data) {
                    const errors = (data as { errors: Record<string, string[]> }).errors;
                    const first = Object.values(errors).flat()[0];
                    if (first) message = first;
                }
            }
            toast({ title: message, variant: 'error' });
        } finally {
            input.value = '';
            setHasFilesSelected(false);
            setUploading(false);
        }
    };

    const handleAddToGallery = () => {
        if (galleryId == null) return;
        const ids = Array.from(selectedIds);
        if (ids.length === 0) return;
        setAdding(true);
        router.post(route('admin.galleries.media.store', galleryId), { ids }, {
            preserveScroll: true,
            onFinish: () => setAdding(false),
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };

    const selectedCount = selectedIds.size;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col">
                <DialogHeader>
                    <DialogTitle>{isSelectMode ? selectTitle : 'Add images to gallery'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleUpload} className="space-y-2">
                    <Label htmlFor="media-dialog-files">Upload images</Label>
                    <div className="flex flex-wrap items-center gap-2">
                        <Input
                            id="media-dialog-files"
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
                    </div>
                    <p className="text-sm text-muted-foreground">
                        JPEG, PNG, or WebP. Max 5MB each. You can select multiple files.
                    </p>
                </form>

                <div className="mt-4 min-h-0 flex-1 overflow-auto rounded-lg border border-border p-4">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="size-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : !media?.data?.length ? (
                        <p className="py-12 text-center text-sm text-muted-foreground">
                            No images yet. Upload images above or add existing media from the Media Library.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
                            {media.data.map((item) => {
                                const selected = selectedIds.has(item.id);
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => toggleSelection(item.id)}
                                        className={`relative overflow-hidden rounded-lg border-2 text-left transition-colors ${
                                            selected
                                                ? 'border-primary-500 ring-2 ring-primary-500/30'
                                                : 'border-border hover:border-muted-foreground/40'
                                        }`}
                                    >
                                        <div className="flex aspect-square items-center justify-center overflow-hidden bg-muted">
                                            <img
                                                src={item.url}
                                                alt={item.original_name ?? ''}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        {selected && (
                                            <div className="absolute right-1.5 top-1.5 rounded-full bg-primary-500 p-0.5 text-primary-foreground">
                                                <Check className="size-3.5" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {media && media.last_page > 1 && (
                        <nav className="mt-4 flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                variant="light"
                                className="px-2 py-1 text-xs"
                                disabled={media.current_page <= 1}
                                onClick={() => fetchMedia(media.current_page - 1)}
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {media.current_page} of {media.last_page}
                            </span>
                            <Button
                                type="button"
                                variant="light"
                                className="px-2 py-1 text-xs"
                                disabled={media.current_page >= media.last_page}
                                onClick={() => fetchMedia(media.current_page + 1)}
                            >
                                Next
                            </Button>
                        </nav>
                    )}
                </div>

                <DialogFooter className="mt-4 border-t border-border pt-4">
                    <Button type="button" variant="light" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    {isSelectMode && (
                        <Button
                            type="button"
                            variant="primary"
                            disabled={selectedCount === 0}
                            onClick={handleSelectImage}
                            className="gap-2"
                        >
                            <Check className="size-4" />
                            Use selected image
                        </Button>
                    )}
                    {galleryId != null && !isSelectMode && (
                        <Button
                            type="button"
                            variant="primary"
                            disabled={selectedCount === 0 || adding}
                            onClick={handleAddToGallery}
                            className="gap-2"
                        >
                            {adding ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <ImagePlus className="size-4" />
                                    Add to Gallery
                                    {selectedCount > 0 && ` (${selectedCount})`}
                                </>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
