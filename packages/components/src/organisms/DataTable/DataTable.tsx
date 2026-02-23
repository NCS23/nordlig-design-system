import React from 'react';
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../Table';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Checkbox } from '../../atoms/Checkbox';

/* ─── DataTable ─── */

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  density?: 'compact' | 'normal' | 'spacious';
  striped?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onSelectionChange?: (rows: TData[]) => void;
  emptyMessage?: React.ReactNode;
  className?: string;
}

function DataTable<TData, TValue>({
  columns: userColumns,
  data,
  density = 'normal',
  striped = false,
  searchable = false,
  searchPlaceholder = 'Suchen...',
  searchColumn,
  pagination = false,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  emptyMessage = 'Keine Ergebnisse.',
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Checkbox-Spalte voranstellen, wenn selectable
  const columns = React.useMemo(() => {
    if (!selectable) return userColumns;
    const selectColumn: ColumnDef<TData, unknown> = {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Alle auswaehlen"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Zeile auswaehlen"
        />
      ),
      enableSorting: false,
    };
    return [selectColumn, ...userColumns];
  }, [userColumns, selectable]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    enableRowSelection: selectable,
  });

  // Callback bei Selektionsaenderungen
  React.useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((r) => r.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange, table]);

  // Seitengroesse setzen
  React.useEffect(() => {
    if (pagination) {
      table.setPageSize(pageSize);
    }
  }, [pageSize, pagination, table]);

  return (
    <div
      className={cn(
        'flex flex-col gap-[var(--spacing-datatable-toolbar-gap)]',
        className
      )}
    >
      {/* Toolbar */}
      {searchable && (
        <div className="flex items-center p-[var(--spacing-datatable-toolbar-padding)]">
          <Input
            placeholder={searchPlaceholder}
            value={
              searchColumn
                ? ((table.getColumn(searchColumn)?.getFilterValue() as string) ?? '')
                : globalFilter
            }
            onChange={(e) => {
              if (searchColumn) {
                table.getColumn(searchColumn)?.setFilterValue(e.target.value);
              } else {
                setGlobalFilter(e.target.value);
              }
            }}
            className="max-w-sm"
          />
        </div>
      )}

      {/* Tabelle */}
      <Table density={density} striped={striped}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} hoverable={false}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <DataTableColumnHeader column={header.column}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </DataTableColumnHeader>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  row.getIsSelected() &&
                    'bg-[var(--color-datatable-row-selected-bg)]'
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
            <TableRow hoverable={false}>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-[var(--color-datatable-empty-text)]"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && <DataTablePagination table={table} />}
    </div>
  );
}
DataTable.displayName = 'DataTable';

/* ─── DataTableColumnHeader ─── */

interface DataTableColumnHeaderProps<TData, TValue> {
  column: import('@tanstack/react-table').Column<TData, TValue>;
  children: React.ReactNode;
  className?: string;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  children,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();
  return (
    <button
      className={cn(
        'inline-flex items-center gap-[var(--spacing-datatable-toolbar-gap)] ml-[calc(-1*var(--spacing-datatable-colheader-px))] px-[var(--spacing-datatable-colheader-px)] py-[var(--spacing-datatable-colheader-py)] rounded transition-colors',
        'hover:bg-[var(--color-datatable-toolbar-bg)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
        className
      )}
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      {children}
      {sorted === 'asc' ? (
        <Icon
          icon={ArrowUp}
          size={14}
          className="text-[var(--color-datatable-sort-icon-active)]"
        />
      ) : sorted === 'desc' ? (
        <Icon
          icon={ArrowDown}
          size={14}
          className="text-[var(--color-datatable-sort-icon-active)]"
        />
      ) : (
        <Icon
          icon={ArrowUpDown}
          size={14}
          className="text-[var(--color-datatable-sort-icon)]"
        />
      )}
    </button>
  );
}
DataTableColumnHeader.displayName = 'DataTableColumnHeader';

/* ─── DataTablePagination ─── */

interface DataTablePaginationProps<TData> {
  table: import('@tanstack/react-table').Table<TData>;
}

function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-[var(--spacing-datatable-toolbar-padding)]">
      <span className="text-[length:var(--font-datatable-pagination-size)] text-[var(--color-datatable-empty-text)]">
        Seite {table.getState().pagination.pageIndex + 1} von{' '}
        {table.getPageCount()}
      </span>
      <div className="flex items-center gap-[var(--spacing-datatable-toolbar-gap)]">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Icon icon={ChevronLeft} size="sm" />
          Zurueck
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Weiter
          <Icon icon={ChevronRight} size="sm" />
        </Button>
      </div>
    </div>
  );
}
DataTablePagination.displayName = 'DataTablePagination';

export { DataTable, DataTableColumnHeader, DataTablePagination };
