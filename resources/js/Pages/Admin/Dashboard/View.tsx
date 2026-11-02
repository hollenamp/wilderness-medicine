import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { DashboardTopNav } from '@/Components/Admin/layout/dashboard-top-nav';
import { Badge } from '@/Components/Admin/ui/badge';
import { Head, Link } from '@inertiajs/react';
import {
    FileText,
    Image as ImageIcon,
    Images,
    Users,
    ArrowRight,
} from 'lucide-react';
import { AdminDashboardPageProps } from '@/types';

function formatBytes(bytes: number): string {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / Math.pow(1024, exponent);

    return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function Dashboard({ auth, stats, recentPages, recentMedia }: AdminDashboardPageProps) {
    const statCards = [
        {
            label: 'Pages',
            value: stats.pages.total,
            sub: `${stats.pages.visible} visible`,
            icon: FileText,
            href: route('admin.pages.list'),
        },
        {
            label: 'Media',
            value: stats.media.total,
            sub: formatBytes(stats.media.size),
            icon: ImageIcon,
            href: route('admin.media.index'),
        },
        {
            label: 'Galleries',
            value: stats.galleries.total,
            sub: 'total galleries',
            icon: Images,
            href: route('admin.galleries.list'),
        },
        ...(stats.users
            ? [
                  {
                      label: 'Users',
                      value: stats.users.total,
                      sub: 'total users',
                      icon: Users,
                      href: route('admin.users.list'),
                  },
              ]
            : []),
    ];

    return (
        <AdminPage headerStart={<DashboardTopNav />}>
                <Head title="Dashboard" />

                <div className="mb-4">
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Welcome back, {auth.user.name.split(' ')[0]}.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map(({ label, value, sub, icon: Icon, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="group flex items-start justify-between rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:bg-accent/50"
                        >
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                                <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
                            </div>
                            <div className="flex size-9 items-center justify-center rounded-full bg-accent text-muted-foreground transition-colors group-hover:text-foreground">
                                <Icon className="size-4" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="rounded-lg border border-border bg-card shadow-sm">
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h2 className="text-sm font-semibold">Recently updated pages</h2>
                            <Link
                                href={route('admin.pages.list')}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                            >
                                View all <ArrowRight className="size-3" />
                            </Link>
                        </div>
                        {recentPages.length > 0 ? (
                            <ul className="divide-y divide-border">
                                {recentPages.map((page) => (
                                    <li key={page.id}>
                                        <Link
                                            href={route('admin.pages.edit', page.id)}
                                            className="flex items-center justify-between px-5 py-3 hover:bg-accent/50"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">{page.title}</p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {page.route_name}
                                                </p>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-3 pl-3">
                                                <Badge variant={page.is_visible ? 'secondary' : 'outline'}>
                                                    {page.is_visible ? 'Visible' : 'Hidden'}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    {formatDate(page.updated_at)}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                                No pages yet.
                            </p>
                        )}
                    </div>

                    <div className="rounded-lg border border-border bg-card shadow-sm">
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h2 className="text-sm font-semibold">Recent media</h2>
                            <Link
                                href={route('admin.media.index')}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                            >
                                View all <ArrowRight className="size-3" />
                            </Link>
                        </div>
                        {recentMedia.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2 p-5 sm:grid-cols-6">
                                {recentMedia.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group relative aspect-square overflow-hidden rounded-md border border-border bg-accent"
                                        title={item.original_name}
                                    >
                                        {item.mime_type.startsWith('image/') ? (
                                            <img
                                                src={item.url}
                                                alt={item.alt_text ?? item.original_name}
                                                className="size-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex size-full items-center justify-center">
                                                <ImageIcon className="size-5 text-muted-foreground" />
                                            </div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                                No media uploaded yet.
                            </p>
                        )}
                    </div>
                </div>
        </AdminPage>
    );
}
