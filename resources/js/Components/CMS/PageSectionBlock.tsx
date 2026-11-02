import { Tooltip, TooltipContent, TooltipTrigger } from '@/Components/Admin/ui/tooltip';
import { cx } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { KeyboardEvent, MouseEvent } from 'react';

interface PageSectionBlockProps {
    label: string;
    preview: string;
    isSelected: boolean;
    onSelect: () => void;
    onOpenSettings: () => void;
}

export function PageSectionBlock({
    label,
    preview,
    isSelected,
    onSelect,
    onOpenSettings,
}: PageSectionBlockProps) {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect();
        }
    };

    const handleOpenSettings = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onOpenSettings();
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`${label} section`}
            aria-selected={isSelected}
            onClick={onSelect}
            onKeyDown={handleKeyDown}
            className={cx(
                'group relative rounded-lg border border-border bg-card px-4 py-4 transition-shadow cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isSelected
                    ? 'ring-2 ring-primary shadow-sm'
                    : 'hover:ring-2 hover:ring-primary/40',
            )}
        >
            <div
                className={cx(
                    'absolute -top-3 right-3 flex items-center rounded-md border border-border bg-background shadow-sm transition-opacity',
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
                )}
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            onClick={handleOpenSettings}
                            aria-label="Section settings"
                            className="flex items-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            <Pencil className="h-4.5 w-4.5" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Settings</TooltipContent>
                </Tooltip>
            </div>

            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{preview}</p>
        </div>
    );
}
