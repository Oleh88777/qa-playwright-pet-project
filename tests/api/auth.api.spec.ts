import {test, expect } from "@playwright/test";


test.beforeEach(async ({page}) => {
    await page.goto('https://automationexercise.com/');
});


test('Register user', async ({page, request}) => {
  const response = await request.post('https://automationexercise.com/api/createAccount', {
     form: {
      name: 'Oleh',
      email: 'mykhayliv8877@gmail.com',
      password: 'Europe2025$',
      title: 'Mr',
      birth_date: '31',
      birth_month: '03',
      birth_year: '1994',
      firstname: 'Oleh',
      lastname: 'Mykhayliv',
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

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('User created!');
});
