import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { SelectNative } from '@/Components/Inputs/SelectNative';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
    return (
        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Rows per page</span>
                    <SelectNative
                        className="h-8 w-[70px]"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </SelectNative>
                </div>
                <div className="flex items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md border border-input disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft className="size-4" />
                        <span className="sr-only">Go to first page</span>
                    </button>
                    <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md border border-input disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="size-4" />
                        <span className="sr-only">Go to previous page</span>
                    </button>
                    <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md border border-input disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="size-4" />
                        <span className="sr-only">Go to next page</span>
                    </button>
                    <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md border border-input disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight className="size-4" />
                        <span className="sr-only">Go to last page</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
