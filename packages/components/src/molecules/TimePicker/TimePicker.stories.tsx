import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './TimePicker';
import { Label } from '../../atoms/Label';

const meta: Meta<typeof TimePicker> = {
  title: 'Molecules/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    return (
      <div style={{ width: '200px' }}>
        <TimePicker value={value} onChange={setValue} />
        {value && (
          <p style={{ marginTop: 8, fontSize: 14, color: 'var(--color-text-muted)' }}>
            Gewählt: {value}
          </p>
        )}
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('14:30');
    return (
      <div style={{ width: '200px' }}>
        <TimePicker value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithSeconds: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('14:30:45');
    return (
      <div style={{ width: '220px' }}>
        <TimePicker
          value={value}
          onChange={setValue}
          showSeconds
          placeholder="HH:MM:SS"
        />
      </div>
    );
  },
};

export const TwelveHour: Story = {
  name: '12h Format',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('14:30');
    return (
      <div style={{ width: '220px' }}>
        <TimePicker value={value} onChange={setValue} format="12h" />
      </div>
    );
  },
};

export const MinuteStep: Story = {
  name: 'Minute Step (15min)',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('09:00');
    return (
      <div style={{ width: '200px' }}>
        <TimePicker value={value} onChange={setValue} minuteStep={15} />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  name: 'Min/Max (08:00 – 17:00)',
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('09:00');
    return (
      <div style={{ width: '200px' }}>
        <TimePicker
          value={value}
          onChange={setValue}
          min="08:00"
          max="17:00"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-muted)' }}>
          Arbeitszeiten: 08:00 – 17:00
        </p>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState<string | undefined>('08:00');
    const [md, setMd] = React.useState<string | undefined>('12:00');
    const [lg, setLg] = React.useState<string | undefined>('18:30');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '200px' }}>
        <div>
          <Label style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>sm</Label>
          <TimePicker value={sm} onChange={setSm} inputSize="sm" />
        </div>
        <div>
          <Label style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>md</Label>
          <TimePicker value={md} onChange={setMd} inputSize="md" />
        </div>
        <div>
          <Label style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>lg</Label>
          <TimePicker value={lg} onChange={setLg} inputSize="lg" />
        </div>
      </div>
    );
  },
};

export const Error: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <TimePicker value="14:30" error />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <TimePicker value="14:30" disabled />
    </div>
  ),
};

export const InForm: Story = {
  name: 'In Form',
  render: () => {
    const [start, setStart] = React.useState<string | undefined>('09:00');
    const [end, setEnd] = React.useState<string | undefined>('17:00');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '240px' }}>
        <div>
          <Label
            style={{
              display: 'block',
              marginBottom: 4,
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--color-text-base)',
            }}
          >
            Startzeit
          </Label>
          <TimePicker value={start} onChange={setStart} minuteStep={15} />
        </div>
        <div>
          <Label
            style={{
              display: 'block',
              marginBottom: 4,
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--color-text-base)',
            }}
          >
            Endzeit
          </Label>
          <TimePicker value={end} onChange={setEnd} minuteStep={15} />
        </div>
      </div>
    );
  },
};
