import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, router } from '@inertiajs/react';
import { PageSettingsPageProps } from '@/types';
import { Checkbox } from '@/Components/Inputs/Checkbox';

export default function Pages({ auth, pages }: PageSettingsPageProps) {
    const handleToggle = (id: number, isVisible: boolean) => {
        router.patch(route('admin.settings.pages.update', id), {
            is_visible: isVisible,
        });
    };

    return (
        <AdminPage>
            <Head title="Page Settings" />
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                </div>
                <div className="w-full space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-foreground">Pages</h3>
                        <p className="text-sm text-admin-muted-foreground">
                            These are the frontend routes we found in our app. Uncheck a route
                            to hide it from List All Pages.
                        </p>
                    </div>

                    <div className="rounded-admin-lg border border-admin-border divide-y divide-admin-border">
                        {pages.map((page) => (
                            <div
                                key={page.id}
                                className="flex items-center justify-between p-4"
                            >
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {page.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {page.route_name}
                                    </p>
                                </div>
                                <label className="flex items-center gap-2 text-sm text-foreground">
                                    Visible in List All Pages
                                    <Checkbox
                                        checked={page.is_visible}
                                        onCheckedChange={(checked) =>
                                            handleToggle(page.id, checked === true)
                                        }
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
        </AdminPage>
    );
}
