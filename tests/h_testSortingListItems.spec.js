import { test, expect } from '../pageObjects/pageObjectFixtures';
import { selectSortListItem, getSortedItemListInventoryPage } from '.././pageObjects/helpers/loggedInUsers';
import { pageURL } from "../tests/testData/pageURLs";
import { loginData } from "../tests/testData/login";
import { sorted_lists } from "../tests/testData/invetorySortedItems";


/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
10. Sort dropdown (Name A–Z, Z–A, Price low–high, high–low) — assert the actual rendered order matches the selected sort, for all four options.
*/



test('Verify Sort Selection for Items on Invenvory Page', async ({ loggedInPage }) => {

  const { userLoggedInPage, page } = loggedInPage;
  let myInvetoryTextItems, arrayEqual;

  await page.goto(loginData.BASE_URL + pageURL.INVENTORY_PAGE);


  await test.step('Verify Name (Z to A). Sort Selection - value=za', async () => {


    await selectSortListItem(userLoggedInPage, "za");
    myInvetoryTextItems =  await getSortedItemListInventoryPage(userLoggedInPage);
    expect(myInvetoryTextItems).toEqual(sorted_lists.z_a_sorted_list);
    //console.log(myInvetoryTextItems);
    // await page.pause()
  });

  await test.step('Verify Name (A to Z). Sort Selection - value=az', async () => {


    await selectSortListItem(userLoggedInPage, "az");
    myInvetoryTextItems =  await getSortedItemListInventoryPage(userLoggedInPage);
    expect(myInvetoryTextItems).toEqual(sorted_lists.a_z_sorted_list);
    //console.log(myInvetoryTextItems);
    //await page.pause()


  });

  await test.step('Verify Price (low to high). Sort Selection - value=lohi', async () => {


    await selectSortListItem(userLoggedInPage, "lohi");
    myInvetoryTextItems =  await getSortedItemListInventoryPage(userLoggedInPage);
    expect(myInvetoryTextItems).toEqual(sorted_lists.lo_hi_sorted_list);
    //console.log(myInvetoryTextItems);
    //await page.pause()


  });

  await test.step('Verify Price (high to low). Sort Selection - value=hilo', async () => {


    await selectSortListItem(userLoggedInPage, "hilo");
    myInvetoryTextItems =  await getSortedItemListInventoryPage(userLoggedInPage);
    expect(myInvetoryTextItems).toEqual(sorted_lists.hi_lo_sorted_list);
    //console.log(myInvetoryTextItems);
    //await page.pause()


  });


});