import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const spacerVariants = cva('shrink-0', {
  variants: {
    size: {
      '2xs': 'h-[var(--spacing-component-gap-2xs)] w-[var(--spacing-component-gap-2xs)]',
      xs: 'h-[var(--spacing-component-gap-xs)] w-[var(--spacing-component-gap-xs)]',
      sm: 'h-[var(--spacing-component-gap-sm)] w-[var(--spacing-component-gap-sm)]',
      md: 'h-[var(--spacing-component-gap-md)] w-[var(--spacing-component-gap-md)]',
      lg: 'h-[var(--spacing-component-gap-lg)] w-[var(--spacing-component-gap-lg)]',
      xl: 'h-[var(--spacing-component-gap-xl)] w-[var(--spacing-component-gap-xl)]',
    },
    grow: {
      true: 'grow',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    grow: false,
  },
});

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size, grow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(spacerVariants({ size, grow, className }))}
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

export { Spacer, spacerVariants };
