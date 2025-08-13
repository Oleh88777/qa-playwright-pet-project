import {test, expect } from '@playwright/test';

test.beforeEach('Open the main web page', async ({ page }) =>  {
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveTitle('Automation Exercise');
  const responsePage = await page.request.get('https://automationexercise.com/')
  await expect(responsePage.status()).toBe(200);
  
}) 

test('Navigate to Signup / Login Aceept Terms and Conditions', async ({ page }) => {
  const consentButton = page.getByRole('button', {name: 'Consent'});
  await expect(consentButton).toBeVisible();
  await consentButton.click();
  const logIn = await page.getByRole('listitem').filter({hasText: 'Signup / Login'})
  await logIn.click();
});

