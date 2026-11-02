import { useEffect, useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/Popover';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Checkbox } from '@/Components/Inputs/Checkbox';
import { Category } from '@/types';
import { toast } from '@/lib/useToast';

function getCsrfToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute('content') ?? '';
}

interface CategoryMultiSelectProps {
    value: Category[];
    onChange: (categories: Category[]) => void;
}

export function CategoryMultiSelect({ value, onChange }: CategoryMultiSelectProps) {
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [query, setQuery] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        if (!open || loaded) return;
        window.axios
            .get<Category[]>(route('admin.api.categories.list'))
            .then((res) => setAllCategories(res.data))
            .catch(() => toast({ title: 'Failed to load categories', variant: 'error' }))
            .finally(() => setLoaded(true));
    }, [open, loaded]);

    const selectedIds = useMemo(() => new Set(value.map((c) => c.id)), [value]);

    const trimmedQuery = query.trim();

    const filtered = useMemo(() => {
        if (!trimmedQuery) return allCategories;
        return allCategories.filter((c) => c.name.toLowerCase().includes(trimmedQuery.toLowerCase()));
    }, [allCategories, trimmedQuery]);

    const hasExactMatch = allCategories.some((c) => c.name.toLowerCase() === trimmedQuery.toLowerCase());

    const toggle = (category: Category) => {
        onChange(
            selectedIds.has(category.id) ? value.filter((c) => c.id !== category.id) : [...value, category],
        );
    };

    const remove = (id: number) => {
        onChange(value.filter((c) => c.id !== id));
    };

    const handleCreate = async () => {
        if (!trimmedQuery || creating) return;
        setCreating(true);
        try {
            const res = await window.axios.post<Category>(
                route('admin.api.categories.store'),
                { name: trimmedQuery },
                { headers: { 'X-XSRF-TOKEN': getCsrfToken() } },
            );
            const category = res.data;
            setAllCategories((prev) => [...prev, category].sort((a, b) => a.name.localeCompare(b.name)));
            onChange([...value, category]);
            setQuery('');
        } catch {
            toast({ title: 'Failed to create category', variant: 'error' });
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="space-y-2">
            {value.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {value.map((category) => (
                        <span
                            key={category.id}
                            className="inline-flex items-center gap-1 rounded-full border border-border bg-accent px-2.5 py-1 text-xs font-medium text-foreground"
                        >
                            {category.name}
                            <button
                                type="button"
                                onClick={() => remove(category.id)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label={`Remove ${category.name}`}
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button type="button" variant="secondaryOutline" className="h-8 gap-1.5 px-3 text-sm">
                        <Plus className="size-3.5" />
                        Add category
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-72 p-0">
                    <div className="border-b border-border p-2">
                        <Input
                            autoFocus
                            placeholder="Search or create..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-8"
                        />
                    </div>
                    <div className="max-h-56 overflow-y-auto p-1">
                        {filtered.map((category) => (
                            <label
                                key={category.id}
                                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-accent"
                            >
                                <Checkbox
                                    checked={selectedIds.has(category.id)}
                                    onCheckedChange={() => toggle(category)}
                                />
                                {category.name}
                            </label>
                        ))}
                        {loaded && filtered.length === 0 && !trimmedQuery && (
                            <p className="px-2 py-1.5 text-sm text-muted-foreground">No categories yet.</p>
                        )}
                        {trimmedQuery && !hasExactMatch && (
                            <button
                                type="button"
                                onClick={handleCreate}
                                disabled={creating}
                                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-primary-600 hover:bg-accent disabled:opacity-50"
                            >
                                <Plus className="size-3.5" />
                                Create &quot;{trimmedQuery}&quot;
                            </button>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
