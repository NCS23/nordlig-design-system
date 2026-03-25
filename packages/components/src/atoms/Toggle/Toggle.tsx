import React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/toggle';

// ─── CVA: Toggle ────────────────────────────────────────────────────────────

const toggleVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    '[font-weight:var(--font-toggle-weight)] transition-colors',
    'rounded-[var(--radius-toggle)]',
    'text-[var(--color-toggle-text)]',
    'hover:bg-[var(--color-toggle-hover-bg)]',
    'data-[state=on]:bg-[var(--color-toggle-active-bg)]',
    'data-[state=on]:text-[var(--color-toggle-active-text)]',
    'data-[state=on]:border-[var(--color-toggle-active-border)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-toggle-bg)] border border-transparent',
        outline: 'bg-transparent border border-[var(--color-toggle-border)]',
        ghost: 'bg-transparent border-none',
      },
      size: {
        sm: 'h-[var(--sizing-toggle-sm-height)] px-[var(--sizing-toggle-sm-padding-x)] text-[length:var(--sizing-toggle-sm-font-size)]',
        md: 'h-[var(--sizing-toggle-md-height)] px-[var(--sizing-toggle-md-padding-x)] text-[length:var(--sizing-toggle-md-font-size)]',
        lg: 'h-[var(--sizing-toggle-lg-height)] px-[var(--sizing-toggle-lg-padding-x)] text-[length:var(--sizing-toggle-lg-font-size)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

// ─── Toggle ─────────────────────────────────────────────────────────────────

const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));
Toggle.displayName = 'Toggle';

// ─── Exports ────────────────────────────────────────────────────────────────

export { Toggle, toggleVariants };
