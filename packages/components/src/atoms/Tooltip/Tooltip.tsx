import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  /** Tooltip content (text or rich content) */
  content: React.ReactNode;
  /** The trigger element */
  children: React.ReactNode;
  /** Preferred side for tooltip placement */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end';
  /** Delay before showing in ms */
  delayDuration?: number;
  /** Additional class names for tooltip content */
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 300,
  className,
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              'z-50 max-w-xs',
              'bg-[var(--color-tooltip-bg)] text-[var(--color-tooltip-text)]',
              'px-[var(--spacing-tooltip-padding-x)] py-[var(--spacing-tooltip-padding-y)]',
              'rounded-[var(--radius-tooltip)]',
              '[box-shadow:var(--shadow-tooltip)]',
              'text-[length:var(--font-tooltip-content-size)] leading-snug',
              'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              'data-[side=top]:slide-in-from-bottom-2',
              'data-[side=right]:slide-in-from-left-2',
              'data-[side=bottom]:slide-in-from-top-2',
              'data-[side=left]:slide-in-from-right-2',
              className
            )}
          >
            {content}
            <TooltipPrimitive.Arrow
              className="fill-[var(--color-tooltip-arrow)]"
              width={12}
              height={6}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };
