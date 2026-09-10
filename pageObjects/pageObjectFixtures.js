// fixtures/pageObjectFixtures.js
import {test as baseTest, expect as baseExpect} from '@playwright/test';
import { loginAndInitPageObjects } from '../pageObjects/helpers/loginAndInitPageObjects.js';
import { loginData } from '../tests/testData/login.js';

export const test = baseTest.extend({
  loggedInPage: async ({ browser }, use) => {
    const ctx = await loginAndInitPageObjects(browser, loginData.email, loginData.password);

    await use(ctx); // test gets { page, pObjManager, loginPage, homeEvntPage, evntDetailsPage, myBookingsPage, myBookingsDetailsPage, admEvntPage, postLoginHomePage, webContext }

    // cleanup — you were doing page.close() in afterAll before, do it here instead
    await ctx.page.close();
    await ctx.webContext.close();
  },
});

export const expect = baseExpect;
