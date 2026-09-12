import { expect } from '@playwright/test';

async function returnLoginErrorMessage(userLoginPage, fieldName) {
  
  await userLoginPage.goToLoginPage();
  let myError = await userLoginPage.invalidLoginByField(fieldName);

  return myError;
}



//export class to be used globally
export { 
  returnLoginErrorMessage
};