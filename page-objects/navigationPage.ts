import {expect, Locator, Page} from "@playwright/test";

export class MainNavigationBar {
   readonly page: Page;
   readonly navButtonSignUpLogin: Locator;
    
    constructor(page: Page) {
      this.page = page
      this.navButtonSignUpLogin = this.page.getByRole('link', { name: 'Signup / Login' });
    }

    async openHomePage() {
     await this.page.goto('https://automationexercise.com/');
   }

   async navButtonSignupLogin() {
    // const navButtonSignUpLogin = this.page.getByRole('link', { name: 'Signup / Login' });
    await expect(this.navButtonSignUpLogin).toBeVisible();
    await this.navButtonSignUpLogin.click();
   }
}


