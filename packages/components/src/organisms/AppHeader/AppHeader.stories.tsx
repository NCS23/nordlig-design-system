import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Bell, Search, User } from 'lucide-react';
import { AppHeader } from './AppHeader';
import { Icon } from '../../atoms/Icon';
import { Heading } from '../../atoms/Heading';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Text } from '../../atoms/Text';
import { Link } from '../../atoms/Link';

const meta: Meta<typeof AppHeader> = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Default',
  render: () => (
    <AppHeader>
      <Icon icon={Home} size="md" />
      <Heading level={4}>Meine App</Heading>
    </AppHeader>
  ),
};

export const WithNavigation: Story = {
  name: 'Mit Navigation',
  render: () => (
    <AppHeader>
      <Icon icon={Home} size="md" />
      <Heading level={4}>Nordlig</Heading>
      <nav className="flex items-center gap-4 ml-8">
        <Link href="#">Dashboard</Link>
        <Link href="#">Trainings</Link>
        <Link href="#">Statistik</Link>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Icon icon={Search} size="sm" />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon icon={Bell} size="sm" />
          <Badge variant="error" size="xs">3</Badge>
        </Button>
        <Button variant="ghost" size="sm">
          <Icon icon={User} size="sm" />
        </Button>
      </div>
    </AppHeader>
  ),
};

export const Sticky: Story = {
  name: 'Sticky',
  render: () => (
    <div>
      <AppHeader sticky zIndex={10}>
        <Icon icon={Home} size="md" />
        <Heading level={4}>Sticky Header</Heading>
        <Text className="ml-auto" variant="muted">Scrolle nach unten</Text>
      </AppHeader>
      <div className="p-8 space-y-4">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="p-4 rounded-[var(--radius-component-md)] bg-[var(--color-bg-surface)] border border-[var(--color-border-muted)]"
          >
            <Text>Inhaltsblock {i + 1}</Text>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const NoBorder: Story = {
  name: 'Ohne Rand',
  render: () => (
    <AppHeader bordered={false}>
      <Icon icon={Home} size="md" />
      <Heading level={4}>Ohne Border</Heading>
    </AppHeader>
  ),
};

export const Flat: Story = {
  name: 'Flach (ohne Schatten)',
  render: () => (
    <AppHeader elevated={false}>
      <Icon icon={Home} size="md" />
      <Heading level={4}>Flacher Header</Heading>
    </AppHeader>
  ),
};
