import {test, expect} from '@playwright/test'
import {MainNavigationBar} from '../../page-objects/navigationPage';
import { AcceptConsent } from '../../page-objects/acceptConsent';
import { AuthLoginSignup } from '../../page-objects/authPage';
import { cpSync } from 'fs';

test.describe.only('checkout flow order', () => {
  
  let nav: MainNavigationBar
  let consent: AcceptConsent
  let loginSignUp: AuthLoginSignup;

    test.beforeEach(async({page}) => {
      nav = new MainNavigationBar(page);
      consent = new AcceptConsent(page);
      loginSignUp = new AuthLoginSignup(page);

        await nav.openHomePage();
        await consent.acceptConsents();
});


test('Perform an Order ', async ({ page }) => {
  await nav.navButtonSignupLogin();
  await loginSignUp.loginUserEmailPassoword(process.env.USER_STATIC_EMAIL!, process.env.USER_STATIC_PASSWORD!);
  const buttonAddToCard = page.locator('.add-to-cart').first();
  await buttonAddToCard.click();
  await consent.continueShopping();
  await nav.buttonCard();
}); 

    
});