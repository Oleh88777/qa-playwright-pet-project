import {test, expect } from "@playwright/test";
import { faker} from "@faker-js/faker";
import { apiUserData } from "./test.api.apiData";


test.beforeEach(async ({page}) => {
    await page.goto('https://automationexercise.com/');
});


test('Register user', async ({page, request}) => {
    
   
    const response = await request.post('https://automationexercise.com/api/createAccount', {
     form: {
      name: `${apiUserData.name}`,
      email: `${apiUserData.email}`,
      password: `${apiUserData.password}`,
      title: 'Mr',
      birth_date: '31',
      birth_month: '03',
      birth_year: '1994',
      firstname: `${apiUserData.name}`,
      lastname: `${apiUserData.lastname}`,
      company: 'MyCompany',
      address1: 'Street 1',
      address2: 'Office 2',
      country: 'Ukraine',
      zipcode: '01001',
      state: 'Lviv',
      city: 'Lviv',
      mobile_number: '+380501234567'
    }
  })

  console.log(response);
  console.log(JSON.stringify(apiUserData, null, 2));

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('User created!');
});
