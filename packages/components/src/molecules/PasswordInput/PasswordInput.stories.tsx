import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './PasswordInput';

/**
 * Passwort-Eingabefeld mit Toggle-Button fuer Sichtbarkeit und optionaler
 * Staerke-Anzeige. Basiert auf der Input-Varianten-API.
 */
const meta: Meta<typeof PasswordInput> = {
  title: 'Molecules/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
    strength: {
      control: 'select',
      options: ['weak', 'medium', 'strong'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Passwort-Eingabefeld mit Sichtbarkeits-Toggle und optionaler Staerke-Anzeige. Unterstuetzt sm/md/lg, Fehler- und Disabled-Zustand.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

/** Standard PasswordInput ohne Staerke-Anzeige */
export const Default: Story = {
  args: {
    placeholder: 'Passwort eingeben...',
  },
};

/** Sichtbarer Zustand — Toggle-Button wurde geklickt */
export const Visible: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);

    /*
     * Wir rendern das PasswordInput mit einem Standardwert und simulieren
     * den sichtbaren Zustand durch einen manuellen Klick auf den Toggle.
     * Da die Sichtbarkeit intern verwaltet wird, zeigen wir das Verhalten
     * ueber den Toggle-Button.
     */
    return (
      <div style={{ maxWidth: '320px' }}>
        <PasswordInput
          placeholder="Passwort eingeben..."
          defaultValue="GeheimesPasswort123"
        />
        <p style={{ fontSize: '12px', color: '#475569', marginTop: '8px' }}>
          Klicke auf das Augen-Icon, um die Sichtbarkeit zu wechseln.
        </p>
      </div>
    );
  },
};

/** Drei Eingabefelder mit unterschiedlicher Staerke-Anzeige */
export const WithStrength: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
      <div>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>Schwach</p>
        <PasswordInput defaultValue="abc" strength="weak" />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>Mittel</p>
        <PasswordInput defaultValue="Abc12345" strength="medium" />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>Stark</p>
        <PasswordInput defaultValue="S!cher3s_P@sswort" strength="strong" />
      </div>
    </div>
  ),
};

/** Alle drei Groessen nebeneinander */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', maxWidth: '720px' }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>sm</p>
        <PasswordInput inputSize="sm" placeholder="Klein" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>md</p>
        <PasswordInput inputSize="md" placeholder="Mittel" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>lg</p>
        <PasswordInput inputSize="lg" placeholder="Gross" />
      </div>
    </div>
  ),
};

/** Deaktiviertes Passwortfeld */
export const Disabled: Story = {
  args: {
    placeholder: 'Passwort eingeben...',
    disabled: true,
  },
};
