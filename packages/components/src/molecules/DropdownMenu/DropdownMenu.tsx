import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/dropdown';
import '@nordlig/styles/tokens/text';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface DropdownMenuProps extends DropdownMenuPrimitive.DropdownMenuProps {}

export interface DropdownMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {}

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** Destructive/danger styling */
  destructive?: boolean;
  /** Optional icon before text */
  icon?: React.ReactNode;
}

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {}

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {}

// ─── DropdownMenu Root ──────────────────────────────────────────────────────

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, ...props }) => (
  <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>
);
DropdownMenu.displayName = 'DropdownMenu';

// ─── DropdownMenuTrigger ────────────────────────────────────────────────────

const DropdownMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownMenuTriggerProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger ref={ref} asChild {...props}>
    {children}
  </DropdownMenuPrimitive.Trigger>
));
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

// ─── DropdownMenuContent ────────────────────────────────────────────────────

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden',
        'bg-[var(--color-dropdown-bg)] text-[var(--color-text-base)]',
        'border border-[var(--color-dropdown-border)]',
        'rounded-[var(--radius-dropdown-menu)]',
        '[box-shadow:var(--shadow-dropdown-menu)]',
        'p-[var(--spacing-dropdown-padding)]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

// ─── DropdownMenuItem ───────────────────────────────────────────────────────

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, destructive = false, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex items-center',
      'gap-[var(--spacing-dropdown-item-gap)]',
      'px-[var(--spacing-dropdown-item-padding-x)] py-[var(--spacing-dropdown-item-padding-y)]',
      'rounded-[var(--radius-dropdown-item)]',
      'text-[length:var(--font-dropdown-item-size)] outline-none cursor-pointer select-none',
      'transition-colors',
      destructive
        ? [
            'text-[var(--color-dropdown-destructive-text)]',
            'focus:bg-[var(--color-dropdown-destructive-hover-bg)]',
          ].join(' ')
        : [
            'text-[var(--color-dropdown-item-text)]',
            'focus:bg-[var(--color-dropdown-item-hover-bg)]',
          ].join(' '),
      'data-[disabled]:pointer-events-none data-[disabled]:text-[var(--color-dropdown-item-disabled-text)] data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    {icon && (
      <span className={cn(
        'shrink-0 [&>svg]:h-[var(--sizing-dropdown-item-icon)] [&>svg]:w-[var(--sizing-dropdown-item-icon)]',
        destructive
          ? 'text-[var(--color-dropdown-destructive-text)]'
          : 'text-[var(--color-dropdown-item-icon)]',
      )}>
        {icon}
      </span>
    )}
    {children}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

// ─── DropdownMenuSeparator ──────────────────────────────────────────────────

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      '-mx-[var(--spacing-dropdown-padding)] my-[var(--spacing-dropdown-separator-my)] h-px',
      'bg-[var(--color-dropdown-separator)]',
      className
    )}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

// ─── DropdownMenuLabel ──────────────────────────────────────────────────────

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-[var(--spacing-dropdown-item-padding-x)] py-[var(--spacing-dropdown-item-padding-y)]',
      'text-[length:var(--font-dropdown-label-size)] [font-weight:var(--font-dropdown-label-weight)] text-[var(--color-dropdown-label-text)]',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
