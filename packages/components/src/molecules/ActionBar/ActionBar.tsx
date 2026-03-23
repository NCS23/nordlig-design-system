import React from 'react';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/actionbar';

// ─── Types ───────────────────────────────────────────────────────────────────

/** Props for the ActionBar — a sticky bottom bar for edit-mode actions. */
export interface ActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the bar sticks to the bottom of the viewport (default: true). */
  sticky?: boolean;
}

// ─── ActionBar ───────────────────────────────────────────────────────────────

const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
  ({ className, sticky = true, children, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      className={cn(
        sticky && 'sticky bottom-0 z-40',
        'bg-[var(--color-actionbar-bg)]',
        'border-t border-[var(--color-actionbar-border)]',
        'rounded-t-[var(--radius-actionbar)]',
        '[box-shadow:var(--shadow-actionbar-default)]',
        'px-[var(--spacing-actionbar-padding-x)] py-[var(--spacing-actionbar-padding-y)]',
        'flex items-center justify-between gap-[var(--spacing-actionbar-gap)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ActionBar.displayName = 'ActionBar';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { ActionBar };
