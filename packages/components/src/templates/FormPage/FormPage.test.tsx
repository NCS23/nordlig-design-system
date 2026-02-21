import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormPage } from './FormPage';

describe('FormPage', () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders with children', () => {
    render(
      <FormPage>
        <FormPage.Body>Form content</FormPage.Body>
      </FormPage>
    );
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('renders Header slot', () => {
    render(
      <FormPage>
        <FormPage.Header>Page Title</FormPage.Header>
        <FormPage.Body>Content</FormPage.Body>
      </FormPage>
    );
    expect(screen.getByText('Page Title')).toBeInTheDocument();
  });

  it('renders Body slot', () => {
    render(
      <FormPage>
        <FormPage.Body>Form fields</FormPage.Body>
      </FormPage>
    );
    expect(screen.getByText('Form fields')).toBeInTheDocument();
  });

  it('renders Actions slot', () => {
    render(
      <FormPage>
        <FormPage.Body>Content</FormPage.Body>
        <FormPage.Actions>
          <button>Speichern</button>
          <button>Abbrechen</button>
        </FormPage.Actions>
      </FormPage>
    );
    expect(screen.getByText('Speichern')).toBeInTheDocument();
    expect(screen.getByText('Abbrechen')).toBeInTheDocument();
  });

  it('renders all slots together', () => {
    render(
      <FormPage>
        <FormPage.Header>Header</FormPage.Header>
        <FormPage.Body>Body</FormPage.Body>
        <FormPage.Actions>Actions</FormPage.Actions>
      </FormPage>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  // ─── maxWidth ─────────────────────────────────────────────────────────────

  it('applies sm max-width token', () => {
    const { container } = render(
      <FormPage maxWidth="sm">
        <FormPage.Body>Content</FormPage.Body>
      </FormPage>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('max-w-[var(--sizing-formpage-max-width-sm)]');
  });

  it('applies md max-width token by default', () => {
    const { container } = render(
      <FormPage>
        <FormPage.Body>Content</FormPage.Body>
      </FormPage>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('max-w-[var(--sizing-formpage-max-width-md)]');
  });

  it('applies lg max-width token', () => {
    const { container } = render(
      <FormPage maxWidth="lg">
        <FormPage.Body>Content</FormPage.Body>
      </FormPage>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('max-w-[var(--sizing-formpage-max-width-lg)]');
  });

  // ─── Token-based styling ──────────────────────────────────────────────────

  it('root has gap token', () => {
    const { container } = render(
      <FormPage>
        <FormPage.Body>Content</FormPage.Body>
      </FormPage>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('gap-[var(--spacing-formpage-header-gap)]');
  });

  it('body has gap token', () => {
    render(
      <FormPage>
        <FormPage.Body data-testid="body">Content</FormPage.Body>
      </FormPage>
    );
    expect(screen.getByTestId('body').className).toContain(
      'gap-[var(--spacing-formpage-body-gap)]'
    );
  });

  it('actions has gap token', () => {
    render(
      <FormPage>
        <FormPage.Body>Content</FormPage.Body>
        <FormPage.Actions data-testid="actions">
          <button>Save</button>
        </FormPage.Actions>
      </FormPage>
    );
    expect(screen.getByTestId('actions').className).toContain(
      'gap-[var(--spacing-formpage-actions-gap)]'
    );
  });

  it('actions are right-aligned', () => {
    render(
      <FormPage>
        <FormPage.Body>Content</FormPage.Body>
        <FormPage.Actions data-testid="actions">
          <button>Save</button>
        </FormPage.Actions>
      </FormPage>
    );
    expect(screen.getByTestId('actions').className).toContain('justify-end');
  });

  // ─── Accessibility ────────────────────────────────────────────────────────

  it('uses semantic HTML elements', () => {
    render(
      <FormPage>
        <FormPage.Header>Title</FormPage.Header>
        <FormPage.Body>Content</FormPage.Body>
        <FormPage.Actions>
          <button>Save</button>
        </FormPage.Actions>
      </FormPage>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer (Actions)
  });

  // ─── className & Ref ──────────────────────────────────────────────────────

  it('applies custom className on root', () => {
    const { container } = render(
      <FormPage className="my-form">
        <FormPage.Body>Content</FormPage.Body>
      </FormPage>
    );
    expect((container.firstChild as HTMLElement).className).toContain('my-form');
  });

  it('applies custom className on sub-components', () => {
    render(
      <FormPage>
        <FormPage.Header data-testid="header" className="custom-header">
          Title
        </FormPage.Header>
        <FormPage.Body data-testid="body" className="custom-body">
          Content
        </FormPage.Body>
        <FormPage.Actions data-testid="actions" className="custom-actions">
          <button>Save</button>
        </FormPage.Actions>
      </FormPage>
    );
    expect(screen.getByTestId('header').className).toContain('custom-header');
    expect(screen.getByTestId('body').className).toContain('custom-body');
    expect(screen.getByTestId('actions').className).toContain('custom-actions');
  });

  it('forwards ref on root', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <FormPage ref={ref}>
        <FormPage.Body>Content</FormPage.Body>
      </FormPage>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref on Body', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <FormPage>
        <FormPage.Body ref={ref}>Content</FormPage.Body>
      </FormPage>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
