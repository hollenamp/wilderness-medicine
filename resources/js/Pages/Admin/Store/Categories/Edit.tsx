import { useState, type FormEventHandler } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, useForm } from '@inertiajs/react';
import type { ProductCategoryEditPageProps } from '@/types';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { Textarea } from '@/Components/Inputs/TextArea';

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default function Edit({ category }: ProductCategoryEditPageProps) {
    const isCreate = category === null;
    const [slugTouched, setSlugTouched] = useState(!isCreate);

    const form = useForm({
        name: category?.name ?? '',
        slug: category?.slug ?? '',
        description: category?.description ?? '',
        sort_order: category?.sort_order ?? 0,
    });

    const handleNameChange = (value: string) => {
        form.setData('name', value);
        if (!slugTouched) {
            form.setData('slug', slugify(value));
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isCreate) {
            form.post(route('admin.store.categories.store'));
        } else {
            form.patch(route('admin.store.categories.update', category!.id));
        }
    };

    const headerStart = (
        <>
            <Link
                href={route('admin.store.categories.list')}
                className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>
            <span className="max-w-48 truncate text-sm font-medium text-foreground">
                {isCreate ? 'New category' : category!.name}
            </span>
        </>
    );

    const headerEnd = (
        <Button
            type="submit"
            form="store-category-edit-form"
            disabled={form.processing}
            className="h-8 gap-1.5 px-3 text-sm"
        >
            {form.processing && <Loader2 className="size-3.5 animate-spin" />}
            Save
        </Button>
    );

    return (
        <AdminPage headerStart={headerStart} headerEnd={headerEnd}>
            <Head title={isCreate ? 'New category' : `Edit ${category!.name}`} />

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    {isCreate ? 'New Store Category' : 'Edit Store Category'}
                </h1>
            </div>

            <form id="store-category-edit-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            className="mt-1"
                            value={form.data.name}
                            hasError={Boolean(form.errors.name)}
                            onChange={(e) => handleNameChange(e.target.value)}
                        />
                        {form.errors.name && <p className="mt-1 text-sm text-destructive">{form.errors.name}</p>}
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
                        <p className="mt-1 text-xs text-muted-foreground">/store/{form.data.slug || 'category-slug'}</p>
                        {form.errors.slug && <p className="mt-1 text-sm text-destructive">{form.errors.slug}</p>}
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
                        {form.errors.description && <p className="mt-1 text-sm text-destructive">{form.errors.description}</p>}
                    </div>

                    <div>
                        <Label htmlFor="sort_order">Sort order</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            className="mt-1 w-32"
                            value={form.data.sort_order}
                            hasError={Boolean(form.errors.sort_order)}
                            onChange={(e) => form.setData('sort_order', Number(e.target.value))}
                        />
                        {form.errors.sort_order && <p className="mt-1 text-sm text-destructive">{form.errors.sort_order}</p>}
                    </div>
                </div>
            </form>
        </AdminPage>
    );
}
