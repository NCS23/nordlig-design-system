import React from 'react';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/emptypage';

export interface EmptyStatePageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Illustration oder Icon (ReactNode) */
  illustration?: React.ReactNode;
  /** Titel des Empty State */
  title: string;
  /** Beschreibungstext */
  description?: string;
  /** Aktionsslot (Buttons, Links) */
  actions?: React.ReactNode;
}

const EmptyStatePage = React.forwardRef<HTMLDivElement, EmptyStatePageProps>(
  ({ illustration, title, description, actions, className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn(
        'flex min-h-[60vh] flex-col items-center justify-center',
        'py-[var(--spacing-emptypage-padding-y)]',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex flex-col items-center text-center',
          'gap-[var(--spacing-emptypage-content-gap)]',
          'max-w-[var(--sizing-emptypage-max-width)]'
        )}
      >
        {/* Illustration */}
        {illustration && (
          <div
            className={cn(
              'flex items-center justify-center',
              'max-h-[var(--sizing-emptypage-illustration-size)]',
              'max-w-[var(--sizing-emptypage-illustration-size)]'
            )}
            aria-hidden="true"
          >
            {illustration}
          </div>
        )}

        {/* Textblock */}
        <div className="flex flex-col items-center gap-[var(--spacing-emptypage-text-gap)]">
          <h2
            className={cn(
              'text-[length:var(--font-emptypage-title-size)]',
              '[font-weight:var(--font-emptypage-title-weight)]',
              'text-[var(--color-emptypage-title-text)]'
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                'text-[length:var(--font-emptypage-desc-size)]',
                'text-[var(--color-emptypage-desc-text)]'
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Aktionen */}
        {actions && (
          <div className="flex items-center gap-[var(--spacing-emptypage-text-gap)]">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
);

EmptyStatePage.displayName = 'EmptyStatePage';

export { EmptyStatePage };
