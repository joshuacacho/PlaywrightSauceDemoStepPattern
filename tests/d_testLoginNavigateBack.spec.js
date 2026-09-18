import { test, expect } from '../pageObjects/pageObjectFixtures';
import { loginData } from '../tests/testData/login';
import { pageURL } from "../tests/testData/pageURLs";
import { logOutCurrentUser } from '.././pageObjects/helpers/loggedInUsers';
import { securityErrorMessageUnathenticatedAccess } from '.././pageObjects/helpers/loginUsers';

/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
6	Logout then back-button — after logout, does hitting browser back expose the inventory page from cache, or does it correctly redirect to login? A classic session-security gap many apps get wrong.
*/

test('Standard User Logging with Navigating Back to Log in Page and Selecting Log in Button', async ({ loggedInPage }) => {
  // Grab the page object safely tracking the new authenticated context
  const { page, userLoginPage, userLoggedInPage } = loggedInPage;
  let myError;


  await test.step('Logging as Standard User and Assert Correct URL', async () => {

    // // 1. Explicitly navigate to the logged-in target page
    //   //in our loginAndInitPageObjects.js the new page we open to store the state.json will always start at about:blank
    //   //so we have to go directly to the page
    let goToPage = await page.goto(loginData.BASE_URL + pageURL.INVENTORY_PAGE);
    //console.log(goToPage.url())
    expect(goToPage.url()).toBe(loginData.BASE_URL + pageURL.INVENTORY_PAGE);
  });

  await test.step('Logout and Navigate Back to Login Page', async () => {
    // log out current user
    await logOutCurrentUser(userLoggedInPage);

    // go back to previous page and see if user is still logged in
    await page.goBack();

    //assert base url is seen when the user tries to navigate back
    expect(page.url()).toBe(loginData.BASE_URL)
    //assert error message comes up indicate invalid url
    myError = await securityErrorMessageUnathenticatedAccess(userLoginPage);
    expect(myError).toBe(loginData.security_log_in_after_logout.invalidAccessInventoryPage);

  });

});

