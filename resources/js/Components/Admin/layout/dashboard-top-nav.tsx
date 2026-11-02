import { TopNav } from '@/Components/Admin/layout/top-nav';

export function DashboardTopNav() {
    const links = [
        {
            title: 'Overview',
            href: route('admin.dashboard'),
            isActive: Boolean(route().current('admin.dashboard')),
        },
    ];

    return <TopNav links={links} className="me-auto" />;
}
