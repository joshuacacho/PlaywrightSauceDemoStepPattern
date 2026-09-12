//Login Page Objects for /login page

import { expect } from '@playwright/test';
import { loginData } from '../tests/testData/login';


class LoginPage {

    constructor(page) {
        //activates browser for the entire page
        this.page = page;

        //define items that need to be used to. log in
        this.username = page.locator("#user-name");
        this.password = page.locator("#password");
        this.loginButton = page.locator("#login-button")
        this.lockedOutUserError = page.locator("h3[data-test='error']");
        this.lockedOutUserErrorMessage = "Epic sadface: Sorry, this user has been locked out.";
        this.multiUserError = page.locator("h3[data-test='error']");
        
    }

    //method to go to log in page
    async goToLoginPage() {
        try {

            await this.page.goto(loginData.BASE_URL);

        } catch (error) {
            console.error(error.stack)
            throw error
        }
    } 

    //method to log in using user
    async login(username,password) {
        try {

            await this.username.fill(username);
            await this.password.fill(password);
            await this.loginButton.click();

        } catch (error) {
            console.error(error.stack)
            throw error
        }
    }

    //method to test failed logins
    async invalidLoginByField(fieldName){

        try{

            let error = ""; //placeholder for error

            if(fieldName == "name") {
                await this.username.fill(loginData.invalid_user.username);
            }

            if (fieldName == "password") {
                await this.password.fill(loginData.invalid_user.password);
            }

            if (fieldName == "loginInvalidUser") {
                await this.username.fill(loginData.invalid_user.username);
                await this.password.fill(loginData.invalid_user.password);
            }

            if (fieldName == null) {
                // intentionally left blank: leave both fields empty to test the "no username/password" case.
            }

            await this.loginButton.click();

            // Force to wait until the text box actually populates with content
            await expect(this.multiUserError).not.toBeEmpty();

            error = await this.multiUserError.textContent();

            return error;

        } catch (error) {
            console.error(error.stack);
            throw error
        }
    }

}

export { LoginPage };