import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Spoiler } from './Spoiler';

describe('Spoiler', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert im verdeckten Zustand mit Label', () => {
    render(<Spoiler>Geheimer Text</Spoiler>);
    expect(screen.getByText('Spoiler')).toBeInTheDocument();
    expect(screen.queryByText('Geheimer Text')).not.toBeInTheDocument();
  });

  it('rendert benutzerdefiniertes Label', () => {
    render(<Spoiler label="Antwort anzeigen">42</Spoiler>);
    expect(screen.getByText('Antwort anzeigen')).toBeInTheDocument();
  });

  it('zeigt Inhalt nach Klick', async () => {
    const user = userEvent.setup();
    render(<Spoiler>Geheimer Text</Spoiler>);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Geheimer Text')).toBeInTheDocument();
  });

  it('versteckt Inhalt nach erneutem Klick', async () => {
    const user = userEvent.setup();
    render(<Spoiler>Geheimer Text</Spoiler>);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(screen.getByText('Geheimer Text')).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByText('Geheimer Text')).not.toBeInTheDocument();
    expect(screen.getByText('Spoiler')).toBeInTheDocument();
  });

  // ─── Controlled ──────────────────────────────────────────────────────────

  it('unterstuetzt controlled-Modus', () => {
    const { rerender } = render(<Spoiler open={false}>Inhalt</Spoiler>);
    expect(screen.queryByText('Inhalt')).not.toBeInTheDocument();

    rerender(<Spoiler open={true}>Inhalt</Spoiler>);
    expect(screen.getByText('Inhalt')).toBeInTheDocument();
  });

  it('ruft onOpenChange auf', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Spoiler onOpenChange={onOpenChange}>Inhalt</Spoiler>);

    await user.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // ─── Accessibility ──────────────────────────────────────────────────────

  it('hat role=button und aria-expanded', () => {
    render(<Spoiler>Inhalt</Spoiler>);
    const el = screen.getByRole('button');
    expect(el).toHaveAttribute('aria-expanded', 'false');
  });

  it('aktualisiert aria-expanded bei Oeffnung', async () => {
    const user = userEvent.setup();
    render(<Spoiler>Inhalt</Spoiler>);

    const el = screen.getByRole('button');
    await user.click(el);
    expect(el).toHaveAttribute('aria-expanded', 'true');
  });

  it('oeffnet sich mit Enter-Taste', async () => {
    const user = userEvent.setup();
    render(<Spoiler>Geheim</Spoiler>);

    const el = screen.getByRole('button');
    el.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Geheim')).toBeInTheDocument();
  });

  it('oeffnet sich mit Leertaste', async () => {
    const user = userEvent.setup();
    render(<Spoiler>Geheim</Spoiler>);

    const el = screen.getByRole('button');
    el.focus();
    await user.keyboard(' ');
    expect(screen.getByText('Geheim')).toBeInTheDocument();
  });

  // ─── Token-Klassen ──────────────────────────────────────────────────────

  it('wendet Token-Klassen im verdeckten Zustand an', () => {
    render(<Spoiler data-testid="spl">Inhalt</Spoiler>);
    const el = screen.getByTestId('spl');
    expect(el.className).toContain('bg-[var(--color-spl-bg)]');
    expect(el.className).toContain('rounded-[var(--radius-spl)]');
    expect(el.className).toContain('px-[var(--spacing-spl-px)]');
  });

  it('entfernt Hintergrund im offenen Zustand', () => {
    render(<Spoiler open={true} data-testid="spl">Inhalt</Spoiler>);
    const el = screen.getByTestId('spl');
    expect(el.className).toContain('bg-transparent');
    expect(el.className).not.toContain('bg-[var(--color-spl-bg)]');
  });

  // ─── Ref & Props ──────────────────────────────────────────────────────

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;
    render(<Spoiler ref={ref}>Text</Spoiler>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('merged benutzerdefinierte className', () => {
    render(<Spoiler className="extra" data-testid="spl">Text</Spoiler>);
    expect(screen.getByTestId('spl')).toHaveClass('extra');
  });

  it('hat korrekten displayName', () => {
    expect(Spoiler.displayName).toBe('Spoiler');
  });
});
