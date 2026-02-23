import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Sheet Root ─────────────────────────────────────────────────────────────

const Sheet = DialogPrimitive.Root;
Sheet.displayName = 'Sheet';

// ─── SheetTrigger ───────────────────────────────────────────────────────────

const SheetTrigger = DialogPrimitive.Trigger;
SheetTrigger.displayName = 'SheetTrigger';

// ─── SheetOverlay ───────────────────────────────────────────────────────────

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[var(--color-sheet-overlay)]',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = 'SheetOverlay';

// ─── CVA: SheetContent Side ─────────────────────────────────────────────────

const sheetContentVariants = cva(
  [
    'fixed z-50',
    'bg-[var(--color-sheet-bg)] text-[var(--color-text-base)]',
    'border-[var(--color-sheet-border)]',
    '[box-shadow:var(--shadow-sheet)]',
    'p-[var(--spacing-sheet-padding)]',
    'flex flex-col',
    'transition-transform duration-300 ease-in-out',
  ].join(' '),
  {
    variants: {
      side: {
        right: [
          'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l',
          'data-[state=open]:animate-in data-[state=open]:slide-in-from-right',
          'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right',
        ].join(' '),
        left: [
          'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r',
          'data-[state=open]:animate-in data-[state=open]:slide-in-from-left',
          'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left',
        ].join(' '),
        top: [
          'inset-x-0 top-0 w-full border-b',
          'data-[state=open]:animate-in data-[state=open]:slide-in-from-top',
          'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top',
        ].join(' '),
        bottom: [
          'inset-x-0 bottom-0 w-full border-t',
          'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom',
          'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom',
        ].join(' '),
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {}

export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SheetTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}
export interface SheetDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// ─── SheetContent ───────────────────────────────────────────────────────────

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, side = 'right', ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetContentVariants({ side, className }))}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          'absolute right-[var(--spacing-sheet-close-inset)] top-[var(--spacing-sheet-close-inset)] inline-flex items-center justify-center',
          'h-[var(--sizing-sheet-close-size)] w-[var(--sizing-sheet-close-size)] rounded-[var(--radius-component-sm)]',
          'text-[var(--color-sheet-description)]',
          'transition-colors',
          'hover:bg-[var(--color-sheet-border)] hover:text-[var(--color-sheet-title)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
        )}
        aria-label="Schliessen"
      >
        <Icon icon={X} size="sm" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = 'SheetContent';

// ─── SheetHeader ────────────────────────────────────────────────────────────

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-[var(--spacing-sheet-header-gap)] mb-[var(--spacing-sheet-header-mb)]', className)}
      {...props}
    />
  )
);
SheetHeader.displayName = 'SheetHeader';

// ─── SheetTitle ─────────────────────────────────────────────────────────────

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  SheetTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-[length:var(--font-sheet-title-size)] [font-weight:var(--font-sheet-title-weight)] text-[var(--color-sheet-title)]',
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

// ─── SheetDescription ───────────────────────────────────────────────────────

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-[length:var(--font-sheet-description-size)] text-[var(--color-sheet-description)]',
      className
    )}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

// ─── SheetFooter ────────────────────────────────────────────────────────────

const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-[var(--spacing-sheet-footer-gap)] mt-auto pt-[var(--spacing-sheet-footer-pt)]',
        className
      )}
      {...props}
    />
  )
);
SheetFooter.displayName = 'SheetFooter';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  sheetContentVariants,
};
