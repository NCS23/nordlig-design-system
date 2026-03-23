import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/progress';

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

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Progress,
  progressTrackVariants,
  progressIndicatorVariants,
};
