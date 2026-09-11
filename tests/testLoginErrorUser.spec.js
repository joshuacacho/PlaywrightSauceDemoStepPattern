import { test, expect } from '../pageObjects/pageObjectFixtures.js';


/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
error_user                    | Succeeds       | Sorting is broken, shows an error notification.
                              |                | Checkout: last name field can't be entered, but
                              |                | still allows proceeding — transaction ultimately
                              |                | can't be completed.
                              |                | Some items can't be added or removed.
*/

// Enforce the specific error user context for this file
test.use({ userType: 'error_user' });

test('Verify error_user encounters broken UI actions', async ({ loggedInPage }) => {
  const { userLoggedInPage } = loggedInPage;
  
  // This action might fail or behave strangely due to the account type
  //await userLoggedInPage.addProblemItemToCart(); 
});