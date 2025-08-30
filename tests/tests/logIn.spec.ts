import { test, expect } from '@playwright/test';
import { singupAcceptConsent } from '../../page-objects/acceptConsent';
import { signUpRegistration } from '../../page-objects/signUp';

test.describe('Log in', () => {

    let signInpage: singupAcceptConsent;

  test.beforeEach(async ({ page }) => {
    signInpage = new singupAcceptConsent(page);
    await signInpage.acceptConsent();

  });

  test('Log in', async ({ page }) => {
    const loginLink = page.locator('a[href="/login"]');
    await expect(loginLink).toBeVisible();
    await loginLink.click();

    
    await expect(page).toHaveURL(/.*\/login/);

   // input email
   const loginEmail = page.locator('input[data-qa="login-email"]');
   await loginEmail.click();
   
   expect(loginEmail).toBeVisible();

   await loginEmail.fill('mykhayliv88777@gmail.com');
   expect(loginEmail).toHaveValue('mykhayliv88777@gmail.com');

   // input password
   const logInPassowrd = page.getByRole('textbox', ({name: 'password'}));
   await logInPassowrd.click();

   expect(logInPassowrd).toBeVisible();
   const loignPlaceholder = await logInPassowrd.getAttribute('placeholder');
   expect(loignPlaceholder).toBe('Password');

   await logInPassowrd.fill('Europe2025$');

   //login button
   const logInbutton = page.locator('[data-qa="login-button"]');
   await expect(logInbutton).toHaveText('Login')
   await expect(logInbutton).toHaveCSS('background-color', 'rgb(254, 152, 15)');
   await logInbutton.isVisible();
   
   await logInbutton.click();

   //user name
   const navLoggedInUserName = page.locator('b', { hasText: 'Oleh'});
   await expect(navLoggedInUserName).toBeVisible();

   //delte account
   const signUpDeleteAccount = new signUpRegistration(page);
   await signUpDeleteAccount.deleteAccount();
  });
});