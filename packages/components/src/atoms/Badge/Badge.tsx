import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/badge';

const badgeVariants = cva(
  'inline-flex items-center whitespace-nowrap shrink-0 rounded-[var(--radius-badge)] [border-width:var(--sizing-badge-border-width)] [font-weight:var(--font-badge-weight)] leading-none',
  {
    variants: {
      variant: {
        success:
          'bg-[var(--color-badge-success-bg)] text-[var(--color-badge-success-text)] border-[var(--color-badge-success-border)]',
        warning:
          'bg-[var(--color-badge-warning-bg)] text-[var(--color-badge-warning-text)] border-[var(--color-badge-warning-border)]',
        error:
          'bg-[var(--color-badge-error-bg)] text-[var(--color-badge-error-text)] border-[var(--color-badge-error-border)]',
        info:
          'bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)] border-[var(--color-badge-info-border)]',
        neutral:
          'bg-[var(--color-badge-neutral-bg)] text-[var(--color-badge-neutral-text)] border-[var(--color-badge-neutral-border)]',
        primary:
          'bg-[var(--color-badge-primary-bg)] text-[var(--color-badge-primary-text)] border-[var(--color-badge-primary-border)]',
        'primary-bold':
          'bg-[var(--color-badge-primary-bold-bg)] text-[var(--color-badge-primary-bold-text)] border-[var(--color-badge-primary-bold-border)]',
        accent:
          'bg-[var(--color-badge-accent-bg)] text-[var(--color-badge-accent-text)] border-[var(--color-badge-accent-border)]',
        'accent-bold':
          'bg-[var(--color-badge-accent-bold-bg)] text-[var(--color-badge-accent-bold-text)] border-[var(--color-badge-accent-bold-border)]',
      },
      size: {
        xs: 'px-[var(--sizing-badge-xs-padding-x)] py-[var(--sizing-badge-xs-padding-y)] text-[length:var(--sizing-badge-xs-font-size)]',
        sm: 'px-[var(--sizing-badge-sm-padding-x)] py-[var(--sizing-badge-sm-padding-y)] text-[length:var(--sizing-badge-sm-font-size)]',
        md: 'px-[var(--sizing-badge-md-padding-x)] py-[var(--sizing-badge-md-padding-y)] text-[length:var(--sizing-badge-md-font-size)]',
        lg: 'px-[var(--sizing-badge-lg-padding-x)] py-[var(--sizing-badge-lg-padding-y)] text-[length:var(--sizing-badge-lg-font-size)]',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

/** Small label for status, counts or categories. */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Semantic color variant.
   * @default 'neutral' */
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary' | 'primary-bold' | 'accent' | 'accent-bold';
  /** Size preset controlling padding and font-size.
   * @default 'md' */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
