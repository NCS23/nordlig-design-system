import React from 'react';
import { Input, type InputProps } from '../../atoms/Input';
import { cn } from '../../utils/cn';

export interface InputFieldProps extends InputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, helperText, errorMessage, error, id, className, ...inputProps }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const hasError = error || !!errorMessage;
    const describedBy = [
      hasError && errorMessage ? errorId : null,
      helperText ? helperId : null,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('flex flex-col gap-[var(--spacing-input-field-gap)]', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[length:var(--sizing-input-sm-font-size)] font-medium text-[var(--color-input-text)]"
          >
            {label}
          </label>
        )}
        <Input
          ref={ref}
          id={inputId}
          error={hasError}
          aria-describedby={describedBy}
          {...inputProps}
        />
        {hasError && errorMessage && (
          <p
            id={errorId}
            role="alert"
            className="text-[length:var(--font-size-xs)] text-[var(--color-text-error)]"
          >
            {errorMessage}
          </p>
        )}
        {helperText && !hasError && (
          <p
            id={helperId}
            className="text-[length:var(--font-size-xs)] text-[var(--color-text-muted)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };
