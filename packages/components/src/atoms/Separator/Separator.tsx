import React from 'react';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/text';

/** Visual divider between content sections. Supports labels and icons. */
export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  /** Direction of the divider line.
   * @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** If true, the separator is purely visual and hidden from assistive technology.
   * @default true */
  decorative?: boolean;
  /** Optional text label rendered inline with the divider. */
  label?: React.ReactNode;
  /** Position of the label along the divider.
   * @default 'center' */
  labelPosition?: 'left' | 'center' | 'right';
  /** Optional icon rendered next to the label. */
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
