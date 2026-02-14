import { test } from '@playwright/test';
import { gotoStory, enableDarkMode, screenshotStory } from './helpers';

// Repraesentative Auswahl von Komponenten fuer Dark-Mode-Tests
const darkModeStories = [
  // Atoms
  { id: 'atoms-button--primary',         name: 'button-primary' },
  { id: 'atoms-button--secondary',       name: 'button-secondary' },
  { id: 'atoms-badge--all-variants',     name: 'badge-all-variants' },
  { id: 'atoms-input--default',          name: 'input-default' },
  { id: 'atoms-alert--all-variants',     name: 'alert-all-variants' },
  { id: 'atoms-checkbox--all-states',    name: 'checkbox-all-states' },
  { id: 'atoms-switch--all-states',      name: 'switch-all-states' },
  { id: 'atoms-progress--all-colors',    name: 'progress-all-colors' },
  { id: 'atoms-separator--default',      name: 'separator-default' },
  // Molecules
  { id: 'molecules-inputfield--default',          name: 'inputfield-default' },
  { id: 'molecules-tabs--all-variants',            name: 'tabs-all-variants' },
  { id: 'molecules-accordion--single-default',     name: 'accordion-default' },
  { id: 'molecules-pagination--default',            name: 'pagination-default' },
  // Organisms
  { id: 'organisms-card--all-elevations', name: 'card-all-elevations' },
  { id: 'organisms-table--basic',         name: 'table-basic' },
];

test.describe('Dark Mode', () => {
  for (const { id, name } of darkModeStories) {
    test(`dark-${name}`, async ({ page }) => {
      await gotoStory(page, id);
      await enableDarkMode(page);
      await screenshotStory(page, `dark-${name}`);
    });
  }
});
