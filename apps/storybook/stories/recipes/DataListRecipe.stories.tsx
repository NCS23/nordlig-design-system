import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardBody,
  DataTable,
  Input,
  Badge,
  Button,
  Select,
  Separator,
} from '@nordlig/components';
import { Download, Filter } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: Datenliste mit Filter & Aktionen
   ═══════════════════════════════════════════════════════════════════════════ */

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
}

const users: User[] = [
  { id: 1, name: 'Anna Schmidt', email: 'anna@example.com', role: 'Admin', status: 'active', joinedAt: '12.01.2025' },
  { id: 2, name: 'Ben Mueller', email: 'ben@example.com', role: 'Entwickler', status: 'active', joinedAt: '03.03.2025' },
  { id: 3, name: 'Clara Weber', email: 'clara@example.com', role: 'Designer', status: 'pending', joinedAt: '15.06.2025' },
  { id: 4, name: 'David Fischer', email: 'david@example.com', role: 'Entwickler', status: 'inactive', joinedAt: '22.09.2024' },
  { id: 5, name: 'Eva Wagner', email: 'eva@example.com', role: 'PM', status: 'active', joinedAt: '01.11.2025' },
  { id: 6, name: 'Felix Braun', email: 'felix@example.com', role: 'Entwickler', status: 'active', joinedAt: '14.02.2026' },
  { id: 7, name: 'Greta Schwarz', email: 'greta@example.com', role: 'Designer', status: 'pending', joinedAt: '28.01.2026' },
  { id: 8, name: 'Hans Klein', email: 'hans@example.com', role: 'Admin', status: 'active', joinedAt: '05.07.2024' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'error',
};

const statusLabel: Record<string, string> = {
  active: 'Aktiv',
  pending: 'Ausstehend',
  inactive: 'Inaktiv',
};

const columns = [
  { accessorKey: 'name' as const, header: 'Name' },
  { accessorKey: 'email' as const, header: 'E-Mail' },
  { accessorKey: 'role' as const, header: 'Rolle' },
  {
    accessorKey: 'status' as const,
    header: 'Status',
    cell: ({ row }: { row: { original: User } }) => (
      <Badge variant={statusVariant[row.original.status]} size="sm">
        {statusLabel[row.original.status]}
      </Badge>
    ),
  },
  { accessorKey: 'joinedAt' as const, header: 'Beigetreten' },
];

function DataListPage() {
  const [roleFilter, setRoleFilter] = React.useState('all');
  const [selected, setSelected] = React.useState<User[]>([]);

  const filteredData = roleFilter === 'all'
    ? users
    : users.filter((u) => u.role === roleFilter);

  return (
    <div style={{ maxWidth: 900 }}>
      <Card elevation="raised">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Benutzer</h2>
            <div className="flex items-center gap-2">
              {selected.length > 0 && (
                <Badge variant="info" size="sm">{selected.length} ausgewaehlt</Badge>
              )}
              <Button variant="ghost" size="sm">
                <Download size={16} className="mr-1" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className="px-[var(--spacing-card-padding-normal)]">
          <div className="flex items-center gap-3 mb-3">
            <Filter size={16} className="text-[var(--color-text-muted)]" />
            <Select
              options={[
                { value: 'all', label: 'Alle Rollen' },
                { value: 'Admin', label: 'Admin' },
                { value: 'Entwickler', label: 'Entwickler' },
                { value: 'Designer', label: 'Designer' },
                { value: 'PM', label: 'PM' },
              ]}
              value={roleFilter}
              onChange={setRoleFilter}
              inputSize="sm"
            />
          </div>
          <Separator />
        </div>

        <CardBody>
          <DataTable
            columns={columns}
            data={filteredData}
            searchable
            searchPlaceholder="Benutzer suchen..."
            searchColumn="name"
            pagination
            pageSize={5}
            selectable
            onSelectionChange={setSelected}
            striped
          />
        </CardBody>
      </Card>
    </div>
  );
}

const meta: Meta<typeof DataListPage> = {
  title: 'Recipes/Datenliste',
  component: DataListPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Zeigt wie DataTable, Card, Badge, Select und Button eine typische Datenliste mit Filter, Suche, ' +
          'Pagination, Selektion und Custom Cell Rendering aufbauen.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DataListPage>;

export const Default: Story = {};
