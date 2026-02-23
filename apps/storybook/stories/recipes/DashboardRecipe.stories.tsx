import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AnalyticsDashboard,
  type AnalyticsDashboardMetric,
  type AnalyticsDashboardChart,
  type AnalyticsDashboardTable,
} from '@nordlig/components';
import { Activity, TrendingUp, Clock, Flame } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: Trainings-Dashboard
   ═══════════════════════════════════════════════════════════════════════════ */

const metrics: AnalyticsDashboardMetric[] = [
  {
    title: 'Distanz diese Woche',
    value: '42.5',
    unit: 'km',
    trend: { value: 12, direction: 'up', label: 'vs. letzte Woche' },
    icon: <Activity size={18} />,
  },
  {
    title: 'Durchschnitts-Pace',
    value: '5:23',
    unit: 'min/km',
    trend: { value: 3, direction: 'down', label: 'schneller' },
    icon: <TrendingUp size={18} />,
  },
  {
    title: 'Trainingszeit',
    value: '3h 48m',
    trend: { value: 0, direction: 'neutral' },
    icon: <Clock size={18} />,
  },
  {
    title: 'Kalorien',
    value: '2.847',
    unit: 'kcal',
    trend: { value: 8, direction: 'up' },
    icon: <Flame size={18} />,
  },
];

const charts: AnalyticsDashboardChart[] = [
  {
    title: 'Woechentliche Distanz',
    type: 'bar',
    config: {
      distanz: { label: 'Distanz (km)', color: 'var(--color-chart-1)' },
    },
    data: [
      { name: 'Mo', distanz: 8.2 },
      { name: 'Di', distanz: 0 },
      { name: 'Mi', distanz: 12.1 },
      { name: 'Do', distanz: 5.5 },
      { name: 'Fr', distanz: 0 },
      { name: 'Sa', distanz: 16.7 },
      { name: 'So', distanz: 0 },
    ],
    dataKey: 'name',
  },
  {
    title: 'Herzfrequenz-Verlauf',
    type: 'area',
    config: {
      bpm: { label: 'BPM', color: 'var(--color-chart-3)' },
    },
    data: Array.from({ length: 30 }, (_, i) => ({
      name: `${i + 1}`,
      bpm: 135 + Math.round(Math.sin(i / 3) * 20 + Math.random() * 10),
    })),
    dataKey: 'name',
  },
];

const tableData = {
  title: 'Letzte Aktivitaeten',
  columns: [
    { accessorKey: 'date', header: 'Datum' },
    { accessorKey: 'type', header: 'Typ' },
    { accessorKey: 'distance', header: 'Distanz' },
    { accessorKey: 'duration', header: 'Dauer' },
    { accessorKey: 'pace', header: 'Pace' },
  ],
  data: [
    { date: '23.02.2026', type: 'Lauf', distance: '12.1 km', duration: '1:05:12', pace: '5:23/km' },
    { date: '21.02.2026', type: 'Lauf', distance: '8.2 km', duration: '0:42:30', pace: '5:11/km' },
    { date: '20.02.2026', type: 'Intervall', distance: '5.5 km', duration: '0:28:45', pace: '5:13/km' },
    { date: '18.02.2026', type: 'Langer Lauf', distance: '16.7 km', duration: '1:32:00', pace: '5:31/km' },
  ],
} satisfies AnalyticsDashboardTable;

const meta: Meta = {
  title: 'Recipes/Dashboard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Zeigt wie AnalyticsDashboard mit StatCards, Charts und DataTable ein komplettes Dashboard aufbaut. ' +
          'Alle Sektionen sind optional — nur rendern was gebraucht wird.',
      },
    },
  },
};
export default meta;

export const TrainingsDashboard: StoryObj = {
  render: () => (
    <AnalyticsDashboard
      metrics={metrics}
      metricsColumns={4}
      charts={charts}
      chartsLayout="grid-2"
      table={tableData}
      header={
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Trainings-Uebersicht</h1>
          <span className="text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)]">
            Woche 08/2026
          </span>
        </div>
      }
    />
  ),
};

export const NurMetriken: StoryObj = {
  render: () => (
    <AnalyticsDashboard
      metrics={metrics}
      metricsColumns={2}
    />
  ),
};

export const LadeZustand: StoryObj = {
  render: () => (
    <AnalyticsDashboard
      metrics={metrics}
      charts={charts}
      table={tableData}
      loading
    />
  ),
};
