import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Folder,
  File,
  FileText,
  Calendar,
  Clock,
  Dumbbell,
  Trophy,
  MapPin,
} from 'lucide-react';
import { Tree, type TreeNode } from './Tree';
import { Icon } from '../../atoms/Icon';
import { Heading } from '../../atoms/Heading';

const meta: Meta<typeof Tree> = {
  title: 'Organisms/Tree',
  component: Tree,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Baumstruktur-Komponente fuer hierarchische Daten. Unterstuetzt verschachtelte Knoten, Icons, Tastaturnavigation und Auswahl-Callbacks.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

// ─── Default ─────────────────────────────────────────────────────────────────

const defaultData: TreeNode[] = [
  {
    id: 'fruits',
    label: 'Obst',
    children: [
      { id: 'apple', label: 'Apfel' },
      { id: 'banana', label: 'Banane' },
      { id: 'cherry', label: 'Kirsche' },
    ],
  },
  {
    id: 'vegetables',
    label: 'Gemuese',
    children: [
      { id: 'carrot', label: 'Karotte' },
      { id: 'broccoli', label: 'Brokkoli' },
    ],
  },
  {
    id: 'grains',
    label: 'Getreide',
  },
];

export const Default: Story = {
  render: () => <Tree data={defaultData} className="w-64" />,
};

// ─── DeepNesting ─────────────────────────────────────────────────────────────

const deepData: TreeNode[] = [
  {
    id: 'company',
    label: 'Unternehmen',
    children: [
      {
        id: 'engineering',
        label: 'Engineering',
        children: [
          {
            id: 'frontend',
            label: 'Frontend',
            children: [
              { id: 'react', label: 'React Team' },
              { id: 'design-system', label: 'Design System' },
            ],
          },
          {
            id: 'backend',
            label: 'Backend',
            children: [
              { id: 'api', label: 'API Team' },
              { id: 'infra', label: 'Infrastructure' },
            ],
          },
        ],
      },
      {
        id: 'marketing',
        label: 'Marketing',
        children: [
          { id: 'content', label: 'Content' },
          { id: 'seo', label: 'SEO' },
        ],
      },
    ],
  },
];

export const DeepNesting: Story = {
  name: 'Deep Nesting',
  render: () => (
    <Tree
      data={deepData}
      defaultExpanded={['company', 'engineering']}
      className="w-72"
    />
  ),
};

// ─── WithIcons ───────────────────────────────────────────────────────────────

const iconData: TreeNode[] = [
  {
    id: 'docs',
    label: 'Documents',
    icon: <Icon icon={Folder} size="sm" />,
    children: [
      {
        id: 'readme',
        label: 'README.md',
        icon: <Icon icon={FileText} size="sm" />,
      },
      {
        id: 'license',
        label: 'LICENSE',
        icon: <Icon icon={File} size="sm" />,
      },
      {
        id: 'src',
        label: 'src',
        icon: <Icon icon={Folder} size="sm" />,
        children: [
          {
            id: 'index',
            label: 'index.ts',
            icon: <Icon icon={File} size="sm" />,
          },
          {
            id: 'utils',
            label: 'utils.ts',
            icon: <Icon icon={File} size="sm" />,
          },
        ],
      },
    ],
  },
  {
    id: 'config',
    label: 'Config',
    icon: <Icon icon={Folder} size="sm" />,
    children: [
      {
        id: 'tsconfig',
        label: 'tsconfig.json',
        icon: <Icon icon={FileText} size="sm" />,
      },
      {
        id: 'package',
        label: 'package.json',
        icon: <Icon icon={FileText} size="sm" />,
      },
    ],
  },
];

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <Tree data={iconData} defaultExpanded={['docs']} className="w-64" />
  ),
};

// ─── WithSelection ───────────────────────────────────────────────────────────

export const WithSelection: Story = {
  name: 'With Selection',
  render: () => {
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
    return (
      <div className="flex gap-6">
        <Tree
          data={iconData}
          defaultExpanded={['docs', 'src']}
          onSelect={setSelectedNode}
          className="w-64"
        />
        <div className="flex flex-col gap-1 p-3 bg-[var(--color-bg-surface)] rounded-[var(--radius-card)] text-sm min-w-48">
          <span className="font-medium text-[var(--color-text-muted)]">Ausgewaehlt:</span>
          <span className="text-[var(--color-text-base)]">
            {selectedNode ? selectedNode.label : 'Keiner'}
          </span>
          {selectedNode && (
            <span className="text-xs text-[var(--color-text-muted)]">
              ID: {selectedNode.id}
            </span>
          )}
        </div>
      </div>
    );
  },
};

// ─── TrainingPlanStructure ───────────────────────────────────────────────────

const trainingPlanData: TreeNode[] = [
  {
    id: 'season-2026',
    label: 'Saison 2026',
    icon: <Icon icon={Trophy} size="sm" />,
    children: [
      {
        id: 'jan',
        label: 'Januar',
        icon: <Icon icon={Calendar} size="sm" />,
        children: [
          {
            id: 'kw01',
            label: 'KW 01',
            icon: <Icon icon={Clock} size="sm" />,
            children: [
              { id: 'kw01-mo', label: 'Mo: Regeneration 5km', icon: <Icon icon={MapPin} size="sm" /> },
              { id: 'kw01-mi', label: 'Mi: Intervalle 8km', icon: <Icon icon={Dumbbell} size="sm" /> },
              { id: 'kw01-so', label: 'So: Longrun 16km', icon: <Icon icon={MapPin} size="sm" /> },
            ],
          },
          {
            id: 'kw02',
            label: 'KW 02',
            icon: <Icon icon={Clock} size="sm" />,
            children: [
              { id: 'kw02-di', label: 'Di: Tempo 10km', icon: <Icon icon={Dumbbell} size="sm" /> },
              { id: 'kw02-do', label: 'Do: Fahrtspiel 8km', icon: <Icon icon={MapPin} size="sm" /> },
              { id: 'kw02-so', label: 'So: Longrun 18km', icon: <Icon icon={MapPin} size="sm" /> },
            ],
          },
        ],
      },
      {
        id: 'feb',
        label: 'Februar',
        icon: <Icon icon={Calendar} size="sm" />,
        children: [
          {
            id: 'kw05',
            label: 'KW 05',
            icon: <Icon icon={Clock} size="sm" />,
            children: [
              { id: 'kw05-mo', label: 'Mo: Regeneration 6km', icon: <Icon icon={MapPin} size="sm" /> },
              { id: 'kw05-mi', label: 'Mi: Intervalle 10km', icon: <Icon icon={Dumbbell} size="sm" /> },
              { id: 'kw05-sa', label: 'Sa: Longrun 20km', icon: <Icon icon={MapPin} size="sm" /> },
            ],
          },
        ],
      },
    ],
  },
];

export const TrainingPlanStructure: Story = {
  name: 'Training: Trainingsplan-Struktur',
  render: () => (
    <Tree
      data={trainingPlanData}
      defaultExpanded={['season-2026', 'jan', 'kw01']}
      className="w-80"
    />
  ),
};

// ─── FileExplorer ────────────────────────────────────────────────────────────

const fileExplorerData: TreeNode[] = [
  {
    id: 'project',
    label: 'nordlig-design-system',
    icon: <Icon icon={Folder} size="sm" />,
    children: [
      {
        id: 'packages',
        label: 'packages',
        icon: <Icon icon={Folder} size="sm" />,
        children: [
          {
            id: 'components',
            label: 'components',
            icon: <Icon icon={Folder} size="sm" />,
            children: [
              {
                id: 'atoms',
                label: 'atoms',
                icon: <Icon icon={Folder} size="sm" />,
                children: [
                  { id: 'button', label: 'Button.tsx', icon: <Icon icon={File} size="sm" /> },
                  { id: 'input', label: 'Input.tsx', icon: <Icon icon={File} size="sm" /> },
                  { id: 'badge', label: 'Badge.tsx', icon: <Icon icon={File} size="sm" /> },
                ],
              },
              {
                id: 'organisms',
                label: 'organisms',
                icon: <Icon icon={Folder} size="sm" />,
                children: [
                  { id: 'card', label: 'Card.tsx', icon: <Icon icon={File} size="sm" /> },
                  { id: 'table', label: 'Table.tsx', icon: <Icon icon={File} size="sm" /> },
                  { id: 'modal', label: 'Modal.tsx', icon: <Icon icon={File} size="sm" /> },
                ],
              },
            ],
          },
          {
            id: 'tokens',
            label: 'tokens',
            icon: <Icon icon={Folder} size="sm" />,
            children: [
              { id: 'base', label: 'base.json', icon: <Icon icon={FileText} size="sm" /> },
              { id: 'semantic', label: 'semantic.json', icon: <Icon icon={FileText} size="sm" /> },
            ],
          },
        ],
      },
      { id: 'package-json', label: 'package.json', icon: <Icon icon={FileText} size="sm" /> },
      { id: 'readme-file', label: 'README.md', icon: <Icon icon={FileText} size="sm" /> },
      { id: 'tsconfig-file', label: 'tsconfig.json', icon: <Icon icon={FileText} size="sm" /> },
    ],
  },
];

export const FileExplorer: Story = {
  name: 'File Explorer',
  render: () => {
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
    return (
      <div className="flex gap-6">
        <div className="border border-[var(--color-border-muted)] rounded-[var(--radius-card)] p-2 bg-[var(--color-bg-paper)]">
          <Tree
            data={fileExplorerData}
            defaultExpanded={['project', 'packages', 'components']}
            onSelect={setSelectedNode}
            className="w-72"
          />
        </div>
        {selectedNode && (
          <div className="flex flex-col gap-1 p-3 bg-[var(--color-bg-surface)] rounded-[var(--radius-card)] text-sm h-fit">
            <span className="font-medium">{selectedNode.label}</span>
            <span className="text-xs text-[var(--color-text-muted)]">
              Pfad: /{selectedNode.id}
            </span>
          </div>
        )}
      </div>
    );
  },
};

// ─── DesignTokens ────────────────────────────────────────────────────────────

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={3} className="text-sm font-semibold">Verwendete Design Tokens</Heading>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-sm</td>
            <td className="py-2 pr-4">Eckenradius der einzelnen Baumeintraege</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-bg-muted</td>
            <td className="py-2 pr-4">Hintergrund bei Hover und Auswahl</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-text-base</td>
            <td className="py-2 pr-4">Textfarbe der Knotenbezeichnungen</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-text-muted</td>
            <td className="py-2 pr-4">Farbe der optionalen Knoten-Icons</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-border-focus</td>
            <td className="py-2 pr-4">Fokus-Ring fuer Tastaturnavigation</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
