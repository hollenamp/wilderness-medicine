import { useEffect, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Check, Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/UI/Dialog';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Category } from '@/types';
import { toast } from '@/lib/useToast';

function getCsrfToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute('content') ?? '';
}

function extractErrorMessage(err: unknown, fallback: string): string {
    if (err && typeof err === 'object' && 'response' in err) {
        const data = (err as { response?: { data?: unknown } }).response?.data;
        if (data && typeof data === 'object' && 'errors' in data) {
            const errors = (data as { errors: Record<string, string[]> }).errors;
            const first = Object.values(errors).flat()[0];
            if (first) return first;
        }
        if (data && typeof data === 'object' && 'message' in data) {
            return String((data as { message: string }).message);
        }
    }
    return fallback;
}

function sortByName(categories: Category[]): Category[] {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
}

interface CategoryManagerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CategoryManagerDialog({ open, onOpenChange }: CategoryManagerDialogProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [newName, setNewName] = useState('');
    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState('');
    const [savingId, setSavingId] = useState<number | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Category | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!open) return;
        setNewName('');
        setEditingId(null);
        setPendingDelete(null);
        setLoading(true);
        window.axios
            .get<Category[]>(route('admin.api.categories.list'))
            .then((res) => setCategories(res.data))
            .catch(() => toast({ title: 'Failed to load categories', variant: 'error' }))
            .finally(() => setLoading(false));
    }, [open]);

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        const name = newName.trim();
        if (!name || creating) return;
        setCreating(true);
        try {
            const res = await window.axios.post<Category>(
                route('admin.api.categories.store'),
                { name },
                { headers: { 'X-XSRF-TOKEN': getCsrfToken() } },
            );
            setCategories((prev) => sortByName([...prev, { ...res.data, media_count: 0 }]));
            setNewName('');
        } catch (err) {
            toast({ title: extractErrorMessage(err, 'Failed to create category'), variant: 'error' });
        } finally {
            setCreating(false);
        }
    };

    const startEditing = (category: Category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingName('');
    };

    const saveEditing = async (category: Category) => {
        const name = editingName.trim();
        if (!name) return;
        setSavingId(category.id);
        try {
            const res = await window.axios.patch<Category>(
                route('admin.api.categories.update', category.id),
                { name },
                { headers: { 'X-XSRF-TOKEN': getCsrfToken() } },
            );
            setCategories((prev) => sortByName(prev.map((c) => (c.id === category.id ? res.data : c))));
            setEditingId(null);
        } catch (err) {
            toast({ title: extractErrorMessage(err, 'Failed to rename category'), variant: 'error' });
        } finally {
            setSavingId(null);
        }
    };

    const handleEditingKeyDown = (e: KeyboardEvent<HTMLInputElement>, category: Category) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEditing(category);
        }
        if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    const handleDelete = async () => {
        if (!pendingDelete) return;
        setDeleting(true);
        try {
            await window.axios.delete(route('admin.api.categories.destroy', pendingDelete.id), {
                headers: { 'X-XSRF-TOKEN': getCsrfToken() },
            });
            setCategories((prev) => prev.filter((c) => c.id !== pendingDelete.id));
            setPendingDelete(null);
        } catch {
            toast({ title: 'Failed to delete category', variant: 'error' });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Manage categories</DialogTitle>
                    <DialogDescription>
                        Create, rename, or delete the tags used to organize gallery photos.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreate} className="flex items-center gap-2">
                    <Input
                        placeholder="New category name..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="h-9"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={creating || !newName.trim()}
                        className="h-9 shrink-0 gap-1.5 px-3 text-sm"
                    >
                        {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                        Add
                    </Button>
                </form>

                <div className="max-h-80 overflow-y-auto rounded-md border border-border">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
                            <Loader2 className="size-4 animate-spin" />
                            Loading...
                        </div>
                    ) : categories.length === 0 ? (
                        <p className="p-6 text-center text-sm text-muted-foreground">No categories yet.</p>
                    ) : (
                        <ul>
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className="flex items-center gap-2 border-b border-border p-2.5 last:border-b-0"
                                >
                                    {pendingDelete?.id === category.id ? (
                                        <div className="flex flex-1 items-center justify-between gap-2">
                                            <span className="text-sm text-foreground">
                                                Delete &quot;{category.name}&quot;
                                                {category.media_count
                                                    ? ` (used by ${category.media_count} photo${category.media_count === 1 ? '' : 's'})`
                                                    : ''}
                                                ?
                                            </span>
                                            <div className="flex shrink-0 gap-1.5">
                                                <Button
                                                    type="button"
                                                    variant="light"
                                                    className="h-7 px-2 text-xs"
                                                    onClick={() => setPendingDelete(null)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    disabled={deleting}
                                                    className="h-7 gap-1 px-2 text-xs"
                                                    onClick={handleDelete}
                                                >
                                                    {deleting && <Loader2 className="size-3 animate-spin" />}
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ) : editingId === category.id ? (
                                        <>
                                            <Input
                                                autoFocus
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                onKeyDown={(e) => handleEditingKeyDown(e, category)}
                                                className="h-8 flex-1"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => saveEditing(category)}
                                                disabled={savingId === category.id}
                                                className="flex size-7 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
                                                aria-label="Save"
                                            >
                                                {savingId === category.id ? (
                                                    <Loader2 className="size-4 animate-spin" />
                                                ) : (
                                                    <Check className="size-4" />
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={cancelEditing}
                                                className="flex size-7 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
                                                aria-label="Cancel"
                                            >
                                                <X className="size-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex-1 truncate text-sm text-foreground">{category.name}</span>
                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                {category.media_count ?? 0} photo{(category.media_count ?? 0) === 1 ? '' : 's'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => startEditing(category)}
                                                className="flex size-7 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
                                                aria-label={`Rename ${category.name}`}
                                            >
                                                <Pencil className="size-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPendingDelete(category)}
                                                className="flex size-7 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-destructive"
                                                aria-label={`Delete ${category.name}`}
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <DialogFooter>
                    <Button type="button" variant="light" onClick={() => onOpenChange(false)}>
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
