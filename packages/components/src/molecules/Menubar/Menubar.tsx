import React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface MenubarProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> {}

export interface MenubarMenuProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu> {}

export interface MenubarTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> {}

export interface MenubarContentProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> {}

export interface MenubarItemProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  /** Destructive/danger styling */
  destructive?: boolean;
  /** Optional icon before text */
  icon?: React.ReactNode;
}

export interface MenubarSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> {}

export interface MenubarLabelProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> {}

export interface MenubarShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export interface MenubarCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> {}

export interface MenubarRadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup> {}

export interface MenubarRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> {}

// ─── Menubar Root ───────────────────────────────────────────────────────────

const Menubar = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'flex h-10 items-center gap-1',
      'bg-[var(--color-menubar-bg)]',
      'border border-[var(--color-menubar-border)]',
      'rounded-[var(--radius-menubar-bar)]',
      'p-[var(--spacing-menubar-padding)]',
      className
    )}
    {...props}
  />
));
Menubar.displayName = 'Menubar';

// ─── MenubarMenu ────────────────────────────────────────────────────────────

const MenubarMenu: React.FC<React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>> = MenubarPrimitive.Menu;
MenubarMenu.displayName = 'MenubarMenu';

// ─── MenubarTrigger ─────────────────────────────────────────────────────────

const MenubarTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center',
      'px-[var(--spacing-menubar-trigger-padding-x)] py-[var(--spacing-menubar-trigger-padding-y)]',
      'rounded-[var(--radius-menubar-item)]',
      'text-sm font-medium text-[var(--color-menubar-trigger-text)]',
      'transition-colors cursor-pointer select-none outline-none',
      'hover:bg-[var(--color-menubar-trigger-hover-bg)]',
      'data-[state=open]:bg-[var(--color-menubar-trigger-active-bg)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = 'MenubarTrigger';

// ─── MenubarContent ─────────────────────────────────────────────────────────

const MenubarContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(({ className, sideOffset = 8, alignOffset = -4, align = 'start', ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      align={align}
      className={cn(
        'z-50 min-w-[12rem] overflow-hidden',
        'bg-[var(--color-dropdown-bg)]',
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
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = 'MenubarContent';

// ─── MenubarItem ────────────────────────────────────────────────────────────

const MenubarItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(({ className, destructive = false, icon, children, ...props }, ref) => (
  <MenubarPrimitive.Item
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
  </MenubarPrimitive.Item>
));
MenubarItem.displayName = 'MenubarItem';

// ─── MenubarSeparator ───────────────────────────────────────────────────────

const MenubarSeparator = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Separator>,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn(
      '-mx-[var(--spacing-dropdown-padding)] my-1 h-px',
      'bg-[var(--color-dropdown-separator)]',
      className
    )}
    {...props}
  />
));
MenubarSeparator.displayName = 'MenubarSeparator';

// ─── MenubarLabel ───────────────────────────────────────────────────────────

const MenubarLabel = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Label>,
  MenubarLabelProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'px-[var(--spacing-dropdown-item-padding-x)] py-[var(--spacing-dropdown-item-padding-y)]',
      'text-xs font-semibold text-[var(--color-dropdown-label-text)]',
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = 'MenubarLabel';

// ─── MenubarShortcut ────────────────────────────────────────────────────────

const MenubarShortcut = React.forwardRef<
  HTMLSpanElement,
  MenubarShortcutProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'ml-auto text-xs tracking-widest text-[var(--color-dropdown-label-text)]',
      className
    )}
    {...props}
  />
));
MenubarShortcut.displayName = 'MenubarShortcut';

// ─── MenubarCheckboxItem ────────────────────────────────────────────────────

const MenubarCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
  MenubarCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      'relative flex items-center pl-8',
      'px-[var(--spacing-dropdown-item-padding-x)] py-[var(--spacing-dropdown-item-padding-y)]',
      'rounded-[var(--radius-dropdown-item)]',
      'text-sm outline-none cursor-pointer select-none',
      'transition-colors',
      'text-[var(--color-dropdown-item-text)]',
      'focus:bg-[var(--color-dropdown-item-hover-bg)]',
      'data-[disabled]:pointer-events-none data-[disabled]:text-[var(--color-dropdown-item-disabled-text)] data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check size={14} />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

// ─── MenubarRadioGroup ──────────────────────────────────────────────────────

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;
MenubarRadioGroup.displayName = 'MenubarRadioGroup';

// ─── MenubarRadioItem ───────────────────────────────────────────────────────

const MenubarRadioItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.RadioItem>,
  MenubarRadioItemProps
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex items-center pl-8',
      'px-[var(--spacing-dropdown-item-padding-x)] py-[var(--spacing-dropdown-item-padding-y)]',
      'rounded-[var(--radius-dropdown-item)]',
      'text-sm outline-none cursor-pointer select-none',
      'transition-colors',
      'text-[var(--color-dropdown-item-text)]',
      'focus:bg-[var(--color-dropdown-item-hover-bg)]',
      'data-[disabled]:pointer-events-none data-[disabled]:text-[var(--color-dropdown-item-disabled-text)] data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle size={8} fill="currentColor" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = 'MenubarRadioItem';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
};
