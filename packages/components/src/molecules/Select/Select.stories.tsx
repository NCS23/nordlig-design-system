import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Select, type SelectOption, type SelectGroup } from './Select';
import { Combobox } from './Combobox';
import { MultiSelect } from './MultiSelect';
import { Label } from '../../atoms/Label';

// ─── Test Data ──────────────────────────────────────────────────────────────

const sportOptions: SelectOption[] = [
  { value: 'laufen', label: 'Laufen' },
  { value: 'radfahren', label: 'Radfahren' },
  { value: 'schwimmen', label: 'Schwimmen' },
  { value: 'krafttraining', label: 'Krafttraining' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'wandern', label: 'Wandern' },
];

const groupedSportOptions: SelectGroup[] = [
  {
    label: 'Ausdauer',
    options: [
      { value: 'laufen', label: 'Laufen' },
      { value: 'radfahren', label: 'Radfahren' },
      { value: 'schwimmen', label: 'Schwimmen' },
    ],
  },
  {
    label: 'Kraft & Flexibilität',
    options: [
      { value: 'krafttraining', label: 'Krafttraining' },
      { value: 'crossfit', label: 'CrossFit' },
      { value: 'yoga', label: 'Yoga' },
      { value: 'pilates', label: 'Pilates' },
    ],
  },
  {
    label: 'Outdoor',
    options: [
      { value: 'wandern', label: 'Wandern' },
      { value: 'klettern', label: 'Klettern' },
      { value: 'skilanglauf', label: 'Skilanglauf' },
    ],
  },
];

const hrZoneOptions: SelectOption[] = [
  { value: 'zone1', label: 'Zone 1 – Regeneration (50-60%)' },
  { value: 'zone2', label: 'Zone 2 – Grundlagenausdauer (60-70%)' },
  { value: 'zone3', label: 'Zone 3 – Aerob (70-80%)' },
  { value: 'zone4', label: 'Zone 4 – Anaerobe Schwelle (80-90%)' },
  { value: 'zone5', label: 'Zone 5 – Maximum (90-100%)' },
];

const optionsWithDisabled: SelectOption[] = [
  { value: 'laufen', label: 'Laufen' },
  { value: 'radfahren', label: 'Radfahren' },
  { value: 'schwimmen', label: 'Schwimmen', disabled: true },
  { value: 'krafttraining', label: 'Krafttraining' },
];

// ─── Select Stories ─────────────────────────────────────────────────────────

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Custom Select dropdown with Radix UI Popover, keyboard navigation, and Input-like trigger styling. Supports flat and grouped options.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    return (
      <div style={{ maxWidth: '320px' }}>
        <Select
          options={sportOptions}
          value={value}
          onChange={setValue}
          placeholder="Sportart wählen"
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('radfahren');
    return (
      <div style={{ maxWidth: '320px' }}>
        <Select options={sportOptions} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Grouped: Story = {
  name: 'Grouped Options',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    return (
      <div style={{ maxWidth: '320px' }}>
        <Select
          options={groupedSportOptions}
          value={value}
          onChange={setValue}
          placeholder="Sportart wählen"
        />
      </div>
    );
  },
};

export const DisabledOptions: Story = {
  name: 'With Disabled Options',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    return (
      <div style={{ maxWidth: '320px' }}>
        <Select
          options={optionsWithDisabled}
          value={value}
          onChange={setValue}
          placeholder="Sportart wählen"
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <Select options={sportOptions} error placeholder="Pflichtfeld" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <Select options={sportOptions} disabled placeholder="Nicht verfügbar" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState<string | undefined>();
    const [md, setMd] = React.useState<string | undefined>();
    const [lg, setLg] = React.useState<string | undefined>();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
        <Select inputSize="sm" options={sportOptions} value={sm} onChange={setSm} placeholder="Small (36px)" />
        <Select inputSize="md" options={sportOptions} value={md} onChange={setMd} placeholder="Medium (40px)" />
        <Select inputSize="lg" options={sportOptions} value={lg} onChange={setLg} placeholder="Large (44px)" />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [d1, setD1] = React.useState<string | undefined>();
    const [d2, setD2] = React.useState<string | undefined>('laufen');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
        <Select options={sportOptions} value={d1} onChange={setD1} placeholder="Default" />
        <Select options={sportOptions} value={d2} onChange={setD2} />
        <Select options={sportOptions} error placeholder="Error State" />
        <Select options={sportOptions} disabled placeholder="Disabled" />
      </div>
    );
  },
};

// ─── Combobox Stories ───────────────────────────────────────────────────────

export const ComboboxDefault: StoryObj<typeof Combobox> = {
  name: 'Combobox - Default',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    return (
      <div style={{ maxWidth: '320px' }}>
        <Combobox
          options={sportOptions}
          value={value}
          onChange={setValue}
          placeholder="Sportart suchen…"
        />
      </div>
    );
  },
};

export const ComboboxGrouped: StoryObj<typeof Combobox> = {
  name: 'Combobox - Grouped',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    return (
      <div style={{ maxWidth: '320px' }}>
        <Combobox
          options={groupedSportOptions}
          value={value}
          onChange={setValue}
          placeholder="Sportart suchen…"
        />
      </div>
    );
  },
};

export const ComboboxWithValue: StoryObj<typeof Combobox> = {
  name: 'Combobox - Pre-selected',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('yoga');
    return (
      <div style={{ maxWidth: '320px' }}>
        <Combobox options={sportOptions} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const ComboboxLongList: StoryObj<typeof Combobox> = {
  name: 'Combobox - Long List',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    const manyOptions: SelectOption[] = Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1} – Trainingseinheit`,
    }));
    return (
      <div style={{ maxWidth: '320px' }}>
        <Combobox
          options={manyOptions}
          value={value}
          onChange={setValue}
          placeholder="Einheit suchen…"
          searchPlaceholder="Tippe zum Filtern…"
        />
      </div>
    );
  },
};

// ─── MultiSelect Stories ────────────────────────────────────────────────────

export const MultiSelectDefault: StoryObj<typeof MultiSelect> = {
  name: 'MultiSelect - Default',
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div style={{ maxWidth: '360px' }}>
        <MultiSelect
          options={sportOptions}
          value={value}
          onChange={setValue}
          placeholder="Sportarten wählen…"
        />
      </div>
    );
  },
};

export const MultiSelectWithValues: StoryObj<typeof MultiSelect> = {
  name: 'MultiSelect - Pre-selected',
  render: () => {
    const [value, setValue] = React.useState<string[]>([
      'laufen',
      'radfahren',
      'schwimmen',
    ]);
    return (
      <div style={{ maxWidth: '360px' }}>
        <MultiSelect
          options={sportOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const MultiSelectGrouped: StoryObj<typeof MultiSelect> = {
  name: 'MultiSelect - Grouped',
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div style={{ maxWidth: '360px' }}>
        <MultiSelect
          options={groupedSportOptions}
          value={value}
          onChange={setValue}
          placeholder="Sportarten wählen…"
        />
      </div>
    );
  },
};

export const MultiSelectManySelected: StoryObj<typeof MultiSelect> = {
  name: 'MultiSelect - Badge Overflow',
  render: () => {
    const [value, setValue] = React.useState<string[]>([
      'laufen',
      'radfahren',
      'schwimmen',
      'krafttraining',
      'yoga',
    ]);
    return (
      <div style={{ maxWidth: '360px' }}>
        <MultiSelect
          options={sportOptions}
          value={value}
          onChange={setValue}
          maxBadges={2}
        />
      </div>
    );
  },
};

export const MultiSelectError: StoryObj<typeof MultiSelect> = {
  name: 'MultiSelect - Error',
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div style={{ maxWidth: '360px' }}>
        <MultiSelect
          options={sportOptions}
          value={value}
          onChange={setValue}
          error
          placeholder="Pflichtfeld"
        />
      </div>
    );
  },
};

export const MultiSelectDisabled: StoryObj<typeof MultiSelect> = {
  name: 'MultiSelect - Disabled',
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <MultiSelect
        options={sportOptions}
        value={['laufen', 'radfahren']}
        disabled
      />
    </div>
  ),
};

export const MultiSelectMaxItems: StoryObj<typeof MultiSelect> = {
  name: 'MultiSelect - Max Items',
  render: () => {
    const [value, setValue] = React.useState<string[]>(['laufen']);
    return (
      <div style={{ maxWidth: '360px' }}>
        <MultiSelect
          options={sportOptions}
          value={value}
          onChange={setValue}
          maxItems={3}
          placeholder="Max. 3 Sportarten"
        />
        <p style={{ marginTop: 8, fontSize: 14, color: 'var(--color-text-muted)' }}>
          {value.length}/3 ausgewählt
        </p>
      </div>
    );
  },
};

// ─── Training Analyzer Use Cases ────────────────────────────────────────────

export const TrainingSportart: Story = {
  name: 'Training - Sportart',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    return (
      <div style={{ maxWidth: '320px' }}>
        <Label
          style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Sportart
        </Label>
        <Select
          options={sportOptions}
          value={value}
          onChange={setValue}
          placeholder="Sportart wählen"
          aria-label="Sportart"
        />
      </div>
    );
  },
};

export const TrainingHRZone: StoryObj<typeof Combobox> = {
  name: 'Training - HF-Zone suchen',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    return (
      <div style={{ maxWidth: '360px' }}>
        <Label
          style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Herzfrequenz-Zone
        </Label>
        <Combobox
          options={hrZoneOptions}
          value={value}
          onChange={setValue}
          placeholder="Zone auswählen…"
          searchPlaceholder="Zone suchen…"
          aria-label="Herzfrequenz-Zone"
        />
      </div>
    );
  },
};

export const TrainingSportFilter: StoryObj<typeof MultiSelect> = {
  name: 'Training - Sportarten-Filter',
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div style={{ maxWidth: '360px' }}>
        <Label
          style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Sportarten filtern
        </Label>
        <MultiSelect
          options={groupedSportOptions}
          value={value}
          onChange={setValue}
          placeholder="Alle Sportarten"
          selectAllLabel="Alle auswählen"
          deselectAllLabel="Alle abwählen"
          aria-label="Sportarten-Filter"
        />
        {value.length > 0 && (
          <p style={{ marginTop: '8px', fontSize: '0.75rem', color: '#64748b' }}>
            {value.length} Sportart{value.length !== 1 ? 'en' : ''} ausgewählt
          </p>
        )}
      </div>
    );
  },
};

export const TrainingZoneFilter: StoryObj<typeof MultiSelect> = {
  name: 'Training - HF-Zonen-Filter',
  render: () => {
    const [value, setValue] = React.useState<string[]>(['zone2', 'zone3']);
    return (
      <div style={{ maxWidth: '360px' }}>
        <Label
          style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Trainingszonen
        </Label>
        <MultiSelect
          options={hrZoneOptions}
          value={value}
          onChange={setValue}
          showSelectAll
          maxBadges={2}
          aria-label="Trainingszonen"
        />
      </div>
    );
  },
};
