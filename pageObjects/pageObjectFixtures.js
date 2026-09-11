// fixtures/pageObjectFixtures.js

// import Playwright's base test/expect, aliased so we can extend them below
import { test as baseTest, expect as baseExpect } from '@playwright/test';
// the helper that actually performs login + builds page objects for a given user
import { loginAndInitPageObjects } from '../pageObjects/helpers/loginAndInitPageObjects.js';
// the map of all known SauceDemo users (username/password/expectToSucceed per user)
import { loginData } from '../tests/testData/login.js';

// extend Playwright's base test with our own custom fixtures
export const test = baseTest.extend({
  // OPTION fixture: a plain overridable value, not an async setup step.
  // Default is 'standard_user' — any test file can override it via test.use({ userType: '...' })
  userType: ['standard_user', { option: true }],

  // REAL fixture: depends on the userType option above (declared as a param here)
  loggedInPage: async ({ browser, userType }, use) => {
    // look up the full user record (credentials + expected outcome) by the given key
    const selectedUser = loginData[userType];

    // fail fast with a clear message if someone passes a userType that doesn't exist in loginData
    if (!selectedUser) {
      throw new Error(`User type "${userType}" not found in loginData configuration.`);
    }

    // perform login (success or expected-failure) and get back page objects + context(s)
    const ctx = await loginAndInitPageObjects(browser, selectedUser);

    // hand the whole context object to the test as its `loggedInPage` fixture value
    await use(ctx);

    // --- cleanup runs after the test finishes, resuming here ---
    // close the tab
    await ctx.page.close();
    // close the browser context that tab belonged to
    await ctx.webContext.close();
  },
});

// re-export expect as-is, so test files can import both `test` and `expect` from this one file
export const expect = baseExpect;