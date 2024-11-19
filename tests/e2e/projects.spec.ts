import { test as it, expect } from '@playwright/test';
import { harFilePaths } from '../utils/har';
import { latestBlogPosts } from '../data/fleekWebsiteJsonApi';
const { describe, beforeEach, afterEach } = it;

describe('On Project settings page', () => {
  describe('Valid cookie token user', () => {
    const projectId = 'cls4v91mt0001l708wu51eozd';

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


      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}/projects/${projectId}/home/`);
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

    describe('On settings panel', async () => {
      beforeEach(async ({ page }) => {
        const role = 'menuitem';
        const name = 'settings';
        const menuitem = page.getByRole(role).filter({ hasText: name });
        menuitem.click();
        const url = `http://localhost:${process.env.NEXT_DEV_SERVER_PORT}/projects/${projectId}/settings/`
        await page.waitForURL(url);
      });

      it('Should have navigation bar', async ({ page }) => {
        const role = 'navigation';
        const list = ['general', 'storage', 'private gateways', 'application credentials', 'git integrations', 'team', 'billing'];

        for (const listItemName of list) {
          const item = page.getByRole(role).filter({ hasText: listItemName });
          await expect(item).toBeVisible();
        }
      });

      it('Should have Project Name text', async ({ page }) => {
        const expectText = 'Project Name';
        await expect(page.getByText(expectText).first()).toBeVisible();
      });

      it('Should have Project Avatar text', async ({ page }) => {
        const expectText = 'Project Avatar';
        await expect(page.getByText(expectText)).toBeVisible();
      });

      it('Should have Delete Project text', async ({ page }) => {
        const role = 'button';
        const name = 'Delete project';
        await expect(page.getByRole(role, { name })).toBeVisible();
      });

      describe('On Settings navigation to Storage', () => {
        beforeEach(async ({ page }) => {
          const name = 'storage';
          const menuitem = page.getByRole('navigation').getByRole('menuitem').filter({ hasText: name });
          menuitem.click();
          const url = `http://localhost:${process.env.NEXT_DEV_SERVER_PORT}/projects/${projectId}/settings/storage/`
          await page.waitForURL(url);
        });

        it('Should have Storage text', async ({ page }) => {
          const expectText = 'Storage';
          await expect(page.getByText(expectText).first()).toBeVisible();
        });

        it('Should have Default Storage text', async ({ page }) => {
          const expectText = 'Default Storage';
          await expect(page.getByText(expectText)).toBeVisible();
        });

        it('Should have Save changes button', async ({ page }) => {
          const role = 'button';
          const name = 'Save changes';
          await expect(page.getByRole(role, { name })).toBeVisible();
        });
      });

      describe('On Settings navigation to Private Gateways', () => {
        beforeEach(async ({ page }) => {
          await page.route('**/graphql', async (route) => {
            const request = route.request();
            const postData = request.postDataJSON();

            if (
              postData.operationName === 'privateGatewayNameAvailability') {
              await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                  data: {
                    privateGatewayNameAvailability: true,
                  }
                })
              });
            } else {
              await route.continue();
            }
          });

          const name = 'private gateways';
          const menuitem = page.getByRole('navigation').getByRole('menuitem').filter({ hasText: name });
          menuitem.click();
          const url = `http://localhost:${process.env.NEXT_DEV_SERVER_PORT}/projects/${projectId}/settings/private-gateways/`
          await page.waitForURL(url);
        });

        it('Should have Private Gateway text', async ({ page }) => {
          const expectText = 'Private Gateway';
          await expect(page.getByText(expectText).first()).toBeVisible();
        });

        it('Should have Create Private Gateway button', async ({ page }) => {
          const role = 'button';
          const name = 'Create private gateway';
          await expect(page.getByRole(role, { name })).toBeDisabled();
        });

        describe('On Private Gateway user input', async () => {
          beforeEach(async ({ page }) => {
            await page.route('**/graphql', async (route) => {
              const request = route.request();
              const postData = request.postDataJSON();

              if (
                postData.operationName === 'privateGatewayNameAvailability') {
                await route.fulfill({
                  status: 200,
                  contentType: 'application/json',
                  body: JSON.stringify({
                    data: {
                      privateGatewayNameAvailability: true,
                    }
                  })
                });
              } else {
                await route.continue();
              }
            });

            await page.getByRole('textbox').fill('some user input');
          });

          it('should Create Private Gateway button be enabled', async ({ page}) => {
            const input = page.getByRole('textbox', { name: 'User Input Gateway' });
            await input.fill('user input gateway');
            await expect(page.getByRole('button', { name: 'Create private gateway' })).toBeEnabled();
          });
        });
      });
    });
  });
});
