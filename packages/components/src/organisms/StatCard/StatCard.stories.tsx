import type { Meta, StoryObj } from '@storybook/react';
import { Activity, Timer, Heart, Route, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Organisms/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    value: { control: 'text' },
    unit: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'StatCard zeigt eine einzelne Metrik mit optionalem Trend-Indikator, Icon und Varianten-Akzent an. Ideal fuer Dashboard-Ansichten mit Trainings- und Leistungsdaten.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    title: 'Pace',
    value: '5:41',
    unit: 'min/km',
  },
};

export const WithTrendUp: Story = {
  name: 'With Trend Up',
  args: {
    title: 'Pace',
    value: '5:41',
    unit: 'min/km',
    trend: {
      value: 5,
      direction: 'up',
      label: 'vs letzte Woche',
    },
  },
};

export const WithTrendDown: Story = {
  name: 'With Trend Down',
  args: {
    title: 'Distanz',
    value: '32.4',
    unit: 'km',
    trend: {
      value: -12,
      direction: 'down',
      label: 'vs letzte Woche',
    },
  },
};

export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    title: 'Herzfrequenz',
    value: 142,
    unit: 'bpm',
    icon: <Heart size={18} />,
    trend: {
      value: 3,
      direction: 'down',
      label: 'vs letzter Lauf',
    },
    description: 'Durchschnittliche Herzfrequenz',
  },
};

export const WithUnit: Story = {
  name: 'With Unit',
  args: {
    title: 'Gesamtdistanz',
    value: '127.8',
    unit: 'km',
    description: 'Dieser Monat',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '600px' }}>
      <StatCard
        title="Default"
        value="5:41"
        unit="min/km"
        variant="default"
        description='variant="default"'
      />
      <StatCard
        title="Ziel erreicht"
        value="42.2"
        unit="km"
        variant="success"
        trend={{ value: 8, direction: 'up' }}
        description='variant="success"'
      />
      <StatCard
        title="Ruhepuls hoch"
        value="72"
        unit="bpm"
        variant="warning"
        trend={{ value: 5, direction: 'up' }}
        description='variant="warning"'
      />
      <StatCard
        title="Uebertraining"
        value="6"
        unit="Tage"
        variant="error"
        trend={{ value: -15, direction: 'down' }}
        description='variant="error"'
      />
    </div>
  ),
};

export const TrainingDashboard: Story = {
  name: 'Training: Dashboard',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '700px' }}>
      <StatCard
        title="Pace"
        value="5:41"
        unit="min/km"
        icon={<Activity size={18} />}
        trend={{ value: 3, direction: 'up', label: 'Verbesserung' }}
        variant="success"
      />
      <StatCard
        title="Distanz"
        value="8.4"
        unit="km"
        icon={<Route size={18} />}
        trend={{ value: 12, direction: 'up', label: 'vs Durchschnitt' }}
      />
      <StatCard
        title="Herzfrequenz"
        value="148"
        unit="bpm"
        icon={<Heart size={18} />}
        trend={{ value: -2, direction: 'down', label: 'vs letzter Lauf' }}
        description="Zone 3 - Aerob"
      />
      <StatCard
        title="Dauer"
        value="47:32"
        unit="min"
        icon={<Timer size={18} />}
        trend={{ value: 0, direction: 'neutral', label: 'wie letzte Woche' }}
      />
    </div>
  ),
};

export const TrainingWeeklyComparison: Story = {
  name: 'Training: Wochenvergleich',
  render: () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-text-base)' }}>
          Wochenvergleich
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--color-text-muted)' }}>
          KW 7 vs KW 6 - 10. - 16. Feb 2026
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '700px' }}>
        <StatCard
          title="Wochenkilometer"
          value="38.6"
          unit="km"
          icon={<Route size={18} />}
          trend={{ value: 15, direction: 'up', label: 'vs KW 6: 33.5 km' }}
          variant="success"
        />
        <StatCard
          title="Trainingseinheiten"
          value={4}
          icon={<Activity size={18} />}
          trend={{ value: 0, direction: 'neutral', label: 'vs KW 6: 4' }}
        />
        <StatCard
          title="Avg. Pace"
          value="5:28"
          unit="min/km"
          icon={<TrendingUp size={18} />}
          trend={{ value: 4, direction: 'up', label: 'vs KW 6: 5:41' }}
          variant="success"
          description="Schnellster Lauf: 4:52 min/km"
        />
        <StatCard
          title="Avg. Herzfrequenz"
          value="152"
          unit="bpm"
          icon={<Heart size={18} />}
          trend={{ value: 3, direction: 'up', label: 'vs KW 6: 148 bpm' }}
          variant="warning"
          description="Etwas hoeher als gewoehnlich"
        />
      </div>
    </div>
  ),
};

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8' }}>
      <h3 style={{ fontFamily: 'sans-serif', fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
        StatCard - Verwendete Design Tokens
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-card-border)', textAlign: 'left' }}>
            <th style={{ padding: '8px 12px' }}>Token</th>
            <th style={{ padding: '8px 12px' }}>Verwendung</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['--radius-card', 'Border-Radius des Containers'],
            ['--color-card-border', 'Standard-Rahmenfarbe'],
            ['--color-card-bg', 'Hintergrundfarbe des Containers'],
            ['--color-text-base', 'Farbe des Hauptwerts'],
            ['--color-text-muted', 'Farbe von Titel, Einheit, Beschreibung, neutralem Trend'],
            ['--color-text-success', 'Trend-Farbe bei direction="up"'],
            ['--color-text-error', 'Trend-Farbe bei direction="down"'],
            ['--color-border-success', 'Linker Akzent-Rand bei variant="success"'],
            ['--color-border-warning', 'Linker Akzent-Rand bei variant="warning"'],
            ['--color-border-error', 'Linker Akzent-Rand bei variant="error"'],
          ].map(([token, usage]) => (
            <tr key={token} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
              <td style={{ padding: '8px 12px', color: 'var(--color-text-success)' }}>{token}</td>
              <td style={{ padding: '8px 12px' }}>{usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
