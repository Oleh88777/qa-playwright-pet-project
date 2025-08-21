import { test, expect } from '@playwright/test';

test.describe.serial('Auth flow', () => {

  test.beforeEach(async ({ page }) =>  {
    await page.goto('https://automationexercise.com/');

    await expect(page).toHaveTitle('Automation Exercise');
    const responsePage = await page.request.get('https://automationexercise.com/');
    await expect(responsePage.status()).toBe(200);
  });

  test('Navigate to Signup / Login & Registration', async ({ page }) => {
    //Sign up/ login button
    const consentButton = page.getByRole('button', { name: 'Consent' });
    await expect(consentButton).toBeVisible();
    await consentButton.click();
    const logIn = page.getByRole('listitem').filter({ hasText: 'Signup / Login' });
    const textSign_Login = await logIn.textContent();
    expect(textSign_Login).toEqual(' Signup / Login');
    await logIn.click();

    const h2newUserSignUp = page.locator('.signup-form', ({hasText: 'New User Signup!'}));
    expect (h2newUserSignUp).toBeVisible();


    //Input field Name
    const nameField = page.locator('input[placeholder="Name"]');
    const placeholderValue = await nameField.getAttribute('placeholder');
    expect (placeholderValue).toEqual('Name');
    
    await nameField.fill('Oleh');
    const nameValue = await nameField.inputValue();
    expect (nameValue).toEqual('Oleh');

    //input field email
    const emailField = page.locator('input[data-qa="signup-email"]');
    await emailField.click();
    const placeholderEmailValue = await emailField.getAttribute('placeholder');
    expect (placeholderEmailValue).toEqual('Email Address');

    await emailField.fill('mykhayliv88777@gmail.com');
    const emailValue = await emailField.inputValue();
    expect (emailValue).toEqual('mykhayliv88777@gmail.com');

    //Sign in button.
    const signupButton = page.locator('button[data-qa="signup-button"]');
    const buttonSigInText = await signupButton.textContent();
    expect(buttonSigInText).toEqual('Signup');
    await expect(signupButton).toHaveCSS('background-color','rgb(254, 152, 15)');

    await signupButton.click();

    //Account Inforamtion
    const radioButton = page.locator('#id_gender1');
    await radioButton.click();

    const titleText = page.locator('.title.text-center', ({hasText: 'Enter Account Information'}));
    await expect(titleText).toBeVisible();

    //Fill details: Title, Name, Email, Password, Date of birth
   
    await page.getByLabel('password').fill('Europe2025$', {delay: 50000});

    // Date of birth 
    const dateBirgt = page.locator('.form-group .row .selector #days');
    await dateBirgt.selectOption('31');


//     for(let day = 1; day <= 31; day++) {
//         await page.selectOption('#days', String(day));

//         const selected = await page.$eval('#days', el => el.value);
//         expect (selected).toBe(String(day));
//     }
//   });

// month of birth 
   const monthBIrth = page.locator('.form-group .row #months');
   await monthBIrth.selectOption('March');
   expect(monthBIrth).toContainText('March');
 
   //yaer of birth

   const yearOfbirth = page.locator('.form-group .row #years');
   await yearOfbirth.selectOption('1994');

   await page.getByRole('checkbox', {name: 'Sign up for our newsletter!'}).check();
   await page.getByRole('checkbox', {name: 'Receive special offers from our partners!'}).check();

// fill input filed name
   const inputName = page.getByLabel('First name ');
     await inputName.click();
     await inputName.pressSequentially('Oleh', {deley: 5000});
     await expect(inputName).toHaveValue('Oleh');

    //fill  Lst name
    const lastNameInput = await page.getByLabel('Last name ');
    await lastNameInput.click();
    await lastNameInput.fill('Mykhayliv');
    expect(lastNameInput).toHaveValue('Mykhayliv');

    // fill input field company
    const companyIputField = await page.getByLabel('Company').first();
     await companyIputField.click();
     await companyIputField.fill('Automation tests');
     await expect(companyIputField).toBeVisible();
     expect(companyIputField).toHaveValue('Automation tests');

     // fill in inputfield address
     const addressInputField = await page.getByLabel('Address ').first();
     await addressInputField.click();
     expect(addressInputField).toBeVisible();
     await addressInputField.fill('Prague');

     // fill in input field address2
     const address2InputField = await page.getByLabel('Address 2')
     await address2InputField.click();
     await address2InputField.fill('Lviv');

     //slect option
     const countryOption = await page.getByLabel('Country ');
     await countryOption.selectOption('United States');

     
     const stateInputFied = page.locator('#state');
     await stateInputFied.click
     await stateInputFied.fill('Frankivski');
     await expect(stateInputFied).toHaveValue('Frankivski');

     //input city
     const inputCity = page.locator('#city');
     await inputCity.click();
     await inputCity.fill('Lviv');
     await expect(inputCity).toHaveValue('Lviv');

    //zipcode 
    const zipCode = await page.locator('#zipcode');
     await zipCode.click();
     await zipCode.fill('79000');
     await expect(zipCode).toHaveValue('79000');

     //mobile number
     const phoneNumber = await page.locator('#mobile_number');
     await phoneNumber.click();
     await phoneNumber.fill('380961570878');
     expect(phoneNumber).toHaveValue('380961570878');

     // creata account 
     const buttonCreaAccount = await page.getByRole('button', {name: 'Create Account'});
     await expect(buttonCreaAccount).toBeVisible();
     await expect(buttonCreaAccount).toHaveText('Create Account');
     await buttonCreaAccount.click();
  });
});
