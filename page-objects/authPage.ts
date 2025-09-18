import { expect, Locator, Page} from "@playwright/test";

let name = 'Oleh';
let email = 'mykhayliv8877@gmail.com';
let passowrd = 'Europe2025$';


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
       await this.inputSignUpName.fill(name);
       await this.inputSignUpEmail.fill(email);
       await this.buttonSignUp.click();
    }

    async inputPassowrd(password: string) {
      const inputRegistrationPassowr = this.page.getByRole('textbox', ({name: 'password'}));
      await inputRegistrationPassowr.fill(password);
    }
}

