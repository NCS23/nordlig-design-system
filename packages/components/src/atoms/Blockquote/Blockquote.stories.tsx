import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote, BlockquoteCitation } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
  title: 'Atoms/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Blockquote-Komponente fuer Zitate und hervorgehobene Textpassagen. Unterstuetzt optionale Quellenangabe mit Autor und Quelle.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div className="max-w-lg">
      <Blockquote>
        Die einzige Art, grossartige Arbeit zu leisten, ist zu lieben, was man
        tut.
      </Blockquote>
    </div>
  ),
};

// ─── With Citation ──────────────────────────────────────────────────────────

export const WithCitation: Story = {
  name: 'With Citation',
  render: () => (
    <div className="max-w-lg">
      <Blockquote>
        Wer immer tut, was er schon kann, bleibt immer das, was er schon ist.
        <BlockquoteCitation author="Henry Ford" source="Mein Leben und Werk" />
      </Blockquote>
    </div>
  ),
};

// ─── Long Quote ─────────────────────────────────────────────────────────────

export const LongQuote: Story = {
  name: 'Long Quote',
  render: () => (
    <div className="max-w-lg">
      <Blockquote>
        <p className="mb-2">
          Training ist nicht nur koerperliche Arbeit. Es ist die Disziplin, jeden
          Tag aufzustehen und das Beste aus sich herauszuholen, auch wenn die
          Motivation fehlt.
        </p>
        <p>
          Der wahre Fortschritt zeigt sich nicht in den grossen Momenten, sondern
          in den kleinen, taeglichen Verbesserungen, die sich ueber Wochen und
          Monate summieren.
        </p>
        <BlockquoteCitation author="Unbekannt" />
      </Blockquote>
    </div>
  ),
};

// ─── Nested ─────────────────────────────────────────────────────────────────

export const Nested: Story = {
  name: 'Nested',
  render: () => (
    <div className="max-w-lg space-y-4">
      <p className="text-sm">
        In seinem Buch beschreibt der Autor die Bedeutung von Ausdauer:
      </p>
      <Blockquote>
        Erfolg ist die Summe kleiner Anstrengungen, die Tag fuer Tag wiederholt
        werden.
        <BlockquoteCitation author="Robert Collier" source="The Secret of the Ages" />
      </Blockquote>
      <p className="text-sm">
        Dieses Prinzip gilt besonders im sportlichen Kontext.
      </p>
    </div>
  ),
};
