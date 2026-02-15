import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselItem } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Organisms/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    autoPlay: { control: 'boolean' },
    interval: { control: 'number' },
    showDots: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    loop: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Karussell-Komponente fuer Bild- und Inhalts-Galerien. Unterstuetzt Navigation per Pfeile, Punkt-Indikatoren, Tastatur und automatisches Abspielen.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-2xl">
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-primary)] text-white text-lg font-medium rounded-lg">
          Slide 1
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-muted)] text-[var(--color-text-base)] text-lg font-medium rounded-lg">
          Slide 2
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] text-lg font-medium rounded-lg border border-[var(--color-border-muted)]">
          Slide 3
        </div>
      </CarouselItem>
    </Carousel>
  ),
};

// ─── WithDots ────────────────────────────────────────────────────────────────

export const WithDots: Story = {
  name: 'With Dots',
  render: () => (
    <Carousel showDots className="w-full max-w-2xl">
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-primary)] text-white text-lg font-medium">
          Slide 1
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-muted)] text-[var(--color-text-base)] text-lg font-medium">
          Slide 2
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] text-lg font-medium border border-[var(--color-border-muted)]">
          Slide 3
        </div>
      </CarouselItem>
    </Carousel>
  ),
};

// ─── WithArrows ──────────────────────────────────────────────────────────────

export const WithArrows: Story = {
  name: 'With Arrows',
  render: () => (
    <Carousel showArrows className="w-full max-w-2xl">
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-primary)] text-white text-lg font-medium">
          Slide 1
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-muted)] text-[var(--color-text-base)] text-lg font-medium">
          Slide 2
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] text-lg font-medium border border-[var(--color-border-muted)]">
          Slide 3
        </div>
      </CarouselItem>
    </Carousel>
  ),
};

// ─── AutoPlay ────────────────────────────────────────────────────────────────

export const AutoPlay: Story = {
  name: 'Auto Play',
  render: () => (
    <Carousel autoPlay interval={3000} showDots className="w-full max-w-2xl">
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-primary)] text-white text-lg font-medium">
          Auto 1
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-muted)] text-[var(--color-text-base)] text-lg font-medium">
          Auto 2
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] text-lg font-medium border border-[var(--color-border-muted)]">
          Auto 3
        </div>
      </CarouselItem>
    </Carousel>
  ),
};

// ─── AllFeatures ─────────────────────────────────────────────────────────────

export const AllFeatures: Story = {
  name: 'All Features',
  render: () => (
    <Carousel showDots showArrows loop className="w-full max-w-2xl">
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-primary)] text-white text-lg font-medium">
          Endlos-Slide 1
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-muted)] text-[var(--color-text-base)] text-lg font-medium">
          Endlos-Slide 2
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-64 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] text-lg font-medium border border-[var(--color-border-muted)]">
          Endlos-Slide 3
        </div>
      </CarouselItem>
    </Carousel>
  ),
};

// ─── TrainingPhotoGallery ────────────────────────────────────────────────────

export const TrainingPhotoGallery: Story = {
  name: 'Training: Fotogalerie',
  render: () => (
    <Carousel showDots showArrows loop className="w-full max-w-2xl">
      <CarouselItem>
        <div
          className="flex flex-col items-center justify-end h-72 p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 100%)' }}
        >
          <span className="text-xl font-bold">Morgen-Longrun</span>
          <span className="text-sm opacity-80">11.07 km - Alster Runde</span>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div
          className="flex flex-col items-center justify-end h-72 p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)' }}
        >
          <span className="text-xl font-bold">Intervall-Training</span>
          <span className="text-sm opacity-80">8x400m - Stadtpark</span>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div
          className="flex flex-col items-center justify-end h-72 p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #6b2fa0 0%, #a855f7 100%)' }}
        >
          <span className="text-xl font-bold">Tempo-Dauerlauf</span>
          <span className="text-sm opacity-80">10 km - Elbweg</span>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div
          className="flex flex-col items-center justify-end h-72 p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)' }}
        >
          <span className="text-xl font-bold">Regenerationslauf</span>
          <span className="text-sm opacity-80">5 km - Jenischpark</span>
        </div>
      </CarouselItem>
    </Carousel>
  ),
};

// ─── DesignTokens ────────────────────────────────────────────────────────────

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Verwendete Design Tokens</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-card</td>
            <td className="py-2 pr-4">Eckenradius des Carousel-Containers</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-bg-paper</td>
            <td className="py-2 pr-4">Hintergrund der Navigations-Pfeile</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-text-base</td>
            <td className="py-2 pr-4">Icon-Farbe der Navigations-Pfeile</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--shadow-card-raised</td>
            <td className="py-2 pr-4">Schatten der Navigations-Pfeile</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-bg-primary</td>
            <td className="py-2 pr-4">Farbe des aktiven Punkt-Indikators</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-border-focus</td>
            <td className="py-2 pr-4">Fokus-Ring fuer interaktive Elemente</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
