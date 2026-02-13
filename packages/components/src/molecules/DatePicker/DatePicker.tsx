import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { format, parse, isValid, startOfMonth, isBefore, isAfter } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input, type InputProps } from '../../atoms/Input';
import { cn } from '../../utils/cn';
import { Calendar } from './Calendar';

const DATE_FORMAT = 'dd.MM.yyyy';

function getInitialMonth(value?: Date, minDate?: Date, maxDate?: Date): Date {
  if (value) return startOfMonth(value);
  const now = new Date();
  // If current month is after maxDate, jump to maxDate's month
  if (maxDate && isAfter(startOfMonth(now), startOfMonth(maxDate))) {
    return startOfMonth(maxDate);
  }
  // If current month is before minDate, jump to minDate's month
  if (minDate && isBefore(startOfMonth(now), startOfMonth(minDate))) {
    return startOfMonth(minDate);
  }
  return startOfMonth(now);
}

export interface DatePickerProps {
  /** Currently selected date */
  value?: Date;
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void;
  /** Placeholder text */
  placeholder?: string;
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
  /** Additional class name for the root wrapper */
  className?: string;
  /** Name attribute for the hidden input */
  name?: string;
  /** ID for the input */
  id?: string;
  /** aria-label for the input */
  'aria-label'?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'TT.MM.JJJJ',
      inputSize,
      error = false,
      disabled = false,
      minDate,
      maxDate,
      className,
      name,
      id,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(
      value ? format(value, DATE_FORMAT) : ''
    );
    const [month, setMonth] = React.useState(
      getInitialMonth(value, minDate, maxDate)
    );

    // Sync external value changes
    React.useEffect(() => {
      setInputValue(value ? format(value, DATE_FORMAT) : '');
      if (value) setMonth(startOfMonth(value));
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputValue(raw);

      if (raw === '') {
        onChange?.(undefined);
        return;
      }

      const parsed = parse(raw, DATE_FORMAT, new Date());
      if (isValid(parsed) && raw.length === 10) {
        onChange?.(parsed);
        setMonth(startOfMonth(parsed));
      }
    };

    const handleCalendarSelect = (date: Date) => {
      onChange?.(date);
      setInputValue(format(date, DATE_FORMAT));
      setMonth(startOfMonth(date));
      setOpen(false);
    };

    const handleIconClick = () => {
      if (!disabled) setOpen((prev) => !prev);
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <div className={cn('relative w-full', className)}>
          <Popover.Anchor asChild>
            <div className="relative w-full">
              <Input
                ref={ref}
                id={id}
                name={name}
                type="text"
                inputMode="numeric"
                inputSize={inputSize}
                error={error}
                disabled={disabled}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => { if (!disabled) setOpen(true); }}
                aria-label={ariaLabel || 'Datum auswählen'}
                aria-haspopup="dialog"
                aria-expanded={open}
                className="pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                disabled={disabled}
                onClick={handleIconClick}
                aria-label="Kalender öffnen"
                className="absolute right-0 top-0 flex h-full items-center px-3 text-[var(--color-datepicker-weekday-text)] hover:text-[var(--color-datepicker-header-text)] transition-colors disabled:pointer-events-none"
              >
                <CalendarIcon size={16} />
              </button>
            </div>
          </Popover.Anchor>
          {/* Hidden input for form submission */}
          {name && value && (
            <input
              type="hidden"
              name={name}
              value={format(value, 'yyyy-MM-dd')}
            />
          )}
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
                selected={value}
                month={month}
                onSelect={handleCalendarSelect}
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

DatePicker.displayName = 'DatePicker';

export { DatePicker };
