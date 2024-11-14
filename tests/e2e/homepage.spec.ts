import { test as it, expect } from '@playwright/test';

const { describe, beforeEach } = it;

describe('On Home page', () => {
  describe('A non-authenticated user', () => {
    beforeEach(async ({ page }) => {
      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}`);
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
      await page.context().addCookies([{
        name: 'accessToken',
        value: invalidToken,
        domain: 'localhost',
        path: '/',
      }, {
        name: 'authProviderToken',
        value: invalidToken,
        domain: 'localhost',
        path: '/',
      },{
        name: 'projectId',
        value: 'cm0dprxuf0006lms9sz9riexw',
        domain: 'localhost',
        path: '/',
      }]);
      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}`);
    });

    it('Should redirect to the homepage', async ({ page }) => {
      await page.waitForURL('**/', {
        timeout: 0,
        waitUntil: 'networkidle',
      });
      await expect(page).toHaveTitle(/Home - Fleek/);      
    });
  });
});


