import { expect, test } from '@playwright/test';

test.describe('Showcase App', () => {
  test('should render home page with hero and navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Electroplix Design System Showcase');
    await expect(page.locator('text=Modern Component Library')).toBeVisible();
    await expect(page.locator('a[href="/buttons"]')).toBeVisible();
    await expect(page.locator('a[href="/forms"]')).toBeVisible();
    await expect(page.locator('a[href="/navigation"]')).toBeVisible();
  });

  test('should navigate to buttons page and render button variants', async ({ page }) => {
    await page.goto('/buttons');
    await expect(page.locator('h2')).toContainText('Buttons Showcase');
    await expect(page.locator('button')).toHaveCount(5, { timeout: 5000 });
    await expect(page.locator('button', { hasText: 'Primary Action' })).toBeVisible();
  });

  test('should render form components on forms page', async ({ page }) => {
    await page.goto('/forms');
    await expect(page.locator('h2')).toContainText('Forms Showcase');
    await expect(page.locator('text=Contact Form')).toBeVisible();
    await expect(page.locator('text=Newsletter Signup')).toBeVisible();
  });

  test('should render navigation components', async ({ page }) => {
    await page.goto('/navigation');
    await expect(page.locator('text=Primary Navigation')).toBeVisible();
    await expect(page.locator('text=Footer Implementation')).toBeVisible();
  });

  test('should have no console errors on any page', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    await page.goto('/buttons');
    await page.goto('/forms');
    await page.goto('/navigation');

    // Filter out known React dev warnings
    const realErrors = errors.filter(
      (e) => !e.includes('React does not recognize') && !e.includes('Warning:'),
    );
    expect(realErrors).toHaveLength(0);
  });
});
