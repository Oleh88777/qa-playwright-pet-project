import { test, expect } from '@playwright/test';
import { singupAcceptConsent } from '../page-objects/acceptConsent';
import { signUpRegistration } from '../page-objects/signUp';

test.describe('Accept Consent', () => {

  let auutPage: singupAcceptConsent;
  
    test.beforeEach(async ({ page }) => {
    
      auutPage = new singupAcceptConsent(page);
      await auutPage.acceptConsent();
  });

  test('signUp', async ({ page }) => {
    const signUpfill = new signUpRegistration(page);
    await signUpfill.signUpRegistration();
   
    // radio buttons
    const radioButton = page.locator('#id_gender1');
    await expect(radioButton).toBeVisible();

    await radioButton.check();
    await expect(radioButton).toBeChecked();

    // title text
    const titleText = page.locator('.title.text-center', { hasText: 'Enter Account Information' });
    await expect(titleText).toBeVisible();

    await page.getByLabel('password').type('Europe2025$');

    // Date of birth
    const dateBirgt = page.locator('.form-group .row .selector #days');
    await dateBirgt.selectOption('31');

    // month of birth
    const monthBIrth = page.locator('.form-group .row #months');
    await monthBIrth.selectOption('March');
    expect(monthBIrth).toContainText('March');

    // year of birth
    const yearOfbirth = page.locator('.form-group .row #years');
    await yearOfbirth.selectOption('1994');

    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();

    // fill input field name
    const inputName = page.getByLabel('First name ');
    await inputName.click();
    await inputName.fill('Oleh');
    await expect(inputName).toHaveValue('Oleh');

    // fill last name
    const lastNameInput = page.getByLabel('Last name ');
    await lastNameInput.click();
    await lastNameInput.fill('Mykhayliv');
    expect(lastNameInput).toHaveValue('Mykhayliv');

    // fill input field company
    const companyIputField = page.getByLabel('Company').first();
    await companyIputField.click();
    await companyIputField.fill('Automation tests');
    await expect(companyIputField).toBeVisible();
    expect(companyIputField).toHaveValue('Automation tests');

    // fill in input field address
    const addressInputField = page.getByLabel('Address ').first();
    await addressInputField.click();
    expect(addressInputField).toBeVisible();
    await addressInputField.fill('Prague');

    // fill in input field address2
    const address2InputField = await page.getByLabel('Address 2');
    await address2InputField.click();
    await address2InputField.fill('Lviv');

    // select option
    const countryOption = page.getByLabel('Country ');
    await countryOption.selectOption('United States');

    const stateInputFied = page.locator('#state');
    stateInputFied.click();
    await stateInputFied.fill('Frankivski');
    await expect(stateInputFied).toHaveValue('Frankivski');

    // input city
    const inputCity = page.locator('#city');
    await inputCity.click();
    await inputCity.fill('Lviv');
    await expect(inputCity).toHaveValue('Lviv');

    // zipcode
    const zipCode = page.locator('#zipcode');
    await zipCode.click();
    await zipCode.fill('79000');
    await expect(zipCode).toHaveValue('79000');

    // mobile number
    const phoneNumber = page.locator('#mobile_number');
    await phoneNumber.click();
    await phoneNumber.fill('380961570878');
    expect(phoneNumber).toHaveValue('380961570878');

    // create account
    const buttonCreaAccount = page.getByRole('button', { name: 'Create Account' });
    await expect(buttonCreaAccount).toBeVisible();
    await expect(buttonCreaAccount).toHaveText('Create Account');
    await buttonCreaAccount.click();

    const accountCreatedText = page.locator('[data-qa="account-created"]');
    await expect(accountCreatedText).toContainText('Account Created!');

    //delete account
    const linkButtonContinue = page.getByRole('link', {name: 'Continue'});
    await expect(linkButtonContinue).toBeVisible();
    await linkButtonContinue.click();

    const deleteAccount = page.locator('a[href="/delete_account"]:has-text("Delete Account")');
    await deleteAccount.click();
  });
});
