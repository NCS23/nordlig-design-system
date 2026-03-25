import React from 'react';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/authlayout';

// ─── AuthLayout ─────────────────────────────────────────────────────────────

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo element rendered above the card */
  logo?: React.ReactNode;
  /** Footer content (links like "Register", "Forgot password") */
  footer?: React.ReactNode;
  /** Background element (illustration/pattern) rendered behind the card */
  background?: React.ReactNode;
}

const AuthLayout = React.forwardRef<HTMLDivElement, AuthLayoutProps>(
  ({ logo, footer, background, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex min-h-screen items-center justify-center',
        'bg-[var(--color-auth-bg)]',
        className
      )}
      {...props}
    >
      {/* Background layer */}
      {background && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {background}
        </div>
      )}

      {/* Content layer */}
      <div className="relative z-10 flex w-full flex-col items-center px-4">
        {/* Logo */}
        {logo && (
          <div className="mb-[var(--spacing-auth-logo-gap)]">{logo}</div>
        )}

        {/* Card */}
        <div
          className={cn(
            'w-full',
            'max-w-[var(--sizing-auth-card-max-width)]',
            'p-[var(--spacing-auth-card-padding)]',
            'bg-[var(--color-auth-card-bg)]',
            'border border-[var(--color-auth-card-border)]',
            'rounded-[var(--radius-auth-card)]',
            '[box-shadow:var(--shadow-auth-card)]'
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              'mt-[var(--spacing-auth-footer-gap)]',
              'text-[var(--color-auth-footer-text)]'
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
);

AuthLayout.displayName = 'AuthLayout';

export { AuthLayout };
