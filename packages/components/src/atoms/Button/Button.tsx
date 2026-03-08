import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center [font-weight:var(--font-btn-weight)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)]',
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)]',
          '[border-width:var(--sizing-btn-border-width)] border-[var(--color-btn-primary-border)]',
          'hover:bg-[var(--color-btn-primary-bg-hover)]',
          'active:bg-[var(--color-btn-primary-bg-active)]',
        ].join(' '),
        secondary: [
          'bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-text)]',
          '[border-width:var(--sizing-btn-border-width)] border-[var(--color-btn-secondary-border)]',
          'hover:bg-[var(--color-btn-secondary-bg-hover)]',
          'active:bg-[var(--color-btn-secondary-bg-active)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--color-btn-ghost-text)]',
          'hover:bg-[var(--color-btn-ghost-bg-hover)]',
          'active:bg-[var(--color-btn-ghost-bg-active)]',
        ].join(' '),
        destructive: [
          'bg-[var(--color-btn-destructive-bg)] text-[var(--color-btn-destructive-text)]',
          '[border-width:var(--sizing-btn-border-width)] border-[var(--color-btn-destructive-border)]',
          'hover:bg-[var(--color-btn-destructive-bg-hover)]',
          'active:bg-[var(--color-btn-destructive-bg-active)]',
        ].join(' '),
      },
      size: {
        sm: [
          'h-[var(--sizing-btn-sm-height)]',
          'px-[var(--sizing-btn-sm-padding-x)] py-[var(--sizing-btn-sm-padding-y)]',
          'gap-[var(--sizing-btn-sm-gap)]',
          'text-[length:var(--sizing-btn-sm-font-size)]',
          'rounded-[var(--sizing-btn-sm-radius)]',
        ].join(' '),
        md: [
          'h-[var(--sizing-btn-md-height)]',
          'px-[var(--sizing-btn-md-padding-x)] py-[var(--sizing-btn-md-padding-y)]',
          'gap-[var(--sizing-btn-md-gap)]',
          'text-[length:var(--sizing-btn-md-font-size)]',
          'rounded-[var(--sizing-btn-md-radius)]',
        ].join(' '),
        lg: [
          'h-[var(--sizing-btn-lg-height)]',
          'px-[var(--sizing-btn-lg-padding-x)] py-[var(--sizing-btn-lg-padding-y)]',
          'gap-[var(--sizing-btn-lg-gap)]',
          'text-[length:var(--sizing-btn-lg-font-size)]',
          'rounded-[var(--sizing-btn-lg-radius)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/** Primary interactive element for triggering actions. */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Visual style — `primary` (filled), `secondary` (outlined), `ghost` (transparent), `destructive` (outlined red).
   * @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  /** Size preset controlling height, padding, font-size and border-radius.
   * @default 'md' */
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
