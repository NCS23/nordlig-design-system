import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '../../utils/cn';

// ─── AlertDialog Root ──────────────────────────────────────────────────────

const AlertDialog = AlertDialogPrimitive.Root;
AlertDialog.displayName = 'AlertDialog';

// ─── AlertDialogTrigger ────────────────────────────────────────────────────

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

// ─── AlertDialogOverlay (intern) ───────────────────────────────────────────

const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-40 bg-[var(--color-alertdlg-overlay)]',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = 'AlertDialogOverlay';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {}

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {}
export interface AlertDialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {}
export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {}
export interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {}

// ─── AlertDialogContent ────────────────────────────────────────────────────

const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogOverlay />
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          'w-full max-w-lg',
          'bg-[var(--color-alertdlg-bg)] text-[var(--color-text-base)]',
          'border border-[var(--color-alertdlg-border)]',
          'rounded-[var(--radius-alertdlg)]',
          '[box-shadow:var(--shadow-alertdlg)]',
          'p-[var(--spacing-alertdlg-padding)]',
          'flex flex-col gap-[var(--spacing-alertdlg-gap)]',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'duration-200',
          className
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </div>
  </AlertDialogPrimitive.Portal>
));
AlertDialogContent.displayName = 'AlertDialogContent';

// ─── AlertDialogHeader ─────────────────────────────────────────────────────

const AlertDialogHeader = React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-[var(--spacing-alertdlg-gap)]', className)}
      {...props}
    />
  )
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

// ─── AlertDialogTitle ──────────────────────────────────────────────────────

const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-[length:var(--font-alertdlg-title-size)] [font-weight:var(--font-alertdlg-title-weight)] text-[var(--color-alertdlg-title)]',
      className
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = 'AlertDialogTitle';

// ─── AlertDialogDescription ────────────────────────────────────────────────

const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-[length:var(--font-alertdlg-desc-size)] text-[var(--color-alertdlg-description)]',
      className
    )}
    {...props}
  />
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

// ─── AlertDialogFooter ─────────────────────────────────────────────────────

const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex justify-end gap-[var(--spacing-alertdlg-gap)] pt-[var(--spacing-alertdlg-gap)]', className)}
      {...props}
    />
  )
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

// ─── AlertDialogAction ─────────────────────────────────────────────────────

const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center',
      'rounded-[var(--radius-alertdlg)]',
      'min-h-[44px] px-4 py-2 text-[length:var(--font-alertdlg-action-size)] [font-weight:var(--font-alertdlg-action-weight)]',
      'transition-colors',
      'bg-[var(--color-alertdlg-action-bg)]',
      'text-[var(--color-alertdlg-action-text)]',
      'hover:bg-[var(--color-alertdlg-action-hover-bg)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      className
    )}
    {...props}
  />
));
AlertDialogAction.displayName = 'AlertDialogAction';

// ─── AlertDialogCancel ─────────────────────────────────────────────────────

const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center',
      'rounded-[var(--radius-alertdlg)]',
      'border border-[var(--color-border-default)]',
      'min-h-[44px] px-4 py-2 text-[length:var(--font-alertdlg-action-size)] [font-weight:var(--font-alertdlg-action-weight)]',
      'transition-colors',
      'bg-[var(--color-alertdlg-cancel-bg)]',
      'text-[var(--color-alertdlg-cancel-text)]',
      'hover:bg-[var(--color-alertdlg-cancel-hover-bg)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = 'AlertDialogCancel';

// ─── Exports ───────────────────────────────────────────────────────────────

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
