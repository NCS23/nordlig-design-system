import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardBody,
  Heading,
  Text,
  Blockquote,
  BlockquoteCitation,
  Code,
  CodeBlock,
  Breadcrumbs,
  BreadcrumbItem,
  Badge,
  Button,
  Separator,
  Image,
  RichTextEditor,
} from '@nordlig/components';
import { Clock, User, Edit2, Eye } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: Blog-Artikel
   ═══════════════════════════════════════════════════════════════════════════ */

function ArtikelAnsicht() {
  const [editMode, setEditMode] = React.useState(false);
  const [content, setContent] = React.useState(
    '<h2>Warum Intervalltraining funktioniert</h2>' +
    '<p>Intervalltraining ist eine der effektivsten Methoden, um die <strong>Laufleistung</strong> zu steigern. ' +
    'Durch den Wechsel zwischen hoher und niedriger Intensitaet wird das Herz-Kreislauf-System gezielt belastet.</p>' +
    '<h3>Die Wissenschaft dahinter</h3>' +
    '<p>Studien zeigen, dass bereits <em>2 Intervall-Sessions pro Woche</em> die VO2max um bis zu 8% steigern koennen.</p>',
  );

  return (
    <div style={{ maxWidth: 780 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-8">
        <BreadcrumbItem href="#">Blog</BreadcrumbItem>
        <BreadcrumbItem href="#">Training</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Intervalltraining Guide</BreadcrumbItem>
      </Breadcrumbs>

      <Card elevation="raised" padding="spacious">
        <CardBody className="flex flex-col gap-10">
          {/* ── Artikel-Header ───────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Badge variant="info" size="sm">Training</Badge>
              <Badge variant="success" size="sm">Anfaenger</Badge>
            </div>

            <Heading level={1}>Der komplette Guide zu Intervalltraining</Heading>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <User size={14} className="text-[var(--color-text-muted)]" />
                <Text variant="muted">Nils Mustermann</Text>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[var(--color-text-muted)]" />
                <Text variant="muted">23. Feb 2026 &middot; 8 Min Lesezeit</Text>
              </div>
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? (
                    <><Eye size={14} className="mr-2" /> Vorschau</>
                  ) : (
                    <><Edit2 size={14} className="mr-2" /> Bearbeiten</>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* ── Inhalt ───────────────────────────────────────────────── */}
          {editMode ? (
            <RichTextEditor
              value={content}
              onChange={setContent}
              minHeight="400px"
              placeholder="Artikel schreiben..."
            />
          ) : (
            <article className="flex flex-col gap-8" style={{ maxWidth: 640 }}>
              <Image
                src="https://images.unsplash.com/photo-1461896836934-bd45ba18d907?w=800&h=400&fit=crop"
                alt="Laeufer beim Intervalltraining auf einer Tartanbahn"
                aspectRatio={2}
                rounded="lg"
                className="w-full"
              />

              <section className="flex flex-col gap-4">
                <Heading level={2}>Warum Intervalltraining funktioniert</Heading>
                <Text>
                  Intervalltraining ist eine der effektivsten Methoden, um die Laufleistung
                  zu steigern. Durch den Wechsel zwischen hoher und niedriger Intensitaet
                  wird das Herz-Kreislauf-System gezielt belastet.
                </Text>
              </section>

              <Blockquote>
                Wer schneller werden will, muss schneller trainieren — aber nicht immer.
                Die Kunst liegt in der Dosierung.
                <BlockquoteCitation author="Jack Daniels" source="Daniels' Running Formula" />
              </Blockquote>

              <section className="flex flex-col gap-4">
                <Heading level={3}>Die Wissenschaft dahinter</Heading>
                <Text>
                  Studien zeigen, dass bereits 2 Intervall-Sessions pro Woche die VO2max um
                  bis zu 8% steigern koennen. Der Schluessel liegt in der sogenannten{' '}
                  <Code>Superkompensation</Code> — der Koerper passt sich an die Belastung an
                  und wird leistungsfaehiger.
                </Text>
              </section>

              <section className="flex flex-col gap-4">
                <Heading level={3}>Beispiel-Workout</Heading>
                <Text>Ein klassisches 800m-Intervall fuer Fortgeschrittene:</Text>
                <CodeBlock copyable>
{`Aufwaermen:  15 min lockerer Lauf
Hauptteil:   6x 800m @ Tempo 4:00-4:15/km
Pause:       90 Sek Trabpause zwischen Intervallen
Auslaufen:   10 min lockerer Lauf

Gesamtdistanz: ca. 10 km
Geschaetzte Dauer: 55-60 min`}
                </CodeBlock>
              </section>

              <section className="flex flex-col gap-4">
                <Heading level={3}>Wichtige Hinweise</Heading>
                <Text>
                  Beginne mit kuerzeren Intervallen (200-400m) und steigere die Distanz
                  ueber Wochen. Hoere auf deinen Koerper — Intervalltraining ist intensiv
                  und erfordert ausreichend Erholung.
                </Text>
              </section>
            </article>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

const meta: Meta<typeof ArtikelAnsicht> = {
  title: 'Recipes/Artikel',
  component: ArtikelAnsicht,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Zeigt wie RichTextEditor, Heading, Text, Blockquote, Code, Image und Breadcrumbs ' +
          'einen Blog-Artikel mit Lese- und Bearbeitungsmodus aufbauen.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ArtikelAnsicht>;

export const Default: Story = {};
