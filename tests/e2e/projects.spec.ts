import { test as it, expect } from '@playwright/test';
import { latestBlogPosts } from '../data/fleekWebsiteJsonApi';
import { getDevServerDetails } from '../utils/devServer';
const { describe, beforeEach, afterEach, beforeAll, afterAll } = it;
import { me, project, projects, listFolder, templates, sites, version, protectedActions, privateGateways, domainStatus, application, applications, gitProviders, siteDeploymentRequirements, permissionGroups, projectMembers, invitations } from '../data/graphqlClientResponses';

const { hostname, port } = getDevServerDetails();

const validMockToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyOmNsczR2OTBucjAwMDBsNzA4b3A0cTY2OWgiLCJwcm9qZWN0SWQiOiJjbHM0djkxbXQwMDAxbDcwOHd1NTFlb3pkIiwiZXhwIjoxNzM4Nzg3NzUzfQ.AXZyXZpg_7y2gWDk3nuhSfIIildWVhciydYrW-3Iki8';
const projectId = 'cls4v91mt0001l708wu51eozd';

describe('On Project settings page', () => {
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

      // await page.routeFromHAR(harFilePaths.page.projects.settings.all, {
      //   url: /fleek.*.xyz\/graphql/,
      //   update: false,
      // });
      await page.route('**/graphql', async (route) => {
        const request = route.request();
        const { operationName } = request.postDataJSON();

        if (!operationName) {
          return route.continue();
        }

        const operations = [
          { name: 'me', data: me.data },
          { name: 'project', data: project.data },
          { name: 'projects', data: projects.data },
          { name: 'listFolder', data: listFolder.data },
          { name: 'templates', data: templates.data },
          { name: 'sites', data: sites.data },
          { name: 'version', data: version.data },
          { name: 'protectedActions', data: protectedActions.data },
          { name: 'privateGateways', data: privateGateways.data },
          { name: 'domainStatus', data: domainStatus.data },
          { name: 'application', data: application.data },
          { name: 'applications', data: applications.data },
          { name: 'gitProviders', data: gitProviders.data },
          { name: 'siteDeploymentRequirements', data: siteDeploymentRequirements.data },
          { name: 'permissionGroups', data: permissionGroups.data },
          { name: 'projectMembers', data: projectMembers.data },
          { name: 'invitations', data: invitations.data }
        ];

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

      await page.goto(`http://${hostname}:${port}/projects/${projectId}/home/`);
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

    describe('On settings panel', async () => {
      beforeEach(async ({ page }) => {
        page.getByRole('menuitem', { name: 'settings' }).click();
        const url = `http://${hostname}:${port}/projects/${projectId}/settings/`;
        await page.waitForURL(url);
        await page
          .getByText('Local development',
          )
          .waitFor();
      });

      // afterEach(async ({ page }) => {
      //   page.getByRole('menuitem', { name: 'dashboard' }).click();
      //   const url = `http://${hostname}:${port}/projects/${projectId}/home/`;
      //   await page.waitForURL(url);
      // });

      it('Should have navigation bar', async ({ page }) => {
        const role = 'navigation';
        const list = [
          'general',
          'storage',
          'private gateways',
          'application credentials',
          'git integrations',
          'team',
        ];

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
        await expect(
          page.getByRole('button', { name: 'Delete project' }),
        ).toBeVisible();
      });

      describe('On Settings navigation to Storage', () => {
        beforeEach(async ({ page }) => {
          page
            .getByRole('navigation')
            .getByRole('menuitem', { name: 'storage' })
            .click();
          const url = `http://${hostname}:${port}/projects/${projectId}/settings/storage/`;
          await page.waitForURL(url, {
            waitUntil: 'domcontentloaded',
          });
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
          await expect(
            page.getByRole('button', { name: 'Save storage layer changes' }),
          ).toBeVisible();
        });
      });

      describe('On Settings navigation to Private Gateways', () => {
        beforeEach(async ({ page }) => {
          page
            .getByRole('navigation')
            .getByRole('menuitem', { name: 'private gateways' })
            .click();
          const url = `http://${hostname}:${port}/projects/${projectId}/settings/private-gateways/`;
          await page.waitForURL(url, {
            waitUntil: 'domcontentloaded',
          });
          // Help ensure expected page by one of its elements
          await page
            .getByText(
              'Configure a private DNS endpoint to access your storage on Fleek.',
            )
            .waitFor();
        });

        it('Should have Private Gateway text', async ({ page }) => {
          const expectText =
            'Configure a private DNS endpoint to access your storage on Fleek.';
          await expect(page.getByText(expectText).first()).toBeVisible();
        });

        it('Should have Create Private Gateway button', async ({ page }) => {
          await expect(
            page.getByRole('button', { name: 'Create private gateway' }),
          ).toBeDisabled();
        });

        describe('On Private Gateway user input', async () => {
          beforeEach(async ({ page }) => {
            await page.route('**/graphql', async (route) => {
              const request = route.request();
              const postData = request.postDataJSON();

              if (postData.operationName === 'privateGatewayNameAvailability') {
                await route.fulfill({
                  status: 200,
                  contentType: 'application/json',
                  body: JSON.stringify({
                    data: {
                      privateGatewayNameAvailability: true,
                    },
                  }),
                });
              } else {
                await route.continue();
              }
            });

            await page.getByRole('textbox').fill('some user input');
          });

          it('should Create Private Gateway button be enabled', async ({
            page,
          }) => {
            const input = page.getByRole('textbox', {
              name: 'User Input Gateway',
            });
            await input.fill('user input gateway');
            await expect(
              page.getByRole('button', { name: 'Create private gateway' }),
            ).toBeEnabled();
          });
        });
      });

      describe.skip('On Settings navigation to Application Credentials (with credentials data)', () => {
        beforeEach(async ({ page }) => {
          page
            .getByRole('navigation')
            .getByRole('menuitem', { name: 'application credentials' })
            .click();
          const url = `http://${hostname}:${port}/projects/${projectId}/settings/application-credentials/`;
          await page.waitForURL(url);
          // To help assert correct page
          await expect(
            page.getByText(
              'Create an application token to authenticate with the Fleek SDK.',
            ),
          ).toBeVisible();

          // To help ensure rows are ready
          await expect(page.getByRole('row').first()).toBeVisible();
        });

        it('Should have Application Credentials table items', async ({
          page,
        }) => {
          const table = page.getByRole('table', {
            name: 'Application credential list',
          });
          const rowCount = await table.getByRole('row').count();
          expect(rowCount > 1).toBeTruthy();
        });

        it('Should have Manage Credentials text', async ({ page }) => {
          const expectText = 'Manage Credentials';
          await expect(page.getByText(expectText)).toBeVisible();
        });
      });

      describe('On Settings navigation to Application Credentials (no-credentials data)', () => {
        let shouldOverrideApplications = false;

        beforeAll(() => {
          shouldOverrideApplications = true;
        });

        afterAll(() => {
          shouldOverrideApplications = false;
        });

        beforeEach(async ({ page }) => {
          await page.route('**/graphql', async (route) => {
            if (!shouldOverrideApplications) route.continue();

            const request = route.request();
            const postData = request.postDataJSON();

            if (postData.operationName === 'applications') {
              await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                  data: null,
                }),
              });
            } else {
              await route.continue();
            }
          });

          page
            .getByRole('navigation')
            .getByRole('menuitem', { name: 'application credentials' })
            .click();
          const url = `http://${hostname}:${port}/projects/${projectId}/settings/application-credentials/`;
          await page.waitForURL(url);
          // To help assert correct page
          await expect(
            page.getByText(
              'Create an application token to authenticate with the Fleek SDK.',
            ),
          ).toBeVisible();
        });

        it('Should have Application Credentials text', async ({ page }) => {
          await expect(
            page.getByText(
              'Create an application token to authenticate with the Fleek SDK',
            ),
          ).toBeVisible();
        });

        it('Should have Manage Credentials text', async ({ page }) => {
          await expect(page.getByText('Manage Credentials')).toBeVisible();
        });

        it('Should have Save changes button', async ({ page }) => {
          await expect(
            page.getByRole('button', { name: 'Create application credential' }),
          ).toBeVisible();
        });

        it('Should have credentials empty text', async ({ page }) => {
          const expectText = 'Once you add credentials, they will appear here.';
          await expect(page.getByText(expectText)).toBeVisible();
        });
      });
    });
  });
});
