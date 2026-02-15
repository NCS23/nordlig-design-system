import type { Meta, StoryObj } from '@storybook/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './InputOTP';

const meta: Meta<typeof InputOTP> = {
  title: 'Atoms/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: 'number',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'OTP-Eingabefeld fuer Verifizierungscodes. Basiert auf input-otp und unterstuetzt beliebige Laengen, Gruppen und Separatoren.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

// Standard: 6-stelliger OTP-Code
export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

// 4-stelliger PIN
export const FourDigit: Story = {
  name: '4-Digit PIN',
  render: () => (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

// 6 Ziffern in 2 Gruppen mit Separator
export const WithGroups: Story = {
  name: 'With Groups',
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

// Fehlerzustand
export const WithError: Story = {
  name: 'Error State',
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} error>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

// Deaktiviert
export const Disabled: Story = {
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} disabled>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

// Design Token Dokumentation
export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Verwendete Design Tokens</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">Wert</th>
            <th className="text-left py-2 pr-4 font-medium">Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-inputotp-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#ffffff</td>
            <td className="py-2 pr-4">Slot-Hintergrund</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-inputotp-bg-disabled</td>
            <td className="py-2 pr-4 font-mono text-xs">#f1f5f9</td>
            <td className="py-2 pr-4">Deaktivierter Hintergrund</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-inputotp-text</td>
            <td className="py-2 pr-4 font-mono text-xs">#0f172a</td>
            <td className="py-2 pr-4">Ziffern-Text</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-inputotp-border</td>
            <td className="py-2 pr-4 font-mono text-xs">#cbd5e1</td>
            <td className="py-2 pr-4">Slot-Rahmen</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-inputotp-border-focus</td>
            <td className="py-2 pr-4 font-mono text-xs">#0ea5e9</td>
            <td className="py-2 pr-4">Fokus-Ring</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-inputotp-border-error</td>
            <td className="py-2 pr-4 font-mono text-xs">#ef4444</td>
            <td className="py-2 pr-4">Fehler-Rahmen</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-inputotp-caret</td>
            <td className="py-2 pr-4 font-mono text-xs">#0284c7</td>
            <td className="py-2 pr-4">Blinkender Cursor</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-inputotp-separator</td>
            <td className="py-2 pr-4 font-mono text-xs">#475569</td>
            <td className="py-2 pr-4">Separator-Farbe</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--sizing-inputotp-slot-size</td>
            <td className="py-2 pr-4 font-mono text-xs">40px</td>
            <td className="py-2 pr-4">Slot-Abmessungen (Breite und Hoehe)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-inputotp</td>
            <td className="py-2 pr-4 font-mono text-xs">6px</td>
            <td className="py-2 pr-4">Eckenradius</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-inputotp-gap</td>
            <td className="py-2 pr-4 font-mono text-xs">8px</td>
            <td className="py-2 pr-4">Abstand zwischen Slots</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-inputotp-group-gap</td>
            <td className="py-2 pr-4 font-mono text-xs">12px</td>
            <td className="py-2 pr-4">Abstand zwischen Gruppen</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
