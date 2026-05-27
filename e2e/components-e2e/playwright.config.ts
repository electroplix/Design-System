import { resolve } from 'node:path';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:5173';

/**
 * E2E test configuration for the Electroplix Design System showcase app.
 *
 * NOTE: Playwright browser support varies by OS. If browsers cannot be installed
 * locally (e.g., Ubuntu 26.04+), these tests will run in CI only.
 * Run `npx playwright install` to install browsers for your platform.
 *
 * CI environments should use: `npx playwright install --with-deps firefox`
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npx nx run vite-showcase:dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    cwd: resolve(__dirname, '../../'),
    timeout: 60000,
  },
  projects: [
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
