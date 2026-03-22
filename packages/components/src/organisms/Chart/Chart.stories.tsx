import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
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
  type ChartConfig,
} from './Chart';

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ChartContainer> = {
  title: 'Organisms/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

// ─── Daten ───────────────────────────────────────────────────────────────────

const lineData = [
  { monat: 'Jan', distanz: 120, pace: 5.4 },
  { monat: 'Feb', distanz: 145, pace: 5.2 },
  { monat: 'Mär', distanz: 160, pace: 5.1 },
  { monat: 'Apr', distanz: 180, pace: 5.0 },
  { monat: 'Mai', distanz: 155, pace: 5.15 },
  { monat: 'Jun', distanz: 190, pace: 4.95 },
];

const barData = [
  { tag: 'Mo', laufen: 8, radfahren: 12 },
  { tag: 'Di', laufen: 12, radfahren: 0 },
  { tag: 'Mi', laufen: 0, radfahren: 25 },
  { tag: 'Do', laufen: 10, radfahren: 15 },
  { tag: 'Fr', laufen: 6, radfahren: 0 },
  { tag: 'Sa', laufen: 18, radfahren: 30 },
  { tag: 'So', laufen: 14, radfahren: 20 },
];

const areaData = [
  { monat: 'Jan', schwimmen: 10, laufen: 80, radfahren: 30 },
  { monat: 'Feb', schwimmen: 15, laufen: 95, radfahren: 35 },
  { monat: 'Mär', schwimmen: 18, laufen: 110, radfahren: 50 },
  { monat: 'Apr', schwimmen: 22, laufen: 120, radfahren: 65 },
  { monat: 'Mai', schwimmen: 25, laufen: 105, radfahren: 80 },
  { monat: 'Jun', schwimmen: 30, laufen: 130, radfahren: 90 },
];

const pieData = [
  { name: 'Laufen', value: 45 },
  { name: 'Radfahren', value: 30 },
  { name: 'Schwimmen', value: 15 },
  { name: 'Krafttraining', value: 10 },
];

const weeklyData = [
  { woche: 'KW 1', distanz: 42, pace: 5.2 },
  { woche: 'KW 2', distanz: 38, pace: 5.1 },
  { woche: 'KW 3', distanz: 45, pace: 5.3 },
  { woche: 'KW 4', distanz: 50, pace: 5.0 },
  { woche: 'KW 5', distanz: 35, pace: 5.4 },
  { woche: 'KW 6', distanz: 48, pace: 5.1 },
  { woche: 'KW 7', distanz: 55, pace: 4.9 },
  { woche: 'KW 8', distanz: 52, pace: 5.0 },
];

const hrZoneData = [
  { zone: 'Zone 1', minuten: 45, label: 'Erholung' },
  { zone: 'Zone 2', minuten: 120, label: 'Grundlage' },
  { zone: 'Zone 3', minuten: 60, label: 'Tempo' },
  { zone: 'Zone 4', minuten: 30, label: 'Schwelle' },
  { zone: 'Zone 5', minuten: 15, label: 'VO2max' },
];

const monthlyOverviewData = [
  { monat: 'Jul', laufen: 90, radfahren: 45 },
  { monat: 'Aug', laufen: 105, radfahren: 55 },
  { monat: 'Sep', laufen: 120, radfahren: 40 },
  { monat: 'Okt', laufen: 110, radfahren: 30 },
  { monat: 'Nov', laufen: 85, radfahren: 20 },
  { monat: 'Dez', laufen: 70, radfahren: 15 },
];

// ─── Configs ─────────────────────────────────────────────────────────────────

const lineConfig: ChartConfig = {
  distanz: { label: 'Distanz (km)', color: 'var(--color-chart-1)' },
  pace: { label: 'Pace (min/km)', color: 'var(--color-chart-2)' },
};

const barConfig: ChartConfig = {
  laufen: { label: 'Laufen (km)', color: 'var(--color-chart-1)' },
  radfahren: { label: 'Radfahren (km)', color: 'var(--color-chart-2)' },
};

const areaConfig: ChartConfig = {
  schwimmen: { label: 'Schwimmen (km)', color: 'var(--color-chart-3)' },
  laufen: { label: 'Laufen (km)', color: 'var(--color-chart-1)' },
  radfahren: { label: 'Radfahren (km)', color: 'var(--color-chart-2)' },
};

const pieConfig: ChartConfig = {
  laufen: { label: 'Laufen', color: 'var(--color-chart-1)' },
  radfahren: { label: 'Radfahren', color: 'var(--color-chart-2)' },
  schwimmen: { label: 'Schwimmen', color: 'var(--color-chart-3)' },
  krafttraining: { label: 'Krafttraining', color: 'var(--color-chart-4)' },
};

const PIE_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
];

const weeklyConfig: ChartConfig = {
  distanz: { label: 'Distanz (km)', color: 'var(--color-chart-1)' },
  pace: { label: 'Pace (min/km)', color: 'var(--color-chart-2)' },
};

const hrZoneConfig: ChartConfig = {
  minuten: { label: 'Minuten', color: 'var(--color-chart-1)' },
};

const HR_ZONE_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

const monthlyConfig: ChartConfig = {
  laufen: { label: 'Laufen (km)', color: 'var(--color-chart-1)' },
  radfahren: { label: 'Radfahren (km)', color: 'var(--color-chart-2)' },
};

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Liniendiagramm mit zwei Serien: Distanz und Pace */
export const Liniendiagramm: Story = {
  render: () => (
    <ChartContainer config={lineConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineData}>
          <CartesianGrid stroke="var(--color-chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey="monat" stroke="var(--color-chart-axis)" />
          <YAxis stroke="var(--color-chart-axis)" />
          <Tooltip content={<ChartTooltipContent config={lineConfig} />} />
          <Legend content={<ChartLegendContent config={lineConfig} />} />
          <Line
            type="monotone"
            dataKey="distanz"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="pace"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};

/** Balkendiagramm mit gruppierten Balken */
export const Balkendiagramm: Story = {
  render: () => (
    <ChartContainer config={barConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid stroke="var(--color-chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey="tag" stroke="var(--color-chart-axis)" />
          <YAxis stroke="var(--color-chart-axis)" />
          <Tooltip content={<ChartTooltipContent config={barConfig} />} />
          <Legend content={<ChartLegendContent config={barConfig} />} />
          <Bar dataKey="laufen" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="radfahren" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};

/** Flächendiagramm mit gestapelten Flächen */
export const Flaechendiagramm: Story = {
  render: () => (
    <ChartContainer config={areaConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={areaData}>
          <CartesianGrid stroke="var(--color-chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey="monat" stroke="var(--color-chart-axis)" />
          <YAxis stroke="var(--color-chart-axis)" />
          <Tooltip content={<ChartTooltipContent config={areaConfig} />} />
          <Legend content={<ChartLegendContent config={areaConfig} />} />
          <Area
            type="monotone"
            dataKey="schwimmen"
            stackId="1"
            stroke="var(--color-chart-3)"
            fill="var(--color-chart-3)"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="laufen"
            stackId="1"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="radfahren"
            stackId="1"
            stroke="var(--color-chart-2)"
            fill="var(--color-chart-2)"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};

/** Kreisdiagramm (Donut) mit Trainingsverteilung */
export const Kreisdiagramm: Story = {
  render: () => (
    <ChartContainer config={pieConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent config={pieConfig} />} />
          <Legend content={<ChartLegendContent config={pieConfig} />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};

/** Wöchentliche Laufdistanz über 8 Wochen */
export const TrainingWoechentlicheDistanz: Story = {
  name: 'Training: Wöchentliche Distanz',
  render: () => (
    <ChartContainer config={weeklyConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyData}>
          <CartesianGrid stroke="var(--color-chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey="woche" stroke="var(--color-chart-axis)" />
          <YAxis stroke="var(--color-chart-axis)" />
          <Tooltip
            content={
              <ChartTooltipContent
                config={weeklyConfig}
                formatter={(val) => `${val}`}
              />
            }
          />
          <Legend content={<ChartLegendContent config={weeklyConfig} />} />
          <Line
            type="monotone"
            dataKey="distanz"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="pace"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};

/** Herzfrequenzzonenverteilung als Balkendiagramm */
export const TrainingHFZonenverteilung: Story = {
  name: 'Training: HF-Zonenverteilung',
  render: () => (
    <ChartContainer config={hrZoneConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={hrZoneData}>
          <CartesianGrid stroke="var(--color-chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey="zone" stroke="var(--color-chart-axis)" />
          <YAxis stroke="var(--color-chart-axis)" />
          <Tooltip
            content={
              <ChartTooltipContent
                config={hrZoneConfig}
                formatter={(val) => `${val} min`}
              />
            }
          />
          <Bar dataKey="minuten" radius={[4, 4, 0, 0]}>
            {hrZoneData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={HR_ZONE_COLORS[index % HR_ZONE_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};

/** Monatlicher Trainingsumfang als Flächendiagramm */
export const TrainingMonatsuebersicht: Story = {
  name: 'Training: Monatsübersicht',
  render: () => (
    <ChartContainer config={monthlyConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyOverviewData}>
          <CartesianGrid stroke="var(--color-chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey="monat" stroke="var(--color-chart-axis)" />
          <YAxis stroke="var(--color-chart-axis)" />
          <Tooltip content={<ChartTooltipContent config={monthlyConfig} />} />
          <Legend content={<ChartLegendContent config={monthlyConfig} />} />
          <Area
            type="monotone"
            dataKey="laufen"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="radfahren"
            stroke="var(--color-chart-2)"
            fill="var(--color-chart-2)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};
