import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Banner, BannerContent } from './Banner';

describe('Banner', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert die Komponente', () => {
    render(<Banner>Nachricht</Banner>);
    expect(screen.getByText('Nachricht')).toBeInTheDocument();
  });

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Banner ref={ref}>Nachricht</Banner>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merged className', () => {
    render(<Banner className="custom-class">Nachricht</Banner>);
    const banner = screen.getByRole('status');
    expect(banner).toHaveClass('custom-class');
  });

  it('hat displayName "Banner"', () => {
    expect(Banner.displayName).toBe('Banner');
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('nutzt Token-Klassen', () => {
    render(<Banner>Nachricht</Banner>);
    const banner = screen.getByRole('status');
    expect(banner.className).toContain('px-[var(--spacing-banner-padding-x)]');
    expect(banner.className).toContain('gap-[var(--spacing-banner-gap)]');
  });

  // ─── Varianten ──────────────────────────────────────────────────────────

  it('rendert alle 4 Varianten', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;
    for (const variant of variants) {
      const { unmount } = render(
        <Banner variant={variant}>Nachricht</Banner>
      );
      const banner =
        variant === 'warning' || variant === 'error'
          ? screen.getByRole('alert')
          : screen.getByRole('status');
      expect(banner.className).toContain(
        `bg-[var(--color-banner-${variant}-bg)]`
      );
      unmount();
    }
  });

  // ─── Rollen ─────────────────────────────────────────────────────────────

  it('setzt role="status" fuer info und success', () => {
    const { unmount } = render(<Banner variant="info">Info</Banner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    unmount();

    render(<Banner variant="success">Erfolg</Banner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('setzt role="alert" fuer warning und error', () => {
    const { unmount } = render(<Banner variant="warning">Warnung</Banner>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    unmount();

    render(<Banner variant="error">Fehler</Banner>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // ─── Icons ──────────────────────────────────────────────────────────────

  it('zeigt Standard-Icon pro Variante', () => {
    render(<Banner variant="info">Info</Banner>);
    const banner = screen.getByRole('status');
    const svg = banner.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('zeigt custom Icon wenn icon-Prop gesetzt', () => {
    render(
      <Banner icon={<span data-testid="custom-icon">★</span>}>
        Nachricht
      </Banner>
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('versteckt Icon wenn icon={null}', () => {
    render(<Banner icon={null}>Nachricht</Banner>);
    const banner = screen.getByRole('status');
    const svg = banner.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  // ─── Action-Slot ────────────────────────────────────────────────────────

  it('rendert Action-Slot', () => {
    render(
      <Banner action={<button>Aktion</button>}>Nachricht</Banner>
    );
    expect(
      screen.getByRole('button', { name: 'Aktion' })
    ).toBeInTheDocument();
  });

  // ─── Dismissible ───────────────────────────────────────────────────────

  it('dismissible zeigt Schliessen-Button', () => {
    render(<Banner dismissible>Nachricht</Banner>);
    expect(
      screen.getByRole('button', { name: 'Schließen' })
    ).toBeInTheDocument();
  });

  it('onDismiss wird aufgerufen', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Banner dismissible onDismiss={onDismiss}>
        Nachricht
      </Banner>
    );
    await user.click(screen.getByRole('button', { name: 'Schließen' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});

describe('BannerContent', () => {
  it('hat displayName "BannerContent"', () => {
    expect(BannerContent.displayName).toBe('BannerContent');
  });
});
