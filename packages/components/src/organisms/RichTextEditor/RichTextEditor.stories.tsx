import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';

const meta = {
  title: 'Organisms/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Inhalt eingeben…',
  },
};

export const WithContent: Story = {
  args: {
    defaultValue: '<h2>Willkommen</h2><p>Dies ist ein <strong>Beispieltext</strong> mit <em>Formatierung</em>.</p><ul><li>Punkt eins</li><li>Punkt zwei</li></ul><blockquote><p>Ein Zitat zur Inspiration.</p></blockquote>',
  },
};

export const LimitedFeatures: Story = {
  args: {
    features: ['bold', 'italic', 'underline', 'bulletList', 'orderedList'],
    placeholder: 'Nur Basis-Formatierung…',
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: '<h2>Nur-Lesen-Modus</h2><p>Dieser Inhalt kann nicht bearbeitet werden.</p>',
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '<p>Deaktivierter Editor</p>',
    disabled: true,
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: '<p>Fehlerhafter Inhalt</p>',
    error: true,
  },
};

export const NoToolbar: Story = {
  args: {
    hideToolbar: true,
    defaultValue: '<p>Editor ohne Toolbar</p>',
  },
};

export const Controlled: Story = {
  render: () => {
    const [html, setHtml] = useState('<p>Kontrollierter Editor</p>');
    return (
      <div>
        <RichTextEditor value={html} onChange={setHtml} />
        <details style={{ marginTop: 16 }}>
          <summary style={{ cursor: 'pointer', fontSize: 12, color: 'var(--color-text-muted)' }}>
            HTML Output
          </summary>
          <pre style={{ fontSize: 11, padding: 8, background: 'var(--color-bg-surface)', borderRadius: 4, marginTop: 4, overflow: 'auto' }}>
            {html}
          </pre>
        </details>
      </div>
    );
  },
};

export const MinimalHeight: Story = {
  args: {
    minHeight: '100px',
    placeholder: 'Kompakter Editor…',
  },
};
