import type { Meta, StoryObj } from '@storybook/react-vite';
import { Highlight } from './Highlight';

/**
 * Text-Hervorhebungskomponente, die Suchbegriffe farblich markiert.
 * Unterstuetzt einzelne und mehrere Suchbegriffe, case-insensitive Matching.
 */
const meta: Meta<typeof Highlight> = {
  title: 'Atoms/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hebt Suchbegriffe innerhalb eines Textes farblich hervor. Unterstuetzt einzelne oder mehrere Queries, case-insensitive Suche und benutzerdefinierte Styles.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Highlight>;

/** Einfache Hervorhebung eines einzelnen Begriffs */
export const Default: Story = {
  args: {
    query: 'React',
    children: 'React ist eine JavaScript-Bibliothek fuer die Erstellung von Benutzeroberflaechen.',
  },
};

/** Mehrfachvorkommen desselben Begriffs werden alle hervorgehoben */
export const MultipleMatches: Story = {
  args: {
    query: 'ist',
    children: 'React ist toll und ist einfach zu lernen',
  },
};

/** Case-insensitive Matching — alle Schreibweisen werden gefunden */
export const CaseInsensitive: Story = {
  args: {
    query: 'react',
    children: 'React und react und REACT',
  },
};

/** Mehrere verschiedene Suchbegriffe gleichzeitig hervorheben */
export const MultipleQueries: Story = {
  args: {
    query: ['React', 'JavaScript'],
    children: 'React ist eine JavaScript-Bibliothek fuer die Erstellung von Benutzeroberflaechen.',
  },
};

/** Kein Treffer — der Text wird ohne Hervorhebung angezeigt */
export const NoMatch: Story = {
  args: {
    query: 'Angular',
    children: 'React ist eine JavaScript-Bibliothek fuer die Erstellung von Benutzeroberflaechen.',
  },
};
