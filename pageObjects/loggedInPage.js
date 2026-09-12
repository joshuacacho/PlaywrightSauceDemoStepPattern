//Login Page Objects for /inventory.html page

//const {expect} = require('@playwright/test');



class LoggedInPage {

    constructor(page) {
        //activates browser for the entire page
        this.page = page;

        //define items that need to be used to. log in
        this.applogo = page.locator(".app_logo");
        this.cartIconLink = page.locator(".shopping_cart_link");
        this.loggedInPageURL = "/inventory.html"
    }

}

export { LoggedInPage };
