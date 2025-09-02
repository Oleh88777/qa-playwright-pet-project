import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'

test.describe('Log in', () => {

    let pages: PageManager;

  test.beforeEach(async ({ page }) => {
    pages = new PageManager(page);

    await pages.acceptConsent().acceptConsent();

  });

  test('Log in', async ({ page }) => {
    const signUp = pages.signUpRegister();
    
    const loginLink = page.locator('a[href="/login"]');
    await expect(loginLink).toBeVisible();
    await loginLink.click();

    
    await expect(page).toHaveURL(/.*\/login/);

   // input email & password
    await signUp.inputLoginEmail();
    await signUp.logininpuEnterPassowrd();

   // input password
    // const loginInputPassword = new signUpRegistration(page);
    // await loginInputPassword.logininpuEnterPassowrd();

   //login button
   const logInbutton = page.locator('[data-qa="login-button"]');
   await expect(logInbutton).toHaveText('Login')
   await expect(logInbutton).toHaveCSS('background-color', 'rgb(254, 152, 15)');
   await logInbutton.isVisible();
   
   await logInbutton.click();

   //user name
   const navLoggedInUserName = page.locator('b').filter({ hasText: 'Oleh' });
   await expect(navLoggedInUserName).toBeVisible({ timeout: 10000 });

   //delte account
   await signUp.deleteAccount();
  });
});