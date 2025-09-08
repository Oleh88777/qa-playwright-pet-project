import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.describe('Accept Consent', () => {
  let pages: PageManager;

  test.beforeEach(async ({ page }) => {
    pages = new PageManager(page);
    await pages.acceptConsent().acceptConsent();
  });

  test('Sign Up Registration Flow', async ({ page }) => {
    const signUp = pages.signUpRegister();

    // Registration flow
    await signUp.signUpRegistration();

    // Radio buttons
    await signUp.radioButons();

    // Title check
    const titleText = page.locator('.title.text-center', {
      hasText: 'Enter Account Information',
    });
    await expect(titleText).toBeVisible();

    // Password
    await page.getByLabel('password').fill('Europe2025$');

    // Date of birth
    await page.locator('#days').selectOption('31');
    await page.locator('#months').selectOption('March');
    await page.locator('#years').selectOption('1994');

    // Checkboxes
    await page
      .getByRole('checkbox', { name: 'Sign up for our newsletter!' })
      .check();
    await page
      .getByRole('checkbox', { name: 'Receive special offers from our partners!' })
      .check();

    // Personal details
    await signUp.inputNameSignUp();
    await signUp.inputLastname();
    await signUp.fillCompanyName();
    await signUp.inpuAddress();
    await signUp.inputAdress2();

    // Country
    await page.getByLabel('Country ').selectOption('United States');

    // State
    const stateInput = page.locator('#state');
    await stateInput.fill('Frankivski');
    await expect(stateInput).toHaveValue('Frankivski');

    // City, Zip, Phone
    await signUp.inputCity();
    await signUp.zipCOde();
    await signUp.enterPhoneNumber();

    // Submit form
    const createAccountBtn = page.getByRole('button', { name: 'Create Account' });
    await expect(createAccountBtn).toBeVisible();
    await expect(createAccountBtn).toHaveText('Create Account');
    await createAccountBtn.click();

    // Account created
    const accountCreatedText = page.locator('[data-qa="account-created"]');
    await expect(accountCreatedText).toContainText('Account Created!');

    // Continue
    await page.locator('[data-qa="continue-button"]').click();

    //Logout
    await signUp.logOut();
    // Delete account (optional)
    // await signUp.deleteAccount();
  });
});
