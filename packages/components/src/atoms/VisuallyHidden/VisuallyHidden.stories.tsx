import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisuallyHidden } from './VisuallyHidden';
import { Button } from '../Button';
import { Link } from '../Link';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Atoms/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Versteckt Inhalte visuell, bleibt aber fuer Screen Reader zugaenglich. Essentiell fuer barrierefreie Komponenten.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

/**
 * Standard-Verwendung: Text ist unsichtbar, aber Screen Reader lesen ihn vor.
 * Inspiziere das DOM um den versteckten Text zu sehen.
 */
export const Default: Story = {
  render: () => (
    <div>
      <p>Sichtbarer Text</p>
      <VisuallyHidden>Nur fuer Screen Reader sichtbar</VisuallyHidden>
    </div>
  ),
};

/**
 * Typischer Anwendungsfall: Icon-Button mit zugaenglichem Label
 */
export const WithIconButton: Story = {
  render: () => (
    <Button variant="ghost" className="p-2">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
      <VisuallyHidden>Schliessen</VisuallyHidden>
    </Button>
  ),
};

/**
 * Skip-Link fuer Tastaturnavigation
 */
export const SkipLink: Story = {
  render: () => (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-bg-paper)] focus:border focus:border-[var(--color-border-focus)] focus:rounded-md"
    >
      Zum Hauptinhalt springen
    </Link>
  ),
};
