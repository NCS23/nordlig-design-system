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

const SpacingBar = ({ name, value, cssVar, color = '#0ea5e9' }: { name: string; value: string; cssVar: string; color?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
    <div style={{ width: '80px', fontSize: '13px', fontWeight: 600, color: '#334155', textAlign: 'right' }}>{name}</div>
    <div
      style={{
        height: '20px',
        width: value,
        backgroundColor: color,
        borderRadius: '4px',
        minWidth: '2px',
      }}
    />
    <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>{cssVar}</div>
    <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>{value}</div>
  </div>
);

/* ── Level 1 — Base Scale ── */
const baseScale = [
  { name: '0', value: '0px', cssVar: '--spacing-base-0' },
  { name: '0.5', value: '2px', cssVar: '--spacing-base-0-5' },
  { name: '1', value: '4px', cssVar: '--spacing-base-1' },
  { name: '1.5', value: '6px', cssVar: '--spacing-base-1-5' },
  { name: '2', value: '8px', cssVar: '--spacing-base-2' },
  { name: '2.5', value: '10px', cssVar: '--spacing-base-2-5' },
  { name: '3', value: '12px', cssVar: '--spacing-base-3' },
  { name: '3.5', value: '14px', cssVar: '--spacing-base-3-5' },
  { name: '4', value: '16px', cssVar: '--spacing-base-4' },
  { name: '5', value: '20px', cssVar: '--spacing-base-5' },
  { name: '6', value: '24px', cssVar: '--spacing-base-6' },
  { name: '7', value: '28px', cssVar: '--spacing-base-7' },
  { name: '8', value: '32px', cssVar: '--spacing-base-8' },
  { name: '9', value: '36px', cssVar: '--spacing-base-9' },
  { name: '10', value: '40px', cssVar: '--spacing-base-10' },
  { name: '11', value: '44px', cssVar: '--spacing-base-11' },
  { name: '12', value: '48px', cssVar: '--spacing-base-12' },
  { name: '14', value: '56px', cssVar: '--spacing-base-14' },
  { name: '16', value: '64px', cssVar: '--spacing-base-16' },
  { name: '20', value: '80px', cssVar: '--spacing-base-20' },
  { name: '24', value: '96px', cssVar: '--spacing-base-24' },
  { name: '28', value: '112px', cssVar: '--spacing-base-28' },
  { name: '32', value: '128px', cssVar: '--spacing-base-32' },
];

/* ── Level 2 — Global Semantic Sizes ── */
const globalSizes = [
  { name: 'xs', value: '8px', cssVar: '--spacing-xs' },
  { name: 'sm', value: '12px', cssVar: '--spacing-sm' },
  { name: 'md', value: '16px', cssVar: '--spacing-md' },
  { name: 'lg', value: '24px', cssVar: '--spacing-lg' },
  { name: 'xl', value: '32px', cssVar: '--spacing-xl' },
  { name: '2xl', value: '48px', cssVar: '--spacing-2xl' },
  { name: '3xl', value: '64px', cssVar: '--spacing-3xl' },
];

const globalSizesTable = [
  { Token: 'xs', 'CSS Variable': '--spacing-xs', References: 'var(--spacing-base-2)', Value: '8px' },
  { Token: 'sm', 'CSS Variable': '--spacing-sm', References: 'var(--spacing-base-3)', Value: '12px' },
  { Token: 'md', 'CSS Variable': '--spacing-md', References: 'var(--spacing-base-4)', Value: '16px' },
  { Token: 'lg', 'CSS Variable': '--spacing-lg', References: 'var(--spacing-base-6)', Value: '24px' },
  { Token: 'xl', 'CSS Variable': '--spacing-xl', References: 'var(--spacing-base-8)', Value: '32px' },
  { Token: '2xl', 'CSS Variable': '--spacing-2xl', References: 'var(--spacing-base-12)', Value: '48px' },
  { Token: '3xl', 'CSS Variable': '--spacing-3xl', References: 'var(--spacing-base-16)', Value: '64px' },
];

/* ── Level 3 — Role Spacing ── */
const rolePadding = [
  { name: 'xs', value: '8px', cssVar: '--spacing-component-padding-xs' },
  { name: 'sm', value: '12px', cssVar: '--spacing-component-padding-sm' },
  { name: 'md', value: '16px', cssVar: '--spacing-component-padding-md' },
  { name: 'lg', value: '24px', cssVar: '--spacing-component-padding-lg' },
  { name: 'xl', value: '32px', cssVar: '--spacing-component-padding-xl' },
];
const rolePaddingTable = [
  { Token: 'component.padding.xs', 'CSS Variable': '--spacing-component-padding-xs', References: 'var(--spacing-xs)', Value: '8px' },
  { Token: 'component.padding.sm', 'CSS Variable': '--spacing-component-padding-sm', References: 'var(--spacing-sm)', Value: '12px' },
  { Token: 'component.padding.md', 'CSS Variable': '--spacing-component-padding-md', References: 'var(--spacing-md)', Value: '16px' },
  { Token: 'component.padding.lg', 'CSS Variable': '--spacing-component-padding-lg', References: 'var(--spacing-lg)', Value: '24px' },
  { Token: 'component.padding.xl', 'CSS Variable': '--spacing-component-padding-xl', References: 'var(--spacing-xl)', Value: '32px' },
];

const roleGap = [
  { name: 'sm', value: '8px', cssVar: '--spacing-component-gap-sm' },
  { name: 'md', value: '12px', cssVar: '--spacing-component-gap-md' },
  { name: 'lg', value: '16px', cssVar: '--spacing-component-gap-lg' },
];
const roleGapTable = [
  { Token: 'component.gap.sm', 'CSS Variable': '--spacing-component-gap-sm', References: 'var(--spacing-xs)', Value: '8px' },
  { Token: 'component.gap.md', 'CSS Variable': '--spacing-component-gap-md', References: 'var(--spacing-sm)', Value: '12px' },
  { Token: 'component.gap.lg', 'CSS Variable': '--spacing-component-gap-lg', References: 'var(--spacing-md)', Value: '16px' },
];

const roleLayout = [
  { name: 'gutter', value: '24px', cssVar: '--spacing-layout-gutter' },
  { name: 'section', value: '48px', cssVar: '--spacing-layout-section' },
];
const roleLayoutTable = [
  { Token: 'layout.gutter', 'CSS Variable': '--spacing-layout-gutter', References: 'var(--spacing-lg)', Value: '24px' },
  { Token: 'layout.section', 'CSS Variable': '--spacing-layout-section', References: 'var(--spacing-2xl)', Value: '48px' },
];

/* ── Level 4 — Component Spacing ── */
const buttonSpacing = [
  { name: 'padding-x', value: '16px', cssVar: '--spacing-btn-padding-x' },
  { name: 'padding-y', value: '12px', cssVar: '--spacing-btn-padding-y' },
  { name: 'gap', value: '8px', cssVar: '--spacing-btn-gap' },
];
const buttonSpacingTable = [
  { Token: 'btn.padding-x', 'CSS Variable': '--spacing-btn-padding-x', References: 'var(--spacing-component-padding-md)', Value: '16px' },
  { Token: 'btn.padding-y', 'CSS Variable': '--spacing-btn-padding-y', References: 'var(--spacing-component-padding-sm)', Value: '12px' },
  { Token: 'btn.gap', 'CSS Variable': '--spacing-btn-gap', References: 'var(--spacing-component-gap-sm)', Value: '8px' },
];

const inputSpacing = [
  { name: 'padding-x', value: '16px', cssVar: '--spacing-input-padding-x' },
  { name: 'padding-y', value: '12px', cssVar: '--spacing-input-padding-y' },
  { name: 'icon-inset', value: '40px', cssVar: '--spacing-input-icon-inset' },
  { name: 'icon-padding', value: '12px', cssVar: '--spacing-input-icon-padding' },
];
const inputSpacingTable = [
  { Token: 'input.padding-x', 'CSS Variable': '--spacing-input-padding-x', References: 'var(--spacing-component-padding-md)', Value: '16px' },
  { Token: 'input.padding-y', 'CSS Variable': '--spacing-input-padding-y', References: 'var(--spacing-component-padding-sm)', Value: '12px' },
  { Token: 'input.icon-inset', 'CSS Variable': '--spacing-input-icon-inset', References: 'var(--sizing-component-height-md)', Value: '40px' },
  { Token: 'input.icon-padding', 'CSS Variable': '--spacing-input-icon-padding', References: 'var(--spacing-component-padding-sm)', Value: '12px' },
];

const cardSpacing = [
  { name: 'padding-compact', value: '12px', cssVar: '--spacing-card-padding-compact' },
  { name: 'padding-normal', value: '16px', cssVar: '--spacing-card-padding-normal' },
  { name: 'padding-spacious', value: '24px', cssVar: '--spacing-card-padding-spacious' },
  { name: 'gap', value: '12px', cssVar: '--spacing-card-gap' },
];
const cardSpacingTable = [
  { Token: 'card.padding-compact', 'CSS Variable': '--spacing-card-padding-compact', References: 'var(--spacing-component-padding-sm)', Value: '12px' },
  { Token: 'card.padding-normal', 'CSS Variable': '--spacing-card-padding-normal', References: 'var(--spacing-component-padding-md)', Value: '16px' },
  { Token: 'card.padding-spacious', 'CSS Variable': '--spacing-card-padding-spacious', References: 'var(--spacing-component-padding-lg)', Value: '24px' },
  { Token: 'card.gap', 'CSS Variable': '--spacing-card-gap', References: 'var(--spacing-component-gap-md)', Value: '12px' },
];

const datepickerSpacing = [
  { name: 'popover-padding', value: '16px', cssVar: '--spacing-datepicker-popover-padding' },
  { name: 'grid-gap', value: '8px', cssVar: '--spacing-datepicker-grid-gap' },
];
const datepickerSpacingTable = [
  { Token: 'datepicker.popover-padding', 'CSS Variable': '--spacing-datepicker-popover-padding', References: 'var(--spacing-component-padding-md)', Value: '16px' },
  { Token: 'datepicker.grid-gap', 'CSS Variable': '--spacing-datepicker-grid-gap', References: 'var(--spacing-component-gap-sm)', Value: '8px' },
];

const fileuploadSpacing = [
  { name: 'zone-padding', value: '24px', cssVar: '--spacing-fileupload-zone-padding' },
  { name: 'file-gap', value: '8px', cssVar: '--spacing-fileupload-file-gap' },
];
const fileuploadSpacingTable = [
  { Token: 'fileupload.zone-padding', 'CSS Variable': '--spacing-fileupload-zone-padding', References: 'var(--spacing-component-padding-lg)', Value: '24px' },
  { Token: 'fileupload.file-gap', 'CSS Variable': '--spacing-fileupload-file-gap', References: 'var(--spacing-component-gap-sm)', Value: '8px' },
];

const modalSpacing = [
  { name: 'padding-x', value: '24px', cssVar: '--spacing-modal-padding-x' },
  { name: 'padding-y', value: '16px', cssVar: '--spacing-modal-padding-y' },
  { name: 'gap', value: '12px', cssVar: '--spacing-modal-gap' },
];
const modalSpacingTable = [
  { Token: 'modal.padding-x', 'CSS Variable': '--spacing-modal-padding-x', References: 'var(--spacing-component-padding-lg)', Value: '24px' },
  { Token: 'modal.padding-y', 'CSS Variable': '--spacing-modal-padding-y', References: 'var(--spacing-component-padding-md)', Value: '16px' },
  { Token: 'modal.gap', 'CSS Variable': '--spacing-modal-gap', References: 'var(--spacing-component-gap-md)', Value: '12px' },
];

const selectSpacing = [
  { name: 'popover-padding', value: '8px', cssVar: '--spacing-select-popover-padding' },
  { name: 'item-padding-x', value: '12px', cssVar: '--spacing-select-item-padding-x' },
  { name: 'item-padding-y', value: '8px', cssVar: '--spacing-select-item-padding-y' },
  { name: 'item-gap', value: '8px', cssVar: '--spacing-select-item-gap' },
];
const selectSpacingTable = [
  { Token: 'select.popover-padding', 'CSS Variable': '--spacing-select-popover-padding', References: 'var(--spacing-component-padding-xs)', Value: '8px' },
  { Token: 'select.item-padding-x', 'CSS Variable': '--spacing-select-item-padding-x', References: 'var(--spacing-component-padding-sm)', Value: '12px' },
  { Token: 'select.item-padding-y', 'CSS Variable': '--spacing-select-item-padding-y', References: 'var(--spacing-component-padding-xs)', Value: '8px' },
  { Token: 'select.item-gap', 'CSS Variable': '--spacing-select-item-gap', References: 'var(--spacing-component-gap-sm)', Value: '8px' },
];

const tableSpacing = [
  { name: 'cell-x-compact', value: '16px', cssVar: '--spacing-table-cell-x-compact' },
  { name: 'cell-y-compact', value: '12px', cssVar: '--spacing-table-cell-y-compact' },
  { name: 'cell-x-normal', value: '24px', cssVar: '--spacing-table-cell-x-normal' },
  { name: 'cell-y-normal', value: '16px', cssVar: '--spacing-table-cell-y-normal' },
  { name: 'cell-x-spacious', value: '32px', cssVar: '--spacing-table-cell-x-spacious' },
  { name: 'cell-y-spacious', value: '24px', cssVar: '--spacing-table-cell-y-spacious' },
  { name: 'head-y-compact', value: '8px', cssVar: '--spacing-table-head-y-compact' },
  { name: 'head-y-normal', value: '8px', cssVar: '--spacing-table-head-y-normal' },
  { name: 'head-y-spacious', value: '12px', cssVar: '--spacing-table-head-y-spacious' },
];
const tableSpacingTable = [
  { Token: 'table.cell-x-compact', 'CSS Variable': '--spacing-table-cell-x-compact', References: 'var(--spacing-component-padding-md)', Value: '16px' },
  { Token: 'table.cell-y-compact', 'CSS Variable': '--spacing-table-cell-y-compact', References: 'var(--spacing-component-padding-sm)', Value: '12px' },
  { Token: 'table.cell-x-normal', 'CSS Variable': '--spacing-table-cell-x-normal', References: 'var(--spacing-component-padding-lg)', Value: '24px' },
  { Token: 'table.cell-y-normal', 'CSS Variable': '--spacing-table-cell-y-normal', References: 'var(--spacing-component-padding-md)', Value: '16px' },
  { Token: 'table.cell-x-spacious', 'CSS Variable': '--spacing-table-cell-x-spacious', References: 'var(--spacing-component-padding-xl)', Value: '32px' },
  { Token: 'table.cell-y-spacious', 'CSS Variable': '--spacing-table-cell-y-spacious', References: 'var(--spacing-component-padding-lg)', Value: '24px' },
  { Token: 'table.head-y-compact', 'CSS Variable': '--spacing-table-head-y-compact', References: 'var(--spacing-component-padding-xs)', Value: '8px' },
  { Token: 'table.head-y-normal', 'CSS Variable': '--spacing-table-head-y-normal', References: 'var(--spacing-component-padding-xs)', Value: '8px' },
  { Token: 'table.head-y-spacious', 'CSS Variable': '--spacing-table-head-y-spacious', References: 'var(--spacing-component-padding-sm)', Value: '12px' },
];

const textareaSpacing = [
  { name: 'padding-y-sm', value: '8px', cssVar: '--spacing-textarea-padding-y-sm' },
  { name: 'padding-y-md', value: '10px', cssVar: '--spacing-textarea-padding-y-md' },
  { name: 'padding-y-lg', value: '12px', cssVar: '--spacing-textarea-padding-y-lg' },
];
const textareaSpacingTable = [
  { Token: 'textarea.padding-y-sm', 'CSS Variable': '--spacing-textarea-padding-y-sm', References: 'var(--sizing-component-padding-y-md)', Value: '8px' },
  { Token: 'textarea.padding-y-md', 'CSS Variable': '--spacing-textarea-padding-y-md', References: 'var(--sizing-component-padding-y-lg)', Value: '10px' },
  { Token: 'textarea.padding-y-lg', 'CSS Variable': '--spacing-textarea-padding-y-lg', References: 'var(--sizing-component-padding-y-xl)', Value: '12px' },
];

const toastSpacing = [
  { name: 'padding', value: '16px', cssVar: '--spacing-toast-padding' },
  { name: 'gap', value: '12px', cssVar: '--spacing-toast-gap' },
  { name: 'viewport-padding', value: '16px', cssVar: '--spacing-toast-viewport-padding' },
];
const toastSpacingTable = [
  { Token: 'toast.padding', 'CSS Variable': '--spacing-toast-padding', References: 'var(--spacing-component-padding-md)', Value: '16px' },
  { Token: 'toast.gap', 'CSS Variable': '--spacing-toast-gap', References: 'var(--spacing-component-gap-md)', Value: '12px' },
  { Token: 'toast.viewport-padding', 'CSS Variable': '--spacing-toast-viewport-padding', References: 'var(--spacing-component-padding-md)', Value: '16px' },
];

const progressSpacing = [
  { name: 'label-gap', value: '16px', cssVar: '--spacing-progress-label-gap' },
];
const progressSpacingTable = [
  { Token: 'progress.label-gap', 'CSS Variable': '--spacing-progress-label-gap', References: 'var(--spacing-component-gap-lg)', Value: '16px' },
];

function SpacingPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '960px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Spacing Tokens</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        4-Layer Architektur: Base → Global → Roles → Semantic
      </p>

      {/* ── LEVEL 1 ── */}
      <Section title="Level 1 — Base Scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {baseScale.map((t) => (
            <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#94a3b8" />
          ))}
        </div>
      </Section>

      {/* ── LEVEL 2 ── */}
      <Section title="Level 2 — Global Semantic Sizes">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Semantische Zuordnung der Base-Spacing-Tokens. Alle globalen Tokens referenzieren Level 1.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
          {globalSizes.map((t) => (
            <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} />
          ))}
        </div>
        <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={globalSizesTable} color="#0ea5e9" />
      </Section>

      {/* ── LEVEL 3 ── */}
      <Section title="Level 3 — Role Spacing">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Funktionale Spacing-Rollen. Referenzieren Level 2.
        </p>

        <SubSection title="Component Padding">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {rolePadding.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#6366f1" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={rolePaddingTable} color="#6366f1" />
        </SubSection>

        <SubSection title="Component Gap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {roleGap.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#6366f1" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleGapTable} color="#6366f1" />
        </SubSection>

        <SubSection title="Layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {roleLayout.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#6366f1" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={roleLayoutTable} color="#6366f1" />
        </SubSection>
      </Section>

      {/* ── LEVEL 4 ── */}
      <Section title="Level 4 — Component Spacing">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Komponentenspezifische Spacing-Tokens. Referenzieren ausschliesslich Level 3.
        </p>

        <SubSection title="Button">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {buttonSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={buttonSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="Input">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {inputSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={inputSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="Card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {cardSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={cardSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="DatePicker">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {datepickerSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={datepickerSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="FileUpload">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {fileuploadSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={fileuploadSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="Modal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {modalSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={modalSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="Select">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {selectSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={selectSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="Table">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {tableSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={tableSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="Textarea">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {textareaSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={textareaSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="Toast">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {toastSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={toastSpacingTable} color="#10b981" />
        </SubSection>

        <SubSection title="Progress">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
            {progressSpacing.map((t) => (
              <SpacingBar key={t.name} name={t.name} value={t.value} cssVar={t.cssVar} color="#10b981" />
            ))}
          </div>
          <TokenTable headers={['Token', 'CSS Variable', 'References', 'Value']} rows={progressSpacingTable} color="#10b981" />
        </SubSection>

        <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '12px', color: '#166534', fontFamily: 'monospace' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontFamily: 'inherit' }}>Referenzkette (Beispiel btn.padding-x):</div>
          <div>--spacing-btn-padding-x → var(--spacing-component-padding-md) → var(--spacing-md) → var(--spacing-base-4) = 16px</div>
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Spacing',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <SpacingPage />,
};
