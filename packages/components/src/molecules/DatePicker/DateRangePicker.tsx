import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { format, parse, isValid, startOfMonth, isBefore, isAfter } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input, type InputProps } from '../../atoms/Input';
import { cn } from '../../utils/cn';
import { Calendar, type DateRange } from './Calendar';

const DATE_FORMAT = 'dd.MM.yyyy';

function getInitialMonth(value?: DateRange, minDate?: Date, maxDate?: Date): Date {
  if (value?.from) return startOfMonth(value.from);
  const now = new Date();
  if (maxDate && isAfter(startOfMonth(now), startOfMonth(maxDate))) {
    return startOfMonth(maxDate);
  }
  if (minDate && isBefore(startOfMonth(now), startOfMonth(minDate))) {
    return startOfMonth(minDate);
  }
  return startOfMonth(now);
}

export interface DateRangePickerProps {
  /** Currently selected range */
  value?: DateRange;
  /** Callback when range changes */
  onChange?: (range: DateRange) => void;
  /** Placeholder for "from" input */
  placeholderFrom?: string;
  /** Placeholder for "to" input */
  placeholderTo?: string;
  /** Input size variant */
  inputSize?: InputProps['inputSize'];
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Additional class name */
  className?: string;
  /** aria-label for the from input */
  'aria-label'?: string;
}

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value,
      onChange,
      placeholderFrom = 'Von',
      placeholderTo = 'Bis',
      inputSize,
      error = false,
      disabled = false,
      minDate,
      maxDate,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [fromInput, setFromInput] = React.useState(
      value?.from ? format(value.from, DATE_FORMAT) : ''
    );
    const [toInput, setToInput] = React.useState(
      value?.to ? format(value.to, DATE_FORMAT) : ''
    );
    const [month, setMonth] = React.useState(
      getInitialMonth(value, minDate, maxDate)
    );

    // Sync external value changes
    React.useEffect(() => {
      setFromInput(value?.from ? format(value.from, DATE_FORMAT) : '');
      setToInput(value?.to ? format(value.to, DATE_FORMAT) : '');
      if (value?.from) setMonth(startOfMonth(value.from));
    }, [value?.from?.getTime(), value?.to?.getTime()]);

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setFromInput(raw);
      if (raw === '') {
        onChange?.({ from: undefined, to: value?.to });
        return;
      }
      const parsed = parse(raw, DATE_FORMAT, new Date());
      if (isValid(parsed) && raw.length === 10) {
        onChange?.({ from: parsed, to: value?.to });
        setMonth(startOfMonth(parsed));
      }
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setToInput(raw);
      if (raw === '') {
        onChange?.({ from: value?.from, to: undefined });
        return;
      }
      const parsed = parse(raw, DATE_FORMAT, new Date());
      if (isValid(parsed) && raw.length === 10) {
        onChange?.({ from: value?.from, to: parsed });
      }
    };

    const handleRangeSelect = (range: DateRange) => {
      onChange?.(range);
      if (range.from) {
        setFromInput(format(range.from, DATE_FORMAT));
        setMonth(startOfMonth(range.from));
      }
      if (range.to) {
        setToInput(format(range.to, DATE_FORMAT));
        setOpen(false);
      }
    };

    const handleFocus = () => {
      if (!disabled) setOpen(true);
    };

    const handleIconClick = () => {
      if (!disabled) setOpen((prev) => !prev);
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <div ref={ref} className={cn('relative w-full', className)}>
          <Popover.Anchor asChild>
            <div className="flex w-full items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  inputSize={inputSize}
                  error={error}
                  disabled={disabled}
                  placeholder={placeholderFrom}
                  value={fromInput}
                  onChange={handleFromChange}
                  onFocus={handleFocus}
                  aria-label={ariaLabel || 'Startdatum'}
                  aria-haspopup="dialog"
                  aria-expanded={open}
                />
              </div>
              <span className="text-sm text-[var(--color-datepicker-weekday-text)] shrink-0">–</span>
              <div className="relative flex-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  inputSize={inputSize}
                  error={error}
                  disabled={disabled}
                  placeholder={placeholderTo}
                  value={toInput}
                  onChange={handleToChange}
                  onFocus={handleFocus}
                  aria-label="Enddatum"
                  className="pr-[var(--spacing-input-icon-inset)]"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={disabled}
                  onClick={handleIconClick}
                  aria-label="Kalender öffnen"
                  className="absolute right-0 top-0 flex h-full items-center px-[var(--spacing-input-icon-padding)] text-[var(--color-datepicker-weekday-text)] hover:text-[var(--color-datepicker-header-text)] transition-colors disabled:pointer-events-none disabled:opacity-50"
                >
                  <CalendarIcon size={16} />
                </button>
              </div>
            </div>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              sideOffset={4}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cn(
                'z-50',
                'bg-[var(--color-datepicker-popover-bg)]',
                'border border-[var(--color-datepicker-popover-border)]',
                'rounded-[var(--radius-datepicker-popover)]',
                'shadow-[var(--shadow-datepicker-popover)]',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              <Calendar
                mode="range"
                selectedRange={value}
                month={month}
                onRangeSelect={handleRangeSelect}
                onMonthChange={setMonth}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Popover.Content>
          </Popover.Portal>
        </div>
      </Popover.Root>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';

export { DateRangePicker };
