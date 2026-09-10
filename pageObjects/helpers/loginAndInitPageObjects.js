// helpers/loginAndInitPageObjects.js

/*
loggedInPage fixture — auth/setup lives in one place instead of being copy-pasted (or worse, done via UI login) at the top of every test. This is the single biggest win over old-style Selenium scripts.
*/

import { PageObjectManager } from "../pageObjectMananger.js";
import { expect } from '@playwright/test';

async function loginAndInitPageObjects(browser, email, password) {
    const context = await browser.newContext();
    // creates a new tab in the opened browser
    let page = await context.newPage();

    // INITIAL - initiate Page Object Manager Class
    let pObjManager = new PageObjectManager(page);

    // give life to the page objects of the login page
    const loginPage = pObjManager.getLoginPage();

    // navigate to the log in page
    await loginPage.goToLoginPage();

    // use the //testData/login.js
    await loginPage.login(email, password);

    // give life to the page objects of the page seen AFTER logging in
    const postLoginHomePage = pObjManager.getLoggedInPage();

    // verify you are on the logged in home page first with the Home button
    await expect(postLoginHomePage.cartIconLink).toBeVisible();

    // store storage state for reuse
    await context.storageState({ path: 'state.json' });

    // inject the state.json file in a new browser context
    const webContext = await browser.newContext({ storageState: 'state.json' });

    // ⚠️ CRITICAL: reassign page AND pObjManager to the NEW context (new page)
        /* 
        So the sequence is:
            New context = new isolated browser session. 
            New page from that context = your actual "tab" in that session.
            New PageObjectManagerFBF = rebuild every page object so they're all wired to the new page, not silently still driving the old, possibly now-closed or wrong-session page.
        */
    page = await webContext.newPage();  // fresh NEW webContext (new page)
    pObjManager = new PageObjectManager(page);

    // initialize all page objects ONCE

    // const crtEvntPage = pObjManager.getCreateEventPage();
    // const userloginPage = pObjManager.getLoginPage(); // BOUND TO NEW PAGE (new context)
    const userLoginPage = pObjManager.getLoginPage(); // BOUND TO NEW PAGE (new context)
    const userLoggedInPage = pObjManager.getLoggedInPage();
 
    console.log("Login and Page Object Init success");

    // return everything the tests will need
    return {
        webContext,
        page,
        pObjManager,
        loginPage,
        postLoginHomePage,
        userLoginPage,
        userLoggedInPage,
    };
}

export { loginAndInitPageObjects };