import { useEffect, type FormEventHandler } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { RedirectEditPageProps } from '@/types';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { Checkbox } from '@/Components/Inputs/Checkbox';
import { toast } from '@/lib/useToast';

export default function Edit({ auth, redirect }: RedirectEditPageProps) {
    const isCreate = redirect === null;
    const { flash } = usePage().props as unknown as { flash?: { success?: string; error?: string } };

    useEffect(() => {
        if (flash?.success) toast({ title: flash.success, variant: 'success' });
        if (flash?.error) toast({ title: flash.error, variant: 'error' });
    }, [flash?.success, flash?.error]);

    const form = useForm({
        from_path: redirect?.from_path ?? '',
        to_path: redirect?.to_path ?? '',
        status_code: redirect?.status_code ?? 301,
        is_active: redirect?.is_active ?? true,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isCreate) {
            form.post(route('admin.redirects.store'));
        } else {
            form.patch(route('admin.redirects.update', redirect!.id));
        }
    };

    const headerStart = (
        <>
            <Link
                href={route('admin.redirects.list')}
                className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>
            <span className="max-w-48 truncate text-sm font-medium text-foreground">
                {isCreate ? 'New redirect' : redirect!.from_path}
            </span>
        </>
    );

    const headerEnd = (
        <Button
            type="submit"
            form="redirect-edit-form"
            disabled={form.processing}
            className="h-8 gap-1.5 px-3 text-sm"
        >
            {form.processing && <Loader2 className="size-3.5 animate-spin" />}
            Save
        </Button>
    );

    return (
        <AdminPage headerStart={headerStart} headerEnd={headerEnd}>
            <Head title={isCreate ? 'New redirect' : `Edit ${redirect!.from_path}`} />

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">{isCreate ? 'New Redirect' : 'Edit Redirect'}</h1>
            </div>

            <form id="redirect-edit-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                    <div>
                        <Label htmlFor="from_path">From path</Label>
                        <Input
                            id="from_path"
                            className="mt-1 font-mono"
                            placeholder="/old-page"
                            value={form.data.from_path}
                            hasError={Boolean(form.errors.from_path)}
                            onChange={(e) => form.setData('from_path', e.target.value)}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">The old URL path, starting with a slash (e.g. /old-page).</p>
                        {form.errors.from_path && <p className="mt-1 text-sm text-destructive">{form.errors.from_path}</p>}
                    </div>

                    <div>
                        <Label htmlFor="to_path">To path</Label>
                        <Input
                            id="to_path"
                            className="mt-1 font-mono"
                            placeholder="/new-page or https://example.com/page"
                            value={form.data.to_path}
                            hasError={Boolean(form.errors.to_path)}
                            onChange={(e) => form.setData('to_path', e.target.value)}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Where visitors should be sent instead. Relative or absolute URL.</p>
                        {form.errors.to_path && <p className="mt-1 text-sm text-destructive">{form.errors.to_path}</p>}
                    </div>

                    <div>
                        <Label htmlFor="status_code">Redirect type</Label>
                        <select
                            id="status_code"
                            value={form.data.status_code}
                            onChange={(e) => form.setData('status_code', Number(e.target.value) as 301 | 302)}
                            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value={301}>301 — Permanent</option>
                            <option value={302}>302 — Temporary</option>
                        </select>
                        {form.errors.status_code && <p className="mt-1 text-sm text-destructive">{form.errors.status_code}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="is_active"
                            checked={form.data.is_active}
                            onCheckedChange={(checked) => form.setData('is_active', checked === true)}
                        />
                        <Label htmlFor="is_active" className="cursor-pointer">
                            Active
                        </Label>
                    </div>
                </div>
            </form>
        </AdminPage>
    );
}
