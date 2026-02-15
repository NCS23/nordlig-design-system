import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono rounded-[var(--radius-kbd)] border border-[var(--color-kbd-border)] bg-[var(--color-kbd-bg)] text-[var(--color-kbd-text)] [box-shadow:var(--shadow-kbd)]',
  {
    variants: {
      size: {
        sm: 'px-1 py-0.5 text-[11px]',
        md: 'px-1.5 py-0.5 text-xs',
        lg: 'px-2 py-1 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ size, className }))}
        {...props}
      />
    );
  }
);

Kbd.displayName = 'Kbd';

export { Kbd, kbdVariants };
