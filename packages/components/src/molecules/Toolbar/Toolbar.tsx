import React from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ToolbarProps
  extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> {}

export interface ToolbarButtonProps
  extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button> {
  /** Optionales Icon vor dem Text */
  icon?: React.ReactNode;
}

export interface ToolbarLinkProps
  extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link> {}

export type ToolbarToggleGroupProps =
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>;

export interface ToolbarToggleItemProps
  extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem> {
  /** Optionales Icon vor dem Text */
  icon?: React.ReactNode;
}

export interface ToolbarSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator> {}

// ─── Toolbar Root ───────────────────────────────────────────────────────────

const Toolbar = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Root>,
  ToolbarProps
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(
      'flex items-center',
      'gap-[var(--spacing-toolbar-gap)]',
      'bg-[var(--color-toolbar-bg)]',
      'border border-[var(--color-toolbar-border)]',
      'rounded-[var(--radius-toolbar-bar)]',
      'p-[var(--spacing-toolbar-padding)]',
      className
    )}
    {...props}
  />
));
Toolbar.displayName = 'Toolbar';

// ─── ToolbarButton ──────────────────────────────────────────────────────────

const ToolbarButton = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Button>,
  ToolbarButtonProps
>(({ className, icon, children, ...props }, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center gap-[var(--spacing-toolbar-gap)]',
      'px-[var(--spacing-toolbar-btn-padding-x)] py-[var(--spacing-toolbar-btn-padding-y)]',
      'rounded-[var(--radius-toolbar-item)]',
      'text-[length:var(--font-toolbar-btn-size)] [font-weight:var(--font-toolbar-btn-weight)] text-[var(--color-toolbar-btn-text)]',
      'transition-colors cursor-pointer select-none outline-none',
      'hover:bg-[var(--color-toolbar-btn-hover-bg)]',
      'active:bg-[var(--color-toolbar-btn-active-bg)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      'disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  >
    {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
    {children}
  </ToolbarPrimitive.Button>
));
ToolbarButton.displayName = 'ToolbarButton';

// ─── ToolbarLink ────────────────────────────────────────────────────────────

const ToolbarLink = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Link>,
  ToolbarLinkProps
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Link
    ref={ref}
    className={cn(
      'inline-flex items-center',
      'px-[var(--spacing-toolbar-btn-padding-x)] py-[var(--spacing-toolbar-btn-padding-y)]',
      'rounded-[var(--radius-toolbar-item)]',
      'text-[length:var(--font-toolbar-link-size)] text-[var(--color-toolbar-link-text)]',
      'hover:text-[var(--color-toolbar-link-hover-text)]',
      'transition-colors cursor-pointer outline-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      className
    )}
    {...props}
  />
));
ToolbarLink.displayName = 'ToolbarLink';

// ─── ToolbarToggleGroup ─────────────────────────────────────────────────────

const ToolbarToggleGroup = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.ToggleGroup>,
  ToolbarToggleGroupProps
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToggleGroup
    ref={ref}
    className={cn('flex items-center gap-[var(--spacing-toolbar-gap)]', className)}
    {...props}
  />
));
ToolbarToggleGroup.displayName = 'ToolbarToggleGroup';

// ─── ToolbarToggleItem ──────────────────────────────────────────────────────

const ToolbarToggleItem = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.ToggleItem>,
  ToolbarToggleItemProps
>(({ className, icon, children, ...props }, ref) => (
  <ToolbarPrimitive.ToggleItem
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center gap-[var(--spacing-toolbar-gap)]',
      'px-[var(--spacing-toolbar-btn-padding-x)] py-[var(--spacing-toolbar-btn-padding-y)]',
      'rounded-[var(--radius-toolbar-item)]',
      'text-[length:var(--font-toolbar-btn-size)] text-[var(--color-toolbar-btn-text)]',
      'transition-colors cursor-pointer select-none outline-none',
      'hover:bg-[var(--color-toolbar-btn-hover-bg)]',
      'data-[state=on]:bg-[var(--color-toolbar-toggle-on-bg)]',
      'data-[state=on]:text-[var(--color-toolbar-toggle-on-text)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      'disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  >
    {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
    {children}
  </ToolbarPrimitive.ToggleItem>
));
ToolbarToggleItem.displayName = 'ToolbarToggleItem';

// ─── ToolbarSeparator ───────────────────────────────────────────────────────

const ToolbarSeparator = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Separator>,
  ToolbarSeparatorProps
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn(
      'mx-1 w-px self-stretch bg-[var(--color-toolbar-separator)]',
      className
    )}
    {...props}
  />
));
ToolbarSeparator.displayName = 'ToolbarSeparator';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  ToolbarSeparator,
};
