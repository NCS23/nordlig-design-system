import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  isAfter,
  isBefore,
} from 'date-fns';
import { de } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const;

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface CalendarProps {
  /** Selection mode */
  mode?: 'single' | 'range';
  /** Currently selected date (single mode) */
  selected?: Date;
  /** Currently selected range (range mode) */
  selectedRange?: DateRange;
  /** Currently displayed month */
  month: Date;
  /** Callback when a day is clicked (single mode) */
  onSelect?: (date: Date) => void;
  /** Callback when range changes (range mode) */
  onRangeSelect?: (range: DateRange) => void;
  /** Callback when navigating months */
  onMonthChange: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Additional class name */
  className?: string;
}

function isDayDisabled(day: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && day < startOfDay(minDate)) return true;
  if (maxDate && day > endOfDay(maxDate)) return true;
  return false;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function isInRange(day: Date, from?: Date, to?: Date): boolean {
  if (!from || !to) return false;
  const d = startOfDay(day);
  const f = startOfDay(from);
  const t = startOfDay(to);
  return d > f && d < t;
}

function isRangeStart(day: Date, from?: Date): boolean {
  return !!from && isSameDay(day, from);
}

function isRangeEnd(day: Date, to?: Date): boolean {
  return !!to && isSameDay(day, to);
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = 'single',
      selected,
      selectedRange,
      month,
      onSelect,
      onRangeSelect,
      onMonthChange,
      minDate,
      maxDate,
      className,
    },
    ref
  ) => {
    const [hoverDay, setHoverDay] = React.useState<Date | undefined>();

    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    // Determine effective range for visual highlighting (including hover preview)
    const rangeFrom = selectedRange?.from;
    const rangeTo = selectedRange?.to;
    const previewTo = mode === 'range' && rangeFrom && !rangeTo ? hoverDay : undefined;
    const effectiveFrom = rangeFrom;
    const effectiveTo = rangeTo || previewTo;

    // Normalize range direction (swap if from > to)
    const normFrom = effectiveFrom && effectiveTo && isAfter(effectiveFrom, effectiveTo)
      ? effectiveTo : effectiveFrom;
    const normTo = effectiveFrom && effectiveTo && isAfter(effectiveFrom, effectiveTo)
      ? effectiveFrom : effectiveTo;

    const handleDayClick = (day: Date) => {
      if (mode === 'single') {
        onSelect?.(day);
        return;
      }

      // Range mode
      if (!rangeFrom || rangeTo) {
        // Start new range
        onRangeSelect?.({ from: day, to: undefined });
      } else {
        // Complete range
        const from = rangeFrom;
        const to = day;
        if (isAfter(from, to)) {
          onRangeSelect?.({ from: to, to: from });
        } else if (isSameDay(from, to)) {
          // Same day clicked twice = single day range
          onRangeSelect?.({ from, to: from });
        } else {
          onRangeSelect?.({ from, to });
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (mode === 'range') return; // Keyboard nav only for single mode
      if (!selected) return;

      let next: Date | null = null;
      switch (e.key) {
        case 'ArrowLeft':
          next = new Date(selected.getTime() - 86400000);
          break;
        case 'ArrowRight':
          next = new Date(selected.getTime() + 86400000);
          break;
        case 'ArrowUp':
          next = new Date(selected.getTime() - 7 * 86400000);
          break;
        case 'ArrowDown':
          next = new Date(selected.getTime() + 7 * 86400000);
          break;
        default:
          return;
      }

      e.preventDefault();
      if (next && !isDayDisabled(next, minDate, maxDate)) {
        onSelect?.(next);
        if (!isSameMonth(next, month)) {
          onMonthChange(startOfMonth(next));
        }
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'p-[var(--spacing-datepicker-popover-padding)]',
          className
        )}
        role="grid"
        aria-label={format(month, 'MMMM yyyy', { locale: de })}
      >
        {/* Header: Month/Year + Nav */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => onMonthChange(subMonths(month, 1))}
            aria-label="Vorheriger Monat"
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center',
              'rounded-[var(--radius-datepicker-day)]',
              'text-[var(--color-datepicker-header-text)]',
              'hover:bg-[var(--color-datepicker-nav-hover-bg)]',
              'transition-colors'
            )}
          >
            <Icon icon={ChevronLeft} size="sm" />
          </button>
          <span
            className="text-sm font-semibold text-[var(--color-datepicker-header-text)]"
            aria-live="polite"
          >
            {format(month, 'MMMM yyyy', { locale: de })}
          </span>
          <button
            type="button"
            onClick={() => onMonthChange(addMonths(month, 1))}
            aria-label="Nächster Monat"
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center',
              'rounded-[var(--radius-datepicker-day)]',
              'text-[var(--color-datepicker-header-text)]',
              'hover:bg-[var(--color-datepicker-nav-hover-bg)]',
              'transition-colors'
            )}
          >
            <Icon icon={ChevronRight} size="sm" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1" role="row">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              role="columnheader"
              aria-label={day}
              className="flex h-8 items-center justify-center text-xs font-medium text-[var(--color-datepicker-weekday-text)]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div
          className="grid grid-cols-7 gap-[var(--spacing-datepicker-grid-gap)]"
          role="rowgroup"
          onKeyDown={handleKeyDown}
        >
          {days.map((day) => {
            const inMonth = isSameMonth(day, month);
            const today = isToday(day);
            const disabled = !inMonth || isDayDisabled(day, minDate, maxDate);

            // Single mode
            const isSelectedSingle = mode === 'single' && selected ? isSameDay(day, selected) : false;

            // Range mode
            const isStart = mode === 'range' && isRangeStart(day, normFrom);
            const isEnd = mode === 'range' && isRangeEnd(day, normTo);
            const inRange = mode === 'range' && isInRange(day, normFrom, normTo);
            const isRangeEndpoint = isStart || isEnd;

            const isSelected = isSelectedSingle || isRangeEndpoint;

            return (
              <button
                key={day.toISOString()}
                type="button"
                role="gridcell"
                tabIndex={isSelected ? 0 : -1}
                aria-selected={isSelected || inRange}
                aria-disabled={disabled}
                disabled={disabled}
                onClick={() => {
                  if (!disabled) handleDayClick(day);
                }}
                onMouseEnter={() => {
                  if (mode === 'range' && !disabled) setHoverDay(day);
                }}
                onMouseLeave={() => {
                  if (mode === 'range') setHoverDay(undefined);
                }}
                className={cn(
                  'inline-flex items-center justify-center',
                  'h-[var(--sizing-datepicker-day-size)] w-[var(--sizing-datepicker-day-size)]',
                  'rounded-[var(--radius-datepicker-day)]',
                  'text-sm transition-colors',
                  // Default state (in month, not selected, not in range)
                  !isSelected && !inRange && inMonth && 'text-[var(--color-datepicker-day-text)] hover:bg-[var(--color-datepicker-day-hover-bg)]',
                  // Selected (single or range endpoint)
                  isSelected && 'bg-[var(--color-datepicker-day-selected-bg)] text-[var(--color-datepicker-day-selected-text)] font-semibold',
                  // In range (between start and end)
                  inRange && !isSelected && inMonth && 'bg-[var(--color-datepicker-day-range-bg)] text-[var(--color-datepicker-day-text)]',
                  // Today (not selected, not in range)
                  today && !isSelected && !inRange && 'border border-[var(--color-datepicker-day-today-border)] font-medium',
                  // Outside month / disabled
                  disabled && 'text-[var(--color-datepicker-day-disabled-text)] cursor-default hover:bg-transparent',
                )}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export { Calendar };
