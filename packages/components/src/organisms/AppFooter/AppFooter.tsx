import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AppFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Oberer Rand anzeigen (Standard: true) */
  bordered?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AppFooter = React.forwardRef<HTMLElement, AppFooterProps>(
  ({ className, children, bordered = true, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        'flex items-center shrink-0',
        'h-[var(--sizing-footer-height)]',
        'px-[var(--spacing-footer-px)] py-[var(--spacing-footer-py)]',
        'bg-[var(--color-footer-bg)] text-[var(--color-text-base)]',
        bordered && 'border-t border-[var(--color-footer-border)]',
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  ),
);

AppFooter.displayName = 'AppFooter';

export { AppFooter };
