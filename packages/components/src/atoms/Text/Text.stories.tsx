import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'caption', 'small', 'muted'],
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Text component for body copy, captions, small print, and muted text. Renders as `<p>` by default, supports polymorphic `as` prop for `<span>` or `<div>`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text used for main content paragraphs.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text for supplementary information.',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'This is small text for fine print and legal notices.',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'This is muted text for secondary, less important content.',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="body">Body: Haupttext fuer Absaetze und Fliesstext.</Text>
      <Text variant="caption">Caption: Ergaenzende Information und Beschreibungen.</Text>
      <Text variant="small">Small: Kleingedrucktes und rechtliche Hinweise.</Text>
      <Text variant="muted">Muted: Sekundaerer, weniger wichtiger Inhalt.</Text>
    </div>
  ),
};

export const AsSpan: Story = {
  name: 'As Span (Inline)',
  render: () => (
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
      Trainingseinheit abgeschlossen mit{' '}
      <Text as="span" variant="muted">52 min Dauer</Text>{' '}
      und einer durchschnittlichen Pace von{' '}
      <Text as="span" variant="caption">4:32/km</Text>.
    </p>
  ),
};

export const CustomClassName: Story = {
  name: 'Custom ClassName',
  args: {
    variant: 'body',
    className: 'italic underline',
    children: 'This text has custom classes applied (italic + underline).',
  },
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
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>--color-text-base</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>#0f172a (slate-900)</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>body, caption, small variants</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>--color-text-muted</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>#475569 (slate-600)</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>muted variant</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
