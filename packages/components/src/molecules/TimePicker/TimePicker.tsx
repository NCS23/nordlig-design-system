import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Clock } from 'lucide-react';
import { Input, type InputProps } from '../../atoms/Input';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// Component token CSS
import '@nordlig/styles/tokens/input';
import '@nordlig/styles/tokens/text';
import '@nordlig/styles/tokens/timepicker';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function parseTimeString(
  time: string
): { hours: number; minutes: number; seconds: number } | null {
  const parts = time.split(':').map(Number);
  if (parts.length < 2 || parts.some(isNaN)) return null;
  return {
    hours: parts[0],
    minutes: parts[1],
    seconds: parts[2] ?? 0,
  };
}

function formatTime(
  h: number,
  m: number,
  s: number,
  showSeconds: boolean
): string {
  return showSeconds ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}`;
}

function to12h(hours24: number): { hours12: number; period: 'AM' | 'PM' } {
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
  return { hours12, period };
}

function to24h(hours12: number, period: 'AM' | 'PM'): number {
  if (period === 'AM') return hours12 === 12 ? 0 : hours12;
  return hours12 === 12 ? 12 : hours12 + 12;
}

function timeToMinutes(h: number, m: number): number {
  return h * 60 + m;
}

// ─── TimeColumn ──────────────────────────────────────────────────────────────

interface TimeColumnProps {
  values: number[];
  selected: number;
  onSelect: (val: number) => void;
  label: string;
  disabledValues?: Set<number>;
  formatValue?: (val: number) => string;
}

function TimeColumn({
  values,
  selected,
  onSelect,
  label,
  disabledValues,
  formatValue = (v) => pad(v),
}: TimeColumnProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector('[data-selected="true"]');
      selectedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [selected]);

  return (
    <div
      className="flex flex-col items-center"
      style={{ width: 'var(--sizing-tpick-column-width)' }}
    >
      <div
        className="text-[length:var(--font-tpick-label-size)] font-[var(--font-tpick-label-weight)] text-[var(--color-tpick-label-text)] pb-1 select-none"
      >
        {label}
      </div>
      <div
        ref={listRef}
        role="listbox"
        aria-label={label}
        className="overflow-y-auto max-h-[200px] w-full flex flex-col gap-[var(--spacing-tpick-column-gap)]"
      >
        {values.map((val) => {
          const isDisabled = disabledValues?.has(val);
          const isSelected = val === selected;

          return (
            <button
              key={val}
              type="button"
              role="option"
              aria-selected={isSelected}
              aria-disabled={isDisabled || undefined}
              data-selected={isSelected}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(val)}
              className={cn(
                'w-full text-center transition-colors rounded-[var(--radius-tpick-cell)] text-[length:var(--font-tpick-cell-size)] cursor-pointer',
                'h-[var(--sizing-tpick-cell-height)] leading-[var(--sizing-tpick-cell-height)]',
                isSelected
                  ? 'bg-[var(--color-tpick-column-selected-bg)] text-[var(--color-tpick-column-selected-text)]'
                  : 'text-[var(--color-tpick-column-text)] hover:bg-[var(--color-tpick-column-hover-bg)]',
                isDisabled &&
                  'text-[var(--color-tpick-column-disabled-text)] cursor-not-allowed hover:bg-transparent'
              )}
            >
              {formatValue(val)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── TimePicker ──────────────────────────────────────────────────────────────

export interface TimePickerProps {
  /** Current time value as "HH:MM" or "HH:MM:SS" string */
  value?: string;
  /** Callback when time changes */
  onChange?: (time: string | undefined) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Time format */
  format?: '24h' | '12h';
  /** Show seconds column */
  showSeconds?: boolean;
  /** Minimum selectable time (e.g. "08:00") */
  min?: string;
  /** Maximum selectable time (e.g. "17:30") */
  max?: string;
  /** Minute step interval (default: 1, common: 5, 10, 15, 30) */
  minuteStep?: number;
  /** Input size variant */
  inputSize?: InputProps['inputSize'];
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Name for hidden form input */
  name?: string;
  /** ID for the input */
  id?: string;
  /** aria-label */
  'aria-label'?: string;
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'HH:MM',
      format: timeFormat = '24h',
      showSeconds = false,
      min,
      max,
      minuteStep = 1,
      inputSize,
      error = false,
      disabled = false,
      className,
      name,
      id,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value ?? '');

    // Parsed current value
    const parsed = value ? parseTimeString(value) : null;
    const hours = parsed?.hours ?? 0;
    const minutes = parsed?.minutes ?? 0;
    const seconds = parsed?.seconds ?? 0;
    const { period } = to12h(hours);

    // Parsed min/max
    const parsedMin = min ? parseTimeString(min) : null;
    const parsedMax = max ? parseTimeString(max) : null;
    const minMins = parsedMin ? timeToMinutes(parsedMin.hours, parsedMin.minutes) : 0;
    const maxMins = parsedMax
      ? timeToMinutes(parsedMax.hours, parsedMax.minutes)
      : 24 * 60 - 1;

    // Sync external value
    React.useEffect(() => {
      setInputValue(value ?? '');
    }, [value]);

    const emitChange = (h: number, m: number, s: number) => {
      onChange?.(formatTime(h, m, s, showSeconds));
    };

    const handleHourSelect = (h: number) => {
      const actualHour =
        timeFormat === '12h' ? to24h(h, period) : h;
      emitChange(actualHour, minutes, seconds);
    };

    const handleMinuteSelect = (m: number) => {
      emitChange(hours, m, seconds);
    };

    const handleSecondSelect = (s: number) => {
      emitChange(hours, minutes, s);
    };

    const handlePeriodSelect = (p: number) => {
      const newPeriod = p === 0 ? 'AM' : 'PM';
      const { hours12 } = to12h(hours);
      emitChange(to24h(hours12, newPeriod), minutes, seconds);
    };

    // Disabled values based on min/max
    const disabledHours = React.useMemo(() => {
      const set = new Set<number>();
      if (!parsedMin && !parsedMax) return set;
      const range = timeFormat === '24h' ? 24 : 12;
      for (let h = 0; h < range; h++) {
        const actual = timeFormat === '12h' ? to24h(h === 0 ? 12 : h, period) : h;
        // Check if any minute in this hour falls within range
        const hourMin = timeToMinutes(actual, 0);
        const hourMax = timeToMinutes(actual, 59);
        if (hourMax < minMins || hourMin > maxMins) {
          set.add(timeFormat === '12h' ? (h === 0 ? 12 : h) : h);
        }
      }
      return set;
    }, [parsedMin, parsedMax, minMins, maxMins, timeFormat, period]);

    const disabledMinutes = React.useMemo(() => {
      const set = new Set<number>();
      if (!parsedMin && !parsedMax) return set;
      for (let m = 0; m < 60; m += minuteStep) {
        const totalMins = timeToMinutes(hours, m);
        if (totalMins < minMins || totalMins > maxMins) {
          set.add(m);
        }
      }
      return set;
    }, [parsedMin, parsedMax, hours, minMins, maxMins, minuteStep]);

    // Generate column values
    const hourValues =
      timeFormat === '24h'
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => i + 1);

    const minuteValues = Array.from(
      { length: Math.ceil(60 / minuteStep) },
      (_, i) => i * minuteStep
    );

    const secondValues = Array.from({ length: 60 }, (_, i) => i);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputValue(raw);

      if (raw === '') {
        onChange?.(undefined);
        return;
      }

      const p = parseTimeString(raw);
      if (p) {
        const isLengthValid = showSeconds ? raw.length === 8 : raw.length === 5;
        if (isLengthValid) {
          onChange?.(raw);
        }
      }
    };

    const handleIconClick = () => {
      if (!disabled) setOpen((prev) => !prev);
    };

    const displayValue =
      timeFormat === '12h' && value && parsed
        ? (() => {
            const { hours12, period: p } = to12h(parsed.hours);
            const base = showSeconds
              ? `${pad(hours12)}:${pad(parsed.minutes)}:${pad(parsed.seconds)}`
              : `${pad(hours12)}:${pad(parsed.minutes)}`;
            return `${base} ${p}`;
          })()
        : inputValue;

    const selectedHour12 = to12h(hours).hours12;

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
                inputSize={inputSize}
                error={error}
                disabled={disabled}
                placeholder={placeholder}
                value={displayValue}
                onChange={handleInputChange}
                onFocus={() => {
                  if (!disabled) setOpen(true);
                }}
                aria-label={ariaLabel || 'Uhrzeit auswählen'}
                aria-haspopup="dialog"
                aria-expanded={open}
                className="pr-[var(--spacing-input-icon-inset)]"
              />
              <button
                type="button"
                tabIndex={-1}
                disabled={disabled}
                onClick={handleIconClick}
                aria-label="Uhrzeit öffnen"
                className="absolute right-0 top-0 flex h-full items-center px-[var(--spacing-input-icon-padding)] text-[var(--color-tpick-label-text)] hover:text-[var(--color-tpick-column-text)] transition-colors disabled:pointer-events-none disabled:opacity-50"
              >
                <Icon icon={Clock} size="sm" />
              </button>
            </div>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              sideOffset={4}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cn(
                'z-50',
                'bg-[var(--color-tpick-popover-bg)] text-[var(--color-text-base)]',
                'border border-[var(--color-tpick-popover-border)]',
                'rounded-[var(--radius-tpick-popover)]',
                '[box-shadow:var(--shadow-tpick-popover)]',
                'p-[var(--spacing-tpick-popover-padding)]',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              <div className="flex gap-[var(--spacing-tpick-columns-gap)]">
                <TimeColumn
                  values={hourValues}
                  selected={timeFormat === '12h' ? selectedHour12 : hours}
                  onSelect={handleHourSelect}
                  label="Std"
                  disabledValues={disabledHours}
                />
                <div
                  className="w-px self-stretch bg-[var(--color-tpick-separator)] mx-0.5"
                  aria-hidden
                />
                <TimeColumn
                  values={minuteValues}
                  selected={minutes}
                  onSelect={handleMinuteSelect}
                  label="Min"
                  disabledValues={disabledMinutes}
                />
                {showSeconds && (
                  <>
                    <div
                      className="w-px self-stretch bg-[var(--color-tpick-separator)] mx-0.5"
                      aria-hidden
                    />
                    <TimeColumn
                      values={secondValues}
                      selected={seconds}
                      onSelect={handleSecondSelect}
                      label="Sek"
                    />
                  </>
                )}
                {timeFormat === '12h' && (
                  <>
                    <div
                      className="w-px self-stretch bg-[var(--color-tpick-separator)] mx-0.5"
                      aria-hidden
                    />
                    <TimeColumn
                      values={[0, 1]}
                      selected={period === 'AM' ? 0 : 1}
                      onSelect={handlePeriodSelect}
                      label=" "
                      formatValue={(v) => (v === 0 ? 'AM' : 'PM')}
                    />
                  </>
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </div>
      </Popover.Root>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export { TimePicker };
