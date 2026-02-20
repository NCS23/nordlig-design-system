import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { Heading } from '../../atoms/Heading';

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const UnderlineDefault: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="underline">
        <TabsTrigger value="tab1">Übersicht</TabsTrigger>
        <TabsTrigger value="tab2">Statistik</TabsTrigger>
        <TabsTrigger value="tab3">Trends</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Übersicht-Inhalte werden hier angezeigt.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Statistik-Daten und Grafiken.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">Trend-Analysen über Zeit.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const PillsDefault: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="pills">
        <TabsTrigger value="tab1">Übersicht</TabsTrigger>
        <TabsTrigger value="tab2">Statistik</TabsTrigger>
        <TabsTrigger value="tab3">Trends</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Übersicht mit Pills-Style.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Statistik mit Pills-Style.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">Trends mit Pills-Style.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="underline">
        <TabsTrigger value="tab1">Aktiv</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Deaktiviert
        </TabsTrigger>
        <TabsTrigger value="tab3">Auch aktiv</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Erster Tab-Inhalt.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">Dritter Tab-Inhalt.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <Heading level={3} className="text-sm font-semibold mb-2">Underline Variant</Heading>
        <Tabs defaultValue="a">
          <TabsList variant="underline">
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
            <TabsTrigger value="c">Tab C</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Inhalt A</TabsContent>
          <TabsContent value="b">Inhalt B</TabsContent>
          <TabsContent value="c">Inhalt C</TabsContent>
        </Tabs>
      </div>
      <div>
        <Heading level={3} className="text-sm font-semibold mb-2">Pills Variant</Heading>
        <Tabs defaultValue="a">
          <TabsList variant="pills">
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
            <TabsTrigger value="c">Tab C</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Inhalt A</TabsContent>
          <TabsContent value="b">Inhalt B</TabsContent>
          <TabsContent value="c">Inhalt C</TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const TrainingAnalyzer: Story = {
  name: 'Training Analyzer: Dashboard',
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList variant="underline">
        <TabsTrigger value="overview">Übersicht</TabsTrigger>
        <TabsTrigger value="stats">Statistik</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="zones">HR-Zonen</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-medium">Wochenübersicht</p>
          <p>3 Trainings · 4:32h · 45.2 km · Ø 142 bpm</p>
        </div>
      </TabsContent>
      <TabsContent value="stats">
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-medium">Monatsstatistik</p>
          <p>12 Trainings · 18:45h · 187 km</p>
        </div>
      </TabsContent>
      <TabsContent value="trends">
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-medium">Leistungstrend</p>
          <p>VO₂max: 52.3 (+1.2 vs. Vormonat)</p>
        </div>
      </TabsContent>
      <TabsContent value="zones">
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-medium">Herzfrequenz-Zonen</p>
          <p>Zone 2: 65% · Zone 3: 25% · Zone 4: 10%</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
