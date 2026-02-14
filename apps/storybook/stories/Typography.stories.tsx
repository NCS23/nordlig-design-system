import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

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

/* ── Level 1 — Base ── */
const fontFamilies = [
  { name: 'sans', value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", cssVar: '--font-base-family-sans' },
  { name: 'serif', value: "'Merriweather', Georgia, serif", cssVar: '--font-base-family-serif' },
  { name: 'mono', value: "'JetBrains Mono', 'Fira Code', monospace", cssVar: '--font-base-family-mono' },
];

const fontSizes = [
  { name: 'xs', size: '0.75rem', px: '12px', cssVar: '--font-base-size-xs' },
  { name: 'sm', size: '0.875rem', px: '14px', cssVar: '--font-base-size-sm' },
  { name: 'base', size: '1rem', px: '16px', cssVar: '--font-base-size-base' },
  { name: 'lg', size: '1.125rem', px: '18px', cssVar: '--font-base-size-lg' },
  { name: 'xl', size: '1.25rem', px: '20px', cssVar: '--font-base-size-xl' },
  { name: '2xl', size: '1.5rem', px: '24px', cssVar: '--font-base-size-2xl' },
  { name: '3xl', size: '1.875rem', px: '30px', cssVar: '--font-base-size-3xl' },
  { name: '4xl', size: '2.25rem', px: '36px', cssVar: '--font-base-size-4xl' },
  { name: '5xl', size: '3rem', px: '48px', cssVar: '--font-base-size-5xl' },
];

const fontWeights = [
  { name: 'light', weight: 300, cssVar: '--font-base-weight-light' },
  { name: 'normal', weight: 400, cssVar: '--font-base-weight-normal' },
  { name: 'medium', weight: 500, cssVar: '--font-base-weight-medium' },
  { name: 'semibold', weight: 600, cssVar: '--font-base-weight-semibold' },
  { name: 'bold', weight: 700, cssVar: '--font-base-weight-bold' },
];

const lineHeights = [
  { name: 'tight', value: 1.25, cssVar: '--font-base-line-height-tight' },
  { name: 'normal', value: 1.5, cssVar: '--font-base-line-height-normal' },
  { name: 'relaxed', value: 1.75, cssVar: '--font-base-line-height-relaxed' },
  { name: 'loose', value: 2, cssVar: '--font-base-line-height-loose' },
];

const letterSpacings = [
  { name: 'tight', value: '-0.025em', cssVar: '--font-base-letter-spacing-tight' },
  { name: 'normal', value: '0em', cssVar: '--font-base-letter-spacing-normal' },
  { name: 'wide', value: '0.025em', cssVar: '--font-base-letter-spacing-wide' },
];

/* ── Level 2 — Global ── */
const globalFontSizes = [
  { Token: 'xs', 'CSS Variable': '--font-size-xs', References: 'var(--font-base-size-xs)', Value: '0.75rem' },
  { Token: 'sm', 'CSS Variable': '--font-size-sm', References: 'var(--font-base-size-sm)', Value: '0.875rem' },
  { Token: 'base', 'CSS Variable': '--font-size-base', References: 'var(--font-base-size-base)', Value: '1rem' },
  { Token: 'lg', 'CSS Variable': '--font-size-lg', References: 'var(--font-base-size-lg)', Value: '1.125rem' },
  { Token: 'xl', 'CSS Variable': '--font-size-xl', References: 'var(--font-base-size-xl)', Value: '1.25rem' },
  { Token: '2xl', 'CSS Variable': '--font-size-2xl', References: 'var(--font-base-size-2xl)', Value: '1.5rem' },
  { Token: '3xl', 'CSS Variable': '--font-size-3xl', References: 'var(--font-base-size-3xl)', Value: '1.875rem' },
  { Token: '4xl', 'CSS Variable': '--font-size-4xl', References: 'var(--font-base-size-4xl)', Value: '2.25rem' },
  { Token: '5xl', 'CSS Variable': '--font-size-5xl', References: 'var(--font-base-size-5xl)', Value: '3rem' },
];

const globalFontWeights = [
  { Token: 'light', 'CSS Variable': '--font-weight-light', References: 'var(--font-base-weight-light)', Value: '300' },
  { Token: 'normal', 'CSS Variable': '--font-weight-normal', References: 'var(--font-base-weight-normal)', Value: '400' },
  { Token: 'medium', 'CSS Variable': '--font-weight-medium', References: 'var(--font-base-weight-medium)', Value: '500' },
  { Token: 'semibold', 'CSS Variable': '--font-weight-semibold', References: 'var(--font-base-weight-semibold)', Value: '600' },
  { Token: 'bold', 'CSS Variable': '--font-weight-bold', References: 'var(--font-base-weight-bold)', Value: '700' },
];

const globalFontFamilies = [
  { Token: 'sans', 'CSS Variable': '--font-family-sans', References: 'var(--font-base-family-sans)', Value: 'Inter, ...' },
  { Token: 'serif', 'CSS Variable': '--font-family-serif', References: 'var(--font-base-family-serif)', Value: 'Merriweather, ...' },
  { Token: 'mono', 'CSS Variable': '--font-family-mono', References: 'var(--font-base-family-mono)', Value: 'JetBrains Mono, ...' },
];

const globalLineHeights = [
  { Token: 'tight', 'CSS Variable': '--font-line-height-tight', References: 'var(--font-base-line-height-tight)', Value: '1.25' },
  { Token: 'normal', 'CSS Variable': '--font-line-height-normal', References: 'var(--font-base-line-height-normal)', Value: '1.5' },
  { Token: 'relaxed', 'CSS Variable': '--font-line-height-relaxed', References: 'var(--font-base-line-height-relaxed)', Value: '1.75' },
  { Token: 'loose', 'CSS Variable': '--font-line-height-loose', References: 'var(--font-base-line-height-loose)', Value: '2' },
];

const globalLetterSpacings = [
  { Token: 'tight', 'CSS Variable': '--font-letter-spacing-tight', References: 'var(--font-base-letter-spacing-tight)', Value: '-0.025em' },
  { Token: 'normal', 'CSS Variable': '--font-letter-spacing-normal', References: 'var(--font-base-letter-spacing-normal)', Value: '0em' },
  { Token: 'wide', 'CSS Variable': '--font-letter-spacing-wide', References: 'var(--font-base-letter-spacing-wide)', Value: '0.025em' },
];

/* ── Level 3 — Roles ── */
const roleComponentSizes = [
  { Token: 'component.size.sm', 'CSS Variable': '--font-component-size-sm', References: 'var(--font-size-sm)', Value: '0.875rem' },
  { Token: 'component.size.md', 'CSS Variable': '--font-component-size-md', References: 'var(--font-size-base)', Value: '1rem' },
  { Token: 'component.size.lg', 'CSS Variable': '--font-component-size-lg', References: 'var(--font-size-lg)', Value: '1.125rem' },
];

const roleHeadingSizes = [
  { Token: 'heading.size.sm', 'CSS Variable': '--font-heading-size-sm', References: 'var(--font-size-lg)', Value: '1.125rem' },
  { Token: 'heading.size.md', 'CSS Variable': '--font-heading-size-md', References: 'var(--font-size-xl)', Value: '1.25rem' },
  { Token: 'heading.size.lg', 'CSS Variable': '--font-heading-size-lg', References: 'var(--font-size-2xl)', Value: '1.5rem' },
  { Token: 'heading.size.xl', 'CSS Variable': '--font-heading-size-xl', References: 'var(--font-size-3xl)', Value: '1.875rem' },
];

const roleOtherSizes = [
  { Token: 'body.size', 'CSS Variable': '--font-body-size', References: 'var(--font-size-base)', Value: '1rem' },
  { Token: 'caption.size', 'CSS Variable': '--font-caption-size', References: 'var(--font-size-xs)', Value: '0.75rem' },
];

/* ── Level 4 — Component ── */
const buttonFontTokens = [
  { Token: 'btn.sm.font-size', 'CSS Variable': '--sizing-btn-sm-font-size', References: 'var(--font-component-size-sm)', Value: '0.875rem' },
  { Token: 'btn.md.font-size', 'CSS Variable': '--sizing-btn-md-font-size', References: 'var(--font-component-size-md)', Value: '1rem' },
  { Token: 'btn.lg.font-size', 'CSS Variable': '--sizing-btn-lg-font-size', References: 'var(--font-component-size-lg)', Value: '1.125rem' },
];

const badgeFontTokens = [
  { Token: 'badge.sm.font-size', 'CSS Variable': '--sizing-badge-sm-font-size', References: 'var(--font-component-size-sm)', Value: '0.875rem' },
  { Token: 'badge.md.font-size', 'CSS Variable': '--sizing-badge-md-font-size', References: 'var(--font-component-size-sm)', Value: '0.875rem' },
  { Token: 'badge.lg.font-size', 'CSS Variable': '--sizing-badge-lg-font-size', References: 'var(--font-component-size-md)', Value: '1rem' },
];

const inputFontTokens = [
  { Token: 'input.sm.font-size', 'CSS Variable': '--sizing-input-sm-font-size', References: 'var(--font-component-size-sm)', Value: '0.875rem' },
  { Token: 'input.md.font-size', 'CSS Variable': '--sizing-input-md-font-size', References: 'var(--font-component-size-md)', Value: '1rem' },
  { Token: 'input.lg.font-size', 'CSS Variable': '--sizing-input-lg-font-size', References: 'var(--font-component-size-lg)', Value: '1.125rem' },
];

function TypographyPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '960px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Typography Tokens</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        4-Layer Architektur: Base → Global → Roles → Semantic
      </p>

      {/* ── LEVEL 1 ── */}
      <Section title="Level 1 — Base Typography">
        <SubSection title="Font Families">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {fontFamilies.map(({ name, value, cssVar }) => (
              <div key={name}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px', fontFamily: 'monospace' }}>{cssVar}</div>
                <div style={{ fontSize: '24px', fontFamily: value, color: '#0f172a' }}>
                  The quick brown fox jumps over the lazy dog
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', marginTop: '4px' }}>{value}</div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Font Sizes">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                {['Token', 'CSS Variable', 'rem', 'px', 'Preview'].map((h) => (
                  <th key={h} style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fontSizes.map(({ name, size, px, cssVar }) => (
                <tr key={name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{name}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8', fontSize: '12px' }}>{cssVar}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#334155' }}>{size}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8' }}>{px}</td>
                  <td style={{ padding: '8px 12px', fontSize: size, color: '#0f172a', lineHeight: 1.3 }}>Nordlig</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SubSection>

        <SubSection title="Font Weights">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                {['Token', 'CSS Variable', 'Value', 'Preview'].map((h) => (
                  <th key={h} style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fontWeights.map(({ name, weight, cssVar }) => (
                <tr key={name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{name}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8', fontSize: '12px' }}>{cssVar}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#334155' }}>{weight}</td>
                  <td style={{ padding: '8px 12px', fontSize: '18px', fontWeight: weight, color: '#0f172a' }}>Design System</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SubSection>

        <SubSection title="Line Heights">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                {['Token', 'CSS Variable', 'Value', 'Preview'].map((h) => (
                  <th key={h} style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lineHeights.map(({ name, value, cssVar }) => (
                <tr key={name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{name}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8', fontSize: '12px' }}>{cssVar}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#334155' }}>{value}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <div style={{ fontSize: '14px', lineHeight: value, color: '#0f172a', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', maxWidth: '280px' }}>
                      Tokens sorgen fuer konsistenten Zeilenabstand im Design System.
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SubSection>

        <SubSection title="Letter Spacing">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                {['Token', 'CSS Variable', 'Value', 'Preview'].map((h) => (
                  <th key={h} style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {letterSpacings.map(({ name, value, cssVar }) => (
                <tr key={name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{name}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8', fontSize: '12px' }}>{cssVar}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#334155' }}>{value}</td>
                  <td style={{ padding: '8px 12px', fontSize: '16px', letterSpacing: value, color: '#0f172a', fontWeight: 500 }}>NORDLIG DESIGN SYSTEM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SubSection>
      </Section>

      {/* ── LEVEL 2 ── */}
      <Section title="Level 2 — Global Typography">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Semantische Zuordnung der Base-Tokens. Alle globalen Tokens referenzieren Level 1.
        </p>
        <SubSection title="Font Sizes">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalFontSizes} color="#0ea5e9" />
        </SubSection>
        <SubSection title="Font Weights">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalFontWeights} color="#0ea5e9" />
        </SubSection>
        <SubSection title="Font Families">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalFontFamilies} color="#0ea5e9" />
        </SubSection>
        <SubSection title="Line Heights">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalLineHeights} color="#0ea5e9" />
        </SubSection>
        <SubSection title="Letter Spacing">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalLetterSpacings} color="#0ea5e9" />
        </SubSection>
      </Section>

      {/* ── LEVEL 3 ── */}
      <Section title="Level 3 — Role Typography">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Funktionale Rollen fuer Typografie. Alle Role-Tokens referenzieren Level 2.
        </p>
        <SubSection title="Component Sizes">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleComponentSizes} color="#6366f1" />
        </SubSection>
        <SubSection title="Heading Sizes">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleHeadingSizes} color="#6366f1" />
        </SubSection>
        <SubSection title="Body & Caption">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleOtherSizes} color="#6366f1" />
        </SubSection>
      </Section>

      {/* ── LEVEL 4 ── */}
      <Section title="Level 4 — Component Typography">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Komponentenspezifische Font-Tokens. Referenzieren ausschliesslich Level 3.
        </p>
        <SubSection title="Button Font Sizes">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={buttonFontTokens} color="#10b981" />
        </SubSection>
        <SubSection title="Badge Font Sizes">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={badgeFontTokens} color="#10b981" />
        </SubSection>
        <SubSection title="Input Font Sizes">
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={inputFontTokens} color="#10b981" />
        </SubSection>
        <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '12px', color: '#166534', fontFamily: 'monospace' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontFamily: 'inherit' }}>Referenzkette (Beispiel btn.md):</div>
          <div>--sizing-btn-md-font-size → var(--font-component-size-md) → var(--font-size-base) → var(--font-base-size-base) = 1rem</div>
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Typography',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <TypographyPage />,
};
