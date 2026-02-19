import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-badge)] [border-width:var(--sizing-badge-border-width)] [font-weight:var(--font-badge-weight)] leading-none',
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
      },
      size: {
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

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

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
