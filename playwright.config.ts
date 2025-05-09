import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { getDevServerDetails, hasDevServerPortEnvVar } from './tests/utils';

const testsDotEnvPath = '.tests/.env';

dotenv.config({
  path: path.resolve(__dirname, testsDotEnvPath),
});

if (!hasDevServerPortEnvVar()) {
  console.error(`👹 Oops! Expected the environment variable NEXT_DEV_SERVER_envPort to have a valid envPort number but got ${process.env.NEXT_DEV_SERVER_PORT}, which type is ${typeof process.env.NEXT_DEV_SERVER_PORT}`);  
  process.exit(1);
}

const { url } = getDevServerDetails();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  // On CI/CD runners, low specs cause inconsistent runs
  // To mitigate any inconsistency playwright's team
  // recommends running in a single worker
  // https://playwright.dev/docs/ci//workers
  // Note: That launching a `macos-latest-xlarge`
  // is more efficient but increases cost dramatically
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
