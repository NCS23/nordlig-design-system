import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Dialog Root ────────────────────────────────────────────────────────────

const Dialog = DialogPrimitive.Root;
Dialog.displayName = 'Dialog';

// ─── DialogTrigger ──────────────────────────────────────────────────────────

const DialogTrigger = DialogPrimitive.Trigger;
DialogTrigger.displayName = 'DialogTrigger';

// ─── DialogOverlay ──────────────────────────────────────────────────────────

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[var(--color-dialog-overlay)]',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}
export interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// ─── DialogContent ──────────────────────────────────────────────────────────

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
        'w-full max-w-lg',
        'bg-[var(--color-dialog-bg)]',
        'border border-[var(--color-dialog-border)]',
        'rounded-[var(--radius-dialog)]',
        '[box-shadow:var(--shadow-dialog)]',
        'p-[var(--spacing-dialog-padding)]',
        'flex flex-col gap-[var(--spacing-dialog-gap)]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'duration-200',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          'absolute right-4 top-4 inline-flex items-center justify-center',
          'h-8 w-8 rounded-[var(--radius-dialog)]',
          'text-[var(--color-dialog-description)]',
          'transition-colors',
          'hover:bg-[var(--color-dialog-border)] hover:text-[var(--color-dialog-title)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
        )}
        aria-label="Schliessen"
      >
        <Icon icon={X} size="sm" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

// ─── DialogHeader ───────────────────────────────────────────────────────────

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-[var(--spacing-dialog-gap)]', className)}
      {...props}
    />
  )
);
DialogHeader.displayName = 'DialogHeader';

// ─── DialogTitle ────────────────────────────────────────────────────────────

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-[var(--color-dialog-title)]',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

// ─── DialogDescription ──────────────────────────────────────────────────────

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-sm text-[var(--color-dialog-description)]',
      className
    )}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

// ─── DialogFooter ───────────────────────────────────────────────────────────

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex justify-end gap-[var(--spacing-dialog-gap)]', className)}
      {...props}
    />
  )
);
DialogFooter.displayName = 'DialogFooter';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
