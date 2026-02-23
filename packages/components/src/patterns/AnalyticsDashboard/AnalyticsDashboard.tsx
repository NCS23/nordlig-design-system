import React from 'react';
import { cn } from '../../utils/cn';
import { StatCard, type StatCardProps } from '../../organisms/StatCard';
import { Card, CardHeader, CardBody } from '../../molecules/Card';
import {
  ChartContainer,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from '../../organisms/Chart';
import { DataTable } from '../../organisms/DataTable';
import { Skeleton } from '../../atoms/Skeleton';
import { Heading } from '../../atoms/Heading';
import type { ColumnDef } from '@tanstack/react-table';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AnalyticsDashboardMetric {
  /** Eindeutige ID */
  id: string;
  /** Titel der Metrik */
  title: string;
  /** Angezeigter Wert */
  value: string | number;
  /** Einheit */
  unit?: string;
  /** Trend */
  trend?: { value: number; direction: 'up' | 'down' | 'neutral'; label?: string };
  /** Icon */
  icon?: React.ReactNode;
  /** Beschreibung */
  description?: string;
  /** StatCard-Variante */
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export interface AnalyticsDashboardChart {
  /** Eindeutige ID */
  id: string;
  /** Chart-Typ */
  type: 'line' | 'bar' | 'area' | 'pie';
  /** Chart-Daten */
  data: Record<string, unknown>[];
  /** recharts ChartConfig */
  config: ChartConfig;
  /** Daten-Keys fuer die Serien */
  dataKeys: string[];
  /** X-Achsen-Key (nicht fuer Pie) */
  xAxisKey?: string;
  /** Titel ueber dem Chart */
  title?: string;
  /** Beschreibung */
  description?: string;
}

export interface AnalyticsDashboardTable {
  /** Tabellen-Spalten */
  columns: ColumnDef<any, any>[];
  /** Tabellen-Daten */
  data: any[];
  /** Titel */
  title?: string;
}

export interface AnalyticsDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metriken als StatCards */
  metrics?: AnalyticsDashboardMetric[];
  /** Spaltenanzahl fuer Metriken-Grid (default: auto-responsive) */
  metricsColumns?: 1 | 2 | 3 | 4;
  /** Chart-Konfigurationen */
  charts?: AnalyticsDashboardChart[];
  /** Chart-Layout */
  chartsLayout?: 'single' | 'grid-2';
  /** DataTable Konfiguration */
  table?: AnalyticsDashboardTable;
  /** Ladezustand */
  loading?: boolean;
  /** Optionaler Header-Bereich */
  header?: React.ReactNode;
}

// ─── Chart Renderer ─────────────────────────────────────────────────────────

function DashboardChart({ chart }: { chart: AnalyticsDashboardChart }) {
  const colors = Object.values(chart.config).map((c) => c.color || 'var(--color-chart-1)');

  const renderChart = () => {
    switch (chart.type) {
      case 'line':
        return (
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            {chart.xAxisKey && <XAxis dataKey={chart.xAxisKey} />}
            <YAxis />
            <Tooltip content={<ChartTooltipContent config={chart.config} />} />
            <Legend content={<ChartLegendContent config={chart.config} />} />
            {chart.dataKeys.map((key, i) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            {chart.xAxisKey && <XAxis dataKey={chart.xAxisKey} />}
            <YAxis />
            <Tooltip content={<ChartTooltipContent config={chart.config} />} />
            <Legend content={<ChartLegendContent config={chart.config} />} />
            {chart.dataKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={colors[i % colors.length]} />
            ))}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            {chart.xAxisKey && <XAxis dataKey={chart.xAxisKey} />}
            <YAxis />
            <Tooltip content={<ChartTooltipContent config={chart.config} />} />
            <Legend content={<ChartLegendContent config={chart.config} />} />
            {chart.dataKeys.map((key, i) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[i % colors.length]}
                fill={colors[i % colors.length]}
                fillOpacity={0.2}
              />
            ))}
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Tooltip content={<ChartTooltipContent config={chart.config} />} />
            <Legend content={<ChartLegendContent config={chart.config} />} />
            <Pie
              data={chart.data}
              dataKey={chart.dataKeys[0]}
              nameKey={chart.xAxisKey || 'name'}
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {chart.data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
    }
  };

  return (
    <Card>
      {chart.title && (
        <CardHeader>
          <Heading level={3} className="text-[length:var(--font-adash-section-title-size)]">
            {chart.title}
          </Heading>
          {chart.description && (
            <p className="text-[var(--color-text-muted)] text-sm">{chart.description}</p>
          )}
        </CardHeader>
      )}
      <CardBody>
        <ChartContainer config={chart.config} className="h-[var(--sizing-adash-chart-height)] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
      </CardBody>
    </Card>
  );
}

// ─── Loading Skeletons ──────────────────────────────────────────────────────

function MetricsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid gap-[var(--spacing-adash-metrics-gap)]"
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} padding="normal">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-3 w-32" />
        </Card>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <Card>
      <CardBody>
        <Skeleton className="h-[var(--sizing-adash-chart-height)] w-full" />
      </CardBody>
    </Card>
  );
}

function TableSkeleton() {
  return (
    <Card>
      <CardBody>
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// ─── AnalyticsDashboard ─────────────────────────────────────────────────────

const AnalyticsDashboard = React.forwardRef<HTMLDivElement, AnalyticsDashboardProps>(
  (
    {
      metrics,
      metricsColumns,
      charts,
      chartsLayout = 'single',
      table,
      loading = false,
      header,
      className,
      ...props
    },
    ref
  ) => {
    const hasMetrics = metrics && metrics.length > 0;
    const hasCharts = charts && charts.length > 0;
    const hasTable = table && table.columns.length > 0;

    const gridCols = metricsColumns
      ? `repeat(${metricsColumns}, minmax(0, 1fr))`
      : `repeat(auto-fill, minmax(240px, 1fr))`;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--spacing-adash-section-gap)]',
          className
        )}
        {...props}
      >
        {/* Header */}
        {header && (
          <div className="flex items-center gap-[var(--spacing-adash-header-gap)]">
            {header}
          </div>
        )}

        {/* Metrics */}
        {loading && <MetricsSkeleton count={metricsColumns || 4} />}
        {!loading && hasMetrics && (
          <div
            className="grid gap-[var(--spacing-adash-metrics-gap)]"
            style={{ gridTemplateColumns: gridCols }}
            role="region"
            aria-label="Metriken"
          >
            {metrics.map((metric) => (
              <StatCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                trend={metric.trend}
                icon={metric.icon}
                description={metric.description}
                variant={metric.variant}
              />
            ))}
          </div>
        )}

        {/* Charts */}
        {loading && hasCharts !== false && (
          <div
            className={cn(
              'grid gap-[var(--spacing-adash-charts-gap)]',
              chartsLayout === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
            )}
          >
            <ChartSkeleton />
            {chartsLayout === 'grid-2' && <ChartSkeleton />}
          </div>
        )}
        {!loading && hasCharts && (
          <div
            className={cn(
              'grid gap-[var(--spacing-adash-charts-gap)]',
              chartsLayout === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
            )}
            role="region"
            aria-label="Diagramme"
          >
            {charts.map((chart) => (
              <DashboardChart key={chart.id} chart={chart} />
            ))}
          </div>
        )}

        {/* Table */}
        {loading && <TableSkeleton />}
        {!loading && hasTable && (
          <div role="region" aria-label={table.title || 'Datentabelle'}>
            {table.title && (
              <Heading level={3} className="text-[length:var(--font-adash-section-title-size)] [font-weight:var(--font-adash-section-title-weight)] mb-[var(--spacing-adash-header-gap)]">
                {table.title}
              </Heading>
            )}
            <DataTable columns={table.columns} data={table.data} />
          </div>
        )}
      </div>
    );
  }
);

AnalyticsDashboard.displayName = 'AnalyticsDashboard';

export { AnalyticsDashboard };
