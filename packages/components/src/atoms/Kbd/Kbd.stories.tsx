import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';
import { Heading } from '../Heading';

const meta: Meta<typeof Kbd> = {
  title: 'Atoms/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Kbd-Komponente zur Darstellung von Tastaturkuerzeln und einzelnen Tasten. Unterstuetzt drei Groessen und nutzt eine monospace Schriftart.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: {
    children: 'Esc',
    size: 'md',
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-60">sm:</span>
        <Kbd size="sm">Esc</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-60">md:</span>
        <Kbd size="md">Esc</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-60">lg:</span>
        <Kbd size="lg">Esc</Kbd>
      </div>
    </div>
  ),
};

export const KeyCombination: Story = {
  name: 'Key Combination',
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>&#8984;</Kbd>
      <span className="text-xs opacity-40">+</span>
      <Kbd>K</Kbd>
    </div>
  ),
};

export const Shortcuts: Story = {
  name: 'Shortcuts',
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center justify-between w-64">
        <span>Suche oeffnen</span>
        <div className="flex items-center gap-1">
          <Kbd size="sm">&#8984;</Kbd>
          <span className="text-xs opacity-40">+</span>
          <Kbd size="sm">K</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between w-64">
        <span>Speichern</span>
        <div className="flex items-center gap-1">
          <Kbd size="sm">&#8984;</Kbd>
          <span className="text-xs opacity-40">+</span>
          <Kbd size="sm">S</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between w-64">
        <span>Rueckgaengig</span>
        <div className="flex items-center gap-1">
          <Kbd size="sm">&#8984;</Kbd>
          <span className="text-xs opacity-40">+</span>
          <Kbd size="sm">Z</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between w-64">
        <span>Schliessen</span>
        <div className="flex items-center gap-1">
          <Kbd size="sm">Esc</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between w-64">
        <span>Neues Fenster</span>
        <div className="flex items-center gap-1">
          <Kbd size="sm">&#8984;</Kbd>
          <span className="text-xs opacity-40">+</span>
          <Kbd size="sm">&#8679;</Kbd>
          <span className="text-xs opacity-40">+</span>
          <Kbd size="sm">N</Kbd>
        </div>
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
            <td className="py-2 pr-4 font-mono text-xs">--color-kbd-bg</td>
            <td className="py-2 pr-4">Hintergrundfarbe der Taste</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-kbd-text</td>
            <td className="py-2 pr-4">Textfarbe der Taste</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-kbd-border</td>
            <td className="py-2 pr-4">Rahmenfarbe der Taste</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-kbd</td>
            <td className="py-2 pr-4">Eckenradius der Taste</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--shadow-kbd</td>
            <td className="py-2 pr-4">Schatteneffekt der Taste (3D-Effekt)</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
