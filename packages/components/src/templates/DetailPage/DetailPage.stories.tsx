import type { Meta, StoryObj } from '@storybook/react';
import { DetailPage } from './DetailPage';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Card, CardHeader, CardBody } from '../../molecules/Card';
import { Avatar, AvatarImage, AvatarFallback } from '../../atoms/Avatar';
import { Separator } from '../../atoms/Separator';
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '../../molecules/Breadcrumbs';

const meta: Meta<typeof DetailPage> = {
  title: 'Templates/DetailPage',
  component: DetailPage,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DetailPage>;

/* ─── Helper: Key-Value Row (grid-based) ────────────────────────────── */

const KV = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-[9rem_1fr] gap-[var(--spacing-component-gap-md)]">
    <Text variant="muted" as="span">{label}</Text>
    <Text as="span">{children}</Text>
  </div>
);

/* ─── Default ─────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <DetailPage>
      <DetailPage.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[var(--spacing-component-gap-md)]">
            <Avatar size="lg">
              <AvatarImage src="" alt="Max Mustermann" />
              <AvatarFallback size="lg">MM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-[var(--spacing-component-gap-sm)]">
              <div className="flex items-center gap-[var(--spacing-component-gap-sm)]">
                <Heading level={2}>Max Mustermann</Heading>
                <Badge variant="success" size="xs">Aktiv</Badge>
              </div>
              <Text variant="muted">Frontend-Entwickler · Abteilung Technik</Text>
            </div>
          </div>
          <Button variant="secondary" size="sm">Bearbeiten</Button>
        </div>
      </DetailPage.Header>

      <Separator />

      <DetailPage.Body>
        <DetailPage.Content>
          <Card>
            <CardHeader>
              <Heading level={4}>Persoenliche Daten</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <div className="flex flex-col gap-[var(--spacing-component-gap-md)]">
                <KV label="Name">Max Mustermann</KV>
                <KV label="E-Mail">max.mustermann@example.com</KV>
                <KV label="Telefon">+49 40 1234 5678</KV>
                <KV label="Standort">Hamburg</KV>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading level={4}>Aktivitaet</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <div className="flex flex-col gap-[var(--spacing-component-gap-md)]">
                <KV label="Letzter Login">21.02.2026, 09:14</KV>
                <KV label="Projekte">12</KV>
                <KV label="Offene Aufgaben">34</KV>
                <KV label="Abgeschlossen">187</KV>
              </div>
            </CardBody>
          </Card>
        </DetailPage.Content>

        <DetailPage.Sidebar>
          <Card>
            <CardHeader>
              <Heading level={5}>Metadaten</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <div className="flex flex-col gap-[var(--spacing-component-gap-md)]">
                <div className="flex justify-between">
                  <Text variant="muted" as="span">Erstellt</Text>
                  <Text as="span">15.01.2024</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="muted" as="span">Aktualisiert</Text>
                  <Text as="span">20.02.2026</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="muted" as="span">ID</Text>
                  <Text as="span">USR-00421</Text>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Heading level={5}>Rollen</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <div className="flex flex-wrap gap-[var(--spacing-component-gap-sm)]">
                <Badge variant="info" size="xs">Administrator</Badge>
                <Badge variant="neutral" size="xs">Frontend</Badge>
                <Badge variant="neutral" size="xs">Code Review</Badge>
              </div>
            </CardBody>
          </Card>
        </DetailPage.Sidebar>
      </DetailPage.Body>
    </DetailPage>
  ),
};

/* ─── Mit Breadcrumbs ───────────────────────────────────────────────────── */

export const MitBreadcrumbs: Story = {
  name: 'Mit Breadcrumbs',
  render: () => (
    <DetailPage>
      <DetailPage.Header>
        <Breadcrumbs>
          <BreadcrumbItem href="#">Produkte</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="#">Laufschuhe</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Nordic Trail Pro</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[var(--spacing-component-gap-sm)]">
            <div className="flex items-center gap-[var(--spacing-component-gap-sm)]">
              <Heading level={2}>Nordic Trail Pro</Heading>
              <Badge variant="info" size="xs">Neu</Badge>
            </div>
            <Text variant="muted">
              Art.-Nr. NTP-2026-001 · Seit 01.02.2026 im Sortiment
            </Text>
          </div>
          <Button variant="primary" size="sm">In den Warenkorb</Button>
        </div>
      </DetailPage.Header>

      <Separator />

      <DetailPage.Body>
        <DetailPage.Content>
          <Card>
            <CardHeader>
              <Heading level={4}>Produktbeschreibung</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <Text>
                Leichter Trail-Laufschuh fuer anspruchsvolles Gelaende. Optimale
                Daempfung und Grip fuer lange Distanzen im Gebirge. Die Vibram
                Megagrip-Sohle bietet hervorragende Traktion auf nassem und
                trockenem Untergrund.
              </Text>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading level={4}>Spezifikationen</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <div className="flex flex-col gap-[var(--spacing-component-gap-md)]">
                <KV label="Gewicht">280 g</KV>
                <KV label="Sprengung">6 mm</KV>
                <KV label="Sohle">Vibram Megagrip</KV>
                <KV label="Obermaterial">Mesh / TPU</KV>
                <KV label="Farben">Schwarz, Blau, Gruen</KV>
              </div>
            </CardBody>
          </Card>
        </DetailPage.Content>

        <DetailPage.Sidebar>
          <Card>
            <CardHeader>
              <Heading level={5}>Preis &amp; Verfuegbarkeit</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <div className="flex flex-col gap-[var(--spacing-component-gap-md)]">
                <div className="flex justify-between">
                  <Text variant="muted" as="span">Preis</Text>
                  <Text as="span" className="[font-weight:var(--font-component-weight-semibold)]">
                    149,99 EUR
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="muted" as="span">Status</Text>
                  <Badge variant="success" size="xs">Auf Lager</Badge>
                </div>
                <div className="flex justify-between">
                  <Text variant="muted" as="span">Lieferzeit</Text>
                  <Text as="span">2–3 Werktage</Text>
                </div>
              </div>
            </CardBody>
          </Card>
        </DetailPage.Sidebar>
      </DetailPage.Body>
    </DetailPage>
  ),
};

/* ─── Ohne Sidebar ──────────────────────────────────────────────────────── */

export const OhneSidebar: Story = {
  name: 'Ohne Sidebar',
  render: () => (
    <DetailPage>
      <DetailPage.Header>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[var(--spacing-component-gap-sm)]">
            <Heading level={2}>Projekt: Design System v2</Heading>
            <Text variant="muted">
              Modernisierung der internen Verwaltungssoftware
            </Text>
          </div>
          <div className="flex gap-[var(--spacing-component-gap-sm)]">
            <Button variant="secondary" size="sm">Einstellungen</Button>
            <Button variant="primary" size="sm">Bearbeiten</Button>
          </div>
        </div>
      </DetailPage.Header>

      <Separator />

      <DetailPage.Body>
        <DetailPage.Content>
          <Card>
            <CardHeader>
              <Heading level={4}>Uebersicht</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <div className="flex flex-col gap-[var(--spacing-component-gap-md)]">
                <KV label="Status">In Arbeit</KV>
                <KV label="Erstellt">15.01.2024</KV>
                <KV label="Deadline">30.06.2026</KV>
                <KV label="Team">8 Mitglieder</KV>
                <KV label="Fortschritt">67 %</KV>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading level={4}>Meilensteine</Heading>
            </CardHeader>
            <Separator />
            <CardBody>
              <div className="flex flex-col gap-[var(--spacing-component-gap-md)]">
                <div className="flex items-center justify-between">
                  <Text as="span">Phase 1: Analyse</Text>
                  <Badge variant="success" size="xs">Abgeschlossen</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Text as="span">Phase 2: Design</Text>
                  <Badge variant="info" size="xs">In Arbeit</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Text as="span">Phase 3: Implementierung</Text>
                  <Badge variant="neutral" size="xs">Geplant</Badge>
                </div>
              </div>
            </CardBody>
          </Card>
        </DetailPage.Content>
      </DetailPage.Body>
    </DetailPage>
  ),
};

/* ─── Responsive ─────────────────────────────────────────────────────── */

export const Responsive: Story = {
  name: 'Responsive',
  parameters: {
    docs: {
      description: {
        story:
          'Die Sidebar wird unterhalb von `lg` (1024 px) unter den Content verschoben. Aendere die Fensterbreite um das Verhalten zu testen.',
      },
    },
  },
  render: () => (
    <DetailPage>
      <DetailPage.Header>
        <Heading level={2}>Responsive Layout</Heading>
        <Text variant="muted">
          Sidebar und Content wechseln bei 1024 px zwischen nebeneinander und
          uebereinander.
        </Text>
      </DetailPage.Header>

      <Separator />

      <DetailPage.Body>
        <DetailPage.Content>
          <Card>
            <CardHeader>
              <Heading level={4}>Hauptinhalt</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Dieser Bereich nimmt auf Desktop die volle verbleibende Breite
                neben der Sidebar ein. Auf mobilen Geraeten wird er auf volle
                Breite gestreckt.
              </Text>
            </CardBody>
          </Card>
        </DetailPage.Content>

        <DetailPage.Sidebar>
          <Card>
            <CardHeader>
              <Heading level={5}>Sidebar</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Feste Breite von 280 px auf Desktop, volle Breite auf Mobil.
              </Text>
            </CardBody>
          </Card>
        </DetailPage.Sidebar>
      </DetailPage.Body>
    </DetailPage>
  ),
};
