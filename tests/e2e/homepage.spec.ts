import { test, expect } from '@playwright/test';

const { describe } = test;

describe('On Home page', () => {
  describe('A non-authenticated user', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`http://localhost:${process.env.NEXT_DEV_SERVER_PORT}`);
    });

    test('Should get the title page "Home"', async ({ page }) => {
      await expect(page).toHaveTitle(/Home - Fleek/);
    });

    test('Should have login or signup modal', async ({ page }) => {
      const el = page.locator('.modal');
      await expect(el).toContainText('Log in or sign up');
    });

    test('Should have a sign-in header button', async ({ page }) => {
      const el = page.locator('header');
      await expect(el).toContainText('Sign in');
    });
  });  
});


