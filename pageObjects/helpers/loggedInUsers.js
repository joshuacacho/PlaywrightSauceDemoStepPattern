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

async function addRandomItemstoCartXTimes(userLoggedInPage, randomCountItems){

  await userLoggedInPage.addRandomItemsToCart(randomCountItems);
  
}

async function removeItemsFromCartXTimes(userLoggedInPage, randomCountItems){

  await userLoggedInPage.removeItemsFromCart(randomCountItems);
  
}

async function removeAllItemsFromCart(userLoggedInPage) {

  await userLoggedInPage.removeAllItemsFromCart();
}

async function returnItemsInCart(userLoggedInPage) {
   
  let cartCount = await userLoggedInPage.getItemsInCart();

  return cartCount;
}

//export class to be used globally
export { 
  logOutCurrentUser,
  getAllImagesInventoryPage,
  selectSortListItem,
  getSortedItemListInventoryPage,
  addRandomItemstoCartXTimes,
  returnItemsInCart,
  removeItemsFromCartXTimes,
  removeAllItemsFromCart
};