import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Atoms/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none'],
    },
    aspectRatio: {
      control: 'number',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Bild-Komponente mit Lade-Status, Fehler-Fallback und flexiblen Varianten fuer Rundung und Objektanpassung. Nutzt token-basiertes Styling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

/** Standard-Darstellung mit einem Platzhalterbild */
export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Image
        src="https://picsum.photos/400/300"
        alt="Platzhalterbild"
      />
    </div>
  ),
};

/** Verschiedene Seitenverhaeltnisse: 16:9, 4:3 und 1:1 */
export const WithAspectRatio: Story = {
  name: 'Mit Seitenverhaeltnis',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ width: 240 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12 }}>16:9</p>
        <Image
          src="https://picsum.photos/400/300?random=1"
          alt="16:9 Bild"
          aspectRatio={16 / 9}
        />
      </div>
      <div style={{ width: 240 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12 }}>4:3</p>
        <Image
          src="https://picsum.photos/400/300?random=2"
          alt="4:3 Bild"
          aspectRatio={4 / 3}
        />
      </div>
      <div style={{ width: 240 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12 }}>1:1</p>
        <Image
          src="https://picsum.photos/400/300?random=3"
          alt="1:1 Bild"
          aspectRatio={1}
        />
      </div>
    </div>
  ),
};

/** Vergleich der objectFit-Varianten */
export const ObjectFitVariants: Story = {
  name: 'ObjectFit-Varianten',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      {(['cover', 'contain', 'fill', 'none'] as const).map((fit) => (
        <div key={fit} style={{ width: 200 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12 }}>{fit}</p>
          <Image
            src="https://picsum.photos/400/300?random=4"
            alt={`objectFit ${fit}`}
            objectFit={fit}
            aspectRatio={1}
          />
        </div>
      ))}
    </div>
  ),
};

/** Vergleich der Rundungs-Varianten */
export const RoundedVariants: Story = {
  name: 'Rundungs-Varianten',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <div key={r} style={{ width: 150 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12 }}>{r}</p>
          <Image
            src="https://picsum.photos/300/300?random=5"
            alt={`rounded ${r}`}
            rounded={r}
            aspectRatio={1}
          />
        </div>
      ))}
    </div>
  ),
};

/** Standard-Fallback bei fehlerhafter Bild-URL */
export const ErrorFallback: Story = {
  name: 'Fehler-Fallback (Standard)',
  render: () => (
    <div style={{ width: 300 }}>
      <Image
        src="https://broken-image.invalid/404.jpg"
        alt="Fehlerhaftes Bild"
        aspectRatio={16 / 9}
      />
    </div>
  ),
};

/** Benutzerdefinierter Fallback bei fehlerhafter Bild-URL */
export const CustomFallback: Story = {
  name: 'Benutzerdefinierter Fallback',
  render: () => (
    <div style={{ width: 300 }}>
      <Image
        src="https://broken-image.invalid/404.jpg"
        alt="Fehlerhaftes Bild"
        aspectRatio={16 / 9}
        fallback={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              backgroundColor: '#f0f0f0',
              color: '#999',
              fontSize: 14,
            }}
          >
            Bild nicht verfuegbar
          </div>
        }
      />
    </div>
  ),
};

/** Ladeverhalten mit gueltigem Bild */
export const Loading: Story = {
  name: 'Ladeverhalten',
  render: () => (
    <div style={{ width: 400 }}>
      <Image
        src="https://picsum.photos/800/600"
        alt="Grosses Bild"
        aspectRatio={4 / 3}
      />
    </div>
  ),
};
