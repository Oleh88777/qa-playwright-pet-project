import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

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
  })

});