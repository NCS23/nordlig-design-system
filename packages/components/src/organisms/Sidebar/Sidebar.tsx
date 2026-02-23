import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

/* ─── Context ──────────────────────────────────────────────────────────────── */

const SidebarContext = React.createContext<{
  collapsed: boolean;
  toggle: () => void;
}>({ collapsed: false, toggle: () => {} });

export const useSidebar = () => React.useContext(SidebarContext);

/* ─── Sidebar (Root) ───────────────────────────────────────────────────────── */

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Allow the sidebar to collapse */
  collapsible?: boolean;
  /** Initial collapsed state (uncontrolled) */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width when expanded (default: w-60 / 240px) */
  width?: string;
  /** Width when collapsed (default: w-16 / 64px) */
  collapsedWidth?: string;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      children,
      collapsible = false,
      defaultCollapsed = false,
      collapsed: controlledCollapsed,
      onCollapsedChange,
      width,
      collapsedWidth,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] =
      React.useState(defaultCollapsed);

    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed;

    const toggle = React.useCallback(() => {
      if (!collapsible) return;
      const next = !collapsed;
      if (!isControlled) {
        setUncontrolledCollapsed(next);
      }
      onCollapsedChange?.(next);
    }, [collapsible, collapsed, isControlled, onCollapsedChange]);

    const contextValue = React.useMemo(
      () => ({ collapsed, toggle }),
      [collapsed, toggle]
    );

    const widthStyle: React.CSSProperties = {};
    if (collapsed && collapsedWidth) {
      widthStyle.width = collapsedWidth;
    } else if (!collapsed && width) {
      widthStyle.width = width;
    }

    return (
      <SidebarContext.Provider value={contextValue}>
        <aside
          ref={ref}
          data-collapsed={collapsed || undefined}
          className={cn(
            'h-full bg-[var(--color-bg-paper)] text-[var(--color-text-base)] border-r border-[var(--color-border-muted)] flex flex-col transition-all duration-200',
            collapsed && !collapsedWidth ? 'w-16' : '',
            !collapsed && !width ? 'w-60' : '',
            className
          )}
          style={{ ...widthStyle, ...style }}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = 'Sidebar';

/* ─── SidebarHeader ────────────────────────────────────────────────────────── */

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          'p-[var(--spacing-sidebar-header-padding)] flex items-center gap-[var(--spacing-sidebar-header-gap)]',
          collapsed && 'justify-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarHeader.displayName = 'SidebarHeader';

/* ─── SidebarContent ───────────────────────────────────────────────────────── */

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 overflow-y-auto py-[var(--spacing-sidebar-content-py)]', className)}
        {...props}
      />
    );
  }
);
SidebarContent.displayName = 'SidebarContent';

/* ─── SidebarFooter ────────────────────────────────────────────────────────── */

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-[var(--spacing-sidebar-header-padding)] border-t border-[var(--color-border-muted)] mt-auto',
          className
        )}
        {...props}
      />
    );
  }
);
SidebarFooter.displayName = 'SidebarFooter';

/* ─── SidebarGroup ─────────────────────────────────────────────────────────── */

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label (hidden when collapsed) */
  label?: string;
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div ref={ref} className={cn('px-[var(--spacing-sidebar-group-px)] py-[var(--spacing-sidebar-group-py)]', className)} {...props}>
        {label && !collapsed && (
          <div className="text-[length:var(--font-sidebar-label-size)] [font-weight:var(--font-sidebar-label-weight)] text-[var(--color-text-muted)] uppercase tracking-wider px-[var(--spacing-sidebar-label-px)] mb-[var(--spacing-sidebar-label-mb)]">
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);
SidebarGroup.displayName = 'SidebarGroup';

/* ─── SidebarItem ──────────────────────────────────────────────────────────── */

export interface SidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Icon displayed before the label */
  icon?: React.ReactNode;
  /** Item label text */
  label: string;
  /** If provided, renders an <a> instead of <button> */
  href?: string;
  /** Active/selected state */
  active?: boolean;
  /** Badge value (hidden when collapsed) */
  badge?: string | number;
  /** Disabled state */
  disabled?: boolean;
}

const SidebarItem = React.forwardRef<HTMLElement, SidebarItemProps>(
  (
    {
      className,
      icon,
      label,
      href,
      active = false,
      badge,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { collapsed } = useSidebar();

    const baseClasses = cn(
      'flex items-center gap-[var(--spacing-sidebar-item-gap)] min-h-[44px] px-[var(--spacing-sidebar-item-px)] py-[var(--spacing-sidebar-item-py)] rounded-[var(--radius-md)] text-[length:var(--font-sidebar-item-size)] transition-colors w-full',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      active
        ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-on-primary)] [font-weight:var(--font-sidebar-badge-weight)]'
        : 'text-[var(--color-text-base)] hover:bg-[var(--color-bg-muted)]',
      disabled && 'opacity-50 pointer-events-none',
      collapsed && 'justify-center',
      className
    );

    const content = (
      <>
        {icon && <span className="shrink-0">{icon}</span>}
        {!collapsed && <span className="truncate">{label}</span>}
        {!collapsed && badge !== undefined && (
          <span className="ml-auto text-[length:var(--font-sidebar-badge-size)] [font-weight:var(--font-sidebar-badge-weight)] bg-[var(--color-badge-error-bg)] text-[var(--color-badge-error-text)] px-[var(--spacing-sidebar-badge-px)] py-[var(--spacing-sidebar-badge-py)] rounded-[var(--radius-sidebar-badge)]">
            {badge}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          aria-current={active ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          title={collapsed ? label : undefined}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={baseClasses}
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        title={collapsed ? label : undefined}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);
SidebarItem.displayName = 'SidebarItem';

/* ─── SidebarCollapseButton ────────────────────────────────────────────────── */

export interface SidebarCollapseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SidebarCollapseButton = React.forwardRef<
  HTMLButtonElement,
  SidebarCollapseButtonProps
>(({ className, ...props }, ref) => {
  const { collapsed, toggle } = useSidebar();

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className={cn(
        'p-[var(--spacing-sidebar-collapse-padding)] rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
        className
      )}
      {...props}
    >
      {collapsed ? <Icon icon={ChevronRight} size={18} /> : <Icon icon={ChevronLeft} size={18} />}
    </button>
  );
});
SidebarCollapseButton.displayName = 'SidebarCollapseButton';

/* ─── Exports ──────────────────────────────────────────────────────────────── */

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
};
