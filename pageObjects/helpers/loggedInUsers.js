import { expect } from '@playwright/test';

async function logOutCurrentUser(userLoggedInPage) {
  await userLoggedInPage.logOutUser();
}



//export class to be used globally
export { 
  logOutCurrentUser
};