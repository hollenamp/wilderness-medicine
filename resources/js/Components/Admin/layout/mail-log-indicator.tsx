import { Link, usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { Button } from '@/Components/Admin/ui/button';
import type { PageProps } from '@/types';

export function MailLogIndicator() {
    const { mailLogCount } = usePage<PageProps>().props;
    const hasCount = Boolean(mailLogCount);

    return (
        <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative scale-95 rounded-full"
        >
            <Link href={route('admin.mail-log.list')} aria-label="Sent mail">
                <Mail className="size-[1.2rem]" />
                {hasCount && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-admin-primary px-1 text-[10px] font-semibold leading-none text-admin-primary-foreground ring-2 ring-background">
                        {mailLogCount}
                    </span>
                )}
            </Link>
        </Button>
    );
}
