import { test, expect } from '@playwright/test';

test.describe('Auth flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveTitle('Automation Exercise');

    const consentButton = page.getByRole('button', { name: 'Consent' });
    if (await consentButton.isVisible()) {
      await consentButton.click();
    }

    const responsePage = await page.request.get('https://automationexercise.com/');
    expect(responsePage.status()).toBe(200);

    const loginLink = page.locator('a[href="/login"]');
    await expect(loginLink).toBeVisible();
    await loginLink.click();

    const h2newUserSignUp = page.getByRole('heading', { name: 'New User Signup!' });
    await expect(h2newUserSignUp).toBeVisible();
  });

  test('Registration flow', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Name"]');
    await expect(nameInput).toBeVisible();

    await nameInput.click();
    await nameInput.fill('Oleh');

    const nameValue = await nameInput.inputValue();
    expect(nameValue).toEqual('Oleh');

    const inputNamePlaceholderValue = await nameInput.getAttribute('placeholder');
    expect(inputNamePlaceholderValue).toEqual('Name');

    const emailField = page.locator('input[data-qa="signup-email"]');
    await expect(emailField).toBeVisible();
    await emailField.click();

    await emailField.fill('mykhayliv88777@gmail.com');
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual('mykhayliv88777@gmail.com');

    const placeholderEmailValue = await emailField.getAttribute('placeholder');
    expect(placeholderEmailValue).toEqual('Email Address');

    const signupButton = page.locator('button[data-qa="signup-button"]');
    await expect(signupButton).toBeVisible();

    const buttonSigInText = await signupButton.textContent();
    expect(buttonSigInText).toEqual('Signup');

    await expect(signupButton).toHaveCSS('background-color', 'rgb(254, 152, 15)');
    await signupButton.click();

    // sign up form
    await expect(page).toHaveURL('https://automationexercise.com/signup');

    // radio buttons
    const radioButton = page.locator('#id_gender1');
    expect(radioButton).toBeVisible();

    await radioButton.check();
    await expect(radioButton).toBeChecked();

    // title text
    const titleText = page.locator('.title.text-center', { hasText: 'Enter Account Information' });
    await expect(titleText).toBeVisible();

    await page.getByLabel('password').fill('Europe2025$', { delay: 5000 });

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
    await inputName.pressSequentially('Oleh', { delay: 5000 });
    await expect(inputName).toHaveValue('Oleh');

    // fill last name
    const lastNameInput = await page.getByLabel('Last name ');
    await lastNameInput.click();
    await lastNameInput.fill('Mykhayliv');
    expect(lastNameInput).toHaveValue('Mykhayliv');

    // fill input field company
    const companyIputField = await page.getByLabel('Company').first();
    await companyIputField.click();
    await companyIputField.fill('Automation tests');
    await expect(companyIputField).toBeVisible();
    expect(companyIputField).toHaveValue('Automation tests');

    // fill in input field address
    const addressInputField = await page.getByLabel('Address ').first();
    await addressInputField.click();
    expect(addressInputField).toBeVisible();
    await addressInputField.fill('Prague');

    // fill in input field address2
    const address2InputField = await page.getByLabel('Address 2');
    await address2InputField.click();
    await address2InputField.fill('Lviv');

    // select option
    const countryOption = await page.getByLabel('Country ');
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
    const zipCode = await page.locator('#zipcode');
    await zipCode.click();
    await zipCode.fill('79000');
    await expect(zipCode).toHaveValue('79000');

    // mobile number
    const phoneNumber = await page.locator('#mobile_number');
    await phoneNumber.click();
    await phoneNumber.fill('380961570878');
    expect(phoneNumber).toHaveValue('380961570878');

    // create account
    const buttonCreaAccount = await page.getByRole('button', { name: 'Create Account' });
    await expect(buttonCreaAccount).toBeVisible();
    await expect(buttonCreaAccount).toHaveText('Create Account');
    await buttonCreaAccount.click();

    const accountCreatedText = page.locator('[data-qa="account-created"]');
    await expect(accountCreatedText).toContainText('Account Created!');
  });
});
