import { test, expect } from '../pageObjects/pageObjectFixtures.js';


/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/


/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
performance_glitch_user       | Succeeds       | No functional bugs — artificially slow page loads /
                              |                | response times. Good for timing-based assertions.
*/


// Enforce the specific performance glith user context for this file
test.use({ userType: 'performance_glitch_user' });

test('Verify performance_glitch_user Slow Page Loads', async ({ loggedInPage }) => {
  const { userLoggedInPage } = loggedInPage;
  
  // This action might fail or behave strangely due to the account type
  //await userLoggedInPage.addProblemItemToCart(); 
});