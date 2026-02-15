import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as a p element by default', () => {
    render(<Text data-testid="text">Content</Text>);
    expect(screen.getByTestId('text').tagName).toBe('P');
  });

  it('renders as span when as="span"', () => {
    render(<Text data-testid="text" as="span">Content</Text>);
    expect(screen.getByTestId('text').tagName).toBe('SPAN');
  });

  it('renders as div when as="div"', () => {
    render(<Text data-testid="text" as="div">Content</Text>);
    expect(screen.getByTestId('text').tagName).toBe('DIV');
  });

  it('applies default variant (body)', () => {
    render(<Text data-testid="text">Default</Text>);
    const el = screen.getByTestId('text');
    expect(el.className).toContain('text-base');
    expect(el.className).toContain('text-[var(--color-text-base)]');
  });

  it('applies variant=body', () => {
    render(<Text data-testid="text" variant="body">Body text</Text>);
    const el = screen.getByTestId('text');
    expect(el.className).toContain('text-base');
    expect(el.className).toContain('text-[var(--color-text-base)]');
  });

  it('applies variant=caption', () => {
    render(<Text data-testid="text" variant="caption">Caption text</Text>);
    const el = screen.getByTestId('text');
    expect(el.className).toContain('text-sm');
    expect(el.className).toContain('text-[var(--color-text-base)]');
  });

  it('applies variant=small', () => {
    render(<Text data-testid="text" variant="small">Small text</Text>);
    const el = screen.getByTestId('text');
    expect(el.className).toContain('text-xs');
    expect(el.className).toContain('text-[var(--color-text-base)]');
  });

  it('applies variant=muted', () => {
    render(<Text data-testid="text" variant="muted">Muted text</Text>);
    const el = screen.getByTestId('text');
    expect(el.className).toContain('text-sm');
    expect(el.className).toContain('text-[var(--color-text-muted)]');
  });

  it('applies custom className', () => {
    render(<Text data-testid="text" className="custom-class">Text</Text>);
    expect(screen.getByTestId('text').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Text ref={ref}>Text</Text>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('passes through HTML attributes', () => {
    render(
      <Text data-testid="text" aria-label="Description" role="note">
        Content
      </Text>
    );
    const el = screen.getByTestId('text');
    expect(el).toHaveAttribute('aria-label', 'Description');
    expect(el).toHaveAttribute('role', 'note');
  });

  it('passes through id attribute', () => {
    render(<Text data-testid="text" id="my-text">Content</Text>);
    expect(screen.getByTestId('text')).toHaveAttribute('id', 'my-text');
  });
});
