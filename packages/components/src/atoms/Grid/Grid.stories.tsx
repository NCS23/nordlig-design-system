import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, GridItem } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Atoms/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    gap: {
      control: 'select',
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CSS-Grid-Wrapper mit 1–12 Spalten und token-basiertem Gap. `GridItem` steuert span, start und rowSpan.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] px-3 py-2 text-sm text-center">
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Grid cols={3} gap="md">
      <Cell>1</Cell>
      <Cell>2</Cell>
      <Cell>3</Cell>
      <Cell>4</Cell>
      <Cell>5</Cell>
      <Cell>6</Cell>
    </Grid>
  ),
};

export const ColumnVariants: Story = {
  name: 'Spalten-Varianten',
  render: () => (
    <div className="flex flex-col gap-6">
      {([1, 2, 3, 4, 6] as const).map((c) => (
        <div key={c}>
          <span className="text-xs text-[var(--color-text-muted)] mb-1 block">cols={c}</span>
          <Grid cols={c} gap="sm">
            {Array.from({ length: c * 2 }, (_, i) => (
              <Cell key={i}>{i + 1}</Cell>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const SpanningItems: Story = {
  name: 'GridItem Span',
  render: () => (
    <Grid cols={4} gap="md">
      <GridItem span={2}><Cell>span=2</Cell></GridItem>
      <GridItem span={1}><Cell>span=1</Cell></GridItem>
      <GridItem span={1}><Cell>span=1</Cell></GridItem>
      <GridItem span="full"><Cell>span=full</Cell></GridItem>
      <GridItem span={3}><Cell>span=3</Cell></GridItem>
      <GridItem span={1}><Cell>span=1</Cell></GridItem>
    </Grid>
  ),
};

export const DashboardLayout: Story = {
  name: 'Dashboard-Layout',
  render: () => (
    <Grid cols={12} gap="md">
      <GridItem span={8}>
        <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] p-4 h-40 flex items-center justify-center text-sm">
          Hauptinhalt (8 Spalten)
        </div>
      </GridItem>
      <GridItem span={4}>
        <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] p-4 h-40 flex items-center justify-center text-sm">
          Sidebar (4 Spalten)
        </div>
      </GridItem>
      <GridItem span={4}>
        <div className="rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] p-3 text-sm text-center">Karte 1</div>
      </GridItem>
      <GridItem span={4}>
        <div className="rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] p-3 text-sm text-center">Karte 2</div>
      </GridItem>
      <GridItem span={4}>
        <div className="rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] p-3 text-sm text-center">Karte 3</div>
      </GridItem>
    </Grid>
  ),
};

export const GapVariants: Story = {
  name: 'Gap-Varianten',
  render: () => (
    <div className="flex flex-col gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((g) => (
        <div key={g}>
          <span className="text-xs text-[var(--color-text-muted)] mb-1 block">gap=&quot;{g}&quot;</span>
          <Grid cols={4} gap={g}>
            <Cell>A</Cell>
            <Cell>B</Cell>
            <Cell>C</Cell>
            <Cell>D</Cell>
          </Grid>
        </div>
      ))}
    </div>
  ),
};
