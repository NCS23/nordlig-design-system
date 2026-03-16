import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ChevronDown, Check, Search, X } from 'lucide-react';
import { Badge } from '../../atoms/Badge';
import { cn } from '../../utils/cn';
import { inputVariants } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';
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

export interface MultiSelectProps {
  /** Available options */
  options: SelectOptions;
  /** Currently selected values */
  value?: string[];
  /** Callback when values change */
  onChange?: (values: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Input size variant */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show "Select all" / "Deselect all" controls */
  showSelectAll?: boolean;
  /** Text for "Select all" action */
  selectAllLabel?: string;
  /** Text for "Deselect all" action */
  deselectAllLabel?: string;
  /** Text shown when no results match filter */
  emptyText?: string;
  /** Maximum number of badges to show before collapsing */
  maxBadges?: number;
  /** Maximum number of items that can be selected (undefined = unlimited) */
  maxItems?: number;
  /** Badge variant for selected items.
   * @default 'info' */
  badgeVariant?: 'info' | 'primary' | 'primary-bold' | 'success' | 'warning' | 'error' | 'neutral';
  /** Additional class name */
  className?: string;
  /** aria-label */
  'aria-label'?: string;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = 'Auswählen…',
      searchPlaceholder = 'Suchen…',
      inputSize = 'md',
      error = false,
      disabled = false,
      showSelectAll = true,
      selectAllLabel = 'Alle auswählen',
      deselectAllLabel = 'Alle abwählen',
      emptyText = 'Keine Ergebnisse',
      maxBadges = 3,
      badgeVariant = 'info',
      maxItems,
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
    const listboxId = React.useId();

    const flat = React.useMemo(() => flattenOptions(options), [options]);
    const enabledOptions = React.useMemo(
      () => flat.filter((o) => !o.disabled),
      [flat]
    );

    const filtered = React.useMemo(() => {
      if (!search.trim()) return flat;
      const lower = search.toLowerCase();
      return flat.filter((o) => o.label.toLowerCase().includes(lower));
    }, [flat, search]);

    const selectedSet = React.useMemo(() => new Set(value), [value]);
    const allSelected = enabledOptions.length > 0 && enabledOptions.every((o) => selectedSet.has(o.value));
    const someSelected = enabledOptions.some((o) => selectedSet.has(o.value));
    const limitReached = maxItems !== undefined && value.length >= maxItems;

    // Reset search and focus when opening
    React.useEffect(() => {
      if (open) {
        setSearch('');
        setFocusedIndex(-1);
        requestAnimationFrame(() => searchRef.current?.focus());
      }
    }, [open]);

    // Reset focused index when filter changes
    React.useEffect(() => {
      setFocusedIndex(filtered.length > 0 ? 0 : -1);
    }, [search, filtered.length]);

    // Scroll focused item into view
    React.useEffect(() => {
      if (open && focusedIndex >= 0 && listRef.current) {
        const item = listRef.current.querySelector(
          `[data-index="${focusedIndex}"]`
        );
        item?.scrollIntoView({ block: 'nearest' });
      }
    }, [focusedIndex, open]);

    const toggleValue = (optValue: string) => {
      if (selectedSet.has(optValue)) {
        onChange?.(value.filter((v) => v !== optValue));
      } else {
        if (limitReached) return;
        onChange?.([...value, optValue]);
      }
    };

    const handleSelectAll = () => {
      const allEnabledValues = enabledOptions.map((o) => o.value);
      onChange?.(maxItems !== undefined ? allEnabledValues.slice(0, maxItems) : allEnabledValues);
    };

    const handleDeselectAll = () => {
      onChange?.([]);
    };

    const removeBadge = (optValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled) {
        onChange?.(value.filter((v) => v !== optValue));
      }
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
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (focusedIndex >= 0 && !filtered[focusedIndex].disabled) {
            toggleValue(filtered[focusedIndex].value);
          }
          break;
        }
        case 'Backspace': {
          if (search === '' && value.length > 0) {
            onChange?.(value.slice(0, -1));
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
          break;
        }
      }
    };

    const renderTriggerContent = () => {
      if (value.length === 0) {
        return (
          <span className="text-[var(--color-select-trigger-placeholder)] truncate">
            {placeholder}
          </span>
        );
      }

      const selectedOptions = value
        .map((v) => flat.find((o) => o.value === v))
        .filter(Boolean) as SelectOption[];

      const visible = selectedOptions.slice(0, maxBadges);
      const remaining = selectedOptions.length - maxBadges;

      return (
        <div className="flex flex-wrap gap-[var(--spacing-multiselect-tag-gap)] items-center min-w-0">
          {visible.map((opt) => (
            <Badge
              key={opt.value}
              variant={badgeVariant}
              size="xs"
              className="max-w-[120px] gap-[var(--spacing-multiselect-tag-gap)]"
            >
              <span className="truncate">{opt.label}</span>
              {!disabled && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => removeBadge(opt.value, e)}
                  aria-label={`${opt.label} entfernen`}
                  className="shrink-0 hover:opacity-70 transition-opacity"
                >
                  <Icon icon={X} size={10} />
                </button>
              )}
            </Badge>
          ))}
          {remaining > 0 && (
            <Badge variant="neutral" size="xs">
              +{remaining}
            </Badge>
          )}
        </div>
      );
    };

    const renderFilteredItems = () => {
      if (filtered.length === 0) {
        return (
          <div className="px-[var(--spacing-select-item-padding-x)] py-[var(--spacing-select-item-padding-y)] text-[length:var(--font-multiselect-item-size)] text-[var(--color-select-empty-text)]">
            {emptyText}
          </div>
        );
      }

      if (isGrouped(options)) {
        const lower = search.toLowerCase();
        let idx = 0;
        const groups = (options as SelectGroup[])
          .map((group) => {
            const groupFiltered = !search.trim()
              ? group.options
              : group.options.filter((o) =>
                  o.label.toLowerCase().includes(lower)
                );
            return { ...group, options: groupFiltered };
          })
          .filter((g) => g.options.length > 0);

        return groups.map((group, gi) => (
          <div key={gi} role="group" aria-labelledby={`msel-group-${gi}`}>
            {gi > 0 && (
              <div className="mx-2 my-1 h-px bg-[var(--color-select-separator)]" />
            )}
            <div
              id={`msel-group-${gi}`}
              className="px-[var(--spacing-select-item-padding-x)] py-1 text-[length:var(--font-multiselect-group-label-size)] [font-weight:var(--font-multiselect-group-label-weight)] text-[var(--color-select-group-label)] uppercase tracking-wider"
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
      const isChecked = selectedSet.has(opt.value);
      const isFocused = idx === focusedIndex;
      const isEffectivelyDisabled = opt.disabled || (limitReached && !isChecked);

      return (
        <div
          key={opt.value}
          role="option"
          data-index={idx}
          aria-selected={isChecked}
          aria-disabled={isEffectivelyDisabled || undefined}
          tabIndex={-1}
          onClick={() => !isEffectivelyDisabled && toggleValue(opt.value)}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => !isEffectivelyDisabled && setFocusedIndex(idx)}
          className={cn(
            'flex items-center gap-[var(--spacing-select-item-gap)] px-[var(--spacing-select-item-padding-x)] py-[var(--spacing-select-item-padding-y)] cursor-pointer rounded-[var(--radius-select-item)] text-[length:var(--font-multiselect-item-size)] transition-colors',
            'text-[var(--color-select-item-text)]',
            isEffectivelyDisabled &&
              'text-[var(--color-select-item-disabled-text)] cursor-not-allowed opacity-50',
            !isEffectivelyDisabled && isFocused && 'bg-[var(--color-select-item-hover-bg)]',
            !isEffectivelyDisabled &&
              isChecked &&
              !isFocused &&
              'bg-[var(--color-select-item-selected-bg)]'
          )}
        >
          <Checkbox.Root
            checked={isChecked}
            disabled={isEffectivelyDisabled}
            tabIndex={-1}
            className={cn(
              'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
              isChecked
                ? 'bg-[var(--color-select-check-icon)] border-[var(--color-select-check-icon)] text-[var(--color-select-checkbox-text)]'
                : 'border-[var(--color-select-trigger-border)] bg-[var(--color-select-checkbox-bg)]'
            )}
            aria-hidden
          >
            <Checkbox.Indicator>
              <Icon icon={Check} size={12} strokeWidth={3} />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="flex-1">{opt.label}</span>
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
              aria-controls={listboxId}
              aria-haspopup="listbox"
              aria-label={ariaLabel || 'Mehrfachauswahl'}
              onClick={() => !disabled && setOpen((prev) => !prev)}
              className={cn(
                inputVariants({ inputSize, error }),
                'flex items-center justify-between gap-[var(--spacing-multiselect-trigger-gap)] text-left min-h-[var(--sizing-input-md-height)]',
                inputSize === 'sm' && 'min-h-[var(--sizing-input-sm-height)]',
                inputSize === 'lg' && 'min-h-[var(--sizing-input-lg-height)]',
                'h-auto py-[var(--spacing-multiselect-trigger-py)]',
                'disabled:cursor-not-allowed disabled:bg-[var(--color-select-trigger-disabled-bg)]'
              )}
            >
              {renderTriggerContent()}
              <Icon
                icon={ChevronDown}
                size="sm"
                className={cn(
                  'transition-transform text-[var(--color-select-icon)]',
                  open && 'rotate-180'
                )}
              />
            </button>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              sideOffset={4}
              align="start"
              style={{
                minWidth: 'var(--radix-popover-trigger-width)',
                width: 'max-content',
                maxWidth: 'var(--radix-popover-available-width)',
              }}
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
              <div className="p-[var(--spacing-multiselect-section-px)] border-b border-[var(--color-select-separator)]">
                <div className="relative">
                  <Icon
                    icon={Search}
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
                      'w-full pl-8 pr-[var(--spacing-multiselect-item-px)] py-[var(--spacing-multiselect-search-py)] text-[length:var(--font-multiselect-item-size)] rounded-[var(--radius-select-item)]',
                      'bg-[var(--color-select-search-bg)]',
                      'text-[var(--color-select-trigger-text)]',
                      'placeholder:text-[var(--color-select-trigger-placeholder)]',
                      'border-none outline-none',
                      'focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
                    )}
                  />
                </div>
              </div>

              {/* Select All / Deselect All */}
              {showSelectAll && filtered.length > 0 && (
                <div className="flex items-center gap-[var(--spacing-multiselect-item-gap)] px-[var(--spacing-multiselect-selectall-px)] py-[var(--spacing-multiselect-selectall-py)] border-b border-[var(--color-select-separator)]">
                  <button
                    type="button"
                    onClick={allSelected ? handleDeselectAll : handleSelectAll}
                    className="text-[length:var(--font-multiselect-selectall-size)] [font-weight:var(--font-multiselect-selectall-weight)] text-[var(--color-select-item-selected-text)] hover:underline"
                  >
                    {allSelected ? deselectAllLabel : selectAllLabel}
                  </button>
                  {someSelected && (
                    <span className="text-[length:var(--font-multiselect-selectall-size)] text-[var(--color-select-group-label)]">
                      ({value.length}/{enabledOptions.length})
                    </span>
                  )}
                </div>
              )}

              {/* Options List */}
              <div
                ref={listRef}
                id={listboxId}
                role="listbox"
                aria-multiselectable
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

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
