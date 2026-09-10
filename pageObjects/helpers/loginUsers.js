import { expect } from '@playwright/test';

async function loginTest(userLoginPage) {
  await userLoginPage.goToLoginPage();
}


export { loginTest };