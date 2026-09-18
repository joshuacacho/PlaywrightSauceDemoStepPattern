import { expect } from '@playwright/test';

async function returnLoginErrorMessage(userLoginPage, fieldName) {
  
  await userLoginPage.goToLoginPage();
  let myError = await userLoginPage.invalidLoginByField(fieldName);

  return myError;
}

async function securityErrorMessageUnathenticatedAccess(userLoginPage) {

  let myError = await userLoginPage.loggedOutLogBackInErrorMessage.textContent();
  //console.log(myError). Epic sadface: You can only access '/inventory.html' when you are logged in.

  return myError;
}



//export class to be used globally
export { 
  returnLoginErrorMessage,
  securityErrorMessageUnathenticatedAccess
};