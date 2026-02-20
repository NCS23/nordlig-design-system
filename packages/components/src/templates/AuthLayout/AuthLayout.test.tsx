import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthLayout } from './AuthLayout';

describe('AuthLayout', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────
  describe('Rendering', () => {
    it('renders children (form content)', () => {
      render(<AuthLayout>Login Form</AuthLayout>);
      expect(screen.getByText('Login Form')).toBeInTheDocument();
    });

    it('renders logo slot', () => {
      render(
        <AuthLayout logo={<img alt="Logo" src="/logo.svg" />}>
          Form
        </AuthLayout>
      );
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    it('renders without logo gracefully', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      expect(container.querySelector('[class*="logo-gap"]')).toBeNull();
    });

    it('renders footer slot', () => {
      render(
        <AuthLayout footer={<a href="/register">Registrieren</a>}>
          Form
        </AuthLayout>
      );
      expect(screen.getByText('Registrieren')).toBeInTheDocument();
    });

    it('renders without footer gracefully', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      expect(container.querySelector('[class*="footer-gap"]')).toBeNull();
    });

    it('renders background slot', () => {
      render(
        <AuthLayout background={<div data-testid="bg-pattern" />}>
          Form
        </AuthLayout>
      );
      expect(screen.getByTestId('bg-pattern')).toBeInTheDocument();
    });

    it('background is aria-hidden', () => {
      render(
        <AuthLayout background={<div data-testid="bg-pattern" />}>
          Form
        </AuthLayout>
      );
      const bgWrapper = screen.getByTestId('bg-pattern').parentElement!;
      expect(bgWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ─── Token-based Styling ────────────────────────────────────────────────
  describe('Token-based Styling', () => {
    it('root has auth bg token', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      const root = container.firstChild as HTMLElement;
      expect(root.className).toContain('bg-[var(--color-auth-bg)]');
    });

    it('card has auth card bg token', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      const card = container.querySelector('[class*="color-auth-card-bg"]')!;
      expect(card).toBeInTheDocument();
      expect(card.className).toContain('bg-[var(--color-auth-card-bg)]');
    });

    it('card has border token', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      const card = container.querySelector('[class*="color-auth-card-border"]')!;
      expect(card.className).toContain('border-[var(--color-auth-card-border)]');
    });

    it('card has radius token', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      const card = container.querySelector('[class*="radius-auth-card"]')!;
      expect(card.className).toContain('rounded-[var(--radius-auth-card)]');
    });

    it('card has shadow token', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      const card = container.querySelector('[class*="shadow-auth-card"]')!;
      expect(card.className).toContain('[box-shadow:var(--shadow-auth-card)]');
    });

    it('card has max-width token', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      const card = container.querySelector('[class*="sizing-auth-card"]')!;
      expect(card.className).toContain('max-w-[var(--sizing-auth-card-max-width)]');
    });

    it('card has padding token', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      const card = container.querySelector('[class*="spacing-auth-card-padding"]')!;
      expect(card.className).toContain('p-[var(--spacing-auth-card-padding)]');
    });

    it('footer has text color token', () => {
      render(
        <AuthLayout footer={<span>Footer</span>}>
          Form
        </AuthLayout>
      );
      const footerWrapper = screen.getByText('Footer').parentElement!;
      expect(footerWrapper.className).toContain('text-[var(--color-auth-footer-text)]');
    });
  });

  // ─── Layout ─────────────────────────────────────────────────────────────
  describe('Layout', () => {
    it('centers content vertically and horizontally', () => {
      const { container } = render(<AuthLayout>Form</AuthLayout>);
      const root = container.firstChild as HTMLElement;
      expect(root.className).toContain('items-center');
      expect(root.className).toContain('justify-center');
      expect(root.className).toContain('min-h-screen');
    });
  });

  // ─── Ref & className ───────────────────────────────────────────────────
  describe('Ref & className', () => {
    it('forwards ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<AuthLayout ref={ref}>Form</AuthLayout>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('applies custom className', () => {
      const { container } = render(
        <AuthLayout className="my-custom">Form</AuthLayout>
      );
      expect((container.firstChild as HTMLElement).className).toContain('my-custom');
    });
  });
});
