import { Avatar, AvatarFallback, AvatarImage } from '@/Components/UI/Avatar';
import {
    developerAccentBgClass,
    developerAccentRingClass,
} from '@/lib/developerAccent';
import { cx } from '@/lib/utils';

interface DeveloperAvatarProps {
    avatarUrl?: string | null;
    initials: string;
    accentColor?: string | null;
    className?: string;
    sizeClassName?: string;
}

export default function DeveloperAvatar({
    avatarUrl,
    initials,
    accentColor,
    className,
    sizeClassName = 'size-8',
}: DeveloperAvatarProps) {
    return (
        <Avatar
            variant="developer"
            className={cx(
                'shrink-0',
                sizeClassName,
                developerAccentBgClass(accentColor),
                developerAccentRingClass(accentColor),
                'ring-2',
                className,
            )}
        >
            {avatarUrl ? (
                <AvatarImage avatarSrc={avatarUrl} className="rounded-full" />
            ) : null}
            <AvatarFallback value={initials} />
        </Avatar>
    );
}
