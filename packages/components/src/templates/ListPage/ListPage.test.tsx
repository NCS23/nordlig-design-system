import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ListPage } from './ListPage';

describe('ListPage', () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders with children', () => {
    render(
      <ListPage>
        <ListPage.Body>Table content</ListPage.Body>
      </ListPage>
    );
    expect(screen.getByText('Table content')).toBeInTheDocument();
  });

  it('renders Header slot', () => {
    render(
      <ListPage>
        <ListPage.Header>
          <h1>Nutzer</h1>
          <button>Erstellen</button>
        </ListPage.Header>
        <ListPage.Body>Content</ListPage.Body>
      </ListPage>
    );
    expect(screen.getByText('Nutzer')).toBeInTheDocument();
    expect(screen.getByText('Erstellen')).toBeInTheDocument();
  });

  it('renders Toolbar slot', () => {
    render(
      <ListPage>
        <ListPage.Toolbar>
          <input placeholder="Suchen..." />
        </ListPage.Toolbar>
        <ListPage.Body>Content</ListPage.Body>
      </ListPage>
    );
    expect(screen.getByPlaceholderText('Suchen...')).toBeInTheDocument();
  });

  it('renders Footer slot', () => {
    render(
      <ListPage>
        <ListPage.Body>Content</ListPage.Body>
        <ListPage.Footer>Page 1 of 10</ListPage.Footer>
      </ListPage>
    );
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
  });

  it('renders all slots together', () => {
    render(
      <ListPage>
        <ListPage.Header>Header</ListPage.Header>
        <ListPage.Toolbar>Toolbar</ListPage.Toolbar>
        <ListPage.Body>Body</ListPage.Body>
        <ListPage.Footer>Footer</ListPage.Footer>
      </ListPage>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Toolbar')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  // ─── Token-based styling ──────────────────────────────────────────────────

  it('root has section gap token', () => {
    const { container } = render(
      <ListPage>
        <ListPage.Body>Content</ListPage.Body>
      </ListPage>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('gap-[var(--spacing-listpage-section-gap)]');
  });

  it('header has gap token and is flex', () => {
    render(
      <ListPage>
        <ListPage.Header data-testid="header">Header</ListPage.Header>
        <ListPage.Body>Content</ListPage.Body>
      </ListPage>
    );
    const header = screen.getByTestId('header');
    expect(header.className).toContain('gap-[var(--spacing-listpage-header-gap)]');
    expect(header.className).toContain('justify-between');
  });

  it('toolbar has gap token', () => {
    render(
      <ListPage>
        <ListPage.Toolbar data-testid="toolbar">Filters</ListPage.Toolbar>
        <ListPage.Body>Content</ListPage.Body>
      </ListPage>
    );
    expect(screen.getByTestId('toolbar').className).toContain(
      'gap-[var(--spacing-listpage-toolbar-gap)]'
    );
  });

  it('footer has gap token and is flex', () => {
    render(
      <ListPage>
        <ListPage.Body>Content</ListPage.Body>
        <ListPage.Footer data-testid="footer">Footer</ListPage.Footer>
      </ListPage>
    );
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('gap-[var(--spacing-listpage-footer-gap)]');
    expect(footer.className).toContain('justify-between');
  });

  it('body has flex-1 for filling available space', () => {
    render(
      <ListPage>
        <ListPage.Body data-testid="body">Content</ListPage.Body>
      </ListPage>
    );
    expect(screen.getByTestId('body').className).toContain('flex-1');
  });

  // ─── Accessibility ────────────────────────────────────────────────────────

  it('uses semantic HTML elements', () => {
    render(
      <ListPage>
        <ListPage.Header>Header</ListPage.Header>
        <ListPage.Toolbar>Toolbar</ListPage.Toolbar>
        <ListPage.Body>Body</ListPage.Body>
        <ListPage.Footer>Footer</ListPage.Footer>
      </ListPage>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('toolbar')).toBeInTheDocument(); // toolbar
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  it('toolbar has accessible label', () => {
    render(
      <ListPage>
        <ListPage.Toolbar data-testid="toolbar">Filters</ListPage.Toolbar>
        <ListPage.Body>Content</ListPage.Body>
      </ListPage>
    );
    expect(screen.getByTestId('toolbar')).toHaveAttribute(
      'aria-label',
      'Filter und Sortierung'
    );
  });

  // ─── className & Ref ──────────────────────────────────────────────────────

  it('applies custom className on root', () => {
    const { container } = render(
      <ListPage className="my-list">
        <ListPage.Body>Content</ListPage.Body>
      </ListPage>
    );
    expect((container.firstChild as HTMLElement).className).toContain('my-list');
  });

  it('applies custom className on sub-components', () => {
    render(
      <ListPage>
        <ListPage.Header data-testid="header" className="custom-header">
          Header
        </ListPage.Header>
        <ListPage.Toolbar data-testid="toolbar" className="custom-toolbar">
          Toolbar
        </ListPage.Toolbar>
        <ListPage.Body data-testid="body" className="custom-body">
          Body
        </ListPage.Body>
        <ListPage.Footer data-testid="footer" className="custom-footer">
          Footer
        </ListPage.Footer>
      </ListPage>
    );
    expect(screen.getByTestId('header').className).toContain('custom-header');
    expect(screen.getByTestId('toolbar').className).toContain('custom-toolbar');
    expect(screen.getByTestId('body').className).toContain('custom-body');
    expect(screen.getByTestId('footer').className).toContain('custom-footer');
  });

  it('forwards ref on root', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <ListPage ref={ref}>
        <ListPage.Body>Content</ListPage.Body>
      </ListPage>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref on Body', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <ListPage>
        <ListPage.Body ref={ref}>Content</ListPage.Body>
      </ListPage>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
