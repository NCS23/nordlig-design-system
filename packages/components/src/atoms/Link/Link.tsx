import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

const linkVariants = cva(
  'inline-flex items-center gap-[var(--spacing-link-gap)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
  {
    variants: {
      variant: {
        default:
          'text-[var(--color-link-text)] hover:text-[var(--color-link-text-hover)]',
        muted:
          'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]',
        destructive:
          'text-[var(--color-text-error)] hover:text-[var(--color-text-error)]',
      },
      underline: {
        always: 'underline underline-offset-4',
        hover: 'hover:underline underline-offset-4',
        none: 'no-underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      underline: 'hover',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  showExternalIcon?: boolean;
  disabled?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      underline,
      showExternalIcon,
      disabled,
      href,
      target,
      rel,
      children,
      ...props
    },
    ref
  ) => {
    const isExternal = href?.startsWith('http');
    const linkTarget = target ?? (isExternal ? '_blank' : undefined);
    const linkRel =
      rel ?? (linkTarget === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        target={linkTarget}
        rel={linkRel}
        className={cn(
          linkVariants({ variant, underline, className }),
          disabled && 'opacity-50 pointer-events-none'
        )}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {children}
        {showExternalIcon && <Icon icon={ExternalLink} size={14} />}
      </a>
    );
  }
);

Link.displayName = 'Link';

export { Link, linkVariants };
