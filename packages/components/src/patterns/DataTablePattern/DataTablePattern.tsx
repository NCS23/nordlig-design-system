import React from 'react';
import { cn } from '../../utils/cn';
import { DataTable } from '../../organisms/DataTable/DataTable';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { EmptyState } from '../../molecules/EmptyState/EmptyState';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import type { ColumnDef } from '@tanstack/react-table';

// Component token CSS
import '@nordlig/styles/tokens/datatablepattern';

export interface DataTablePatternProps<TData> {
  /** Spaltendefinitionen fuer die Tabelle */
  columns: ColumnDef<TData, unknown>[];
  /** Daten-Array */
  data: TData[];
  /** Suchfeld anzeigen */
  searchable?: boolean;
  /** Platzhalter fuer das Suchfeld */
  searchPlaceholder?: string;
  /** Filter-Slots (Select, DatePicker etc.) */
  filterSlots?: React.ReactNode;
  /** Zeilen selektierbar machen */
  selectable?: boolean;
  /** Bulk-Actions Render-Funktion (erhaelt selektierte Zeilen) */
  bulkActions?: (selectedRows: TData[]) => React.ReactNode;
  /** Benutzerdefinierter EmptyState */
  emptyState?: React.ReactNode;
  /** Titel fuer den Standard-EmptyState */
  emptyTitle?: string;
  /** Beschreibung fuer den Standard-EmptyState */
  emptyDescription?: string;
  /** Pagination aktivieren */
  pagination?: boolean;
  /** Seitengroesse */
  pageSize?: number;
  /** Seitentitel */
  title?: string;
  /** Seitenbeschreibung */
  description?: string;
  /** Header-Actions (Buttons rechts neben dem Titel) */
  headerActions?: React.ReactNode;
  /** Tabellendichte */
  density?: 'compact' | 'normal' | 'spacious';
  /** Gestreifte Zeilen */
  striped?: boolean;
  /** Zusaetzliche CSS-Klassen */
  className?: string;
}

function DataTablePatternInner<TData>(
  {
    columns,
    data,
    searchable = false,
    searchPlaceholder = 'Suchen...',
    filterSlots,
    selectable = false,
    bulkActions,
    emptyState,
    emptyTitle = 'Keine Daten',
    emptyDescription = 'Es sind keine Eintraege vorhanden.',
    pagination = true,
    pageSize = 10,
    title,
    description,
    headerActions,
    density = 'normal',
    striped = false,
    className,
  }: DataTablePatternProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState<TData[]>([]);

  // Daten filtern basierend auf Suchbegriff
  const filteredData = React.useMemo(() => {
    if (!searchValue.trim()) return data;
    const lower = searchValue.toLowerCase();
    return data.filter((row) => {
      // Alle Werte des Objekts durchsuchen
      return Object.values(row as Record<string, unknown>).some((val) =>
        String(val).toLowerCase().includes(lower)
      );
    });
  }, [data, searchValue]);

  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-[var(--spacing-dtpattern-section-gap)]', className)}
    >
      {/* Header */}
      {(title || headerActions) && (
        <div className="flex items-center justify-between gap-[var(--spacing-dtpattern-header-gap)]">
          <div>
            {title && <Heading level={3}>{title}</Heading>}
            {description && <Text variant="muted">{description}</Text>}
          </div>
          {headerActions && <div className="shrink-0">{headerActions}</div>}
        </div>
      )}

      {/* Search + Filters */}
      {searchable && (
        <SearchFilter
          searchPlaceholder={searchPlaceholder}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          resultCount={filteredData.length}
        >
          {filterSlots}
        </SearchFilter>
      )}

      {/* Bulk Actions Bar */}
      {selectable && selectedRows.length > 0 && bulkActions && (
        <div
          className={cn(
            'flex items-center gap-[var(--spacing-dtpattern-bulk-gap)]',
            'rounded-[var(--radius-dtpattern-bulk)]',
            'border border-[var(--color-dtpattern-bulk-border)]',
            'bg-[var(--color-dtpattern-bulk-bg)]',
            'px-[var(--spacing-dtpattern-bulk-px)] py-[var(--spacing-dtpattern-bulk-py)]'
          )}
          data-testid="bulk-actions-bar"
        >
          <Text variant="small" className="text-[var(--color-dtpattern-bulk-text)]">
            {selectedRows.length} ausgewaehlt
          </Text>
          {bulkActions(selectedRows)}
        </div>
      )}

      {/* DataTable or EmptyState */}
      {filteredData.length === 0 ? (
        emptyState || (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        )
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          density={density}
          striped={striped}
          searchable={false}
          pagination={pagination}
          pageSize={pageSize}
          selectable={selectable}
          onSelectionChange={setSelectedRows}
        />
      )}
    </div>
  );
}

export const DataTablePattern = React.forwardRef(DataTablePatternInner) as <TData>(
  props: DataTablePatternProps<TData> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(DataTablePattern as { displayName?: string }).displayName = 'DataTablePattern';
