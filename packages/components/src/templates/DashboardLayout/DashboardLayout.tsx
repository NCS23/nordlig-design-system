import React from 'react';
import { cn } from '../../utils/cn';
import { AppHeader } from '../../organisms/AppHeader';
import { AppFooter } from '../../organisms/AppFooter';

// Component token CSS
import '@nordlig/styles/tokens/dashboardlayout';

// ─── Context ────────────────────────────────────────────────────────────────

interface DashboardLayoutContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const DashboardLayoutContext = React.createContext<DashboardLayoutContextValue>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export const useDashboardLayout = () =>
  React.useContext(DashboardLayoutContext);

// ─── DashboardLayout (Root) ─────────────────────────────────────────────────

export interface DashboardLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Initial sidebar open state on mobile (uncontrolled) */
  defaultSidebarOpen?: boolean;
  /** Controlled sidebar open state (mobile overlay) */
  sidebarOpen?: boolean;
  /** Callback when sidebar open changes */
  onSidebarOpenChange?: (open: boolean) => void;
  /** Initial sidebar collapsed state (uncontrolled) */
  defaultSidebarCollapsed?: boolean;
  /** Controlled sidebar collapsed state */
  sidebarCollapsed?: boolean;
  /** Callback when sidebar collapsed changes */
  onSidebarCollapsedChange?: (collapsed: boolean) => void;
}

const DashboardLayoutRoot = React.forwardRef<
  HTMLDivElement,
  DashboardLayoutProps
>(
  (
    {
      defaultSidebarOpen = false,
      sidebarOpen: controlledOpen,
      onSidebarOpenChange,
      defaultSidebarCollapsed = false,
      sidebarCollapsed: controlledCollapsed,
      onSidebarCollapsedChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] =
      React.useState(defaultSidebarOpen);
    const [uncontrolledCollapsed, setUncontrolledCollapsed] =
      React.useState(defaultSidebarCollapsed);

    const isOpenControlled = controlledOpen !== undefined;
    const isCollapsedControlled = controlledCollapsed !== undefined;

    const open = isOpenControlled ? controlledOpen : uncontrolledOpen;
    const collapsed = isCollapsedControlled
      ? controlledCollapsed
      : uncontrolledCollapsed;

    const setSidebarOpen = React.useCallback(
      (value: boolean) => {
        if (!isOpenControlled) setUncontrolledOpen(value);
        onSidebarOpenChange?.(value);
      },
      [isOpenControlled, onSidebarOpenChange]
    );

    const setSidebarCollapsed = React.useCallback(
      (value: boolean) => {
        if (!isCollapsedControlled) setUncontrolledCollapsed(value);
        onSidebarCollapsedChange?.(value);
      },
      [isCollapsedControlled, onSidebarCollapsedChange]
    );

    const contextValue = React.useMemo(
      () => ({
        sidebarOpen: open,
        setSidebarOpen,
        sidebarCollapsed: collapsed,
        setSidebarCollapsed,
      }),
      [open, setSidebarOpen, collapsed, setSidebarCollapsed]
    );

    return (
      <DashboardLayoutContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex h-screen flex-col bg-[var(--color-dashboard-bg)]',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DashboardLayoutContext.Provider>
    );
  }
);

DashboardLayoutRoot.displayName = 'DashboardLayout';

// ─── DashboardLayout.Header ─────────────────────────────────────────────────

export interface DashboardLayoutHeaderProps
  extends React.HTMLAttributes<HTMLElement> {}

const DashboardLayoutHeader = React.forwardRef<
  HTMLElement,
  DashboardLayoutHeaderProps
>(({ className, children, ...props }, ref) => (
  <AppHeader ref={ref} sticky elevated zIndex={20} className={className} {...props}>
    {children}
  </AppHeader>
));

DashboardLayoutHeader.displayName = 'DashboardLayout.Header';

// ─── DashboardLayout.Sidebar ────────────────────────────────────────────────

export interface DashboardLayoutSidebarProps
  extends React.HTMLAttributes<HTMLElement> {}

const DashboardLayoutSidebar = React.forwardRef<
  HTMLElement,
  DashboardLayoutSidebarProps
>(({ className, children, ...props }, ref) => {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } =
    useDashboardLayout();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        ref={ref}
        className={cn(
          'hidden md:flex shrink-0 overflow-y-auto transition-[width] duration-200',
          sidebarCollapsed
            ? 'w-[var(--sizing-dashboard-sidebar-collapsed-width)]'
            : 'w-[var(--sizing-dashboard-sidebar-width)]',
          className
        )}
        {...props}
      >
        {children}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--color-dashboard-overlay-bg)]"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          {/* Sidebar panel */}
          <aside
            className={cn(
              'relative z-10 h-full overflow-y-auto',
              'w-[var(--sizing-dashboard-sidebar-width)]',
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            {children}
          </aside>
        </div>
      )}
    </>
  );
});

DashboardLayoutSidebar.displayName = 'DashboardLayout.Sidebar';

// ─── DashboardLayout.Content ────────────────────────────────────────────────

export interface DashboardLayoutContentProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Max width constraint class (e.g. "max-w-7xl") */
  maxWidth?: string;
  /** Remove default padding */
  noPadding?: boolean;
}

const DashboardLayoutContent = React.forwardRef<
  HTMLElement,
  DashboardLayoutContentProps
>(({ className, children, maxWidth, noPadding = false, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      'flex-1 overflow-y-auto',
      !noPadding && 'p-[var(--spacing-dashboard-content-p)]',
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
));

DashboardLayoutContent.displayName = 'DashboardLayout.Content';

// ─── DashboardLayout.Footer ─────────────────────────────────────────────────

export interface DashboardLayoutFooterProps
  extends React.HTMLAttributes<HTMLElement> {}

const DashboardLayoutFooter = React.forwardRef<
  HTMLElement,
  DashboardLayoutFooterProps
>(({ className, children, ...props }, ref) => (
  <AppFooter ref={ref} className={className} {...props}>
    {children}
  </AppFooter>
));

DashboardLayoutFooter.displayName = 'DashboardLayout.Footer';

// ─── Body (internal layout helper) ──────────────────────────────────────────

interface DashboardLayoutBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DashboardLayoutBody = React.forwardRef<
  HTMLDivElement,
  DashboardLayoutBodyProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-1 overflow-hidden', className)}
    {...props}
  >
    {children}
  </div>
));

DashboardLayoutBody.displayName = 'DashboardLayout.Body';

// ─── Compound Export ────────────────────────────────────────────────────────

const DashboardLayout = Object.assign(DashboardLayoutRoot, {
  Header: DashboardLayoutHeader,
  Sidebar: DashboardLayoutSidebar,
  Body: DashboardLayoutBody,
  Content: DashboardLayoutContent,
  Footer: DashboardLayoutFooter,
});

export { DashboardLayout };
