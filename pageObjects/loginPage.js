//Login Page Objects for /login page

//const {expect} = require('@playwright/test');
import { loginData } from '../tests/testData/login';


class LoginPage {

    constructor(page) {
        //activates browser for the entire page
        this.page = page;

        //define items that need to be used to. log in
        this.username = page.locator("#user-name");
        this.password = page.locator("#password");
        this.loginButton = page.locator("#login-button")
        
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

}

export { LoginPage };