import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ─── CVA: Track ──────────────────────────────────────────────────────────────

const progressTrackVariants = cva(
  [
    'relative w-full overflow-hidden',
    'bg-[var(--color-progress-track)]',
    'rounded-[var(--radius-progress)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-[var(--sizing-progress-sm-height)]',
        md: 'h-[var(--sizing-progress-md-height)]',
        lg: 'h-[var(--sizing-progress-lg-height)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── CVA: Indicator ──────────────────────────────────────────────────────────

const progressIndicatorVariants = cva(
  [
    'h-full rounded-[var(--radius-progress)]',
    'transition-all duration-500 ease-out',
  ].join(' '),
  {
    variants: {
      color: {
        default: 'bg-[var(--color-progress-fill)]',
        success: 'bg-[var(--color-progress-fill-success)]',
        warning: 'bg-[var(--color-progress-fill-warning)]',
        error: 'bg-[var(--color-progress-fill-error)]',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'value' | 'color'>,
    VariantProps<typeof progressTrackVariants> {
  value?: number;
  max?: number;
  color?: 'default' | 'success' | 'warning' | 'error';
  indeterminate?: boolean;
}

export interface ProgressFieldProps extends ProgressProps {
  label: string;
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => string;
}

// ─── Progress ────────────────────────────────────────────────────────────────

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, max = 100, size, color = 'default', indeterminate = false, ...props }, ref) => {
  const percentage = indeterminate ? undefined : Math.min(100, Math.max(0, ((value ?? 0) / max) * 100));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressTrackVariants({ size, className }))}
      value={indeterminate ? undefined : (value ?? 0)}
      max={max}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          progressIndicatorVariants({ color }),
          indeterminate && 'animate-progress-indeterminate w-1/3'
        )}
        style={indeterminate ? undefined : { width: `${percentage}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = 'Progress';

// ─── ProgressField ───────────────────────────────────────────────────────────

const ProgressField = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressFieldProps
>(({ label, showValue = false, valueFormat, value, max = 100, className, ...props }, ref) => {
  const displayValue = valueFormat
    ? valueFormat(value ?? 0, max)
    : `${Math.round(((value ?? 0) / max) * 100)}%`;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-[var(--spacing-progress-label-gap)]">
        <span className="text-[length:var(--font-progress-label-size)] [font-weight:var(--font-progress-label-weight)] text-[var(--color-progress-label)]">
          {label}
        </span>
        {showValue && (
          <span className="text-[length:var(--font-progress-value-size)] text-[var(--color-progress-value)]">
            {displayValue}
          </span>
        )}
      </div>
      <Progress ref={ref} value={value} max={max} {...props} />
    </div>
  );
});
ProgressField.displayName = 'ProgressField';

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Progress,
  ProgressField,
  progressTrackVariants,
  progressIndicatorVariants,
};
