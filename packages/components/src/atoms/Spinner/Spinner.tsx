import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ─── CVA: Spinner ────────────────────────────────────────────────────────────

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'w-[var(--sizing-spinner-sm)] h-[var(--sizing-spinner-sm)]',
      md: 'w-[var(--sizing-spinner-md)] h-[var(--sizing-spinner-md)]',
      lg: 'w-[var(--sizing-spinner-lg)] h-[var(--sizing-spinner-lg)]',
      xl: 'w-[var(--sizing-spinner-xl)] h-[var(--sizing-spinner-xl)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SpinnerProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, label, ...props }, ref) => {
    const spinnerElement = (
      <svg
        ref={ref}
        className={cn(spinnerVariants({ size, className }))}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="status"
        aria-label={label ?? 'Laden'}
        {...props}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="var(--color-spinner-track)"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="var(--color-spinner-primary)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
        />
      </svg>
    );

    if (label) {
      return (
        <span className="inline-flex items-center gap-2">
          {spinnerElement}
          <span className="text-[length:var(--font-spinner-label-size)] text-[var(--color-spinner-label)]">{label}</span>
        </span>
      );
    }

    return spinnerElement;
  }
);
Spinner.displayName = 'Spinner';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Spinner, spinnerVariants };
