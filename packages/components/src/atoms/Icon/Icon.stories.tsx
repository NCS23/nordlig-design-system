import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  X,
  Search,
  Star,
  Copy,
  Check,
  Eye,
  EyeOff,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  File,
  Heart,
} from 'lucide-react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    icon: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Universeller Icon-Wrapper fuer lucide-react Icons. Bietet token-basierte Groessen (sm/md/lg/xl), konsistente Accessibility-Defaults und ein einheitliches API fuer das gesamte Design System.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// --- Playground ---

export const Playground: Story = {
  args: {
    icon: Info,
    size: 'md',
  },
};

// --- All Sizes ---

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Info} size="sm" className="text-[var(--color-text-info)]" />
        <span className="text-xs text-[var(--color-text-muted)]">sm (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Info} size="md" className="text-[var(--color-text-info)]" />
        <span className="text-xs text-[var(--color-text-muted)]">md (20px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Info} size="lg" className="text-[var(--color-text-info)]" />
        <span className="text-xs text-[var(--color-text-muted)]">lg (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Info} size="xl" className="text-[var(--color-text-info)]" />
        <span className="text-xs text-[var(--color-text-muted)]">xl (32px)</span>
      </div>
    </div>
  ),
};

// --- Custom Pixel Size ---

export const CustomPixelSize: Story = {
  name: 'Custom Pixel Size',
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size={14} className="text-[var(--color-text-warning)]" />
        <span className="text-xs text-[var(--color-text-muted)]">14px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size={18} className="text-[var(--color-text-warning)]" />
        <span className="text-xs text-[var(--color-text-muted)]">18px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size={28} className="text-[var(--color-text-warning)]" />
        <span className="text-xs text-[var(--color-text-muted)]">28px</span>
      </div>
    </div>
  ),
};

// --- Icon Gallery ---

export const Gallery: Story = {
  name: 'Icon Gallery',
  render: () => {
    const icons = [
      { component: Info, name: 'Info' },
      { component: CheckCircle, name: 'CheckCircle' },
      { component: AlertTriangle, name: 'AlertTriangle' },
      { component: XCircle, name: 'XCircle' },
      { component: X, name: 'X' },
      { component: Search, name: 'Search' },
      { component: Star, name: 'Star' },
      { component: Copy, name: 'Copy' },
      { component: Check, name: 'Check' },
      { component: Eye, name: 'Eye' },
      { component: EyeOff, name: 'EyeOff' },
      { component: Sun, name: 'Sun' },
      { component: Moon, name: 'Moon' },
      { component: ChevronLeft, name: 'ChevronLeft' },
      { component: ChevronRight, name: 'ChevronRight' },
      { component: UploadCloud, name: 'UploadCloud' },
      { component: File, name: 'File' },
      { component: Heart, name: 'Heart' },
    ];
    return (
      <div className="grid grid-cols-6 gap-4">
        {icons.map(({ component, name }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-3 rounded-md border border-[var(--color-border-default)]"
          >
            <Icon
              icon={component}
              size="lg"
              className="text-[var(--color-text-base)]"
            />
            <span className="text-xs text-[var(--color-text-muted)]">
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

// --- Accessible Icon ---

export const AccessibleIcon: Story = {
  name: 'Accessible (mit Label)',
  render: () => (
    <div className="flex items-center gap-4">
      <Icon
        icon={AlertTriangle}
        size="lg"
        label="Warnung"
        className="text-[var(--color-text-warning)]"
      />
      <span className="text-sm text-[var(--color-text-muted)]">
        Dieses Icon hat role=&quot;img&quot; und aria-label=&quot;Warnung&quot;
      </span>
    </div>
  ),
};

// --- With Color Tokens ---

export const ColorVariants: Story = {
  name: 'Color Variants',
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Info} size="lg" className="text-[var(--color-text-info)]" />
      <Icon icon={CheckCircle} size="lg" className="text-[var(--color-text-success)]" />
      <Icon icon={AlertTriangle} size="lg" className="text-[var(--color-text-warning)]" />
      <Icon icon={XCircle} size="lg" className="text-[var(--color-text-error)]" />
      <Icon icon={Heart} size="lg" className="text-[var(--color-text-muted)]" />
    </div>
  ),
};
