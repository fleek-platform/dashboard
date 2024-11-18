import { test as it, expect } from '@playwright/test';
import { harFilePaths } from '../utils/har';
import { latestBlogPosts } from '../data/fleekWebsiteJsonApi';
const { describe, beforeEach, afterEach } = it;

describe('On Home page', () => {
  describe('A non-authenticated user', () => {
    beforeEach(async ({ page }) => {
      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}`);
    });

    afterEach(async ({ page }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach((cookie) => {
          document.cookie =
            cookie.trim() + '; expires=Thu Jan 01 1970 00:00:00 GMT';
        });
      });
    });

    it('Should get the title page "Home"', async ({ page }) => {
      await expect(page).toHaveTitle(/Home - Fleek/);
    });

    it('Should have login or signup modal', async ({ page }) => {
      const el = page.locator('.modal');
      await expect(el).toContainText('Log in or sign up');
    });

    it('Should have a sign-in header button', async ({ page }) => {
      const el = page.locator('header');
      await expect(el).toContainText('Sign in');
    });
  });

  describe('Invalid cookie token user', () => {
    const invalidToken = 'abcdef';
    const projectId = 'cls4v91mt0001l708wu51eozd';

    beforeEach(async ({ page }) => {
      await page.context().addCookies([
        {
          name: 'accessToken',
          value: invalidToken,
          domain: 'localhost',
          path: '/',
        },
        {
          name: 'authProviderToken',
          value: invalidToken,
          domain: 'localhost',
          path: '/',
        },
        {
          name: 'projectId',
          value: projectId,
          domain: 'localhost',
          path: '/',
        },
      ]);

      const navigationPromise = page.waitForNavigation({
        waitUntil: 'load',
      });

      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}/projects/${projectId}/home/`);

    await navigationPromise;
    });

    afterEach(async ({ page }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach((cookie) => {
          document.cookie =
            cookie.trim() + '; expires=Thu Jan 01 1970 00:00:00 GMT';
        });
      });
    });

    it('Should redirect to the homepage', async ({ page }) => {
      await Promise.all([
        page.waitForURL(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}/`, {
          waitUntil: 'networkidle',
        }),
        page.waitForLoadState('networkidle', { timeout: 10000 })
      ]);

      const currentUrl = page.url();
      expect(currentUrl).toBe(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}/`);

      await expect(page).toHaveTitle(/Home - Fleek/);
    });
  });

  describe('Valid cookie token user', () => {
    beforeEach(async ({ page }) => {
      const validMockToken =
        'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoibW9jayJ9.lTEPeyG1YviT2jZiYcs0hMPY2gMZVhpYJt0bTu1HE3k';
      await page.context().addCookies([
        {
          name: 'accessToken',
          value: validMockToken,
          domain: 'localhost',
          path: '/',
        },
        {
          name: 'authProviderToken',
          value: validMockToken,
          domain: 'localhost',
          path: '/',
        },
        {
          name: 'projectId',
          value: 'cls4v91mt0001l708wu51eozd',
          domain: 'localhost',
          path: '/',
        },
      ]);

      // TODO: Block unnecessary requests
      // Mock the following:
      // latestBlogPosts, api.staging.fleeksandbox.xyz/api/v1/
      // by pass any others
      // Block unnecessary requests
      // await page.route('**/*', async (route) => {
      //   const url = route.request().url();
      //   if (!url.startsWith('http://localhost') && !url.includes('/graphql')) {
      //     await route.abort();
      //     return;
      //   }
      //   await route.continue();
      // });

      await page.route(/fleek.*.xyz\/api\/.*/, async (route) => {
        const url = route.request().url();
        if (url.includes('latestBlogPosts.json')) {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(latestBlogPosts),
          });

          return;
        }

        await route.continue();
      });

      await page.route(
        '**',
        async (route) => {
          const url = route.request().url();

          if (url.includes('dynamicauth.com')) {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({}),
            });

            return;
          }

          await route.continue();
        },
        {
          times: Infinity,
        },
      );

      await page.routeFromHAR(harFilePaths.page.projects.home, {
        url: /fleek.*.xyz\/graphql/,
        // TODO: Unfortunately multiple doesn't seem to work
        // url: /fleek.*\.xyz\/(graphql|api\/.*)/,
        update: false,
      });

      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}`);
    });

    afterEach(async ({ page }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach((cookie) => {
          document.cookie =
            cookie.trim() + '; expires=Thu Jan 01 1970 00:00:00 GMT';
        });
      });
    });

    it('Should redirect to projects page', async ({ page }) => {
      const expectTitle = 'First Project - Fleek';
      await expect(page).toHaveTitle(expectTitle);
    });

    it('Should have welcoming titles', async ({ page }) => {
      await expect(page.getByText('Get on Fleek!')).toBeVisible();
      await expect(page.getByText('Become a Fleek power user')).toBeVisible();
    });

    it('Should have useful articles', async ({ page }) => {
      await expect(page.getByText('Useful articles')).toBeVisible();
    });

    it('Should have a menu', async ({ page }) => {
      const menu = page.getByRole('menu');
      await expect(menu).toBeVisible();
    });

    it('Should have a menu item for Dashboard', async ({ page }) => {
      const role = 'menu';
      const list = ['Dashboard', 'Hosting', 'Storage', 'Functions', 'Settings'];

      for (const name of list) {
        const item = page.getByRole(role).filter({ hasText: name });
        await expect(item).toBeVisible();
      }
    });

    // TODO: Write test for Version
    // and fix the mock data response
    // see role in
    // src/components/Version/VersionTags.tsx
  });
});
