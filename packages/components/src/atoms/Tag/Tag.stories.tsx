import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tag/Chip-Komponente fuer kategorisierte Informationen oder Status. Unterstuetzt Varianten, Groessen, Entfernen und Klick-Interaktion.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Standard Tag',
  },
};

/**
 * Alle semantischen Varianten
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default">Default</Tag>
      <Tag variant="success">Erfolg</Tag>
      <Tag variant="warning">Warnung</Tag>
      <Tag variant="error">Fehler</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
};

/**
 * Groessenvergleich
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag size="sm">Klein</Tag>
      <Tag size="md">Mittel</Tag>
    </div>
  ),
};

/**
 * Tags mit X-Button zum Entfernen
 */
export const Removable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag onRemove={() => alert('Entfernt!')}>Entfernbar</Tag>
      <Tag variant="success" onRemove={() => alert('Entfernt!')}>Erfolg</Tag>
      <Tag variant="error" onRemove={() => alert('Entfernt!')}>Fehler</Tag>
      <Tag variant="info" size="sm" onRemove={() => alert('Entfernt!')}>Info klein</Tag>
    </div>
  ),
};

/**
 * Klickbare Tags mit Hover-Effekt und Keyboard-Support
 */
export const Clickable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag onClick={() => alert('Geklickt!')}>Klickbar</Tag>
      <Tag variant="info" onClick={() => alert('Info!')}>Info klickbar</Tag>
      <Tag variant="success" onClick={() => alert('OK!')} onRemove={() => alert('Entfernt!')}>
        Klickbar + Entfernbar
      </Tag>
    </div>
  ),
};

/**
 * Langer Text wird automatisch gekuerzt
 */
export const LongText: Story = {
  render: () => (
    <div className="w-40 flex flex-col gap-2">
      <Tag>Sehr langer Text der abgeschnitten wird</Tag>
      <Tag size="sm" onRemove={() => {}}>Langer entfernbarer Text</Tag>
    </div>
  ),
};

/**
 * Praxisbeispiel: Status-Tags
 */
export const StatusExample: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="success" size="sm">Aktiv</Tag>
      <Tag variant="warning" size="sm">Wartend</Tag>
      <Tag variant="error" size="sm">Inaktiv</Tag>
      <Tag variant="info" size="sm">Entwurf</Tag>
      <Tag size="sm">Archiviert</Tag>
    </div>
  ),
};

/**
 * Alle Varianten in beiden Groessen
 */
export const AllCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium w-10">sm:</span>
        <Tag size="sm" variant="default">Default</Tag>
        <Tag size="sm" variant="success">Success</Tag>
        <Tag size="sm" variant="warning">Warning</Tag>
        <Tag size="sm" variant="error">Error</Tag>
        <Tag size="sm" variant="info">Info</Tag>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium w-10">md:</span>
        <Tag size="md" variant="default">Default</Tag>
        <Tag size="md" variant="success">Success</Tag>
        <Tag size="md" variant="warning">Warning</Tag>
        <Tag size="md" variant="error">Error</Tag>
        <Tag size="md" variant="info">Info</Tag>
      </div>
    </div>
  ),
};
