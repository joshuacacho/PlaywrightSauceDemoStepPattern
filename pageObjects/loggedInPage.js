//Login Page Objects for /inventory.html page

//const {expect} = require('@playwright/test');
import { expect } from '@playwright/test';



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
        this.inventoryItemImages = page.locator(".inventory_item a img[src^='/assets']");
        this.invetoryItemText = page.locator(".inventory_item_name");
        this.productSortItems = page.locator(".product_sort_container");
        this.addItemsToCartButtons = page.locator("button[id^='add-to-cart']");
        this.removeItemsFromCartButtons = page.locator("button[id^='remove-']");

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

    async getSortedItemList() {

        try {
            let itemInventory = [];
             // dont use length because its length hasnt been defined yet
            let itemCount = await this.invetoryItemText.count();

            for (let i=0; i<itemCount; i++) {
                let itemText = await this.invetoryItemText.nth(i).textContent();
                itemInventory.push(itemText);
            }

        return itemInventory;

        } catch (error) {
            console.error(error.stack);
            throw error;
        }
        
    }


    async sortList(selection) {
        
        try {

           await this.productSortItems.selectOption(selection);

        } catch (error) {
            console.error(error.stack)
            throw error
        }


    }

    async addRandomItemsToCart(itemsToAdd) {

        try {

            for (let i =0; i< itemsToAdd; i++) {
                const addItemToCartCount = await this.addItemsToCartButtons.count();
                const randomIndex = Math.floor(Math.random() * addItemToCartCount);
                await this.addItemsToCartButtons.nth(randomIndex).click();
            }
            
        } catch (error) {
            console.error(error.stack);
            throw error
        }
    }

    async removeItemsFromCart(itemsToRemove) {

        try {

            await this.cartIconLink.click();

             for (let i =0; i< itemsToRemove; i++) {
                const removeItemsFromCartCount = await this.removeItemsFromCartButtons.count();
                const randomIndex = Math.floor(Math.random() * removeItemsFromCartCount);
                await this.removeItemsFromCartButtons.nth(randomIndex).click();
            }

        } catch (error) {

            console.error(error.stack);
            throw error
        }
    }

    async removeAllItemsFromCart() {

        try {

            await this.cartIconLink.click();
            let currentCount = await this.removeItemsFromCartButtons.count()
    

            while (currentCount > 0) {
                let remainingItemsInCart = await this.removeItemsFromCartButtons.count();


                
                const itemToDelete = await this.removeItemsFromCartButtons.first() // always remove the first item
                //const itemId = await itemToDelete.getAttribute('id');

                // capture WHICH item this actually is before clicking, in case the
                // index shifts out from under us between selection and click
                //console.log(`[about to click] id=${itemId}`);

                await itemToDelete.click();
                //console.log(`[clicked] id=${itemId}, waiting for count to reach ${remainingItemsInCart - 1}`);

                
                // quoted attribute selector treats itemId as a literal string value,
                // so special characters like . ( ) don't need escaping the way they
                // do in a bare #id selector — and this works in Node, unlike CSS.escape()
                //await this.page.locator(`[id="${itemId}"]`).waitFor({ state: 'detached' });
                
                await expect(this.removeItemsFromCartButtons).toHaveCount(remainingItemsInCart - 1);
                //console.log(`[count confirmed] now at ${remainingItemsInCart - 1}`);

                // check badge state immediately after each individual removal,
                // not just at the end — to see if lag happens throughout or only at the end
                    // const listCountNow = await this.removeItemsFromCartButtons.count();
                    // const badgeTextNow = await this.cartIconLink.textContent().catch(() => '(not found)');
                    // console.log(`[post-removal check] expected remaining=${remainingItemsInCart - 1}, list count=${listCountNow}, badge text="${badgeTextNow}"`);
                
                currentCount = await this.removeItemsFromCartButtons.count()
            
            }

        } catch (error) {

            console.error(error.stack);
            throw error
        }
    }


    async getItemsInCart() {
        
        try {

            let cartCount = await this.cartIconLink.textContent();
            
            return cartCount;

        } catch (error) {
            console.error(error.stack)
            throw error
        }
    }




}

export { LoggedInPage };
