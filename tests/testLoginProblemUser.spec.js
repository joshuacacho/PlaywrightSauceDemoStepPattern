import { test, expect } from '../pageObjects/pageObjectFixtures.js';


/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
problem_user                  | Succeeds       | Several products link to the wrong product pages.
                              |                | Some items can't be removed after adding
                              |                | (backpack, bike light, onesie).
                              |                | Some items can't be added at all
                              |                | (bolt t-shirt, fleece jacket, red t-shirt).
                              |                | Checkout: last name field can't be filled — blocks checkout.
                              |                | Homepage filtering doesn't work.
                              |                | "About" link leads to a 404.
*/


// Enforce the specific problem user context for this file
test.use({ userType: 'problem_user' });

test('Verify problem_user Navigation and General Inconsistencies', async ({ loggedInPage }) => {
  const { userLoggedInPage } = loggedInPage;
  
  // This action might fail or behave strangely due to the account type
  //await userLoggedInPage.addProblemItemToCart(); 
});



