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
  { id: 'atoms-switch--basic',            name: 'switch-basic' },
  { id: 'atoms-progress--all-colors',    name: 'progress-all-colors' },
  { id: 'atoms-separator--default',      name: 'separator-default' },
  // Molecules
  { id: 'molecules-inputfield--default',          name: 'inputfield-default' },
  { id: 'molecules-tabs--all-variants',            name: 'tabs-all-variants' },
  { id: 'molecules-accordion--single-default',     name: 'accordion-default' },
  { id: 'molecules-pagination--default',            name: 'pagination-default' },
  // Organisms
  { id: 'molecules-card--all-elevations', name: 'card-all-elevations' },
  { id: 'organisms-table--basic',         name: 'table-basic' },
  { id: 'organisms-appheader--default',   name: 'appheader-default' },
  { id: 'organisms-appfooter--default',   name: 'appfooter-default' },
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
  { id: 'molecules-searchinput--default',         name: 'searchinput-default' },
  { id: 'molecules-combobox--default',           name: 'combobox-default' },
  // P2 Batch
  { id: 'molecules-passwordinput--default',      name: 'passwordinput-default' },
  { id: 'molecules-loadingoverlay--default',    name: 'loadingoverlay-default' },
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
  { id: 'examples-sessioncard--all-states',      name: 'sessioncard-all-states' },
  { id: 'organisms-datatable--basic',            name: 'datatable-basic' },
  { id: 'templates-pageshell--default',          name: 'pageshell-default' },
  { id: 'templates-dashboardlayout--default',    name: 'dashboardlayout-default' },
  { id: 'templates-authlayout--login',           name: 'authlayout-login' },
  // Neue Templates
  { id: 'templates-formpage--default',           name: 'formpage-default' },
  { id: 'templates-listpage--default',           name: 'listpage-default' },
  { id: 'templates-detailpage--default',         name: 'detailpage-default' },
  { id: 'templates-errorpage--not-found',        name: 'errorpage-not-found' },
  { id: 'templates-emptystatepage--keine-daten', name: 'emptystatepage-keine-daten' },
  // Patterns
  { id: 'patterns-datatablepattern--default',    name: 'datatablepattern-default' },
  { id: 'patterns-formwizard--default',          name: 'formwizard-default' },
  // Spoiler
  { id: 'atoms-spoiler--default',                name: 'spoiler-default' },
  // ── NDS-080: Fehlende Dark-Mode-Tests ──────────────────────────────────────
  // Atoms
  { id: 'atoms-segmentedcontrol--default',       name: 'segmentedcontrol-default' },
  { id: 'atoms-slider--default',                 name: 'slider-default' },
  { id: 'atoms-themetoggle--default',            name: 'themetoggle-default' },
  { id: 'atoms-spinner--default',                name: 'spinner-default' },
  { id: 'atoms-skeleton--basic',                 name: 'skeleton-basic' },
  { id: 'atoms-avatar--default',                 name: 'avatar-default' },
  { id: 'atoms-togglegroup--default',            name: 'togglegroup-default' },
  { id: 'atoms-scrollarea--default',             name: 'scrollarea-default' },
  { id: 'atoms-aspectratio--default-16-by-9',    name: 'aspectratio-default' },
  { id: 'atoms-icon--all-sizes',                 name: 'icon-all-sizes' },
  // Molecules
  { id: 'molecules-datepicker--default',         name: 'datepicker-default' },
  { id: 'molecules-select--default',             name: 'select-default' },
  { id: 'molecules-textarea--default',           name: 'textarea-default' },
  { id: 'molecules-fileupload--default',         name: 'fileupload-default' },
  { id: 'molecules-radiogroup--basic',           name: 'radiogroup-basic' },
  { id: 'molecules-collapsible--default',        name: 'collapsible-default' },
  { id: 'molecules-emptystate--default',         name: 'emptystate-default' },
  { id: 'molecules-breadcrumbs--default',        name: 'breadcrumbs-default' },
  { id: 'molecules-form--default',               name: 'form-default' },
  { id: 'molecules-colorpicker--default',        name: 'colorpicker-default' },
  { id: 'molecules-menubar--default',            name: 'menubar-default' },
  { id: 'molecules-progressfield--with-label',   name: 'progressfield-default' },
  { id: 'molecules-resizable--default',          name: 'resizable-default' },
  { id: 'patterns-searchfilter--default',         name: 'searchfilter-default' },
  // Organisms
  { id: 'organisms-command--default',            name: 'command-default' },
  { id: 'organisms-modal--basic',                 name: 'modal-basic' },
  { id: 'organisms-chart--balkendiagramm',       name: 'chart-balken' },
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
