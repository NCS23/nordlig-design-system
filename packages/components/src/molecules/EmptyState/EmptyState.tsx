import React from 'react';
import { cn } from '../../utils/cn';

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
          'flex flex-col items-center justify-center text-center py-12 px-4',
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cn('mb-4', variantIconClassMap[variant])}>
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-[var(--color-emptystate-title)] mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--color-emptystate-description)] max-w-sm mb-6">
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
