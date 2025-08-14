import { test, expect } from '@playwright/test';

test.describe.serial('Auth flow', () => {

  test.beforeEach(async ({ page }) =>  {
    await page.goto('https://automationexercise.com/');

    await expect(page).toHaveTitle('Automation Exercise');
    const responsePage = await page.request.get('https://automationexercise.com/');
    await expect(responsePage.status()).toBe(200);
  });

  test('Navigate to Signup / Login & Registration', async ({ page }) => {
    //Sign up/ login button
    const consentButton = page.getByRole('button', { name: 'Consent' });
    await expect(consentButton).toBeVisible();
    await consentButton.click();
    const logIn = page.getByRole('listitem').filter({ hasText: 'Signup / Login' });
    const textSign_Login = await logIn.textContent();
    expect(textSign_Login).toEqual(' Signup / Login');
    await logIn.click();

    const h2newUserSignUp = page.locator('.signup-form', ({hasText: 'New User Signup!'}));
    expect (h2newUserSignUp).toBeVisible();


    //Input field Name
    const nameField = page.locator('input[placeholder="Name"]');
    const placeholderValue = await nameField.getAttribute('placeholder');
    expect (placeholderValue).toEqual('Name');
    
    await nameField.fill('Oleh');
    const nameValue = await nameField.inputValue();
    expect (nameValue).toEqual('Oleh');

    //input field email
    const emailField = page.locator('input[data-qa="signup-email"]');
    await emailField.click();
    const placeholderEmailValue = await emailField.getAttribute('placeholder');
    expect (placeholderEmailValue).toEqual('Email Address');

    await emailField.fill('mykhayliv88777@gmail.com');
    const emailValue = await emailField.inputValue();
    expect (emailValue).toEqual('mykhayliv88777@gmail.com');

    //Sign in button.
    const signupButton = page.locator('button[data-qa="signup-button"]');
    const buttonSigInText = await signupButton.textContent();
    expect(buttonSigInText).toEqual('Signup');
    await expect(signupButton).toHaveCSS('background-color','rgb(254, 152, 15)');

    await signupButton.click();

    //Account Inforamtion
    const radioButton = page.locator('#id_gender1');
    await radioButton.click();

    const titleText = page.locator('.title.text-center', ({hasText: 'Enter Account Information'}));
    await expect(titleText).toBeVisible();

    //Fill details: Title, Name, Email, Password, Date of birth
   
    await page.getByLabel('password').fill('Europe2025$', {delay: 50000});
  });
});


