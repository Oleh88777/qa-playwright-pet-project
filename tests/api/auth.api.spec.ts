import {test, expect, request} from "@playwright/test";
import { apiUserData } from "./test.api.apiData";


test.beforeEach(async ({request}) => {
    const gotoMainpage = await request.post('https://pagead2.googlesyndication.com/pagead/ping?e=1', {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        'dnt': '1',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
          'Chrome/140.0.0.0 Safari/537.36',
      },

      data: ''
    });

    expect(gotoMainpage.status()).toBe(204);
    console.log(gotoMainpage.status());
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

  console.log(JSON.stringify(apiUserData, null, 2));

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('User created!');
});
