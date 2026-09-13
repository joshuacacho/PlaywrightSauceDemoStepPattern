import { test, expect } from '../pageObjects/pageObjectFixtures';
import { loginData } from '../tests/testData/login';
import { returnLoginErrorMessage } from '.././pageObjects/helpers/loginUsers';

/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
3	Wrong password / wrong username / empty fields — three separate negative cases. Does the error message differ per case, or is it generic? Worth checking if the app leaks info (e.g., "username not found" vs "wrong password" — a security-testing angle, not just functional).
*/

test('Verify Error Message for Invalid Login Scenarios', async ({ loggedInPage }) => {
  const { userLoginPage, page } = loggedInPage;
  let myError;

  await test.step('Invalid Username Only Attempt to Log In', async () => {

    //creating myError to compare with expected value from UI
    myError = await returnLoginErrorMessage(userLoginPage, "name");
    //console.log(myError)
    expect(myError).toBe(loginData.invalid_login_message.missingPassword);

    
  });

  await test.step('Invalid Password Only Attempt to Log In', async () => {

    
    myError = await returnLoginErrorMessage(userLoginPage, "password");
    //console.log(myError)
    expect(myError).toBe(loginData.invalid_login_message.missingUsername);
    
  });

  await test.step('No Username & No Password Attempt to Log In', async () => {

  
    myError = await returnLoginErrorMessage(userLoginPage, null); //passing null will result in clicking login
    //console.log(myError)
    expect(myError).toBe(loginData.invalid_login_message.missingUsernamePassword);
    
  });

  await test.step('Invalid Username & Password Attempt to Log In', async () => {

    myError = await returnLoginErrorMessage(userLoginPage, "loginInvalidUser"); 
    //console.log(myError)
    expect(myError).toBe(loginData.invalid_login_message.invalidUsernamePassword);
    
  });
  
});