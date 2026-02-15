import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'destructive'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
    showExternalIcon: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Link component for navigation. Supports variant styles, underline behavior, external link auto-detection, and an optional external icon indicator.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '/about',
    children: 'Default Link',
  },
};

export const Muted: Story = {
  args: {
    href: '/about',
    variant: 'muted',
    children: 'Muted Link',
  },
};

export const Destructive: Story = {
  args: {
    href: '/delete',
    variant: 'destructive',
    children: 'Eintrag löschen',
  },
};

export const ExternalLink: Story = {
  name: 'External Link',
  args: {
    href: 'https://example.com',
    showExternalIcon: true,
    children: 'Externe Seite',
  },
};

export const UnderlineAlways: Story = {
  name: 'Underline: Always',
  args: {
    href: '/about',
    underline: 'always',
    children: 'Immer unterstrichen',
  },
};

export const UnderlineNone: Story = {
  name: 'Underline: None',
  args: {
    href: '/about',
    underline: 'none',
    children: 'Nie unterstrichen',
  },
};

export const Disabled: Story = {
  args: {
    href: '/about',
    disabled: true,
    children: 'Deaktivierter Link',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/about">Default</Link>
        <Link href="/about" variant="muted">Muted</Link>
        <Link href="/delete" variant="destructive">Destructive</Link>
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/about" underline="always">Always underline</Link>
        <Link href="/about" underline="hover">Hover underline</Link>
        <Link href="/about" underline="none">No underline</Link>
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="https://example.com" showExternalIcon>Mit Icon</Link>
        <Link href="/about" disabled>Deaktiviert</Link>
      </div>
    </div>
  ),
};

export const InlineUsage: Story = {
  name: 'Inline Text',
  render: () => (
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
      Weitere Informationen findest du in der{' '}
      <Link href="/docs">Dokumentation</Link> oder auf der{' '}
      <Link href="https://example.com" showExternalIcon>offiziellen Webseite</Link>.
      Bei Problemen kontaktiere den{' '}
      <Link href="/support" variant="muted">Support</Link>.
    </p>
  ),
};

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Link Design Tokens</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Token</th>
            <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Resolved Value</th>
            <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['--color-link-text', '#0ea5e9', 'Default link text color (Sky-500)'],
            ['--color-link-text-hover', '#0284c7', 'Default link hover color (Sky-600)'],
            ['--color-text-muted', '#475569', 'Muted variant text color (Slate-600)'],
            ['--color-text-base', '#0f172a', 'Muted variant hover text (Slate-900)'],
            ['--color-text-error', '#b91c1c', 'Destructive variant text (Red-700)'],
            ['--color-border-focus', '#0ea5e9', 'Focus ring color (Sky-500)'],
          ].map(([token, value, usage]) => (
            <tr key={token} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px' }}>{token}</td>
              <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    backgroundColor: value,
                    border: '1px solid #e2e8f0',
                  }}
                />
                {value}
              </td>
              <td style={{ padding: '8px', color: '#64748b' }}>{usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
