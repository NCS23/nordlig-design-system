import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';
import { Heading } from '../Heading';
import { Text } from '../Text';

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    center: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Zentrierter Container mit max-width und token-basiertem Padding. Begrenzt den Inhaltsbereich auf eine lesbare Breite.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <div className="w-full bg-[var(--color-surface-sunken)]">
      <Container className="bg-[var(--color-surface-base)] border border-[var(--color-border-default)] py-8">
        <p className="text-sm">Dieser Inhalt ist auf max-w-screen-xl begrenzt und zentriert.</p>
      </Container>
    </div>
  ),
};

export const MaxWidthVariants: Story = {
  name: 'MaxWidth-Varianten',
  render: () => (
    <div className="w-full flex flex-col gap-4 bg-[var(--color-surface-sunken)] p-4">
      {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((size) => (
        <Container key={size} maxWidth={size} className="bg-[var(--color-surface-base)] border border-[var(--color-border-default)] py-3">
          <span className="text-xs text-[var(--color-text-muted)]">maxWidth=&quot;{size}&quot;</span>
        </Container>
      ))}
    </div>
  ),
};

export const PaddingVariants: Story = {
  name: 'Padding-Varianten',
  render: () => (
    <div className="w-full flex flex-col gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
        <Container key={p} maxWidth="md" padding={p} className="bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] py-3">
          <div className="bg-[var(--color-surface-sunken)] rounded-[var(--radius-sm)] p-2 text-xs">
            padding=&quot;{p}&quot;
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const NarrowContent: Story = {
  name: 'Schmaler Inhalt',
  render: () => (
    <Container maxWidth="sm" className="py-8">
      <Heading level={2} className="mb-2">Einstellungen</Heading>
      <Text variant="muted">
        Ein schmaler Container eignet sich gut fuer Formulare und Einstellungsseiten.
      </Text>
    </Container>
  ),
};
