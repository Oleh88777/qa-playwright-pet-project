import {expect, Locator, Page} from "@playwright/test";

export class MainNavigationBar {
   readonly page: Page;
   readonly navButtonSignUpLogin: Locator;
   readonly navbuttonDeletAccount: Locator;
   readonly buttonLogin: Locator;
    
    constructor(page: Page) {
      this.page = page
      this.navButtonSignUpLogin = this.page.getByRole('link', { name: 'Signup / Login' });
      this.navbuttonDeletAccount = this.page.getByRole('link', ({name: 'Delete Account'}));
      this.buttonLogin = this.page.getByRole('button', {name: 'Login'});
    }

    async openHomePage() {
     await this.page.goto('https://automationexercise.com/');
   }

   async navButtonSignupLogin() {
    await expect(this.navButtonSignUpLogin).toBeVisible();
    await this.navButtonSignUpLogin.click();
   }

   async navButtonLogOut () {
    const buttonLogout = this.page.locator(`a:has-text("Logout")`);
    await expect(buttonLogout).toBeVisible();
    await buttonLogout.click();
   }

    async buttonDeleteAccount () {
      await this.navbuttonDeletAccount.click();
    }

    async buttonLoginClick() {
        await expect(this.buttonLogin).toBeVisible();
        await this.buttonLogin.click();
    }
}


