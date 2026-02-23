import React from 'react';
import { cn } from '../../utils/cn';

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  label?: React.ReactNode;
  labelPosition?: 'left' | 'center' | 'right';
  icon?: React.ReactNode;
}

const Separator = React.forwardRef<HTMLElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, label, labelPosition = 'center', icon, className, ...props }, ref) => {
    const hasLabel = label || icon;

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

    if (hasLabel) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role={decorative ? 'none' : 'separator'}
          aria-hidden={decorative}
          className={cn('flex items-center gap-[var(--spacing-component-gap-sm)]', className)}
          {...props}
        >
          {labelPosition !== 'left' && (
            <span className="h-px flex-1 bg-[var(--color-separator)]" />
          )}
          <span className="shrink-0 flex items-center gap-[var(--spacing-component-gap-xs)] text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)]">
            {icon}
            {label}
          </span>
          {labelPosition !== 'right' && (
            <span className="h-px flex-1 bg-[var(--color-separator)]" />
          )}
        </div>
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
