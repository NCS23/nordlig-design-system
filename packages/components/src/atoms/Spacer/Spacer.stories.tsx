import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spacer } from './Spacer';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof Spacer> = {
  title: 'Atoms/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    grow: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Unsichtbares Leerraum-Element mit token-basierten Groessen. Kann auch als flexibler Spacer mit `grow` verwendet werden, um verbleibenden Platz zu fuellen.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] px-3 py-2 text-sm">
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <VStack gap="none" className="w-full max-w-sm">
      <Box>Oben</Box>
      <Spacer size="lg" />
      <Box>Unten</Box>
    </VStack>
  ),
};

export const SizeVariants: Story = {
  name: 'Groessen-Varianten',
  render: () => (
    <VStack gap="lg" className="w-full max-w-sm">
      {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <div key={s}>
          <span className="text-xs text-[var(--color-text-muted)]">size=&quot;{s}&quot;</span>
          <VStack gap="none" className="border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-sm)]">
            <Box>A</Box>
            <div className="w-full bg-[var(--color-accent-subtle)]">
              <Spacer size={s} />
            </div>
            <Box>B</Box>
          </VStack>
        </div>
      ))}
    </VStack>
  ),
};

export const GrowSpacer: Story = {
  name: 'Grow (flexibler Abstand)',
  render: () => (
    <HStack gap="none" className="w-full max-w-md h-12 border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-sm)] p-2" align="center">
      <Box>Logo</Box>
      <Spacer grow />
      <Box>Navigation</Box>
    </HStack>
  ),
};

export const InHeader: Story = {
  name: 'In Header',
  render: () => (
    <HStack gap="sm" align="center" className="w-full max-w-lg border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-4 py-2">
      <span className="font-semibold text-sm">App Name</span>
      <Spacer grow />
      <span className="text-xs text-[var(--color-text-muted)]">Einstellungen</span>
      <span className="text-xs text-[var(--color-text-muted)]">Profil</span>
    </HStack>
  ),
};
