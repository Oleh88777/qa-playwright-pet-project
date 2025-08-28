import { Page, expect } from '@playwright/test';

export class signUpRegistration {
  constructor(private page: Page) {}

  async signUpRegistration() {
     const nameInput = this.page.locator('input[placeholder="Name"]');
    await expect(nameInput).toBeVisible();

    await nameInput.click();
    await nameInput.fill('Oleh');

    const nameValue = await nameInput.inputValue();
    expect(nameValue).toEqual('Oleh');

    const inputNamePlaceholderValue = await nameInput.getAttribute('placeholder');
    expect(inputNamePlaceholderValue).toEqual('Name');

    const emailField = this.page.locator('input[data-qa="signup-email"]');
    await expect(emailField).toBeVisible();
    await emailField.click();

    await emailField.fill('mykhayliv88777@gmail.com');
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual('mykhayliv88777@gmail.com');

    const placeholderEmailValue = await emailField.getAttribute('placeholder');
    expect(placeholderEmailValue).toEqual('Email Address');

    const signupButton = this.page.locator('button[data-qa="signup-button"]');
    await expect(signupButton).toBeVisible();

    const buttonSigInText = await signupButton.textContent();
    expect(buttonSigInText).toEqual('Signup');

    await expect(signupButton).toHaveCSS('background-color', 'rgb(254, 152, 15)');
    await signupButton.click();

    await expect(this.page).toHaveURL('https://automationexercise.com/signup');
    
}

}