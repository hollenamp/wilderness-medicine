import * as React from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, router } from '@inertiajs/react';
import { ImageCategoryListPageProps, Category } from '@/types';
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

function handleDelete(category: Category) {
    if (!confirm(`Delete "${category.name}"? It will be removed from any images using it.`)) return;
    router.delete(route('admin.image-categories.destroy', category.id));
}

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => (
            <Link
                href={route('admin.image-categories.edit', row.original.id)}
                className="font-medium text-foreground hover:underline"
            >
                {row.getValue('name')}
            </Link>
        ),
    },
    {
        accessorKey: 'media_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Used" />,
        cell: ({ row }) => <div>{row.getValue('media_count') ?? 0}</div>,
    },
    {
        id: 'galleries',
        header: 'Galleries',
        cell: ({ row }) => {
            const galleries = row.original.galleries ?? [];
            if (galleries.length === 0) {
                return <span className="text-muted-foreground">No galleries</span>;
            }
            return (
                <div className="flex flex-wrap gap-x-1 gap-y-1">
                    {galleries.map((gallery, index) => (
                        <React.Fragment key={gallery.id}>
                            <Link
                                href={route('admin.galleries.edit', gallery.id)}
                                className="text-primary-600 hover:underline"
                            >
                                {gallery.name}
                            </Link>
                            {index < galleries.length - 1 && <span className="text-muted-foreground">,</span>}
                        </React.Fragment>
                    ))}
                </div>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original;
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
                                <Link href={route('admin.image-categories.edit', category.id)}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(category)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export default function List({ auth, categories }: ImageCategoryListPageProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: categories,
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
            <Head title="Image Categories" />
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Image Categories</h1>
                    <Button variant="primary" asChild className="gap-2">
                        <Link href={route('admin.image-categories.create')}>
                            <Plus className="size-4" />
                            New Category
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
                                placeholder="Filter by title..."
                                id="search"
                                name="search"
                                type="search"
                                value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                                onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
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
                                            No categories yet.
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
