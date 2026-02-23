import type { Meta, StoryObj } from '@storybook/react';
import { Stack, VStack, HStack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Atoms/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    gap: {
      control: 'select',
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'boolean',
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'nav', 'ul', 'ol', 'main', 'aside', 'article'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Flex-Container mit token-basiertem Gap. Convenience-Exports: `VStack` (vertikal) und `HStack` (horizontal). Unterstuetzt polymorphes `as` fuer semantisches HTML.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] px-4 py-2 text-sm ${className || ''}`}>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <VStack gap="md" className="w-full max-w-sm">
      <Box>Element 1</Box>
      <Box>Element 2</Box>
      <Box>Element 3</Box>
    </VStack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <HStack gap="md">
      <Box>Links</Box>
      <Box>Mitte</Box>
      <Box>Rechts</Box>
    </HStack>
  ),
};

export const GapVariants: Story = {
  name: 'Gap-Varianten',
  render: () => (
    <VStack gap="xl">
      {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((g) => (
        <VStack key={g} gap="xs">
          <span className="text-xs text-[var(--color-text-muted)]">gap=&quot;{g}&quot;</span>
          <HStack gap={g}>
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
};

export const AlignItems: Story = {
  name: 'Align',
  render: () => (
    <VStack gap="lg">
      {(['start', 'center', 'end', 'stretch'] as const).map((a) => (
        <VStack key={a} gap="xs">
          <span className="text-xs text-[var(--color-text-muted)]">align=&quot;{a}&quot;</span>
          <HStack gap="sm" align={a} className="h-20 border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-sm)] p-2">
            <Box>Klein</Box>
            <Box className="py-4">Gross</Box>
            <Box>Klein</Box>
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
};

export const JustifyContent: Story = {
  name: 'Justify',
  render: () => (
    <VStack gap="lg" className="w-full max-w-lg">
      {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map((j) => (
        <VStack key={j} gap="xs">
          <span className="text-xs text-[var(--color-text-muted)]">justify=&quot;{j}&quot;</span>
          <HStack gap="sm" justify={j} className="border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-sm)] p-2">
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Wrapping: Story = {
  name: 'Wrap',
  render: () => (
    <HStack gap="sm" wrap={true} className="max-w-xs border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-sm)] p-2">
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i}>Tag {i + 1}</Box>
      ))}
    </HStack>
  ),
};

export const SemanticHTML: Story = {
  name: 'Semantisches HTML',
  render: () => (
    <Stack as="nav" direction="horizontal" gap="md" align="center">
      <a href="#" className="text-sm text-[var(--color-text-link)]">Dashboard</a>
      <a href="#" className="text-sm text-[var(--color-text-link)]">Training</a>
      <a href="#" className="text-sm text-[var(--color-text-link)]">Statistik</a>
    </Stack>
  ),
};
