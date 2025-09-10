import {Page} from '@playwright/test';

export class formImput {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }


    async newUserSignUpInputFieldsNameEmail(name: string, email: string) {
      const nameInput = this.page.locator('input[placeholder="Name"]');
      await nameInput.fill(name);
      
      const emailField = this.page.locator('input[data-qa="signup-email"]');
      await emailField.fill(email);

      const signupButton = this.page.locator('button[data-qa="signup-button"]');
      await signupButton.click();
    }
}