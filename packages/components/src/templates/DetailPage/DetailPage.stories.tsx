import type { Meta, StoryObj } from '@storybook/react';
import { DetailPage } from './DetailPage';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Card, CardBody } from '../../atoms/Card';

const meta: Meta<typeof DetailPage> = {
  title: 'Templates/DetailPage',
  component: DetailPage,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DetailPage>;

/* ─── Default ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <DetailPage>
      <DetailPage.Header>
        <Heading level={2}>
          Max Mustermann <Badge variant="success" size="sm">Aktiv</Badge>
        </Heading>
        <Button variant="secondary">Bearbeiten</Button>
      </DetailPage.Header>
      <DetailPage.Body>
        <DetailPage.Content>
          <Card>
            <CardBody>
              <Heading level={3}>Persoenliche Daten</Heading>
              <Text size="sm">Name: Max Mustermann</Text>
              <Text size="sm">E-Mail: max@example.com</Text>
              <Text size="sm">Abteilung: Entwicklung</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Heading level={3}>Aktivitaet</Heading>
              <Text size="sm">Letzter Login: 21.02.2026</Text>
              <Text size="sm">Projekte: 12</Text>
              <Text size="sm">Aufgaben: 34 offen</Text>
            </CardBody>
          </Card>
        </DetailPage.Content>
        <DetailPage.Sidebar>
          <Card>
            <CardBody>
              <Heading level={4}>Metadaten</Heading>
              <Text size="sm" className="text-[var(--color-text-muted)]">
                Erstellt: 15.01.2024
              </Text>
              <Text size="sm" className="text-[var(--color-text-muted)]">
                Aktualisiert: 20.02.2026
              </Text>
              <Text size="sm" className="text-[var(--color-text-muted)]">
                Rolle: Administrator
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Heading level={4}>Verwandte Eintraege</Heading>
              <Text size="sm">Team: Frontend</Text>
              <Text size="sm">Standort: Hamburg</Text>
            </CardBody>
          </Card>
        </DetailPage.Sidebar>
      </DetailPage.Body>
    </DetailPage>
  ),
};

/* ─── Ohne Sidebar ───────────────────────────────────────────────────────── */

export const OhneSidebar: Story = {
  name: 'Ohne Sidebar',
  render: () => (
    <DetailPage>
      <DetailPage.Header>
        <Heading level={2}>Projektdetails</Heading>
      </DetailPage.Header>
      <DetailPage.Body>
        <DetailPage.Content>
          <Card>
            <CardBody>
              <Heading level={3}>Beschreibung</Heading>
              <Text size="sm">
                Ein umfassendes Projekt zur Modernisierung der internen
                Verwaltungssoftware mit Fokus auf Benutzerfreundlichkeit und
                Performance.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Heading level={3}>Meilensteine</Heading>
              <Text size="sm">Phase 1: Analyse (abgeschlossen)</Text>
              <Text size="sm">Phase 2: Design (in Arbeit)</Text>
              <Text size="sm">Phase 3: Implementierung (geplant)</Text>
            </CardBody>
          </Card>
        </DetailPage.Content>
      </DetailPage.Body>
    </DetailPage>
  ),
};

/* ─── Mit Breadcrumbs ────────────────────────────────────────────────────── */

export const MitBreadcrumbs: Story = {
  name: 'Mit Breadcrumbs',
  render: () => (
    <DetailPage>
      <DetailPage.Header>
        <Text size="sm" className="text-[var(--color-text-muted)]">
          Produkte / Kategorie / Laufschuhe
        </Text>
        <Heading level={2}>
          Nordic Trail Pro <Badge variant="info" size="sm">Neu</Badge>
        </Heading>
        <Button variant="primary">In den Warenkorb</Button>
      </DetailPage.Header>
      <DetailPage.Body>
        <DetailPage.Content>
          <Card>
            <CardBody>
              <Heading level={3}>Produktbeschreibung</Heading>
              <Text size="sm">
                Leichter Trail-Laufschuh fuer anspruchsvolles Gelaende. Optimale
                Daempfung und Grip fuer lange Distanzen im Gebirge.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Heading level={3}>Spezifikationen</Heading>
              <Text size="sm">Gewicht: 280g</Text>
              <Text size="sm">Sprengung: 6mm</Text>
              <Text size="sm">Sohle: Vibram Megagrip</Text>
            </CardBody>
          </Card>
        </DetailPage.Content>
        <DetailPage.Sidebar>
          <Card>
            <CardBody>
              <Heading level={4}>Details</Heading>
              <Text size="sm">Preis: 149,99 EUR</Text>
              <Text size="sm">Verfuegbarkeit: Auf Lager</Text>
              <Text size="sm">Artikelnummer: NTP-2026-001</Text>
            </CardBody>
          </Card>
        </DetailPage.Sidebar>
      </DetailPage.Body>
    </DetailPage>
  ),
};

/* ─── Responsive ─────────────────────────────────────────────────────────── */

export const Responsive: Story = {
  name: 'Responsive',
  render: () => (
    <DetailPage>
      <DetailPage.Header>
        <Heading level={2}>Responsive Layout</Heading>
        <Text size="sm" className="text-[var(--color-text-muted)]">
          Die Sidebar wird unterhalb von lg (1024px) unter den Content verschoben.
          Aendere die Fensterbreite um das Verhalten zu testen.
        </Text>
      </DetailPage.Header>
      <DetailPage.Body>
        <DetailPage.Content>
          <Card>
            <CardBody>
              <Heading level={3}>Hauptinhalt</Heading>
              <Text size="sm">
                Dieser Bereich nimmt auf Desktop die volle verbleibende Breite
                neben der Sidebar ein. Auf mobilen Geraeten wird er auf volle
                Breite gestreckt.
              </Text>
            </CardBody>
          </Card>
        </DetailPage.Content>
        <DetailPage.Sidebar>
          <Card>
            <CardBody>
              <Heading level={4}>Sidebar</Heading>
              <Text size="sm">
                Dieser Bereich hat eine feste Breite von 280px auf Desktop und
                wird auf mobilen Geraeten auf volle Breite gestreckt.
              </Text>
            </CardBody>
          </Card>
        </DetailPage.Sidebar>
      </DetailPage.Body>
    </DetailPage>
  ),
};
