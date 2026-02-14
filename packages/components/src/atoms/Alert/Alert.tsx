import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const alertVariants = cva(
  'relative flex items-start gap-3 p-4 border-l-4 rounded-[var(--radius-alert)]',
  {
    variants: {
      variant: {
        info: 'bg-[var(--color-alert-info-bg)] border-l-[var(--color-alert-info-border)]',
        success: 'bg-[var(--color-alert-success-bg)] border-l-[var(--color-alert-success-border)]',
        warning: 'bg-[var(--color-alert-warning-bg)] border-l-[var(--color-alert-warning-border)]',
        error: 'bg-[var(--color-alert-error-bg)] border-l-[var(--color-alert-error-border)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const variantIconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const variantIconClassMap = {
  info: 'text-[var(--color-alert-info-icon)]',
  success: 'text-[var(--color-alert-success-icon)]',
  warning: 'text-[var(--color-alert-warning-icon)]',
  error: 'text-[var(--color-alert-error-icon)]',
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  closeable?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', closeable = false, onClose, children, ...props }, ref) => {
    const IconComponent = variantIconMap[variant || 'info'];
    const iconClass = variantIconClassMap[variant || 'info'];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        <IconComponent size={20} className={cn('shrink-0 mt-0.5', iconClass)} />
        <div className="flex-1 min-w-0">{children}</div>
        {closeable && (
          <button
            onClick={onClose}
            className="shrink-0 p-1 rounded-[var(--radius-alert)] hover:bg-black/5 transition-colors"
            aria-label="Schließen"
          >
            <X size={16} className="text-[var(--color-alert-title)] opacity-50" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

// Sub-components
export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('text-sm font-semibold text-[var(--color-alert-title)] mb-1', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm text-[var(--color-alert-description)]', className)}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';

// AlertClose is just the closeable prop on Alert, but export a standalone for flexibility
const AlertClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'shrink-0 p-1 rounded-[var(--radius-alert)] hover:bg-black/5 transition-colors',
      className
    )}
    aria-label="Schließen"
    {...props}
  >
    <X size={16} className="text-[var(--color-alert-title)] opacity-50" />
  </button>
));
AlertClose.displayName = 'AlertClose';

export { Alert, alertVariants, AlertTitle, AlertDescription, AlertClose };
