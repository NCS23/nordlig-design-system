import React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export type NavigationMenuProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Root
>;

export type NavigationMenuListProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.List
>;

export type NavigationMenuItemProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Item
>;

export interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {}

export interface NavigationMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {}

export interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
  active?: boolean;
}

// ─── NavigationMenu Root ────────────────────────────────────────────────────

const NavigationMenu = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative flex items-center', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = 'NavigationMenu';

// ─── NavigationMenuList ─────────────────────────────────────────────────────

const NavigationMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn('flex items-center gap-1', className)}
    {...props}
  />
));
NavigationMenuList.displayName = 'NavigationMenuList';

// ─── NavigationMenuItem ─────────────────────────────────────────────────────

const NavigationMenuItem = NavigationMenuPrimitive.Item;
NavigationMenuItem.displayName = 'NavigationMenuItem';

// ─── NavigationMenuTrigger ──────────────────────────────────────────────────

const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      'group inline-flex items-center gap-1 px-3 py-2 text-sm font-medium',
      'rounded-[var(--radius-nav)]',
      'text-[var(--color-text-base)]',
      'hover:bg-[var(--color-bg-muted)]',
      'transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      'data-[state=open]:bg-[var(--color-bg-muted)]',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown
      size={14}
      aria-hidden="true"
      className="transition-transform duration-200 group-data-[state=open]:rotate-180"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

// ─── NavigationMenuContent ──────────────────────────────────────────────────

const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'absolute top-full left-0 mt-1',
      'bg-[var(--color-dropdown-bg)]',
      'border border-[var(--color-dropdown-border)]',
      'rounded-[var(--radius-dropdown)]',
      '[box-shadow:var(--shadow-dropdown)]',
      'p-4 min-w-[220px]',
      'data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in-0 data-[motion=from-start]:slide-in-from-left-2',
      'data-[motion=from-end]:animate-in data-[motion=from-end]:fade-in-0 data-[motion=from-end]:slide-in-from-right-2',
      'data-[motion=to-start]:animate-out data-[motion=to-start]:fade-out-0',
      'data-[motion=to-end]:animate-out data-[motion=to-end]:fade-out-0',
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = 'NavigationMenuContent';

// ─── NavigationMenuLink ─────────────────────────────────────────────────────

const NavigationMenuLink = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ className, active, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(
      'block px-3 py-2 text-sm',
      'rounded-[var(--radius-nav)]',
      'text-[var(--color-text-base)]',
      'hover:bg-[var(--color-bg-muted)]',
      'transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      active && 'bg-[var(--color-bg-muted)] font-medium',
      className
    )}
    active={active}
    {...props}
  />
));
NavigationMenuLink.displayName = 'NavigationMenuLink';

// ─── NavigationMenuViewport ─────────────────────────────────────────────────

const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute top-full left-0 w-full">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        'relative mt-1 overflow-hidden',
        'h-[var(--radix-navigation-menu-viewport-height)]',
        'w-[var(--radix-navigation-menu-viewport-width)]',
        'origin-top',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        className
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
};
