// testData/login.js


/*
====================================================================================================
SauceDemo Test User Reference — expected behavior per account
(Based on community QA observations, not official Sauce Labs docs — verify manually before relying on it)
====================================================================================================

User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
standard_user                | Succeeds       | Clean baseline — nothing intentionally broken.
-----------------------------------------------------------------------------------------------------
locked_out_user               | FAILS          | Rejected immediately with error message:
                              |                | "Epic sadface: Sorry, this user has been locked out."
                              |                | Only user where login itself fails.
-----------------------------------------------------------------------------------------------------
problem_user                  | Succeeds       | Several products link to the wrong product pages.
                              |                | Some items can't be removed after adding
                              |                | (backpack, bike light, onesie).
                              |                | Some items can't be added at all
                              |                | (bolt t-shirt, fleece jacket, red t-shirt).
                              |                | Checkout: last name field can't be filled — blocks checkout.
                              |                | Homepage filtering doesn't work.
                              |                | "About" link leads to a 404.
-----------------------------------------------------------------------------------------------------
performance_glitch_user       | Succeeds       | No functional bugs — artificially slow page loads /
                              |                | response times. Good for timing-based assertions.
-----------------------------------------------------------------------------------------------------
error_user                    | Succeeds       | Sorting is broken, shows an error notification.
                              |                | Checkout: last name field can't be entered, but
                              |                | still allows proceeding — transaction ultimately
                              |                | can't be completed.
                              |                | Some items can't be added or removed.
-----------------------------------------------------------------------------------------------------
visual_user                   | Succeeds       | Purely cosmetic — several icons appear tilted or
                              |                | misplaced. No functional breakage.
====================================================================================================
*/

// central map of every SauceDemo test account this suite knows about.
// keyed by username so the fixture can do loginData[userType] to look one up.
export const loginData = {
    // base URL the login page navigates to
    BASE_URL: "https://www.saucedemo.com",

    // the "normal" account — nothing intentionally broken, used as the default user
    standard_user: {
        username: 'standard_user',       // literal login field value
        password: 'secret_sauce',        // shared password across all SauceDemo demo accounts
        expectToSucceed: true            // login should succeed and reach /inventory.html
    },

    // deliberately blocked account — SauceDemo rejects this login with an error message
    locked_out_user: {
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectToSucceed: false           // login should FAIL — triggers the error-message branch in the helper
    },

    // account known for broken/mismatched UI elements (e.g. product images) after login
    problem_user: {
        username: 'problem_user',
        password: 'secret_sauce',
        expectToSucceed: true            // login itself still succeeds — the bugs are visual, not auth-related
    },

    // account that logs in successfully but with artificially slow page loads
    performance_glitch_user: {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        expectToSucceed: true
    },

    // account that triggers errors during certain UI interactions post-login
    error_user: {
        username: 'error_user',
        password: 'secret_sauce',
        expectToSucceed: true            // login succeeds — the errors surface later, during interaction
    },

    // account with intentional visual/CSS bugs (e.g. misaligned prices) post-login
    visual_user: {
        username: 'visual_user',
        password: 'secret_sauce',
        expectToSucceed: true
    }
};

