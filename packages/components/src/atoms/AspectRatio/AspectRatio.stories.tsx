import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Atoms/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'AspectRatio-Komponente zur Darstellung von Inhalten in einem festen Seitenverhaeltnis. Basiert auf Radix UI AspectRatio.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default16by9: Story = {
  name: '16:9 (Standard)',
  render: () => (
    <div className="max-w-md">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
          <span className="text-sm text-slate-500">16:9</span>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  name: '1:1 (Quadrat)',
  render: () => (
    <div className="max-w-xs">
      <AspectRatio ratio={1}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
          <span className="text-sm text-slate-500">1:1 Quadrat</span>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Photo4by3: Story = {
  name: '4:3 (Foto)',
  render: () => (
    <div className="max-w-md">
      <AspectRatio ratio={4 / 3}>
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=600&fit=crop"
          alt="Landschaft"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const TrainingRouteMap: Story = {
  name: 'Training: Strecken-Karte',
  render: () => (
    <div className="max-w-lg">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-sm font-medium text-slate-400">Strecken-Karte</span>
          <span className="text-xs text-slate-400">10.2 km Laufstrecke</span>
        </div>
      </AspectRatio>
    </div>
  ),
};
