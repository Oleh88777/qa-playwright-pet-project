import {test, expect} from '@playwright/test'
import {MainNavigationBar} from '../../page-objects/navigationPage';
import { AcceptConsent } from '../../page-objects/acceptConsent';
import { AuthLoginSignup } from '../../page-objects/authPage';
import { cpSync } from 'fs';

test.describe.only('checkout flow order', () => {
  
  let nav: MainNavigationBar
  let consent: AcceptConsent
  let loginSignUp: AuthLoginSignup;

    test.beforeEach(async({page}) => {
      nav = new MainNavigationBar(page);
      consent = new AcceptConsent(page);
      loginSignUp = new AuthLoginSignup(page);

        await nav.openHomePage();
        await consent.acceptConsents();
});


test('Perform an Order ', async ({ page }) => {
  await nav.navButtonSignupLogin();
  await loginSignUp.loginUserEmailPassoword(process.env.USER_STATIC_EMAIL!, process.env.USER_STATIC_PASSWORD!);
  const buttonAddToCard = page.locator('.add-to-cart').first();
  await buttonAddToCard.click();
  await consent.continueShopping();
  await nav.buttonCard();

  const ProceedToChekcout = page.getByText("Proceed To Checkout");
  await expect(ProceedToChekcout).toBeVisible();
  await ProceedToChekcout.click();

  
const listItems = page.locator('#address_delivery li');
await expect(listItems).toHaveText([
  'Your delivery address',
  'Mr. Oleh Mykhayliv',
  'MyCompany',
  'Street 1',
  'Office 2',
  'Lviv Lviv 01001',
  'Ukraine',
  '+380501234567'
]);


const ordrQuantity = page.getByRole('button', {name: /\d+/});
const text = await ordrQuantity.textContent();
console.log(text, 'texy');

const numberText = Number(text);
console.log(numberText);

if (numberText > 2 ) {
   await nav.buttonCard();
   const deleteQInCard = page.locator('.cart_quantity_delete');
   await deleteQInCard.click();
}
}); 

    
});