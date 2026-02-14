import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ─── Variant Context ────────────────────────────────────────────────────────

type TabsVariant = 'underline' | 'pills';

const TabsVariantContext = React.createContext<TabsVariant>('underline');

// ─── CVA: TabsList ──────────────────────────────────────────────────────────

const tabsListVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      underline: 'w-full border-b border-[var(--color-tabs-border)]',
      pills: [
        'bg-[var(--color-tabs-list-bg)]',
        'p-[var(--spacing-tabs-list-padding)]',
        'gap-[var(--spacing-tabs-list-gap)]',
        'rounded-[var(--radius-tabs-list)]',
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: 'underline',
  },
});

// ─── CVA: TabsTrigger ───────────────────────────────────────────────────────

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'px-[var(--spacing-tabs-trigger-padding-x)] py-[var(--spacing-tabs-trigger-padding-y)]',
    'text-sm font-medium transition-all',
    'text-[var(--color-tabs-trigger-text)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tabs-underline)] focus-visible:ring-offset-1',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        underline: [
          '-mb-px border-b-2 border-transparent',
          'hover:text-[var(--color-tabs-trigger-text-hover)] hover:bg-[var(--color-tabs-trigger-hover-bg)]',
          'data-[state=active]:border-[var(--color-tabs-underline)]',
          'data-[state=active]:text-[var(--color-tabs-trigger-text-active)]',
        ].join(' '),
        pills: [
          'rounded-[var(--radius-tabs-trigger)]',
          'hover:text-[var(--color-tabs-trigger-text-hover)]',
          'data-[state=active]:bg-[var(--color-tabs-trigger-bg-active)]',
          'data-[state=active]:text-[var(--color-tabs-trigger-text-active)]',
          'data-[state=active]:[box-shadow:var(--shadow-tabs-trigger-active)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'underline',
    },
  }
);

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

// ─── Tabs Root ──────────────────────────────────────────────────────────────

const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn('w-full', className)} {...props} />
));
Tabs.displayName = 'Tabs';

// ─── TabsList ───────────────────────────────────────────────────────────────

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = 'underline', ...props }, ref) => (
  <TabsVariantContext.Provider value={variant ?? 'underline'}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  </TabsVariantContext.Provider>
));
TabsList.displayName = 'TabsList';

// ─── TabsTrigger ────────────────────────────────────────────────────────────

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => {
  const variant: TabsVariant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

// ─── TabsContent ────────────────────────────────────────────────────────────

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'pt-[var(--spacing-tabs-content-padding)]',
      'text-[var(--color-tabs-content-text)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tabs-underline)] focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
