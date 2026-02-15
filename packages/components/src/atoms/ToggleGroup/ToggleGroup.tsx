import React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ─── Variant Context ────────────────────────────────────────────────────────

type ToggleGroupVariant = 'default' | 'outline';
type ToggleGroupSize = 'sm' | 'md' | 'lg';

const ToggleGroupContext = React.createContext<{
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
}>({ variant: 'default', size: 'md' });

// ─── CVA: ToggleGroupItem ───────────────────────────────────────────────────

const toggleGroupItemVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'font-medium transition-colors',
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

export type ToggleGroupProps = (
  | ToggleGroupPrimitive.ToggleGroupSingleProps
  | ToggleGroupPrimitive.ToggleGroupMultipleProps
) & {
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
};

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleGroupItemVariants> {}

// ─── ToggleGroup Root ───────────────────────────────────────────────────────

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        {...(props as React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>)}
      />
    </ToggleGroupContext.Provider>
  )
);
ToggleGroup.displayName = 'ToggleGroup';

// ─── ToggleGroupItem ────────────────────────────────────────────────────────

const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupItemVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
          className,
        })
      )}
      {...props}
    />
  );
});
ToggleGroupItem.displayName = 'ToggleGroupItem';

// ─── Exports ────────────────────────────────────────────────────────────────

export { ToggleGroup, ToggleGroupItem, toggleGroupItemVariants };
