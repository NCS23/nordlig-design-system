import React from 'react';
import { cn } from '../../utils/cn';

// ─── ListPage (Root) ────────────────────────────────────────────────────────

export interface ListPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const ListPageRoot = React.forwardRef<HTMLDivElement, ListPageProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--spacing-listpage-section-gap)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

ListPageRoot.displayName = 'ListPage';

// ─── ListPage.Header ────────────────────────────────────────────────────────

export interface ListPageHeaderProps
  extends React.HTMLAttributes<HTMLElement> {}

const ListPageHeader = React.forwardRef<HTMLElement, ListPageHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'flex items-center justify-between',
        'gap-[var(--spacing-listpage-header-gap)]',
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
);

ListPageHeader.displayName = 'ListPage.Header';

// ─── ListPage.Toolbar ───────────────────────────────────────────────────────

export interface ListPageToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ListPageToolbar = React.forwardRef<HTMLDivElement, ListPageToolbarProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      aria-label="Filter und Sortierung"
      className={cn(
        'flex flex-col gap-[var(--spacing-listpage-toolbar-gap)]',
        'sm:flex-row sm:items-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

ListPageToolbar.displayName = 'ListPage.Toolbar';

// ─── ListPage.Body ──────────────────────────────────────────────────────────

export interface ListPageBodyProps
  extends React.HTMLAttributes<HTMLElement> {}

const ListPageBody = React.forwardRef<HTMLElement, ListPageBodyProps>(
  ({ className, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn('flex-1', className)}
      {...props}
    >
      {children}
    </section>
  )
);

ListPageBody.displayName = 'ListPage.Body';

// ─── ListPage.Footer ────────────────────────────────────────────────────────

export interface ListPageFooterProps
  extends React.HTMLAttributes<HTMLElement> {}

const ListPageFooter = React.forwardRef<HTMLElement, ListPageFooterProps>(
  ({ className, children, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        'flex items-center justify-between',
        'gap-[var(--spacing-listpage-footer-gap)]',
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
);

ListPageFooter.displayName = 'ListPage.Footer';

// ─── Compound Export ────────────────────────────────────────────────────────

const ListPage = Object.assign(ListPageRoot, {
  Header: ListPageHeader,
  Toolbar: ListPageToolbar,
  Body: ListPageBody,
  Footer: ListPageFooter,
});

export { ListPage };
