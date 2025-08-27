import { Page } from "@playwright/test"; 

export class RegistrationPage {
  
    readonly page: Page;
    
    constructor (page: Page) {
      this.page = page;
    } 

    async acceptTerms() {
      const consentButton = this.page.getByRole('button', { name: 'Consent' });
    
      if (await consentButton.isVisible()) {
      await consentButton.click();
    }
  }
}  