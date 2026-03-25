import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/input';
import '@nordlig/styles/tokens/text';
import '@nordlig/styles/tokens/textarea';

const textareaVariants = cva(
  [
    'w-full border bg-[var(--color-input-bg)] text-[var(--color-input-text)]',
    'placeholder:text-[var(--color-input-text-placeholder)]',
    'transition-colors leading-relaxed',
    'hover:border-[var(--color-input-border-hover)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-input-border-focus)] focus-visible:ring-offset-1 focus-visible:border-[var(--color-input-border-focus)]',
    'disabled:cursor-not-allowed disabled:bg-[var(--color-input-bg-disabled)] disabled:text-[var(--color-text-disabled)] disabled:hover:border-[var(--color-input-border)]',
  ].join(' '),
  {
    variants: {
      inputSize: {
        sm: [
          'px-[var(--spacing-input-padding-x)] py-[var(--spacing-textarea-padding-y-sm)]',
          'text-[length:var(--sizing-input-sm-font-size)]',
          'rounded-[var(--sizing-input-sm-radius)]',
        ].join(' '),
        md: [
          'px-[var(--spacing-input-padding-x)] py-[var(--spacing-textarea-padding-y-md)]',
          'text-[length:var(--sizing-input-md-font-size)]',
          'rounded-[var(--sizing-input-md-radius)]',
        ].join(' '),
        lg: [
          'px-[var(--spacing-input-padding-x)] py-[var(--spacing-textarea-padding-y-lg)]',
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

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    Omit<VariantProps<typeof textareaVariants>, 'error'> {
  /** Error state */
  error?: boolean;
  /** Label text */
  label?: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Error message (sets error=true automatically) */
  errorMessage?: string;
  /** Maximum character count */
  maxLength?: number;
  /** Show character counter */
  showCounter?: boolean;
  /** Auto-resize to fit content */
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      inputSize,
      error = false,
      label,
      helperText,
      errorMessage,
      maxLength,
      showCounter = false,
      autoResize = false,
      rows = 4,
      id,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const counterId = `${textareaId}-counter`;
    const hasError = error || !!errorMessage;

    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [charCount, setCharCount] = React.useState(() => {
      if (typeof value === 'string') return value.length;
      if (typeof defaultValue === 'string') return defaultValue.length;
      return 0;
    });

    const isOverLimit = maxLength !== undefined && charCount > maxLength;

    // Combine refs
    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [ref]
    );

    const adjustHeight = React.useCallback(() => {
      const el = innerRef.current;
      if (!el || !autoResize) return;
      el.style.height = 'auto';
      const newHeight = Math.min(el.scrollHeight, 400);
      el.style.height = `${newHeight}px`;
    }, [autoResize]);

    // Adjust height on mount and value changes
    React.useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      adjustHeight();
      onChange?.(e);
    };

    const describedBy = [
      hasError && errorMessage ? errorId : null,
      !hasError && helperText ? helperId : null,
      showCounter ? counterId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="flex w-full flex-col gap-[var(--spacing-textarea-field-gap)]">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[length:var(--sizing-input-sm-font-size)] [font-weight:var(--font-textarea-label-weight)] text-[var(--color-input-text)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={setRefs}
            id={textareaId}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            maxLength={undefined}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              textareaVariants({ inputSize, error: hasError }),
              'min-h-[var(--sizing-textarea-min-height)]',
              autoResize ? 'resize-none overflow-hidden' : 'resize-y',
              className
            )}
            {...props}
          />
        </div>
        <div className="flex items-start justify-between gap-[var(--spacing-textarea-footer-gap)]">
          <div className="flex-1">
            {hasError && errorMessage && (
              <p
                id={errorId}
                role="alert"
                className="text-[length:var(--font-textarea-hint-size)] text-[var(--color-text-error)]"
              >
                {errorMessage}
              </p>
            )}
            {!hasError && helperText && (
              <p id={helperId} className="text-[length:var(--font-textarea-hint-size)] text-[var(--color-text-muted)]">
                {helperText}
              </p>
            )}
          </div>
          {showCounter && (
            <p
              id={counterId}
              aria-live="polite"
              className={cn(
                'text-[length:var(--font-textarea-counter-size)] tabular-nums shrink-0',
                isOverLimit
                  ? 'text-[var(--color-textarea-counter-text-over)] [font-weight:var(--font-textarea-counter-weight)]'
                  : 'text-[var(--color-textarea-counter-text)]'
              )}
            >
              {charCount}
              {maxLength !== undefined && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
