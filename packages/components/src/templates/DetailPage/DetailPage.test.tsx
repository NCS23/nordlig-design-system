import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DetailPage } from './DetailPage';

describe('DetailPage', () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders with children', () => {
    render(
      <DetailPage>
        <DetailPage.Body>
          <DetailPage.Content>Detail content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByText('Detail content')).toBeInTheDocument();
  });

  it('renders Header slot', () => {
    render(
      <DetailPage>
        <DetailPage.Header>Page Title</DetailPage.Header>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByText('Page Title')).toBeInTheDocument();
  });

  it('renders Content slot', () => {
    render(
      <DetailPage>
        <DetailPage.Body>
          <DetailPage.Content>Main content area</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByText('Main content area')).toBeInTheDocument();
  });

  it('renders Sidebar slot', () => {
    render(
      <DetailPage>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
          <DetailPage.Sidebar>Sidebar info</DetailPage.Sidebar>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByText('Sidebar info')).toBeInTheDocument();
  });

  it('renders Body slot (Content + Sidebar wrapper)', () => {
    render(
      <DetailPage>
        <DetailPage.Body data-testid="body">
          <DetailPage.Content>Content</DetailPage.Content>
          <DetailPage.Sidebar>Sidebar</DetailPage.Sidebar>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByTestId('body')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  it('renders all slots together', () => {
    render(
      <DetailPage>
        <DetailPage.Header>Header</DetailPage.Header>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
          <DetailPage.Sidebar>Sidebar</DetailPage.Sidebar>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  // ─── Semantic HTML ──────────────────────────────────────────────────────────

  it('Header uses semantic <header> element', () => {
    render(
      <DetailPage>
        <DetailPage.Header>Title</DetailPage.Header>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('Sidebar uses semantic <aside> element', () => {
    render(
      <DetailPage>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
          <DetailPage.Sidebar>Sidebar</DetailPage.Sidebar>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  // ─── Responsive classes ─────────────────────────────────────────────────────

  it('Body has responsive classes (flex-col on mobile, lg:flex-row on desktop)', () => {
    render(
      <DetailPage>
        <DetailPage.Body data-testid="body">
          <DetailPage.Content>Content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    const body = screen.getByTestId('body');
    expect(body.className).toContain('flex-col');
    expect(body.className).toContain('lg:flex-row');
  });

  it('Sidebar has responsive width classes', () => {
    render(
      <DetailPage>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
          <DetailPage.Sidebar data-testid="sidebar">Sidebar</DetailPage.Sidebar>
        </DetailPage.Body>
      </DetailPage>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar.className).toContain('w-full');
    expect(sidebar.className).toContain('lg:w-[var(--sizing-detailpage-sidebar-width)]');
    expect(sidebar.className).toContain('lg:shrink-0');
  });

  // ─── Token-based styling ────────────────────────────────────────────────────

  it('root has section-gap token', () => {
    const { container } = render(
      <DetailPage>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('gap-[var(--spacing-detailpage-section-gap)]');
  });

  it('Header has header-gap token', () => {
    render(
      <DetailPage>
        <DetailPage.Header data-testid="header">Title</DetailPage.Header>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByTestId('header').className).toContain(
      'gap-[var(--spacing-detailpage-header-gap)]'
    );
  });

  it('Content has content-gap token', () => {
    render(
      <DetailPage>
        <DetailPage.Body>
          <DetailPage.Content data-testid="content">Content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByTestId('content').className).toContain(
      'gap-[var(--spacing-detailpage-content-gap)]'
    );
  });

  // ─── className & Ref ──────────────────────────────────────────────────────

  it('applies custom className on root', () => {
    const { container } = render(
      <DetailPage className="my-detail">
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    expect((container.firstChild as HTMLElement).className).toContain('my-detail');
  });

  it('applies custom className on sub-components', () => {
    render(
      <DetailPage>
        <DetailPage.Header data-testid="header" className="custom-header">
          Title
        </DetailPage.Header>
        <DetailPage.Body data-testid="body" className="custom-body">
          <DetailPage.Content data-testid="content" className="custom-content">
            Content
          </DetailPage.Content>
          <DetailPage.Sidebar data-testid="sidebar" className="custom-sidebar">
            Sidebar
          </DetailPage.Sidebar>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(screen.getByTestId('header').className).toContain('custom-header');
    expect(screen.getByTestId('body').className).toContain('custom-body');
    expect(screen.getByTestId('content').className).toContain('custom-content');
    expect(screen.getByTestId('sidebar').className).toContain('custom-sidebar');
  });

  it('forwards ref on root (HTMLDivElement)', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <DetailPage ref={ref}>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref on Sidebar (HTMLElement)', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <DetailPage>
        <DetailPage.Body>
          <DetailPage.Content>Content</DetailPage.Content>
          <DetailPage.Sidebar ref={ref}>Sidebar</DetailPage.Sidebar>
        </DetailPage.Body>
      </DetailPage>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
