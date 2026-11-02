import { Column } from '@tanstack/react-table';
import { CirclePlus } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/Inputs/DropdownMenu';
import { Badge } from '@/Components/Admin/ui/badge';

interface DataTableStatusFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title: string;
    options: { label: string; value: string }[];
}

export function DataTableStatusFilter<TData, TValue>({ column, title, options }: DataTableStatusFilterProps<TData, TValue>) {
    const selected = new Set((column?.getFilterValue() as string[]) ?? []);

    function toggle(value: string, checked: boolean) {
        const next = new Set(selected);
        if (checked) {
            next.add(value);
        } else {
            next.delete(value);
        }
        column?.setFilterValue(next.size ? Array.from(next) : undefined);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="flex h-8 items-center gap-2 rounded-md border border-dashed border-input px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                    <CirclePlus className="size-3.5" />
                    {title}
                    {selected.size > 0 && (
                        <Badge variant="secondary" className="rounded-sm px-1.5 font-normal">
                            {selected.size}
                        </Badge>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-40">
                <DropdownMenuLabel>{title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {options.map((option) => (
                    <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={selected.has(option.value)}
                        onCheckedChange={(checked) => toggle(option.value, !!checked)}
                    >
                        {option.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
