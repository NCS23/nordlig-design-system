import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { inputVariants } from '../../atoms/Input';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Groesse der Eingabe */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Fehlerzustand */
  error?: boolean;
  /** Wird bei Enter mit dem aktuellen Wert aufgerufen */
  onSearch?: (value: string) => void;
  /** Wird beim Klick auf den Clear-Button aufgerufen */
  onClear?: () => void;
  /** Debounce-Verzoegerung fuer onSearch in ms */
  debounceMs?: number;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      inputSize = 'md',
      error = false,
      value,
      defaultValue,
      onChange,
      onSearch,
      onClear,
      debounceMs,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mountedRef = React.useRef(false);
    const [internalValue, setInternalValue] = React.useState<string>(
      (defaultValue as string) ?? ''
    );

    // Merge external ref + internal ref
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref]
    );

    // Kontrolliert oder unkontrolliert
    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value) : internalValue;

    // Debounce onSearch (skip initial mount)
    React.useEffect(() => {
      if (!mountedRef.current) {
        mountedRef.current = true;
        return;
      }
      if (!onSearch || !debounceMs || debounceMs <= 0) return;

      const timer = setTimeout(() => {
        onSearch(currentValue);
      }, debounceMs);

      return () => clearTimeout(timer);
    }, [currentValue, onSearch, debounceMs]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(currentValue);
      }

      if (e.key === 'Escape') {
        if (!isControlled) {
          setInternalValue('');
        }
        onClear?.();
      }

      props.onKeyDown?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
      inputRef.current?.focus();
    };

    return (
      <div role="search" className={cn('group relative w-full', className)}>
        <Search
          size={16}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors',
            'text-[var(--color-sinput-icon)]',
            'group-focus-within:text-[var(--color-sinput-icon-focus)]'
          )}
        />

        <input
          ref={mergedRef}
          type="search"
          aria-invalid={error || undefined}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            inputVariants({ inputSize, error }),
            'pl-9',
            currentValue.length > 0 && 'pr-9',
            '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden'
          )}
          {...props}
        />

        {currentValue.length > 0 && (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleClear}
            disabled={disabled}
            aria-label="Leeren"
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 transition-colors',
              'text-[var(--color-sinput-clear)] hover:text-[var(--color-sinput-clear-hover)]',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
