import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { DraftMenuItem, MenuItem, MenusPageProps } from '@/types';
import { Calendar, ChevronDown, ChevronUp, List, Loader2, Plus } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Card } from '@/Components/UI/Card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/UI/Dialog';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/UI/Tabs';
import {
    navigation,
    navigationLocations,
    type NavItem,
    type NavigationLocation,
} from '@/Pages/Public/navigation';
import { toast } from '@/lib/useToast';

let nextTempId = -1;

const createTempId = (): number => {
    nextTempId -= 1;
    return nextTempId;
};

const toDraftItems = (items: MenuItem[]): DraftMenuItem[] =>
    items.map((item) => ({
        id: item.id,
        label: item.label,
        url: item.url,
        parent_id: item.parent_id,
        sort_order: item.sort_order,
    }));

const flattenNavDefaults = (items: NavItem[]): DraftMenuItem[] => {
    const draftItems: DraftMenuItem[] = [];

    const walk = (nodes: NavItem[], parentId: number | string | null) => {
        nodes.forEach((node, index) => {
            const id = createTempId();
            draftItems.push({
                id,
                label: node.label,
                url: node.href,
                parent_id: parentId,
                sort_order: index,
            });
            if (node.children?.length) {
                walk(node.children, id);
            }
        });
    };

    walk(items, null);

    return draftItems;
};

const draftItemsForMenu = (
    menuItems: MenuItem[],
    isCustomized: boolean,
    location: string | null,
): DraftMenuItem[] => {
    if (isCustomized) {
        return toDraftItems(menuItems);
    }

    if (location && location in navigation) {
        return flattenNavDefaults(navigation[location as NavigationLocation].defaults);
    }

    return [];
};

const getDescendantIds = (itemId: number | string, items: DraftMenuItem[]): Set<number | string> => {
    const descendants = new Set<number | string>();
    const queue = [itemId];

    while (queue.length > 0) {
        const current = queue.shift();
        if (current === undefined) {
            continue;
        }

        items.forEach((item) => {
            if (item.parent_id === current && !descendants.has(item.id)) {
                descendants.add(item.id);
                queue.push(item.id);
            }
        });
    }

    return descendants;
};

const getDepth = (item: DraftMenuItem, items: DraftMenuItem[]): number => {
    let depth = 0;
    let parentId = item.parent_id;

    while (parentId !== null) {
        const parent = items.find((i) => i.id === parentId);
        if (!parent) {
            break;
        }
        depth += 1;
        parentId = parent.parent_id;
    }

    return depth;
};

export default function Index({ auth, selectedLocation, selectedMenu, menuItems, pages }: MenusPageProps) {
    const [draftItems, setDraftItems] = useState<DraftMenuItem[]>(() =>
        draftItemsForMenu(menuItems, selectedMenu?.is_customized ?? false, selectedLocation),
    );
    const [expandedItemId, setExpandedItemId] = useState<number | string | null>(null);
    const [newLinkUrl, setNewLinkUrl] = useState('');
    const [newLinkLabel, setNewLinkLabel] = useState('');
    const [resetDialogOpen, setResetDialogOpen] = useState(false);
    const [resetting, setResetting] = useState(false);
    const { flash } = usePage().props as unknown as { flash?: { success?: string; error?: string } };

    useEffect(() => {
        const isKnownLocation = navigationLocations.some((location) => location.key === selectedLocation);

        if (!isKnownLocation) {
            const first = navigationLocations[0];
            if (first) {
                router.get(
                    route('admin.menus.index'),
                    { location: first.key, name: first.label },
                    { replace: true },
                );
            }
        }
    }, [selectedLocation]);

    useEffect(() => {
        setDraftItems(draftItemsForMenu(menuItems, selectedMenu?.is_customized ?? false, selectedLocation));
        setExpandedItemId(null);
        setNewLinkUrl('');
        setNewLinkLabel('');
    }, [selectedMenu?.id, selectedMenu?.is_customized, selectedLocation, menuItems]);

    useEffect(() => {
        if (flash?.success) toast({ title: flash.success, variant: 'success' });
        if (flash?.error) toast({ title: flash.error, variant: 'error' });
    }, [flash?.success, flash?.error]);

    const saveMenuForm = useForm({ name: selectedMenu?.name ?? '', items: draftItems });

    const handleSelectLocation = (location: string) => {
        const label = location in navigation
            ? navigation[location as NavigationLocation].label
            : location;

        router.get(route('admin.menus.index'), { location, name: label }, { preserveState: true });
    };

    const appendDraftItem = (label: string, url: string) => {
        setDraftItems((prev) => {
            const maxOrder = prev.length > 0 ? Math.max(...prev.map((i) => i.sort_order)) : -1;

            return [
                ...prev,
                {
                    id: createTempId(),
                    label,
                    url,
                    parent_id: null,
                    sort_order: maxOrder + 1,
                },
            ];
        });
    };

    const handleAddToMenu = (e: FormEvent) => {
        e.preventDefault();
        if (!newLinkUrl.trim() || !newLinkLabel.trim()) {
            return;
        }

        appendDraftItem(newLinkLabel.trim(), newLinkUrl.trim());
        setNewLinkUrl('');
        setNewLinkLabel('');
    };

    const handleAddPageToMenu = (page: { title: string; url: string }) => {
        appendDraftItem(page.title, page.url);
    };

    const handleSaveMenu = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedMenu) {
            return;
        }

        const items = draftItems.map((item, index) => ({
            id: item.id,
            label: item.label,
            url: item.url,
            parent_id: item.parent_id,
            sort_order: index,
        }));

        const locationLabel = selectedLocation && selectedLocation in navigation
            ? navigation[selectedLocation as NavigationLocation].label
            : selectedMenu.name;

        saveMenuForm.transform(() => ({ name: locationLabel, items }));
        saveMenuForm.put(route('admin.menus.sync', selectedMenu.id));
    };

    const handleReorder = (itemId: number | string, direction: 'up' | 'down' | 'top') => {
        setDraftItems((prev) => {
            const items = [...prev];
            const idx = items.findIndex((i) => i.id === itemId);
            if (idx < 0) {
                return prev;
            }

            const item = items[idx];
            items.splice(idx, 1);

            if (direction === 'top') {
                items.unshift(item);
            } else if (direction === 'up' && idx > 0) {
                items.splice(idx - 1, 0, item);
            } else if (direction === 'down' && idx < prev.length - 1) {
                items.splice(idx + 1, 0, item);
            } else {
                items.splice(idx, 0, item);
            }

            return items.map((entry, index) => ({ ...entry, sort_order: index }));
        });
    };

    const handleRemoveItem = (itemId: number | string) => {
        const descendants = getDescendantIds(itemId, draftItems);
        setDraftItems((prev) => prev.filter((item) => item.id !== itemId && !descendants.has(item.id)));
        setExpandedItemId(null);
    };

    const handleUpdateItemField = (itemId: number | string, field: keyof DraftMenuItem, value: string | number | null) => {
        setDraftItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)));
    };

    const handleResetDefault = () => {
        if (!selectedMenu) {
            return;
        }

        setResetting(true);
        router.post(
            route('admin.menus.reset', selectedMenu.id),
            {},
            {
                onFinish: () => {
                    setResetting(false);
                    setResetDialogOpen(false);
                },
            },
        );
    };

    const parentOptions = useMemo(() => {
        if (expandedItemId === null) {
            return [];
        }

        const descendants = getDescendantIds(expandedItemId, draftItems);

        return draftItems.filter((item) => item.id !== expandedItemId && !descendants.has(item.id));
    }, [draftItems, expandedItemId]);

    const topLevelCount = useMemo(() => draftItems.filter((item) => item.parent_id === null).length, [draftItems]);

    const formattedDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const headerStart = <span className="text-sm font-medium text-foreground">Menus</span>;

    const headerEnd = selectedMenu && (
        <Button type="submit" form="menu-sync-form" disabled={saveMenuForm.processing} className="h-8 gap-1.5 px-3 text-sm">
            {saveMenuForm.processing && <Loader2 className="size-3.5 animate-spin" />}
            Save Menu
        </Button>
    );

    return (
        <AdminPage headerStart={headerStart} headerEnd={headerEnd}>
            <Head title="Menus" />

            <div className="mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Menus</h1>
            </div>

            <div className="space-y-4">
                <Tabs value={selectedLocation ?? undefined} onValueChange={handleSelectLocation}>
                    <TabsList variant="line">
                        {navigationLocations.map((location) => (
                            <TabsTrigger key={location.key} value={location.key}>
                                {location.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {!selectedMenu?.is_customized && (
                    <p className="text-sm text-muted-foreground">
                        This location is showing its default navigation. Save to start managing it here.
                    </p>
                )}

                {selectedMenu && (
                    <form id="menu-sync-form" onSubmit={handleSaveMenu}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[5fr_6fr_4fr]">
                            <Card className="p-4">
                                <h3 className="mb-1 font-semibold text-foreground">Add menu items</h3>
                                <p className="mb-3 text-sm text-muted-foreground">
                                    Pick a page to add it instantly, or switch tabs to add a custom link.
                                </p>
                                <Tabs defaultValue="pages">
                                    <TabsList variant="line">
                                        <TabsTrigger value="pages">Pages</TabsTrigger>
                                        <TabsTrigger value="custom">Custom Link</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="pages" className="pt-3">
                                        {pages.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">
                                                No visible pages found. Mark pages visible under Pages &gt; Settings.
                                            </p>
                                        ) : (
                                            <ul className="max-h-80 space-y-1 overflow-y-auto">
                                                {pages.map((page) => (
                                                    <li key={page.id}>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddPageToMenu(page)}
                                                            className="flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1.5 text-left text-sm text-foreground hover:border-border hover:bg-accent"
                                                        >
                                                            <span className="truncate">{page.title}</span>
                                                            <Plus className="size-3.5 shrink-0 text-muted-foreground" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="custom" className="pt-3">
                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="custom-url">URL</Label>
                                                <Input
                                                    id="custom-url"
                                                    name="url"
                                                    type="text"
                                                    placeholder="https:// or /path (e.g. /, /contact-us)"
                                                    value={newLinkUrl}
                                                    onChange={(e) => setNewLinkUrl(e.target.value)}
                                                    className="mt-1 w-full"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="custom-label">Link Text</Label>
                                                <Input
                                                    id="custom-label"
                                                    name="label"
                                                    value={newLinkLabel}
                                                    onChange={(e) => setNewLinkLabel(e.target.value)}
                                                    className="mt-1 w-full"
                                                />
                                            </div>
                                            <Button type="button" variant="primary" onClick={handleAddToMenu}>
                                                Add to Menu
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </Card>

                            <Card className="p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold text-foreground">Menu structure</h3>
                                    <span className="text-xs text-muted-foreground">
                                        {draftItems.length} item{draftItems.length === 1 ? '' : 's'}
                                    </span>
                                </div>
                                <p className="mb-3 text-sm text-muted-foreground">
                                    Use the links below to reorder items. Click an item to reveal additional configuration options.
                                </p>
                                <ul className="divide-y divide-border rounded-md border border-border">
                                    {draftItems.length === 0 ? (
                                        <li className="p-4 text-sm text-muted-foreground">
                                            No items in this menu yet. Add custom links from the left column.
                                        </li>
                                    ) : (
                                        draftItems.map((item) => {
                                            const depth = getDepth(item, draftItems);

                                            return (
                                                <li
                                                    key={String(item.id)}
                                                    className="bg-card"
                                                    style={{ paddingLeft: `${depth * 1.25}rem` }}
                                                >
                                                    <div className="flex items-center justify-between px-3 py-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setExpandedItemId(expandedItemId === item.id ? null : item.id)
                                                            }
                                                            className="flex min-w-0 flex-1 items-center gap-2 text-left"
                                                        >
                                                            {expandedItemId === item.id ? (
                                                                <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
                                                            ) : (
                                                                <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                                                            )}
                                                            <span className="truncate font-medium text-foreground">{item.label}</span>
                                                            <span className="shrink-0 text-xs text-muted-foreground">Custom Link</span>
                                                        </button>
                                                    </div>
                                                    {expandedItemId === item.id && (
                                                        <div className="mt-0 border-t border-border bg-muted/50 px-3 pb-3 pt-0">
                                                            <div className="mt-2 space-y-2">
                                                                <div>
                                                                    <Label>URL</Label>
                                                                    <Input
                                                                        value={item.url}
                                                                        onChange={(e) =>
                                                                            handleUpdateItemField(item.id, 'url', e.target.value)
                                                                        }
                                                                        className="mt-1 w-full"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label>Navigation Label</Label>
                                                                    <Input
                                                                        value={item.label}
                                                                        onChange={(e) =>
                                                                            handleUpdateItemField(item.id, 'label', e.target.value)
                                                                        }
                                                                        className="mt-1 w-full"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`parent-${String(item.id)}`}>Parent</Label>
                                                                    <select
                                                                        id={`parent-${String(item.id)}`}
                                                                        value={item.parent_id ?? ''}
                                                                        onChange={(e) =>
                                                                            handleUpdateItemField(
                                                                                item.id,
                                                                                'parent_id',
                                                                                e.target.value === '' ? null : Number(e.target.value),
                                                                            )
                                                                        }
                                                                        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                                                                    >
                                                                        <option value="">No parent (top level)</option>
                                                                        {parentOptions.map((parent) => (
                                                                            <option key={String(parent.id)} value={parent.id}>
                                                                                {parent.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="flex flex-wrap gap-2 text-sm">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleReorder(item.id, 'up')}
                                                                        className="text-primary hover:underline"
                                                                    >
                                                                        Up one
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleReorder(item.id, 'down')}
                                                                        className="text-primary hover:underline"
                                                                    >
                                                                        Down one
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleReorder(item.id, 'top')}
                                                                        className="text-primary hover:underline"
                                                                    >
                                                                        To the top
                                                                    </button>
                                                                    <span className="text-muted-foreground">|</span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveItem(item.id)}
                                                                        className="text-destructive hover:underline"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                    <span className="text-muted-foreground">|</span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setExpandedItemId(null)}
                                                                        className="text-primary hover:underline"
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                        })
                                    )}
                                </ul>
                            </Card>

                            <Card className="p-4 lg:h-fit">
                                <h3 className="mb-3 font-semibold text-foreground">Menu details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-1 text-xs text-muted-foreground">Location</p>
                                        <p className="text-sm text-foreground">{selectedMenu.name}</p>
                                    </div>

                                    <div className="border-t border-border" />

                                    <div>
                                        <p className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <List className="size-3.5" />
                                            Items
                                        </p>
                                        <p className="text-sm text-foreground">
                                            {draftItems.length} total &middot; {topLevelCount} top-level
                                        </p>
                                    </div>

                                    <div className="border-t border-border" />

                                    <div>
                                        <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="size-3.5" />
                                            Dates
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Created</span>
                                                <span className="text-foreground">{formattedDate(selectedMenu.created_at)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Last edited</span>
                                                <span className="text-foreground">{formattedDate(selectedMenu.updated_at)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-border" />

                                    <div>
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            Restore this location&apos;s built-in navigation and remove saved custom
                                            items.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setResetDialogOpen(true)}
                                            disabled={!selectedMenu.is_customized || resetting}
                                            className="text-sm text-primary hover:underline disabled:pointer-events-none disabled:text-muted-foreground disabled:no-underline"
                                        >
                                            Reset Default
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </form>
                )}
            </div>

            <Dialog open={resetDialogOpen} onOpenChange={(open) => !resetting && setResetDialogOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reset to defaults?</DialogTitle>
                        <DialogDescription>
                            This will remove all saved custom menu items for this location and restore the original
                            navigation. This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="light" disabled={resetting} onClick={() => setResetDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={resetting}
                            onClick={handleResetDefault}
                            className="gap-2"
                        >
                            {resetting && <Loader2 className="size-4 animate-spin" />}
                            Reset Default
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminPage>
    );
}
