import React from 'react';
import { Checkbox, type CheckboxProps } from '../../atoms/Checkbox';
import { cn } from '../../utils/cn';

// ─── CheckboxField ───────────────────────────────────────────────────────────

export interface CheckboxFieldProps extends CheckboxProps {
  /** Label text */
  label: string;
  /** Description below label */
  description?: string;
  /** Custom id (auto-generated if not provided) */
  id?: string;
}

const CheckboxField = React.forwardRef<
  HTMLButtonElement,
  CheckboxFieldProps
>(({ label, description, id, className, ...props }, ref) => {
  const autoId = React.useId();
  const checkboxId = id || autoId;

  return (
    <div className={cn('flex items-start gap-[var(--spacing-checkbox-field-gap)]', className)}>
      <Checkbox ref={ref} id={checkboxId} {...props} />
      <div className="flex flex-col gap-[var(--spacing-checkbox-content-gap)]">
        <label
          htmlFor={checkboxId}
          className={cn(
            'text-[length:var(--font-checkbox-label-size)] [font-weight:var(--font-checkbox-label-weight)] cursor-pointer text-[var(--color-checkbox-label)]',
            props.disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {label}
        </label>
        {description && (
          <p className="text-[length:var(--font-checkbox-desc-size)] text-[var(--color-checkbox-description)]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});
CheckboxField.displayName = 'CheckboxField';

export { CheckboxField };
