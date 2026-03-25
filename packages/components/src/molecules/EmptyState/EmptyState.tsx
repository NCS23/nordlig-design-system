import React from 'react';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/emptystate';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'error' | 'success';
}

const variantIconClassMap = {
  default: 'text-[var(--color-emptystate-icon)]',
  error: 'text-[var(--color-emptystate-icon-error)]',
  success: 'text-[var(--color-emptystate-icon-success)]',
};

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, variant = 'default', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center py-[var(--spacing-emptystate-padding-y)] px-[var(--spacing-emptystate-padding-x)]',
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cn('mb-[var(--spacing-emptystate-icon-mb)]', variantIconClassMap[variant])}>
            {icon}
          </div>
        )}
        <h3 className="text-[length:var(--font-emptystate-title-size)] [font-weight:var(--font-emptystate-title-weight)] text-[var(--color-emptystate-title)] mb-[var(--spacing-emptystate-title-mb)]">
          {title}
        </h3>
        {description && (
          <p className="text-[length:var(--font-emptystate-desc-size)] text-[var(--color-emptystate-description)] max-w-sm mb-[var(--spacing-emptystate-desc-mb)]">
            {description}
          </p>
        )}
        {action && <div>{action}</div>}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
