import { test, expect } from '../pageObjects/pageObjectFixtures';
import { loginData } from '../tests/testData/login';
import { pageURL } from '../tests/testData/pageURLs';
import { securityErrorMessagePostLogOut } from '.././pageObjects/helpers/loginUsers';

/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
7	Direct URL access while unauthenticated — can you navigate straight to /inventory.html without logging in at all?

Beyond login, once you're in:
*/

test.use({ userType: 'locked_out_user' });

test('Attemp Direct URL Access via Unauthenticated Access', async ({ loggedInPage }) => {
  // Grab the page object safely tracking the new authenticated context
  const { userLoginPage, page } = loggedInPage;
  let myError;

  await test.step('Direct Access using locked_out_user', async () => {

    // 1. Explicitly attempt to log in using locked_out_user
      //in our loginAndInitPageObjects.js we DONT OPEN a page to get the stage.json so we never get the about:blank
      // and actually get the url directly from the page this time without having to navigate to it

    await page.goto(loginData.BASE_URL + pageURL.INVENTORY_PAGE);

    
    await expect(page).toHaveURL(loginData.BASE_URL); // waiting for page to have the url we expect, does auto retry for us

    // reuse method 6 error message
    myError = await securityErrorMessagePostLogOut(userLoginPage);
    expect(myError).toBe(loginData.security_log_in_after_logout.invalidAccessInventoryPage);

  });





});

