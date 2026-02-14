import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton, SkeletonText, SkeletonCircle } from './Skeleton';

describe('Skeleton', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders a div element', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton').tagName).toBe('DIV');
  });

  it('has aria-hidden="true"', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies radius token class', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton').className).toContain('rounded-[var(--radius-skeleton)]');
  });

  it('has shimmer animation style', () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId('skeleton');
    expect(el.style.animation).toContain('skeleton-shimmer');
  });

  it('has gradient background style', () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId('skeleton');
    expect(el.style.backgroundImage).toContain('linear-gradient');
  });

  // ─── Custom className ──────────────────────────────────────────────────

  it('applies custom className', () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-full" />);
    const el = screen.getByTestId('skeleton');
    expect(el.className).toContain('h-4');
    expect(el.className).toContain('w-full');
  });

  // ─── Ref Forwarding ────────────────────────────────────────────────────

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('SkeletonText', () => {
  it('renders default 3 lines', () => {
    render(<SkeletonText />);
    const wrapper = document.querySelector('.space-y-2')!;
    const skeletons = wrapper.querySelectorAll('[aria-hidden="true"]');
    expect(skeletons).toHaveLength(3);
  });

  it('renders custom number of lines', () => {
    render(<SkeletonText lines={5} />);
    const wrapper = document.querySelector('.space-y-2')!;
    const skeletons = wrapper.querySelectorAll('[aria-hidden="true"]');
    expect(skeletons).toHaveLength(5);
  });

  it('last line is shorter (w-2/3)', () => {
    render(<SkeletonText lines={3} />);
    const wrapper = document.querySelector('.space-y-2')!;
    const skeletons = wrapper.querySelectorAll('[aria-hidden="true"]');
    const lastSkeleton = skeletons[skeletons.length - 1];
    expect(lastSkeleton.className).toContain('w-2/3');
  });

  it('non-last lines are full width', () => {
    render(<SkeletonText lines={3} />);
    const wrapper = document.querySelector('.space-y-2')!;
    const skeletons = wrapper.querySelectorAll('[aria-hidden="true"]');
    expect(skeletons[0].className).toContain('w-full');
    expect(skeletons[1].className).toContain('w-full');
  });
});

describe('SkeletonCircle', () => {
  it('renders with rounded-full via circle radius token', () => {
    render(<SkeletonCircle />);
    const el = document.querySelector('[aria-hidden="true"]')!;
    expect(el.className).toContain('rounded-[var(--radius-skeleton-circle)]');
  });

  it('applies size=sm (w-8 h-8)', () => {
    render(<SkeletonCircle size="sm" />);
    const el = document.querySelector('[aria-hidden="true"]')!;
    expect(el.className).toContain('w-8');
    expect(el.className).toContain('h-8');
  });

  it('applies size=md by default (w-12 h-12)', () => {
    render(<SkeletonCircle />);
    const el = document.querySelector('[aria-hidden="true"]')!;
    expect(el.className).toContain('w-12');
    expect(el.className).toContain('h-12');
  });

  it('applies size=lg (w-16 h-16)', () => {
    render(<SkeletonCircle size="lg" />);
    const el = document.querySelector('[aria-hidden="true"]')!;
    expect(el.className).toContain('w-16');
    expect(el.className).toContain('h-16');
  });

  it('applies custom className', () => {
    render(<SkeletonCircle className="custom" />);
    const el = document.querySelector('[aria-hidden="true"]')!;
    expect(el.className).toContain('custom');
  });
});
