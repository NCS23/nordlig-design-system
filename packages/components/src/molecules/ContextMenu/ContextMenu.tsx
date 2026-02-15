import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export type ContextMenuProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>;

export interface ContextMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger> {}

export interface ContextMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> {}

export interface ContextMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> {
  /** Destructive/danger styling */
  destructive?: boolean;
  /** Optional icon before text */
  icon?: React.ReactNode;
}

export interface ContextMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> {}

export interface ContextMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> {}

export interface ContextMenuShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

// ─── ContextMenu Root ───────────────────────────────────────────────────────

const ContextMenu: React.FC<ContextMenuProps> = ({ children, ...props }) => (
  <ContextMenuPrimitive.Root {...props}>{children}</ContextMenuPrimitive.Root>
);
ContextMenu.displayName = 'ContextMenu';

// ─── ContextMenuTrigger ─────────────────────────────────────────────────────

const ContextMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Trigger>,
  ContextMenuTriggerProps
>(({ children, ...props }, ref) => (
  <ContextMenuPrimitive.Trigger ref={ref} asChild {...props}>
    {children}
  </ContextMenuPrimitive.Trigger>
));
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

// ─── ContextMenuContent ─────────────────────────────────────────────────────

const ContextMenuContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden',
        'bg-[var(--color-dropdown-bg)]',
        'border border-[var(--color-dropdown-border)]',
        'rounded-[var(--radius-dropdown-menu)]',
        '[box-shadow:var(--shadow-dropdown-menu)]',
        'p-[var(--spacing-dropdown-padding)]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = 'ContextMenuContent';

// ─── ContextMenuItem ────────────────────────────────────────────────────────

const ContextMenuItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(({ className, destructive = false, icon, children, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex items-center',
      'gap-[var(--spacing-dropdown-item-gap)]',
      'px-[var(--spacing-dropdown-item-padding-x)] py-[var(--spacing-dropdown-item-padding-y)]',
      'rounded-[var(--radius-dropdown-item)]',
      'text-sm outline-none cursor-pointer select-none',
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
        'shrink-0 [&>svg]:h-4 [&>svg]:w-4',
        destructive
          ? 'text-[var(--color-dropdown-destructive-text)]'
          : 'text-[var(--color-dropdown-item-icon)]',
      )}>
        {icon}
      </span>
    )}
    {children}
  </ContextMenuPrimitive.Item>
));
ContextMenuItem.displayName = 'ContextMenuItem';

// ─── ContextMenuSeparator ───────────────────────────────────────────────────

const ContextMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Separator>,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn(
      '-mx-[var(--spacing-dropdown-padding)] my-1 h-px',
      'bg-[var(--color-dropdown-separator)]',
      className
    )}
    {...props}
  />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

// ─── ContextMenuLabel ───────────────────────────────────────────────────────

const ContextMenuLabel = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Label>,
  ContextMenuLabelProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-[var(--spacing-dropdown-item-padding-x)] py-[var(--spacing-dropdown-item-padding-y)]',
      'text-xs font-semibold text-[var(--color-dropdown-label-text)]',
      className
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = 'ContextMenuLabel';

// ─── ContextMenuShortcut ────────────────────────────────────────────────────

const ContextMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  ContextMenuShortcutProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'ml-auto text-xs text-[var(--color-dropdown-label-text)]',
      className
    )}
    {...props}
  />
));
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
};
