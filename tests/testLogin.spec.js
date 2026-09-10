import { test, expect } from '../pageObjects/pageObjectFixtures.js';
import { loginTest } from '../pageObjects/helpers/loginUsers.js';

/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
Reusability across tests — because the flow logic isn't embedded in the test body, a "2-ticket booking IS eligible" test can reuse the exact same helpers with different params, instead of duplicating 80% of the script.
*/


test('Test Setup for Logging In With Standard User', async ({ loggedInPage }) => {

  // the below is shorthand for 
    //const homeEvntPage = loggedInPage.homeEvntPage;
    //const evntDetailsPage = loggedInPage.evntDetailsPage;
  const { userLoginPage} = loggedInPage;  //loginAndInitPageObjects

  await test.step('Obtain Count of all Booking Before', async () => {
   
    await loginTest(userLoginPage);

  });
});