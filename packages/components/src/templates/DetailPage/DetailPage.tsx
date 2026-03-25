import React from 'react';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/detailpage';

// ─── DetailPage (Root) ─────────────────────────────────────────────────────

export interface DetailPageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DetailPageRoot = React.forwardRef<HTMLDivElement, DetailPageProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--spacing-detailpage-section-gap)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

DetailPageRoot.displayName = 'DetailPage';

// ─── DetailPage.Header ──────────────────────────────────────────────────────

export interface DetailPageHeaderProps
  extends React.HTMLAttributes<HTMLElement> {}

const DetailPageHeader = React.forwardRef<HTMLElement, DetailPageHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--spacing-detailpage-header-gap)]',
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
);

DetailPageHeader.displayName = 'DetailPage.Header';

// ─── DetailPage.Body ────────────────────────────────────────────────────────
// Wrapper fuer Content + Sidebar row (responsive)

export interface DetailPageBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DetailPageBody = React.forwardRef<HTMLDivElement, DetailPageBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--spacing-detailpage-sidebar-gap)]',
        'lg:flex-row',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

DetailPageBody.displayName = 'DetailPage.Body';

// ─── DetailPage.Content ──────────────────────────────────────────────────────

export interface DetailPageContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DetailPageContent = React.forwardRef<
  HTMLDivElement,
  DetailPageContentProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col gap-[var(--spacing-detailpage-content-gap)]',
      'min-w-0 flex-1',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

DetailPageContent.displayName = 'DetailPage.Content';

// ─── DetailPage.Sidebar ──────────────────────────────────────────────────────

export interface DetailPageSidebarProps
  extends React.HTMLAttributes<HTMLElement> {}

const DetailPageSidebar = React.forwardRef<
  HTMLElement,
  DetailPageSidebarProps
>(({ className, children, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      'flex flex-col gap-[var(--spacing-detailpage-content-gap)]',
      'w-full lg:w-[var(--sizing-detailpage-sidebar-width)] lg:shrink-0',
      className
    )}
    {...props}
  >
    {children}
  </aside>
));

DetailPageSidebar.displayName = 'DetailPage.Sidebar';

// ─── Compound Export ─────────────────────────────────────────────────────────

const DetailPage = Object.assign(DetailPageRoot, {
  Header: DetailPageHeader,
  Body: DetailPageBody,
  Content: DetailPageContent,
  Sidebar: DetailPageSidebar,
});

export { DetailPage };
