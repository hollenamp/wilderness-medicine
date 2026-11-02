import { useEffect, type FormEventHandler } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ImageCategoryEditPageProps } from '@/types';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { toast } from '@/lib/useToast';

export default function Edit({ auth, category }: ImageCategoryEditPageProps) {
    const isCreate = category === null;
    const { flash } = usePage().props as unknown as { flash?: { success?: string; error?: string } };

    useEffect(() => {
        if (flash?.success) toast({ title: flash.success, variant: 'success' });
        if (flash?.error) toast({ title: flash.error, variant: 'error' });
    }, [flash?.success, flash?.error]);

    const form = useForm({
        name: category?.name ?? '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isCreate) {
            form.post(route('admin.image-categories.store'));
        } else {
            form.patch(route('admin.image-categories.update', category!.id));
        }
    };

    const headerStart = (
        <>
            <Link
                href={route('admin.image-categories.list')}
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
            form="image-category-edit-form"
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
                        {isCreate ? 'New Image Category' : 'Edit Image Category'}
                    </h1>
                </div>

                <form id="image-category-edit-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                        <div>
                            <Label htmlFor="name">Title</Label>
                            <Input
                                id="name"
                                className="mt-1"
                                value={form.data.name}
                                hasError={Boolean(form.errors.name)}
                                onChange={(e) => form.setData('name', e.target.value)}
                            />
                            {form.errors.name && <p className="mt-1 text-sm text-destructive">{form.errors.name}</p>}
                        </div>
                    </div>

                    {!isCreate && category && (
                        <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                            <h3 className="font-semibold text-foreground">Galleries containing images with this category</h3>
                            {(category.galleries ?? []).length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No galleries contain images using this category yet.
                                </p>
                            ) : (
                                <ul className="space-y-1">
                                    {category.galleries!.map((gallery) => (
                                        <li key={gallery.id}>
                                            <Link
                                                href={route('admin.galleries.edit', gallery.id)}
                                                className="text-sm text-primary-600 hover:underline"
                                            >
                                                {gallery.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </form>
        </AdminPage>
    );
}
