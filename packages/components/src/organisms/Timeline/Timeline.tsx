import React from 'react';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  timestamp?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// ─── Variant Styles ─────────────────────────────────────────────────────────

const variantDotStyles = {
  default: 'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]',
  success: 'bg-[var(--color-bg-success)] text-white',
  warning: 'bg-[var(--color-bg-warning)] text-white',
  error: 'bg-[var(--color-bg-error)] text-white',
};

// ─── Timeline ───────────────────────────────────────────────────────────────

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative flex flex-col', className)}
        role="list"
        aria-label="Zeitverlauf"
        {...props}
      >
        {children}
      </div>
    );
  }
);
Timeline.displayName = 'Timeline';

// ─── TimelineItem ───────────────────────────────────────────────────────────

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      timestamp,
      icon,
      title,
      description,
      variant = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('relative pb-8 last:pb-0', className)}
        role="listitem"
        {...props}
      >
        {/* Vertical line (hidden for last item via CSS) */}
        <div
          className="absolute left-4 top-8 bottom-0 w-0.5 bg-[var(--color-border-default)] last-of-type:hidden"
          aria-hidden="true"
          data-timeline-line=""
        />

        {/* Row: icon + content */}
        <div className="flex flex-row items-start">
          {/* Icon dot */}
          <div
            className={cn(
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0',
              variantDotStyles[variant]
            )}
          >
            {icon || (
              <div
                className={cn(
                  'w-2.5 h-2.5 rounded-full',
                  variant === 'default'
                    ? 'bg-[var(--color-text-muted)]'
                    : 'bg-white'
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="ml-4 flex-1 min-w-0">
            {timestamp && (
              <span className="text-xs text-[var(--color-text-muted)]">
                {timestamp}
              </span>
            )}
            <h4 className="text-sm font-medium text-[var(--color-text-base)]">
              {title}
            </h4>
            {description && (
              <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                {description}
              </p>
            )}
            {children && <div className="mt-2">{children}</div>}
          </div>
        </div>
      </div>
    );
  }
);
TimelineItem.displayName = 'TimelineItem';

// ─── Exports ────────────────────────────────────────────────────────────────

export { Timeline, TimelineItem };
