import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert die Komponente', () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
  });

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(<Toggle ref={ref}>Bold</Toggle>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('merged className', () => {
    render(<Toggle className="custom-class">Bold</Toggle>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('hat displayName "Toggle"', () => {
    expect(Toggle.displayName).toBe('Toggle');
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('nutzt Token-Klassen', () => {
    render(<Toggle>Bold</Toggle>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('rounded-[var(--radius-toggle)]');
    expect(button.className).toContain('text-[var(--color-toggle-text)]');
    expect(button.className).toContain('hover:bg-[var(--color-toggle-hover-bg)]');
  });

  // ─── Varianten ──────────────────────────────────────────────────────────

  it('default Variante hat transparenten Border', () => {
    render(<Toggle variant="default">Bold</Toggle>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-transparent');
  });

  it('outline Variante hat border', () => {
    render(<Toggle variant="outline">Bold</Toggle>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-[var(--color-toggle-border)]');
  });

  it('ghost Variante hat kein border', () => {
    render(<Toggle variant="ghost">Bold</Toggle>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-none');
  });

  // ─── Groessen ───────────────────────────────────────────────────────────

  it('rendert in verschiedenen Groessen', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { unmount } = render(<Toggle size={size}>Bold</Toggle>);
      const button = screen.getByRole('button');
      expect(button.className).toContain(`h-[var(--sizing-toggle-${size}-height)]`);
      unmount();
    }
  });

  // ─── Zustaende ──────────────────────────────────────────────────────────

  it('toggled Zustand (data-state=on)', async () => {
    const user = userEvent.setup();
    render(<Toggle>Bold</Toggle>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-state', 'on');
  });

  it('disabled Zustand', () => {
    render(<Toggle disabled>Bold</Toggle>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('kontrollierter Modus (pressed prop)', () => {
    const onPressedChange = vi.fn();
    const { rerender } = render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Bold
      </Toggle>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');

    rerender(
      <Toggle pressed={true} onPressedChange={onPressedChange}>
        Bold
      </Toggle>
    );
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
