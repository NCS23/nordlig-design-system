import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingOverlay } from './LoadingOverlay';

/**
 * Halbtransparentes Lade-Overlay, das ueber einen Container gelegt wird.
 * Zeigt einen Spinner und optionalen Text, waehrend Inhalte geladen werden.
 */
const meta: Meta<typeof LoadingOverlay> = {
  title: 'Molecules/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Lade-Overlay mit Spinner und optionalem Text. Wird ueber einen Container mit position:relative gelegt. Unterstuetzt Backdrop-Blur und verschiedene Spinner-Groessen.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

/** Beispiel-Inhalt, der hinter dem Overlay sichtbar ist */
const SampleContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Trainingsdaten</p>
    <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
      Hier stehen die eigentlichen Inhalte, die waehrend des Ladevorgangs verdeckt werden.
    </p>
    <div style={{ display: 'flex', gap: '8px' }}>
      <span
        style={{
          padding: '2px 8px',
          borderRadius: '4px',
          backgroundColor: '#e2e8f0',
          fontSize: '12px',
        }}
      >
        Bankdruecken
      </span>
      <span
        style={{
          padding: '2px 8px',
          borderRadius: '4px',
          backgroundColor: '#e2e8f0',
          fontSize: '12px',
        }}
      >
        Kniebeuge
      </span>
    </div>
  </div>
);

/** Standard-Overlay ueber einem Container */
export const Default: Story = {
  render: () => (
    <div className="relative h-[200px] w-full border rounded-lg p-4">
      <SampleContent />
      <LoadingOverlay />
    </div>
  ),
};

/** Overlay mit Ladetext */
export const WithText: Story = {
  render: () => (
    <div className="relative h-[200px] w-full border rounded-lg p-4">
      <SampleContent />
      <LoadingOverlay text="Daten werden geladen..." />
    </div>
  ),
};

/** Overlay mit Backdrop-Blur-Effekt */
export const WithBlur: Story = {
  render: () => (
    <div className="relative h-[200px] w-full border rounded-lg p-4">
      <SampleContent />
      <LoadingOverlay blur text="Daten werden geladen..." />
    </div>
  ),
};

/** Overlay ausgeblendet — nur der Container-Inhalt ist sichtbar */
export const Hidden: Story = {
  render: () => (
    <div className="relative h-[200px] w-full border rounded-lg p-4">
      <SampleContent />
      <LoadingOverlay visible={false} />
    </div>
  ),
};

/** Drei verschiedene Spinner-Groessen */
export const SpinnerSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>sm</p>
        <div className="relative h-[200px] w-full border rounded-lg p-4">
          <SampleContent />
          <LoadingOverlay spinnerSize="sm" />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>md</p>
        <div className="relative h-[200px] w-full border rounded-lg p-4">
          <SampleContent />
          <LoadingOverlay spinnerSize="md" />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>lg</p>
        <div className="relative h-[200px] w-full border rounded-lg p-4">
          <SampleContent />
          <LoadingOverlay spinnerSize="lg" />
        </div>
      </div>
    </div>
  ),
};
