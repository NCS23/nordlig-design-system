import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';
import { Badge } from '../../atoms/Badge';

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    density: {
      control: 'select',
      options: ['compact', 'normal', 'spacious'],
    },
    striped: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Table component with compound pattern (Table, TableHeader, TableBody, TableRow, TableHead, TableCell). Uses semantic HTML. Add `aria-label` or `aria-describedby` for accessibility. Use `scope="col"` on TableHead.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Basic: Story = {
  args: {
    density: 'normal',
    striped: false,
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow hoverable={false}>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="right">Wert</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alpha</TableCell>
          <TableCell>Aktiv</TableCell>
          <TableCell numeric>1.234</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Beta</TableCell>
          <TableCell>Inaktiv</TableCell>
          <TableCell numeric>567</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Gamma</TableCell>
          <TableCell>Aktiv</TableCell>
          <TableCell numeric>89.012</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table striped>
      <TableHeader>
        <TableRow hoverable={false}>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead align="right">Punkte</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { id: 1, name: 'Anna', points: 95 },
          { id: 2, name: 'Ben', points: 87 },
          { id: 3, name: 'Clara', points: 92 },
          { id: 4, name: 'David', points: 78 },
          { id: 5, name: 'Eva', points: 88 },
        ].map((row) => (
          <TableRow key={row.id}>
            <TableCell numeric>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell numeric>{row.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const AllDensities: Story = {
  name: 'All Densities',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {(['compact', 'normal', 'spacious'] as const).map((d) => (
        <div key={d}>
          <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, textTransform: 'capitalize' }}>
            {d}
          </h3>
          <Table density={d} striped>
            <TableHeader>
              <TableRow hoverable={false}>
                <TableHead>Übung</TableHead>
                <TableHead align="right">Sätze</TableHead>
                <TableHead align="right">Gewicht</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Bankdrücken</TableCell>
                <TableCell numeric>4×8</TableCell>
                <TableCell numeric>80kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kniebeuge</TableCell>
                <TableCell numeric>5×5</TableCell>
                <TableCell numeric>100kg</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const LapAnalysis: Story = {
  name: 'Use Case: Lap Analysis',
  render: () => {
    const laps = [
      { lap: 1, distance: '1.00 km', pace: '4:28', hrAvg: 148, hrMax: 155, cadence: 178 },
      { lap: 2, distance: '1.00 km', pace: '4:22', hrAvg: 156, hrMax: 162, cadence: 181 },
      { lap: 3, distance: '1.00 km', pace: '4:35', hrAvg: 160, hrMax: 167, cadence: 176 },
      { lap: 4, distance: '1.00 km', pace: '4:18', hrAvg: 165, hrMax: 172, cadence: 183 },
      { lap: 5, distance: '1.00 km', pace: '4:12', hrAvg: 170, hrMax: 178, cadence: 185 },
      { lap: 6, distance: '1.00 km', pace: '4:05', hrAvg: 174, hrMax: 182, cadence: 188 },
      { lap: 7, distance: '0.10 km', pace: '3:48', hrAvg: 178, hrMax: 185, cadence: 192 },
    ];

    return (
      <Table density="compact" striped aria-label="Rundenanalyse">
        <TableHeader>
          <TableRow hoverable={false}>
            <TableHead scope="col">Runde</TableHead>
            <TableHead scope="col" align="right">Distanz</TableHead>
            <TableHead scope="col" align="right">Pace</TableHead>
            <TableHead scope="col" align="right">HF Ø</TableHead>
            <TableHead scope="col" align="right">HF Max</TableHead>
            <TableHead scope="col" align="right">Kadenz</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {laps.map((lap) => (
            <TableRow key={lap.lap}>
              <TableCell numeric>{lap.lap}</TableCell>
              <TableCell numeric>{lap.distance}</TableCell>
              <TableCell numeric>{lap.pace}</TableCell>
              <TableCell numeric>{lap.hrAvg}</TableCell>
              <TableCell
                numeric
                className={lap.hrMax > 180 ? 'text-[var(--color-error-text)] font-semibold' : ''}
              >
                {lap.hrMax}
              </TableCell>
              <TableCell numeric>{lap.cadence}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const WeeklyLog: Story = {
  name: 'Use Case: Weekly Training Log',
  render: () => {
    const days = [
      { date: 'Mo 10.02.', type: 'Krafttraining', variant: 'neutral' as const, duration: '52 min', distance: '-', hrAvg: 128 },
      { date: 'Di 11.02.', type: 'Intervalle', variant: 'info' as const, duration: '45 min', distance: '8.2 km', hrAvg: 162 },
      { date: 'Mi 12.02.', type: 'Ruhetag', variant: 'neutral' as const, duration: '-', distance: '-', hrAvg: null },
      { date: 'Do 13.02.', type: 'Tempo', variant: 'warning' as const, duration: '38 min', distance: '7.5 km', hrAvg: 158 },
      { date: 'Fr 14.02.', type: 'Krafttraining', variant: 'neutral' as const, duration: '48 min', distance: '-', hrAvg: 132 },
      { date: 'Sa 15.02.', type: 'Longrun', variant: 'success' as const, duration: '1:42 h', distance: '21.1 km', hrAvg: 145 },
      { date: 'So 16.02.', type: 'Ruhetag', variant: 'neutral' as const, duration: '-', distance: '-', hrAvg: null },
    ];

    return (
      <Table striped aria-label="Wochentraining KW 7">
        <TableHeader>
          <TableRow hoverable={false}>
            <TableHead scope="col">Datum</TableHead>
            <TableHead scope="col">Typ</TableHead>
            <TableHead scope="col" align="right">Dauer</TableHead>
            <TableHead scope="col" align="right">Distanz</TableHead>
            <TableHead scope="col" align="right">HF Ø</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day.date}>
              <TableCell>{day.date}</TableCell>
              <TableCell>
                <Badge variant={day.variant} size="sm">{day.type}</Badge>
              </TableCell>
              <TableCell numeric>{day.duration}</TableCell>
              <TableCell numeric>{day.distance}</TableCell>
              <TableCell numeric>{day.hrAvg ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const HeartRateZones: Story = {
  name: 'Use Case: Heart Rate Zones',
  render: () => {
    const zones = [
      { zone: 'Z1 Regeneration', variant: 'info' as const, pct: '12%', minutes: '6:12', hrAvg: 118 },
      { zone: 'Z2 Grundlage', variant: 'success' as const, pct: '35%', minutes: '18:05', hrAvg: 142 },
      { zone: 'Z3 Tempo', variant: 'warning' as const, pct: '28%', minutes: '14:28', hrAvg: 158 },
      { zone: 'Z4 Schwelle', variant: 'error' as const, pct: '18%', minutes: '9:18', hrAvg: 172 },
      { zone: 'Z5 Maximum', variant: 'error' as const, pct: '7%', minutes: '3:37', hrAvg: 184 },
    ];

    return (
      <Table density="normal" aria-label="Herzfrequenz-Zonen">
        <TableHeader>
          <TableRow hoverable={false}>
            <TableHead scope="col">Zone</TableHead>
            <TableHead scope="col" align="right">% Zeit</TableHead>
            <TableHead scope="col" align="right">Minuten</TableHead>
            <TableHead scope="col" align="right">Ø HF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map((z) => (
            <TableRow key={z.zone}>
              <TableCell>
                <Badge variant={z.variant} size="sm">{z.zone}</Badge>
              </TableCell>
              <TableCell numeric>{z.pct}</TableCell>
              <TableCell numeric>{z.minutes}</TableCell>
              <TableCell numeric>{z.hrAvg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const Interactive: Story = {
  name: 'Interactive (Hoverable)',
  render: () => (
    <Table density="normal" striped>
      <TableHeader>
        <TableRow hoverable={false}>
          <TableHead>Übung</TableHead>
          <TableHead align="right">1RM</TableHead>
          <TableHead align="right">Trend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { name: 'Bankdrücken', rm: '95 kg', trend: '+2.5 kg', positive: true },
          { name: 'Kniebeuge', rm: '120 kg', trend: '+5.0 kg', positive: true },
          { name: 'Kreuzheben', rm: '140 kg', trend: '±0 kg', positive: false },
          { name: 'OHP', rm: '55 kg', trend: '-2.5 kg', positive: false },
          { name: 'Klimmzüge', rm: 'BW+20 kg', trend: '+5.0 kg', positive: true },
        ].map((ex) => (
          <TableRow key={ex.name}>
            <TableCell>{ex.name}</TableCell>
            <TableCell numeric>{ex.rm}</TableCell>
            <TableCell numeric>
              <Badge variant={ex.positive ? 'success' : 'neutral'} size="sm">{ex.trend}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
