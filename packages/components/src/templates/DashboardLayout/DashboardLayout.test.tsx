import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardLayout, useDashboardLayout } from './DashboardLayout';

// Helper to render with common structure
function renderDashboard(props: React.ComponentProps<typeof DashboardLayout> = {}, children?: React.ReactNode) {
  return render(
    <DashboardLayout {...props}>
      {children ?? (
        <>
          <DashboardLayout.Header>Header</DashboardLayout.Header>
          <DashboardLayout.Body>
            <DashboardLayout.Sidebar>Sidebar</DashboardLayout.Sidebar>
            <DashboardLayout.Content>Content</DashboardLayout.Content>
          </DashboardLayout.Body>
        </>
      )}
    </DashboardLayout>
  );
}

describe('DashboardLayout', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────
  describe('Rendering', () => {
    it('renders children', () => {
      renderDashboard();
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders Header slot', () => {
      render(
        <DashboardLayout>
          <DashboardLayout.Header>My Header</DashboardLayout.Header>
        </DashboardLayout>
      );
      expect(screen.getByText('My Header')).toBeInTheDocument();
    });

    it('renders Sidebar slot', () => {
      render(
        <DashboardLayout>
          <DashboardLayout.Body>
            <DashboardLayout.Sidebar>Nav Items</DashboardLayout.Sidebar>
            <DashboardLayout.Content>Main</DashboardLayout.Content>
          </DashboardLayout.Body>
        </DashboardLayout>
      );
      expect(screen.getByText('Nav Items')).toBeInTheDocument();
    });

    it('renders Content slot', () => {
      render(
        <DashboardLayout>
          <DashboardLayout.Body>
            <DashboardLayout.Content>Page Content</DashboardLayout.Content>
          </DashboardLayout.Body>
        </DashboardLayout>
      );
      expect(screen.getByText('Page Content')).toBeInTheDocument();
    });

    it('renders Footer slot', () => {
      render(
        <DashboardLayout>
          <DashboardLayout.Footer>Footer Text</DashboardLayout.Footer>
        </DashboardLayout>
      );
      expect(screen.getByText('Footer Text')).toBeInTheDocument();
    });
  });

  // ─── Token-based Styling ────────────────────────────────────────────────
  describe('Token-based Styling', () => {
    it('root has dashboard bg token', () => {
      const { container } = renderDashboard();
      const root = container.firstChild as HTMLElement;
      expect(root.className).toContain('bg-[var(--color-dashboard-bg)]');
    });

    it('header has dashboard header tokens', () => {
      renderDashboard();
      const header = screen.getByText('Header').closest('header')!;
      expect(header.className).toContain('bg-[var(--color-dashboard-header-bg)]');
      expect(header.className).toContain('h-[var(--sizing-dashboard-header-height)]');
      expect(header.className).toContain('[box-shadow:var(--shadow-dashboard-header)]');
    });

    it('header is sticky', () => {
      renderDashboard();
      const header = screen.getByText('Header').closest('header')!;
      expect(header.className).toContain('sticky');
      expect(header.className).toContain('top-0');
    });

    it('content has padding token', () => {
      renderDashboard();
      const main = screen.getByRole('main');
      expect(main.className).toContain('p-[var(--spacing-dashboard-content-p)]');
    });

    it('content noPadding removes padding', () => {
      render(
        <DashboardLayout>
          <DashboardLayout.Body>
            <DashboardLayout.Content noPadding>No pad</DashboardLayout.Content>
          </DashboardLayout.Body>
        </DashboardLayout>
      );
      const main = screen.getByRole('main');
      expect(main.className).not.toContain('p-[var(--spacing-dashboard-content-p)]');
    });
  });

  // ─── Sidebar State ──────────────────────────────────────────────────────
  describe('Sidebar State', () => {
    it('sidebar uses expanded width by default', () => {
      renderDashboard();
      // Desktop sidebar (hidden on mobile, visible on md+)
      const aside = screen.getByText('Sidebar').closest('aside')!;
      expect(aside.className).toContain('w-[var(--sizing-dashboard-sidebar-width)]');
    });

    it('sidebar uses collapsed width when collapsed', () => {
      renderDashboard({ defaultSidebarCollapsed: true });
      const aside = screen.getByText('Sidebar').closest('aside')!;
      expect(aside.className).toContain('w-[var(--sizing-dashboard-sidebar-collapsed-width)]');
    });

    it('calls onSidebarCollapsedChange', () => {
      const onChange = vi.fn();
      const TestChild = () => {
        const { setSidebarCollapsed } = useDashboardLayout();
        return <button onClick={() => setSidebarCollapsed(true)}>Collapse</button>;
      };
      render(
        <DashboardLayout onSidebarCollapsedChange={onChange}>
          <TestChild />
        </DashboardLayout>
      );
      fireEvent.click(screen.getByText('Collapse'));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('supports controlled collapsed state', () => {
      const { rerender } = render(
        <DashboardLayout sidebarCollapsed={false}>
          <DashboardLayout.Body>
            <DashboardLayout.Sidebar>Nav</DashboardLayout.Sidebar>
            <DashboardLayout.Content>Main</DashboardLayout.Content>
          </DashboardLayout.Body>
        </DashboardLayout>
      );
      const aside = screen.getByText('Nav').closest('aside')!;
      expect(aside.className).toContain('w-[var(--sizing-dashboard-sidebar-width)]');

      rerender(
        <DashboardLayout sidebarCollapsed={true}>
          <DashboardLayout.Body>
            <DashboardLayout.Sidebar>Nav</DashboardLayout.Sidebar>
            <DashboardLayout.Content>Main</DashboardLayout.Content>
          </DashboardLayout.Body>
        </DashboardLayout>
      );
      expect(aside.className).toContain('w-[var(--sizing-dashboard-sidebar-collapsed-width)]');
    });
  });

  // ─── Mobile Overlay ─────────────────────────────────────────────────────
  describe('Mobile Overlay', () => {
    it('does not render overlay when sidebarOpen is false', () => {
      renderDashboard();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders overlay when sidebarOpen is true', () => {
      renderDashboard({ defaultSidebarOpen: true });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('overlay backdrop has overlay token', () => {
      renderDashboard({ defaultSidebarOpen: true });
      const dialog = screen.getByRole('dialog');
      const backdrop = dialog.parentElement!.querySelector('[aria-hidden="true"]')!;
      expect(backdrop.className).toContain('bg-[var(--color-dashboard-overlay-bg)]');
    });

    it('clicking backdrop calls setSidebarOpen(false)', () => {
      const onChange = vi.fn();
      render(
        <DashboardLayout defaultSidebarOpen={true} onSidebarOpenChange={onChange}>
          <DashboardLayout.Body>
            <DashboardLayout.Sidebar>Nav</DashboardLayout.Sidebar>
            <DashboardLayout.Content>Main</DashboardLayout.Content>
          </DashboardLayout.Body>
        </DashboardLayout>
      );
      const backdrop = screen.getByRole('dialog').parentElement!.querySelector('[aria-hidden="true"]')!;
      fireEvent.click(backdrop);
      expect(onChange).toHaveBeenCalledWith(false);
    });
  });

  // ─── Content Features ───────────────────────────────────────────────────
  describe('Content Features', () => {
    it('content supports maxWidth', () => {
      render(
        <DashboardLayout>
          <DashboardLayout.Body>
            <DashboardLayout.Content maxWidth="max-w-4xl">
              <span>Bounded</span>
            </DashboardLayout.Content>
          </DashboardLayout.Body>
        </DashboardLayout>
      );
      const text = screen.getByText('Bounded');
      const wrapper = text.parentElement!;
      expect(wrapper.className).toContain('max-w-4xl');
      expect(wrapper.className).toContain('mx-auto');
    });
  });

  // ─── Accessibility ──────────────────────────────────────────────────────
  describe('Accessibility', () => {
    it('uses semantic HTML elements', () => {
      render(
        <DashboardLayout>
          <DashboardLayout.Header>H</DashboardLayout.Header>
          <DashboardLayout.Body>
            <DashboardLayout.Sidebar>S</DashboardLayout.Sidebar>
            <DashboardLayout.Content>C</DashboardLayout.Content>
          </DashboardLayout.Body>
          <DashboardLayout.Footer>F</DashboardLayout.Footer>
        </DashboardLayout>
      );
      expect(screen.getByText('H').closest('header')).toBeInTheDocument();
      expect(screen.getByText('S').closest('aside')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('F').closest('footer')).toBeInTheDocument();
    });

    it('mobile overlay has dialog role', () => {
      renderDashboard({ defaultSidebarOpen: true });
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-label', 'Navigation');
    });
  });

  // ─── Ref & className ───────────────────────────────────────────────────
  describe('Ref & className', () => {
    it('forwards ref on root', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <DashboardLayout ref={ref}>
          <div>content</div>
        </DashboardLayout>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('applies custom className', () => {
      const { container } = render(
        <DashboardLayout className="custom-class">
          <div>content</div>
        </DashboardLayout>
      );
      expect((container.firstChild as HTMLElement).className).toContain('custom-class');
    });
  });
});
