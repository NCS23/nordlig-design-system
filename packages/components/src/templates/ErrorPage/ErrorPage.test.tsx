import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────
  describe('Rendering', () => {
    it('renders title', () => {
      render(<ErrorPage title="Seite nicht gefunden" />);
      expect(screen.getByText('Seite nicht gefunden')).toBeInTheDocument();
    });

    it('renders error code when provided', () => {
      render(<ErrorPage title="Nicht gefunden" code="404" />);
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <ErrorPage
          title="Nicht gefunden"
          description="Die angeforderte Seite existiert nicht."
        />
      );
      expect(
        screen.getByText('Die angeforderte Seite existiert nicht.')
      ).toBeInTheDocument();
    });

    it('renders illustration when provided', () => {
      render(
        <ErrorPage
          title="Fehler"
          illustration={<div data-testid="illustration">Bild</div>}
        />
      );
      expect(screen.getByTestId('illustration')).toBeInTheDocument();
    });

    it('renders actions when provided', () => {
      render(
        <ErrorPage
          title="Fehler"
          actions={<button data-testid="action-btn">Zurueck</button>}
        />
      );
      expect(screen.getByTestId('action-btn')).toBeInTheDocument();
    });

    it('does not render code when omitted', () => {
      const { container } = render(<ErrorPage title="Fehler" />);
      expect(
        container.querySelector('[class*="errorpage-code"]')
      ).toBeNull();
    });

    it('does not render description when omitted', () => {
      const { container } = render(<ErrorPage title="Fehler" />);
      expect(
        container.querySelector('[class*="errorpage-desc"]')
      ).toBeNull();
    });

    it('does not render illustration when omitted', () => {
      const { container } = render(<ErrorPage title="Fehler" />);
      expect(
        container.querySelector('[aria-hidden="true"]')
      ).toBeNull();
    });

    it('does not render actions when omitted', () => {
      const { container } = render(<ErrorPage title="Fehler" />);
      // Only the text block wrapper should exist, no actions wrapper
      const gapDivs = container.querySelectorAll(
        '[class*="spacing-errorpage-text-gap"]'
      );
      // One for text-gap (text block), none for actions
      expect(gapDivs).toHaveLength(1);
    });
  });

  // ─── Accessibility ────────────────────────────────────────────────────
  describe('Accessibility', () => {
    it('title uses h2 element', () => {
      render(<ErrorPage title="Seite nicht gefunden" />);
      expect(
        screen.getByRole('heading', { level: 2 })
      ).toHaveTextContent('Seite nicht gefunden');
    });

    it('content wrapper has role="alert"', () => {
      render(<ErrorPage title="Fehler" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('illustration wrapper has aria-hidden', () => {
      render(
        <ErrorPage
          title="Fehler"
          illustration={<div data-testid="illustration" />}
        />
      );
      const wrapper = screen.getByTestId('illustration').parentElement!;
      expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    });

    it('error code has aria-hidden', () => {
      render(<ErrorPage title="Fehler" code="500" />);
      const codeEl = screen.getByText('500');
      expect(codeEl).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ─── Token-based Styling ──────────────────────────────────────────────
  describe('Token-based Styling', () => {
    it('has token-based background class', () => {
      const { container } = render(<ErrorPage title="Fehler" />);
      const root = container.firstChild as HTMLElement;
      expect(root.className).toContain('bg-[var(--color-errorpage-bg)]');
    });

    it('code uses font-size token', () => {
      render(<ErrorPage title="Fehler" code="404" />);
      const codeEl = screen.getByText('404');
      expect(codeEl.className).toContain(
        'text-[length:var(--font-errorpage-code-size)]'
      );
    });

    it('code uses font-weight token', () => {
      render(<ErrorPage title="Fehler" code="404" />);
      const codeEl = screen.getByText('404');
      expect(codeEl.className).toContain(
        '[font-weight:var(--font-errorpage-code-weight)]'
      );
    });

    it('code uses text color token', () => {
      render(<ErrorPage title="Fehler" code="404" />);
      const codeEl = screen.getByText('404');
      expect(codeEl.className).toContain(
        'text-[var(--color-errorpage-code-text)]'
      );
    });

    it('title uses font-size token', () => {
      render(<ErrorPage title="Fehler" />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.className).toContain(
        'text-[length:var(--font-errorpage-title-size)]'
      );
    });

    it('title uses font-weight token', () => {
      render(<ErrorPage title="Fehler" />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.className).toContain(
        '[font-weight:var(--font-errorpage-title-weight)]'
      );
    });

    it('description uses font-size token', () => {
      render(<ErrorPage title="Fehler" description="Beschreibung" />);
      const desc = screen.getByText('Beschreibung');
      expect(desc.className).toContain(
        'text-[length:var(--font-errorpage-desc-size)]'
      );
    });

    it('description uses text color token', () => {
      render(<ErrorPage title="Fehler" description="Beschreibung" />);
      const desc = screen.getByText('Beschreibung');
      expect(desc.className).toContain(
        'text-[var(--color-errorpage-desc-text)]'
      );
    });
  });

  // ─── Ref & className ─────────────────────────────────────────────────
  describe('Ref & className', () => {
    it('applies custom className', () => {
      const { container } = render(
        <ErrorPage title="Fehler" className="my-custom" />
      );
      expect((container.firstChild as HTMLElement).className).toContain(
        'my-custom'
      );
    });

    it('forwards ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<ErrorPage ref={ref} title="Fehler" />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
