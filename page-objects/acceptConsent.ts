import { Page, expect } from '@playwright/test';

export class singupAcceptConsent {
  constructor(private page: Page) {}

  async acceptConsent() {
    await this.page.goto('https://automationexercise.com/');
    await expect(this.page).toHaveTitle('Automation Exercise');

    const consentButton = this.page.getByRole('button', { name: 'Consent' });
    if (await consentButton.isVisible()) {
      await consentButton.click();
    }

      const responsePage = await this.page.request.get('https://automationexercise.com/');
      expect(responsePage.status()).toBe(200);

      const loginLink = this.page.locator('a[href="/login"]');
      await expect(loginLink).toBeVisible();
      await loginLink.click();

      const h2newUserSignUp = this.page.getByRole('heading', { name: 'New User Signup!' });
      await expect(h2newUserSignUp).toBeVisible();
  }

}
 