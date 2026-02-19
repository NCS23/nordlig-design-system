import React from 'react';
import { Drawer as DrawerPrimitive, type DialogProps } from 'vaul';
import { cn } from '../../utils/cn';

// ─── Drawer Root ─────────────────────────────────────────────────────────────

export type DrawerProps = DialogProps & {
  shouldScaleBackground?: boolean;
};

const Drawer = ({ shouldScaleBackground = true, ...props }: DrawerProps) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = 'Drawer';

// ─── DrawerTrigger ───────────────────────────────────────────────────────────

const DrawerTrigger = DrawerPrimitive.Trigger;
DrawerTrigger.displayName = 'DrawerTrigger';

// ─── DrawerClose ─────────────────────────────────────────────────────────────

const DrawerClose = DrawerPrimitive.Close;
DrawerClose.displayName = 'DrawerClose';

// ─── DrawerOverlay (intern) ──────────────────────────────────────────────────

const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-[var(--color-drawer-overlay)]', className)}
    {...props}
  />
));
DrawerOverlay.displayName = 'DrawerOverlay';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  showHandle?: boolean;
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> {}
export interface DrawerDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> {}
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// ─── DrawerContent ───────────────────────────────────────────────────────────

const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, showHandle = true, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[96vh] flex-col',
        'bg-[var(--color-drawer-bg)]',
        'border-t border-[var(--color-drawer-border)]',
        'rounded-t-[var(--radius-drawer)]',
        '[box-shadow:var(--shadow-drawer)]',
        className
      )}
      {...props}
    >
      {showHandle && (
        <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-[var(--color-drawer-handle)]" />
      )}
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
));
DrawerContent.displayName = 'DrawerContent';

// ─── DrawerHeader ────────────────────────────────────────────────────────────

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--spacing-drawer-gap)] p-[var(--spacing-drawer-padding)]',
        className
      )}
      {...props}
    />
  )
);
DrawerHeader.displayName = 'DrawerHeader';

// ─── DrawerTitle ─────────────────────────────────────────────────────────────

const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-[var(--color-drawer-title)]', className)}
    {...props}
  />
));
DrawerTitle.displayName = 'DrawerTitle';

// ─── DrawerDescription ───────────────────────────────────────────────────────

const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--color-drawer-description)]', className)}
    {...props}
  />
));
DrawerDescription.displayName = 'DrawerDescription';

// ─── DrawerFooter ────────────────────────────────────────────────────────────

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-[var(--spacing-drawer-gap)] p-[var(--spacing-drawer-padding)] pt-2',
        className
      )}
      {...props}
    />
  )
);
DrawerFooter.displayName = 'DrawerFooter';

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
};
