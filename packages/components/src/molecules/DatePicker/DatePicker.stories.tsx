import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';
import { Calendar, type DateRange } from './Calendar';
import { Label } from '../../atoms/Label';

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
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 5);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), 25);
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
        placeholder={`05. – 25. dieses Monats`}
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
        <Label
          style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Trainingsdatum
        </Label>
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
    const today = new Date();
    const [selected, setSelected] = React.useState<Date | undefined>(
      new Date(today.getFullYear(), today.getMonth(), 15)
    );
    const [month, setMonth] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));
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
    const today = new Date();
    const [selected, setSelected] = React.useState<Date | undefined>();
    const [month, setMonth] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));
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
          minDate={new Date(today.getFullYear(), today.getMonth(), 10)}
          maxDate={new Date(today.getFullYear(), today.getMonth(), 20)}
        />
      </div>
    );
  },
};

export const CalendarRangeMode: StoryObj<typeof Calendar> = {
  name: 'Calendar - Range Selection',
  render: () => {
    const [range, setRange] = React.useState<DateRange>({});
    const [month, setMonth] = React.useState(new Date());
    return (
      <div>
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            width: 'fit-content',
          }}
        >
          <Calendar
            mode="range"
            selectedRange={range}
            month={month}
            onRangeSelect={setRange}
            onMonthChange={setMonth}
          />
        </div>
        <p style={{ marginTop: '8px', fontSize: '0.875rem', color: '#64748b' }}>
          {range.from && !range.to && 'Klicke auf den Endtag'}
          {range.from && range.to && `${range.from.toLocaleDateString('de-DE')} – ${range.to.toLocaleDateString('de-DE')}`}
          {!range.from && 'Klicke auf den Starttag'}
        </p>
      </div>
    );
  },
};

// ─── DateRangePicker Stories ────────────────────────────────────────────────

export const RangeDefault: StoryObj<typeof DateRangePicker> = {
  name: 'Range Picker - Default',
  render: () => {
    const [range, setRange] = React.useState<DateRange>({});
    return (
      <div style={{ maxWidth: '400px' }}>
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const RangeWithValue: StoryObj<typeof DateRangePicker> = {
  name: 'Range Picker - Pre-selected',
  render: () => {
    const today = new Date();
    const [range, setRange] = React.useState<DateRange>({
      from: new Date(today.getFullYear(), today.getMonth(), 5),
      to: new Date(today.getFullYear(), today.getMonth(), 15),
    });
    return (
      <div style={{ maxWidth: '400px' }}>
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const RangeError: StoryObj<typeof DateRangePicker> = {
  name: 'Range Picker - Error',
  render: () => {
    const [range, setRange] = React.useState<DateRange>({});
    return (
      <div style={{ maxWidth: '400px' }}>
        <DateRangePicker value={range} onChange={setRange} error />
      </div>
    );
  },
};

export const RangeDisabled: StoryObj<typeof DateRangePicker> = {
  name: 'Range Picker - Disabled',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <DateRangePicker disabled />
    </div>
  ),
};

export const RangeTrainingUseCase: StoryObj<typeof DateRangePicker> = {
  name: 'Range Picker - Trainingszeitraum',
  render: () => {
    const [range, setRange] = React.useState<DateRange>({});
    return (
      <div style={{ maxWidth: '400px' }}>
        <Label
          style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Trainingszeitraum filtern
        </Label>
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholderFrom="Von"
          placeholderTo="Bis"
          maxDate={new Date()}
          aria-label="Trainingszeitraum Start"
        />
        {range.from && range.to && (
          <p style={{ marginTop: '8px', fontSize: '0.75rem', color: '#64748b' }}>
            {Math.ceil((range.to.getTime() - range.from.getTime()) / 86400000)} Tage ausgewählt
          </p>
        )}
      </div>
    );
  },
};
