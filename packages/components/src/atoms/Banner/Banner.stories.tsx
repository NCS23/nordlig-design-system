import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Banner } from './Banner';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Banner> = {
  title: 'Atoms/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Dies ist eine informative Benachrichtigung.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Die Aktion wurde erfolgreich abgeschlossen.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Achtung: Bitte überprüfen Sie Ihre Eingaben.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Banner variant="info">
        Info: Dies ist eine informative Benachrichtigung.
      </Banner>
      <Banner variant="success">
        Erfolg: Die Aktion wurde erfolgreich abgeschlossen.
      </Banner>
      <Banner variant="warning">
        Warnung: Bitte überprüfen Sie Ihre Eingaben.
      </Banner>
      <Banner variant="error">
        Fehler: Ein Fehler ist aufgetreten.
      </Banner>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <Button variant="secondary" size="sm" onClick={() => setVisible(true)}>
          Banner wieder anzeigen
        </Button>
      );
    }

    return (
      <Banner variant="info" dismissible onDismiss={() => setVisible(false)}>
        Diese Benachrichtigung kann geschlossen werden.
      </Banner>
    );
  },
};

export const WithAction: Story = {
  args: {
    variant: 'warning',
    children: 'Ein Update ist verfügbar.',
    action: <Button size="sm" variant="secondary">Aktion</Button>,
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    icon: <span>🔔</span>,
    children: 'Benachrichtigung mit benutzerdefiniertem Icon.',
  },
};
