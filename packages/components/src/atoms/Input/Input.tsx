import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  [
    'w-full border bg-[var(--color-input-bg)] text-[var(--color-input-text)]',
    'placeholder:text-[var(--color-input-text-placeholder)]',
    'transition-colors',
    'hover:border-[var(--color-input-border-hover)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-input-border-focus)] focus-visible:ring-offset-1 focus-visible:border-[var(--color-input-border-focus)]',
    'disabled:cursor-not-allowed disabled:bg-[var(--color-input-bg-disabled)] disabled:text-[var(--color-text-disabled)] disabled:hover:border-[var(--color-input-border)]',
  ].join(' '),
  {
    variants: {
      inputSize: {
        sm: [
          'h-[var(--sizing-input-sm-height)]',
          'px-[var(--spacing-input-padding-x)]',
          'text-[length:var(--sizing-input-sm-font-size)]',
          'rounded-[var(--sizing-input-sm-radius)]',
        ].join(' '),
        md: [
          'h-[var(--sizing-input-md-height)]',
          'px-[var(--spacing-input-padding-x)]',
          'text-[length:var(--sizing-input-md-font-size)]',
          'rounded-[var(--sizing-input-md-radius)]',
        ].join(' '),
        lg: [
          'h-[var(--sizing-input-lg-height)]',
          'px-[var(--spacing-input-padding-x)]',
          'text-[length:var(--sizing-input-lg-font-size)]',
          'rounded-[var(--sizing-input-lg-radius)]',
        ].join(' '),
      },
      error: {
        true: 'border-[var(--color-input-border-error)] hover:border-[var(--color-input-border-error)] focus-visible:ring-[var(--color-input-border-error)] focus-visible:border-[var(--color-input-border-error)]',
        false: 'border-[var(--color-input-border)]',
      },
    },
    defaultVariants: {
      inputSize: 'md',
      error: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'error'> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(inputVariants({ inputSize, error, className }))}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
