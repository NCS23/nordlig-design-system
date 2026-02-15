import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Highlight } from './Highlight';

describe('Highlight', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert Text ohne Highlight bei leerem query', () => {
    render(<Highlight query="">Hello World</Highlight>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    const marks = screen.queryAllByRole('mark');
    // mark elements don't have a role by default, query by tag
    expect(document.querySelectorAll('mark')).toHaveLength(0);
  });

  it('markiert Vorkommen mit mark-Element', () => {
    const { container } = render(
      <Highlight query="World">Hello World</Highlight>
    );
    const marks = container.querySelectorAll('mark');
    expect(marks).toHaveLength(1);
    expect(marks[0].textContent).toBe('World');
  });

  // ─── Case-Sensitivity ─────────────────────────────────────────────────

  it('ist case-insensitive standardmaessig', () => {
    const { container } = render(
      <Highlight query="world">Hello World</Highlight>
    );
    const marks = container.querySelectorAll('mark');
    expect(marks).toHaveLength(1);
    expect(marks[0].textContent).toBe('World');
  });

  it('ist case-sensitive wenn caseSensitive=true', () => {
    const { container } = render(
      <Highlight query="world" caseSensitive>
        Hello World
      </Highlight>
    );
    const marks = container.querySelectorAll('mark');
    expect(marks).toHaveLength(0);
  });

  // ─── Mehrere Treffer ───────────────────────────────────────────────────

  it('markiert mehrere Vorkommen', () => {
    const { container } = render(
      <Highlight query="o">Hello World Foo</Highlight>
    );
    const marks = container.querySelectorAll('mark');
    expect(marks.length).toBeGreaterThanOrEqual(3); // H-e-l-l-[o] W-[o]-r-l-d F-[o]-o
  });

  it('markiert mehrere Suchbegriffe (Array)', () => {
    const { container } = render(
      <Highlight query={['Hello', 'World']}>Hello World</Highlight>
    );
    const marks = container.querySelectorAll('mark');
    expect(marks).toHaveLength(2);
    expect(marks[0].textContent).toBe('Hello');
    expect(marks[1].textContent).toBe('World');
  });

  // ─── Kein Match ────────────────────────────────────────────────────────

  it('kein match: nur Text, keine mark-Elemente', () => {
    const { container } = render(
      <Highlight query="xyz">Hello World</Highlight>
    );
    const marks = container.querySelectorAll('mark');
    expect(marks).toHaveLength(0);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('nutzt Token-Klassen auf mark-Element', () => {
    const { container } = render(
      <Highlight query="World">Hello World</Highlight>
    );
    const mark = container.querySelector('mark')!;
    expect(mark.className).toContain('bg-[var(--color-hl-bg)]');
  });

  // ─── Ref Forwarding ────────────────────────────────────────────────────

  it('leitet ref auf HTMLSpanElement weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;
    render(
      <Highlight ref={ref} query="">
        Text
      </Highlight>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  // ─── displayName ────────────────────────────────────────────────────────

  it('hat displayName "Highlight"', () => {
    expect(Highlight.displayName).toBe('Highlight');
  });
});
