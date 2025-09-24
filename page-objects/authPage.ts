import { expect, Locator, Page} from "@playwright/test";
import { apiUserData } from "../tests/api/test.api.apiData";

export class AuthLoginSignup {
  readonly page: Page;
  readonly inputSignUpName: Locator;
  readonly inputSignUpEmail: Locator;
  readonly buttonSignUp: Locator;

    constructor(page: Page) {
      this.page  = page;
      this.inputSignUpName = page.getByRole('textbox', ({name: 'Name'}));
      this.inputSignUpEmail = page.getByRole('textbox', { name: 'Email Address' }).nth(1);
      this.buttonSignUp = page.getByRole('button').filter({hasText: 'Signup'})
    }

    async signUpInputNameEmail(name: string, email: string) {
       await this.inputSignUpName.fill(apiUserData.name);
       await this.inputSignUpEmail.fill(apiUserData.email);
       await this.buttonSignUp.click();

       let title = this.page.getByRole('heading', {name: 'Enter Account Information'});
       await expect(title).toBeVisible();
    }

    async inputPassowrd(password: string) {
      const inputRegistrationPassowr = this.page.getByRole('textbox', ({name: 'password'}));
      await inputRegistrationPassowr.fill(apiUserData.password);
    }

    async selectDateOfBirth(day: string) {
      const selectBirthday = this.page.locator('#days');
      await selectBirthday.selectOption('31');
      await expect(selectBirthday).toHaveValue('31')
    }

    async selectMonth(month: string) {
      const selectoMonth = this.page.locator('#months');
      await selectoMonth.selectOption('3'); 
    }
    
    async selectYear(year: string) {
      const selectbirthYear = this.page.locator('#years');
      await selectbirthYear.selectOption('1994');
    }

    async selectChekboxes () {
      const checkboxSinup = this.page.locator('#newsletter');
       await checkboxSinup.check();
       await expect(checkboxSinup).toBeChecked(); 
    }


    async addressFillFirstLastName(name: string, lastname: string) {
        const inputFirstname = this.page.locator('#first_name');
        await inputFirstname.click();
        await inputFirstname.fill(apiUserData.name);

        const inputLastName = this.page.locator('#last_name');
        await inputLastName.click();
        await inputLastName.fill(apiUserData.lastname);
    }

    async selectCompany(company: string) {
     const inputCOmpany = this.page.getByRole('textbox', {name: 'company'}).first();
     await inputCOmpany.click();
     await inputCOmpany.type(company);   
    }

    async fillAddress1Address2(address1: string, address2: string) {
        const inputAddress1 = this.page.locator('#address1');
        await inputAddress1.click();
        await inputAddress1.type(address1);

        const inputAddress2 = this.page.locator('#address2');
        await inputAddress2.click();
        await inputAddress2.type(address2);
    }

    async selectCountry(country: string) {
     const selectCountry = this.page.locator('#country');
     await selectCountry.selectOption(country);
    }

    async stateCityFill(state: string, city: string) {
        const inputState = this.page.locator('#state');
        await inputState.click();
        await inputState.fill(state);

        const inputCity = this.page.locator('#city');
        await inputCity.click();
        await inputCity.fill(city);
    }

    async zipCodeMobNumberFill(zipcode: string) {
        const zipcodeInput = this.page.locator('#zipcode');
        await zipcodeInput.click();
        await zipcodeInput.fill(zipcode);
    }

    async fillMobileNumber(number: string) {
        const mobileNumberInput = this.page.locator('#mobile_number');
        await mobileNumberInput.click();
        await mobileNumberInput.fill(number);
    }

    async loginUserEmailPassoword(email: string, password: string) {
      const inputLoginEmail = this.page.locator('[data-qa="login-email"]')
      await expect(inputLoginEmail).toBeVisible();
      await inputLoginEmail.click();
      await inputLoginEmail.fill(email);

      const loginPassowrd = this.page.locator('[data-qa="login-password"]')
      await expect(loginPassowrd).toBeVisible();
      await loginPassowrd.click();
      await loginPassowrd.fill(password);
    }
     

}
