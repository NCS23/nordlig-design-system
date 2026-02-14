import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';

describe('Popover', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders trigger element', () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent>Inhalt</PopoverContent>
      </Popover>
    );
    expect(screen.getByRole('button', { name: 'Öffnen' })).toBeInTheDocument();
  });

  it('does not show content initially', () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent>Inhalt</PopoverContent>
      </Popover>
    );
    expect(screen.queryByText('Inhalt')).not.toBeInTheDocument();
  });

  // ─── Click Interaction ────────────────────────────────────────────────

  it('shows content on click', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent>Popover Inhalt</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Öffnen' }));
    await waitFor(() => {
      expect(screen.getByText('Popover Inhalt')).toBeInTheDocument();
    });
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent>Popover Inhalt</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Öffnen' }));
    await waitFor(() => {
      expect(screen.getByText('Popover Inhalt')).toBeInTheDocument();
    });
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByText('Popover Inhalt')).not.toBeInTheDocument();
    });
  });

  // ─── Token Classes ────────────────────────────────────────────────────

  it('applies token-based classes to popover content', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent>Tokens</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Öffnen' }));
    await waitFor(() => {
      expect(screen.getByText('Tokens')).toBeInTheDocument();
    });
    const content = screen.getByText('Tokens').closest('[data-side]');
    const classes = content?.getAttribute('class') || '';
    expect(classes).toContain('bg-[var(--color-popover-bg)]');
    expect(classes).toContain('border-[var(--color-popover-border)]');
    expect(classes).toContain('rounded-[var(--radius-popover)]');
    expect(classes).toContain('[box-shadow:var(--shadow-popover)]');
  });

  // ─── Custom className ─────────────────────────────────────────────────

  it('forwards custom className to content', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent className="my-custom-class">Inhalt</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Öffnen' }));
    await waitFor(() => {
      expect(screen.getByText('Inhalt')).toBeInTheDocument();
    });
    const content = screen.getByText('Inhalt').closest('[data-side]');
    expect(content?.getAttribute('class')).toContain('my-custom-class');
  });

  // ─── Side Prop ────────────────────────────────────────────────────────

  it('passes side prop via data-side attribute', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent side="bottom">Inhalt</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Öffnen' }));
    await waitFor(() => {
      expect(screen.getByText('Inhalt')).toBeInTheDocument();
    });
    const content = screen.getByText('Inhalt').closest('[data-side]');
    expect(content?.getAttribute('data-side')).toBe('bottom');
  });

  // ─── Arrow ────────────────────────────────────────────────────────────

  it('renders arrow when showArrow is true', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent showArrow>Mit Pfeil</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Öffnen' }));
    await waitFor(() => {
      expect(screen.getByText('Mit Pfeil')).toBeInTheDocument();
    });
    // Radix renders arrow as an SVG element
    const content = screen.getByText('Mit Pfeil').closest('[data-side]');
    const arrow = content?.querySelector('svg');
    expect(arrow).toBeInTheDocument();
  });

  it('does not render arrow by default', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Öffnen</button>
        </PopoverTrigger>
        <PopoverContent>Ohne Pfeil</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Öffnen' }));
    await waitFor(() => {
      expect(screen.getByText('Ohne Pfeil')).toBeInTheDocument();
    });
    const content = screen.getByText('Ohne Pfeil').closest('[data-side]');
    const arrow = content?.querySelector('svg');
    expect(arrow).not.toBeInTheDocument();
  });
});
