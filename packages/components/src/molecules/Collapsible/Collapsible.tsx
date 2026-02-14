import React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export type CollapsibleProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Root
>;

export interface CollapsibleContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {}

// ─── Collapsible Root ───────────────────────────────────────────────────────

const Collapsible = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
Collapsible.displayName = 'Collapsible';

// ─── CollapsibleTrigger ─────────────────────────────────────────────────────

const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

// ─── CollapsibleContent ─────────────────────────────────────────────────────

const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'data-[state=open]:slide-in-from-top-1',
      'data-[state=closed]:slide-out-to-top-1',
      'duration-200',
      className
    )}
    {...props}
  />
));
CollapsibleContent.displayName = 'CollapsibleContent';

// ─── Exports ────────────────────────────────────────────────────────────────

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
