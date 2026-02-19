import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Types ──────────────────────────────────────────────────────────────────

export type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
>;

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

// ─── Accordion Root ─────────────────────────────────────────────────────────

const Accordion = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn('w-full', className)}
    {...props}
  />
));
Accordion.displayName = 'Accordion';

// ─── AccordionItem ──────────────────────────────────────────────────────────

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'bg-[var(--color-accordion-bg)]',
      'border-b border-[var(--color-accordion-border)]',
      'first:rounded-t-[var(--radius-accordion)] last:rounded-b-[var(--radius-accordion)]',
      'last:border-b-0',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

// ─── AccordionTrigger ───────────────────────────────────────────────────────

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between',
        'px-[var(--spacing-accordion-trigger-padding-x)] py-[var(--spacing-accordion-trigger-padding-y)]',
        'text-sm font-medium text-[var(--color-accordion-trigger-text)]',
        'transition-all',
        'hover:bg-[var(--color-accordion-trigger-hover-bg)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-tabs-underline)]',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <Icon
        icon={ChevronDown}
        size="sm"
        className="text-[var(--color-accordion-icon)] transition-transform duration-200"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

// ─── AccordionContent ───────────────────────────────────────────────────────

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm text-[var(--color-accordion-content-text)]',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1',
      'transition-all duration-200',
    )}
    {...props}
  >
    <div
      className={cn(
        'px-[var(--spacing-accordion-content-padding-x)] py-[var(--spacing-accordion-content-padding-y)]',
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';

// ─── Exports ────────────────────────────────────────────────────────────────

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
