//Login Page Objects for /login page

import { expect } from '@playwright/test';
import { loginData } from '../tests/testData/login';
import { performance } from 'node:perf_hooks';
import { pageURL } from '../tests/testData/pageURLs';


class LoginPage {

    constructor(page) {
        //activates browser for the entire page
        this.page = page;

        //define items that need to be used to. log in
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loggedOutLogBackInErrorMessage = page.locator("h3[data-test='error']");
        this.lockedOutUserError = page.locator("h3[data-test='error']");
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



    //method to test performance
    async performanceLogIn(username) {
        try {

            let duration = 0;

            let start_duration = performance.now();
            await this.login(loginData[username].username, loginData[username].password);
            await expect(this.page).toHaveURL(loginData.BASE_URL + pageURL.INVENTORY_PAGE);
            duration = (performance.now() - start_duration) / 1000;  //to return value in seconds
            console.log(loginData[username].username + " " + duration);

            return duration;

        } catch (error) {
            console.error(error.stack)
            throw error
        }
    }

    //method to test failed logins
    async invalidLoginByField(fieldName){

        try{

            let error = ""; //placeholder for error

            //combination using valid and invalid user data
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

             // Case Sensitivity Tests
            if ( fieldName == "validUpperCaseSensitive") {
                await this.username.fill(loginData.standard_user.username.toUpperCase());
                await this.password.fill(loginData.standard_user.password);
            }

            if ( fieldName == "validMixedCaseSensitive") {
                await this.username.fill(loginData.mixed_case_sensitive.usernameMixedCase); 
                await this.password.fill(loginData.standard_user.password);
            }
            
            // Boundary Tests
            if ( fieldName == "validLeadingSpace") {
                await this.username.fill(" " + loginData.standard_user.username); 
                await this.password.fill(loginData.standard_user.password);
            }

            if ( fieldName == "validTrailingSpace") {
                await this.username.fill(loginData.standard_user.username + " "); 
                await this.password.fill(loginData.standard_user.password);
            }

            if ( fieldName == "validLeadingTrailingSpaces") {
                await this.username.fill(" " + loginData.standard_user.username + " "); 
                await this.password.fill(loginData.standard_user.password);
            }

            if ( fieldName == "validLeadingSpaces") {
                await this.username.fill(" " + loginData.standard_user.username + " "); 
                await this.password.fill(loginData.standard_user.password);
            }

            if ( fieldName == "validLeadingSpacesPassword") {
                await this.username.fill(loginData.standard_user.username); 
                await this.password.fill(" " + loginData.standard_user.password);
            }

            if ( fieldName == "validTrailingSpacesPassword") {
                await this.username.fill(loginData.standard_user.username ); 
                await this.password.fill(loginData.standard_user.password + " ");
            }

            if ( fieldName == "validLeadTrailingSpacesPassword") {
                await this.username.fill(loginData.standard_user.username ); 
                await this.password.fill(" " + loginData.standard_user.password + " ");
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