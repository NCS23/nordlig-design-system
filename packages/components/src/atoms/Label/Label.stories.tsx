import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input';
import { Heading } from '../Heading';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    htmlFor: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Label-Komponente fuer Formularfelder. Unterstuetzt Pflichtfeld-Markierung (roter Stern) und deaktivierten Zustand.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Benutzername',
  },
};

export const Required: Story = {
  args: {
    children: 'E-Mail-Adresse',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Deaktiviertes Feld',
    disabled: true,
  },
};

export const WithHtmlFor: Story = {
  name: 'With htmlFor',
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="example-input">E-Mail-Adresse</Label>
      <Input
        id="example-input"
        type="email"
        placeholder="name@example.de"
      />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label>Standard Label</Label>
        <span className="text-xs opacity-60">Ohne besondere Eigenschaften</span>
      </div>
      <div className="flex flex-col gap-1">
        <Label required>Pflichtfeld Label</Label>
        <span className="text-xs opacity-60">Mit rotem Stern (*)</span>
      </div>
      <div className="flex flex-col gap-1">
        <Label disabled>Deaktiviertes Label</Label>
        <span className="text-xs opacity-60">Reduzierte Deckkraft</span>
      </div>
      <div className="flex flex-col gap-1">
        <Label required disabled>Pflichtfeld + Deaktiviert</Label>
        <span className="text-xs opacity-60">Beide Zustaende kombiniert</span>
      </div>
    </div>
  ),
};

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={3}>Verwendete Design Tokens</Heading>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-text-base</td>
            <td className="py-2 pr-4">Textfarbe des Labels</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-text-error</td>
            <td className="py-2 pr-4">Farbe des Pflichtfeld-Sterns (*)</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
