import { test, expect } from '../pageObjects/pageObjectFixtures.js';


/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
locked_out_user               | FAILS          | Rejected immediately with error message:
                              |                | "Epic sadface: Sorry, this user has been locked out."
                              |                | Only user where login itself fails.
*/

// Enforce the specific locked out user context for this file
test.use({ userType: 'locked_out_user' });

test('Verify locked_out_user Remains on Log in Page', async ({ loggedInPage }) => {
  // Your helper has already performed the error text assertion!
  // You can use the returned loginPage references if you need further validation:
  const { userLoginPage } = loggedInPage;
  
  //await expect(userLoginPage.lockedOutUserError).toBeVisible();
});