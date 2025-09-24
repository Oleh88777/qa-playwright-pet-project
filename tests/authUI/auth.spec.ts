import {test, expect, request} from '@playwright/test'
import {MainNavigationBar} from '../../page-objects/navigationPage';
import { AcceptConsent } from '../../page-objects/acceptConsent';
import { AuthLoginSignup } from '../../page-objects/authPage';
import {apiUserData} from '../api/test.api.apiData';


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

test('Register user case1', async ({page})=> {
loginSignUp = new AuthLoginSignup(page);
await expect(page).toHaveURL('https://automationexercise.com');

// login to signup
await nav.navButtonSignupLogin();
await loginSignUp.signUpInputNameEmail(apiUserData.name, apiUserData.email);

//input password
await loginSignUp.inputPassowrd(apiUserData.password);

// select day moth year of birth
await loginSignUp.selectDateOfBirth('31');
await loginSignUp.selectMonth('3');
await loginSignUp.selectYear('1994');

// select checkboxes
await loginSignUp.selectChekboxes();

// fill first and last name
await loginSignUp.addressFillFirstLastName(apiUserData.name, apiUserData.lastname);

//fill company name 
await loginSignUp.selectCompany('Twisto');

// fill address1 and address2
await loginSignUp.fillAddress1Address2('Jana Zelivskeho 57', 'Praha 3');

//secet country from dropdown
await loginSignUp.selectCountry('Canada');

// fill state city
await loginSignUp.stateCityFill('Derziv', 'Lviv');

// fill zip code and mobile number
await loginSignUp.zipCodeMobNumberFill('79000');
await loginSignUp.fillMobileNumber('380631234567');

// click create account button
const buttonCreateAccount = page.getByRole('button', {name: 'Create Account'});
await expect(buttonCreateAccount).toBeVisible();
await buttonCreateAccount.click();

// verify account created
const textAccountCreatex = page.getByText('Account Created!');
await expect(textAccountCreatex).toBeVisible();

// continue button visible and click it
const buttonContinueRegisterdUser = page.getByRole('link', {name: 'Continue'});
await expect(buttonContinueRegisterdUser).toBeVisible();
await buttonContinueRegisterdUser.click();

// verify 'Logged in as username' is visible
const navButtonLoggedinasUserName = (name: string) =>
  page.locator(`a:has-text("Logged in as ${apiUserData.name}")`);
  await expect(navButtonLoggedinasUserName(apiUserData.name)).toBeVisible();

  //delete account
  await nav.buttonDeleteAccount();
})

test('login user case2', async ({page, request}) => {
  loginSignUp = new AuthLoginSignup(page);
  nav = new MainNavigationBar(page);

  await nav.navButtonSignUpLogin.click();
 
  //create a user with statsic data
  const creatUserresponse = await request.post('https://automationexercise.com/api/createAccount', {
     form: {
      name: `Oleh`,
      email: `mykhayliv88777@gmail.com`,
      password: `Europe2025$`,
      title: 'Mr',
      birth_date: '31',
      birth_month: '03',
      birth_year: '1994',
      firstname: `Oleh`,
      lastname: `Mykhayliv`,
      company: 'MyCompany',
      address1: 'Street 1',
      address2: 'Office 2',
      country: 'Ukraine',
      zipcode: '01001',
      state: 'Lviv',
      city: 'Lviv',
      mobile_number: '+380501234567'
    }
   });

   expect(creatUserresponse.status()).toBe(200);
   const responseBody = await creatUserresponse.json();
   console.log('Response body:', responseBody);
   expect(responseBody.message).toBe('User created!');
   
   //fill user email and password and log in
   await loginSignUp.loginUserEmailPassoword('mykhayliv88777@gmail.com', 'Europe2025$');
   await nav.buttonLoginClick(); 

   //delete account
  await nav.buttonDeleteAccount();
  });


});
 