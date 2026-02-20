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
  default: 'bg-[var(--color-timeline-dot-default-bg)] text-[var(--color-timeline-dot-default-text)]',
  success: 'bg-[var(--color-timeline-dot-success-bg)] text-[var(--color-timeline-dot-success-text)]',
  warning: 'bg-[var(--color-timeline-dot-warning-bg)] text-[var(--color-timeline-dot-warning-text)]',
  error:   'bg-[var(--color-timeline-dot-error-bg)] text-[var(--color-timeline-dot-error-text)]',
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
        className={cn('relative pb-[var(--spacing-timeline-item-pb)] last:pb-0', className)}
        role="listitem"
        {...props}
      >
        {/* Vertical line (hidden for last item via CSS) */}
        <div
          className="absolute left-[var(--spacing-timeline-line-left)] top-[var(--spacing-timeline-line-top)] bottom-0 w-[var(--sizing-timeline-line-w)] bg-[var(--color-timeline-line)] last-of-type:hidden"
          aria-hidden="true"
          data-timeline-line=""
        />

        {/* Row: icon + content */}
        <div className="flex flex-row items-start">
          {/* Icon dot */}
          <div
            className={cn(
              'relative z-10 w-[var(--sizing-timeline-dot)] h-[var(--sizing-timeline-dot)] rounded-full flex items-center justify-center shrink-0',
              variantDotStyles[variant]
            )}
          >
            {icon || (
              <div
                className={cn(
                  'h-[var(--sizing-timeline-inner-dot)] w-[var(--sizing-timeline-inner-dot)] rounded-full',
                  variant === 'default'
                    ? 'bg-[var(--color-timeline-inner-dot-default)]'
                    : 'bg-[var(--color-timeline-inner-dot-variant)]'
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="ml-[var(--spacing-timeline-content-ml)] flex-1 min-w-0">
            {timestamp && (
              <span className="text-[length:var(--font-timeline-timestamp-size)] text-[var(--color-timeline-timestamp)]">
                {timestamp}
              </span>
            )}
            <h4 className="text-[length:var(--font-timeline-title-size)] [font-weight:var(--font-timeline-title-weight)] text-[var(--color-timeline-title)]">
              {title}
            </h4>
            {description && (
              <p className="text-[length:var(--font-timeline-desc-size)] text-[var(--color-timeline-description)] mt-0.5">
                {description}
              </p>
            )}
            {children && <div className="mt-[var(--spacing-timeline-desc-mt)]">{children}</div>}
          </div>
        </div>
      </div>
    );
  }
);
TimelineItem.displayName = 'TimelineItem';

// ─── Exports ────────────────────────────────────────────────────────────────

export { Timeline, TimelineItem };
