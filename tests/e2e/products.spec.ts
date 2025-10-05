import {test, expect} from '@playwright/test'
import {MainNavigationBar} from '../../page-objects/navigationPage';
import { AcceptConsent } from '../../page-objects/acceptConsent';
import { AuthLoginSignup } from '../../page-objects/authPage';

test.describe.only('Products flow cases 8-13', () => {

  let nav: MainNavigationBar
  let consent: AcceptConsent
  let loginSignUp: AuthLoginSignup;

    test.beforeEach(async({page}) => {
      nav = new MainNavigationBar(page);
      consent = new AcceptConsent(page);
      
        await nav.openHomePage();
        await consent.acceptConsents();
});


test('Varafi all products case 8', async ({page, request}) => {
  loginSignUp = new AuthLoginSignup(page);
  nav = new MainNavigationBar(page);
  
  //verefi main page is acessible and Hi is visible
   const mainTitleText = page.getByRole('heading', { name: /Automation\s*Exercise/i })
   await expect(mainTitleText).toBeVisible();

   // verefi is button is aceesible and visible and do click
   await nav.buttonProducts();

   //verefy response status code and url of the page.
   const productResponse = await request.get('https://automationexercise.com/products')
   await expect (page).toHaveURL('https://automationexercise.com/products');
   expect(productResponse.status()).toBe(200);
   
   const viewButton = page.locator('a[href="/product_details/1"]');
   await viewButton.click()

//verefiing is opened card url and response code is 200
 await expect(page).toHaveURL(/.*\/product_details.*/);
 const apiProductDetailsResponse = await request.get('https://automationexercise.com/product_details')
 expect(apiProductDetailsResponse.status()).toBe(200);

//verefi details of the product
const productName = page.getByRole('heading', { name: 'Blue Top' });
await expect(productName).toBeVisible();

const category = page.locator('p', { hasText: 'Category: Women > Tops' });
await expect(category).toBeVisible();

const price = page.locator('span:has-text("Rs. 500")').first();
await expect(price).toBeVisible();

const availability = page.getByRole('paragraph');
availability.filter({ hasText: 'Availability:'}).isVisible();

const condition = page.getByRole('paragraph');
condition.filter({hasText: 'Condition:'}).isVisible();

const brand = page.getByRole('paragraph');
brand.filter({hasText: 'Brand:'}).isVisible();
})

});