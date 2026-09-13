import { test, expect } from '../pageObjects/pageObjectFixtures';
import { loginData } from '../tests/testData/login';

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
  const { page } = loggedInPage;

  await test.step('Loced Out Failed Login And Checking URL', async () => {

    // // 1. Explicitly attempt to log in using locked_out_user
        //in our loginAndInitPageObjects.js we DONT OPEN a page to get the stage.json so we never get the about:blank
        // and actually get the url directly from the page this time without having to navigate to it
    console.log(page.url());
    expect(page.url()).toBe(loginData.BASE_URL);
  });
  
});