import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DatePicker } from './DatePicker';
import { Calendar } from './Calendar';

// ─── DatePicker Stories ─────────────────────────────────────────────────────

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
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
          'Custom DatePicker with Radix UI Popover, Calendar grid, and German date format (DD.MM.YYYY). Uses date-fns for date logic.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    placeholder: 'TT.MM.JJJJ',
  },
};

export const WithValue: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(2025, 0, 15)
    );
    return <DatePicker value={date} onChange={setDate} />;
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Pflichtfeld',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Nicht verfügbar',
  },
};

export const WithMinMax: Story = {
  name: 'Min/Max Dates',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={new Date(2025, 0, 5)}
        maxDate={new Date(2025, 0, 25)}
        placeholder="05.01 – 25.01.2025"
      />
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState<Date | undefined>();
    const [md, setMd] = React.useState<Date | undefined>();
    const [lg, setLg] = React.useState<Date | undefined>();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
        <DatePicker inputSize="sm" value={sm} onChange={setSm} placeholder="Small (36px)" />
        <DatePicker inputSize="md" value={md} onChange={setMd} placeholder="Medium (40px)" />
        <DatePicker inputSize="lg" value={lg} onChange={setLg} placeholder="Large (44px)" />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [d1, setD1] = React.useState<Date | undefined>();
    const [d2, setD2] = React.useState<Date | undefined>(new Date(2025, 0, 15));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
        <DatePicker value={d1} onChange={setD1} placeholder="Default" />
        <DatePicker value={d2} onChange={setD2} />
        <DatePicker error placeholder="Error state" />
        <DatePicker disabled placeholder="Disabled" />
      </div>
    );
  },
};

export const TrainingUseCase: Story = {
  name: 'Training Analyzer',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div style={{ maxWidth: '320px' }}>
        <label
          style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Trainingsdatum
        </label>
        <DatePicker
          value={date}
          onChange={setDate}
          maxDate={new Date()}
          aria-label="Trainingsdatum"
        />
      </div>
    );
  },
};

// ─── Calendar Standalone Stories ─────────────────────────────────────────────

const calendarMeta: Meta<typeof Calendar> = {
  title: 'Molecules/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Standalone Calendar grid used inside DatePicker. German locale, Monday start, token-based styling.',
      },
    },
  },
};

export const CalendarDefault: StoryObj<typeof Calendar> = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>();
    const [month, setMonth] = React.useState(new Date());
    return (
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          width: 'fit-content',
        }}
      >
        <Calendar
          selected={selected}
          month={month}
          onSelect={setSelected}
          onMonthChange={setMonth}
        />
      </div>
    );
  },
};

export const CalendarWithSelection: StoryObj<typeof Calendar> = {
  name: 'Calendar - Pre-selected',
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(
      new Date(2025, 0, 15)
    );
    const [month, setMonth] = React.useState(new Date(2025, 0, 1));
    return (
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          width: 'fit-content',
        }}
      >
        <Calendar
          selected={selected}
          month={month}
          onSelect={setSelected}
          onMonthChange={setMonth}
        />
      </div>
    );
  },
};

export const CalendarWithConstraints: StoryObj<typeof Calendar> = {
  name: 'Calendar - Min/Max',
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>();
    const [month, setMonth] = React.useState(new Date(2025, 0, 1));
    return (
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          width: 'fit-content',
        }}
      >
        <Calendar
          selected={selected}
          month={month}
          onSelect={setSelected}
          onMonthChange={setMonth}
          minDate={new Date(2025, 0, 10)}
          maxDate={new Date(2025, 0, 20)}
        />
      </div>
    );
  },
};
