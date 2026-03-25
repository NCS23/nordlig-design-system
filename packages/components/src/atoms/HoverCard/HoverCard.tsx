import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/hovercard';

const HoverCard = HoverCardPrimitive.Root;
HoverCard.displayName = 'HoverCard';

const HoverCardTrigger = HoverCardPrimitive.Trigger;
HoverCardTrigger.displayName = 'HoverCardTrigger';

export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  showArrow?: boolean;
}

const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, showArrow = false, children, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-auto',
        'bg-[var(--color-hovercard-bg)] text-[var(--color-hovercard-text)] text-[length:var(--font-hovercard-content-size)]',
        'border border-[var(--color-hovercard-border)]',
        'rounded-[var(--radius-hovercard)]',
        '[box-shadow:var(--shadow-hovercard)]',
        'p-[var(--spacing-hovercard-padding)]',
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
        <HoverCardPrimitive.Arrow
          className="fill-[var(--color-hovercard-bg)]"
          width={12}
          height={6}
        />
      )}
    </HoverCardPrimitive.Content>
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = 'HoverCardContent';

export { HoverCard, HoverCardTrigger, HoverCardContent };
