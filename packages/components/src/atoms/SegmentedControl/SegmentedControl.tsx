import React from 'react';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The items to render as segments */
  items: Array<{ value: string; label: React.ReactNode; disabled?: boolean }>;
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when the selected value changes */
  onChange?: (value: string) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disable the entire control */
  disabled?: boolean;
}

// ─── Size class maps ────────────────────────────────────────────────────────

const sizeClasses = {
  sm: 'h-[var(--sizing-seg-sm-height)] text-[length:var(--font-seg-size-sm)] px-[var(--spacing-seg-item-px)]',
  md: 'h-[var(--sizing-seg-md-height)] text-[length:var(--font-seg-size-md)] px-[var(--spacing-seg-item-px)]',
  lg: 'h-[var(--sizing-seg-lg-height)] text-[length:var(--font-seg-size-lg)] px-[var(--spacing-seg-item-px)]',
};

// ─── SegmentedControl ───────────────────────────────────────────────────────

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      items,
      value,
      defaultValue,
      onChange,
      size = 'md',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? items[0]?.value ?? ''
    );
    const currentValue = value ?? internalValue;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({});

    const activeIndex = items.findIndex((item) => item.value === currentValue);

    React.useLayoutEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const buttons = container.querySelectorAll<HTMLElement>('[role="radio"]');
      const activeButton = buttons[activeIndex];
      if (!activeButton) return;

      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }, [activeIndex, items.length]);

    const handleSelect = (itemValue: string) => {
      if (disabled) return;
      if (value === undefined) setInternalValue(itemValue);
      onChange?.(itemValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      let nextIndex: number | undefined;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = index + 1;
        while (nextIndex < items.length && items[nextIndex].disabled) nextIndex++;
        if (nextIndex >= items.length) nextIndex = undefined;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = index - 1;
        while (nextIndex >= 0 && items[nextIndex].disabled) nextIndex--;
        if (nextIndex < 0) nextIndex = undefined;
      }

      if (nextIndex !== undefined) {
        handleSelect(items[nextIndex].value);
        const buttons = containerRef.current?.querySelectorAll<HTMLElement>(
          '[role="radio"]'
        );
        buttons?.[nextIndex]?.focus();
      }
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          'relative inline-flex items-center',
          'bg-[var(--color-seg-bg)]',
          'rounded-[var(--radius-seg-container)]',
          'p-[var(--spacing-seg-padding)]',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        <div
          ref={containerRef}
          className="relative flex items-center gap-[var(--spacing-seg-gap)]"
        >
          {/* Sliding indicator */}
          {activeIndex >= 0 && (
            <span
              className={cn(
                'absolute z-0',
                'bg-[var(--color-seg-active-bg)]',
                'rounded-[var(--radius-seg-item)]',
                '[box-shadow:var(--shadow-seg-active)]',
                'transition-all duration-200 ease-out'
              )}
              style={{
                ...indicatorStyle,
                top: 0,
                bottom: 0,
              }}
              aria-hidden="true"
            />
          )}

          {/* Segment buttons */}
          {items.map((item, index) => {
            const isActive = item.value === currentValue;

            return (
              <button
                key={item.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                tabIndex={isActive ? 0 : -1}
                disabled={item.disabled}
                onClick={() => handleSelect(item.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  'relative z-10 inline-flex items-center justify-center whitespace-nowrap',
                  'rounded-[var(--radius-seg-item)]',
                  '[font-weight:var(--font-seg-weight)]',
                  'transition-colors duration-150',
                  sizeClasses[size],
                  isActive
                    ? 'text-[var(--color-seg-active-text)]'
                    : 'text-[var(--color-seg-text)] hover:bg-[var(--color-seg-hover-bg)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
                  'disabled:pointer-events-none disabled:opacity-50'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';

// ─── Exports ────────────────────────────────────────────────────────────────

export { SegmentedControl };
