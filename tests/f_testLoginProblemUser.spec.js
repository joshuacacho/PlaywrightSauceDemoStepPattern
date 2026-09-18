import { test, expect } from "../pageObjects/pageObjectFixtures.js";
import { loginData } from "../tests/testData/login";
import { pageURL } from "../tests/testData/pageURLs";
import { getAllImagesInventoryPage } from '.././pageObjects/helpers/loggedInUsers';
import { inventoryImages } from '../tests/testData/inventroyImages';

/*
test.step — gives you a stepped trace/report in Playwright's UI, so failures point at "Check refund eligibility" instead of a stack trace into some 400-line test (linear scripting).
*/

/*
User                        | Login          | Known behavior / bugs
-----------------------------------------------------------------------------------------------------
problem_user                  | Succeeds       | Several products link to the wrong product pages.
                              |                | Some items can't be removed after adding
                              |                | (backpack, bike light, onesie).
                              |                | Some items can't be added at all
                              |                | (bolt t-shirt, fleece jacket, red t-shirt).
                              |                | Checkout: last name field can't be filled — blocks checkout.
                              |                | Homepage filtering doesn't work.
                              |                | "About" link leads to a 404.
*/

/*
8. problem_user — known for broken images/UI on the inventory page (all product images are the same broken image). Good test: assert all product images actually have distinct, valid src attributes — this user should fail that assertion while standard_user passes.
*/

// Enforce the specific problem users inside each steps below




test.describe("problem_user", () => {
  test.use({ userType: "problem_user" });


  test("images should be broken for problem_user", async ({loggedInPage}) => {

    const { userLoggedInPage, page } = loggedInPage;
    let myImages;

     await page.goto(loginData.BASE_URL + pageURL.INVENTORY_PAGE);

     myImages = await getAllImagesInventoryPage(userLoggedInPage)

     console.log(myImages);

     expect(myImages).toContain(inventoryImages.invalid_images.DOG_SRC_IMG);
     expect(myImages).not.toContain(inventoryImages.valid_images.SAUCE_LABS_BACKPACK_SRC_IMG);
     expect(myImages).not.toContain(inventoryImages.valid_images.SAUCE_LABS_BIKE_LIGHT_SRC_IMG);
     expect(myImages).not.toContain(inventoryImages.valid_images.SAUCE_LABS_BOLT_TSHIRT_SRC_IMG);
     expect(myImages).not.toContain(inventoryImages.valid_images.SAUCE_LABS_FLEECE_JACKET_SRC_IMG);
     expect(myImages).not.toContain(inventoryImages.valid_images.SAUCE_LABS_ONSESIE_SRC_IMG);
     expect(myImages).not.toContain(inventoryImages.valid_images.SAUCE_LABS_TEST_ALL_THINGS_TSHIRT_SRC_IMG);

  });
});
 

test.describe("standard_user", () => {
  test.use({ userType: "standard_user" });

  test("images should be valid for standard_user", async ({loggedInPage}) => {
     const { userLoggedInPage, page } = loggedInPage;
    let myImages;

     await page.goto(loginData.BASE_URL + pageURL.INVENTORY_PAGE);

     myImages = await getAllImagesInventoryPage(userLoggedInPage)

     console.log(myImages);

     expect(myImages).not.toContain(inventoryImages.invalid_images.DOG_SRC_IMG);
     expect(myImages).toContain(inventoryImages.valid_images.SAUCE_LABS_BACKPACK_SRC_IMG);
     expect(myImages).toContain(inventoryImages.valid_images.SAUCE_LABS_BIKE_LIGHT_SRC_IMG);
     expect(myImages).toContain(inventoryImages.valid_images.SAUCE_LABS_BOLT_TSHIRT_SRC_IMG);
     expect(myImages).toContain(inventoryImages.valid_images.SAUCE_LABS_FLEECE_JACKET_SRC_IMG);
     expect(myImages).toContain(inventoryImages.valid_images.SAUCE_LABS_ONSESIE_SRC_IMG);
     expect(myImages).toContain(inventoryImages.valid_images.SAUCE_LABS_TEST_ALL_THINGS_TSHIRT_SRC_IMG);

  });
});
