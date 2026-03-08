import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  // --- Grundlegendes Rendering ---

  it('rendert ein button-Element', () => {
    render(<Button data-testid="btn">Klick</Button>);
    expect(screen.getByTestId('btn').tagName).toBe('BUTTON');
  });

  it('rendert Kinder korrekt', () => {
    render(<Button>Mein Text</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Mein Text');
  });

  it('rendert JSX-Kinder korrekt', () => {
    render(
      <Button>
        <span data-testid="icon">★</span> Stern
      </Button>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('★ Stern');
  });

  // --- Default-Variante (primary, md) ---

  it('wendet Standard-Variante primary an', () => {
    render(<Button data-testid="btn">OK</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('bg-[var(--color-btn-primary-bg)]');
    expect(btn.className).toContain('text-[var(--color-btn-primary-text)]');
    expect(btn.className).toContain('border-[var(--color-btn-primary-border)]');
  });

  it('wendet Standard-Größe md an', () => {
    render(<Button data-testid="btn">OK</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('h-[var(--sizing-btn-md-height)]');
    expect(btn.className).toContain('px-[var(--sizing-btn-md-padding-x)]');
    expect(btn.className).toContain('text-[length:var(--sizing-btn-md-font-size)]');
    expect(btn.className).toContain('rounded-[var(--sizing-btn-md-radius)]');
  });

  // --- Varianten ---

  it('wendet primary-Variante korrekt an', () => {
    render(<Button data-testid="btn" variant="primary">Primary</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('bg-[var(--color-btn-primary-bg)]');
    expect(btn.className).toContain('text-[var(--color-btn-primary-text)]');
    expect(btn.className).toContain('border-[var(--color-btn-primary-border)]');
    expect(btn.className).toContain('hover:bg-[var(--color-btn-primary-bg-hover)]');
    expect(btn.className).toContain('active:bg-[var(--color-btn-primary-bg-active)]');
  });

  it('wendet secondary-Variante korrekt an', () => {
    render(<Button data-testid="btn" variant="secondary">Secondary</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('bg-[var(--color-btn-secondary-bg)]');
    expect(btn.className).toContain('text-[var(--color-btn-secondary-text)]');
    expect(btn.className).toContain('border-[var(--color-btn-secondary-border)]');
    expect(btn.className).toContain('hover:bg-[var(--color-btn-secondary-bg-hover)]');
    expect(btn.className).toContain('active:bg-[var(--color-btn-secondary-bg-active)]');
  });

  it('wendet ghost-Variante korrekt an', () => {
    render(<Button data-testid="btn" variant="ghost">Ghost</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('bg-transparent');
    expect(btn.className).toContain('text-[var(--color-btn-ghost-text)]');
    expect(btn.className).toContain('hover:bg-[var(--color-btn-ghost-bg-hover)]');
    expect(btn.className).toContain('active:bg-[var(--color-btn-ghost-bg-active)]');
  });

  it('wendet destructive-Variante korrekt an', () => {
    render(<Button data-testid="btn" variant="destructive">Entfernen</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('bg-[var(--color-btn-destructive-bg)]');
    expect(btn.className).toContain('text-[var(--color-btn-destructive-text)]');
    expect(btn.className).toContain('border-[var(--color-btn-destructive-border)]');
    expect(btn.className).toContain('hover:bg-[var(--color-btn-destructive-bg-hover)]');
    expect(btn.className).toContain('active:bg-[var(--color-btn-destructive-bg-active)]');
  });

  // --- Größen ---

  it('wendet sm-Größe korrekt an', () => {
    render(<Button data-testid="btn" size="sm">Klein</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('h-[var(--sizing-btn-sm-height)]');
    expect(btn.className).toContain('px-[var(--sizing-btn-sm-padding-x)]');
    expect(btn.className).toContain('py-[var(--sizing-btn-sm-padding-y)]');
    expect(btn.className).toContain('gap-[var(--sizing-btn-sm-gap)]');
    expect(btn.className).toContain('text-[length:var(--sizing-btn-sm-font-size)]');
    expect(btn.className).toContain('rounded-[var(--sizing-btn-sm-radius)]');
  });

  it('wendet md-Größe korrekt an', () => {
    render(<Button data-testid="btn" size="md">Mittel</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('h-[var(--sizing-btn-md-height)]');
    expect(btn.className).toContain('px-[var(--sizing-btn-md-padding-x)]');
    expect(btn.className).toContain('py-[var(--sizing-btn-md-padding-y)]');
    expect(btn.className).toContain('gap-[var(--sizing-btn-md-gap)]');
    expect(btn.className).toContain('text-[length:var(--sizing-btn-md-font-size)]');
    expect(btn.className).toContain('rounded-[var(--sizing-btn-md-radius)]');
  });

  it('wendet lg-Größe korrekt an', () => {
    render(<Button data-testid="btn" size="lg">Groß</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('h-[var(--sizing-btn-lg-height)]');
    expect(btn.className).toContain('px-[var(--sizing-btn-lg-padding-x)]');
    expect(btn.className).toContain('py-[var(--sizing-btn-lg-padding-y)]');
    expect(btn.className).toContain('gap-[var(--sizing-btn-lg-gap)]');
    expect(btn.className).toContain('text-[length:var(--sizing-btn-lg-font-size)]');
    expect(btn.className).toContain('rounded-[var(--sizing-btn-lg-radius)]');
  });

  // --- Interaktion ---

  it('ruft onClick-Handler auf', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Klick mich</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('löst keinen onClick aus wenn disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick} disabled>Deaktiviert</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // --- Disabled-Zustand ---

  it('hat disabled-Attribut wenn disabled gesetzt', () => {
    render(<Button data-testid="btn" disabled>Deaktiviert</Button>);
    expect(screen.getByTestId('btn')).toBeDisabled();
  });

  it('hat disabled-Styling-Klassen', () => {
    render(<Button data-testid="btn" disabled>Deaktiviert</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('disabled:pointer-events-none');
    expect(btn.className).toContain('disabled:bg-[var(--color-btn-disabled-bg)]');
    expect(btn.className).toContain('disabled:text-[var(--color-btn-disabled-text)]');
  });

  // --- Ref-Weiterleitung ---

  it('leitet ref korrekt weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(<Button ref={ref}>Mit Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // --- displayName ---

  it('hat den displayName "Button"', () => {
    expect(Button.displayName).toBe('Button');
  });

  // --- Zusätzliche className ---

  it('übergibt zusätzliche className', () => {
    render(<Button data-testid="btn" className="custom-class">Custom</Button>);
    expect(screen.getByTestId('btn').className).toContain('custom-class');
  });

  // --- Basis-Klassen (immer vorhanden) ---

  it('hat inline-flex Layout-Klasse', () => {
    render(<Button data-testid="btn">OK</Button>);
    expect(screen.getByTestId('btn').className).toContain('inline-flex');
  });

  it('hat focus-visible Ring-Klassen', () => {
    render(<Button data-testid="btn">OK</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn.className).toContain('focus-visible:ring-2');
    expect(btn.className).toContain('focus-visible:ring-[var(--color-border-focus)]');
    expect(btn.className).toContain('focus-visible:ring-offset-1');
  });

  it('hat Transition-Klasse', () => {
    render(<Button data-testid="btn">OK</Button>);
    expect(screen.getByTestId('btn').className).toContain('transition-colors');
  });

  it('hat font-weight Token-Klasse', () => {
    render(<Button data-testid="btn">OK</Button>);
    expect(screen.getByTestId('btn').className).toContain('[font-weight:var(--font-btn-weight)]');
  });

  // --- HTML-Attribute durchreichen ---

  it('reicht type-Attribut durch', () => {
    render(<Button data-testid="btn" type="submit">Absenden</Button>);
    expect(screen.getByTestId('btn')).toHaveAttribute('type', 'submit');
  });

  it('reicht aria-label durch', () => {
    render(<Button aria-label="Schließen">×</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Schließen');
  });
});
