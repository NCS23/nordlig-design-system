import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ─── Overlay ─────────────────────────────────────────────────────────────────

const ModalOverlay = React.forwardRef<
  React.ComponentRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[var(--color-modal-overlay)]',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = 'ModalOverlay';

// ─── Content Variants ────────────────────────────────────────────────────────

const modalContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'w-full bg-[var(--color-modal-bg)]',
    'rounded-[var(--radius-modal)] [box-shadow:var(--shadow-modal-content)]',
    'flex flex-col max-h-[90vh]',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'duration-200',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ModalProps extends Dialog.DialogProps {
  children: React.ReactNode;
}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof modalContentVariants> {
  showClose?: boolean;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalTitleProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Title> {}
export interface ModalDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Description> {}
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Trigger> {}

// ─── Modal Root ──────────────────────────────────────────────────────────────

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
};
Modal.displayName = 'Modal';

// ─── ModalTrigger ────────────────────────────────────────────────────────────

const ModalTrigger = React.forwardRef<
  React.ComponentRef<typeof Dialog.Trigger>,
  ModalTriggerProps
>(({ children, ...props }, ref) => (
  <Dialog.Trigger ref={ref} asChild {...props}>
    {children}
  </Dialog.Trigger>
));
ModalTrigger.displayName = 'ModalTrigger';

// ─── ModalContent ────────────────────────────────────────────────────────────

const ModalContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  ModalContentProps
>(({ className, children, size, showClose = true, ...props }, ref) => (
  <Dialog.Portal>
    <ModalOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(modalContentVariants({ size, className }))}
      {...props}
    >
      {children}
      {showClose && (
        <Dialog.Close
          className={cn(
            'absolute right-4 top-4 inline-flex items-center justify-center',
            'h-8 w-8 rounded-[var(--radius-modal)]',
            'text-[var(--color-modal-description)] transition-colors',
            'hover:bg-[var(--color-modal-close-hover-bg)] hover:text-[var(--color-modal-close-hover-text)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
          )}
          aria-label="Schließen"
        >
          <X size={16} />
        </Dialog.Close>
      )}
    </Dialog.Content>
  </Dialog.Portal>
));
ModalContent.displayName = 'ModalContent';

// ─── ModalHeader ─────────────────────────────────────────────────────────────

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-1',
        'px-[var(--spacing-modal-padding-x)] py-[var(--spacing-modal-padding-y)]',
        'border-b border-[var(--color-modal-divider)]',
        className
      )}
      {...props}
    />
  )
);
ModalHeader.displayName = 'ModalHeader';

// ─── ModalTitle ──────────────────────────────────────────────────────────────

const ModalTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  ModalTitleProps
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-[var(--color-modal-title)]',
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

// ─── ModalDescription ────────────────────────────────────────────────────────

const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn(
      'text-sm text-[var(--color-modal-description)]',
      className
    )}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

// ─── ModalBody ───────────────────────────────────────────────────────────────

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1 overflow-auto px-[var(--spacing-modal-padding-x)] py-[var(--spacing-modal-padding-y)]',
        className
      )}
      {...props}
    />
  )
);
ModalBody.displayName = 'ModalBody';

// ─── ModalFooter ─────────────────────────────────────────────────────────────

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-[var(--spacing-modal-gap)]',
        'px-[var(--spacing-modal-padding-x)] py-[var(--spacing-modal-padding-y)]',
        'border-t border-[var(--color-modal-divider)]',
        className
      )}
      {...props}
    />
  )
);
ModalFooter.displayName = 'ModalFooter';

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  modalContentVariants,
};
