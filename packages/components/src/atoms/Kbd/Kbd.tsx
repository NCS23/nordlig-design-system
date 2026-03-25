import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/kbd';

const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono rounded-[var(--radius-kbd)] [border-width:var(--sizing-kbd-border-width)] border-[var(--color-kbd-border)] bg-[var(--color-kbd-bg)] text-[var(--color-kbd-text)] [box-shadow:var(--shadow-kbd)]',
  {
    variants: {
      size: {
        sm: 'px-[var(--spacing-kbd-sm-px)] py-[var(--spacing-kbd-sm-py)] text-[length:var(--font-kbd-sm-size)]',
        md: 'px-[var(--spacing-kbd-md-px)] py-[var(--spacing-kbd-md-py)] text-[length:var(--font-kbd-md-size)]',
        lg: 'px-[var(--spacing-kbd-lg-px)] py-[var(--spacing-kbd-lg-py)] text-[length:var(--font-kbd-lg-size)]',
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
