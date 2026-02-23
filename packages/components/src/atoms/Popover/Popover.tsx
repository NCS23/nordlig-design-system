import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

// Re-export Root and Trigger
const Popover = PopoverPrimitive.Root;
Popover.displayName = 'Popover';

const PopoverTrigger = PopoverPrimitive.Trigger;
PopoverTrigger.displayName = 'PopoverTrigger';

// PopoverContent with styling
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, showArrow = false, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-auto',
        'bg-[var(--color-popover-bg)] text-[var(--color-popover-text)] text-[length:var(--font-popover-content-size)]',
        'border border-[var(--color-popover-border)]',
        'rounded-[var(--radius-popover)]',
        '[box-shadow:var(--shadow-popover)]',
        'p-[var(--spacing-popover-padding)]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'duration-200',
        className
      )}
      {...props}
    >
      {children}
      {showArrow && (
        <PopoverPrimitive.Arrow
          className="fill-[var(--color-popover-bg)]"
          width={12}
          height={6}
        />
      )}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = 'PopoverContent';

const PopoverArrow = PopoverPrimitive.Arrow;
PopoverArrow.displayName = 'PopoverArrow';

export { Popover, PopoverTrigger, PopoverContent, PopoverArrow };
