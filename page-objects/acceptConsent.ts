import {expect, Locator, Page} from "@playwright/test";

export class AcceptConsent {
   readonly page: Page;
   readonly buttonConsent: Locator;
    
    constructor(page: Page) {
      this.page = page
      this.buttonConsent = this.page.getByRole('button', {name: 'Consent'});
    }

    async acceptConsents() {
      
      await expect(this.buttonConsent).toBeVisible();
      await this.buttonConsent.click();
    }

    async continueShopping () {
        const buttonContinueShoping = this.page.getByRole('button', { name: 'Continue Shopping' })
        await buttonContinueShoping.click();
    }

}