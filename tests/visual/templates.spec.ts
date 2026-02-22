import { test } from '@playwright/test';
import { gotoStory, screenshotStory, screenshotFullPage } from './helpers';

// ─── Template-Stories ──────────────────────────────────────────────────────────

interface StoryConfig {
  component: string;
  stories: string[];
}

const templateStories: StoryConfig[] = [
  { component: 'PageShell',       stories: ['default', 'with-footer', 'no-sidebar', 'sidebar-right', 'content-max-width'] },
  { component: 'DashboardLayout', stories: ['default', 'collapsed-sidebar', 'with-breadcrumbs', 'no-footer', 'full-dashboard'] },
  { component: 'AuthLayout',      stories: ['login', 'register', 'forgot-password', 'with-background', 'with-logo'] },
  { component: 'FormPage',        stories: ['default', 'mit-breadcrumbs', 'max-width-varianten', 'bearbeiten'] },
  { component: 'ListPage',        stories: ['default', 'mit-suchfilter', 'leer-zustand'] },
  { component: 'DetailPage',      stories: ['default', 'mit-breadcrumbs', 'ohne-sidebar', 'responsive'] },
  { component: 'ErrorPage',       stories: ['not-found', 'server-error', 'maintenance', 'mit-illustration'] },
  { component: 'EmptyStatePage',  stories: ['keine-daten', 'keine-ergebnisse', 'erste-nutzung', 'mit-illustration'] },
];

for (const { component, stories } of templateStories) {
  test.describe(component, () => {
    for (const story of stories) {
      const storyId = `templates-${component.toLowerCase()}--${story}`;
      test(story, async ({ page }) => {
        await gotoStory(page, storyId);
        await screenshotFullPage(page, `templates-${component.toLowerCase()}-${story}`);
      });
    }
  });
}
