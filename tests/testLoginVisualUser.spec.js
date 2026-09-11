import { test, expect } from '../pageObjects/pageObjectFixtures.js';


/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
visual_user                   | Succeeds       | Purely cosmetic — several icons appear tilted or
                              |                | misplaced. No functional breakage.
*/


// Enforce the specific locked out user context for this file
test.use({ userType: 'visual_user' });

test('Visual visual_user Visualization Problems', async ({ loggedInPage }) => {
  const { userLoggedInPage } = loggedInPage;
  
  // This action might fail or behave strangely due to the account type
  //await userLoggedInPage.addProblemItemToCart(); 
});
