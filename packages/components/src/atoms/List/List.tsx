import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/text';

// ─── List ──────────────────────────────────────────────────────────────────────

const listVariants = cva('', {
  variants: {
    variant: {
      unordered: 'list-disc',
      ordered: 'list-decimal',
      none: 'list-none',
    },
    gap: {
      none: 'space-y-0',
      xs: 'space-y-[var(--spacing-component-gap-xs)]',
      sm: 'space-y-[var(--spacing-component-gap-sm)]',
      md: 'space-y-[var(--spacing-component-gap-md)]',
      lg: 'space-y-[var(--spacing-component-gap-lg)]',
    },
    indent: {
      true: 'pl-[var(--spacing-component-padding-lg)]',
      false: 'pl-0',
    },
  },
  defaultVariants: {
    variant: 'none',
    gap: 'sm',
    indent: false,
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof listVariants> {
  as?: 'ul' | 'ol';
}

const List = React.forwardRef<HTMLElement, ListProps>(
  ({ className, variant, gap, indent, as, children, ...props }, ref) => {
    const Tag = as || (variant === 'ordered' ? 'ol' : 'ul');
    return (
      <Tag
        ref={ref as React.Ref<never>}
        className={cn(listVariants({ variant, gap, indent, className }))}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

List.displayName = 'List';

// ─── ListItem ──────────────────────────────────────────────────────────────────

const listItemVariants = cva('flex items-start gap-[var(--spacing-component-gap-sm)]', {
  variants: {
    interactive: {
      true: 'cursor-pointer rounded-[var(--radius-sm)] px-[var(--spacing-component-padding-sm)] py-[var(--spacing-component-padding-xs)] hover:bg-[var(--color-surface-hover)] transition-colors',
      false: '',
    },
  },
  defaultVariants: {
    interactive: false,
  },
});

export interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, interactive, icon, action, description, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(listItemVariants({ interactive, className }))}
        {...props}
      >
        {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
        <span className="flex-1 min-w-0">
          <span className="block">{children}</span>
          {description && (
            <span className="block text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)]">
              {description}
            </span>
          )}
        </span>
        {action && <span className="shrink-0 ml-auto">{action}</span>}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

// ─── DescriptionList ───────────────────────────────────────────────────────────

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
}

const dlGapMap: Record<string, string> = {
  none: 'space-y-0',
  xs: 'space-y-[var(--spacing-component-gap-xs)]',
  sm: 'space-y-[var(--spacing-component-gap-sm)]',
  md: 'space-y-[var(--spacing-component-gap-md)]',
  lg: 'space-y-[var(--spacing-component-gap-lg)]',
};

const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, gap = 'sm', children, ...props }, ref) => {
    return (
      <dl
        ref={ref}
        className={cn(dlGapMap[gap], className)}
        {...props}
      >
        {children}
      </dl>
    );
  }
);

DescriptionList.displayName = 'DescriptionList';

// ─── DescriptionTerm / DescriptionDetails ──────────────────────────────────────

export interface DescriptionTermProps extends React.HTMLAttributes<HTMLElement> {}

const DescriptionTerm = React.forwardRef<HTMLElement, DescriptionTermProps>(
  ({ className, ...props }, ref) => (
    <dt
      ref={ref}
      className={cn('font-medium text-[var(--color-text-base)]', className)}
      {...props}
    />
  )
);

DescriptionTerm.displayName = 'DescriptionTerm';

export interface DescriptionDetailsProps extends React.HTMLAttributes<HTMLElement> {}

const DescriptionDetails = React.forwardRef<HTMLElement, DescriptionDetailsProps>(
  ({ className, ...props }, ref) => (
    <dd
      ref={ref}
      className={cn('text-[var(--color-text-muted)]', className)}
      {...props}
    />
  )
);

DescriptionDetails.displayName = 'DescriptionDetails';

export {
  List,
  ListItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
  listVariants,
  listItemVariants,
};
