import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageShell } from './PageShell';

describe('PageShell', () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders with children', () => {
    render(
      <PageShell>
        <PageShell.Content>Main content</PageShell.Content>
      </PageShell>
    );
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('renders Header slot', () => {
    render(
      <PageShell>
        <PageShell.Header>Header text</PageShell.Header>
        <PageShell.Content>Content</PageShell.Content>
      </PageShell>
    );
    expect(screen.getByText('Header text')).toBeInTheDocument();
  });

  it('renders Sidebar slot', () => {
    render(
      <PageShell>
        <PageShell.Body>
          <PageShell.Sidebar>Sidebar nav</PageShell.Sidebar>
          <PageShell.Content>Content</PageShell.Content>
        </PageShell.Body>
      </PageShell>
    );
    expect(screen.getByText('Sidebar nav')).toBeInTheDocument();
  });

  it('renders Footer slot', () => {
    render(
      <PageShell>
        <PageShell.Content>Content</PageShell.Content>
        <PageShell.Footer>Footer text</PageShell.Footer>
      </PageShell>
    );
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('renders all slots together', () => {
    render(
      <PageShell>
        <PageShell.Header>Header</PageShell.Header>
        <PageShell.Body>
          <PageShell.Sidebar>Sidebar</PageShell.Sidebar>
          <PageShell.Content>Content</PageShell.Content>
        </PageShell.Body>
        <PageShell.Footer>Footer</PageShell.Footer>
      </PageShell>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  // ─── Token-based styling ──────────────────────────────────────────────────

  it('root has page background token', () => {
    const { container } = render(
      <PageShell>
        <PageShell.Content>Content</PageShell.Content>
      </PageShell>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('bg-[var(--color-shell-bg)]');
  });

  it('header has token-based background', () => {
    render(
      <PageShell>
        <PageShell.Header data-testid="header">Header</PageShell.Header>
        <PageShell.Content>Content</PageShell.Content>
      </PageShell>
    );
    const header = screen.getByTestId('header');
    expect(header.className).toContain('bg-[var(--color-shell-header-bg)]');
  });

  it('header has token-based height', () => {
    render(
      <PageShell>
        <PageShell.Header data-testid="header">Header</PageShell.Header>
        <PageShell.Content>Content</PageShell.Content>
      </PageShell>
    );
    expect(screen.getByTestId('header').className).toContain(
      'h-[var(--sizing-shell-header-height)]'
    );
  });

  it('footer has token-based border', () => {
    render(
      <PageShell>
        <PageShell.Content>Content</PageShell.Content>
        <PageShell.Footer data-testid="footer">Footer</PageShell.Footer>
      </PageShell>
    );
    expect(screen.getByTestId('footer').className).toContain(
      'border-[var(--color-shell-footer-border)]'
    );
  });

  it('content has token-based padding', () => {
    render(
      <PageShell>
        <PageShell.Content data-testid="content">Content</PageShell.Content>
      </PageShell>
    );
    expect(screen.getByTestId('content').className).toContain(
      'p-[var(--spacing-shell-content-p)]'
    );
  });

  it('content removes padding with noPadding', () => {
    render(
      <PageShell>
        <PageShell.Content data-testid="content" noPadding>
          Content
        </PageShell.Content>
      </PageShell>
    );
    expect(screen.getByTestId('content').className).not.toContain(
      'p-[var(--spacing-shell-content-p)]'
    );
  });

  // ─── Sticky header ────────────────────────────────────────────────────────

  it('header is sticky by default', () => {
    render(
      <PageShell>
        <PageShell.Header data-testid="header">Header</PageShell.Header>
        <PageShell.Content>Content</PageShell.Content>
      </PageShell>
    );
    expect(screen.getByTestId('header').className).toContain('sticky');
  });

  it('header is not sticky when stickyHeader is false', () => {
    render(
      <PageShell stickyHeader={false}>
        <PageShell.Header data-testid="header">Header</PageShell.Header>
        <PageShell.Content>Content</PageShell.Content>
      </PageShell>
    );
    expect(screen.getByTestId('header').className).not.toContain('sticky');
  });

  // ─── Sidebar position ────────────────────────────────────────────────────

  it('sidebar position defaults to left (no flex-row-reverse)', () => {
    render(
      <PageShell>
        <PageShell.Body data-testid="body">
          <PageShell.Sidebar>Sidebar</PageShell.Sidebar>
          <PageShell.Content>Content</PageShell.Content>
        </PageShell.Body>
      </PageShell>
    );
    expect(screen.getByTestId('body').className).not.toContain('flex-row-reverse');
  });

  it('sidebar position right applies flex-row-reverse', () => {
    render(
      <PageShell sidebarPosition="right">
        <PageShell.Body data-testid="body">
          <PageShell.Sidebar>Sidebar</PageShell.Sidebar>
          <PageShell.Content>Content</PageShell.Content>
        </PageShell.Body>
      </PageShell>
    );
    expect(screen.getByTestId('body').className).toContain('flex-row-reverse');
  });

  // ─── Content ──────────────────────────────────────────────────────────────

  it('content area is scrollable', () => {
    render(
      <PageShell>
        <PageShell.Content data-testid="content">Content</PageShell.Content>
      </PageShell>
    );
    expect(screen.getByTestId('content').className).toContain('overflow-y-auto');
  });

  it('content supports maxWidth', () => {
    render(
      <PageShell>
        <PageShell.Content data-testid="content" maxWidth="max-w-5xl">
          Content
        </PageShell.Content>
      </PageShell>
    );
    const main = screen.getByTestId('content');
    const inner = main.firstChild as HTMLElement;
    expect(inner.className).toContain('max-w-5xl');
    expect(inner.className).toContain('mx-auto');
  });

  // ─── Accessibility ────────────────────────────────────────────────────────

  it('uses semantic HTML elements', () => {
    render(
      <PageShell>
        <PageShell.Header>Header</PageShell.Header>
        <PageShell.Body>
          <PageShell.Sidebar>Sidebar</PageShell.Sidebar>
          <PageShell.Content>Content</PageShell.Content>
        </PageShell.Body>
        <PageShell.Footer>Footer</PageShell.Footer>
      </PageShell>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('complementary')).toBeInTheDocument(); // aside
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  // ─── className & Ref ──────────────────────────────────────────────────────

  it('applies custom className on root', () => {
    const { container } = render(
      <PageShell className="my-shell">
        <PageShell.Content>Content</PageShell.Content>
      </PageShell>
    );
    expect((container.firstChild as HTMLElement).className).toContain('my-shell');
  });

  it('applies custom className on sub-components', () => {
    render(
      <PageShell>
        <PageShell.Header data-testid="header" className="custom-header">
          Header
        </PageShell.Header>
        <PageShell.Content data-testid="content" className="custom-content">
          Content
        </PageShell.Content>
      </PageShell>
    );
    expect(screen.getByTestId('header').className).toContain('custom-header');
    expect(screen.getByTestId('content').className).toContain('custom-content');
  });

  it('forwards ref on root', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <PageShell ref={ref}>
        <PageShell.Content>Content</PageShell.Content>
      </PageShell>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref on Content', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <PageShell>
        <PageShell.Content ref={ref}>Content</PageShell.Content>
      </PageShell>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
