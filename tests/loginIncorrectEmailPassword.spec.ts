import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { formImput } from '../page-objects/formsInput';
import { info } from 'console';
let userName = 'Oleh';
let userEmail = 'mykhayliv88777@gmail.com'

test.describe('Accept Consent', () => {
  let pages: PageManager;

  test.beforeEach(async ({ page }) => {
    pages = new PageManager(page);
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(page).toHaveTitle('Automation Exercise');
    
    await pages.acceptConsent().acceptConsentWrongloginEmail();
   
  });

  test('test', async ({page}) => {
   await expect(page).toHaveURL('https://automationexercise.com/login');
   const signUpTitle = page.locator('.signup-form h2');
   await expect(signUpTitle).toBeVisible();
   await expect(signUpTitle).toHaveText('New User Signup!')

   const form = new formImput(page);
   await form.newUserSignUpInputFieldsNameEmail(userName, userEmail);

   const infoTetxt =  page.getByText('Email Address already exist!');
   await expect(infoTetxt).toHaveText('Email Address already exist!');
   await expect(infoTetxt).toHaveCSS('color', 'rgb(255, 0, 0)');
  })

});