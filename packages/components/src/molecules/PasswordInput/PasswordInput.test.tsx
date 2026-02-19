import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert input type=password standardmaessig', () => {
    const { container } = render(<PasswordInput />);
    const passwordInput = container.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Toggle-Button wechselt zu type=text', async () => {
    const user = userEvent.setup();
    const { container } = render(<PasswordInput />);
    const input = container.querySelector('input')!;
    expect(input).toHaveAttribute('type', 'password');

    const toggleBtn = screen.getByRole('button', { name: /passwort anzeigen/i });
    await user.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('Toggle-Button wechselt zurueck zu type=password', async () => {
    const user = userEvent.setup();
    const { container } = render(<PasswordInput />);
    const input = container.querySelector('input')!;
    const toggleBtn = screen.getByRole('button');

    await user.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');

    await user.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('Toggle-Button hat korrekte aria-labels', async () => {
    const user = userEvent.setup();
    render(<PasswordInput />);
    const toggleBtn = screen.getByRole('button');

    expect(toggleBtn).toHaveAttribute('aria-label', 'Passwort anzeigen');
    await user.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-label', 'Passwort verbergen');
  });

  // ─── Ref Forwarding ────────────────────────────────────────────────────

  it('leitet ref auf HTMLInputElement weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<PasswordInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // ─── className ──────────────────────────────────────────────────────────

  it('merged className auf wrapper-div', () => {
    const { container } = render(<PasswordInput className="custom-pw" />);
    expect(container.firstChild).toHaveClass('custom-pw');
  });

  // ─── displayName ────────────────────────────────────────────────────────

  it('hat displayName "PasswordInput"', () => {
    expect(PasswordInput.displayName).toBe('PasswordInput');
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('nutzt Token-Klassen auf Toggle-Button', () => {
    render(<PasswordInput />);
    const toggleBtn = screen.getByRole('button');
    expect(toggleBtn.className).toContain('text-[color:var(--color-pwinput-toggle)]');
  });

  // ─── Disabled ──────────────────────────────────────────────────────────

  it('disabled deaktiviert Input und Toggle', () => {
    const { container } = render(<PasswordInput disabled />);
    const input = container.querySelector('input')!;
    expect(input).toBeDisabled();

    const toggleBtn = screen.getByRole('button');
    expect(toggleBtn).toBeDisabled();
  });

  // ─── Staerke-Indikator ─────────────────────────────────────────────────

  it('zeigt Staerke-Indikator bei strength="weak"', () => {
    render(<PasswordInput strength="weak" defaultValue="abc" />);
    expect(screen.getByText('Schwach')).toBeInTheDocument();
  });

  it('zeigt Staerke-Indikator bei strength="strong"', () => {
    render(<PasswordInput strength="strong" defaultValue="abc123!" />);
    expect(screen.getByText('Stark')).toBeInTheDocument();
  });

  // ─── strengthFn ─────────────────────────────────────────────────────────

  it('ruft strengthFn bei Eingabe auf', async () => {
    const user = userEvent.setup();
    const strengthFn = vi.fn().mockReturnValue('weak');
    const { container } = render(<PasswordInput strengthFn={strengthFn} />);
    const input = container.querySelector('input')!;

    await user.type(input, 'abc');
    expect(strengthFn).toHaveBeenCalled();
  });
});
