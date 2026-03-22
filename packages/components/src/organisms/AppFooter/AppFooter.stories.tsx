import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppFooter } from './AppFooter';
import { Text } from '../../atoms/Text';
import { Link } from '../../atoms/Link';
import { Separator } from '../../atoms/Separator';

const meta: Meta<typeof AppFooter> = {
  title: 'Organisms/AppFooter',
  component: AppFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppFooter>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Default',
  render: () => (
    <AppFooter>
      <Text variant="muted" size="sm">
        &copy; 2026 Nordlig Design System &middot; v1.0.0
      </Text>
    </AppFooter>
  ),
};

export const WithLinks: Story = {
  name: 'Mit Links',
  render: () => (
    <AppFooter>
      <div className="flex items-center gap-4">
        <Text variant="muted" size="sm">&copy; 2026 Nordlig</Text>
        <Separator orientation="vertical" className="h-4" />
        <Link href="#" size="sm">Impressum</Link>
        <Link href="#" size="sm">Datenschutz</Link>
        <Link href="#" size="sm">Kontakt</Link>
      </div>
    </AppFooter>
  ),
};

export const NoBorder: Story = {
  name: 'Ohne Rand',
  render: () => (
    <AppFooter bordered={false}>
      <Text variant="muted" size="sm">
        Kein oberer Rand
      </Text>
    </AppFooter>
  ),
};
