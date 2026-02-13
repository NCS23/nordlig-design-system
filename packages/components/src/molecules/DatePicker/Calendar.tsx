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
} from 'date-fns';
import { de } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const;

export interface CalendarProps {
  /** Currently selected date */
  selected?: Date;
  /** Currently displayed month */
  month: Date;
  /** Callback when a day is clicked */
  onSelect: (date: Date) => void;
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

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ selected, month, onSelect, onMonthChange, minDate, maxDate, className }, ref) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const handleKeyDown = (e: React.KeyboardEvent) => {
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
        onSelect(next);
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
            <ChevronLeft size={16} />
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
            <ChevronRight size={16} />
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
            const isSelected = selected ? isSameDay(day, selected) : false;
            const today = isToday(day);
            const disabled = !inMonth || isDayDisabled(day, minDate, maxDate);

            return (
              <button
                key={day.toISOString()}
                type="button"
                role="gridcell"
                tabIndex={isSelected ? 0 : -1}
                aria-selected={isSelected}
                aria-disabled={disabled}
                disabled={disabled}
                onClick={() => {
                  if (!disabled) onSelect(day);
                }}
                className={cn(
                  'inline-flex items-center justify-center',
                  'h-[var(--sizing-datepicker-day-size)] w-[var(--sizing-datepicker-day-size)]',
                  'rounded-[var(--radius-datepicker-day)]',
                  'text-sm transition-colors',
                  // Default state
                  !isSelected && inMonth && 'text-[var(--color-datepicker-day-text)] hover:bg-[var(--color-datepicker-day-hover-bg)]',
                  // Selected
                  isSelected && 'bg-[var(--color-datepicker-day-selected-bg)] text-[var(--color-datepicker-day-selected-text)] font-semibold',
                  // Today (not selected)
                  today && !isSelected && 'border border-[var(--color-datepicker-day-today-border)] font-medium',
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
