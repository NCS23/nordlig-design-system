import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

const bannerVariants = cva(
  'flex items-center w-full px-[var(--spacing-banner-padding-x)] py-[var(--spacing-banner-padding-y)] gap-[var(--spacing-banner-gap)] border-b',
  {
    variants: {
      variant: {
        info: 'bg-[var(--color-banner-info-bg)] text-[var(--color-banner-info-text)] border-b-[var(--color-banner-info-border)]',
        success:
          'bg-[var(--color-banner-success-bg)] text-[var(--color-banner-success-text)] border-b-[var(--color-banner-success-border)]',
        warning:
          'bg-[var(--color-banner-warning-bg)] text-[var(--color-banner-warning-text)] border-b-[var(--color-banner-warning-border)]',
        error:
          'bg-[var(--color-banner-error-bg)] text-[var(--color-banner-error-text)] border-b-[var(--color-banner-error-border)]',
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
  info: 'text-[var(--color-banner-info-text)]',
  success: 'text-[var(--color-banner-success-text)]',
  warning: 'text-[var(--color-banner-warning-text)]',
  error: 'text-[var(--color-banner-error-text)]',
};

const variantRoleMap = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  error: 'alert',
} as const;

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Callback when the banner is dismissed */
  onDismiss?: () => void;
  /** Custom icon to override the default variant icon */
  icon?: React.ReactNode;
  /** Action slot for CTA button, rendered between content and dismiss button */
  action?: React.ReactNode;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = 'info',
      dismissible = false,
      onDismiss,
      icon,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedVariant = variant || 'info';
    const IconComponent = variantIconMap[resolvedVariant];
    const role = variantRoleMap[resolvedVariant];

    return (
      <div
        ref={ref}
        role={role}
        className={cn(bannerVariants({ variant, className }))}
        {...props}
      >
        {icon !== undefined ? (
          icon
        ) : (
          <Icon
            icon={IconComponent}
            size="md"
            className={variantIconClassMap[resolvedVariant]}
          />
        )}
        <div className="flex-1 min-w-0 text-[length:var(--font-banner-size)]">{children}</div>
        {action && <div className="shrink-0">{action}</div>}
        {dismissible && (
          <button
            onClick={onDismiss}
            className="shrink-0 p-1 rounded-[var(--radius-banner-dismiss)] text-[var(--color-banner-dismiss)] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1"
            aria-label="Schließen"
          >
            <Icon icon={X} size="sm" />
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = 'Banner';

export interface BannerContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const BannerContent = React.forwardRef<HTMLDivElement, BannerContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-w-0', className)} {...props} />
  )
);
BannerContent.displayName = 'BannerContent';

export { Banner, bannerVariants, BannerContent };
