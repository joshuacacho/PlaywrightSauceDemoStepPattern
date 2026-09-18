import { expect } from '@playwright/test';

async function logOutCurrentUser(userLoggedInPage) {
  await userLoggedInPage.logOutUser();
}

async function getAllImagesInventoryPage(userLoggedInPage){

  let myImages = await userLoggedInPage.getAllImages();
  return myImages;
}



//export class to be used globally
export { 
  logOutCurrentUser,
  getAllImagesInventoryPage
};