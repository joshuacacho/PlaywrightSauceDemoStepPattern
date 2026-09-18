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
        this.inventoryItemImages = page.locator(".inventory_item_img");

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


    async getAllImages() {

        try {
            let imageInventory = [];
             // dont use length because its length hasnt been defined yet
            let imageCount = await this.inventoryItemImages.count();

            for (let i=0; i<imageCount; i++) {
                let imageItem = await this.inventoryItemImages.nth(i).getAttribute('src');
                imageInventory.push(imageItem);
            }

        return imageInventory;

        } catch (error) {
            console.error(error.stack);
            throw error;
        }
        
    }
}

export { LoggedInPage };
