import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import type { AnalyticsDashboardMetric, AnalyticsDashboardChart, AnalyticsDashboardTable } from './AnalyticsDashboard';

// Mock recharts to avoid rendering issues in jsdom
vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

const mockMetrics: AnalyticsDashboardMetric[] = [
  { id: '1', title: 'Besucher', value: 1234, unit: 'Pers.', trend: { value: 12, direction: 'up' } },
  { id: '2', title: 'Umsatz', value: '€ 5.600', trend: { value: 3, direction: 'down' } },
  { id: '3', title: 'Conversion', value: '3.2%', variant: 'success' },
];

const mockCharts: AnalyticsDashboardChart[] = [
  {
    id: 'c1',
    type: 'line',
    data: [
      { month: 'Jan', wert: 100 },
      { month: 'Feb', wert: 200 },
    ],
    config: { wert: { label: 'Wert', color: 'var(--color-chart-1)' } },
    dataKeys: ['wert'],
    xAxisKey: 'month',
    title: 'Verlauf',
  },
];

const mockTable: AnalyticsDashboardTable = {
  columns: [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'value', header: 'Wert' },
  ],
  data: [
    { name: 'Produkt A', value: 100 },
    { name: 'Produkt B', value: 200 },
  ],
  title: 'Details',
};

describe('AnalyticsDashboard', () => {
  // --- Rendering ---------------------------------------------------------------

  it('renders empty dashboard', () => {
    render(<AnalyticsDashboard data-testid="dash" />);
    expect(screen.getByTestId('dash')).toBeInTheDocument();
  });

  it('renders metrics as StatCards', () => {
    render(<AnalyticsDashboard metrics={mockMetrics} />);
    expect(screen.getByText('Besucher')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('Umsatz')).toBeInTheDocument();
    expect(screen.getByText('Conversion')).toBeInTheDocument();
  });

  it('renders metric units', () => {
    render(<AnalyticsDashboard metrics={mockMetrics} />);
    expect(screen.getByText('Pers.')).toBeInTheDocument();
  });

  it('renders metric trends', () => {
    render(<AnalyticsDashboard metrics={mockMetrics} />);
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });

  it('renders chart section with title', () => {
    render(<AnalyticsDashboard charts={mockCharts} />);
    expect(screen.getByText('Verlauf')).toBeInTheDocument();
  });

  it('renders table section with title', () => {
    render(<AnalyticsDashboard table={mockTable} />);
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('renders table data', () => {
    render(<AnalyticsDashboard table={mockTable} />);
    expect(screen.getByText('Produkt A')).toBeInTheDocument();
    expect(screen.getByText('Produkt B')).toBeInTheDocument();
  });

  it('renders custom header', () => {
    render(<AnalyticsDashboard header={<h1>Dashboard</h1>} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  // --- Layout ------------------------------------------------------------------

  it('applies metrics columns via style', () => {
    render(<AnalyticsDashboard metrics={mockMetrics} metricsColumns={3} />);
    const grid = screen.getByRole('region', { name: 'Metriken' });
    expect(grid.style.gridTemplateColumns).toContain('repeat(3');
  });

  it('uses auto-fill when no metricsColumns specified', () => {
    render(<AnalyticsDashboard metrics={mockMetrics} />);
    const grid = screen.getByRole('region', { name: 'Metriken' });
    expect(grid.style.gridTemplateColumns).toContain('auto-fill');
  });

  it('applies grid-2 layout for charts', () => {
    render(<AnalyticsDashboard charts={mockCharts} chartsLayout="grid-2" />);
    const grid = screen.getByRole('region', { name: 'Diagramme' });
    expect(grid.className).toContain('md:grid-cols-2');
  });

  // --- Loading state -----------------------------------------------------------

  it('shows skeletons when loading', () => {
    render(<AnalyticsDashboard loading metrics={mockMetrics} data-testid="dash" />);
    const dash = screen.getByTestId('dash');
    // Should not render actual metrics
    expect(screen.queryByText('Besucher')).not.toBeInTheDocument();
    // Should have aria-busy skeleton container
    expect(dash.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  // --- Sections optional -------------------------------------------------------

  it('does not render metrics section when not provided', () => {
    render(<AnalyticsDashboard data-testid="dash" />);
    expect(screen.queryByRole('region', { name: 'Metriken' })).not.toBeInTheDocument();
  });

  it('does not render charts section when not provided', () => {
    render(<AnalyticsDashboard data-testid="dash" />);
    expect(screen.queryByRole('region', { name: 'Diagramme' })).not.toBeInTheDocument();
  });

  // --- Styling -----------------------------------------------------------------

  it('applies base token classes', () => {
    render(<AnalyticsDashboard data-testid="dash" />);
    const el = screen.getByTestId('dash');
    expect(el.className).toContain('gap-[var(--spacing-adash-section-gap)]');
  });

  it('applies custom className', () => {
    render(<AnalyticsDashboard data-testid="dash" className="custom" />);
    expect(screen.getByTestId('dash').className).toContain('custom');
  });

  // --- Ref forwarding ----------------------------------------------------------

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<AnalyticsDashboard ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // --- HTML attributes ---------------------------------------------------------

  it('passes through HTML attributes', () => {
    render(<AnalyticsDashboard data-testid="dash" id="my-dashboard" />);
    expect(screen.getByTestId('dash')).toHaveAttribute('id', 'my-dashboard');
  });

  // --- Accessibility -----------------------------------------------------------

  it('has aria-label on metrics region', () => {
    render(<AnalyticsDashboard metrics={mockMetrics} />);
    expect(screen.getByRole('region', { name: 'Metriken' })).toBeInTheDocument();
  });

  it('has aria-label on charts region', () => {
    render(<AnalyticsDashboard charts={mockCharts} />);
    expect(screen.getByRole('region', { name: 'Diagramme' })).toBeInTheDocument();
  });

  it('has aria-label on table region', () => {
    render(<AnalyticsDashboard table={mockTable} />);
    expect(screen.getByRole('region', { name: 'Details' })).toBeInTheDocument();
  });
});
