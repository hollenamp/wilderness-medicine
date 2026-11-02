import * as React from 'react';
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link, router } from '@inertiajs/react';
import type { BlogPost, BlogPostListPageProps } from '@/types';
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
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function handleDelete(post: BlogPost) {
    if (!confirm(`Delete "${post.title}"?`)) return;
    router.delete(route('admin.blog.destroy', post.id));
}

export const columns: ColumnDef<BlogPost>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
            <Link
                href={route('admin.blog.edit', row.original.id)}
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
        accessorKey: 'published_at',
        header: 'Published',
        cell: ({ row }) => <div className="text-muted-foreground">{formatDate(row.getValue('published_at'))}</div>,
    },
    {
        id: 'author',
        header: 'Author',
        cell: ({ row }) => <div className="text-muted-foreground">{row.original.author?.name ?? '—'}</div>,
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
            const post = row.original;
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
                                <Link href={route('admin.blog.edit', post.id)}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(post)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export default function List({ auth, posts }: BlogPostListPageProps) {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'updated_at', desc: true },
    ]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: posts,
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
            <Head title="Blog" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
                <div className="flex items-center gap-2">
                    <Button variant="secondaryOutline" asChild className="gap-2">
                        <Link href={route('admin.blog.trash')}>
                            <Trash2 className="size-4" />
                            Trash
                        </Link>
                    </Button>
                    <Button variant="primary" asChild className="gap-2">
                        <Link href={route('admin.blog.create')}>
                            <Plus className="size-4" />
                            New Post
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 space-y-2">
                    <div className="grid grid-cols-12 text-muted-foreground">
                        <div className="col-span-6 pb-4">
                            <h3 className="font-semibold text-foreground">All Posts</h3>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                Blog posts published to your site. Create a post to get started.
                            </p>
                        </div>
                        <div className="col-span-6 pb-4 flex justify-end items-end gap-2">
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
                            Total: {table.getPrePaginationRowModel().rows.length} posts
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
                                        No posts yet.
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
