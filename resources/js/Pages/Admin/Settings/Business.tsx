import { useEffect, useRef, type FormEventHandler } from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BusinessSettingsPageProps } from '@/types';
import { HelpCircle, Loader2 } from 'lucide-react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { Textarea } from '@/Components/Inputs/TextArea';
import { toast } from '@/lib/useToast';

function FieldLabel({ htmlFor, help, children }: { htmlFor: string; help: string; children: React.ReactNode }) {
    return (
        <Label htmlFor={htmlFor} className="mb-1 flex items-center gap-1.5 font-medium">
            {children}
            <span title={help}>
                <HelpCircle className="size-3.5 text-muted-foreground" aria-hidden />
            </span>
        </Label>
    );
}

export default function Business({ auth, businessInfo }: BusinessSettingsPageProps) {
    const { flash } = usePage().props as unknown as { flash?: { success?: string; error?: string } };
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        business_name: businessInfo.business_name ?? '',
        business_phone: businessInfo.business_phone ?? '',
        business_phone_two: businessInfo.business_phone_two ?? '',
        business_sms: businessInfo.business_sms ?? '',
        business_sms_two: businessInfo.business_sms_two ?? '',
        business_email: businessInfo.business_email ?? '',
        business_address: businessInfo.business_address ?? '',
        business_hours: businessInfo.business_hours ?? '',
        tagline: businessInfo.tagline ?? '',
        logo: null as File | null,
        facebook_url: businessInfo.facebook_url ?? '',
        instagram_url: businessInfo.instagram_url ?? '',
        twitter_url: businessInfo.twitter_url ?? '',
        linkedin_url: businessInfo.linkedin_url ?? '',
    });

    useEffect(() => {
        if (flash?.success) toast({ title: flash.success, variant: 'success' });
        if (flash?.error) toast({ title: flash.error, variant: 'error' });
    }, [flash?.success, flash?.error]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        form.transform((data) => ({ ...data, _method: 'PATCH' }));
        form.post(route('admin.settings.business.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const headerEnd = (
        <Button type="submit" form="business-settings-form" disabled={form.processing} className="h-8 gap-1.5 px-3 text-sm">
            {form.processing && <Loader2 className="size-3.5 animate-spin" />}
            Save
        </Button>
    );

    return (
        <AdminPage headerEnd={headerEnd}>
            <Head title="Business Info" />

                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Business Info</h1>
                </div>

                <form id="business-settings-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                        <div>
                            <h3 className="text-lg font-medium text-foreground">Business Contact Info</h3>
                            <p className="text-sm text-muted-foreground">
                                Enter contact details for your business.
                            </p>
                        </div>

                        <div>
                            <FieldLabel htmlFor="business_name" help="Displayed as your business name throughout the site.">
                                Business Name:
                            </FieldLabel>
                            <Input
                                id="business_name"
                                value={form.data.business_name}
                                hasError={Boolean(form.errors.business_name)}
                                onChange={(e) => form.setData('business_name', e.target.value)}
                            />
                            {form.errors.business_name && <p className="mt-1 text-sm text-destructive">{form.errors.business_name}</p>}
                        </div>

                        <div>
                            <FieldLabel htmlFor="business_phone" help="Primary phone number for customers to call.">
                                Business Phone:
                            </FieldLabel>
                            <Input
                                id="business_phone"
                                value={form.data.business_phone}
                                hasError={Boolean(form.errors.business_phone)}
                                onChange={(e) => form.setData('business_phone', e.target.value)}
                            />
                            {form.errors.business_phone && <p className="mt-1 text-sm text-destructive">{form.errors.business_phone}</p>}
                        </div>

                        <div>
                            <FieldLabel htmlFor="business_phone_two" help="Optional secondary phone number.">
                                Business Phone Two:
                            </FieldLabel>
                            <Input
                                id="business_phone_two"
                                value={form.data.business_phone_two}
                                hasError={Boolean(form.errors.business_phone_two)}
                                onChange={(e) => form.setData('business_phone_two', e.target.value)}
                            />
                            {form.errors.business_phone_two && (
                                <p className="mt-1 text-sm text-destructive">{form.errors.business_phone_two}</p>
                            )}
                        </div>

                        <div>
                            <FieldLabel htmlFor="business_sms" help="Number customers can text for support or booking.">
                                Business SMS:
                            </FieldLabel>
                            <Input
                                id="business_sms"
                                value={form.data.business_sms}
                                hasError={Boolean(form.errors.business_sms)}
                                onChange={(e) => form.setData('business_sms', e.target.value)}
                            />
                            {form.errors.business_sms && <p className="mt-1 text-sm text-destructive">{form.errors.business_sms}</p>}
                        </div>

                        <div>
                            <FieldLabel htmlFor="business_sms_two" help="Optional secondary SMS number.">
                                Business SMS Two:
                            </FieldLabel>
                            <Input
                                id="business_sms_two"
                                value={form.data.business_sms_two}
                                hasError={Boolean(form.errors.business_sms_two)}
                                onChange={(e) => form.setData('business_sms_two', e.target.value)}
                            />
                            {form.errors.business_sms_two && (
                                <p className="mt-1 text-sm text-destructive">{form.errors.business_sms_two}</p>
                            )}
                        </div>

                        <div>
                            <FieldLabel htmlFor="business_email" help="Main contact email address for the business.">
                                Business Email:
                            </FieldLabel>
                            <Input
                                id="business_email"
                                type="email"
                                value={form.data.business_email}
                                hasError={Boolean(form.errors.business_email)}
                                onChange={(e) => form.setData('business_email', e.target.value)}
                            />
                            {form.errors.business_email && <p className="mt-1 text-sm text-destructive">{form.errors.business_email}</p>}
                        </div>

                        <div>
                            <FieldLabel htmlFor="business_address" help="Physical or mailing address for the business.">
                                Business Address:
                            </FieldLabel>
                            <Textarea
                                id="business_address"
                                rows={3}
                                value={form.data.business_address}
                                hasError={Boolean(form.errors.business_address)}
                                onChange={(e) => form.setData('business_address', e.target.value)}
                            />
                            {form.errors.business_address && (
                                <p className="mt-1 text-sm text-destructive">{form.errors.business_address}</p>
                            )}
                        </div>

                        <div>
                            <FieldLabel htmlFor="business_hours" help="Hours of operation, e.g. Mon-Fri: 9am-5pm.">
                                Business Hours:
                            </FieldLabel>
                            <Textarea
                                id="business_hours"
                                rows={3}
                                value={form.data.business_hours}
                                hasError={Boolean(form.errors.business_hours)}
                                onChange={(e) => form.setData('business_hours', e.target.value)}
                            />
                            {form.errors.business_hours && <p className="mt-1 text-sm text-destructive">{form.errors.business_hours}</p>}
                        </div>
                    </div>

                    <div className="space-y-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
                        <div>
                            <h3 className="text-lg font-medium text-foreground">Branding & Social</h3>
                            <p className="text-sm text-muted-foreground">
                                Optional branding and social media links.
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="tagline" className="mb-1 font-medium">Tagline:</Label>
                            <Input
                                id="tagline"
                                value={form.data.tagline}
                                hasError={Boolean(form.errors.tagline)}
                                onChange={(e) => form.setData('tagline', e.target.value)}
                            />
                            {form.errors.tagline && <p className="mt-1 text-sm text-destructive">{form.errors.tagline}</p>}
                        </div>

                        <div>
                            <Label htmlFor="logo" className="mb-1 font-medium">Logo:</Label>
                            {businessInfo.logo_path && !form.data.logo && (
                                <img
                                    src={`/storage/${businessInfo.logo_path}`}
                                    alt="Current logo"
                                    className="mb-2 h-12 w-auto rounded border border-border object-contain"
                                />
                            )}
                            <Input
                                id="logo"
                                type="file"
                                accept="image/png,image/jpeg,image/gif,image/webp"
                                ref={fileInputRef}
                                hasError={Boolean(form.errors.logo)}
                                onChange={(e) => form.setData('logo', e.target.files?.[0] ?? null)}
                            />
                            {form.errors.logo && <p className="mt-1 text-sm text-destructive">{form.errors.logo}</p>}
                        </div>

                        <div>
                            <Label htmlFor="facebook_url" className="mb-1 font-medium">Facebook URL:</Label>
                            <Input
                                id="facebook_url"
                                value={form.data.facebook_url}
                                hasError={Boolean(form.errors.facebook_url)}
                                onChange={(e) => form.setData('facebook_url', e.target.value)}
                            />
                            {form.errors.facebook_url && <p className="mt-1 text-sm text-destructive">{form.errors.facebook_url}</p>}
                        </div>

                        <div>
                            <Label htmlFor="instagram_url" className="mb-1 font-medium">Instagram URL:</Label>
                            <Input
                                id="instagram_url"
                                value={form.data.instagram_url}
                                hasError={Boolean(form.errors.instagram_url)}
                                onChange={(e) => form.setData('instagram_url', e.target.value)}
                            />
                            {form.errors.instagram_url && <p className="mt-1 text-sm text-destructive">{form.errors.instagram_url}</p>}
                        </div>

                        <div>
                            <Label htmlFor="twitter_url" className="mb-1 font-medium">Twitter / X URL:</Label>
                            <Input
                                id="twitter_url"
                                value={form.data.twitter_url}
                                hasError={Boolean(form.errors.twitter_url)}
                                onChange={(e) => form.setData('twitter_url', e.target.value)}
                            />
                            {form.errors.twitter_url && <p className="mt-1 text-sm text-destructive">{form.errors.twitter_url}</p>}
                        </div>

                        <div>
                            <Label htmlFor="linkedin_url" className="mb-1 font-medium">LinkedIn URL:</Label>
                            <Input
                                id="linkedin_url"
                                value={form.data.linkedin_url}
                                hasError={Boolean(form.errors.linkedin_url)}
                                onChange={(e) => form.setData('linkedin_url', e.target.value)}
                            />
                            {form.errors.linkedin_url && <p className="mt-1 text-sm text-destructive">{form.errors.linkedin_url}</p>}
                        </div>
                    </div>
                </form>
        </AdminPage>
    );
}
