import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renders children', () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders as an anchor element', () => {
    render(<Link href="/about" data-testid="link">About</Link>);
    expect(screen.getByTestId('link').tagName).toBe('A');
  });

  it('applies default variants (default, hover)', () => {
    render(<Link href="/about" data-testid="link">About</Link>);
    const link = screen.getByTestId('link');
    expect(link.className).toContain('text-[var(--color-link-text)]');
    expect(link.className).toContain('hover:underline');
  });

  it('applies variant=default', () => {
    render(<Link href="/about" data-testid="link" variant="default">Link</Link>);
    const link = screen.getByTestId('link');
    expect(link.className).toContain('text-[var(--color-link-text)]');
    expect(link.className).toContain('hover:text-[var(--color-link-text-hover)]');
  });

  it('applies variant=muted', () => {
    render(<Link href="/about" data-testid="link" variant="muted">Link</Link>);
    const link = screen.getByTestId('link');
    expect(link.className).toContain('text-[var(--color-text-muted)]');
    expect(link.className).toContain('hover:text-[var(--color-text-base)]');
  });

  it('applies variant=destructive', () => {
    render(<Link href="/about" data-testid="link" variant="destructive">Link</Link>);
    const link = screen.getByTestId('link');
    expect(link.className).toContain('text-[var(--color-text-error)]');
  });

  it('applies underline=always', () => {
    render(<Link href="/about" data-testid="link" underline="always">Link</Link>);
    const link = screen.getByTestId('link');
    expect(link.className).toContain('underline');
    expect(link.className).toContain('underline-offset-4');
  });

  it('applies underline=hover', () => {
    render(<Link href="/about" data-testid="link" underline="hover">Link</Link>);
    const link = screen.getByTestId('link');
    expect(link.className).toContain('hover:underline');
    expect(link.className).toContain('underline-offset-4');
  });

  it('applies underline=none', () => {
    render(<Link href="/about" data-testid="link" underline="none">Link</Link>);
    const link = screen.getByTestId('link');
    expect(link.className).toContain('no-underline');
  });

  it('auto-detects external links and sets target/rel', () => {
    render(<Link href="https://example.com" data-testid="link">External</Link>);
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not set target/rel for internal links', () => {
    render(<Link href="/about" data-testid="link">Internal</Link>);
    const link = screen.getByTestId('link');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('respects custom target for external links', () => {
    render(<Link href="https://example.com" target="_self" data-testid="link">External</Link>);
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('target', '_self');
  });

  it('renders ExternalLink icon when showExternalIcon is true', () => {
    render(<Link href="/about" showExternalIcon data-testid="link">Link</Link>);
    const link = screen.getByTestId('link');
    const svg = link.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('does not render ExternalLink icon by default', () => {
    render(<Link href="/about" data-testid="link">Link</Link>);
    const link = screen.getByTestId('link');
    const svg = link.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  it('applies disabled styling', () => {
    render(<Link href="/about" disabled data-testid="link">Disabled</Link>);
    const link = screen.getByTestId('link');
    expect(link.className).toContain('opacity-50');
    expect(link.className).toContain('pointer-events-none');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('href');
  });

  it('applies custom className', () => {
    render(<Link href="/about" data-testid="link" className="custom">Text</Link>);
    expect(screen.getByTestId('link').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLAnchorElement>;
    render(<Link href="/about" ref={ref}>Text</Link>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('passes through HTML attributes', () => {
    render(<Link href="/about" data-testid="link" aria-label="About page" title="Go to about">About</Link>);
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('aria-label', 'About page');
    expect(link).toHaveAttribute('title', 'Go to about');
  });

  it('has inline-flex display for inline usage', () => {
    render(<Link href="/about" data-testid="link">Inline</Link>);
    expect(screen.getByTestId('link').className).toContain('inline-flex');
  });

  it('has focus-visible ring for keyboard navigation', () => {
    render(<Link href="/about" data-testid="link">Focus</Link>);
    expect(screen.getByTestId('link').className).toContain('focus-visible:ring-2');
  });
});
