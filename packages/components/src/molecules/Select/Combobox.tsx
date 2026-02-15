import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDown, Check, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { inputVariants } from '../../atoms/Input';
import type { SelectOption, SelectGroup, SelectOptions } from './Select';

function isGrouped(options: SelectOptions): options is SelectGroup[] {
  return options.length > 0 && 'options' in options[0];
}

function flattenOptions(options: SelectOptions): SelectOption[] {
  if (isGrouped(options)) {
    return options.flatMap((g) => g.options);
  }
  return options as SelectOption[];
}

export interface ComboboxProps {
  /** Available options */
  options: SelectOptions;
  /** Currently selected value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string | undefined) => void;
  /** Placeholder text for trigger */
  placeholder?: string;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Input size variant */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Text shown when no results match filter */
  emptyText?: string;
  /** Additional class name */
  className?: string;
  /** aria-label */
  'aria-label'?: string;
}

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Auswählen…',
      searchPlaceholder = 'Suchen…',
      inputSize = 'md',
      error = false,
      disabled = false,
      emptyText = 'Keine Ergebnisse',
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    const listRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const flat = React.useMemo(() => flattenOptions(options), [options]);

    const filtered = React.useMemo(() => {
      if (!search.trim()) return flat;
      const lower = search.toLowerCase();
      return flat.filter((o) => o.label.toLowerCase().includes(lower));
    }, [flat, search]);

    const selectedOption = flat.find((o) => o.value === value);

    // Reset search and focus when opening/closing
    React.useEffect(() => {
      if (open) {
        setSearch('');
        setFocusedIndex(-1);
        // Focus search input after popover opens
        requestAnimationFrame(() => searchRef.current?.focus());
      }
    }, [open]);

    // Reset focused index when filter changes
    React.useEffect(() => {
      setFocusedIndex(filtered.length > 0 ? 0 : -1);
    }, [search]);

    // Scroll focused item into view
    React.useEffect(() => {
      if (open && focusedIndex >= 0 && listRef.current) {
        const item = listRef.current.querySelector(
          `[data-index="${focusedIndex}"]`
        );
        item?.scrollIntoView({ block: 'nearest' });
      }
    }, [focusedIndex, open]);

    const handleSelect = (opt: SelectOption) => {
      onChange?.(opt.value);
      setOpen(false);
      triggerRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            let next = prev + 1;
            while (next < filtered.length && filtered[next].disabled) next++;
            return next < filtered.length ? next : prev;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && filtered[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (focusedIndex >= 0 && !filtered[focusedIndex].disabled) {
            handleSelect(filtered[focusedIndex]);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
          break;
        }
        case 'Home': {
          e.preventDefault();
          const firstEnabled = filtered.findIndex((o) => !o.disabled);
          if (firstEnabled !== -1) setFocusedIndex(firstEnabled);
          break;
        }
        case 'End': {
          e.preventDefault();
          for (let i = filtered.length - 1; i >= 0; i--) {
            if (!filtered[i].disabled) {
              setFocusedIndex(i);
              break;
            }
          }
          break;
        }
      }
    };

    const renderFilteredItems = () => {
      if (filtered.length === 0) {
        return (
          <div className="px-[var(--spacing-select-item-padding-x)] py-[var(--spacing-select-item-padding-y)] text-sm text-[var(--color-select-empty-text)]">
            {emptyText}
          </div>
        );
      }

      // For grouped options, filter within groups
      if (isGrouped(options)) {
        const lower = search.toLowerCase();
        let globalIndex = 0;
        const groups = (options as SelectGroup[])
          .map((group) => {
            const groupFiltered = !search.trim()
              ? group.options
              : group.options.filter((o) =>
                  o.label.toLowerCase().includes(lower)
                );
            return { ...group, options: groupFiltered, startIndex: globalIndex };
          })
          .filter((g) => {
            globalIndex += g.options.length;
            return g.options.length > 0;
          });

        let idx = 0;
        return groups.map((group, gi) => (
          <div key={gi} role="group" aria-labelledby={`cbox-group-${gi}`}>
            {gi > 0 && (
              <div className="mx-2 my-1 h-px bg-[var(--color-select-separator)]" />
            )}
            <div
              id={`cbox-group-${gi}`}
              className="px-[var(--spacing-select-item-padding-x)] py-1 text-xs font-medium text-[var(--color-select-group-label)] uppercase tracking-wider"
            >
              {group.label}
            </div>
            {group.options.map((opt) => renderItem(opt, idx++))}
          </div>
        ));
      }

      return filtered.map((opt, idx) => renderItem(opt, idx));
    };

    const renderItem = (opt: SelectOption, idx: number) => {
      const isSelected = opt.value === value;
      const isFocused = idx === focusedIndex;

      return (
        <div
          key={opt.value}
          role="option"
          data-index={idx}
          aria-selected={isSelected}
          aria-disabled={opt.disabled || undefined}
          tabIndex={-1}
          onClick={() => !opt.disabled && handleSelect(opt)}
          onMouseEnter={() => !opt.disabled && setFocusedIndex(idx)}
          className={cn(
            'flex items-center gap-[var(--spacing-select-item-gap)] px-[var(--spacing-select-item-padding-x)] py-[var(--spacing-select-item-padding-y)] cursor-pointer rounded-[var(--radius-select-item)] text-sm transition-colors',
            'text-[var(--color-select-item-text)]',
            opt.disabled &&
              'text-[var(--color-select-item-disabled-text)] cursor-not-allowed',
            !opt.disabled && isFocused && 'bg-[var(--color-select-item-hover-bg)]',
            !opt.disabled &&
              isSelected &&
              !isFocused &&
              'bg-[var(--color-select-item-selected-bg)] text-[var(--color-select-item-selected-text)]',
            !opt.disabled &&
              isSelected &&
              isFocused &&
              'bg-[var(--color-select-item-hover-bg)] text-[var(--color-select-item-selected-text)]'
          )}
        >
          <span className="flex-1">{opt.label}</span>
          {isSelected && (
            <Check
              size={14}
              className="shrink-0 text-[var(--color-select-check-icon)]"
            />
          )}
        </div>
      );
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <div ref={ref} className={cn('relative w-full', className)}>
          <Popover.Anchor asChild>
            <button
              ref={triggerRef}
              type="button"
              disabled={disabled}
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-label={ariaLabel || 'Suchen und auswählen'}
              onClick={() => !disabled && setOpen((prev) => !prev)}
              className={cn(
                inputVariants({ inputSize, error }),
                'flex items-center justify-between gap-2 text-left',
                !selectedOption && 'text-[var(--color-select-trigger-placeholder)]',
                'disabled:cursor-not-allowed disabled:bg-[var(--color-select-trigger-disabled-bg)]'
              )}
            >
              <span className="truncate">
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  'shrink-0 transition-transform text-[var(--color-select-icon)]',
                  open && 'rotate-180'
                )}
              />
            </button>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              sideOffset={4}
              align="start"
              style={{ width: 'var(--radix-popover-trigger-width)' }}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cn(
                'z-50 overflow-hidden',
                'bg-[var(--color-select-popover-bg)]',
                'border border-[var(--color-select-popover-border)]',
                'rounded-[var(--radius-select-popover)]',
                'shadow-[var(--shadow-select-popover)]',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              {/* Search Input */}
              <div className="p-2 border-b border-[var(--color-select-separator)]">
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-select-icon)]"
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={searchPlaceholder}
                    aria-label="Optionen durchsuchen"
                    className={cn(
                      'w-full pl-8 pr-3 py-1.5 text-sm rounded-[var(--radius-select-item)]',
                      'bg-[var(--color-select-search-bg)]',
                      'text-[var(--color-select-trigger-text)]',
                      'placeholder:text-[var(--color-select-trigger-placeholder)]',
                      'border-none outline-none',
                      'focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
                    )}
                  />
                </div>
              </div>
              {/* Options List */}
              <div
                ref={listRef}
                role="listbox"
                aria-label={ariaLabel || 'Optionen'}
                className="max-h-[200px] overflow-y-auto p-[var(--spacing-select-popover-padding)]"
              >
                {renderFilteredItems()}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </div>
      </Popover.Root>
    );
  }
);

Combobox.displayName = 'Combobox';

export { Combobox };
