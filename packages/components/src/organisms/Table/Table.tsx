import React from 'react';
import { cn } from '../../utils/cn';

/* ─── Density CSS custom properties ─── */
const densityMap = {
  compact: {
    '--_table-px': 'var(--spacing-table-cell-x-compact)',
    '--_table-py': 'var(--spacing-table-cell-y-compact)',
  },
  normal: {
    '--_table-px': 'var(--spacing-table-cell-x-normal)',
    '--_table-py': 'var(--spacing-table-cell-y-normal)',
  },
  spacious: {
    '--_table-px': 'var(--spacing-table-cell-x-spacious)',
    '--_table-py': 'var(--spacing-table-cell-y-spacious)',
  },
} as const;

/* ─── Table ─── */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  density?: 'compact' | 'normal' | 'spacious';
  striped?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, density = 'normal', striped = false, style, ...props }, ref) => {
    return (
      <div className="overflow-x-auto">
        <table
          ref={ref}
          data-striped={striped || undefined}
          className={cn('w-full caption-bottom border-collapse text-[length:var(--font-component-size-sm)]', className)}
          style={{ ...densityMap[density], ...style } as React.CSSProperties}
          {...props}
        />
      </div>
    );
  }
);
Table.displayName = 'Table';

/* ─── TableHeader ─── */
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn('sticky top-0 z-10 bg-[var(--color-table-header-bg)]', className)}
        {...props}
      />
    );
  }
);
TableHeader.displayName = 'TableHeader';

/* ─── TableBody ─── */
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn('[&>tr:last-child]:border-0', className)}
        {...props}
      />
    );
  }
);
TableBody.displayName = 'TableBody';

/* ─── TableRow ─── */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hoverable?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hoverable = true, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'border-b border-[var(--color-table-border)] transition-colors',
          hoverable && 'hover:bg-[var(--color-table-row-hover)]',
          '[[data-striped]_&:nth-child(even)]:bg-[var(--color-table-row-stripe)]',
          className
        )}
        {...props}
      />
    );
  }
);
TableRow.displayName = 'TableRow';

/* ─── TableHead ─── */
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align = 'left', ...props }, ref) => {
    const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
    return (
      <th
        ref={ref}
        className={cn(
          'px-[var(--_table-px)] py-[var(--_table-py)] font-semibold text-[var(--color-table-header-text)] border-b-2 border-[var(--color-table-border)] whitespace-nowrap',
          alignClass,
          className
        )}
        {...props}
      />
    );
  }
);
TableHead.displayName = 'TableHead';

/* ─── TableCell ─── */
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  numeric?: boolean;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align, numeric = false, ...props }, ref) => {
    const effectiveAlign = align ?? (numeric ? 'right' : 'left');
    const alignClass = effectiveAlign === 'right' ? 'text-right' : effectiveAlign === 'center' ? 'text-center' : 'text-left';
    return (
      <td
        ref={ref}
        className={cn(
          'px-[var(--_table-px)] py-[var(--_table-py)]',
          numeric && 'tabular-nums',
          alignClass,
          className
        )}
        {...props}
      />
    );
  }
);
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
