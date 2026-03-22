import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonKeyframes } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <SkeletonKeyframes />
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
};

export const TextLines: Story = {
  name: 'SkeletonText (Zeilen)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#475569' }}>3 Zeilen (Standard)</p>
        <SkeletonText />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#475569' }}>5 Zeilen</p>
        <SkeletonText lines={5} />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#475569' }}>1 Zeile</p>
        <SkeletonText lines={1} />
      </div>
    </div>
  ),
};

export const CircleSizes: Story = {
  name: 'SkeletonCircle (Größen)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ textAlign: 'center' }}>
        <SkeletonCircle size="sm" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>sm (32px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonCircle size="md" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>md (48px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonCircle size="lg" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>lg (64px)</p>
      </div>
    </div>
  ),
};

export const CardLoading: Story = {
  name: 'Card Loading',
  render: () => (
    <div
      style={{
        width: '360px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
      }}
    >
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-3/4 mt-2" />
      <div style={{ marginTop: '16px' }}>
        <SkeletonText lines={3} />
      </div>
    </div>
  ),
};

export const TableLoading: Story = {
  name: 'Tabelle Loading',
  render: () => (
    <div style={{ width: '500px' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      {/* Rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  ),
};

export const TrainingSessionCard: Story = {
  name: 'Training: Session-Karte Loading',
  render: () => (
    <div
      style={{
        width: '400px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <SkeletonCircle size="md" />
        <div style={{ flex: 1 }}>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48 mt-1" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-20 mt-1" />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const DashboardStatsLoading: Story = {
  name: 'Training: Dashboard Stats Loading',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', width: '600px' }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32 mt-2" />
          <Skeleton className="h-3 w-20 mt-2" />
        </div>
      ))}
    </div>
  ),
};

