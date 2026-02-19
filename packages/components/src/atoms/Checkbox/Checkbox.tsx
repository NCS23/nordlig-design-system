import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

// ─── Checkbox ────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Additional class name */
  className?: string;
  /** Error state for accessibility (aria-invalid) */
  error?: boolean;
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, error, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    aria-invalid={error || undefined}
    className={cn(
      'peer inline-flex h-[var(--sizing-checkbox-box-size)] w-[var(--sizing-checkbox-box-size)] shrink-0 items-center justify-center',
      'rounded-[var(--radius-checkbox)] [border-width:var(--sizing-checkbox-border-width)] transition-all duration-200',
      'border-[var(--color-checkbox-border)] bg-[var(--color-checkbox-bg)]',
      'hover:border-[var(--color-checkbox-border-hover)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-checkbox-focus-ring)] focus-visible:ring-offset-1',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-checkbox-disabled-bg)]',
      'data-[state=checked]:bg-[var(--color-checkbox-checked-bg)] data-[state=checked]:border-[var(--color-checkbox-checked-border)]',
      'data-[state=indeterminate]:bg-[var(--color-checkbox-checked-bg)] data-[state=indeterminate]:border-[var(--color-checkbox-checked-border)]',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-[var(--color-checkbox-checked-icon)]">
      {props.checked === 'indeterminate' ? (
        <Minus size={14} />
      ) : (
        <Check size={14} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = 'Checkbox';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Checkbox };
