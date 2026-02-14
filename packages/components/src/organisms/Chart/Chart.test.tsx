import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from './Chart';

// ─── Test config ─────────────────────────────────────────────────────────────

const defaultConfig: ChartConfig = {
  distance: { label: 'Distanz', color: 'var(--color-chart-1)' },
  pace: { label: 'Pace', color: 'var(--color-chart-2)' },
};

const defaultPayload = [
  { name: 'distance', value: 42, color: 'var(--color-chart-1)', dataKey: 'distance' },
  { name: 'pace', value: 5.2, color: 'var(--color-chart-2)', dataKey: 'pace' },
];

// ─── ChartContainer ──────────────────────────────────────────────────────────

describe('ChartContainer', () => {
  it('renders children', () => {
    render(
      <ChartContainer config={defaultConfig}>
        <span data-testid="child">Chart Content</span>
      </ChartContainer>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Chart Content')).toBeInTheDocument();
  });

  it('applies CSS custom properties from config', () => {
    render(
      <ChartContainer config={defaultConfig}>
        <span>Content</span>
      </ChartContainer>
    );

    const container = screen.getByTestId('chart-container');
    expect(container.style.getPropertyValue('--color-chart-series-0')).toBe(
      'var(--color-chart-1)'
    );
    expect(container.style.getPropertyValue('--color-chart-series-1')).toBe(
      'var(--color-chart-2)'
    );
    expect(container.style.getPropertyValue('--color-chart-distance')).toBe(
      'var(--color-chart-1)'
    );
    expect(container.style.getPropertyValue('--color-chart-pace')).toBe(
      'var(--color-chart-2)'
    );
  });

  it('applies custom className', () => {
    render(
      <ChartContainer config={defaultConfig} className="my-custom-class">
        <span>Content</span>
      </ChartContainer>
    );

    const container = screen.getByTestId('chart-container');
    expect(container.className).toContain('my-custom-class');
  });

  it('assigns default colors when config entries have no color', () => {
    const configWithoutColors: ChartConfig = {
      alpha: { label: 'Alpha' },
      beta: { label: 'Beta' },
    };

    render(
      <ChartContainer config={configWithoutColors}>
        <span>Content</span>
      </ChartContainer>
    );

    const container = screen.getByTestId('chart-container');
    expect(container.style.getPropertyValue('--color-chart-series-0')).toBe(
      'var(--color-chart-1)'
    );
    expect(container.style.getPropertyValue('--color-chart-series-1')).toBe(
      'var(--color-chart-2)'
    );
  });
});

// ─── ChartTooltipContent ─────────────────────────────────────────────────────

describe('ChartTooltipContent', () => {
  it('renders when active with payload', () => {
    render(
      <ChartTooltipContent
        active={true}
        payload={defaultPayload}
        label="KW 1"
        config={defaultConfig}
      />
    );

    expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument();
  });

  it('renders nothing when not active', () => {
    const { container } = render(
      <ChartTooltipContent
        active={false}
        payload={defaultPayload}
        label="KW 1"
        config={defaultConfig}
      />
    );

    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when payload is empty', () => {
    const { container } = render(
      <ChartTooltipContent
        active={true}
        payload={[]}
        label="KW 1"
        config={defaultConfig}
      />
    );

    expect(container.innerHTML).toBe('');
  });

  it('shows the label', () => {
    render(
      <ChartTooltipContent
        active={true}
        payload={defaultPayload}
        label="KW 1"
        config={defaultConfig}
      />
    );

    expect(screen.getByTestId('chart-tooltip-label')).toHaveTextContent('KW 1');
  });

  it('shows payload items with labels from config', () => {
    render(
      <ChartTooltipContent
        active={true}
        payload={defaultPayload}
        label="KW 1"
        config={defaultConfig}
      />
    );

    const items = screen.getAllByTestId('chart-tooltip-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Distanz');
    expect(items[0]).toHaveTextContent('42');
    expect(items[1]).toHaveTextContent('Pace');
    expect(items[1]).toHaveTextContent('5.2');
  });

  it('shows color indicators by default', () => {
    render(
      <ChartTooltipContent
        active={true}
        payload={defaultPayload}
        label="KW 1"
        config={defaultConfig}
      />
    );

    const indicators = screen.getAllByTestId('chart-tooltip-indicator');
    expect(indicators).toHaveLength(2);
    expect(indicators[0]).toHaveStyle({ backgroundColor: 'var(--color-chart-1)' });
    expect(indicators[1]).toHaveStyle({ backgroundColor: 'var(--color-chart-2)' });
  });

  it('applies token-based styling classes', () => {
    render(
      <ChartTooltipContent
        active={true}
        payload={defaultPayload}
        label="KW 1"
        config={defaultConfig}
      />
    );

    const tooltip = screen.getByTestId('chart-tooltip');
    expect(tooltip.className).toContain('bg-[var(--color-chart-tooltip-bg)]');
    expect(tooltip.className).toContain('border-[var(--color-chart-tooltip-border)]');
    expect(tooltip.className).toContain('text-[var(--color-chart-tooltip-text)]');
    expect(tooltip.className).toContain('rounded-[var(--radius-chart-tooltip)]');
    expect(tooltip.className).toContain('[box-shadow:var(--shadow-chart-tooltip)]');
  });

  it('uses labelFormatter when provided', () => {
    render(
      <ChartTooltipContent
        active={true}
        payload={defaultPayload}
        label="KW 1"
        labelFormatter={(l) => `Woche: ${l}`}
        config={defaultConfig}
      />
    );

    expect(screen.getByTestId('chart-tooltip-label')).toHaveTextContent('Woche: KW 1');
  });
});

// ─── ChartLegendContent ──────────────────────────────────────────────────────

describe('ChartLegendContent', () => {
  const legendPayload = [
    { value: 'distance', color: 'var(--color-chart-1)' },
    { value: 'pace', color: 'var(--color-chart-2)' },
  ];

  it('renders legend items', () => {
    render(
      <ChartLegendContent payload={legendPayload} config={defaultConfig} />
    );

    expect(screen.getByTestId('chart-legend')).toBeInTheDocument();
    const items = screen.getAllByTestId('chart-legend-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Distanz');
    expect(items[1]).toHaveTextContent('Pace');
  });

  it('shows correct colors for legend items', () => {
    render(
      <ChartLegendContent payload={legendPayload} config={defaultConfig} />
    );

    const colorDots = screen.getAllByTestId('chart-legend-color');
    expect(colorDots[0]).toHaveStyle({ backgroundColor: 'var(--color-chart-1)' });
    expect(colorDots[1]).toHaveStyle({ backgroundColor: 'var(--color-chart-2)' });
  });

  it('renders nothing when payload is empty', () => {
    const { container } = render(
      <ChartLegendContent payload={[]} config={defaultConfig} />
    );

    expect(container.innerHTML).toBe('');
  });
});
