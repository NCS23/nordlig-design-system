import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Avatar-Komponente fuer Benutzerprofilbilder mit Fallback-Initialen. Unterstuetzt verschiedene Groessen und nutzt token-basiertes Styling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://i.pravatar.cc/150?u=nordlig"
        alt="Benutzerbild"
      />
      <AvatarFallback>NB</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  name: 'Mit Fallback-Initialen',
  render: () => (
    <Avatar>
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  name: 'Alle Groessen',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="sm">
        <AvatarFallback size="sm">SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback size="md">MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback size="lg">LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback size="xl">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const AvatarGroup: Story = {
  name: 'Avatar-Gruppe',
  render: () => (
    <div style={{ display: 'flex' }}>
      {['AN', 'BM', 'CK', 'DL'].map((initials, i) => (
        <div key={initials} style={{ marginLeft: i > 0 ? '-8px' : '0' }}>
          <Avatar className="ring-2 ring-white">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  ),
};

export const AthleteAvatar: Story = {
  name: 'Training: Athleten-Avatar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar size="lg">
          <AvatarImage
            src="https://i.pravatar.cc/150?u=athlete1"
            alt="Max Mueller"
          />
          <AvatarFallback size="lg">MM</AvatarFallback>
        </Avatar>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>Max Mueller</p>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>Laufen / Triathlon</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar size="lg">
          <AvatarFallback size="lg">SK</AvatarFallback>
        </Avatar>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>Sarah Klein</p>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>Krafttraining</p>
        </div>
      </div>
    </div>
  ),
};
