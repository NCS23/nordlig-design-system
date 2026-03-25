import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/switch';

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
      'rounded-[var(--radius-switch-track)] transition-colors duration-200',
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
        'pointer-events-none block h-[var(--sizing-switch-thumb-size)] w-[var(--sizing-switch-thumb-size)] rounded-[var(--radius-switch-thumb)]',
        'bg-[var(--color-switch-thumb-bg)] [box-shadow:var(--shadow-switch-thumb)]',
        'transition-transform duration-200',
        'data-[state=unchecked]:translate-x-0.5',
        'data-[state=checked]:translate-x-[22px]'
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = 'Switch';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Switch };
