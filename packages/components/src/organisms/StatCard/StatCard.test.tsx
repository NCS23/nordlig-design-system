import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Pace" value="5:41" />);
    expect(screen.getByText('Pace')).toBeInTheDocument();
    expect(screen.getByText('5:41')).toBeInTheDocument();
  });

  it('renders unit when provided', () => {
    render(<StatCard title="Pace" value="5:41" unit="min/km" />);
    expect(screen.getByText('min/km')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <StatCard title="Pace" value="5:41" description="vs last week" />
    );
    expect(screen.getByText('vs last week')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <StatCard
        title="Pace"
        value="5:41"
        icon={<span data-testid="test-icon">icon</span>}
      />
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders trend up with positive value', () => {
    render(
      <StatCard
        title="Pace"
        value="5:41"
        trend={{ value: 5, direction: 'up' }}
      />
    );
    expect(screen.getByText('+5%')).toBeInTheDocument();
  });

  it('renders trend down with negative value', () => {
    render(
      <StatCard
        title="Pace"
        value="5:41"
        trend={{ value: -3, direction: 'down' }}
      />
    );
    expect(screen.getByText('-3%')).toBeInTheDocument();
  });

  it('renders trend neutral', () => {
    render(
      <StatCard
        title="Pace"
        value="5:41"
        trend={{ value: 0, direction: 'neutral' }}
      />
    );
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders trend label when provided', () => {
    render(
      <StatCard
        title="Pace"
        value="5:41"
        trend={{ value: 5, direction: 'up', label: 'vs last week' }}
      />
    );
    expect(screen.getByText('vs last week')).toBeInTheDocument();
  });

  it('applies default variant (no left border accent)', () => {
    render(<StatCard data-testid="stat" title="Pace" value="5:41" />);
    const card = screen.getByTestId('stat');
    expect(card.className).toContain('bg-[var(--color-card-bg)]');
    expect(card.className).toContain('border');
    expect(card.className).not.toContain('border-l-4');
  });

  it('applies success variant', () => {
    render(
      <StatCard data-testid="stat" title="Pace" value="5:41" variant="success" />
    );
    const card = screen.getByTestId('stat');
    expect(card.className).toContain('border-l-4');
    expect(card.className).toContain('border-l-[var(--color-border-success)]');
  });

  it('applies warning variant', () => {
    render(
      <StatCard data-testid="stat" title="Pace" value="5:41" variant="warning" />
    );
    const card = screen.getByTestId('stat');
    expect(card.className).toContain('border-l-4');
    expect(card.className).toContain('border-l-[var(--color-border-warning)]');
  });

  it('applies error variant', () => {
    render(
      <StatCard data-testid="stat" title="Pace" value="5:41" variant="error" />
    );
    const card = screen.getByTestId('stat');
    expect(card.className).toContain('border-l-4');
    expect(card.className).toContain('border-l-[var(--color-border-error)]');
  });

  it('applies custom className', () => {
    render(
      <StatCard data-testid="stat" title="Pace" value="5:41" className="custom-class" />
    );
    const card = screen.getByTestId('stat');
    expect(card.className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<StatCard ref={ref} title="Pace" value="5:41" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through HTML attributes', () => {
    render(
      <StatCard
        data-testid="stat"
        title="Pace"
        value="5:41"
        aria-label="Pace statistic"
        role="region"
      />
    );
    const card = screen.getByTestId('stat');
    expect(card).toHaveAttribute('aria-label', 'Pace statistic');
    expect(card).toHaveAttribute('role', 'region');
  });

  it('renders numeric values', () => {
    render(<StatCard title="Distance" value={42.2} unit="km" />);
    expect(screen.getByText('42.2')).toBeInTheDocument();
    expect(screen.getByText('km')).toBeInTheDocument();
  });

  it('applies correct CSS custom properties', () => {
    render(<StatCard data-testid="stat" title="Pace" value="5:41" />);
    const card = screen.getByTestId('stat');
    expect(card.className).toContain('rounded-[var(--radius-card)]');
    expect(card.className).toContain('border-[var(--color-card-border)]');
    expect(card.className).toContain('bg-[var(--color-card-bg)]');
  });

  it('renders trend direction up with correct styling class', () => {
    render(
      <StatCard
        data-testid="stat"
        title="Pace"
        value="5:41"
        trend={{ value: 5, direction: 'up' }}
      />
    );
    const trendEl = screen.getByText('+5%').closest('span');
    expect(trendEl?.className).toContain('text-[var(--color-text-success)]');
  });

  it('renders trend direction down with correct styling class', () => {
    render(
      <StatCard
        data-testid="stat"
        title="Pace"
        value="5:41"
        trend={{ value: -3, direction: 'down' }}
      />
    );
    const trendEl = screen.getByText('-3%').closest('span');
    expect(trendEl?.className).toContain('text-[var(--color-text-error)]');
  });

  it('renders trend direction neutral with correct styling class', () => {
    render(
      <StatCard
        data-testid="stat"
        title="Pace"
        value="5:41"
        trend={{ value: 0, direction: 'neutral' }}
      />
    );
    const trendEl = screen.getByText('0%').closest('span');
    expect(trendEl?.className).toContain('text-[var(--color-text-muted)]');
  });

  it('does not render trend when not provided', () => {
    render(<StatCard data-testid="stat" title="Pace" value="5:41" />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<StatCard title="Pace" value="5:41" />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('does not render icon wrapper when icon not provided', () => {
    const { container } = render(<StatCard title="Pace" value="5:41" />);
    // Only the title text span should be in the title row, no icon wrapper
    const titleRow = container.querySelector('.flex.items-center.gap-2');
    expect(titleRow?.children.length).toBe(1);
  });
});
