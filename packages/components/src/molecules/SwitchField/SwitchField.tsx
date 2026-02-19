import React from 'react';
import { Switch, type SwitchProps } from '../../atoms/Switch';
import { cn } from '../../utils/cn';

// ─── SwitchField ─────────────────────────────────────────────────────────────

export interface SwitchFieldProps extends SwitchProps {
  /** Label text */
  label: string;
  /** Description below label */
  description?: string;
  /** Custom id (auto-generated if not provided) */
  id?: string;
}

const SwitchField = React.forwardRef<
  HTMLButtonElement,
  SwitchFieldProps
>(({ label, description, id, className, ...props }, ref) => {
  const autoId = React.useId();
  const switchId = id || autoId;

  return (
    <div className={cn('flex items-center justify-between gap-[var(--spacing-switch-field-gap)]', className)}>
      <div className="flex flex-col gap-[var(--spacing-switch-content-gap)]">
        <label
          htmlFor={switchId}
          className={cn(
            'text-[length:var(--font-switch-label-size)] [font-weight:var(--font-switch-label-weight)] cursor-pointer text-[var(--color-switch-label)]',
            props.disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {label}
        </label>
        {description && (
          <p className="text-[length:var(--font-switch-desc-size)] text-[var(--color-switch-description)]">
            {description}
          </p>
        )}
      </div>
      <Switch ref={ref} id={switchId} {...props} />
    </div>
  );
});
SwitchField.displayName = 'SwitchField';

export { SwitchField };
