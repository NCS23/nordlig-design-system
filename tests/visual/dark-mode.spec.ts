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
  // Neue Komponenten (Completion Package)
  { id: 'atoms-label--all-states',                name: 'label-all-states' },
  { id: 'atoms-link--all-variants',               name: 'link-all-variants' },
  { id: 'atoms-code--all-variants',               name: 'code-all-variants' },
  { id: 'atoms-kbd--default',                     name: 'kbd-default' },
  { id: 'atoms-heading--all-levels',              name: 'heading-all-levels' },
  { id: 'atoms-text--all-variants',               name: 'text-all-variants' },
  { id: 'molecules-stepper--horizontal-default',  name: 'stepper-default' },
  { id: 'molecules-navigationmenu--default',      name: 'navigationmenu-default' },
  { id: 'organisms-statcard--all-variants',       name: 'statcard-all-variants' },
  { id: 'organisms-timeline--all-variants',       name: 'timeline-all-variants' },
  { id: 'organisms-tree--default',                name: 'tree-default' },
  { id: 'organisms-sidebar--default',             name: 'sidebar-default' },
  { id: 'organisms-carousel--default',            name: 'carousel-default' },
  // Neue Atoms
  { id: 'atoms-tag--all-combinations',            name: 'tag-all-combinations' },
  { id: 'atoms-numberinput--states',              name: 'numberinput-states' },
  // Tier-2 Batch
  { id: 'atoms-toggle--default',                 name: 'toggle-default' },
  { id: 'atoms-banner--all-variants',            name: 'banner-all-variants' },
  { id: 'atoms-searchinput--default',            name: 'searchinput-default' },
  { id: 'molecules-combobox--default',           name: 'combobox-default' },
  // P2 Batch
  { id: 'atoms-passwordinput--default',         name: 'passwordinput-default' },
  { id: 'atoms-loadingoverlay--default',        name: 'loadingoverlay-default' },
  { id: 'atoms-rating--default',                name: 'rating-default' },
  { id: 'atoms-highlight--default',             name: 'highlight-default' },
  // Visual Regression Baseline Expansion
  { id: 'atoms-blockquote--default',            name: 'blockquote-default' },
  { id: 'atoms-image--default',                 name: 'image-default' },
  { id: 'atoms-inputotp--default',              name: 'inputotp-default' },
  { id: 'atoms-radio--group',                   name: 'radio-group' },
  { id: 'atoms-copybutton--default',            name: 'copybutton-default' },
  { id: 'molecules-timepicker--default',         name: 'timepicker-default' },
  { id: 'molecules-select--multi-select-default', name: 'multiselect-default' },
  { id: 'molecules-checkboxfield--with-label',   name: 'checkboxfield-default' },
  { id: 'molecules-switchfield--all-states',     name: 'switchfield-all-states' },
  { id: 'molecules-toolbar--default',            name: 'toolbar-default' },
  { id: 'organisms-sessioncard--all-states',     name: 'sessioncard-all-states' },
  { id: 'organisms-datatable--basic',            name: 'datatable-basic' },
  { id: 'templates-pageshell--default',          name: 'pageshell-default' },
  { id: 'templates-dashboardlayout--default',    name: 'dashboardlayout-default' },
  { id: 'templates-authlayout--login',           name: 'authlayout-login' },
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
