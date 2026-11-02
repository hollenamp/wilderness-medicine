import * as React from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, router } from '@inertiajs/react';
import { RedirectListPageProps, Redirect } from '@/types';
import { MoreHorizontal, Plus } from 'lucide-react';

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

import { Badge } from '@/Components/Admin/ui/badge';
import { DataTableColumnHeader } from '@/Components/Admin/ui/data-table/column-header';
import { DataTablePagination } from '@/Components/Admin/ui/data-table/pagination';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';

function handleDelete(redirect: Redirect) {
    if (!confirm(`Delete redirect from "${redirect.from_path}"?`)) return;
    router.delete(route('admin.redirects.destroy', redirect.id));
}

export const columns: ColumnDef<Redirect>[] = [
    {
        accessorKey: 'from_path',
        header: ({ column }) => <DataTableColumnHeader column={column} title="From" />,
        cell: ({ row }) => (
            <Link
                href={route('admin.redirects.edit', row.original.id)}
                className="font-mono text-sm text-foreground hover:underline"
            >
                {row.getValue('from_path')}
            </Link>
        ),
    },
    {
        accessorKey: 'to_path',
        header: 'To',
        cell: ({ row }) => <div className="font-mono text-sm text-muted-foreground">{row.getValue('to_path')}</div>,
    },
    {
        accessorKey: 'status_code',
        header: 'Status',
        cell: ({ row }) => <div className="text-muted-foreground">{row.getValue('status_code')}</div>,
    },
    {
        accessorKey: 'is_active',
        header: 'Active',
        cell: ({ row }) =>
            row.getValue('is_active') ? (
                <Badge variant="outline" className="border-teal-200 bg-teal-100/30 text-teal-900 dark:text-teal-200">
                    Active
                </Badge>
            ) : (
                <Badge variant="outline" className="border-border bg-muted text-muted-foreground">
                    Inactive
                </Badge>
            ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const redirect = row.original;
            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex size-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                                <MoreHorizontal className="size-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link href={route('admin.redirects.edit', redirect.id)}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(redirect)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export default function List({ auth, redirects }: RedirectListPageProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: redirects,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <AdminPage>
            <Head title="Redirects" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Redirects</h1>
                <Button variant="primary" asChild className="gap-2">
                    <Link href={route('admin.redirects.create')}>
                        <Plus className="size-4" />
                        New Redirect
                    </Link>
                </Button>
            </div>
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                        <Label htmlFor="search" className="sr-only">
                            Search
                        </Label>
                        <Input
                            tabIndex={1}
                            placeholder="Filter by from path..."
                            id="search"
                            name="search"
                            type="search"
                            value={(table.getColumn('from_path')?.getFilterValue() as string) ?? ''}
                            onChange={(event) => table.getColumn('from_path')?.setFilterValue(event.target.value)}
                            className="h-8 w-full max-w-sm"
                        />
                    </div>
                </div>

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
                                        No redirects yet.
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
