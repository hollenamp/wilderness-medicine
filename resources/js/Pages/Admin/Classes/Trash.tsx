import * as React from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, router } from '@inertiajs/react';
import type { Course, CourseListPageProps } from '@/types';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/Inputs/DropdownMenu';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/Table';

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { DataTablePagination } from '@/Components/Admin/ui/data-table/pagination';

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function handleRestore(course: Course) {
    if (!confirm(`Restore "${course.title}"?`)) return;
    router.post(route('admin.classes.restore', course.id));
}

function handleForceDestroy(course: Course) {
    if (!confirm(`Permanently delete "${course.title}"? This cannot be undone.`)) return;
    router.delete(route('admin.classes.force-destroy', course.id));
}

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => <div className="font-medium text-foreground">{row.getValue('title')}</div>,
    },
    {
        accessorKey: 'deleted_at',
        header: 'Deleted',
        cell: ({ row }) => <div className="text-muted-foreground">{formatDate(row.getValue('deleted_at'))}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const course = row.original;
            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex size-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                                <MoreHorizontal className="size-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleRestore(course)}>Restore</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleForceDestroy(course)}>Delete Permanently</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export default function Trash({ courses }: CourseListPageProps) {
    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'deleted_at', desc: true }]);

    const table = useReactTable({
        data: courses,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <AdminPage>
            <Head title="Classes Trash" />
            <div className="mb-4 flex items-center gap-3">
                <Link
                    href={route('admin.classes.list')}
                    className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Classes Trash</h1>
            </div>
            <div className="space-y-4">
                <div className="overflow-hidden rounded-md border border-border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Trash is empty.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <DataTablePagination table={table} />
            </div>
        </AdminPage>
    );
}
