import { test, expect } from '@playwright/test';
import { gotoStory, screenshotStory, screenshotFullPage } from './helpers';

// ─── Einfache Organism-Stories ───────────────────────────────────────────────

interface StoryConfig {
  component: string;
  stories: string[];
}

const organismStories: StoryConfig[] = [
  { component: 'Card',     stories: ['flat', 'raised', 'elevated', 'all-elevations', 'all-paddings'] },
  { component: 'Table',    stories: ['basic', 'striped', 'all-densities'] },
  { component: 'Command',  stories: ['default', 'with-groups'] },
  // Neue Komponenten (Completion Package)
  { component: 'StatCard', stories: ['default', 'with-trend-up', 'with-trend-down', 'with-icon', 'all-variants'] },
  { component: 'Timeline', stories: ['default', 'with-icons', 'all-variants'] },
  { component: 'Tree',     stories: ['default', 'with-icons', 'with-selection', 'deep-nesting'] },
  { component: 'Sidebar',  stories: ['default', 'collapsed', 'with-badges'] },
  { component: 'Carousel',     stories: ['default', 'with-arrows', 'with-dots', 'all-features'] },
  // Visual Regression Baseline Expansion
  { component: 'SessionCard',  stories: ['default', 'compact', 'loading', 'error', 'all-states'] },
  { component: 'DataTable',    stories: ['basic', 'with-sorting', 'with-pagination', 'full-featured', 'empty'] },
];

for (const { component, stories } of organismStories) {
  test.describe(component, () => {
    for (const story of stories) {
      const storyId = `organisms-${component.toLowerCase()}--${story}`;
      test(story, async ({ page }) => {
        await gotoStory(page, storyId);
        await screenshotStory(page, `organisms-${component.toLowerCase()}-${story}`);
      });
    }
  });
}

// ─── Modal (Portal-Komponente) ───────────────────────────────────────────────

test.describe('Modal', () => {
  const modalStories = ['basic', 'with-description', 'size-small', 'size-large'];

  for (const story of modalStories) {
    test(story, async ({ page }) => {
      await gotoStory(page, `organisms-modal--${story}`);
      await page.locator('#storybook-root button').first().click();
      await page.waitForTimeout(500);
      await screenshotFullPage(page, `organisms-modal-${story}`);
    });
  }
});

// ─── Chart (SVG-basiert, hoehere Toleranz) ───────────────────────────────────

test.describe('Chart', () => {
  const chartStories = [
    { story: 'liniendiagramm', name: 'line' },
    { story: 'balkendiagramm', name: 'bar' },
    { story: 'flaechendiagramm', name: 'area' },
    { story: 'kreisdiagramm', name: 'pie' },
  ];

  for (const { story, name } of chartStories) {
    test(name, async ({ page }) => {
      await gotoStory(page, `organisms-chart--${story}`);
      // Charts brauchen extra Renderzeit fuer SVG
      await page.waitForTimeout(1000);
      const root = page.locator('#storybook-root');
      await expect(root).toHaveScreenshot(`organisms-chart-${name}.png`, {
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
