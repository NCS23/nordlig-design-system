import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const ColorSwatch = ({ name, value, cssVar }: { name: string; value: string; cssVar: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        backgroundColor: value,
        border: '1px solid #e2e8f0',
        flexShrink: 0,
      }}
    />
    <div style={{ minWidth: 0 }}>
      <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>{cssVar}</div>
      <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>{value}</div>
    </div>
  </div>
);

const PaletteRow = ({ palette, shades }: { palette: string; shades: { shade: string; value: string }[] }) => (
  <div style={{ marginBottom: '24px' }}>
    <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#334155', textTransform: 'capitalize' }}>{palette}</h4>
    <div style={{ display: 'flex', gap: '2px', borderRadius: '8px', overflow: 'hidden' }}>
      {shades.map(({ shade, value }) => (
        <div
          key={shade}
          style={{
            flex: 1,
            height: '64px',
            backgroundColor: value,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '4px',
          }}
          title={`${palette}-${shade}: ${value}`}
        >
          <span style={{ fontSize: '10px', fontFamily: 'monospace', color: parseInt(shade) >= 500 ? '#fff' : '#1e293b' }}>{shade}</span>
        </div>
      ))}
    </div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>{title}</h3>
    {children}
  </div>
);

const basePalettes: Record<string, { shade: string; value: string }[]> = {
  sky: [
    { shade: '50', value: '#f0f9ff' }, { shade: '100', value: '#e0f2fe' }, { shade: '200', value: '#bae6fd' },
    { shade: '300', value: '#7dd3fc' }, { shade: '400', value: '#38bdf8' }, { shade: '500', value: '#0ea5e9' },
    { shade: '600', value: '#0284c7' }, { shade: '700', value: '#0369a1' }, { shade: '800', value: '#075985' },
    { shade: '900', value: '#0c4a6e' }, { shade: '950', value: '#082f49' },
  ],
  indigo: [
    { shade: '50', value: '#eef2ff' }, { shade: '100', value: '#e0e7ff' }, { shade: '200', value: '#c7d2fe' },
    { shade: '300', value: '#a5b4fc' }, { shade: '400', value: '#818cf8' }, { shade: '500', value: '#6366f1' },
    { shade: '600', value: '#4f46e5' }, { shade: '700', value: '#4338ca' }, { shade: '800', value: '#3730a3' },
    { shade: '900', value: '#312e81' }, { shade: '950', value: '#1e1b4b' },
  ],
  slate: [
    { shade: '50', value: '#f8fafc' }, { shade: '100', value: '#f1f5f9' }, { shade: '200', value: '#e2e8f0' },
    { shade: '300', value: '#cbd5e1' }, { shade: '400', value: '#94a3b8' }, { shade: '500', value: '#64748b' },
    { shade: '600', value: '#475569' }, { shade: '700', value: '#334155' }, { shade: '800', value: '#1e293b' },
    { shade: '900', value: '#0f172a' }, { shade: '950', value: '#020617' },
  ],
  emerald: [
    { shade: '50', value: '#ecfdf5' }, { shade: '100', value: '#d1fae5' }, { shade: '200', value: '#a7f3d0' },
    { shade: '300', value: '#6ee7b7' }, { shade: '400', value: '#34d399' }, { shade: '500', value: '#10b981' },
    { shade: '600', value: '#059669' }, { shade: '700', value: '#047857' }, { shade: '800', value: '#065f46' },
    { shade: '900', value: '#064e3b' }, { shade: '950', value: '#022c22' },
  ],
  amber: [
    { shade: '50', value: '#fffbeb' }, { shade: '100', value: '#fef3c7' }, { shade: '200', value: '#fde68a' },
    { shade: '300', value: '#fcd34d' }, { shade: '400', value: '#fbbf24' }, { shade: '500', value: '#f59e0b' },
    { shade: '600', value: '#d97706' }, { shade: '700', value: '#b45309' }, { shade: '800', value: '#92400e' },
    { shade: '900', value: '#78350f' }, { shade: '950', value: '#451a03' },
  ],
  red: [
    { shade: '50', value: '#fef2f2' }, { shade: '100', value: '#fee2e2' }, { shade: '200', value: '#fecaca' },
    { shade: '300', value: '#fca5a5' }, { shade: '400', value: '#f87171' }, { shade: '500', value: '#ef4444' },
    { shade: '600', value: '#dc2626' }, { shade: '700', value: '#b91c1c' }, { shade: '800', value: '#991b1b' },
    { shade: '900', value: '#7f1d1d' }, { shade: '950', value: '#450a0a' },
  ],
  blue: [
    { shade: '50', value: '#eff6ff' }, { shade: '100', value: '#dbeafe' }, { shade: '200', value: '#bfdbfe' },
    { shade: '300', value: '#93c5fd' }, { shade: '400', value: '#60a5fa' }, { shade: '500', value: '#3b82f6' },
    { shade: '600', value: '#2563eb' }, { shade: '700', value: '#1d4ed8' }, { shade: '800', value: '#1e40af' },
    { shade: '900', value: '#1e3a8a' }, { shade: '950', value: '#172554' },
  ],
  teal: [
    { shade: '50', value: '#f0fdfa' }, { shade: '100', value: '#ccfbf1' }, { shade: '200', value: '#99f6e4' },
    { shade: '300', value: '#5eead4' }, { shade: '400', value: '#2dd4bf' }, { shade: '500', value: '#14b8a6' },
    { shade: '600', value: '#0d9488' }, { shade: '700', value: '#0f766e' }, { shade: '800', value: '#115e59' },
    { shade: '900', value: '#134e4a' }, { shade: '950', value: '#042f2e' },
  ],
};

const roleColors = [
  { name: 'bg-base', value: '#f8fafc', cssVar: '--color-bg-base' },
  { name: 'bg-surface', value: '#f1f5f9', cssVar: '--color-bg-surface' },
  { name: 'bg-primary', value: '#0ea5e9', cssVar: '--color-bg-primary' },
  { name: 'bg-primary-hover', value: '#0284c7', cssVar: '--color-bg-primary-hover' },
  { name: 'bg-primary-active', value: '#0369a1', cssVar: '--color-bg-primary-active' },
  { name: 'bg-success', value: '#10b981', cssVar: '--color-bg-success' },
  { name: 'bg-warning', value: '#f59e0b', cssVar: '--color-bg-warning' },
  { name: 'bg-error', value: '#ef4444', cssVar: '--color-bg-error' },
  { name: 'bg-info', value: '#3b82f6', cssVar: '--color-bg-info' },
  { name: 'text-base', value: '#0f172a', cssVar: '--color-text-base' },
  { name: 'text-muted', value: '#475569', cssVar: '--color-text-muted' },
  { name: 'text-disabled', value: '#94a3b8', cssVar: '--color-text-disabled' },
  { name: 'text-primary', value: '#0284c7', cssVar: '--color-text-primary' },
  { name: 'border-default', value: '#cbd5e1', cssVar: '--color-border-default' },
  { name: 'border-focus', value: '#0ea5e9', cssVar: '--color-border-focus' },
  { name: 'border-error', value: '#ef4444', cssVar: '--color-border-error' },
];

const componentColors = [
  { name: 'btn-primary-bg', value: '#0ea5e9', cssVar: '--color-btn-primary-bg' },
  { name: 'btn-primary-hover', value: '#0284c7', cssVar: '--color-btn-primary-bg-hover' },
  { name: 'btn-primary-text', value: '#f8fafc', cssVar: '--color-btn-primary-text' },
  { name: 'btn-secondary-bg', value: '#f1f5f9', cssVar: '--color-btn-secondary-bg' },
  { name: 'btn-secondary-hover', value: '#e2e8f0', cssVar: '--color-btn-secondary-bg-hover' },
  { name: 'btn-secondary-active', value: '#cbd5e1', cssVar: '--color-btn-secondary-bg-active' },
  { name: 'btn-secondary-text', value: '#0f172a', cssVar: '--color-btn-secondary-text' },
  { name: 'btn-ghost-text', value: '#0284c7', cssVar: '--color-btn-ghost-text' },
  { name: 'btn-ghost-hover', value: '#f1f5f9', cssVar: '--color-btn-ghost-bg-hover' },
  { name: 'btn-ghost-active', value: '#e2e8f0', cssVar: '--color-btn-ghost-bg-active' },
  { name: 'btn-disabled-bg', value: '#cbd5e1', cssVar: '--color-btn-disabled-bg' },
  { name: 'btn-disabled-text', value: '#94a3b8', cssVar: '--color-btn-disabled-text' },
];


function ColorsPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '960px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Color Tokens</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        4-Layer Architektur: Base → Global → Roles → Semantic
      </p>

      <Section title="Level 1 — Base Palettes">
        {Object.entries(basePalettes).map(([name, shades]) => (
          <PaletteRow key={name} palette={name} shades={shades} />
        ))}
      </Section>

      <Section title="Level 2 — Theme Mapping">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary 1 → Sky</h4>
            <PaletteRow palette="primary-1" shades={basePalettes.sky} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary 2 → Indigo</h4>
            <PaletteRow palette="primary-2" shades={basePalettes.indigo} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
          {[
            { label: 'Accent 1 (Success)', color: '#10b981' },
            { label: 'Accent 2 (Warning)', color: '#f59e0b' },
            { label: 'Accent 3 (Error)', color: '#ef4444' },
            { label: 'Accent 4 (Info)', color: '#3b82f6' },
            { label: 'Accent 5 (Teal)', color: '#14b8a6' },
          ].map(({ label, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: color }} />
              <span style={{ fontSize: '13px', color: '#334155' }}>{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Level 3 — Role Colors">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {roleColors.map((c) => (
            <ColorSwatch key={c.name} {...c} />
          ))}
        </div>
      </Section>

      <Section title="Level 4 — Component: Button Colors">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {componentColors.map((c) => (
            <ColorSwatch key={c.name} {...c} />
          ))}
        </div>
      </Section>

    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Colors',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <ColorsPage />,
};
