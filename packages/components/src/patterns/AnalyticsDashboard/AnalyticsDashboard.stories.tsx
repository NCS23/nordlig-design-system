import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrendingUp, Users, DollarSign, ShoppingCart, BarChart3 } from 'lucide-react';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { Icon } from '../../atoms/Icon';
import { Heading } from '../../atoms/Heading';
import { Button } from '../../atoms/Button';
import type { ColumnDef } from '@tanstack/react-table';

const meta = {
  title: 'Patterns/AnalyticsDashboard',
  component: AnalyticsDashboard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnalyticsDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Sample Data ─────────────────────────────────────────────────────────────

const sampleMetrics = [
  {
    id: 'visitors',
    title: 'Besucher',
    value: '12.345',
    icon: <Icon icon={Users} size="sm" />,
    trend: { value: 12, direction: 'up' as const, label: 'vs. Vormonat' },
  },
  {
    id: 'revenue',
    title: 'Umsatz',
    value: '€ 48.200',
    icon: <Icon icon={DollarSign} size="sm" />,
    trend: { value: 3.2, direction: 'up' as const },
    variant: 'success' as const,
  },
  {
    id: 'orders',
    title: 'Bestellungen',
    value: 842,
    icon: <Icon icon={ShoppingCart} size="sm" />,
    trend: { value: 2, direction: 'down' as const },
    variant: 'warning' as const,
  },
  {
    id: 'conversion',
    title: 'Conversion',
    value: '3.2%',
    icon: <Icon icon={TrendingUp} size="sm" />,
    trend: { value: 0.5, direction: 'up' as const },
  },
];

const monthlyData = [
  { month: 'Jan', besucher: 4000, umsatz: 2400 },
  { month: 'Feb', besucher: 3000, umsatz: 1398 },
  { month: 'Mär', besucher: 2000, umsatz: 9800 },
  { month: 'Apr', besucher: 2780, umsatz: 3908 },
  { month: 'Mai', besucher: 1890, umsatz: 4800 },
  { month: 'Jun', besucher: 2390, umsatz: 3800 },
];

const sampleCharts = [
  {
    id: 'line-chart',
    type: 'line' as const,
    data: monthlyData,
    config: {
      besucher: { label: 'Besucher', color: 'var(--color-chart-1)' },
      umsatz: { label: 'Umsatz', color: 'var(--color-chart-2)' },
    },
    dataKeys: ['besucher', 'umsatz'],
    xAxisKey: 'month',
    title: 'Besucher & Umsatz',
    description: 'Monatliche Entwicklung',
  },
];

interface Product {
  name: string;
  category: string;
  sales: number;
  revenue: string;
}

const tableColumns: ColumnDef<Product, any>[] = [
  { accessorKey: 'name', header: 'Produkt' },
  { accessorKey: 'category', header: 'Kategorie' },
  { accessorKey: 'sales', header: 'Verkaeufe' },
  { accessorKey: 'revenue', header: 'Umsatz' },
];

const tableData: Product[] = [
  { name: 'Widget Pro', category: 'Software', sales: 340, revenue: '€ 12.400' },
  { name: 'Gadget Plus', category: 'Hardware', sales: 280, revenue: '€ 8.900' },
  { name: 'Service Basic', category: 'Dienstleistung', sales: 180, revenue: '€ 5.200' },
  { name: 'Widget Lite', category: 'Software', sales: 120, revenue: '€ 3.600' },
  { name: 'Gadget Mini', category: 'Hardware', sales: 95, revenue: '€ 2.800' },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between w-full">
        <Heading level={2}>Dashboard</Heading>
        <Button variant="outline" size="sm">
          <Icon icon={BarChart3} size="sm" />
          Bericht exportieren
        </Button>
      </div>
    ),
    metrics: sampleMetrics,
    charts: sampleCharts,
    table: {
      columns: tableColumns,
      data: tableData,
      title: 'Top-Produkte',
    },
  },
};

export const MetricsOnly: Story = {
  args: {
    metrics: sampleMetrics,
    metricsColumns: 4,
  },
};

export const WithCharts: Story = {
  args: {
    metrics: sampleMetrics,
    charts: [
      ...sampleCharts,
      {
        id: 'bar-chart',
        type: 'bar' as const,
        data: monthlyData,
        config: {
          besucher: { label: 'Besucher', color: 'var(--color-chart-1)' },
        },
        dataKeys: ['besucher'],
        xAxisKey: 'month',
        title: 'Besucher pro Monat',
      },
    ],
    chartsLayout: 'grid-2',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    metrics: sampleMetrics,
    charts: sampleCharts,
    metricsColumns: 4,
  },
};

export const TableOnly: Story = {
  args: {
    table: {
      columns: tableColumns,
      data: tableData,
      title: 'Produktuebersicht',
    },
  },
};

export const TwoColumns: Story = {
  args: {
    metrics: sampleMetrics.slice(0, 2),
    metricsColumns: 2,
  },
};
