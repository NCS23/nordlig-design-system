import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Molecules/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Resizable-Komponente fuer anpassbare Panel-Layouts. Basiert auf react-resizable-panels mit Design-Token-Integration.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard',
  render: () => (
    <div style={{ height: 300 }}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="50%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-100 dark:bg-slate-800">
            Panel 1
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="50%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-200 dark:bg-slate-700">
            Panel 2
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ─── Vertical ───────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Vertikal',
  render: () => (
    <div style={{ height: 300 }}>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize="50%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-100 dark:bg-slate-800">
            Oben
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="50%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-200 dark:bg-slate-700">
            Unten
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ─── WithHandle ─────────────────────────────────────────────────────────────

export const WithHandle: Story = {
  name: 'Mit Griff-Indikator',
  render: () => (
    <div style={{ height: 300 }}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="50%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-100 dark:bg-slate-800">
            Panel 1
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-200 dark:bg-slate-700">
            Panel 2
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ─── ThreePanels ────────────────────────────────────────────────────────────

export const ThreePanels: Story = {
  name: 'Drei Panels',
  render: () => (
    <div style={{ height: 300 }}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="25%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-100 dark:bg-slate-800">
            Sidebar
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-200 dark:bg-slate-700">
            Hauptbereich
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="25%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-300 dark:bg-slate-600">
            Details
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ─── Collapsible ────────────────────────────────────────────────────────────

export const Collapsible: Story = {
  name: 'Einklappbar',
  render: () => (
    <div style={{ height: 300 }}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="25%" minSize="5%" collapsible>
          <div className="flex h-full items-center justify-center p-4 bg-slate-100 dark:bg-slate-800">
            Einklappbare Sidebar
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="75%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-200 dark:bg-slate-700">
            Hauptbereich (Sidebar nach links ziehen zum Einklappen)
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ─── NestedGroups ───────────────────────────────────────────────────────────

export const NestedGroups: Story = {
  name: 'Verschachtelte Gruppen',
  render: () => (
    <div style={{ height: 400 }}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="30%">
          <div className="flex h-full items-center justify-center p-4 bg-slate-100 dark:bg-slate-800">
            Linke Spalte
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="70%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="60%">
              <div className="flex h-full items-center justify-center p-4 bg-slate-200 dark:bg-slate-700">
                Oben rechts
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="40%">
              <div className="flex h-full items-center justify-center p-4 bg-slate-300 dark:bg-slate-600">
                Unten rechts
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
