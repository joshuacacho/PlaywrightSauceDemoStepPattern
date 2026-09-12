import { test, expect } from '../pageObjects/pageObjectFixtures.js';
import { loginData } from '../tests/testData/login';
import { pageURL } from '../tests/testData/pageURLs';



/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
standard_user                | Succeeds       | Clean baseline — nothing intentionally broken.
*/

// Enforce the standard_user
test.use({ userType: 'standard_user' });

// this user the standard user
test('Verify Standard UI Nothing Broken - opposite of problem_user Problem Which Should Work', async ({ loggedInPage }) => {
  // Grab the page object safely tracking the new authenticated context
  const { page } = loggedInPage;

  await test.step('Standard User Logging into Invetory Page And Checking URL', async () => {

    // // 1. Explicitly navigate to the logged-in target page
    //   //in our loginAndInitPageObjects.js the new page we open to store the state.json will always start at about:blank
    //   //so we have to go directly to the page
    let goToPage = await page.goto(loginData.BASE_URL + pageURL.inventoryPage);
    //console.log(goToPage.url())
    expect(goToPage.url()).toBe(loginData.BASE_URL + pageURL.inventoryPage);
  });

});