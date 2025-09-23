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
    }

    async inputPassowrd(password: string) {
      const inputRegistrationPassowr = this.page.getByRole('textbox', ({name: 'password'}));
      await inputRegistrationPassowr.fill(apiUserData.password);
    }

    async addressFillFirstLastName(name: string, lastname: string) {
        const inputFirstname = this.page.locator('#first_name');
        await inputFirstname.click();
        await inputFirstname.fill(apiUserData.name);

        const inputLastName = this.page.locator('#last_name');
        await inputLastName.click();
        await inputLastName.fill(apiUserData.lastname);
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

}

