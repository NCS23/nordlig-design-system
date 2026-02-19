import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../../utils/cn';

// ─── RadioGroup ──────────────────────────────────────────────────────────────

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Label for the group (rendered as fieldset legend) */
  label?: string;
}

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, label, children, orientation = 'vertical', ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(
      'flex',
      orientation === 'vertical' ? 'flex-col gap-[var(--spacing-radio-group-gap-v)]' : 'flex-row gap-[var(--spacing-radio-group-gap-h)]',
      className
    )}
    orientation={orientation}
    aria-label={label}
    {...props}
  >
    {children}
  </RadioGroupPrimitive.Root>
));
RadioGroup.displayName = 'RadioGroup';

// ─── RadioGroupItem ──────────────────────────────────────────────────────────

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Label text */
  label?: string;
  /** Description below label */
  description?: string;
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, children, id, ...props }, ref) => {
  const autoId = React.useId();
  const itemId = id || autoId;

  return (
    <div
      className={cn(
        'flex items-start gap-[var(--spacing-radio-item-gap)] p-2 rounded-[var(--radius-radio-item)] transition-colors',
        !props.disabled && 'hover:bg-[var(--color-radio-item-hover-bg)] cursor-pointer',
        props.disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onClick={() => {
        if (!props.disabled) {
          document.getElementById(itemId)?.click();
        }
      }}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        className={cn(
          'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center',
          'rounded-full border-2 transition-all duration-200',
          'border-[var(--color-radio-border)] bg-[var(--color-radio-bg)]',
          'hover:border-[var(--color-radio-border-hover)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-radio-focus-ring)] focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-radio-disabled-bg)]',
          'data-[state=checked]:border-[var(--color-radio-selected-border)]'
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span className="block h-2.5 w-2.5 rounded-full bg-[var(--color-radio-selected-dot)]" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {(label || children) && (
        <div className="flex flex-col gap-[var(--spacing-radio-content-gap)]">
          <label
            htmlFor={itemId}
            className={cn(
              'text-sm font-medium cursor-pointer text-[var(--color-radio-label)]',
              props.disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label || children}
          </label>
          {description && (
            <p className="text-xs text-[var(--color-radio-description)]">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { RadioGroup, RadioGroupItem };
