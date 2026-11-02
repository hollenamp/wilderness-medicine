import * as React from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, router } from '@inertiajs/react';
import type { Product, ProductListPageProps } from '@/types';
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';

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
import { DataTablePagination } from '@/Components/Admin/ui/data-table/pagination';
import { DataTableStatusFilter } from '@/Components/Admin/ui/data-table/status-filter';

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
import { cx } from '@/lib/utils';

const statusOptions = [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
];

function formatDate(dateStr: string | null): string {
    if (!dateStr) {
        return '—';
    }

    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function formatPrice(price: Product['price']): string {
    if (price === null || price === '') {
        return '—';
    }

    const amount = typeof price === 'number' ? price : Number(price);

    if (Number.isNaN(amount)) {
        return '—';
    }

    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.title}"?`)) {
        return;
    }

    router.delete(route('admin.store.products.destroy', product.id));
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
            <Link
                href={route('admin.store.products.edit', row.original.id)}
                className="font-medium text-foreground hover:underline"
            >
                {row.getValue('title')}
            </Link>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) =>
            row.getValue('status') === 'published' ? (
                <Badge variant="outline" className="border-teal-200 bg-teal-100/30 text-teal-900 dark:text-teal-200">
                    Published
                </Badge>
            ) : (
                <Badge variant="outline" className="border-border bg-muted text-muted-foreground">
                    Draft
                </Badge>
            ),
        filterFn: (row, columnId, filterValue: string[]) => filterValue.includes(row.getValue(columnId)),
    },
    {
        id: 'price',
        header: 'Price',
        cell: ({ row }) => <div className="text-muted-foreground">{formatPrice(row.original.price)}</div>,
    },
    {
        id: 'categories',
        header: 'Categories',
        cell: ({ row }) => {
            const names = (row.original.categories ?? []).map((category) => category.name);

            return (
                <div className="text-muted-foreground">
                    {names.length > 0 ? names.join(', ') : '—'}
                </div>
            );
        },
    },
    {
        accessorKey: 'updated_at',
        header: 'Updated',
        cell: ({ row }) => <div className="text-muted-foreground">{formatDate(row.getValue('updated_at'))}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

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
                                <Link href={route('admin.store.products.edit', product.id)}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export default function List({ products }: ProductListPageProps) {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'updated_at', desc: true },
    ]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: products,
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
            <Head title="Store Products" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                <div className="flex items-center gap-2">
                    <Button variant="secondaryOutline" asChild className="gap-2">
                        <Link href={route('admin.store.products.trash')}>
                            <Trash2 className="size-4" />
                            Trash
                        </Link>
                    </Button>
                    <Button variant="primary" asChild className="gap-2">
                        <Link href={route('admin.store.products.create')}>
                            <Plus className="size-4" />
                            New Product
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                <div className="space-y-2 p-6">
                    <div className="grid grid-cols-12 text-muted-foreground">
                        <div className="col-span-6 pb-4">
                            <h3 className="font-semibold text-foreground">All Products</h3>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                Catalog items listed on the public store. Visitors call to order — there is no checkout.
                            </p>
                        </div>
                        <div className="col-span-6 flex items-end justify-end gap-2 pb-4">
                            <DataTableStatusFilter column={table.getColumn('status')} title="Status" options={statusOptions} />
                            <Label htmlFor="search" className="sr-only">
                                Search
                            </Label>
                            <Input
                                id="search"
                                name="search"
                                type="search"
                                placeholder="Search by title"
                                value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                                onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                                className="w-full max-w-xs"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 text-muted-foreground">
                        <div className="col-span-6">
                            Total: {table.getPrePaginationRowModel().rows.length} products
                        </div>
                    </div>
                    <Table>
                        <TableHeader className="border-b border-border bg-muted/80 font-semibold text-foreground">
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
                                            index % 2 === 0 ? ' bg-muted/50' : 'bg-muted/80',
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
                                        No products yet.
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
