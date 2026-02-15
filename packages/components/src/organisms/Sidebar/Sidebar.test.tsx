import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
  useSidebar,
} from './Sidebar';

/* ─── Sidebar (Root) ───────────────────────────────────────────────────────── */

describe('Sidebar', () => {
  it('renders as an aside element', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar.tagName).toBe('ASIDE');
  });

  it('renders children', () => {
    render(<Sidebar>Sidebar content</Sidebar>);
    expect(screen.getByText('Sidebar content')).toBeInTheDocument();
  });

  it('applies expanded width by default (w-60)', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar.className).toContain('w-60');
    expect(sidebar.className).not.toContain('w-16');
  });

  it('applies collapsed width when defaultCollapsed=true', () => {
    render(
      <Sidebar data-testid="sidebar" collapsible defaultCollapsed>
        Content
      </Sidebar>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar.className).toContain('w-16');
    expect(sidebar.className).not.toContain('w-60');
  });

  it('applies data-collapsed attribute when collapsed', () => {
    render(
      <Sidebar data-testid="sidebar" collapsible defaultCollapsed>
        Content
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-collapsed');
  });

  it('does not apply data-collapsed when expanded', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>);
    expect(screen.getByTestId('sidebar')).not.toHaveAttribute('data-collapsed');
  });

  it('supports controlled collapsed state', () => {
    const { rerender } = render(
      <Sidebar data-testid="sidebar" collapsible collapsed={false}>
        Content
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar').className).toContain('w-60');

    rerender(
      <Sidebar data-testid="sidebar" collapsible collapsed={true}>
        Content
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar').className).toContain('w-16');
  });

  it('applies custom width via style', () => {
    render(
      <Sidebar data-testid="sidebar" width="300px">
        Content
      </Sidebar>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar.style.width).toBe('300px');
  });

  it('applies custom collapsedWidth via style when collapsed', () => {
    render(
      <Sidebar
        data-testid="sidebar"
        collapsible
        collapsed={true}
        collapsedWidth="80px"
      >
        Content
      </Sidebar>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar.style.width).toBe('80px');
  });

  it('applies custom className', () => {
    render(
      <Sidebar data-testid="sidebar" className="custom-class">
        Content
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Sidebar ref={ref}>Content</Sidebar>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('applies base styling classes', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar.className).toContain('h-full');
    expect(sidebar.className).toContain('bg-[var(--color-bg-paper)]');
    expect(sidebar.className).toContain('border-r');
    expect(sidebar.className).toContain('border-[var(--color-border-base)]');
    expect(sidebar.className).toContain('flex');
    expect(sidebar.className).toContain('flex-col');
    expect(sidebar.className).toContain('transition-all');
  });

  it('passes through HTML attributes', () => {
    render(
      <Sidebar data-testid="sidebar" aria-label="Main navigation">
        Content
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar')).toHaveAttribute(
      'aria-label',
      'Main navigation'
    );
  });
});

/* ─── SidebarHeader ────────────────────────────────────────────────────────── */

describe('SidebarHeader', () => {
  it('renders children', () => {
    render(
      <Sidebar>
        <SidebarHeader>Header content</SidebarHeader>
      </Sidebar>
    );
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies base layout classes', () => {
    render(
      <Sidebar>
        <SidebarHeader data-testid="header">Content</SidebarHeader>
      </Sidebar>
    );
    const header = screen.getByTestId('header');
    expect(header.className).toContain('p-4');
    expect(header.className).toContain('flex');
    expect(header.className).toContain('items-center');
    expect(header.className).toContain('gap-3');
  });

  it('centers content when collapsed', () => {
    render(
      <Sidebar collapsible defaultCollapsed>
        <SidebarHeader data-testid="header">Content</SidebarHeader>
      </Sidebar>
    );
    expect(screen.getByTestId('header').className).toContain('justify-center');
  });

  it('does not center content when expanded', () => {
    render(
      <Sidebar>
        <SidebarHeader data-testid="header">Content</SidebarHeader>
      </Sidebar>
    );
    expect(screen.getByTestId('header').className).not.toContain(
      'justify-center'
    );
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Sidebar>
        <SidebarHeader ref={ref}>Content</SidebarHeader>
      </Sidebar>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── SidebarContent ───────────────────────────────────────────────────────── */

describe('SidebarContent', () => {
  it('renders children', () => {
    render(
      <Sidebar>
        <SidebarContent>Main content</SidebarContent>
      </Sidebar>
    );
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('has scrollable styling', () => {
    render(
      <Sidebar>
        <SidebarContent data-testid="content">Content</SidebarContent>
      </Sidebar>
    );
    const content = screen.getByTestId('content');
    expect(content.className).toContain('flex-1');
    expect(content.className).toContain('overflow-y-auto');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Sidebar>
        <SidebarContent ref={ref}>Content</SidebarContent>
      </Sidebar>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── SidebarFooter ────────────────────────────────────────────────────────── */

describe('SidebarFooter', () => {
  it('renders children', () => {
    render(
      <Sidebar>
        <SidebarFooter>Footer content</SidebarFooter>
      </Sidebar>
    );
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('has border-top and mt-auto', () => {
    render(
      <Sidebar>
        <SidebarFooter data-testid="footer">Content</SidebarFooter>
      </Sidebar>
    );
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('border-t');
    expect(footer.className).toContain('border-[var(--color-border-base)]');
    expect(footer.className).toContain('mt-auto');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Sidebar>
        <SidebarFooter ref={ref}>Content</SidebarFooter>
      </Sidebar>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── SidebarGroup ─────────────────────────────────────────────────────────── */

describe('SidebarGroup', () => {
  it('renders children', () => {
    render(
      <Sidebar>
        <SidebarGroup>
          <div>Group items</div>
        </SidebarGroup>
      </Sidebar>
    );
    expect(screen.getByText('Group items')).toBeInTheDocument();
  });

  it('renders label when expanded', () => {
    render(
      <Sidebar>
        <SidebarGroup label="Navigation">
          <div>Items</div>
        </SidebarGroup>
      </Sidebar>
    );
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('hides label when collapsed', () => {
    render(
      <Sidebar collapsible defaultCollapsed>
        <SidebarGroup label="Navigation">
          <div>Items</div>
        </SidebarGroup>
      </Sidebar>
    );
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });

  it('applies label styling classes', () => {
    render(
      <Sidebar>
        <SidebarGroup label="Section" data-testid="group">
          <div>Items</div>
        </SidebarGroup>
      </Sidebar>
    );
    const label = screen.getByText('Section');
    expect(label.className).toContain('text-xs');
    expect(label.className).toContain('font-semibold');
    expect(label.className).toContain('uppercase');
    expect(label.className).toContain('tracking-wider');
    expect(label.className).toContain('text-[var(--color-text-muted)]');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Sidebar>
        <SidebarGroup ref={ref}>
          <div>Items</div>
        </SidebarGroup>
      </Sidebar>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── SidebarItem ──────────────────────────────────────────────────────────── */

describe('SidebarItem', () => {
  it('renders as a button by default', () => {
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" />
      </Sidebar>
    );
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('renders as an anchor when href is provided', () => {
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" href="/dashboard" />
      </Sidebar>
    );
    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('renders label text', () => {
    render(
      <Sidebar>
        <SidebarItem label="Settings" />
      </Sidebar>
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('hides label text when collapsed', () => {
    render(
      <Sidebar collapsible defaultCollapsed>
        <SidebarItem label="Settings" icon={<span data-testid="icon">I</span>} />
      </Sidebar>
    );
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('shows title tooltip when collapsed', () => {
    render(
      <Sidebar collapsible defaultCollapsed>
        <SidebarItem label="Settings" />
      </Sidebar>
    );
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Settings');
  });

  it('does not show title tooltip when expanded', () => {
    render(
      <Sidebar>
        <SidebarItem label="Settings" />
      </Sidebar>
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('title');
  });

  it('applies active state styling', () => {
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" active data-testid="item" />
      </Sidebar>
    );
    const item = screen.getByTestId('item');
    expect(item.className).toContain('bg-[var(--color-bg-primary)]');
    expect(item.className).toContain('text-[var(--color-text-on-primary)]');
    expect(item.className).toContain('font-medium');
  });

  it('applies aria-current=page when active', () => {
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" active />
      </Sidebar>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
  });

  it('does not apply aria-current when not active', () => {
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" />
      </Sidebar>
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-current');
  });

  it('applies normal state styling when not active', () => {
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" data-testid="item" />
      </Sidebar>
    );
    const item = screen.getByTestId('item');
    expect(item.className).toContain('text-[var(--color-text-base)]');
    expect(item.className).toContain('hover:bg-[var(--color-bg-muted)]');
  });

  it('applies disabled state', () => {
    render(
      <Sidebar>
        <SidebarItem label="Locked" disabled data-testid="item" />
      </Sidebar>
    );
    const item = screen.getByTestId('item');
    expect(item.className).toContain('opacity-50');
    expect(item.className).toContain('pointer-events-none');
    expect(item).toBeDisabled();
  });

  it('renders badge when provided', () => {
    render(
      <Sidebar>
        <SidebarItem label="Inbox" badge={5} />
      </Sidebar>
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('hides badge when collapsed', () => {
    render(
      <Sidebar collapsible defaultCollapsed>
        <SidebarItem label="Inbox" badge={5} />
      </Sidebar>
    );
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('renders icon', () => {
    render(
      <Sidebar>
        <SidebarItem label="Home" icon={<span data-testid="icon">H</span>} />
      </Sidebar>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies focus ring classes', () => {
    render(
      <Sidebar>
        <SidebarItem label="Item" data-testid="item" />
      </Sidebar>
    );
    const item = screen.getByTestId('item');
    expect(item.className).toContain('focus-visible:ring-2');
    expect(item.className).toContain(
      'focus-visible:ring-[var(--color-border-focus)]'
    );
  });

  it('forwards ref for button', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <Sidebar>
        <SidebarItem ref={ref} label="Item" />
      </Sidebar>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref for anchor', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <Sidebar>
        <SidebarItem ref={ref} label="Link" href="/link" />
      </Sidebar>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('applies custom className', () => {
    render(
      <Sidebar>
        <SidebarItem label="Item" data-testid="item" className="custom" />
      </Sidebar>
    );
    expect(screen.getByTestId('item').className).toContain('custom');
  });
});

/* ─── SidebarCollapseButton ────────────────────────────────────────────────── */

describe('SidebarCollapseButton', () => {
  it('renders a button', () => {
    render(
      <Sidebar collapsible>
        <SidebarCollapseButton />
      </Sidebar>
    );
    expect(
      screen.getByRole('button', { name: 'Collapse sidebar' })
    ).toBeInTheDocument();
  });

  it('toggles sidebar collapsed state on click', () => {
    render(
      <Sidebar collapsible data-testid="sidebar">
        <SidebarCollapseButton />
      </Sidebar>
    );

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar.className).toContain('w-60');

    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(sidebar.className).toContain('w-16');

    fireEvent.click(screen.getByRole('button', { name: 'Expand sidebar' }));
    expect(sidebar.className).toContain('w-60');
  });

  it('calls onCollapsedChange callback', () => {
    const onCollapsedChange = vi.fn();
    render(
      <Sidebar collapsible onCollapsedChange={onCollapsedChange}>
        <SidebarCollapseButton />
      </Sidebar>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it('has correct aria-label when expanded', () => {
    render(
      <Sidebar collapsible>
        <SidebarCollapseButton />
      </Sidebar>
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Collapse sidebar'
    );
  });

  it('has correct aria-label when collapsed', () => {
    render(
      <Sidebar collapsible defaultCollapsed>
        <SidebarCollapseButton />
      </Sidebar>
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Expand sidebar'
    );
  });

  it('applies focus ring classes', () => {
    render(
      <Sidebar collapsible>
        <SidebarCollapseButton data-testid="btn" />
      </Sidebar>
    );
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('focus-visible:ring-2');
    expect(btn.className).toContain(
      'focus-visible:ring-[var(--color-border-focus)]'
    );
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(
      <Sidebar collapsible>
        <SidebarCollapseButton ref={ref} />
      </Sidebar>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

/* ─── useSidebar Hook ──────────────────────────────────────────────────────── */

describe('useSidebar', () => {
  it('provides collapsed=false by default outside Sidebar', () => {
    const TestConsumer = () => {
      const { collapsed } = useSidebar();
      return <div data-testid="value">{String(collapsed)}</div>;
    };

    render(<TestConsumer />);
    expect(screen.getByTestId('value').textContent).toBe('false');
  });

  it('provides collapsed state from Sidebar context', () => {
    const TestConsumer = () => {
      const { collapsed } = useSidebar();
      return <div data-testid="value">{String(collapsed)}</div>;
    };

    render(
      <Sidebar collapsible defaultCollapsed>
        <TestConsumer />
      </Sidebar>
    );
    expect(screen.getByTestId('value').textContent).toBe('true');
  });
});

/* ─── Compound Component Integration ──────────────────────────────────────── */

describe('Sidebar Compound', () => {
  it('renders a full sidebar with all sub-components', () => {
    render(
      <Sidebar data-testid="sidebar" collapsible aria-label="Main navigation">
        <SidebarHeader data-testid="header">
          <span>Logo</span>
          <SidebarCollapseButton />
        </SidebarHeader>
        <SidebarContent data-testid="content">
          <SidebarGroup label="Main" data-testid="group">
            <SidebarItem label="Dashboard" active icon={<span>D</span>} />
            <SidebarItem label="Settings" icon={<span>S</span>} />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter data-testid="footer">
          <SidebarItem label="Profile" />
        </SidebarFooter>
      </Sidebar>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('group')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('collapses all sub-components when toggle is clicked', () => {
    render(
      <Sidebar data-testid="sidebar" collapsible>
        <SidebarHeader>
          <SidebarCollapseButton />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Navigation">
            <SidebarItem label="Home" icon={<span>H</span>} badge={3} />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );

    // Expanded state
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // Collapse
    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));

    // Collapsed state: label, text, badge hidden
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });
});
