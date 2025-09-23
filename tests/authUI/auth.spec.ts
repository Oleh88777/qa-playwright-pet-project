import {test, expect} from '@playwright/test'
import {MainNavigationBar} from '../../page-objects/navigationPage';
import { AcceptConsent } from '../../page-objects/acceptConsent';
import { AuthLoginSignup } from '../../page-objects/authPage';
import {apiUserData} from '../api/test.api.apiData';


test.describe.only('Auth flow cases 1-5', () => {
  let nav: MainNavigationBar
  let consent: AcceptConsent
  let loginSignUp: AuthLoginSignup;

    test.beforeEach(async({page}) => {
      nav = new MainNavigationBar(page);
      consent = new AcceptConsent(page);
      
        await nav.openHomePage();
        await consent.acceptConsents();
})

test('Register user case1', async ({page})=> {
loginSignUp = new AuthLoginSignup(page);

await expect(page).toHaveURL('https://automationexercise.com');
await nav.navButtonSignupLogin();
await loginSignUp.signUpInputNameEmail(apiUserData.name, apiUserData.email);

let title = page.getByRole('heading', {name: 'Enter Account Information'});
await expect(title).toBeVisible();

await loginSignUp.inputPassowrd(apiUserData.password);

const selectBirthBay = page.locator('#days');
await selectBirthBay.selectOption('31');
await expect(selectBirthBay).toHaveValue('31');

const selectoMonth = page.locator('#months');
await selectoMonth.selectOption('3');

const selectbirthYear = page.locator('#years');
await selectbirthYear.selectOption('1994');

const checkboxSinup = page.locator('#newsletter');
await checkboxSinup.check();
await expect(checkboxSinup).toBeChecked();

const chekcBoxOffers = page.locator('#optin');
await chekcBoxOffers.check();
await expect(chekcBoxOffers).toBeChecked();

await loginSignUp.addressFillFirstLastName(apiUserData.name, apiUserData.lastname);

const inputCOmpany = page.getByRole('textbox', {name: 'company'}).first();
await inputCOmpany.click();
await inputCOmpany.type('Twisto');

const inputAddress1 = page.locator('#address1');
await inputAddress1.click();
await inputAddress1.type('Jana Zelivskeho 57');

const inputAddress2 = page.locator('#address2');
await inputAddress2.click();
await inputAddress2.type('Volodumer Velukoho 53/30');

const selectCountry = page.locator('#country');
await selectCountry.selectOption('United States');

await loginSignUp.stateCityFill('Derziv', 'Lviv');

await loginSignUp.zipCodeMobNumberFill('79000');
await loginSignUp.fillMobileNumber('380631234567');

const buttonCreateAccount = page.getByRole('button', {name: 'Create Account'});
await expect(buttonCreateAccount).toBeVisible();
await buttonCreateAccount.click();

const textAccountCreatex = page.getByText('Account Created!');
await expect(textAccountCreatex).toBeVisible();

const buttonContinueRegisterdUser = page.getByRole('link', {name: 'Continue'});
await expect(buttonContinueRegisterdUser).toBeVisible();
await buttonContinueRegisterdUser.click();

const navButtonLoggedinasUserName = (name: string) =>
  page.locator(`a:has-text("Logged in as ${apiUserData.name}")`);
  await expect(navButtonLoggedinasUserName(apiUserData.name)).toBeVisible();

  await nav.buttonDeleteAccount();
})

});