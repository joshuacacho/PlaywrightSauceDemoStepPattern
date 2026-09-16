//Login Page Objects for /inventory.html page

//const {expect} = require('@playwright/test');



class LoggedInPage {

    constructor(page) {
        //activates browser for the entire page
        this.page = page;

        //define items that need to be used to. log in
        this.applogo = page.locator(".app_logo");
        this.cartIconLink = page.locator('.shopping_cart_link');
        this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu' });
        // Matches "LOGOUT", "Logout", or "logout" page.getByRole('link', { name: /logout/i });
        this.hamburgerMenuLogout =  page.locator('[data-test="logout-sidebar-link"]');

    }

    async logOutUser() {
        try {
            await this.hamburgerMenu.click();
            await this.hamburgerMenuLogout.click()

            

        } catch (error) {
            console.error(error.stack);
            throw error;
        }
    }
}

export { LoggedInPage };
