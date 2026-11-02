import { useEffect, type FormEventHandler } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { MailLogSettingsPageProps } from '@/types';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Label } from '@/Components/Inputs/Label';
import { RadioGroup, RadioGroupItem } from '@/Components/Inputs/RadioGroup';
import { toast } from '@/lib/useToast';

export default function Settings({ auth, mailLogSettings }: MailLogSettingsPageProps) {
    const { flash } = usePage().props as unknown as { flash?: { success?: string; error?: string } };

    useEffect(() => {
        if (flash?.success) toast({ title: flash.success, variant: 'success' });
        if (flash?.error) toast({ title: flash.error, variant: 'error' });
    }, [flash?.success, flash?.error]);

    const form = useForm({
        enabled: mailLogSettings.enabled,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        form.transform((data) => ({ ...data, _method: 'PATCH' }));
        form.post(route('admin.mail-log.settings.update'), { preserveScroll: true });
    };

    const headerStart = (
        <Link
            href={route('admin.mail-log.list')}
            className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
            <ChevronLeft className="h-4 w-4" />
            Sent Mail
        </Link>
    );

    const headerEnd = (
        <Button type="submit" form="mail-log-settings-form" disabled={form.processing} className="h-8 gap-1.5 px-3 text-sm">
            {form.processing && <Loader2 className="size-3.5 animate-spin" />}
            Save
        </Button>
    );

    return (
        <AdminPage headerStart={headerStart} headerEnd={headerEnd}>
            <Head title="Mail Log Settings" />

                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Mail Log Settings</h1>
                </div>

                <form id="mail-log-settings-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                        <div>
                            <h3 className="text-lg font-medium text-foreground">Mail Logging</h3>
                            <p className="text-sm text-muted-foreground">Track outgoing emails sent through the site.</p>
                        </div>

                        <div>
                            <Label className="mb-2 block font-medium">Turn Mail Logging on or off.</Label>
                            <RadioGroup
                                value={form.data.enabled ? 'on' : 'off'}
                                onValueChange={(value) => form.setData('enabled', value === 'on')}
                            >
                                <Label htmlFor="mail-log-on" className="flex items-center gap-2 font-normal">
                                    <RadioGroupItem value="on" id="mail-log-on" />
                                    Turn On
                                </Label>
                                <Label htmlFor="mail-log-off" className="flex items-center gap-2 font-normal">
                                    <RadioGroupItem value="off" id="mail-log-off" />
                                    Turn Off
                                </Label>
                            </RadioGroup>
                        </div>
                    </div>
                </form>
        </AdminPage>
    );
}
