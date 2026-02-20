import React from 'react';
import { cn } from '../../utils/cn';

// ─── Context ────────────────────────────────────────────────────────────────

interface PageShellContextValue {
  sidebarPosition: 'left' | 'right';
  stickyHeader: boolean;
}

const PageShellContext = React.createContext<PageShellContextValue>({
  sidebarPosition: 'left',
  stickyHeader: true,
});

export const usePageShell = () => React.useContext(PageShellContext);

// ─── PageShell (Root) ───────────────────────────────────────────────────────

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar position */
  sidebarPosition?: 'left' | 'right';
  /** Make header sticky */
  stickyHeader?: boolean;
}

const PageShellRoot = React.forwardRef<HTMLDivElement, PageShellProps>(
  (
    {
      sidebarPosition = 'left',
      stickyHeader = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({ sidebarPosition, stickyHeader }),
      [sidebarPosition, stickyHeader]
    );

    return (
      <PageShellContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex h-screen flex-col bg-[var(--color-shell-bg)]',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </PageShellContext.Provider>
    );
  }
);

PageShellRoot.displayName = 'PageShell';

// ─── PageShellHeader ────────────────────────────────────────────────────────

export interface PageShellHeaderProps
  extends React.HTMLAttributes<HTMLElement> {}

const PageShellHeader = React.forwardRef<HTMLElement, PageShellHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { stickyHeader } = usePageShell();

    return (
      <header
        ref={ref}
        className={cn(
          'flex items-center shrink-0 gap-[var(--spacing-shell-header-logo-gap)]',
          'h-14 md:h-[var(--sizing-shell-header-height)]',
          'px-[var(--spacing-shell-header-px)] py-[var(--spacing-shell-header-py)]',
          'bg-[var(--color-shell-header-bg)]',
          'border-b border-[var(--color-shell-header-border)]',
          '[box-shadow:var(--shadow-shell-header)]',
          'z-10',
          stickyHeader && 'sticky top-0',
          className
        )}
        {...props}
      >
        {children}
      </header>
    );
  }
);

PageShellHeader.displayName = 'PageShell.Header';

// ─── PageShellSidebar ───────────────────────────────────────────────────────

export interface PageShellSidebarProps
  extends React.HTMLAttributes<HTMLElement> {}

const PageShellSidebar = React.forwardRef<HTMLElement, PageShellSidebarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn('shrink-0 overflow-y-auto', className)}
        {...props}
      >
        {children}
      </aside>
    );
  }
);

PageShellSidebar.displayName = 'PageShell.Sidebar';

// ─── PageShellContent ───────────────────────────────────────────────────────

export interface PageShellContentProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Max width constraint class (e.g. "max-w-7xl") */
  maxWidth?: string;
  /** Remove default padding */
  noPadding?: boolean;
}

const PageShellContent = React.forwardRef<HTMLElement, PageShellContentProps>(
  ({ className, children, maxWidth, noPadding = false, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          'flex-1 overflow-y-auto',
          !noPadding && 'p-[var(--spacing-shell-content-p)]',
          className
        )}
        {...props}
      >
        {maxWidth ? (
          <div className={cn('mx-auto w-full', maxWidth)}>{children}</div>
        ) : (
          children
        )}
      </main>
    );
  }
);

PageShellContent.displayName = 'PageShell.Content';

// ─── PageShellFooter ────────────────────────────────────────────────────────

export interface PageShellFooterProps
  extends React.HTMLAttributes<HTMLElement> {}

const PageShellFooter = React.forwardRef<HTMLElement, PageShellFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'flex items-center shrink-0',
          'h-[var(--sizing-shell-footer-height)]',
          'px-[var(--spacing-shell-footer-px)] py-[var(--spacing-shell-footer-py)]',
          'bg-[var(--color-shell-footer-bg)]',
          'border-t border-[var(--color-shell-footer-border)]',
          className
        )}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

PageShellFooter.displayName = 'PageShell.Footer';

// ─── Body (Sidebar + Content layout helper) ─────────────────────────────────

interface PageShellBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageShellBody = React.forwardRef<HTMLDivElement, PageShellBodyProps>(
  ({ className, children, ...props }, ref) => {
    const { sidebarPosition } = usePageShell();

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-1 overflow-hidden',
          sidebarPosition === 'right' && 'flex-row-reverse',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PageShellBody.displayName = 'PageShell.Body';

// ─── Compound Export ────────────────────────────────────────────────────────

const PageShell = Object.assign(PageShellRoot, {
  Header: PageShellHeader,
  Sidebar: PageShellSidebar,
  Body: PageShellBody,
  Content: PageShellContent,
  Footer: PageShellFooter,
});

export { PageShell };
