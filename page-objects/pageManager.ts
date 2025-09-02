import {Page, expect} from "@playwright/test";
import { singupAcceptConsent } from '../page-objects/acceptConsent';
import { signUpRegistration } from '../page-objects/signUp';


export class PageManager {
    
    private readonly page: Page
    private readonly singUp: singupAcceptConsent
    private readonly signUpRegistration: signUpRegistration 

    constructor(page: Page) {
      this.page = page
      this.singUp = new singupAcceptConsent(this.page);
      this.signUpRegistration = new signUpRegistration(this.page);
    }

    acceptConsent() {
        return this.singUp
    } 

    signUpRegister() {
        return this.signUpRegistration;
    }
}