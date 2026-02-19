import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../utils/cn';

// ─── Switch ──────────────────────────────────────────────────────────────────

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /** Additional class name */
  className?: string;
}

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-[var(--sizing-switch-track-height)] w-[var(--sizing-switch-track-width)] shrink-0 cursor-pointer items-center',
      'rounded-full transition-colors duration-200',
      'bg-[var(--color-switch-track-bg)]',
      'data-[state=checked]:bg-[var(--color-switch-track-bg-checked)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-switch-focus-ring)] focus-visible:ring-offset-1',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-switch-disabled-track-bg)]',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-[var(--sizing-switch-thumb-size)] w-[var(--sizing-switch-thumb-size)] rounded-full',
        'bg-[var(--color-switch-thumb-bg)] [box-shadow:var(--shadow-switch-thumb)]',
        'transition-transform duration-200',
        'data-[state=unchecked]:translate-x-0.5',
        'data-[state=checked]:translate-x-[22px]'
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = 'Switch';

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
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchFieldProps
>(({ label, description, id, className, ...props }, ref) => {
  const autoId = React.useId();
  const switchId = id || autoId;

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="flex flex-col gap-0.5">
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

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Switch, SwitchField };
