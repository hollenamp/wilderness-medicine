import * as React from "react"
import { AdminPage } from '@/Components/Admin/layout/admin-page';
import { Head, Link } from '@inertiajs/react';
import { UserPageProps, Users } from '@/types';
import { MoreHorizontal } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/Components/Inputs/DropdownMenu"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/Components/Table"

import { Badge } from '@/Components/Admin/ui/badge';
import { DataTableColumnHeader } from '@/Components/Admin/ui/data-table/column-header';
import { DataTablePagination } from '@/Components/Admin/ui/data-table/pagination';
import { DataTableViewOptions } from '@/Components/Admin/ui/data-table/view-options';
import { DataTableStatusFilter } from '@/Components/Admin/ui/data-table/status-filter';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Checkbox } from '@/Components/Inputs/Checkbox';
import { Input } from "@/Components/Inputs/Input";
import { Label } from "@/Components/Inputs/Label";
import { cx } from '@/lib/utils';

const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Suspended', value: 'suspended' },
];

export const columns: ColumnDef<Users>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value:any) => row.toggleSelected(!!value)}
            aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => <div> {row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        cell: ({ row }) => <div className="lowercase"> {row.getValue("email")}</div>,
    },
    {
        accessorKey: "admin",
        header: "",
        cell: ({ row }) => (
            <>
                { row.getValue<boolean>("admin") &&
                    <Badge variant="secondary">
                        Admin
                    </Badge>
                }
            </>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "suspended",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => (
            row.getValue<boolean>("suspended") ? (
                <Badge variant="outline" className="border-destructive/10 bg-destructive/10 text-destructive dark:bg-destructive/50 dark:text-primary">
                    Suspended
                </Badge>
            ) : (
                <Badge variant="outline" className="border-teal-200 bg-teal-100/30 text-teal-900 dark:text-teal-200">
                    Active
                </Badge>
            )
        ),
        filterFn: (row, columnId, filterValue: string[]) => {
            const status = row.getValue<boolean>(columnId) ? 'suspended' : 'active';
            return filterValue.includes(status);
        },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
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
                          <Link href={route('admin.profile.edit', row.getValue<number>("id"))}>Edit</Link>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
        )
      },
    },
  ]

export default function List({ auth, users }: UserPageProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const data: Users[] = users

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
        },
    })

    return (
        <AdminPage>
            <Head title="List Users" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Users</h1>
            </div>
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                        <Label htmlFor="search" className="sr-only">Search</Label>
                        <Input
                            tabIndex={1}
                            placeholder="Filter by name..."
                            id="search"
                            name="search"
                            type="search"
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event:any) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="h-8 w-full max-w-sm"
                        />
                        <DataTableStatusFilter column={table.getColumn('suspended')} title="Status" options={statusOptions} />
                    </div>
                    <DataTableViewOptions table={table} />
                </div>

                <div className="overflow-hidden rounded-md border border-border">
                    <Table>
                        <TableHeader className="text-foreground font-semibold border-b border-border bg-muted/80">
                            {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
                                })}
                            </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="text-foreground">
                            {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={cx(
                                    'border-b border-border',
                                    index % 2 === 0 ? 'bg-muted/50' : 'bg-muted/80'
                                )}
                                >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                    </TableCell>
                                ))}
                                </TableRow>
                            ))
                            ) : (
                            <TableRow>
                                <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                                >
                                No results.
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
