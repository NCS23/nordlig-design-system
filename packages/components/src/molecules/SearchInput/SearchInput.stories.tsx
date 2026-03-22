import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Suchen...',
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState('React');

    return (
      <SearchInput
        placeholder="Suchen..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
};

export const WithDebounce: Story = {
  args: {
    placeholder: 'Mit Debounce suchen...',
    debounceMs: 300,
    onSearch: (val: string) => console.log('Suche:', val),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <SearchInput inputSize="sm" placeholder="Klein" />
      <SearchInput inputSize="md" placeholder="Mittel" />
      <SearchInput inputSize="lg" placeholder="Groß" />
    </div>
  ),
};

export const Error: Story = {
  args: {
    placeholder: 'Suchen...',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Suchen...',
    disabled: true,
  },
};

export const WithClear: Story = {
  render: () => {
    const [value, setValue] = React.useState('Suchbegriff');

    return (
      <SearchInput
        placeholder="Suchen..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
};
