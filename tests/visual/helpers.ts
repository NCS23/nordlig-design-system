import { Page, expect } from '@playwright/test';

/**
 * Navigiert zu einer Storybook-Story im Iframe-Modus und wartet auf das Rendern.
 */
export async function gotoStory(page: Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`, {
    waitUntil: 'networkidle',
  });
  await page.locator('#storybook-root').waitFor({ state: 'visible' });
  // Warte auf CSS-Custom-Properties und Transitions
  await page.waitForTimeout(300);
}

/**
 * Aktiviert den Dark Mode im Storybook-Iframe.
 */
export async function enableDarkMode(page: Page) {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(200);
}

/**
 * Erstellt einen Screenshot des Storybook-Root-Elements.
 */
export async function screenshotStory(page: Page, name: string) {
  const root = page.locator('#storybook-root');
  await expect(root).toHaveScreenshot(`${name}.png`);
}

/**
 * Erstellt einen Fullpage-Screenshot (fuer Portal-/Overlay-Komponenten).
 */
export async function screenshotFullPage(page: Page, name: string) {
  await expect(page).toHaveScreenshot(`${name}.png`);
}
