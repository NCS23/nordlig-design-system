import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardBody,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Heading,
  Text,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Timeline,
  TimelineItem,
  Separator,
} from '@nordlig/components';
import { MapPin, Calendar, Mail, Edit2, Trophy, Zap, TrendingUp } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: Nutzerprofil
   ═══════════════════════════════════════════════════════════════════════════ */

function ProfilPage() {
  return (
    <div style={{ maxWidth: 780 }}>
      {/* ── Profil-Header ────────────────────────────────────────────── */}
      <Card elevation="raised" padding="spacious">
        <CardBody className="flex flex-col gap-12">
          {/* Identitaet */}
          <div className="flex items-start gap-8">
            <Avatar size="xl" style={{ width: 80, height: 80 }} className="shrink-0">
              <AvatarFallback size="xl" style={{ width: 80, height: 80, fontSize: 24 }}>NM</AvatarFallback>
            </Avatar>

            <div className="flex-1 flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <Heading level={2}>Nils Mustermann</Heading>
                  <Text variant="muted">@nils_runs</Text>
                </div>
                <Button variant="secondary" size="sm">
                  <Edit2 size={14} className="mr-2" /> Bearbeiten
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[var(--color-text-muted)]" />
                  <Text variant="small">Hamburg, DE</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[var(--color-text-muted)]" />
                  <Text variant="small">Dabei seit Jan 2024</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[var(--color-text-muted)]" />
                  <Text variant="small">nils@example.com</Text>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Badge variant="info" size="sm">Laeufer</Badge>
                <Badge variant="success" size="sm">Marathon-Finisher</Badge>
                <Badge variant="warning" size="sm">Streak: 14 Tage</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Statistiken */}
          <div className="grid grid-cols-4 gap-8 py-2">
            {[
              { label: 'Laeufe', value: '247' },
              { label: 'Distanz', value: '1.842 km' },
              { label: 'Hoehenmeter', value: '24.500 m' },
              { label: 'Bestzeit 10k', value: '48:12' },
            ].map((stat) => (
              <div key={stat.label} className="text-center flex flex-col gap-2">
                <Text variant="body" className="text-lg font-semibold">{stat.value}</Text>
                <Text variant="muted">{stat.label}</Text>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <Tabs defaultValue="aktivitaet" className="mt-16">
        <TabsList>
          <TabsTrigger value="aktivitaet">Aktivitaet</TabsTrigger>
          <TabsTrigger value="erfolge">Erfolge</TabsTrigger>
        </TabsList>

        <TabsContent value="aktivitaet" className="mt-8">
          <Card elevation="raised" padding="spacious">
            <CardBody className="flex flex-col gap-8">
              <Heading level={4}>Letzte Aktivitaeten</Heading>

              <Timeline>
                <TimelineItem
                  title="Langer Lauf — 18.3 km"
                  description="Pace: 5:28/km | Dauer: 1:40:12 | Alsterlauf-Runde"
                  timestamp="Heute, 07:30"
                  variant="success"
                  icon={<TrendingUp size={14} />}
                />
                <TimelineItem
                  title="Intervalltraining — 8.0 km"
                  description="6x 800m @ 4:15/km | Erholung: 2 min"
                  timestamp="Gestern, 18:00"
                  variant="warning"
                  icon={<Zap size={14} />}
                />
                <TimelineItem
                  title="Erholungslauf — 5.2 km"
                  description="Pace: 6:10/km | Lockerer Lauf im Park"
                  timestamp="20.02.2026"
                  variant="default"
                />
                <TimelineItem
                  title="Wettkampf — Halbmarathon"
                  description="Neue Bestzeit! 1:42:35 | Platz 128/2.450"
                  timestamp="16.02.2026"
                  variant="success"
                  icon={<Trophy size={14} />}
                />
              </Timeline>
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="erfolge" className="mt-8">
          <Card elevation="raised" padding="spacious">
            <CardBody className="flex flex-col gap-6">
              <Heading level={4}>Erfolge</Heading>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Trophy size={24} />, title: 'Marathon-Finisher', desc: 'Ersten Marathon abgeschlossen', achieved: true },
                  { icon: <Zap size={24} />, title: '100 Laeufe', desc: '100 Laeufe absolviert', achieved: true },
                  { icon: <TrendingUp size={24} />, title: 'Sub-50 10k', desc: '10 km unter 50 Minuten', achieved: true },
                  { icon: <Trophy size={24} />, title: 'Sub-3:30 Marathon', desc: 'Marathon unter 3:30h', achieved: false },
                ].map((badge) => (
                  <div
                    key={badge.title}
                    className={`flex items-center gap-5 p-5 rounded-[var(--radius-card)] border ${
                      badge.achieved
                        ? 'border-[var(--color-border-default)] bg-[var(--color-bg-surface)]'
                        : 'border-dashed border-[var(--color-border-default)] opacity-50'
                    }`}
                  >
                    <div className="text-[var(--color-text-muted)] shrink-0">{badge.icon}</div>
                    <div className="flex flex-col gap-1">
                      <Text variant="body" className="font-medium">{badge.title}</Text>
                      <Text variant="muted">{badge.desc}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const meta: Meta<typeof ProfilPage> = {
  title: 'Recipes/Profil',
  component: ProfilPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Zeigt wie Avatar, Tabs, Timeline, Badge, Card, Heading und Text ' +
          'eine Profilseite mit Statistiken und Aktivitaetsverlauf aufbauen.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProfilPage>;

export const Default: Story = {};
