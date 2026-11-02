import { Link, router } from '@inertiajs/react';
import { Settings, LogOut } from 'lucide-react';
import { useAdminUser } from '@/Contexts/AdminUserProvider';
import { Avatar, AvatarFallback } from '@/Components/Admin/ui/avatar';
import { Button } from '@/Components/Admin/ui/button';
import { getInitials } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/Admin/ui/dropdown-menu';

export function ProfileDropdown() {
    const user = useAdminUser();
    const initials = getInitials(user.name);

    const handleSignOut = () => {
        router.post(route('logout'));
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-zinc-500">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={route('profile.edit')} className="flex items-center gap-2">
                            <Settings className="size-4" />
                            Account Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={handleSignOut}>
                    <LogOut className="size-4" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
