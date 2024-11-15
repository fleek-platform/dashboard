import { test as it, expect } from '@playwright/test';

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
        document.cookie.split(';').forEach(cookie => {
          document.cookie = cookie.trim() + '; expires=Thu Jan 01 1970 00:00:00 GMT';
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
    beforeEach(async ({ page }) => {
      const invalidToken = 'abcdef';
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
          value: 'cls4v91mt0001l708wu51eozd',
          domain: 'localhost',
          path: '/',
        },
      ]);
      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}`);
    });

    afterEach(async ({ page }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach(cookie => {
          document.cookie = cookie.trim() + '; expires=Thu Jan 01 1970 00:00:00 GMT';
        });
      });
    });

    it('Should redirect to the homepage', async ({ page }) => {
      await expect(page).toHaveTitle(/Home - Fleek/);
    });
  });

  describe('Valid cookie token user', () => {
    beforeEach(async ({ page }) => {
      const validMockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoibW9jayJ9.lTEPeyG1YviT2jZiYcs0hMPY2gMZVhpYJt0bTu1HE3k';
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

      const harFilePath = './tests/e2e/HAR/projects_home.har';

      // TODO: Block unnecessary requests
      // Mock the following:
      // latestBlogPosts, api.staging.fleeksandbox.xyz/api/v1/
      // by pass any others
      // await page.route('**/*', async (route) => {
      //   const url = route.request().url();
      //   if (!url.startsWith('http://localhost') && !url.includes('/graphql')) {
      //     await route.abort();
      //     return;
      //   }
      //   await route.continue();
      // });
      // Does the routeFromHAR regex would work for a url list?

      await page.routeFromHAR(harFilePath, {
        url: /fleek.*.xyz\/graphql/,
        update: false,
        notFound: 'abort',
      });

      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}`);
    });

    afterEach(async ({ page }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach(cookie => {
          document.cookie = cookie.trim() + '; expires=Thu Jan 01 1970 00:00:00 GMT';
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
  });
});
