import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Aktuelle Seite (1-basiert) */
  currentPage: number;
  /** Gesamtanzahl der Seiten */
  totalPages: number;
  /** Callback bei Seitenwechsel */
  onPageChange: (page: number) => void;
  /** Anzahl der Seiten links und rechts der aktuellen Seite */
  siblingCount?: number;
  /** Darstellungsvariante */
  variant?: 'default' | 'compact';
}

// ─── Page Range Helper ──────────────────────────────────────────────────────

function getPageRange(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  // Gesamtzahl benoetigter Slots: siblings links + siblings rechts + current + erste + letzte + 2 Ellipsen
  const totalSlots = siblings * 2 + 5;

  // Wenn alle Seiten reinpassen, keine Ellipsis noetig
  if (total <= totalSlots) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblings, 1);
  const rightSiblingIndex = Math.min(current + siblings, total);

  // Ellipsis nur anzeigen, wenn mehr als 1 Seite verborgen wird
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    // Kein linkes Ellipsis: zeige die ersten Seiten
    const leftCount = siblings * 2 + 3;
    const leftPages = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftPages, 'ellipsis', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    // Kein rechtes Ellipsis: zeige die letzten Seiten
    const rightCount = siblings * 2 + 3;
    const rightPages = Array.from({ length: rightCount }, (_, i) => total - rightCount + 1 + i);
    return [1, 'ellipsis', ...rightPages];
  }

  // Beide Ellipsen
  const middlePages = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, 'ellipsis', ...middlePages, 'ellipsis', total];
}

// ─── Pagination ─────────────────────────────────────────────────────────────

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    const baseButtonClasses = cn(
      'w-[var(--sizing-pagination-item-size)] h-[var(--sizing-pagination-item-size)] flex items-center justify-center text-[length:var(--sizing-pagination-font-size)] [font-weight:var(--font-pagination-item-weight)]',
      'rounded-[var(--radius-pagination-item)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
    );

    const normalButtonClasses = cn(
      baseButtonClasses,
      'border border-[var(--color-pagination-item-border)]',
      'bg-[var(--color-pagination-item-bg)]',
      'text-[var(--color-pagination-item-text)]',
      'hover:bg-[var(--color-pagination-item-hover-bg)]'
    );

    const activeButtonClasses = cn(
      baseButtonClasses,
      'bg-[var(--color-pagination-item-active-bg)]',
      'text-[var(--color-pagination-item-active-text)]',
      'border border-[var(--color-pagination-item-active-border)]'
    );

    const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

    // ─── Compact Variant ──────────────────────────────────────────────────

    if (variant === 'compact') {
      return (
        <nav
          ref={ref}
          aria-label="Seitennavigation"
          className={cn('flex items-center gap-[var(--spacing-pagination-nav-gap)]', className)}
          {...props}
        >
          <button
            type="button"
            aria-label="Vorherige Seite"
            disabled={isFirstPage}
            onClick={() => onPageChange(currentPage - 1)}
            className={cn(normalButtonClasses, isFirstPage && disabledClasses)}
          >
            <Icon icon={ChevronLeft} size="sm" />
          </button>
          <span className="text-[length:var(--font-pagination-info-size)] text-[var(--color-pagination-item-text)] px-2">
            Seite {currentPage} von {totalPages}
          </span>
          <button
            type="button"
            aria-label="Naechste Seite"
            disabled={isLastPage}
            onClick={() => onPageChange(currentPage + 1)}
            className={cn(normalButtonClasses, isLastPage && disabledClasses)}
          >
            <Icon icon={ChevronRight} size="sm" />
          </button>
        </nav>
      );
    }

    // ─── Default Variant ──────────────────────────────────────────────────

    const pages = getPageRange(currentPage, totalPages, siblingCount);

    return (
      <nav
        ref={ref}
        aria-label="Seitennavigation"
        className={cn('flex items-center gap-[var(--spacing-pagination-item-gap)]', className)}
        {...props}
      >
        {/* Vorherige Seite */}
        <button
          type="button"
          aria-label="Vorherige Seite"
          disabled={isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
          className={cn(normalButtonClasses, isFirstPage && disabledClasses)}
        >
          <Icon icon={ChevronLeft} size="sm" />
        </button>

        {/* Seitennummern */}
        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-[var(--sizing-pagination-item-size)] h-[var(--sizing-pagination-item-size)] flex items-center justify-center text-[length:var(--sizing-pagination-font-size)] text-[var(--color-pagination-item-text)]"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              aria-label={`Seite ${page}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(page)}
              className={cn(
                isActive ? activeButtonClasses : normalButtonClasses,
                isActive && 'pointer-events-none'
              )}
            >
              {page}
            </button>
          );
        })}

        {/* Naechste Seite */}
        <button
          type="button"
          aria-label="Naechste Seite"
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className={cn(normalButtonClasses, isLastPage && disabledClasses)}
        >
          <Icon icon={ChevronRight} size="sm" />
        </button>
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';

// ─── Exports ────────────────────────────────────────────────────────────────

export { Pagination, getPageRange };
