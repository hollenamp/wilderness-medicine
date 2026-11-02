import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head } from '@inertiajs/react';
import { DashboardPageProps } from '@/types';
import { useTheme } from '@/Contexts/ThemeProvider';
import { Moon, Sun, Monitor } from 'lucide-react';
import { cx } from '@/lib/utils';

const OPTIONS = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
] as const;

export default function ThemeSettings({ auth }: DashboardPageProps) {
    const { theme, setTheme } = useTheme();

    return (
        <AdminPage>
            <Head title="Theme Settings" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            </div>
            <div className="w-full space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-foreground">Appearance</h3>
                    <p className="text-sm text-admin-muted-foreground">
                        Customize how the admin panel looks on your device.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {OPTIONS.map(({ value, label, icon: Icon }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setTheme(value)}
                            className={cx(
                                'flex flex-col items-center gap-2 rounded-admin-lg border p-4 text-sm font-medium transition-colors',
                                theme === value
                                    ? 'border-admin-primary bg-admin-accent text-admin-accent-foreground'
                                    : 'border-admin-border text-admin-muted-foreground hover:bg-admin-accent/50'
                            )}
                        >
                            <Icon className="size-5" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>
                </AdminPage>
    );
}
