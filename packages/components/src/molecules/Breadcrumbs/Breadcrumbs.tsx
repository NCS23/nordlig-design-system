import React from 'react';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
  children: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href?: string;
  isCurrent?: boolean;
}

// ─── BreadcrumbSeparator ────────────────────────────────────────────────────

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <li role="presentation" aria-hidden="true">
    <span
      ref={ref}
      className={cn(
        'mx-2 text-[var(--color-breadcrumbs-separator)]',
        className
      )}
      {...props}
    >
      {children ?? '/'}
    </span>
  </li>
));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ─── BreadcrumbItem ─────────────────────────────────────────────────────────

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, href, isCurrent, children, ...props }, ref) => {
    const content = href && !isCurrent ? (
      <a
        href={href}
        className={cn(
          'text-[var(--color-breadcrumbs-text)]',
          'hover:text-[var(--color-breadcrumbs-hover-text)]',
          'transition-colors underline-offset-2 hover:underline',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
        )}
      >
        {children}
      </a>
    ) : (
      <span
        className={cn(
          isCurrent
            ? 'text-[var(--color-breadcrumbs-text-current)] font-medium pointer-events-none'
            : 'text-[var(--color-breadcrumbs-text)]'
        )}
      >
        {children}
      </span>
    );

    return (
      <li
        ref={ref}
        className={cn('inline-flex items-center text-sm', className)}
        {...(isCurrent ? { 'aria-current': 'page' as const } : {})}
        {...props}
      >
        {content}
      </li>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

// ─── Breadcrumbs ────────────────────────────────────────────────────────────

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, separator, children, ...props }, ref) => {
    const items = React.Children.toArray(children).filter(React.isValidElement);

    return (
      <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
        <ol className="flex items-center flex-wrap">
          {items.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < items.length - 1 && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = 'Breadcrumbs';

// ─── Exports ────────────────────────────────────────────────────────────────

export { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator };
