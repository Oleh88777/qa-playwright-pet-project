import {test, expect} from '@playwright/test'
import {MainNavigationBar} from '../page-objects/navigationPage';
import { AcceptConsent } from '../page-objects/acceptConsent';
import { AuthLoginSignup } from '../page-objects/authPage';

let name = 'Oleh';
let email = 'mykhayliv8877@gmail.com';
let password  = 'Europe2025$';

test.describe('Auth flow cases 1-5', () => {
  let nav: MainNavigationBar
  let consent: AcceptConsent
  let loginSignUp: AuthLoginSignup;

    test.beforeEach(async({page}) => {
      nav = new MainNavigationBar(page);
      consent = new AcceptConsent(page);
      
        await nav.openHomePage();
        await consent.acceptConsents();
})

test('Register user case:1', async ({page})=> {
loginSignUp = new AuthLoginSignup(page);

await expect(page).toHaveURL('https://automationexercise.com');
await nav.navButtonSignupLogin();
await loginSignUp.signUpInputNameEmail(name, email);

let title = page.getByRole('heading', {name: 'Enter Account Information'});
await expect(title).toBeVisible();

await loginSignUp.inputPassowrd(password);

const selectBirthBay = page.locator('#days');
await selectBirthBay.selectOption('31');
await expect(selectBirthBay).toHaveValue('31');

const selectoMonth = page.locator('#months');
await selectoMonth.selectOption('3');

const selectbirthYear = page.locator('#years');
await selectbirthYear.selectOption('1994');
})

});

