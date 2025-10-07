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
await availability.filter({ hasText: 'Availability:'}).isVisible();

const condition = page.getByRole('paragraph');
await condition.filter({hasText: 'Condition:'}).isVisible();

const brand = page.getByRole('paragraph');
await brand.filter({hasText: 'Brand:'}).isVisible();
})

test('Verify Product quantity in Card', async ({page}) => {
  
  // verefi that main page is visible
  const mainTitleText = page.getByRole('heading', { name: /Automation\s*Exercise/i })
  await expect(mainTitleText).toBeVisible();

  // clikc on the random view Product button
  const link = page.getByRole('link', { name : 'View Product' });
  await link.first().waitFor();

  const count = await link.count();
  const randomIndex = Math.floor(Math.random() * count);
  await link.nth(randomIndex).click();

  //Fill product quentity 4
  await page.fill('#quantity', '4');

  // add and view items in the card
  await page.getByText('Add to cart').click();
  await page.getByText('View Cart').click();
  const quantityText =  (page.getByRole('button', {name: '4'}));
  await expect(quantityText).toBeVisible();
  
  await page.close();
})

});