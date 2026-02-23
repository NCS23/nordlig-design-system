import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Heading component for page titles and section headings. The `level` prop controls visual style and default semantic tag. Use `as` to override the HTML tag for visual/semantic mismatches (e.g., visually large heading that is semantically an h3).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Level1: Story = {
  args: {
    level: 1,
    children: 'Heading Level 1',
  },
};

export const Level2: Story = {
  args: {
    level: 2,
    children: 'Heading Level 2',
  },
};

export const Level3: Story = {
  args: {
    level: 3,
    children: 'Heading Level 3',
  },
};

export const Level4: Story = {
  args: {
    level: 4,
    children: 'Heading Level 4',
  },
};

export const Level5: Story = {
  args: {
    level: 5,
    children: 'Heading Level 5',
  },
};

export const Level6: Story = {
  args: {
    level: 6,
    children: 'Heading Level 6',
  },
};

export const AllLevels: Story = {
  name: 'All Levels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Heading level={1}>H1 - Seitenüberschrift</Heading>
      <Heading level={2}>H2 - Abschnittstitel</Heading>
      <Heading level={3}>H3 - Unterabschnitt</Heading>
      <Heading level={4}>H4 - Gruppenüberschrift</Heading>
      <Heading level={5}>H5 - Kleine Überschrift</Heading>
      <Heading level={6}>H6 - Kleinste Überschrift</Heading>
    </div>
  ),
};

export const SemanticOverride: Story = {
  name: 'Semantic Override',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Heading level={1} as="h3">
        Visuell H1, semantisch H3
      </Heading>
      <p style={{ fontSize: '14px', color: '#64748b' }}>
        Nutze die <code>as</code>-Prop, wenn der visuelle Stil nicht zum semantischen Level passt.
        Beispiel: Eine Sidebar-Ueberschrift soll gross aussehen (level=1), ist aber semantisch ein h3.
      </p>
    </div>
  ),
};

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #e2e8f0' }}>Token</th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #e2e8f0' }}>Value</th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #e2e8f0' }}>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>--color-text-heading</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>#0f172a (slate-900)</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>All heading levels (1-6)</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
