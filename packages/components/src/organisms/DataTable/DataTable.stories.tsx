import type { Meta, StoryObj } from '@storybook/react';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';

/* ─── Typ-Definition ─── */

type TrainingSession = {
  id: string;
  date: string;
  type: string;
  duration: number;
  distance: number;
  avgHr: number;
};

/* ─── Trainingsdaten ─── */

const data: TrainingSession[] = [
  { id: '1', date: '2026-02-15', type: 'Laufen', duration: 45, distance: 8.2, avgHr: 155 },
  { id: '2', date: '2026-02-14', type: 'Radfahren', duration: 90, distance: 35.0, avgHr: 140 },
  { id: '3', date: '2026-02-13', type: 'Schwimmen', duration: 60, distance: 2.5, avgHr: 135 },
  { id: '4', date: '2026-02-12', type: 'Laufen', duration: 30, distance: 5.0, avgHr: 148 },
  { id: '5', date: '2026-02-11', type: 'Krafttraining', duration: 75, distance: 0, avgHr: 120 },
  { id: '6', date: '2026-02-10', type: 'Radfahren', duration: 120, distance: 50.0, avgHr: 138 },
  { id: '7', date: '2026-02-09', type: 'Laufen', duration: 55, distance: 10.5, avgHr: 158 },
  { id: '8', date: '2026-02-08', type: 'Schwimmen', duration: 45, distance: 1.8, avgHr: 130 },
  { id: '9', date: '2026-02-07', type: 'Krafttraining', duration: 60, distance: 0, avgHr: 118 },
  { id: '10', date: '2026-02-06', type: 'Laufen', duration: 40, distance: 7.0, avgHr: 150 },
  { id: '11', date: '2026-02-05', type: 'Radfahren', duration: 80, distance: 30.0, avgHr: 142 },
  { id: '12', date: '2026-02-04', type: 'Schwimmen', duration: 50, distance: 2.0, avgHr: 132 },
  { id: '13', date: '2026-02-03', type: 'Laufen', duration: 35, distance: 6.0, avgHr: 152 },
  { id: '14', date: '2026-02-02', type: 'Krafttraining', duration: 70, distance: 0, avgHr: 122 },
  { id: '15', date: '2026-02-01', type: 'Laufen', duration: 50, distance: 9.0, avgHr: 156 },
  { id: '16', date: '2026-01-31', type: 'Radfahren', duration: 100, distance: 42.0, avgHr: 136 },
  { id: '17', date: '2026-01-30', type: 'Schwimmen', duration: 55, distance: 2.2, avgHr: 128 },
  { id: '18', date: '2026-01-29', type: 'Laufen', duration: 65, distance: 12.0, avgHr: 160 },
];

/* ─── Spalten-Definitionen ─── */

const basicColumns: ColumnDef<TrainingSession>[] = [
  { accessorKey: 'date', header: 'Datum' },
  { accessorKey: 'type', header: 'Typ' },
  {
    accessorKey: 'duration',
    header: 'Dauer (min)',
    cell: ({ row }) => `${row.getValue('duration')} min`,
  },
  {
    accessorKey: 'distance',
    header: 'Distanz (km)',
    cell: ({ row }) => `${row.getValue('distance')} km`,
  },
  { accessorKey: 'avgHr', header: 'Avg. HF' },
];

/* ─── Meta ─── */

const meta: Meta<typeof DataTable> = {
  title: 'Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'DataTable baut auf @tanstack/react-table auf und komponiert die bestehenden Table-Sub-Komponenten. Bietet Sortierung, Suche, Pagination und Zeilenauswahl.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

/* ─── Stories ─── */

export const Basic: Story = {
  name: 'Basic',
  render: () => (
    <DataTable columns={basicColumns} data={data.slice(0, 5)} />
  ),
};

export const WithSorting: Story = {
  name: 'With Sorting',
  render: () => (
    <DataTable columns={basicColumns} data={data.slice(0, 8)} />
  ),
};

export const WithSearch: Story = {
  name: 'With Search',
  render: () => (
    <DataTable
      columns={basicColumns}
      data={data}
      searchable
      searchPlaceholder="Training suchen..."
    />
  ),
};

export const WithPagination: Story = {
  name: 'With Pagination',
  render: () => (
    <DataTable
      columns={basicColumns}
      data={data}
      pagination
      pageSize={5}
    />
  ),
};

export const WithSelection: Story = {
  name: 'With Selection',
  render: () => (
    <DataTable
      columns={basicColumns}
      data={data.slice(0, 6)}
      selectable
      onSelectionChange={(rows) => {
        // eslint-disable-next-line no-console
        console.log('Ausgewaehlte Zeilen:', rows);
      }}
    />
  ),
};

export const FullFeatured: Story = {
  name: 'Full Featured',
  render: () => (
    <DataTable
      columns={basicColumns}
      data={data}
      density="compact"
      striped
      searchable
      searchPlaceholder="Trainingseinheit suchen..."
      pagination
      pageSize={5}
      selectable
      onSelectionChange={(rows) => {
        // eslint-disable-next-line no-console
        console.log('Ausgewaehlte Zeilen:', rows);
      }}
    />
  ),
};

export const Empty: Story = {
  name: 'Empty State',
  render: () => (
    <DataTable columns={basicColumns} data={[]} />
  ),
};
