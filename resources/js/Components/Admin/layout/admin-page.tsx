import { ReactNode } from 'react';
import { Header } from '@/Components/Admin/layout/header';
import { Main } from '@/Components/Admin/layout/main';
import { ThemeSwitch } from '@/Components/Admin/layout/theme-switch';
import { ConfigDrawer } from '@/Components/Admin/ConfigDrawer';
import { ProfileDropdown } from '@/Components/Admin/layout/profile-dropdown';
import { MailLogIndicator } from '@/Components/Admin/layout/mail-log-indicator';
import { Separator } from '@/Components/Admin/ui/separator';

type AdminPageProps = {
    children: ReactNode;
    fixed?: boolean;
    headerStart?: ReactNode;
    headerEnd?: ReactNode;
};

export function AdminPage({ children, fixed = false, headerStart, headerEnd }: AdminPageProps) {
    return (
        <>
            <Header fixed={fixed}>
                {headerStart}
                <div className="ms-auto flex h-full items-center gap-3 sm:gap-4">
                    {headerEnd}
                    {headerEnd ? <Separator orientation="vertical" /> : null}
                    <MailLogIndicator />
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>
            <Main id="content" fixed={fixed}>
                {children}
            </Main>
        </>
    );
}
