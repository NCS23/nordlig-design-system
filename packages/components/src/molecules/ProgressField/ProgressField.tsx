import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { Progress, type ProgressProps } from '../../atoms/Progress';
import { cn } from '../../utils/cn';

// ─── ProgressField ───────────────────────────────────────────────────────────

export interface ProgressFieldProps extends ProgressProps {
  label: string;
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => string;
}

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

export { ProgressField };
