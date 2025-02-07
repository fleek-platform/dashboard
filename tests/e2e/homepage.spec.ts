import { test as it, expect } from '@playwright/test';
import { latestBlogPosts } from '../data/fleekWebsiteJsonApi';
import { me, projects, listFolder, templates, sites, version } from '../data/graphqlClientResponses';
import { getDevServerDetails } from '../utils/devServer';

const { describe, beforeEach, afterEach } = it;

const { hostname, port } = getDevServerDetails();

const validMockToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyOmNsczR2OTBucjAwMDBsNzA4b3A0cTY2OWgiLCJwcm9qZWN0SWQiOiJjbHM0djkxbXQwMDAxbDcwOHd1NTFlb3pkIiwiZXhwIjoxNzM4Nzg3NzUzfQ.AXZyXZpg_7y2gWDk3nuhSfIIildWVhciydYrW-3Iki8';
const projectId = 'cls4v91mt0001l708wu51eozd';

const operations = [
  { name: 'me', data: me.data },
  { name: 'projects', data: projects.data },
  { name: 'listFolder', data: listFolder.data },
  { name: 'templates', data: templates.data },
  { name: 'sites', data: sites.data },
  { name: 'version', data: version.data },
];

describe('On Home page', () => {
  describe('A non-authenticated user', () => {
    beforeEach(async ({ page }) => {
      await page.goto(`http://${hostname}:${port}`);
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
          name: 'authToken',
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

      await page.goto(`http://${hostname}:${port}/projects/${projectId}/home/`);

      await page.waitForURL(`http://${hostname}:${port}/`, {
        waitUntil: 'domcontentloaded',
      });
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

    it('Should redirect to the homepage url', async ({ page }) => {
      const currentUrl = page.url();
      expect(currentUrl).toBe(`http://${hostname}:${port}/`);
    });

    it('Should redirect to the homepage with title', async ({ page }) => {
      await expect(page).toHaveTitle(/Home - Fleek/);
    });
  });

  describe('Valid cookie token user', () => {
    beforeEach(async ({ page }) => {
      await page.context().addCookies([
        {
          name: 'accessToken',
          value: validMockToken,
          domain: 'localhost',
          path: '/',
        },
        {
          name: 'authToken',
          value: validMockToken,
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

      await page.route(/api\/latestBlogPosts.json.*/, async (route) => {
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

      await page.route('**/graphql', async (route) => {
        const request = route.request();
        const { operationName } = request.postDataJSON();

        if (!operationName) {
          return route.continue();
        }

        for (const { data, name } of operations) {
          if (operationName === name) {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({
                data,
                errors: null
              })
            });
          }
        }
      });

      await page.goto(`http://${hostname}:${port}`);
      await page
        .getByText('Local development',
        )
        .waitFor();
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
    // check role in src/components/Version/VersionTags.tsx
  });
});
