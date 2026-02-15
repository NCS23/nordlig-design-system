import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Bold,
  Italic,
  Underline,
  Link,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  ToolbarSeparator,
} from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Molecules/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center p-20">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Toolbar aria-label="Formatierung">
      <ToolbarButton icon={<Bold />}>Fett</ToolbarButton>
      <ToolbarButton icon={<Italic />}>Kursiv</ToolbarButton>
      <ToolbarButton icon={<Underline />}>Unterstrichen</ToolbarButton>
    </Toolbar>
  ),
};

// ─── WithToggleGroup ────────────────────────────────────────────────────────

export const WithToggleGroup: Story = {
  name: 'Mit Toggle-Gruppe',
  render: () => (
    <Toolbar aria-label="Textformatierung">
      <ToolbarToggleGroup type="multiple" aria-label="Textformatierung">
        <ToolbarToggleItem value="bold" aria-label="Fett" icon={<Bold />} />
        <ToolbarToggleItem value="italic" aria-label="Kursiv" icon={<Italic />} />
        <ToolbarToggleItem value="underline" aria-label="Unterstrichen" icon={<Underline />} />
      </ToolbarToggleGroup>
    </Toolbar>
  ),
};

// ─── WithLinks ──────────────────────────────────────────────────────────────

export const WithLinks: Story = {
  name: 'Mit Link',
  render: () => (
    <Toolbar aria-label="Werkzeuge">
      <ToolbarButton icon={<Bold />}>Fett</ToolbarButton>
      <ToolbarButton icon={<Italic />}>Kursiv</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarLink href="https://example.com" target="_blank">
        Hilfe
      </ToolbarLink>
    </Toolbar>
  ),
};

// ─── WithSeparators ─────────────────────────────────────────────────────────

export const WithSeparators: Story = {
  name: 'Mit Trennlinien',
  render: () => (
    <Toolbar aria-label="Werkzeugleiste">
      <ToolbarButton icon={<Bold />}>Fett</ToolbarButton>
      <ToolbarButton icon={<Italic />}>Kursiv</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton icon={<AlignLeft />}>Links</ToolbarButton>
      <ToolbarButton icon={<AlignCenter />}>Zentriert</ToolbarButton>
      <ToolbarButton icon={<AlignRight />}>Rechts</ToolbarButton>
    </Toolbar>
  ),
};

// ─── Vertical ───────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Vertikal',
  render: () => (
    <Toolbar aria-label="Vertikale Werkzeugleiste" orientation="vertical" className="flex-col">
      <ToolbarButton icon={<Bold />} />
      <ToolbarButton icon={<Italic />} />
      <ToolbarButton icon={<Underline />} />
    </Toolbar>
  ),
};

// ─── TextEditor ─────────────────────────────────────────────────────────────

export const TextEditor: Story = {
  name: 'Texteditor',
  render: () => (
    <Toolbar aria-label="Texteditor-Werkzeugleiste">
      <ToolbarButton icon={<Undo />} aria-label="Rueckgaengig" />
      <ToolbarButton icon={<Redo />} aria-label="Wiederholen" />
      <ToolbarSeparator />
      <ToolbarToggleGroup type="multiple" aria-label="Textformatierung">
        <ToolbarToggleItem value="bold" aria-label="Fett" icon={<Bold />} />
        <ToolbarToggleItem value="italic" aria-label="Kursiv" icon={<Italic />} />
        <ToolbarToggleItem value="underline" aria-label="Unterstrichen" icon={<Underline />} />
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup type="single" aria-label="Textausrichtung">
        <ToolbarToggleItem value="left" aria-label="Linksbuendig" icon={<AlignLeft />} />
        <ToolbarToggleItem value="center" aria-label="Zentriert" icon={<AlignCenter />} />
        <ToolbarToggleItem value="right" aria-label="Rechtsbuendig" icon={<AlignRight />} />
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarLink href="https://example.com" target="_blank">
        <Link className="mr-1 h-4 w-4" />
        Link einfuegen
      </ToolbarLink>
    </Toolbar>
  ),
};
