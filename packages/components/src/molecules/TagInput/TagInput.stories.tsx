import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagInput } from './TagInput';

const meta = {
  title: 'Molecules/TagInput',
  component: TagInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Tag hinzufuegen…',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    defaultValue: ['React', 'TypeScript'],
  },
};

export const Empty: Story = {
  args: {},
};

export const WithManyTags: Story = {
  args: {
    defaultValue: ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Next.js'],
  },
};

export const MaxTags: Story = {
  args: {
    defaultValue: ['React', 'Vue'],
    maxTags: 3,
    placeholder: 'Max. 3 Tags',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TagInput defaultValue={['Default']} tagVariant="default" />
      <TagInput defaultValue={['Success']} tagVariant="success" />
      <TagInput defaultValue={['Warning']} tagVariant="warning" />
      <TagInput defaultValue={['Error']} tagVariant="error" />
      <TagInput defaultValue={['Info']} tagVariant="info" />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    defaultValue: ['React'],
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: ['React', 'Vue'],
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'Vue']);
    return (
      <div>
        <TagInput value={tags} onChange={setTags} />
        <p style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-muted)' }}>
          Tags: {JSON.stringify(tags)}
        </p>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <TagInput
        value={tags}
        onChange={setTags}
        validate={(tag) => tag.length >= 2}
        placeholder="Min. 2 Zeichen"
      />
    );
  },
};

export const CommaDelimiter: Story = {
  args: {
    defaultValue: ['React'],
    delimiters: ['Enter', ','],
    placeholder: 'Enter oder Komma',
  },
};

export const SmallSize: Story = {
  args: {
    defaultValue: ['React', 'Vue', 'Angular'],
    tagSize: 'sm',
  },
};
