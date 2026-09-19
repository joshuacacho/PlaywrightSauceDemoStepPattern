import { test, expect } from '../pageObjects/pageObjectFixtures';
import { LoginPage } from '..//pageObjects/loginPage';
import { performance } from 'node:perf_hooks';


/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/


/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
performance_glitch_user       | Succeeds       | No functional bugs — artificially slow page loads /
                              |                | response times. Good for timing-based assertions.
*/


/*
A reasonable time for most web pages to load is under 2 seconds for desktop and under 3 seconds for mobile devices, according to industry performance standards
*/

/*
9. performance_glitch_user — intentionally slow page loads. Good test for asserting reasonable load-time behavior or timeout handling, contrasted against standard_user's speed.
*/



test('Verify performance_glitch_user Slow Page Loads against a Standard User Delta Login Time', async ({ page }) => {

  let standardUser_duration, performanceUser_duration;

  await test.step('Standard User Log In Time - Measures from Username, Password, Click Login Button', async () => {

    let loginPage = new LoginPage(page); //to give life

    await loginPage.goToLoginPage();

    //start log in process time
    standardUser_duration = await loginPage.performanceLogIn("standard_user");



  });
  
  await test.step('Performance User Log In Time - Measures from Username, Password, Click Login Button', async () => {

    let loginPage = new LoginPage(page); //to give life

    await loginPage.goToLoginPage();

    //start log in process time
    performanceUser_duration = await loginPage.performanceLogIn("performance_glitch_user");

  });

  await test.step('Asserts Standard Users against Performance Glitch User is Too Slow', async () => {
    expect(performanceUser_duration).toBeGreaterThan(standardUser_duration * 5); //since it was seen manually that this took 5 seconds
  });


});