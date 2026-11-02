import { useEffect, useState } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { MailLogListPageProps, MailLog } from '@/types';
import { Loader2 } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { SelectNative } from '@/Components/Inputs/SelectNative';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/Components/Table';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/Components/UI/Dialog';
import { toast } from '@/lib/useToast';

export default function List({ auth, mailLogs }: MailLogListPageProps) {
    const { flash } = usePage().props as unknown as { flash?: { success?: string; error?: string } };
    const [pendingDelete, setPendingDelete] = useState<MailLog | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (flash?.success) toast({ title: flash.success, variant: 'success' });
        if (flash?.error) toast({ title: flash.error, variant: 'error' });
    }, [flash?.success, flash?.error]);

    const goToPage = (page: number) => {
        router.get(
            route('admin.mail-log.list'),
            { page, per_page: mailLogs.per_page },
            { preserveScroll: true, preserveState: true },
        );
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(
            route('admin.mail-log.list'),
            { page: 1, per_page: perPage },
            { preserveScroll: true, preserveState: true },
        );
    };

    const handleDelete = () => {
        if (!pendingDelete) return;
        setDeleting(true);
        router.delete(route('admin.mail-log.destroy', pendingDelete.id), {
            preserveScroll: true,
            onSuccess: () => setPendingDelete(null),
            onFinish: () => setDeleting(false),
        });
    };

    const headerEnd = (
        <Link href={route('admin.mail-log.settings')} className="text-sm font-medium text-primary hover:underline">
            Log Settings
        </Link>
    );

    return (
        <AdminPage headerEnd={headerEnd}>
            <Head title="Sent Mail" />

                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Sent Mail</h1>
                </div>

                <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Sent To</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mailLogs.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                                            No emails have been sent yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    mailLogs.data.map((mail) => (
                                        <TableRow key={mail.id}>
                                            <TableCell>{mail.id}</TableCell>
                                            <TableCell className="whitespace-nowrap text-muted-foreground">
                                                {new Date(mail.created_at).toLocaleString()}
                                            </TableCell>
                                            <TableCell>{mail.to}</TableCell>
                                            <TableCell className="max-w-md truncate">{mail.subject}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-3 text-sm">
                                                    <Link
                                                        href={route('admin.mail-log.show', mail.id)}
                                                        className="font-medium text-primary hover:underline"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => setPendingDelete(mail)}
                                                        className="font-medium text-destructive hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {mailLogs.data.length > 0 && (
                        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Rows per page</span>
                                <SelectNative
                                    className="h-8 w-[70px]"
                                    value={mailLogs.per_page}
                                    onChange={(e) => handlePerPageChange(Number(e.target.value))}
                                >
                                    {[10, 25, 50].map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </SelectNative>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">
                                    Page {mailLogs.current_page} of {mailLogs.last_page}
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="light"
                                        className="h-8 px-3 text-xs"
                                        disabled={mailLogs.current_page <= 1}
                                        onClick={() => goToPage(mailLogs.current_page - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="light"
                                        className="h-8 px-3 text-xs"
                                        disabled={mailLogs.current_page >= mailLogs.last_page}
                                        onClick={() => goToPage(mailLogs.current_page + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Dialog open={pendingDelete !== null} onOpenChange={(open) => !open && setPendingDelete(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete email</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this logged email to &quot;{pendingDelete?.to}&quot;? This
                                cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="button" variant="light" onClick={() => setPendingDelete(null)}>
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
