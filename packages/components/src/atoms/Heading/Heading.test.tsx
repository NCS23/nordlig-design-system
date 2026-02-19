import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders children', () => {
    render(<Heading level={1}>Hello World</Heading>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders h1 for level=1', () => {
    render(<Heading data-testid="heading" level={1}>Title</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('H1');
  });

  it('renders h2 for level=2', () => {
    render(<Heading data-testid="heading" level={2}>Subtitle</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('H2');
  });

  it('renders h3 for level=3', () => {
    render(<Heading data-testid="heading" level={3}>Section</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('H3');
  });

  it('renders h4 for level=4', () => {
    render(<Heading data-testid="heading" level={4}>Subsection</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('H4');
  });

  it('renders h5 for level=5', () => {
    render(<Heading data-testid="heading" level={5}>Label</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('H5');
  });

  it('renders h6 for level=6', () => {
    render(<Heading data-testid="heading" level={6}>Small heading</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('H6');
  });

  it('applies level=1 styles', () => {
    render(<Heading data-testid="heading" level={1}>H1</Heading>);
    const el = screen.getByTestId('heading');
    expect(el.className).toContain('text-[length:var(--font-heading-h1-size)]');
    expect(el.className).toContain('[font-weight:var(--font-heading-h1-weight)]');
    expect(el.className).toContain('tracking-tight');
    expect(el.className).toContain('text-[var(--color-text-heading)]');
  });

  it('applies level=2 styles', () => {
    render(<Heading data-testid="heading" level={2}>H2</Heading>);
    const el = screen.getByTestId('heading');
    expect(el.className).toContain('text-[length:var(--font-heading-h2-size)]');
    expect(el.className).toContain('[font-weight:var(--font-heading-h2-weight)]');
    expect(el.className).toContain('tracking-tight');
  });

  it('applies level=3 styles', () => {
    render(<Heading data-testid="heading" level={3}>H3</Heading>);
    const el = screen.getByTestId('heading');
    expect(el.className).toContain('text-[length:var(--font-heading-h3-size)]');
    expect(el.className).toContain('[font-weight:var(--font-heading-h3-weight)]');
  });

  it('applies level=4 styles', () => {
    render(<Heading data-testid="heading" level={4}>H4</Heading>);
    const el = screen.getByTestId('heading');
    expect(el.className).toContain('text-[length:var(--font-heading-h4-size)]');
    expect(el.className).toContain('[font-weight:var(--font-heading-h4-weight)]');
  });

  it('applies level=5 styles', () => {
    render(<Heading data-testid="heading" level={5}>H5</Heading>);
    const el = screen.getByTestId('heading');
    expect(el.className).toContain('text-[length:var(--font-heading-h5-size)]');
    expect(el.className).toContain('[font-weight:var(--font-heading-h5-weight)]');
  });

  it('applies level=6 styles', () => {
    render(<Heading data-testid="heading" level={6}>H6</Heading>);
    const el = screen.getByTestId('heading');
    expect(el.className).toContain('text-[length:var(--font-heading-h6-size)]');
    expect(el.className).toContain('[font-weight:var(--font-heading-h6-weight)]');
  });

  it('overrides tag with as prop', () => {
    render(<Heading data-testid="heading" level={1} as="h3">Visual H1, Semantic H3</Heading>);
    const el = screen.getByTestId('heading');
    expect(el.tagName).toBe('H3');
    expect(el.className).toContain('text-[length:var(--font-heading-h1-size)]');
    expect(el.className).toContain('[font-weight:var(--font-heading-h1-weight)]');
  });

  it('applies custom className', () => {
    render(<Heading data-testid="heading" level={2} className="custom-class">Title</Heading>);
    expect(screen.getByTestId('heading').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLHeadingElement>;
    render(<Heading ref={ref} level={1}>Title</Heading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it('passes through HTML attributes', () => {
    render(
      <Heading data-testid="heading" level={1} aria-label="Main title" id="main-heading">
        Title
      </Heading>
    );
    const el = screen.getByTestId('heading');
    expect(el).toHaveAttribute('aria-label', 'Main title');
    expect(el).toHaveAttribute('id', 'main-heading');
  });

  it('all heading levels use --color-text-heading', () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;
    levels.forEach((level) => {
      const { unmount } = render(
        <Heading data-testid={`heading-${level}`} level={level}>
          Level {level}
        </Heading>
      );
      expect(screen.getByTestId(`heading-${level}`).className).toContain(
        'text-[var(--color-text-heading)]'
      );
      unmount();
    });
  });
});
