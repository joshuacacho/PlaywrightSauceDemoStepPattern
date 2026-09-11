import { test, expect } from '../pageObjects/pageObjectFixtures.js';

/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
standard_user                | Succeeds       | Clean baseline — nothing intentionally broken.
*/


// this user the standard user
test('Verify Standard UI Nothing Broken - opposite of problem_user Problem Which Should Work', async ({ loggedInPage }) => {
  // Grab the page object safely tracking the new authenticated context
  const { userLoggedInPage } = loggedInPage;
  
  // Your helper already asserted that cartIconLink is visible!
  // Proceed with standard user test workflows:
  //await userLoggedInPage.addItemToCart(); 
});