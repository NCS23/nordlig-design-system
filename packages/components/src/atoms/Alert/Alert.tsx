import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

// Component token CSS
import '@nordlig/styles/tokens/alert';

const alertVariants = cva(
  'relative flex items-start gap-[var(--spacing-alert-gap)] p-[var(--spacing-alert-padding)] [border-left-width:var(--sizing-alert-border-width)] rounded-[var(--radius-alert)]',
  {
    variants: {
      variant: {
        info: 'bg-[var(--color-alert-info-bg)] border-l-[var(--color-alert-info-border)] [--color-alert-title:var(--color-alert-info-title)] [--color-alert-description:var(--color-alert-info-description)]',
        success: 'bg-[var(--color-alert-success-bg)] border-l-[var(--color-alert-success-border)] [--color-alert-title:var(--color-alert-success-title)] [--color-alert-description:var(--color-alert-success-description)]',
        warning: 'bg-[var(--color-alert-warning-bg)] border-l-[var(--color-alert-warning-border)] [--color-alert-title:var(--color-alert-warning-title)] [--color-alert-description:var(--color-alert-warning-description)]',
        error: 'bg-[var(--color-alert-error-bg)] border-l-[var(--color-alert-error-border)] [--color-alert-title:var(--color-alert-error-title)] [--color-alert-description:var(--color-alert-error-description)]',
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
        <Icon icon={IconComponent} size="md" className={cn('mt-[var(--spacing-alert-icon-mt)]', iconClass)} />
        <div className="flex-1 min-w-0">{children}</div>
        {closeable && (
          <button
            onClick={onClose}
            className="shrink-0 p-[var(--spacing-alert-close-padding)] rounded-[var(--radius-alert)] hover:bg-[var(--color-interactive-hover-overlay)] transition-colors"
            aria-label="Schließen"
          >
            <Icon icon={X} size="sm" className="text-[var(--color-alert-title)] opacity-50" />
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
  ({ className, children, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('text-[length:var(--sizing-alert-font-size)] [font-weight:var(--sizing-alert-title-weight)] text-[var(--color-alert-title)] mb-[var(--spacing-alert-title-mb)]', className)}
      {...props}
    >
      {children}
    </h5>
  )
);
AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-[length:var(--sizing-alert-font-size)] text-[var(--color-alert-description)]', className)}
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
      'shrink-0 p-[var(--spacing-alert-close-padding)] rounded-[var(--radius-alert)] hover:bg-[var(--color-interactive-hover-overlay)] transition-colors',
      className
    )}
    aria-label="Schließen"
    {...props}
  >
    <Icon icon={X} size="sm" className="text-[var(--color-alert-title)] opacity-50" />
  </button>
));
AlertClose.displayName = 'AlertClose';

export { Alert, alertVariants, AlertTitle, AlertDescription, AlertClose };
