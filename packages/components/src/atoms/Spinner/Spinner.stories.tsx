import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="sm" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>sm (16px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="md" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>md (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="lg" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>lg (32px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="xl" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>xl (48px)</p>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'Lädt...',
  },
};

export const InButton: Story = {
  name: 'In Button (Loading State)',
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        disabled
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          background: '#f1f5f9',
          color: '#94a3b8',
          fontSize: '14px',
          cursor: 'not-allowed',
        }}
      >
        <Spinner size="sm" />
        Lädt...
      </button>
      <button
        disabled
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          background: '#0ea5e9',
          color: '#ffffff',
          fontSize: '14px',
          cursor: 'not-allowed',
          opacity: 0.7,
        }}
      >
        <Spinner size="sm" />
        Hochladen...
      </button>
    </div>
  ),
};

export const CenteredInContainer: Story = {
  name: 'Zentriert im Container',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        border: '1px dashed #e2e8f0',
        borderRadius: '8px',
      }}
    >
      <Spinner size="lg" label="Lade Trainingsplan..." />
    </div>
  ),
};

export const TrainingPageLoading: Story = {
  name: 'Training: Seitenlade-Zustand',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        height: '300px',
        border: '1px dashed #e2e8f0',
        borderRadius: '8px',
      }}
    >
      <Spinner size="xl" />
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '16px', fontWeight: 500, color: '#0f172a', margin: '0 0 4px' }}>
          Analysiere Trainingsdaten
        </p>
        <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
          CSV-Daten werden verarbeitet...
        </p>
      </div>
    </div>
  ),
};

