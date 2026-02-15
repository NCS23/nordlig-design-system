import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Blockquote, BlockquoteCitation } from './Blockquote';

describe('Blockquote', () => {
  // ─── 1. Rendert semantisches blockquote-Element ───────────────────────────

  it('rendert ein semantisches blockquote-Element', () => {
    render(<Blockquote data-testid="bq">Zitat</Blockquote>);
    const el = screen.getByTestId('bq');
    expect(el.tagName).toBe('BLOCKQUOTE');
  });

  // ─── 2. Wendet Token-Klassen an ──────────────────────────────────────────

  it('wendet Token-Klassen an (border, bg, text, padding, radius)', () => {
    render(<Blockquote data-testid="bq">Zitat</Blockquote>);
    const el = screen.getByTestId('bq');
    expect(el).toHaveClass('[border-left-width:var(--spacing-bq-border-width)]');
    expect(el).toHaveClass('[border-left-color:var(--color-bq-border)]');
    expect(el).toHaveClass('bg-[var(--color-bq-bg)]');
    expect(el).toHaveClass('text-[color:var(--color-bq-text)]');
    expect(el).toHaveClass('p-[var(--spacing-bq-padding)]');
    expect(el).toHaveClass('rounded-[var(--radius-bq)]');
  });

  // ─── 3. Rendert Kinder korrekt ───────────────────────────────────────────

  it('rendert Kinder korrekt', () => {
    render(
      <Blockquote>
        <p>Absatz im Zitat</p>
      </Blockquote>
    );
    expect(screen.getByText('Absatz im Zitat')).toBeInTheDocument();
  });

  // ─── 4. Leitet ref weiter ────────────────────────────────────────────────

  it('leitet ref weiter', () => {
    const ref = React.createRef<HTMLQuoteElement>();
    render(<Blockquote ref={ref}>Zitat</Blockquote>);
    expect(ref.current).toBeInstanceOf(HTMLQuoteElement);
  });

  // ─── 5. Wendet benutzerdefinierte className an ────────────────────────────

  it('wendet benutzerdefinierte className an', () => {
    render(
      <Blockquote data-testid="bq" className="meine-klasse">
        Zitat
      </Blockquote>
    );
    expect(screen.getByTestId('bq')).toHaveClass('meine-klasse');
  });

  // ─── 6. Rendert BlockquoteCitation mit Autor ─────────────────────────────

  it('rendert BlockquoteCitation mit Autor', () => {
    render(
      <Blockquote>
        Zitat
        <BlockquoteCitation author="Max Mustermann" />
      </Blockquote>
    );
    expect(screen.getByText('Max Mustermann')).toBeInTheDocument();
    // Kein cite-Element wenn nur Autor
    expect(screen.queryByText('—')).not.toBeInTheDocument();
  });

  // ─── 7. Rendert BlockquoteCitation mit Quelle ────────────────────────────

  it('rendert BlockquoteCitation mit Quelle', () => {
    render(
      <Blockquote>
        Zitat
        <BlockquoteCitation source="Ein Buch" />
      </Blockquote>
    );
    const cite = screen.getByText('Ein Buch');
    expect(cite.tagName).toBe('CITE');
  });

  // ─── 8. Rendert BlockquoteCitation mit Autor und Quelle ──────────────────

  it('rendert BlockquoteCitation mit Autor und Quelle', () => {
    render(
      <Blockquote>
        Zitat
        <BlockquoteCitation author="Goethe" source="Faust" />
      </Blockquote>
    );
    expect(screen.getByText('Goethe')).toBeInTheDocument();
    expect(screen.getByText('Faust')).toBeInTheDocument();
    // Trennzeichen vorhanden
    expect(screen.getByText((_, el) => el?.textContent === 'Goethe — Faust')).toBeInTheDocument();
  });

  // ─── 9. Rendert BlockquoteCitation mit benutzerdefinierten Kindern ────────

  it('rendert BlockquoteCitation mit benutzerdefinierten Kindern', () => {
    render(
      <Blockquote>
        Zitat
        <BlockquoteCitation>
          <span data-testid="custom">Eigener Inhalt</span>
        </BlockquoteCitation>
      </Blockquote>
    );
    expect(screen.getByTestId('custom')).toBeInTheDocument();
    expect(screen.getByText('Eigener Inhalt')).toBeInTheDocument();
  });

  // ─── 10. Hat korrekten displayName fuer alle Sub-Komponenten ──────────────

  it('hat korrekten displayName fuer alle Sub-Komponenten', () => {
    expect(Blockquote.displayName).toBe('Blockquote');
    expect(BlockquoteCitation.displayName).toBe('BlockquoteCitation');
  });
});
