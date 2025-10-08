import {test, expect} from '@playwright/test'
import {MainNavigationBar} from '../../page-objects/navigationPage';
import { AcceptConsent } from '../../page-objects/acceptConsent';
import { AuthLoginSignup } from '../../page-objects/authPage';

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


test('Perform an Order ', async () => {
  await nav.navButtonSignupLogin();
  await loginSignUp.loginUserEmailPassoword(process.env.USER_STATIC_EMAIL!, process.env.USER_STATIC_PASSWORD!);
}); 

    
});