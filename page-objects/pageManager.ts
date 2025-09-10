import {Page, expect} from "@playwright/test";
import { singupAcceptConsent } from '../page-objects/acceptConsent';
import { signUpRegistration } from '../page-objects/signUp';
import { formImput } from "./formsInput";


export class PageManager {
    
    private readonly page: Page
    private readonly singUp: singupAcceptConsent
    private readonly signUpRegistration: signUpRegistration
    private readonly inputForms: formImput

    constructor(page: Page) {
      this.page = page
      this.singUp = new singupAcceptConsent(this.page);
      this.signUpRegistration = new signUpRegistration(this.page);
      this.inputForms = new formImput(this.page);
    }

    acceptConsent() {
        return this.singUp
    } 

    signUpRegister() {
        return this.signUpRegistration;
    }

    formImput() {
        return this.inputForms;
    }
}