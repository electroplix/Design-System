import { resolve } from 'node:path';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:5173';

/**
 * E2E test configuration for the Electroplix Design System Vite showcase.
 *
 * NOTE: Playwright browser support varies by OS. If browsers cannot be
 * installed locally (e.g., Ubuntu 26.04+), these tests will run in CI only.
 * Run `npx playwright install` to install browsers for your platform.
 *
 * In CI we install Firefox explicitly with `--with-deps firefox` *before*
 * invoking nx, and pass `--skipInstall` via project.json to avoid the
 * @nx/playwright executor re-downloading every browser on each run.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npx nx run vite-showcase:dev -- --host 127.0.0.1',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    cwd: resolve(__dirname, '../../'),
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  projects: [
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
