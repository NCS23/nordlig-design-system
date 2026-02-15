import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command as CommandPrimitive } from 'cmdk';
import { ChevronsUpDown, Check, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { inputVariants } from '../../atoms/Input';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}

export type ComboboxOptions = ComboboxOption[] | ComboboxGroup[];

export interface ComboboxProps {
  /** Available options */
  options: ComboboxOptions;
  /** Currently selected value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string | undefined) => void;
  /** Placeholder text for trigger */
  placeholder?: string;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Text shown when no results match filter */
  emptyMessage?: string;
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

// ─── Helpers ────────────────────────────────────────────────────────────────

function isGrouped(options: ComboboxOptions): options is ComboboxGroup[] {
  return options.length > 0 && 'options' in options[0];
}

function flattenOptions(options: ComboboxOptions): ComboboxOption[] {
  if (isGrouped(options)) {
    return options.flatMap((g) => g.options);
  }
  return options as ComboboxOption[];
}

// ─── Combobox Component ─────────────────────────────────────────────────────

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Auswählen…',
      searchPlaceholder = 'Suchen…',
      emptyMessage = 'Keine Ergebnisse',
      inputSize = 'md',
      error = false,
      disabled = false,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const flat = React.useMemo(() => flattenOptions(options), [options]);
    const selectedOption = flat.find((o) => o.value === value);

    const handleSelect = (selectedValue: string) => {
      // Toggle selection: deselect if clicking the already-selected item
      onChange?.(selectedValue === value ? undefined : selectedValue);
      setOpen(false);
      // Return focus to trigger after selection
      requestAnimationFrame(() => triggerRef.current?.focus());
    };

    const renderItems = () => {
      if (isGrouped(options)) {
        return (options as ComboboxGroup[]).map((group) => (
          <CommandPrimitive.Group
            key={group.label}
            heading={group.label}
            className={cn(
              'overflow-hidden p-1',
              '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
              '[&_[cmdk-group-heading]]:text-[var(--color-cmb-empty-text)]',
              '[&_[cmdk-group-heading]]:px-[var(--spacing-cmb-item-padding-x)] [&_[cmdk-group-heading]]:py-1.5'
            )}
          >
            {group.options.map((opt) => renderItem(opt))}
          </CommandPrimitive.Group>
        ));
      }

      return (flat as ComboboxOption[]).map((opt) => renderItem(opt));
    };

    const renderItem = (opt: ComboboxOption) => {
      const isSelected = opt.value === value;

      return (
        <CommandPrimitive.Item
          key={opt.value}
          value={opt.label}
          disabled={opt.disabled}
          onSelect={() => handleSelect(opt.value)}
          className={cn(
            'relative flex cursor-pointer select-none items-center rounded-[var(--radius-cmb-content)] text-sm outline-none transition-colors',
            'px-[var(--spacing-cmb-item-padding-x)] py-[var(--spacing-cmb-item-padding-y)]',
            'data-[selected=true]:bg-[var(--color-cmb-item-hover-bg)]',
            'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
            isSelected &&
              'bg-[var(--color-cmb-item-selected-bg)] text-[var(--color-cmb-item-selected-text)]'
          )}
        >
          <Check
            size={14}
            aria-hidden="true"
            className={cn(
              'mr-2 shrink-0',
              isSelected ? 'opacity-100' : 'opacity-0'
            )}
          />
          <span className="truncate">{opt.label}</span>
        </CommandPrimitive.Item>
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
                !selectedOption &&
                  'text-[var(--color-cmb-trigger-placeholder)]',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              <span className="truncate text-[var(--color-cmb-trigger-text)]">
                {selectedOption ? selectedOption.label : (
                  <span className="text-[var(--color-cmb-trigger-placeholder)]">
                    {placeholder}
                  </span>
                )}
              </span>
              <ChevronsUpDown
                size={16}
                aria-hidden="true"
                className="shrink-0 opacity-50"
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
                'bg-[var(--color-cmb-content-bg)]',
                'border border-[var(--color-cmb-content-border)]',
                'rounded-[var(--radius-cmb-content)]',
                '[box-shadow:var(--shadow-select-popover)]',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              <CommandPrimitive className="w-full">
                {/* Search Input */}
                <div className="flex items-center border-b border-[var(--color-cmb-content-border)] px-3">
                  <Search
                    size={14}
                    className="mr-2 shrink-0 opacity-50"
                    aria-hidden="true"
                  />
                  <CommandPrimitive.Input
                    placeholder={searchPlaceholder}
                    className={cn(
                      'flex h-10 w-full bg-[var(--color-cmb-search-bg)] text-sm',
                      'text-[var(--color-cmb-trigger-text)]',
                      'placeholder:text-[var(--color-cmb-trigger-placeholder)]',
                      'border-none outline-none'
                    )}
                  />
                </div>

                {/* Options List */}
                <CommandPrimitive.List
                  className={cn(
                    'max-h-[240px] overflow-y-auto',
                    'p-[var(--spacing-cmb-content-padding)]'
                  )}
                >
                  <CommandPrimitive.Empty
                    className={cn(
                      'py-6 text-center text-sm',
                      'text-[var(--color-cmb-empty-text)]'
                    )}
                  >
                    {emptyMessage}
                  </CommandPrimitive.Empty>

                  {renderItems()}
                </CommandPrimitive.List>
              </CommandPrimitive>
            </Popover.Content>
          </Popover.Portal>
        </div>
      </Popover.Root>
    );
  }
);

Combobox.displayName = 'Combobox';

export { Combobox };
