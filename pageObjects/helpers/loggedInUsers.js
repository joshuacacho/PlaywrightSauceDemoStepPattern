import { expect } from '@playwright/test';

async function logOutCurrentUser(userLoggedInPage) {
  await userLoggedInPage.logOutUser();
}

async function getAllImagesInventoryPage(userLoggedInPage){

  let myImages = await userLoggedInPage.getAllImages();
  return myImages;
}

async function getSortedItemListInventoryPage(userLoggedInPage){

  let myInventoryText = await userLoggedInPage.getSortedItemList();
  return myInventoryText;
}

async function selectSortListItem(userLoggedInPage, selection){

  await userLoggedInPage.sortList(selection);
  
}

//export class to be used globally
export { 
  logOutCurrentUser,
  getAllImagesInventoryPage,
  selectSortListItem,
  getSortedItemListInventoryPage
};