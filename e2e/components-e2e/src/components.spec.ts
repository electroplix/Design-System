import { test, expect } from '@playwright/test';

test('should render home page with hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Electroplix Design System Showcase');
  await expect(page.locator('text=Modern Component Library')).toBeVisible();
});

test('should navigate to buttons page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Buttons');
  await expect(page).toHaveURL(/.*buttons/);
  await expect(page.locator('h2')).toContainText('Buttons Showcase');
  await expect(page.locator('button', { hasText: 'Primary Action' })).toBeVisible();
});

test('should render form components', async ({ page }) => {
  await page.goto('/forms');
  await expect(page.locator('h2')).toContainText('Forms Showcase');
  await expect(page.locator('text=Contact Form')).toBeVisible();
  await expect(page.locator('text=Newsletter Signup')).toBeVisible();
});
