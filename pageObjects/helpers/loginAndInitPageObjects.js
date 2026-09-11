// helpers/loginAndInitPageObjects.js

/*
loggedInPage fixture — auth/setup lives in one place instead of being copy-pasted
(or worse, done via UI login) at the top of every test.
*/

// PageObjectManager wires up and hands back every page object for a given `page`
import { PageObjectManager } from "../pageObjectMananger.js";
// Playwright's expect — used here for setup-time assertions (login succeeded / failed as expected)
import { expect } from '@playwright/test';

// browser: the Playwright Browser instance from the fixture
// user: { username, password, expectToSucceed } resolved from loginData by the fixture
async function loginAndInitPageObjects(browser, user) {
    // pull the three pieces of user info out of the object in one line
    const { username, password, expectToSucceed } = user;

    // open a brand-new, isolated browser context (its own cookies/storage — no bleed between tests)
    const context = await browser.newContext();
    // open a tab inside that context
    let page = await context.newPage();

    // build the set of page objects bound to this page
    let pObjManager = new PageObjectManager(page);
    // grab the login page object specifically, since that's all we need right now
    const loginPage = pObjManager.getLoginPage();

    // navigate the tab to the login page
    await loginPage.goToLoginPage();
    // fill in credentials and submit the login form
    await loginPage.login(username, password);

    // grab the page object for whatever page we land on after submitting login
    const postLoginHomePage = pObjManager.getLoggedInPage();

    // branch: this user is expected to FAIL login (e.g. locked_out_user)
    if (!expectToSucceed) {
        // read the actual error text rendered on the page after the failed login attempt
        const lockedOutUserTextMessage = await loginPage.lockedOutUserError.textContent();
        // confirm it matches the exact expected lockout copy — not just "some error appeared"
        expect(lockedOutUserTextMessage).toBe(loginPage.lockedOutUserErrorMessage);

        // stop here — there's no authenticated session to save for a failed login.
        // webContext is set to the same `context` used above (not a second one)
        // so the fixture's generic cleanup (ctx.page.close(); ctx.webContext.close())
        // still has valid objects to close, without needing special-case logic there.
        return {
            webContext: context,       // reuse the original context as "webContext"
            page,                      // the same page the failed login happened on
            pObjManager,               // page objects bound to that same page
            loginPage,                 // explicit reference, useful for asserting on error state directly
            postLoginHomePage,         // whatever page object we ended up on (didn't reach real inventory)
            userLoginPage: loginPage,          // aliased to match the success path's return shape
            userLoggedInPage: postLoginHomePage, // aliased to match the success path's return shape
        };
    }

    // reaching here means expectToSucceed was true — verify we actually landed
    // on the logged-in page before trusting the session enough to persist it
    await expect(postLoginHomePage.cartIconLink).toBeVisible();

    // save the authenticated session (cookies/localStorage) to disk so it can be reused
    await context.storageState({ path: 'state.json' });

    // spin up a second, separate context pre-loaded with that saved session —
    // this becomes the "real" context the test will actually interact with
    const webContext = await browser.newContext({ storageState: 'state.json' });
    // open a fresh tab inside that new authenticated context
    page = await webContext.newPage();
    // rebuild the page objects so they're wired to this new page, not the old one
    pObjManager = new PageObjectManager(page);

    // re-fetch page objects bound to the new page/context, for returning to the test
    const userLoginPage = pObjManager.getLoginPage();
    const userLoggedInPage = pObjManager.getLoggedInPage();

    // hand everything the test might need back to the fixture
    return {
        webContext,        // the new, authenticated context (fixture closes this in cleanup)
        page,               // the new page inside that context
        pObjManager,        // page objects bound to the new page
        loginPage,          // original login page object (bound to the now-discarded first page)
        postLoginHomePage,  // original post-login page object (also bound to the first page)
        userLoginPage,      // login page object bound to the NEW page — prefer this one in tests
        userLoggedInPage,   // logged-in page object bound to the NEW page — prefer this one in tests
    };
}

// make this available to the fixture file
export { loginAndInitPageObjects };