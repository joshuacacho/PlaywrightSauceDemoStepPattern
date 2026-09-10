//either add these for Page Object Manager OR they will automatically be added
//when you decalre the Page Objects themselves within the constructor below

import { LoginPage } from "./loginPage.js";
import { LoggedInPage } from "./loggedInPage.js";

class PageObjectManager {
  //declare PageObjects here that we will use
  constructor(page) {
    //to make the page to be used everywhere
    this.page = page;

    //Declaring Page Objects
    this.loginPage = new LoginPage(this.page);
    this.loggedInPage = new LoggedInPage(this.page);
  }

  //creating custom methods to get the different pages
  getLoginPage() {
    return this.loginPage;
  }

  getLoggedInPage() {
    return this.loggedInPage;
  }
}
//export class to be used globally
export { PageObjectManager };
