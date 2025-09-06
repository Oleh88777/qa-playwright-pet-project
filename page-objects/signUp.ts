import { Page, expect } from '@playwright/test';
import { cpSync } from 'fs';
import { HelperBase } from './helperBase';

export class signUpRegistration extends HelperBase{
  constructor( page: Page) {
    super(page);
  }

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

async enterPhoneNumber () {
    const phoneNumber = this.page.locator('#mobile_number');
    await phoneNumber.click();
    await phoneNumber.fill('380961570878');
    expect(phoneNumber).toHaveValue('380961570878');
}

async inputCity () {
    const inputCity = this.page.locator('#city');
    await inputCity.click();
    await inputCity.fill('Lviv');
    await expect(inputCity).toHaveValue('Lviv');
}

 async zipCOde (){
    const zipCode = this.page.locator('#zipcode');
    await zipCode.click();
    await zipCode.fill('79000');
    await expect(zipCode).toHaveValue('79000');
 }

async inpuAddress () {
    const addressInputField = this.page.getByLabel('Address ').first();
    await addressInputField.click();
    expect(addressInputField).toBeVisible();
    await addressInputField.fill('Prague');

}

async inputAdress2 () {
    const address2InputField = this.page.getByLabel('Address 2');
    await address2InputField.click();
    await address2InputField.fill('Lviv');
}

async inputLastname() {
    const lastNameInput = this.page.getByLabel('Last name ');
    await lastNameInput.click();
    await lastNameInput.fill('Mykhayliv');
    expect(lastNameInput).toHaveValue('Mykhayliv');
}

async fillCompanyName() {
    const companyIputField = this.page.getByLabel('Company').first();
    await companyIputField.click();
    await companyIputField.fill('Automation tests');
    await expect(companyIputField).toBeVisible();
    expect(companyIputField).toHaveValue('Automation tests');
}

//   async fillLastName () {
//     const lastNameInput = this.page.getByLabel('Last name ');
//     await lastNameInput.click();
//     await lastNameInput.fill('Mykhayliv');
//     expect(lastNameInput).toHaveValue('Mykhayliv');
//   }

  async radioButons() {
    const radioButton = this.page.locator('#id_gender1');
    await expect(radioButton).toBeVisible();

    await radioButton.check();
    await expect(radioButton).toBeChecked();

  }

  async deleteAccount() {
    const signUpDeleteAccount = this.page.locator('a[href="/delete_account"]:has-text("Delete Account")');
    await expect(signUpDeleteAccount).toBeVisible();
    
    await signUpDeleteAccount.click();

    await expect(this.page).toHaveURL('https://automationexercise.com/delete_account');

    const confirmationDeleteMessage = this.page.locator('h2:has-text("Account Deleted!")');
    await expect(confirmationDeleteMessage).toBeVisible();
  }

  async inputNameSignUp()  {
    const inputName = this.page.getByLabel('First name ');
    await inputName.click();
    
    await inputName.fill('Oleh');
    await expect(inputName).toHaveValue('Oleh');
  }

  async inputLoginEmail() {
   const loginEmail = this.page.locator('input[data-qa="login-email"]');
   await expect(loginEmail).toBeVisible({ timeout: 10000 });
   await loginEmail.fill('mykhayliv88777@gmail.com');
   await expect(loginEmail).toHaveValue('mykhayliv88777@gmail.com');
  }

  async logininpuEnterPassowrd() {
   const logInPassowrd = this.page.getByRole('textbox', ({name: 'password'}));
   await logInPassowrd.click();

   await expect(logInPassowrd).toBeVisible();
   const loignPlaceholder = await logInPassowrd.getAttribute('placeholder');
   await expect(loignPlaceholder).toBe('Password');

   await logInPassowrd.fill('Europe2025$');
  }

  async logOut () {
   const logOutBtn = this.page.locator('[href="/logout"]');
    await expect(logOutBtn).toBeVisible();

    await logOutBtn.click();
  }


}