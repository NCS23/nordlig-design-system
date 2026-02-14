import React from 'react';
import { cn } from '../../utils/cn';

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role={decorative ? 'none' : 'separator'}
          aria-orientation="vertical"
          aria-hidden={decorative}
          className={cn('shrink-0 border-l border-[var(--color-separator)]', className)}
          {...props}
        />
      );
    }
    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        role={decorative ? 'none' : 'separator'}
        aria-hidden={decorative}
        className={cn('shrink-0 border-t border-[var(--color-separator)] border-b-0 border-l-0 border-r-0', className)}
        {...props}
      />
    );
  }
);
Separator.displayName = 'Separator';

export { Separator };
