import React from 'react';
import { cn } from '../../utils/cn';
import { SearchInput, type SearchInputProps } from '../../molecules/SearchInput';

// Component token CSS
import '@nordlig/styles/tokens/searchfilter';

export interface SearchFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Placeholder fuer das Suchfeld */
  searchPlaceholder?: string;
  /** Kontrollierter Suchwert */
  searchValue?: string;
  /** Callback bei Suchwert-Aenderung */
  onSearchChange?: (value: string) => void;
  /** Debounce-Verzoegerung in ms */
  debounceMs?: number;
  /** Groesse des Suchfelds */
  searchSize?: SearchInputProps['inputSize'];
  /** Anzahl der Ergebnisse */
  resultCount?: number;
  /** Label fuer Ergebniszahl (Standard: "Ergebnisse") */
  resultLabel?: string;
  /** Filter-Slots (Select, DatePicker etc.) */
  children?: React.ReactNode;
}

const SearchFilter = React.forwardRef<HTMLDivElement, SearchFilterProps>(
  (
    {
      searchPlaceholder = 'Suchen...',
      searchValue,
      onSearchChange,
      debounceMs,
      searchSize = 'md',
      resultCount,
      resultLabel = 'Ergebnisse',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const handleSearch = React.useCallback(
      (value: string) => {
        onSearchChange?.(value);
      },
      [onSearchChange]
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--spacing-searchfilter-gap)]',
          'py-[var(--spacing-searchfilter-py)]',
          'sm:flex-row sm:items-center',
          className
        )}
        {...props}
      >
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onSearch={handleSearch}
          onClear={() => onSearchChange?.('')}
          onChange={(e) => onSearchChange?.(e.target.value)}
          debounceMs={debounceMs}
          inputSize={searchSize}
          className="sm:max-w-[var(--sizing-searchfilter-search-max-width)]"
        />

        {children && (
          <div className="flex flex-wrap items-center gap-[var(--spacing-searchfilter-gap)]">
            {children}
          </div>
        )}

        {resultCount !== undefined && (
          <span
            className={cn(
              'text-[length:var(--font-searchfilter-count-size)]',
              'text-[var(--color-searchfilter-count)]',
              'whitespace-nowrap sm:ml-auto'
            )}
            aria-live="polite"
          >
            {resultCount} {resultLabel}
          </span>
        )}
      </div>
    );
  }
);

SearchFilter.displayName = 'SearchFilter';

export { SearchFilter };
