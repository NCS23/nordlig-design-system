import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

// Component token CSS
import '@nordlig/styles/tokens/input';
import '@nordlig/styles/tokens/text';

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

/** Text input field with size variants, error state and built-in password toggle. */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'error'> {
  /** Size preset controlling height, font-size and border-radius.
   * @default 'md' */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Shows error border and ring styling.
   * @default false */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, error = false, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const effectiveType = isPassword && showPassword ? 'text' : type;

    if (isPassword) {
      return (
        <div className="relative w-full">
          <input
            ref={ref}
            type={effectiveType}
            aria-invalid={error || undefined}
            className={cn(inputVariants({ inputSize, error }), 'pr-[var(--spacing-input-icon-inset)]', className)}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-0 top-0 flex h-full items-center px-[var(--spacing-input-icon-padding)] text-[var(--color-input-text-placeholder)] hover:text-[var(--color-input-text)] transition-colors"
          >
            {showPassword ? <Icon icon={EyeOff} size="sm" /> : <Icon icon={Eye} size="sm" />}
          </button>
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={error || undefined}
        className={cn(inputVariants({ inputSize, error, className }))}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
