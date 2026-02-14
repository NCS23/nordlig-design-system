import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderBreadcrumbs(props?: { separator?: React.ReactNode; className?: string }) {
  return render(
    <Breadcrumbs separator={props?.separator} className={props?.className}>
      <BreadcrumbItem href="/home">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Produkte</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Laufschuhe</BreadcrumbItem>
    </Breadcrumbs>
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Breadcrumbs', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders nav with aria-label', () => {
    renderBreadcrumbs();
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb');
  });

  it('renders all items', () => {
    renderBreadcrumbs();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Produkte')).toBeInTheDocument();
    expect(screen.getByText('Laufschuhe')).toBeInTheDocument();
  });

  // ─── Separator ────────────────────────────────────────────────────────

  it('renders separators between items', () => {
    renderBreadcrumbs();
    const list = screen.getByRole('navigation').querySelector('ol');
    const separators = list?.querySelectorAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(2);
  });

  // ─── Current Item ─────────────────────────────────────────────────────

  it('applies current item styling', () => {
    renderBreadcrumbs();
    const current = screen.getByText('Laufschuhe');
    expect(current).toHaveClass('text-[var(--color-breadcrumbs-text-current)]');
    expect(current).toHaveClass('font-medium');
  });

  // ─── Link Items ───────────────────────────────────────────────────────

  it('renders link items as anchor elements', () => {
    renderBreadcrumbs();
    const homeLink = screen.getByText('Home');
    expect(homeLink.tagName).toBe('A');
    expect(homeLink).toHaveAttribute('href', '/home');
  });

  // ─── Non-Link Items ──────────────────────────────────────────────────

  it('renders current item as span (not a link)', () => {
    renderBreadcrumbs();
    const current = screen.getByText('Laufschuhe');
    expect(current.tagName).toBe('SPAN');
  });

  // ─── Custom Separator ─────────────────────────────────────────────────

  it('renders custom separator', () => {
    render(
      <Breadcrumbs separator=">">
        <BreadcrumbItem href="/a">A</BreadcrumbItem>
        <BreadcrumbItem isCurrent>B</BreadcrumbItem>
      </Breadcrumbs>
    );
    const separators = screen.getByRole('navigation').querySelectorAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(1);
    expect(separators[0]).toHaveTextContent('>');
  });

  // ─── Custom className ────────────────────────────────────────────────

  it('merges custom className on nav', () => {
    renderBreadcrumbs({ className: 'custom-breadcrumb' });
    expect(screen.getByRole('navigation')).toHaveClass('custom-breadcrumb');
  });

  // ─── aria-current ────────────────────────────────────────────────────

  it('sets aria-current on current item', () => {
    renderBreadcrumbs();
    const items = screen.getAllByRole('listitem');
    const currentItem = items.find(
      (item) => item.getAttribute('aria-current') === 'page'
    );
    expect(currentItem).toBeInTheDocument();
    expect(currentItem).toHaveTextContent('Laufschuhe');
  });

  // ─── Empty State ──────────────────────────────────────────────────────

  it('renders empty breadcrumbs without errors', () => {
    const { container } = render(
      <Breadcrumbs>{[]}</Breadcrumbs>
    );
    expect(container.querySelector('nav')).toBeInTheDocument();
    const list = container.querySelector('ol');
    expect(list?.children).toHaveLength(0);
  });
});
