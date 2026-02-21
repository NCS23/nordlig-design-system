import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTablePattern } from './DataTablePattern';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Select } from '../../molecules/Select';

/* ─── Typen ─── */

type Training = {
  id: string;
  name: string;
  typ: string;
  distanz: string;
  datum: string;
  status: 'abgeschlossen' | 'geplant' | 'abgebrochen';
};

/* ─── Demo-Daten ─── */

const trainingData: Training[] = [
  { id: '1', name: 'Morgenlauf', typ: 'Laufen', distanz: '8.2 km', datum: '21.02.2026', status: 'abgeschlossen' },
  { id: '2', name: 'Intervall-Training', typ: 'Laufen', distanz: '6.1 km', datum: '20.02.2026', status: 'abgeschlossen' },
  { id: '3', name: 'Rennrad Tour', typ: 'Radfahren', distanz: '42.5 km', datum: '19.02.2026', status: 'abgeschlossen' },
  { id: '4', name: 'Schwimmen Technik', typ: 'Schwimmen', distanz: '2.0 km', datum: '18.02.2026', status: 'abgeschlossen' },
  { id: '5', name: 'Trail Run', typ: 'Laufen', distanz: '12.3 km', datum: '17.02.2026', status: 'abgeschlossen' },
  { id: '6', name: 'Regenerationslauf', typ: 'Laufen', distanz: '5.0 km', datum: '16.02.2026', status: 'abgeschlossen' },
  { id: '7', name: 'Zeitfahren', typ: 'Radfahren', distanz: '30.0 km', datum: '15.02.2026', status: 'abgeschlossen' },
  { id: '8', name: 'Tempodauerlauf', typ: 'Laufen', distanz: '10.0 km', datum: '14.02.2026', status: 'abgeschlossen' },
  { id: '9', name: 'Koppeltraining', typ: 'Triathlon', distanz: '25.0 km', datum: '13.02.2026', status: 'geplant' },
  { id: '10', name: 'Kraulschwimmen', typ: 'Schwimmen', distanz: '1.5 km', datum: '12.02.2026', status: 'abgebrochen' },
  { id: '11', name: 'Huegelintervalle', typ: 'Radfahren', distanz: '55.0 km', datum: '11.02.2026', status: 'abgeschlossen' },
  { id: '12', name: 'Erholungslauf', typ: 'Laufen', distanz: '4.5 km', datum: '10.02.2026', status: 'abgeschlossen' },
];

/* ─── Spalten ─── */

const columns: ColumnDef<Training, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'typ', header: 'Typ' },
  { accessorKey: 'distanz', header: 'Distanz' },
  { accessorKey: 'datum', header: 'Datum' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variantMap: Record<string, 'success' | 'neutral' | 'error'> = {
        abgeschlossen: 'success',
        geplant: 'neutral',
        abgebrochen: 'error',
      };
      return <Badge variant={variantMap[status] ?? 'neutral'}>{status}</Badge>;
    },
  },
];

/* ─── Meta ─── */

const meta: Meta<typeof DataTablePattern> = {
  title: 'Patterns/DataTablePattern',
  component: DataTablePattern,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DataTablePattern>;

/* ─── Stories ─── */

export const Default: Story = {
  render: () => (
    <DataTablePattern
      columns={columns}
      data={trainingData}
      pagination
      pageSize={5}
    />
  ),
};

export const WithSearch: Story = {
  render: () => (
    <DataTablePattern
      columns={columns}
      data={trainingData}
      searchable
      searchPlaceholder="Training suchen..."
      pagination
      pageSize={5}
    />
  ),
};

export const WithFilters: Story = {
  render: () => (
    <DataTablePattern
      columns={columns}
      data={trainingData}
      searchable
      searchPlaceholder="Training suchen..."
      filterSlots={
        <Select
          options={[
            { value: 'alle', label: 'Alle Typen' },
            { value: 'laufen', label: 'Laufen' },
            { value: 'radfahren', label: 'Radfahren' },
            { value: 'schwimmen', label: 'Schwimmen' },
            { value: 'triathlon', label: 'Triathlon' },
          ]}
          placeholder="Typ filtern..."
        />
      }
      pagination
      pageSize={5}
    />
  ),
};

export const WithBulkActions: Story = {
  render: () => (
    <DataTablePattern
      columns={columns}
      data={trainingData}
      selectable
      bulkActions={(rows) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            {rows.length} exportieren
          </Button>
          <Button variant="destructive" size="sm">
            {rows.length} loeschen
          </Button>
        </div>
      )}
      pagination
      pageSize={5}
    />
  ),
};

export const EmptyStateStory: Story = {
  name: 'EmptyState',
  render: () => (
    <DataTablePattern
      columns={columns}
      data={[]}
      title="Trainingseinheiten"
      description="Verwalte deine Trainings hier."
      emptyTitle="Keine Trainings gefunden"
      emptyDescription="Erstelle dein erstes Training, um loszulegen."
    />
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <DataTablePattern
      columns={columns}
      data={trainingData}
      title="Trainingseinheiten"
      description="Alle Aktivitaeten im Ueberblick"
      headerActions={<Button size="sm">Neues Training</Button>}
      searchable
      searchPlaceholder="Training suchen..."
      filterSlots={
        <Select
          options={[
            { value: 'alle', label: 'Alle Typen' },
            { value: 'laufen', label: 'Laufen' },
            { value: 'radfahren', label: 'Radfahren' },
            { value: 'schwimmen', label: 'Schwimmen' },
            { value: 'triathlon', label: 'Triathlon' },
          ]}
          placeholder="Typ filtern..."
        />
      }
      selectable
      bulkActions={(rows) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            {rows.length} exportieren
          </Button>
          <Button variant="destructive" size="sm">
            {rows.length} loeschen
          </Button>
        </div>
      )}
      pagination
      pageSize={5}
      striped
    />
  ),
};
