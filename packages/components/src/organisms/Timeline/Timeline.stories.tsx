import type { Meta, StoryObj } from '@storybook/react';
import {
  Activity,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Dumbbell,
  Heart,
  Timer,
  Footprints,
} from 'lucide-react';
import { Timeline, TimelineItem } from './Timeline';
import { Icon } from '../../atoms/Icon';

const meta: Meta<typeof Timeline> = {
  title: 'Organisms/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Timeline-Komponente zur chronologischen Darstellung von Ereignissen. Unterstuetzt verschiedene Varianten (default, success, warning, error), Icons, Zeitstempel und benutzerdefinierte Inhalte.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline>
        <TimelineItem
          title="Aufgabe erstellt"
          description="Neue Aufgabe wurde im System angelegt."
          timestamp="14. Feb 2026, 09:00"
        />
        <TimelineItem
          title="In Bearbeitung"
          description="Aufgabe wurde einem Bearbeiter zugewiesen."
          timestamp="14. Feb 2026, 10:30"
        />
        <TimelineItem
          title="Review angefordert"
          description="Code-Review wurde gestartet."
          timestamp="14. Feb 2026, 14:15"
        />
        <TimelineItem
          title="Abgeschlossen"
          description="Aufgabe erfolgreich abgeschlossen."
          timestamp="14. Feb 2026, 16:00"
        />
      </Timeline>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline>
        <TimelineItem
          title="Aktivitaet gestartet"
          description="GPS-Signal gefunden, Aufzeichnung laeuft."
          timestamp="08:00"
          icon={<Icon icon={Activity} size="sm" />}
          variant="success"
        />
        <TimelineItem
          title="Termin geplant"
          description="Naechstes Training am Donnerstag."
          timestamp="10:30"
          icon={<Icon icon={Calendar} size="sm" />}
        />
        <TimelineItem
          title="Neuer Rekord"
          description="Persoenliche Bestleistung auf 5K erreicht!"
          timestamp="12:45"
          icon={<Icon icon={TrendingUp} size="sm" />}
          variant="success"
        />
      </Timeline>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline>
        <TimelineItem
          title="Standard-Ereignis"
          description="Ohne besondere Variante dargestellt."
          timestamp="09:00"
          variant="default"
        />
        <TimelineItem
          title="Erfolg"
          description="Training erfolgreich abgeschlossen."
          timestamp="10:00"
          variant="success"
          icon={<Icon icon={CheckCircle} size="sm" />}
        />
        <TimelineItem
          title="Warnung"
          description="Herzfrequenz ueber dem empfohlenen Bereich."
          timestamp="11:00"
          variant="warning"
          icon={<Icon icon={AlertTriangle} size="sm" />}
        />
        <TimelineItem
          title="Fehler"
          description="GPS-Verbindung waehrend des Trainings verloren."
          timestamp="12:00"
          variant="error"
          icon={<Icon icon={XCircle} size="sm" />}
        />
      </Timeline>
    </div>
  ),
};

export const TrainingActivityFeed: Story = {
  name: 'Training Analyzer: Activity Feed',
  render: () => (
    <div className="max-w-lg">
      <h3 className="text-lg font-semibold text-[var(--color-text-base)] mb-4">
        Trainings-Aktivitaeten
      </h3>
      <Timeline>
        <TimelineItem
          title="Morgenlauf abgeschlossen"
          description="10.2 km in 51:30 min | Oe Pace: 5:03 /km | Oe HR: 152 bpm"
          timestamp="Heute, 07:15"
          variant="success"
          icon={<Icon icon={Footprints} size="sm" />}
        >
          <div className="mt-1 flex gap-3 text-xs">
            <span className="rounded bg-[var(--color-bg-surface)] px-2 py-0.5">
              Zone 2: 62%
            </span>
            <span className="rounded bg-[var(--color-bg-surface)] px-2 py-0.5">
              Zone 3: 31%
            </span>
            <span className="rounded bg-[var(--color-bg-surface)] px-2 py-0.5">
              Zone 4: 7%
            </span>
          </div>
        </TimelineItem>
        <TimelineItem
          title="Krafttraining"
          description="Oberkörper + Core | 45 min | RPE 7/10"
          timestamp="Gestern, 17:30"
          variant="success"
          icon={<Icon icon={Dumbbell} size="sm" />}
        />
        <TimelineItem
          title="Hohe Ruheherzfrequenz"
          description="Ruhe-HR 68 bpm (Durchschnitt: 55 bpm). Moeglicherweise nicht ausreichend erholt."
          timestamp="Gestern, 06:00"
          variant="warning"
          icon={<Icon icon={Heart} size="sm" />}
        />
        <TimelineItem
          title="Intervalltraining"
          description="6x 1000m @ 4:15 /km | Pause: 90s | Gesamt: 52 min"
          timestamp="12. Feb, 07:00"
          variant="success"
          icon={<Icon icon={Timer} size="sm" />}
        >
          <div className="mt-1 flex gap-3 text-xs">
            <span className="rounded bg-[var(--color-bg-surface)] px-2 py-0.5">
              Splits: 4:12 | 4:15 | 4:14 | 4:18 | 4:11 | 4:09
            </span>
          </div>
        </TimelineItem>
        <TimelineItem
          title="GPS-Fehler"
          description="GPS-Signal waehrend Km 4-6 verloren. Distanz manuell korrigiert."
          timestamp="11. Feb, 07:30"
          variant="error"
          icon={<Icon icon={XCircle} size="sm" />}
        />
      </Timeline>
    </div>
  ),
};

export const TrainingWeeklyLog: Story = {
  name: 'Training Analyzer: Weekly Log',
  render: () => (
    <div className="max-w-lg">
      <h3 className="text-lg font-semibold text-[var(--color-text-base)] mb-1">
        Wochenprotokoll KW 7
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">
        10. - 16. Februar 2026 | Gesamt: 48.5 km | 4:12 Std
      </p>
      <Timeline>
        <TimelineItem
          title="Montag: Erholung"
          description="Leichter Lauf 6 km @ 5:45 /km | HR Zone 1-2"
          timestamp="Mo, 10. Feb"
          variant="success"
          icon={<Icon icon={Footprints} size="sm" />}
        />
        <TimelineItem
          title="Dienstag: Krafttraining"
          description="Beine + Core | 50 min | RPE 6/10"
          timestamp="Di, 11. Feb"
          variant="success"
          icon={<Icon icon={Dumbbell} size="sm" />}
        />
        <TimelineItem
          title="Mittwoch: Intervalle"
          description="8x 400m @ 3:50 /km | Pause: 60s | Gesamt: 45 min"
          timestamp="Mi, 12. Feb"
          variant="success"
          icon={<Icon icon={Timer} size="sm" />}
        />
        <TimelineItem
          title="Donnerstag: Ruhetag"
          description="Aktive Erholung: Yoga 30 min"
          timestamp="Do, 13. Feb"
          icon={<Icon icon={Heart} size="sm" />}
        />
        <TimelineItem
          title="Freitag: Tempodauerlauf"
          description="12 km @ 4:30 /km | HR Zone 3 | Kalorienverbrauch: 820 kcal"
          timestamp="Fr, 14. Feb"
          variant="success"
          icon={<Icon icon={Activity} size="sm" />}
        />
        <TimelineItem
          title="Samstag: Long Run"
          description="22 km @ 5:15 /km | HR Zone 2 | Ernaehrung: 2 Gels"
          timestamp="Sa, 15. Feb"
          variant="success"
          icon={<Icon icon={TrendingUp} size="sm" />}
        />
        <TimelineItem
          title="Sonntag: Ruhetag"
          description="Kompletter Ruhetag. HRV: 62ms (gut)."
          timestamp="So, 16. Feb"
          icon={<Icon icon={Heart} size="sm" />}
        />
      </Timeline>
    </div>
  ),
};

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Verwendete Design Tokens</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">Wert</th>
            <th className="text-left py-2 pr-4 font-medium">Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-bg-surface</td>
            <td className="py-2 pr-4 font-mono text-xs">#f1f5f9</td>
            <td className="py-2 pr-4">Hintergrund des Icon-Dots (default Variante)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-bg-success</td>
            <td className="py-2 pr-4 font-mono text-xs">#10b981</td>
            <td className="py-2 pr-4">Hintergrund des Icon-Dots (success Variante)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-bg-warning</td>
            <td className="py-2 pr-4 font-mono text-xs">#f59e0b</td>
            <td className="py-2 pr-4">Hintergrund des Icon-Dots (warning Variante)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-bg-error</td>
            <td className="py-2 pr-4 font-mono text-xs">#ef4444</td>
            <td className="py-2 pr-4">Hintergrund des Icon-Dots (error Variante)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-text-base</td>
            <td className="py-2 pr-4 font-mono text-xs">#0f172a</td>
            <td className="py-2 pr-4">Titel-Textfarbe</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-text-muted</td>
            <td className="py-2 pr-4 font-mono text-xs">#475569</td>
            <td className="py-2 pr-4">Zeitstempel, Beschreibung, Default-Dot-Farbe</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-border-default</td>
            <td className="py-2 pr-4 font-mono text-xs">#cbd5e1</td>
            <td className="py-2 pr-4">Vertikale Verbindungslinie</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
