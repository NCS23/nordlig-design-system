import React, { createContext, useContext } from 'react';
import { cn } from '../../utils/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
    icon?: React.ComponentType;
  };
}

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: 'dot' | 'line' | 'dashed';
  labelFormatter?: (label: string) => string;
  formatter?: (value: number) => string;
  config?: ChartConfig;
}

export interface ChartLegendContentProps {
  payload?: Array<{
    value: string;
    color: string;
    dataKey?: string;
  }>;
  config?: ChartConfig;
  className?: string;
}

// ─── Default chart series colors ─────────────────────────────────────────────

const CHART_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

// ─── Context ─────────────────────────────────────────────────────────────────

const ChartConfigContext = createContext<ChartConfig>({});

export function useChartConfig() {
  return useContext(ChartConfigContext);
}

// ─── ChartContainer ──────────────────────────────────────────────────────────

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, children, className, style, ...props }, ref) => {
    // Build CSS custom properties from config
    const cssVars: Record<string, string> = {};
    const keys = Object.keys(config);
    keys.forEach((key, index) => {
      const entry = config[key];
      const color = entry.color || CHART_COLORS[index % CHART_COLORS.length];
      cssVars[`--color-chart-series-${index}`] = color;
      // Also set a named var for direct lookup
      cssVars[`--color-chart-${key}`] = color;
    });

    return (
      <ChartConfigContext.Provider value={config}>
        <div
          ref={ref}
          className={cn('chart-container', className)}
          style={{ ...cssVars, ...style }}
          data-testid="chart-container"
          {...props}
        >
          {children}
        </div>
      </ChartConfigContext.Provider>
    );
  }
);
ChartContainer.displayName = 'ChartContainer';

// ─── ChartTooltipContent ─────────────────────────────────────────────────────

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      label,
      hideLabel = false,
      hideIndicator = false,
      indicator = 'dot',
      labelFormatter,
      formatter,
      config: configProp,
    },
    ref
  ) => {
    const contextConfig = useChartConfig();
    const config = configProp || contextConfig;

    if (!active || !payload?.length) {
      return null;
    }

    const formattedLabel = label
      ? labelFormatter
        ? labelFormatter(label)
        : label
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--color-chart-tooltip-bg)]',
          'border border-[var(--color-chart-tooltip-border)]',
          'text-[var(--color-chart-tooltip-text)]',
          'rounded-[var(--radius-chart-tooltip)]',
          '[box-shadow:var(--shadow-chart-tooltip)]',
          'px-3 py-2 text-[length:var(--font-chart-tooltip-size)]'
        )}
        data-testid="chart-tooltip"
      >
        {!hideLabel && formattedLabel && (
          <div className="mb-1 [font-weight:var(--font-chart-tooltip-weight)]" data-testid="chart-tooltip-label">
            {formattedLabel}
          </div>
        )}
        <div className="flex flex-col gap-[var(--spacing-chart-tooltip-gap)]">
          {payload.map((entry, index) => {
            const dataKey = entry.dataKey || entry.name;
            const configEntry = config[dataKey];
            const entryLabel = configEntry?.label || entry.name;
            const entryColor = entry.color || configEntry?.color || CHART_COLORS[index % CHART_COLORS.length];
            const formattedValue = formatter ? formatter(entry.value) : entry.value;

            return (
              <div
                key={`${dataKey}-${index}`}
                className="flex items-center gap-[var(--spacing-chart-tooltip-gap)]"
                data-testid="chart-tooltip-item"
              >
                {!hideIndicator && (
                  <span
                    className={cn(
                      'inline-block shrink-0',
                      indicator === 'dot' && 'h-2.5 w-2.5 rounded-full',
                      indicator === 'line' && 'h-0.5 w-3.5 rounded-full',
                      indicator === 'dashed' &&
                        'h-0.5 w-3.5 rounded-full border-b border-dashed'
                    )}
                    style={{
                      backgroundColor:
                        indicator !== 'dashed' ? entryColor : undefined,
                      borderColor:
                        indicator === 'dashed' ? entryColor : undefined,
                    }}
                    data-testid="chart-tooltip-indicator"
                  />
                )}
                <span className="flex-1 text-[var(--color-chart-tooltip-text)] opacity-70">
                  {entryLabel}
                </span>
                <span className="font-mono [font-weight:var(--font-chart-tooltip-weight)] tabular-nums">
                  {formattedValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

// ─── ChartLegendContent ──────────────────────────────────────────────────────

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ payload, config: configProp, className }, ref) => {
    const contextConfig = useChartConfig();
    const config = configProp || contextConfig;

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-[var(--spacing-chart-legend-gap)] pt-3', className)}
        data-testid="chart-legend"
      >
        {payload.map((entry, index) => {
          const dataKey = entry.dataKey || entry.value;
          const configEntry = config[dataKey];
          const label = configEntry?.label || entry.value;
          const color = entry.color || configEntry?.color || CHART_COLORS[index % CHART_COLORS.length];

          return (
            <div
              key={`${dataKey}-${index}`}
              className="flex items-center gap-[var(--spacing-chart-legend-item-gap)] text-[length:var(--font-chart-legend-size)]"
              data-testid="chart-legend-item"
            >
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
                data-testid="chart-legend-color"
              />
              <span className="text-[var(--color-chart-axis)]">{label}</span>
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = 'ChartLegendContent';

// ─── Re-exports from Recharts ────────────────────────────────────────────────

export {
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
} from 'recharts';

// ─── Export components ───────────────────────────────────────────────────────

export { ChartContainer, ChartTooltipContent, ChartLegendContent };
