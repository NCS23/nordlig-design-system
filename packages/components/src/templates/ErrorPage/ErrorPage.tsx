import React from 'react';
import { cn } from '../../utils/cn';

// ─── ErrorPage ──────────────────────────────────────────────────────────────

export interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Error code (e.g. "404", "500") */
  code?: string;
  /** Error title */
  title: string;
  /** Error description */
  description?: string;
  /** Illustration or icon slot (ReactNode) */
  illustration?: React.ReactNode;
  /** Action buttons slot (ReactNode) */
  actions?: React.ReactNode;
}

const ErrorPage = React.forwardRef<HTMLDivElement, ErrorPageProps>(
  ({ code, title, description, illustration, actions, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-[60vh] flex-col items-center justify-center',
        'bg-[var(--color-errorpage-bg)]',
        'text-center',
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-[var(--spacing-errorpage-content-gap)]" role="alert">
        {/* Illustration */}
        {illustration && (
          <div className="flex items-center justify-center" aria-hidden="true">
            {illustration}
          </div>
        )}

        {/* Text block */}
        <div className="flex flex-col items-center gap-[var(--spacing-errorpage-text-gap)]">
          {code && (
            <span
              className={cn(
                'text-[length:var(--font-errorpage-code-size)]',
                '[font-weight:var(--font-errorpage-code-weight)]',
                'text-[var(--color-errorpage-code-text)]'
              )}
              aria-hidden="true"
            >
              {code}
            </span>
          )}
          <h2
            className={cn(
              'text-[length:var(--font-errorpage-title-size)]',
              '[font-weight:var(--font-errorpage-title-weight)]'
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                'text-[length:var(--font-errorpage-desc-size)]',
                'text-[var(--color-errorpage-desc-text)]',
                'max-w-[28rem]'
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-[var(--spacing-errorpage-text-gap)]">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
);

ErrorPage.displayName = 'ErrorPage';

export { ErrorPage };
