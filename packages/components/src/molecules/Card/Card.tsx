import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  'rounded-[var(--radius-card)] bg-[var(--color-card-bg)] text-[var(--color-text-base)] flex flex-col gap-[var(--spacing-card-gap)] transition-shadow',
  {
    variants: {
      elevation: {
        flat: 'border border-[var(--color-card-border)]',
        raised: 'border border-[var(--color-card-border)] [box-shadow:var(--shadow-card-raised)]',
        elevated: 'border border-[var(--color-card-border)] [box-shadow:var(--shadow-card-elevated)]',
      },
      padding: {
        compact: 'p-[var(--spacing-card-padding-compact)]',
        normal: 'p-[var(--spacing-card-padding-normal)]',
        spacious: 'p-[var(--spacing-card-padding-spacious)]',
      },
      hoverable: {
        true: 'cursor-pointer hover:[box-shadow:var(--shadow-card-hover)]',
        false: '',
      },
    },
    defaultVariants: {
      elevation: 'flat',
      padding: 'normal',
      hoverable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation, padding, hoverable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ elevation, padding, hoverable, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-[var(--spacing-card-gap)]', className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1', className)}
        {...props}
      />
    );
  }
);
CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-[var(--spacing-card-gap)]', className)}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter, cardVariants };
