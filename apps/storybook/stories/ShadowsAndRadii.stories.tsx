import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>{title}</h3>
    {children}
  </div>
);

const TokenTable = ({ headers, rows, color }: { headers: string[]; rows: Record<string, string>[]; color: string }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '8px' }}>
    <thead>
      <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
        {headers.map((h) => (
          <th key={h} style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
          {headers.map((h) => (
            <td key={h} style={{ padding: '8px 12px', fontFamily: h === 'Token' ? 'inherit' : 'monospace', fontWeight: h === 'Token' ? 600 : 400, color: h === 'CSS Variable' ? color : h === 'Token' ? '#0f172a' : h === 'References' ? '#94a3b8' : '#334155', fontSize: h === 'CSS Variable' || h === 'References' ? '12px' : '13px' }}>{row[h]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

/* ── Shadows Level 1 ── */
const shadows = [
  { name: 'xs', value: '0 1px 2px rgba(0, 0, 0, 0.05)', cssVar: '--shadow-base-xs' },
  { name: 'sm', value: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)', cssVar: '--shadow-base-sm' },
  { name: 'md', value: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)', cssVar: '--shadow-base-md' },
  { name: 'lg', value: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)', cssVar: '--shadow-base-lg' },
  { name: 'xl', value: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)', cssVar: '--shadow-base-xl' },
  { name: '2xl', value: '0 25px 50px rgba(0, 0, 0, 0.25)', cssVar: '--shadow-base-2xl' },
];

/* ── Shadows Level 2 ── */
const globalShadows = [
  { Token: 'xs', 'CSS Variable': '--shadow-xs', References: 'var(--shadow-base-xs)', Value: '0 1px 2px ...' },
  { Token: 'sm', 'CSS Variable': '--shadow-sm', References: 'var(--shadow-base-sm)', Value: '0 1px 3px ...' },
  { Token: 'md', 'CSS Variable': '--shadow-md', References: 'var(--shadow-base-md)', Value: '0 4px 6px ...' },
  { Token: 'lg', 'CSS Variable': '--shadow-lg', References: 'var(--shadow-base-lg)', Value: '0 10px 15px ...' },
  { Token: 'xl', 'CSS Variable': '--shadow-xl', References: 'var(--shadow-base-xl)', Value: '0 20px 25px ...' },
  { Token: '2xl', 'CSS Variable': '--shadow-2xl', References: 'var(--shadow-base-2xl)', Value: '0 25px 50px ...' },
];

/* ── Shadows Level 3 ── */
const roleShadows = [
  { Token: 'elevation.low', 'CSS Variable': '--shadow-elevation-low', References: 'var(--shadow-sm)', Value: '0 1px 3px ...' },
  { Token: 'elevation.medium', 'CSS Variable': '--shadow-elevation-medium', References: 'var(--shadow-md)', Value: '0 4px 6px ...' },
  { Token: 'elevation.high', 'CSS Variable': '--shadow-elevation-high', References: 'var(--shadow-lg)', Value: '0 10px 15px ...' },
  { Token: 'elevation.overlay', 'CSS Variable': '--shadow-elevation-overlay', References: 'var(--shadow-xl)', Value: '0 20px 25px ...' },
];

/* ── Radii Level 1 ── */
const radii = [
  { name: 'none', value: '0px', cssVar: '--radius-base-none' },
  { name: 'sm', value: '0.125rem', cssVar: '--radius-base-sm' },
  { name: 'base', value: '0.25rem', cssVar: '--radius-base-base' },
  { name: 'md', value: '0.375rem', cssVar: '--radius-base-md' },
  { name: 'lg', value: '0.5rem', cssVar: '--radius-base-lg' },
  { name: 'xl', value: '0.75rem', cssVar: '--radius-base-xl' },
  { name: '2xl', value: '1rem', cssVar: '--radius-base-2xl' },
  { name: '3xl', value: '1.5rem', cssVar: '--radius-base-3xl' },
  { name: 'full', value: '9999px', cssVar: '--radius-base-full' },
];

/* ── Radii Level 2 ── */
const globalRadii = [
  { Token: 'none', 'CSS Variable': '--radius-none', References: 'var(--radius-base-none)', Value: '0px' },
  { Token: 'sm', 'CSS Variable': '--radius-sm', References: 'var(--radius-base-sm)', Value: '0.125rem' },
  { Token: 'default', 'CSS Variable': '--radius-default', References: 'var(--radius-base-base)', Value: '0.25rem' },
  { Token: 'md', 'CSS Variable': '--radius-md', References: 'var(--radius-base-md)', Value: '0.375rem' },
  { Token: 'lg', 'CSS Variable': '--radius-lg', References: 'var(--radius-base-lg)', Value: '0.5rem' },
  { Token: 'xl', 'CSS Variable': '--radius-xl', References: 'var(--radius-base-xl)', Value: '0.75rem' },
  { Token: '2xl', 'CSS Variable': '--radius-2xl', References: 'var(--radius-base-2xl)', Value: '1rem' },
  { Token: '3xl', 'CSS Variable': '--radius-3xl', References: 'var(--radius-base-3xl)', Value: '1.5rem' },
  { Token: 'full', 'CSS Variable': '--radius-full', References: 'var(--radius-base-full)', Value: '9999px' },
];

/* ── Radii Level 3 ── */
const roleRadii = [
  { Token: 'component.sm', 'CSS Variable': '--radius-component-sm', References: 'var(--radius-sm)', Value: '0.125rem' },
  { Token: 'component.md', 'CSS Variable': '--radius-component-md', References: 'var(--radius-md)', Value: '0.375rem' },
  { Token: 'component.lg', 'CSS Variable': '--radius-component-lg', References: 'var(--radius-lg)', Value: '0.5rem' },
  { Token: 'component.full', 'CSS Variable': '--radius-component-full', References: 'var(--radius-full)', Value: '9999px' },
];

/* ── Shadows Level 4 ── */
const componentShadows = [
  { Token: 'card.raised', 'CSS Variable': '--shadow-card-raised', References: 'var(--shadow-elevation-low)', Value: '0 1px 3px ...' },
  { Token: 'card.elevated', 'CSS Variable': '--shadow-card-elevated', References: 'var(--shadow-elevation-medium)', Value: '0 4px 6px ...' },
  { Token: 'card.hover', 'CSS Variable': '--shadow-card-hover', References: 'var(--shadow-elevation-high)', Value: '0 10px 15px ...' },
  { Token: 'datepicker.popover', 'CSS Variable': '--shadow-datepicker-popover', References: 'var(--shadow-elevation-medium)', Value: '0 4px 6px ...' },
  { Token: 'modal.content', 'CSS Variable': '--shadow-modal-content', References: 'var(--shadow-elevation-overlay)', Value: '0 20px 25px ...' },
  { Token: 'select.popover', 'CSS Variable': '--shadow-select-popover', References: 'var(--shadow-elevation-medium)', Value: '0 4px 6px ...' },
  { Token: 'switch.thumb', 'CSS Variable': '--shadow-switch-thumb', References: 'var(--shadow-elevation-low)', Value: '0 1px 3px ...' },
  { Token: 'toast', 'CSS Variable': '--shadow-toast', References: 'var(--shadow-elevation-medium)', Value: '0 4px 6px ...' },
];

/* ── Radii Level 4 ── */
const componentRadii = [
  { Token: 'btn.sm.radius', 'CSS Variable': '--sizing-btn-sm-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'btn.md.radius', 'CSS Variable': '--sizing-btn-md-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'btn.lg.radius', 'CSS Variable': '--sizing-btn-lg-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'badge', 'CSS Variable': '--radius-badge', References: 'var(--radius-component-full)', Value: '9999px' },
  { Token: 'card', 'CSS Variable': '--radius-card', References: 'var(--radius-component-lg)', Value: '0.5rem' },
  { Token: 'checkbox', 'CSS Variable': '--radius-checkbox', References: 'var(--radius-component-sm)', Value: '0.125rem' },
  { Token: 'datepicker.popover', 'CSS Variable': '--radius-datepicker-popover', References: 'var(--radius-component-lg)', Value: '0.5rem' },
  { Token: 'datepicker.day', 'CSS Variable': '--radius-datepicker-day', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'fileupload.zone', 'CSS Variable': '--radius-fileupload-zone', References: 'var(--radius-component-lg)', Value: '0.5rem' },
  { Token: 'fileupload.item', 'CSS Variable': '--radius-fileupload-item', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'fileupload.progress', 'CSS Variable': '--radius-fileupload-progress', References: 'var(--radius-component-full)', Value: '9999px' },
  { Token: 'modal', 'CSS Variable': '--radius-modal', References: 'var(--radius-component-lg)', Value: '0.5rem' },
  { Token: 'radio.item', 'CSS Variable': '--radius-radio-item', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'select.popover', 'CSS Variable': '--radius-select-popover', References: 'var(--radius-component-lg)', Value: '0.5rem' },
  { Token: 'select.item', 'CSS Variable': '--radius-select-item', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'toast', 'CSS Variable': '--radius-toast', References: 'var(--radius-component-lg)', Value: '0.5rem' },
  { Token: 'input.sm.radius', 'CSS Variable': '--sizing-input-sm-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'input.md.radius', 'CSS Variable': '--sizing-input-md-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'input.lg.radius', 'CSS Variable': '--sizing-input-lg-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'progress', 'CSS Variable': '--radius-progress', References: 'var(--radius-component-full)', Value: '9999px' },
  { Token: 'skeleton', 'CSS Variable': '--radius-skeleton', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'skeleton-circle', 'CSS Variable': '--radius-skeleton-circle', References: 'var(--radius-component-full)', Value: '9999px' },
];

function ShadowsAndRadiiPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '960px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Shadows & Border Radius</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        4-Layer Architektur: Base → Global → Roles → Semantic
      </p>

      {/* ═══════════ SHADOWS ═══════════ */}
      <div style={{ marginBottom: '16px', padding: '8px 16px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Shadows</span>
      </div>

      <Section title="Level 1 — Base Shadows">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
          {shadows.map(({ name, value }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{ width: '100%', height: '80px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: value, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{name}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', marginTop: '8px' }}>--shadow-base-{name}</div>
            </div>
          ))}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              {['Token', 'CSS Variable', 'Value'].map((h) => (
                <th key={h} style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shadows.map(({ name, value, cssVar }) => (
              <tr key={name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{name}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8', fontSize: '12px' }}>{cssVar}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#334155', fontSize: '12px' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Level 2 — Global Shadows">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Semantische Zuordnung der Base-Shadow-Tokens. Alle globalen Tokens referenzieren Level 1.
        </p>
        <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalShadows} color="#0ea5e9" />
      </Section>

      <Section title="Level 3 — Role Shadows">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Elevation-Rollen fuer funktionale Zuordnung. Referenzieren Level 2.
        </p>
        <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleShadows} color="#6366f1" />
      </Section>

      <Section title="Level 4 — Component Shadows">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Komponentenspezifische Shadow-Tokens. Referenzieren ausschliesslich Level 3.
        </p>
        <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={componentShadows} color="#10b981" />
        <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '12px', color: '#166534', fontFamily: 'monospace' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontFamily: 'inherit' }}>Referenzkette (Beispiel card.elevated):</div>
          <div>--shadow-card-elevated → var(--shadow-elevation-medium) → var(--shadow-md) → var(--shadow-base-md) = 0 4px 6px ...</div>
        </div>
      </Section>

      {/* ═══════════ BORDER RADIUS ═══════════ */}
      <div style={{ marginBottom: '16px', padding: '8px 16px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Border Radius</span>
      </div>

      <Section title="Level 1 — Base Border Radius">
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {radii.map(({ name, value }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#0ea5e9', borderRadius: value }} />
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155', marginTop: '8px' }}>{name}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>{value}</div>
            </div>
          ))}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              {['Token', 'CSS Variable', 'Value'].map((h) => (
                <th key={h} style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {radii.map(({ name, value, cssVar }) => (
              <tr key={name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{name}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8', fontSize: '12px' }}>{cssVar}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#334155' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Level 2 — Global Border Radius">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Semantische Zuordnung der Base-Radius-Tokens. Alle globalen Tokens referenzieren Level 1.
        </p>
        <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalRadii} color="#0ea5e9" />
      </Section>

      <Section title="Level 3 — Role Border Radius">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Funktionale Radius-Rollen fuer Komponenten. Referenzieren Level 2.
        </p>
        <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleRadii} color="#6366f1" />
      </Section>

      <Section title="Level 4 — Component Border Radius">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Komponentenspezifische Radius-Tokens. Referenzieren ausschliesslich Level 3.
        </p>
        <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={componentRadii} color="#10b981" />
        <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '12px', color: '#166534', fontFamily: 'monospace' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontFamily: 'inherit' }}>Referenzkette (Beispiel btn.md.radius):</div>
          <div>--sizing-btn-md-radius → var(--radius-component-md) → var(--radius-md) → var(--radius-base-md) = 0.375rem</div>
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Shadows & Radii',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <ShadowsAndRadiiPage />,
};
