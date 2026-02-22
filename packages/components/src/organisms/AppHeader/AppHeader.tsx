import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Header klebt oben am Viewport */
  sticky?: boolean;
  /** Unterer Rand anzeigen (Standard: true) */
  bordered?: boolean;
  /** Schatten-Elevation anzeigen (Standard: true) */
  elevated?: boolean;
  /** z-index Schicht — erlaubt Template-Kontrolle */
  zIndex?: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  (
    {
      className,
      children,
      sticky = false,
      bordered = true,
      elevated = true,
      zIndex,
      style,
      ...props
    },
    ref,
  ) => (
    <header
      ref={ref}
      className={cn(
        'flex items-center shrink-0',
        'h-[var(--sizing-header-height)]',
        'px-[var(--spacing-header-px)] py-[var(--spacing-header-py)]',
        'gap-[var(--spacing-header-gap)]',
        'bg-[var(--color-header-bg)]',
        bordered && 'border-b border-[var(--color-header-border)]',
        elevated && '[box-shadow:var(--shadow-header)]',
        sticky && 'sticky top-0',
        className,
      )}
      style={zIndex != null ? { zIndex, ...style } : style}
      {...props}
    >
      {children}
    </header>
  ),
);

AppHeader.displayName = 'AppHeader';

export { AppHeader };
