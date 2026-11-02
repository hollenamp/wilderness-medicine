import { useEffect, useState, type FormEventHandler } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { MailLogShowPageProps } from '@/types';
import { ChevronLeft, Loader2 } from 'lucide-react';
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
import { toast } from '@/lib/useToast';

export default function Show({ auth, mail, previousId, nextId }: MailLogShowPageProps) {
    const { flash } = usePage().props as unknown as { flash?: { success?: string; error?: string } };
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (flash?.success) toast({ title: flash.success, variant: 'success' });
        if (flash?.error) toast({ title: flash.error, variant: 'error' });
    }, [flash?.success, flash?.error]);

    const forwardForm = useForm({ email: '' });

    const handleForward: FormEventHandler = (e) => {
        e.preventDefault();
        forwardForm.post(route('admin.mail-log.forward', mail.id), {
            preserveScroll: true,
            onSuccess: () => forwardForm.reset('email'),
        });
    };

    const handleDelete = () => {
        setDeleting(true);
        router.delete(route('admin.mail-log.destroy', mail.id));
    };

    const headerStart = (
        <>
            <Link
                href={route('admin.mail-log.list')}
                className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>
            <span className="max-w-64 truncate text-sm font-medium text-foreground">{mail.subject}</span>
        </>
    );

    const headerEnd = (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                variant="light"
                className="h-8 px-3 text-sm"
                disabled={!previousId}
                onClick={() => previousId && router.get(route('admin.mail-log.show', previousId))}
            >
                Previous
            </Button>
            <Button
                type="button"
                variant="light"
                className="h-8 px-3 text-sm"
                disabled={!nextId}
                onClick={() => nextId && router.get(route('admin.mail-log.show', nextId))}
            >
                Next
            </Button>
            <Button
                type="button"
                variant="destructive"
                className="h-8 px-3 text-sm"
                onClick={() => setConfirmingDelete(true)}
            >
                Delete
            </Button>
        </div>
    );

    return (
        <AdminPage headerStart={headerStart} headerEnd={headerEnd}>
            <Head title="Mail Log - Sent Mail" />

                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Mail Log - Sent Mail</h1>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                        <div>
                            <h3 className="text-lg font-medium text-foreground">Forward Mail</h3>
                            <p className="text-sm text-muted-foreground">Forward this logged email to another address.</p>
                        </div>
                        <form onSubmit={handleForward} className="flex flex-wrap items-end gap-3">
                            <div className="min-w-[240px] flex-1">
                                <Label htmlFor="forward-email" className="mb-1 font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="forward-email"
                                    type="email"
                                    value={forwardForm.data.email}
                                    hasError={Boolean(forwardForm.errors.email)}
                                    onChange={(e) => forwardForm.setData('email', e.target.value)}
                                />
                                {forwardForm.errors.email && (
                                    <p className="mt-1 text-sm text-destructive">{forwardForm.errors.email}</p>
                                )}
                            </div>
                            <Button type="submit" disabled={forwardForm.processing} className="gap-2">
                                {forwardForm.processing && <Loader2 className="size-4 animate-spin" />}
                                Send
                            </Button>
                        </form>
                    </div>

                    <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                        <h3 className="text-lg font-medium text-foreground">Received Mail</h3>
                        <dl className="divide-y divide-border text-sm">
                            <div className="grid grid-cols-3 gap-4 py-3">
                                <dt className="font-medium text-muted-foreground">Sent to</dt>
                                <dd className="col-span-2">{mail.to}</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4 py-3">
                                <dt className="font-medium text-muted-foreground">Subject</dt>
                                <dd className="col-span-2">{mail.subject}</dd>
                            </div>
                        </dl>
                        <div>
                            <p className="mb-2 text-sm font-medium text-muted-foreground">Message</p>
                            <iframe
                                title="Email message"
                                sandbox=""
                                srcDoc={mail.body ?? ''}
                                className="h-96 w-full rounded border border-border bg-white"
                            />
                        </div>
                    </div>
                </div>

                <Dialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete email</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this logged email to &quot;{mail.to}&quot;? This cannot be
                                undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="button" variant="light" onClick={() => setConfirmingDelete(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                disabled={deleting}
                                onClick={handleDelete}
                                className="gap-2"
                            >
                                {deleting && <Loader2 className="size-4 animate-spin" />}
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
        </AdminPage>
    );
}
