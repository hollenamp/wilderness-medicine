import * as React from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link } from '@inertiajs/react';
import type { Page, PageListPageProps } from '@/types';
import { ArrowUpDown } from 'lucide-react';

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
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { DataTablePagination } from '@/Components/Admin/ui/data-table/pagination';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { cx } from '@/lib/utils';

export const columns: ColumnDef<Page>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <button
                type="button"
                className="flex space-x-2 items-center"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                <ArrowUpDown size={12} />
                <span>Title</span>
            </button>
        ),
        cell: ({ row }) => <div>{row.getValue('title')}</div>,
    },
    {
        accessorKey: 'route_name',
        header: 'Route Name',
        cell: ({ row }) => (
            <div className="text-muted-foreground">{row.getValue('route_name')}</div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const page = row.original;

            return (
                <div className="flex justify-end">
                    <Link
                        href={route('admin.pages.edit', page.id)}
                        className="text-sm text-primary-600 hover:underline"
                    >
                        Edit
                    </Link>
                </div>
            );
        },
    },
];

export default function List({ auth, pages }: PageListPageProps) {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'title', desc: false },
    ]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: pages,
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
            <Head title="Pages" />
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
                </div>
                <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 space-y-2">
                        <div className="grid grid-cols-12 text-muted-foreground">
                            <div className="col-span-6 pb-4">
                                <h3 className="font-semibold text-foreground">List All Pages</h3>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    Frontend pages discovered from our routes. Edit a page to update its content.
                                </p>
                            </div>
                            <div className="col-span-6 pb-4 flex justify-end items-end">
                                <Label htmlFor="search" className="sr-only">
                                    Search
                                </Label>
                                <Input
                                    id="search"
                                    name="search"
                                    type="search"
                                    placeholder="Search by title"
                                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                                    onChange={(event) =>
                                        table.getColumn('title')?.setFilterValue(event.target.value)
                                    }
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12 text-muted-foreground">
                            <div className="col-span-6">
                                Total: {table.getPrePaginationRowModel().rows.length} pages
                            </div>
                        </div>
                        <Table>
                            <TableHeader className="text-foreground font-semibold border-b border-border bg-muted/80">
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
                            <TableBody className="text-foreground">
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row, index) => (
                                        <TableRow
                                            key={row.id}
                                            className={cx(
                                                'border-b border-border',
                                                index % 2 === 0 ? ' bg-muted/50' : 'bg-muted/80'
                                            )}
                                        >
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
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="pt-4">
                            <DataTablePagination table={table} />
                        </div>
                    </div>
                </div>
        </AdminPage>
    );
}
