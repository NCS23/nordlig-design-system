import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { inputVariants } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';

// Component token CSS
import '@nordlig/styles/tokens/popover';
import '@nordlig/styles/tokens/select';
import '@nordlig/styles/tokens/text';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export type SelectOptions = SelectOption[] | SelectGroup[];

function isGrouped(options: SelectOptions): options is SelectGroup[] {
  return options.length > 0 && 'options' in options[0];
}

function flattenOptions(options: SelectOptions): SelectOption[] {
  if (isGrouped(options)) {
    return options.flatMap((g) => g.options);
  }
  return options as SelectOption[];
}

export interface SelectProps {
  /** Available options */
  options: SelectOptions;
  /** Currently selected value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string | undefined) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Input size variant */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** aria-label */
  'aria-label'?: string;
}

// ─── Select Component ────────────────────────────────────────────────────────

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Auswählen…',
      inputSize = 'md',
      error = false,
      disabled = false,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    const listRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const listboxId = React.useId();

    const flat = React.useMemo(() => flattenOptions(options), [options]);

    const selectedOption = flat.find((o) => o.value === value);

    // Reset focused index when opening
    React.useEffect(() => {
      if (open) {
        const idx = value
          ? flat.findIndex((o) => o.value === value)
          : -1;
        setFocusedIndex(idx);
      }
    }, [open, flat, value]);

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
      if (disabled) return;

      if (!open) {
        if (
          e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'Enter' ||
          e.key === ' '
        ) {
          e.preventDefault();
          setOpen(true);
          return;
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const nextIdx = findNextEnabled(focusedIndex, 1);
          if (nextIdx !== -1) setFocusedIndex(nextIdx);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prevIdx = findNextEnabled(focusedIndex, -1);
          if (prevIdx !== -1) setFocusedIndex(prevIdx);
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (focusedIndex >= 0 && !flat[focusedIndex].disabled) {
            handleSelect(flat[focusedIndex]);
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
          const firstEnabled = flat.findIndex((o) => !o.disabled);
          if (firstEnabled !== -1) setFocusedIndex(firstEnabled);
          break;
        }
        case 'End': {
          e.preventDefault();
          const lastEnabled = findLastEnabled();
          if (lastEnabled !== -1) setFocusedIndex(lastEnabled);
          break;
        }
      }
    };

    function findNextEnabled(from: number, direction: 1 | -1): number {
      let idx = from + direction;
      while (idx >= 0 && idx < flat.length) {
        if (!flat[idx].disabled) return idx;
        idx += direction;
      }
      return -1;
    }

    function findLastEnabled(): number {
      for (let i = flat.length - 1; i >= 0; i--) {
        if (!flat[i].disabled) return i;
      }
      return -1;
    }

    const renderItems = () => {
      if (isGrouped(options)) {
        let globalIndex = 0;
        return (options as SelectGroup[]).map((group, gi) => (
          <div key={gi} role="group" aria-labelledby={`group-${gi}`}>
            {gi > 0 && (
              <div className="mx-2 my-1 h-px bg-[var(--color-select-separator)]" />
            )}
            <div
              id={`group-${gi}`}
              className="px-[var(--spacing-select-item-padding-x)] py-1 text-[length:var(--font-select-group-size)] [font-weight:var(--font-select-group-weight)] text-[var(--color-select-group-label)] uppercase tracking-wider"
            >
              {group.label}
            </div>
            {group.options.map((opt) => {
              const idx = globalIndex++;
              return renderItem(opt, idx);
            })}
          </div>
        ));
      }

      return (flat as SelectOption[]).map((opt, idx) => renderItem(opt, idx));
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
          onKeyDown={handleKeyDown}
          onMouseEnter={() => !opt.disabled && setFocusedIndex(idx)}
          className={cn(
            'flex items-center gap-[var(--spacing-select-item-gap)] px-[var(--spacing-select-item-padding-x)] py-[var(--spacing-select-item-padding-y)] cursor-pointer rounded-[var(--radius-select-item)] text-[length:var(--font-select-item-size)] transition-colors',
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
            <Icon
              icon={Check}
              size={14}
              className="text-[var(--color-select-check-icon)]"
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
              aria-controls={listboxId}
              aria-haspopup="listbox"
              aria-label={ariaLabel || 'Auswählen'}
              onKeyDown={handleKeyDown}
              onClick={() => !disabled && setOpen((prev) => !prev)}
              className={cn(
                inputVariants({ inputSize, error }),
                'flex items-center justify-between gap-[var(--spacing-select-trigger-gap)] text-left',
                !selectedOption && 'text-[var(--color-select-trigger-placeholder)]',
                'disabled:cursor-not-allowed disabled:bg-[var(--color-select-trigger-disabled-bg)] disabled:opacity-50'
              )}
            >
              <span className="truncate">
                {selectedOption ? selectedOption.label : placeholder}
              </span>
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
                'bg-[var(--color-select-popover-bg)] text-[var(--color-text-base)]',
                'border border-[var(--color-select-popover-border)]',
                'rounded-[var(--radius-select-popover)]',
                'shadow-[var(--shadow-select-popover)]',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              <div
                ref={listRef}
                id={listboxId}
                role="listbox"
                tabIndex={-1}
                aria-label={ariaLabel || 'Optionen'}
                onKeyDown={handleKeyDown}
                className="max-h-[240px] overflow-y-auto p-[var(--spacing-select-popover-padding)]"
              >
                {flat.length === 0 ? (
                  <div className="px-[var(--spacing-select-item-padding-x)] py-[var(--spacing-select-item-padding-y)] text-[length:var(--font-select-item-size)] text-[var(--color-select-empty-text)]">
                    Keine Optionen
                  </div>
                ) : (
                  renderItems()
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </div>
      </Popover.Root>
    );
  }
);

Select.displayName = 'Select';

export { Select };
