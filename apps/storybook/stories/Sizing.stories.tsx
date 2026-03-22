import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>{title}</h3>
    {children}
  </div>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '28px' }}>
    <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#334155' }}>{title}</h4>
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

/* ── Level 1 — Base (referenced spacing tokens) ── */
const baseSpacingTokens = [
  { Token: 'spacing.base.1-5', 'CSS Variable': '--spacing-base-1-5', Value: '6px' },
  { Token: 'spacing.base.2', 'CSS Variable': '--spacing-base-2', Value: '8px' },
  { Token: 'spacing.base.2-5', 'CSS Variable': '--spacing-base-2-5', Value: '10px' },
  { Token: 'spacing.base.3', 'CSS Variable': '--spacing-base-3', Value: '12px' },
  { Token: 'spacing.base.4', 'CSS Variable': '--spacing-base-4', Value: '16px' },
  { Token: 'spacing.base.8', 'CSS Variable': '--spacing-base-8', Value: '32px' },
  { Token: 'spacing.base.9', 'CSS Variable': '--spacing-base-9', Value: '36px' },
  { Token: 'spacing.base.10', 'CSS Variable': '--spacing-base-10', Value: '40px' },
  { Token: 'spacing.base.11', 'CSS Variable': '--spacing-base-11', Value: '44px' },
];

/* ── Level 2 — Global Sizing ── */
const globalSizingHeight = [
  { Token: 'height.sm', 'CSS Variable': '--sizing-height-sm', References: 'var(--spacing-base-9)', Value: '36px' },
  { Token: 'height.md', 'CSS Variable': '--sizing-height-md', References: 'var(--spacing-base-10)', Value: '40px' },
  { Token: 'height.lg', 'CSS Variable': '--sizing-height-lg', References: 'var(--spacing-base-11)', Value: '44px' },
];

const globalSizingPaddingX = [
  { Token: 'padding-x.sm', 'CSS Variable': '--sizing-padding-x-sm', References: 'var(--spacing-base-3)', Value: '12px' },
  { Token: 'padding-x.md', 'CSS Variable': '--sizing-padding-x-md', References: 'var(--spacing-base-4)', Value: '16px' },
  { Token: 'padding-x.lg', 'CSS Variable': '--sizing-padding-x-lg', References: 'var(--spacing-base-8)', Value: '32px' },
];

const globalSizingPaddingY = [
  { Token: 'padding-y.sm', 'CSS Variable': '--sizing-padding-y-sm', References: 'var(--spacing-base-1-5)', Value: '6px' },
  { Token: 'padding-y.md', 'CSS Variable': '--sizing-padding-y-md', References: 'var(--spacing-base-2)', Value: '8px' },
  { Token: 'padding-y.lg', 'CSS Variable': '--sizing-padding-y-lg', References: 'var(--spacing-base-2-5)', Value: '10px' },
  { Token: 'padding-y.xl', 'CSS Variable': '--sizing-padding-y-xl', References: 'var(--spacing-base-3)', Value: '12px' },
];

const globalSizingGap = [
  { Token: 'gap.sm', 'CSS Variable': '--sizing-gap-sm', References: 'var(--spacing-base-1-5)', Value: '6px' },
  { Token: 'gap.md', 'CSS Variable': '--sizing-gap-md', References: 'var(--spacing-base-2)', Value: '8px' },
  { Token: 'gap.lg', 'CSS Variable': '--sizing-gap-lg', References: 'var(--spacing-base-2-5)', Value: '10px' },
];

/* ── Level 3 — Role Sizing ── */
const roleSizingHeight = [
  { Token: 'component.height.sm', 'CSS Variable': '--sizing-component-height-sm', References: 'var(--sizing-height-sm)', Value: '36px' },
  { Token: 'component.height.md', 'CSS Variable': '--sizing-component-height-md', References: 'var(--sizing-height-md)', Value: '40px' },
  { Token: 'component.height.lg', 'CSS Variable': '--sizing-component-height-lg', References: 'var(--sizing-height-lg)', Value: '44px' },
];

const roleSizingPaddingX = [
  { Token: 'component.padding-x.sm', 'CSS Variable': '--sizing-component-padding-x-sm', References: 'var(--sizing-padding-x-sm)', Value: '12px' },
  { Token: 'component.padding-x.md', 'CSS Variable': '--sizing-component-padding-x-md', References: 'var(--sizing-padding-x-md)', Value: '16px' },
  { Token: 'component.padding-x.lg', 'CSS Variable': '--sizing-component-padding-x-lg', References: 'var(--sizing-padding-x-lg)', Value: '32px' },
];

const roleSizingPaddingY = [
  { Token: 'component.padding-y.sm', 'CSS Variable': '--sizing-component-padding-y-sm', References: 'var(--sizing-padding-y-sm)', Value: '6px' },
  { Token: 'component.padding-y.md', 'CSS Variable': '--sizing-component-padding-y-md', References: 'var(--sizing-padding-y-md)', Value: '8px' },
  { Token: 'component.padding-y.lg', 'CSS Variable': '--sizing-component-padding-y-lg', References: 'var(--sizing-padding-y-lg)', Value: '10px' },
  { Token: 'component.padding-y.xl', 'CSS Variable': '--sizing-component-padding-y-xl', References: 'var(--sizing-padding-y-xl)', Value: '12px' },
];

const roleSizingGap = [
  { Token: 'component.gap.sm', 'CSS Variable': '--sizing-component-gap-sm', References: 'var(--sizing-gap-sm)', Value: '6px' },
  { Token: 'component.gap.md', 'CSS Variable': '--sizing-component-gap-md', References: 'var(--sizing-gap-md)', Value: '8px' },
  { Token: 'component.gap.lg', 'CSS Variable': '--sizing-component-gap-lg', References: 'var(--sizing-gap-lg)', Value: '10px' },
];

/* ── Level 4 — Component Button Sizing ── */
const buttonSizes = [
  { size: 'sm', height: '36px', paddingX: '12px', paddingY: '6px', gap: '6px', fontSize: '0.875rem', radius: '0.375rem' },
  { size: 'md', height: '40px', paddingX: '16px', paddingY: '8px', gap: '8px', fontSize: '1rem', radius: '0.375rem' },
  { size: 'lg', height: '44px', paddingX: '32px', paddingY: '10px', gap: '10px', fontSize: '1.125rem', radius: '0.375rem' },
];

const buttonTokens = [
  { Token: 'btn.sm.height', 'CSS Variable': '--sizing-btn-sm-height', References: 'var(--sizing-component-height-sm)', Value: '36px' },
  { Token: 'btn.sm.padding-x', 'CSS Variable': '--sizing-btn-sm-padding-x', References: 'var(--sizing-component-padding-x-sm)', Value: '12px' },
  { Token: 'btn.sm.padding-y', 'CSS Variable': '--sizing-btn-sm-padding-y', References: 'var(--sizing-component-padding-y-sm)', Value: '6px' },
  { Token: 'btn.sm.gap', 'CSS Variable': '--sizing-btn-sm-gap', References: 'var(--sizing-component-gap-sm)', Value: '6px' },
  { Token: 'btn.sm.font-size', 'CSS Variable': '--sizing-btn-sm-font-size', References: 'var(--font-component-size-sm)', Value: '0.875rem' },
  { Token: 'btn.sm.radius', 'CSS Variable': '--sizing-btn-sm-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'btn.md.height', 'CSS Variable': '--sizing-btn-md-height', References: 'var(--sizing-component-height-md)', Value: '40px' },
  { Token: 'btn.md.padding-x', 'CSS Variable': '--sizing-btn-md-padding-x', References: 'var(--sizing-component-padding-x-md)', Value: '16px' },
  { Token: 'btn.md.padding-y', 'CSS Variable': '--sizing-btn-md-padding-y', References: 'var(--sizing-component-padding-y-md)', Value: '8px' },
  { Token: 'btn.md.gap', 'CSS Variable': '--sizing-btn-md-gap', References: 'var(--sizing-component-gap-md)', Value: '8px' },
  { Token: 'btn.md.font-size', 'CSS Variable': '--sizing-btn-md-font-size', References: 'var(--font-component-size-md)', Value: '1rem' },
  { Token: 'btn.md.radius', 'CSS Variable': '--sizing-btn-md-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'btn.lg.height', 'CSS Variable': '--sizing-btn-lg-height', References: 'var(--sizing-component-height-lg)', Value: '44px' },
  { Token: 'btn.lg.padding-x', 'CSS Variable': '--sizing-btn-lg-padding-x', References: 'var(--sizing-component-padding-x-lg)', Value: '32px' },
  { Token: 'btn.lg.padding-y', 'CSS Variable': '--sizing-btn-lg-padding-y', References: 'var(--sizing-component-padding-y-lg)', Value: '10px' },
  { Token: 'btn.lg.gap', 'CSS Variable': '--sizing-btn-lg-gap', References: 'var(--sizing-component-gap-lg)', Value: '10px' },
  { Token: 'btn.lg.font-size', 'CSS Variable': '--sizing-btn-lg-font-size', References: 'var(--font-component-size-lg)', Value: '1.125rem' },
  { Token: 'btn.lg.radius', 'CSS Variable': '--sizing-btn-lg-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
];

/* ── Level 4 — Component Badge Sizing ── */
const badgeTokens = [
  { Token: 'badge.sm.padding-x', 'CSS Variable': '--sizing-badge-sm-padding-x', References: 'var(--sizing-component-padding-x-sm)', Value: '12px' },
  { Token: 'badge.sm.padding-y', 'CSS Variable': '--sizing-badge-sm-padding-y', References: 'var(--sizing-component-padding-y-sm)', Value: '6px' },
  { Token: 'badge.sm.font-size', 'CSS Variable': '--sizing-badge-sm-font-size', References: 'var(--font-component-size-sm)', Value: '0.875rem' },
  { Token: 'badge.md.padding-x', 'CSS Variable': '--sizing-badge-md-padding-x', References: 'var(--sizing-component-padding-x-md)', Value: '16px' },
  { Token: 'badge.md.padding-y', 'CSS Variable': '--sizing-badge-md-padding-y', References: 'var(--sizing-component-padding-y-sm)', Value: '6px' },
  { Token: 'badge.md.font-size', 'CSS Variable': '--sizing-badge-md-font-size', References: 'var(--font-component-size-sm)', Value: '0.875rem' },
  { Token: 'badge.lg.padding-x', 'CSS Variable': '--sizing-badge-lg-padding-x', References: 'var(--sizing-component-padding-x-md)', Value: '16px' },
  { Token: 'badge.lg.padding-y', 'CSS Variable': '--sizing-badge-lg-padding-y', References: 'var(--sizing-component-padding-y-md)', Value: '8px' },
  { Token: 'badge.lg.font-size', 'CSS Variable': '--sizing-badge-lg-font-size', References: 'var(--font-component-size-md)', Value: '1rem' },
];

/* ── Level 4 — Component Input Sizing ── */
const inputTokens = [
  { Token: 'input.sm.height', 'CSS Variable': '--sizing-input-sm-height', References: 'var(--sizing-component-height-sm)', Value: '36px' },
  { Token: 'input.sm.font-size', 'CSS Variable': '--sizing-input-sm-font-size', References: 'var(--font-component-size-sm)', Value: '0.875rem' },
  { Token: 'input.sm.radius', 'CSS Variable': '--sizing-input-sm-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'input.md.height', 'CSS Variable': '--sizing-input-md-height', References: 'var(--sizing-component-height-md)', Value: '40px' },
  { Token: 'input.md.font-size', 'CSS Variable': '--sizing-input-md-font-size', References: 'var(--font-component-size-md)', Value: '1rem' },
  { Token: 'input.md.radius', 'CSS Variable': '--sizing-input-md-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
  { Token: 'input.lg.height', 'CSS Variable': '--sizing-input-lg-height', References: 'var(--sizing-component-height-lg)', Value: '44px' },
  { Token: 'input.lg.font-size', 'CSS Variable': '--sizing-input-lg-font-size', References: 'var(--font-component-size-lg)', Value: '1.125rem' },
  { Token: 'input.lg.radius', 'CSS Variable': '--sizing-input-lg-radius', References: 'var(--radius-component-md)', Value: '0.375rem' },
];

/* ── Level 4 — Component Progress Sizing ── */
const progressTokens = [
  { Token: 'progress.sm.height', 'CSS Variable': '--sizing-progress-sm-height', References: 'var(--spacing-base-1)', Value: '4px' },
  { Token: 'progress.md.height', 'CSS Variable': '--sizing-progress-md-height', References: 'var(--spacing-base-2)', Value: '8px' },
  { Token: 'progress.lg.height', 'CSS Variable': '--sizing-progress-lg-height', References: 'var(--spacing-base-3)', Value: '12px' },
];

/* ── Level 4 — Component Spinner Sizing ── */
const spinnerTokens = [
  { Token: 'spinner.sm', 'CSS Variable': '--sizing-spinner-sm', References: 'var(--spacing-base-4)', Value: '16px' },
  { Token: 'spinner.md', 'CSS Variable': '--sizing-spinner-md', References: 'var(--spacing-base-6)', Value: '24px' },
  { Token: 'spinner.lg', 'CSS Variable': '--sizing-spinner-lg', References: 'var(--spacing-base-8)', Value: '32px' },
  { Token: 'spinner.xl', 'CSS Variable': '--sizing-spinner-xl', References: 'var(--spacing-base-12)', Value: '48px' },
];

/* ── Level 1 — Fixed Sizing (non-referencing) ── */
const fixedSizingTokens = [
  { Token: 'datepicker.day-size', 'CSS Variable': '--sizing-datepicker-day-size', References: '(fixed)', Value: '36px' },
  { Token: 'textarea.min-height', 'CSS Variable': '--sizing-textarea-min-height', References: '(fixed)', Value: '100px' },
  { Token: 'textarea.max-height', 'CSS Variable': '--sizing-textarea-max-height', References: '(fixed)', Value: '400px' },
];

const SizePreview = ({ size, height, paddingX, paddingY }: typeof buttonSizes[0]) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
    <div style={{ width: '40px', fontSize: '14px', fontWeight: 600, color: '#334155' }}>{size}</div>
    <div
      style={{
        height,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        backgroundColor: '#0ea5e9',
        color: '#fff',
        borderRadius: '0.375rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
        fontWeight: 500,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      Button {size}
    </div>
  </div>
);

function SizingPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '960px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Sizing Tokens</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        4-Layer Architektur: Base → Global → Roles → Semantic
      </p>

      {/* ── LEVEL 1 ── */}
      <Section title="Level 1 — Referenzierte Base Tokens">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Sizing-Tokens verwenden Base-Spacing-Tokens als Grundlage fuer Komponentendimensionen.
        </p>
        <TokenTable headers={['Token', 'CSS Variable', 'Value']} rows={baseSpacingTokens} color="#94a3b8" />
      </Section>

      {/* ── LEVEL 2 ── */}
      <Section title="Level 2 — Global Sizing">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Semantische Groessen-Zuordnung. Referenzieren Level-1-Base-Tokens.
        </p>
        <SubSection title="Heights">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalSizingHeight} color="#0ea5e9" />
        </SubSection>
        <SubSection title="Padding X">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalSizingPaddingX} color="#0ea5e9" />
        </SubSection>
        <SubSection title="Padding Y">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalSizingPaddingY} color="#0ea5e9" />
        </SubSection>
        <SubSection title="Gap">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalSizingGap} color="#0ea5e9" />
        </SubSection>
      </Section>

      {/* ── LEVEL 3 ── */}
      <Section title="Level 3 — Role Sizing">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Funktionale Komponentengroessen. Referenzieren Level 2.
        </p>
        <SubSection title="Component Heights">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleSizingHeight} color="#6366f1" />
        </SubSection>
        <SubSection title="Component Padding X">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleSizingPaddingX} color="#6366f1" />
        </SubSection>
        <SubSection title="Component Padding Y">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleSizingPaddingY} color="#6366f1" />
        </SubSection>
        <SubSection title="Component Gap">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleSizingGap} color="#6366f1" />
        </SubSection>
      </Section>

      {/* ── LEVEL 4 ── */}
      <Section title="Level 4 — Component Sizing">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Komponentenspezifische Sizing-Tokens. Referenzieren ausschliesslich Level 3.
        </p>

        <SubSection title="Button — Preview">
          {buttonSizes.map((s) => (
            <SizePreview key={s.size} {...s} />
          ))}
        </SubSection>

        <SubSection title="Button — Alle Tokens">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={buttonTokens} color="#10b981" />
        </SubSection>

        <SubSection title="Badge">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={badgeTokens} color="#10b981" />
        </SubSection>

        <SubSection title="Input">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={inputTokens} color="#10b981" />
        </SubSection>

        <SubSection title="Progress">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={progressTokens} color="#10b981" />
        </SubSection>

        <SubSection title="Spinner">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={spinnerTokens} color="#10b981" />
        </SubSection>

        <SubSection title="Feste Groessen (ohne Referenzkette)">
          <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '13px' }}>
            Diese Tokens verwenden feste Pixelwerte ohne Referenz auf die Token-Hierarchie.
          </p>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={fixedSizingTokens} color="#10b981" />
        </SubSection>

        <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '12px', color: '#166534', fontFamily: 'monospace' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontFamily: 'inherit' }}>Referenzkette (Beispiel btn.md.height):</div>
          <div>--sizing-btn-md-height → var(--sizing-component-height-md) → var(--sizing-height-md) → var(--spacing-base-10) = 40px</div>
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Sizing',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <SizingPage />,
};
