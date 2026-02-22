import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('rendert children', () => {
    render(<VisuallyHidden>Nur fuer Screen Reader</VisuallyHidden>);
    expect(screen.getByText('Nur fuer Screen Reader')).toBeInTheDocument();
  });

  it('hat sr-only Klasse', () => {
    render(<VisuallyHidden data-testid="vh">Hidden</VisuallyHidden>);
    expect(screen.getByTestId('vh')).toHaveClass('sr-only');
  });

  it('merged zusaetzliche classNames', () => {
    render(<VisuallyHidden className="extra" data-testid="vh">Text</VisuallyHidden>);
    const el = screen.getByTestId('vh');
    expect(el).toHaveClass('sr-only');
    expect(el).toHaveClass('extra');
  });

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;
    render(<VisuallyHidden ref={ref}>Text</VisuallyHidden>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('rendert als span Element', () => {
    render(<VisuallyHidden data-testid="vh">Text</VisuallyHidden>);
    expect(screen.getByTestId('vh').tagName).toBe('SPAN');
  });

  it('leitet HTML-Attribute weiter', () => {
    render(<VisuallyHidden id="my-id" aria-label="test">Text</VisuallyHidden>);
    const el = screen.getByText('Text');
    expect(el).toHaveAttribute('id', 'my-id');
    expect(el).toHaveAttribute('aria-label', 'test');
  });

  it('hat korrekten displayName', () => {
    expect(VisuallyHidden.displayName).toBe('VisuallyHidden');
  });

  it('rendert mehrere Kinder', () => {
    render(
      <VisuallyHidden data-testid="vh">
        <span>Erstes Kind</span>
        <span>Zweites Kind</span>
      </VisuallyHidden>
    );
    expect(screen.getByText('Erstes Kind')).toBeInTheDocument();
    expect(screen.getByText('Zweites Kind')).toBeInTheDocument();
  });
});
