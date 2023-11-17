import { expect, test } from "@playwright/test";

//Delete the user from the database;
const deleteUser = async (userId: string) => {
  const query = { query: `{ deleteUser(userId: ${userId}) }` };

  return await fetch("http://it2810-15.idi.ntnu.no:4000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      expect(data.data.deleteUser).toBe("You deleted your user!");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

const fetchBeer = async (id: number) => {
  const query = { query: `{ beer(id: ${id}) }` };

  return await fetch("http://it2810-15.idi.ntnu.no:4000/beer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.data.beer;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

test.describe("Login functionality", () => {
  test("login", async ({ page }) => {
    console.log("\n");
    await page.goto("http://it2810-15.idi.ntnu.no/project2/");

    //Shal automatically jump to login page as it is not logged in yet
    console.log("####### Testing redirect to login page");
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("E2EUser");
    await page.getByRole("button", { name: "Submit" }).click();

    console.log("####### Testing correct greeting message");
    //User is already in database, so welcome back message should be displayed
    await expect(page.getByText("Created new user E2EUser!")).toBeVisible();

    //Redirects to the home page
    console.log("####### Testing redirect to home page");
    await expect(
      page.getByRole("heading", { name: "Welcome, E2EUser" })
    ).toBeVisible();

    console.log(
      "####### Testing correct greeting message when already logged in"
    );
    //When trying to go back to , so welcome back message should be displayed
    await page.goto("http://it2810-15.idi.ntnu.no/project2/login");
    await expect(page.getByText("Welcome back E2EUser!")).toBeVisible();

    //E2EUser is already logged in, so it should be redirected to the home page
    console.log("####### Testing redirect to home page when already logged in");
    await expect(
      page.getByRole("heading", { name: "Welcome, E2EUser" })
    ).toBeVisible();

    console.log("####### Removing the generated user from the database");
    const storageState = page.context().storageState();
    const userId = (await storageState).origins[0].localStorage.filter(
      (item) => item.name === "userIdBeerBuddy"
    );
    deleteUser(`"${userId[0].value}"`);
    await page.evaluate(() => window.localStorage.clear());

    console.log("####### Testing redirect to login page after logged out");
    console.log("\n");
    //User is deleted, so it should be redirected to the login page
    await page.goto("http://it2810-15.idi.ntnu.no/project2/");
    await expect(page.getByText("Log in")).toBeVisible();
  });
});

test.describe("BeerBuddy functionality", () => {
  test.beforeEach(async ({ page }) => {
    console.log("\n");
    console.log("####### Logging in");

    // ------------Login Logic------------- //
    await page.goto("http://it2810-15.idi.ntnu.no/project2/");
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("E2EUser");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByRole("heading", { name: "Welcome, E2EUser" })
    ).toBeVisible();
    // ------------------------------------ //
  });

  test.afterEach(async ({ page }) => {
    // --------User Deletion Logic--------- //
    console.log("####### Cleaning up");
    console.log("\n");
    const storageState = page.context().storageState();
    const userId = (await storageState).origins[0].localStorage.filter(
      (item) => item.name === "userIdBeerBuddy"
    );
    deleteUser(`"${userId[0].value}"`);
    await page.evaluate(() => window.localStorage.clear());
    // ------------------------------------ //
  });

  test("beer-page", async ({ page }) => {
    console.log("####### Testing correct loading of beer page");

    //Click on the first beer in the list
    await page.locator("ul>li").nth(0).click();

    //find out what beer is clicked
    const beerId = page.url().split("/")[5];

    //fetch beer data from the database
    const beerData = await fetchBeer(parseInt(beerId));
    const beerName = beerData[0].name;
    const beerStyle = beerData[0].style;

    //See if the beer page is correct
    await expect(page.getByText(beerName)).toBeVisible();
    await expect(page.getByPlaceholder("Write a comment...")).toBeVisible();
    await expect(page.getByText(beerStyle)).toBeVisible();
    await page.getByRole("link", { name: "Back to menu" }).click();

    console.log("####### Testing home button");

    //Check if back to menu button works
    await expect(
      page.getByRole("heading", { name: "Welcome, E2EUser" })
    ).toBeVisible();
  });

  test("vote", async ({ page }) => {
    console.log("####### Open first beer");

    //Open the first beer in the list
    await page.locator("ul>li").nth(0).click();

    //find out what beer is clicked
    const beerId = page.url().split("/")[5];

    //fetch beer data from the database
    const beerData = await fetchBeer(parseInt(beerId));
    const beerName = beerData[0].name;
    const beerVotesStart = parseInt(beerData[0].vote_count);
    const beerRatingStart = parseInt(beerData[0].rating);

    //See if the beer page is correct
    await expect(
      page.getByRole("heading", { name: `${beerRatingStart} rated` })
    ).toBeVisible();
    await expect(
      page.getByText(`Based on ${beerVotesStart} reviews`)
    ).toBeVisible();
    await page.getByRole("link", { name: "Back to menu" }).click();

    console.log("####### Test upvote of beer");

    //Upvote the beer and see if the rating is correct
    await page.getByLabel(beerName).getByLabel("Upvote this beer").click();
    await page.getByLabel(beerName).click();
    await expect(
      page.getByRole("heading", { name: `${beerRatingStart + 1} rated` })
    ).toBeVisible();
    await expect(
      page.getByText(`Based on ${beerVotesStart + 1} reviews`)
    ).toBeVisible();
    await page.getByRole("link", { name: "Back to menu" }).click();

    console.log("####### Test downvote of beer");

    //Downvote the beer and see if the rating is correct
    await page.getByLabel(beerName).getByLabel("Downvote this beer").click();
    await page.getByLabel(beerName).click();
    await expect(
      page.getByRole("heading", { name: `${beerRatingStart - 1} rated` })
    ).toBeVisible();
    await expect(
      page.getByText(`Based on ${beerVotesStart + 1} reviews`)
    ).toBeVisible();
    await page.getByRole("link", { name: "Back to menu" }).click();

    console.log("####### Test removal of vote of beer");

    //Remove the vote and see if the rating is correct
    await page.getByLabel(beerName).getByLabel("Downvote this beer").click();
    await page.getByLabel(beerName).click();
    await expect(
      page.getByRole("heading", { name: `${beerRatingStart} rated` })
    ).toBeVisible();
    await expect(
      page.getByText(`Based on ${beerVotesStart} reviews`)
    ).toBeVisible();
  });

  test("comment", async ({ page }) => {
    console.log("####### Open first beer");

    //Open the first beer in the list
    await page.locator("ul>li").nth(0).click();

    //find out what beer is clicked
    const beerId = page.url().split("/")[5];

    //fetch beer data from the database
    const beerData = await fetchBeer(parseInt(beerId));
    const beerComments = beerData[0].comment_count;

    console.log("####### Test comment of beer");

    //Upvote the beer and see if the rating is correct
    await page.getByPlaceholder("Write a comment...").click();
    await page
      .getByPlaceholder("Write a comment...")
      .fill("This is a test comment");
    await page.getByRole("button", { name: "Comment" }).click();
    await expect(page.getByText("Comment posted.")).toBeVisible();
    await expect(
      page.getByText(/^E2EUser•< 1 minute agoThis is a test comment$/)
    ).toBeVisible();

    console.log("####### Check if number of comments is increased");

    const beerData2 = await fetchBeer(parseInt(beerId));
    const beerComments2 = parseInt(beerData2[0].comment_count);

    expect(beerComments2 - beerComments).toBe(1);

    // --------User Deletion Logic--------- //
    console.log("####### Deleting user");
    const storageState = page.context().storageState();
    const userId = (await storageState).origins[0].localStorage.filter(
      (item) => item.name === "userIdBeerBuddy"
    );
    deleteUser(`"${userId[0].value}"`);
    await page.evaluate(() => window.localStorage.clear());
    // ------------------------------------ //

    console.log("####### Logging in with new user");

    // ------------Login Logic------------- //
    await page.goto("http://it2810-15.idi.ntnu.no/project2/");
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("E2EUser2");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByRole("heading", { name: "Welcome, E2EUser2" })
    ).toBeVisible();
    // ------------------------------------ //

    console.log("####### Test comment deletion after user deletion");

    await page.goto("http://it2810-15.idi.ntnu.no/project2/");
    await page.locator("ul>li").nth(0).click();
    await expect(
      page.getByText(/^E2EUser•< 1 minute agoThis is a test comment$/)
    ).not.toBeVisible();

    console.log("####### Check if number of comments is returned to previous");

    const beerData3 = await fetchBeer(parseInt(beerId));
    const beerComments3 = parseInt(beerData3[0].comment_count);
    expect(beerComments3 - beerComments).toBe(0);
  });

  test("search", async ({ page }) => {
    console.log("####### Test no result search");
    await page.getByRole("textbox", { name: "Search search" }).click();
    await page.getByRole("textbox", { name: "Search search" }).fill("NoResult");
    await page.getByRole("textbox", { name: "Search search" }).press("Enter");

    await expect(page.getByText("Yay! You have seen it all")).toBeVisible();

    console.log("####### Test search with result");
    await page.getByRole("textbox", { name: "Search search" }).fill("IPA");
    await page.getByRole("button", { name: "search" }).click();
    await expect(page.getByText("Loading...")).toBeVisible();

    //Open the first beer in the list
    await page.locator("ul>li").nth(0).click();

    //find out what beer is clicked
    const beerId = page.url().split("/")[5];

    //fetch beer data from the database
    const beerData = await fetchBeer(parseInt(beerId));
    const beerName = beerData[0].name;

    //See if the beers returned are correct (contains IPA)
    expect(beerName).toContain("IPA");
  });

  test("sorting", async ({ page }) => {
    console.log("####### Test most popular sorting");

    await page.locator("ul>li").nth(0).click();
    const beerId = page.url().split("/")[5];
    await page.getByRole("link", { name: "Back to menu" }).click();

    await page.locator("ul>li").nth(1).click();
    const beerId2 = page.url().split("/")[5];
    await page.getByRole("link", { name: "Back to menu" }).click();

    const beerData = await fetchBeer(parseInt(beerId));
    const beerRating = parseInt(beerData[0].rating);

    const beerData2 = await fetchBeer(parseInt(beerId2));
    const beerRating2 = parseInt(beerData2[0].rating);

    expect(beerRating).toBeGreaterThanOrEqual(beerRating2);

    console.log("####### Test least popular sorting");

    await page.getByText("Most popular").click();
    await page.getByText("Least popular").click();

    await page.locator("ul>li").nth(0).click();
    const beerId3 = page.url().split("/")[5];
    await page.getByRole("link", { name: "Back to menu" }).click();

    await page.locator("ul>li").nth(1).click();
    const beerId4 = page.url().split("/")[5];
    await page.getByRole("link", { name: "Back to menu" }).click();

    const beerData3 = await fetchBeer(parseInt(beerId3));
    const beerRating3 = parseInt(beerData3[0].rating);

    const beerData4 = await fetchBeer(parseInt(beerId4));
    const beerRating4 = parseInt(beerData4[0].rating);

    expect(beerRating3).toBeLessThanOrEqual(beerRating4);
    expect(beerRating3).toBeLessThanOrEqual(beerRating);

    console.log("####### Test A-Z sorting");
    await page.getByText("Most popular").click();
    await page.getByText("A-Z").click();

    await page.locator("ul>li").nth(0).click();
    const beerId5 = page.url().split("/")[5];
    await page.getByRole("link", { name: "Back to menu" }).click();

    await page.locator("ul>li").nth(1).click();
    const beerId6 = page.url().split("/")[5];
    await page.getByRole("link", { name: "Back to menu" }).click();

    const beerData5 = await fetchBeer(parseInt(beerId5));
    const beerName5 = beerData5[0].name;

    const beerData6 = await fetchBeer(parseInt(beerId6));
    const beerName6 = beerData6[0].name;

    expect(beerName5.charCodeAt(0)).toBeLessThanOrEqual(
      beerName6.charCodeAt(0)
    );

    console.log("####### Test Z-A sorting");
    await page.getByText("Most popular").click();
    await page.getByText("Z-A").click();

    await page.locator("ul>li").nth(0).click();
    const beerId7 = page.url().split("/")[5];
    await page.getByRole("link", { name: "Back to menu" }).click();

    await page.locator("ul>li").nth(1).click();
    const beerId8 = page.url().split("/")[5];
    await page.getByRole("link", { name: "Back to menu" }).click();

    const beerData7 = await fetchBeer(parseInt(beerId7));
    const beerName7 = beerData7[0].name;

    const beerData8 = await fetchBeer(parseInt(beerId8));
    const beerName8 = beerData8[0].name;

    expect(beerName7.charCodeAt(0)).toBeGreaterThanOrEqual(
      beerName8.charCodeAt(0)
    );
    expect(beerName7.charCodeAt(0)).toBeGreaterThanOrEqual(
      beerName5.charCodeAt(0)
    );
  });

  test("styleFiltering", async ({ page }) => {
    console.log("####### Test filtering on single style");

    await page.getByText("American IPA").click();
    await page.getByRole("button", { name: "Apply Filters" }).click();

    await page.locator("ul>li").nth(0).click();
    const beerId = page.url().split("/")[5];

    //fetch beer data from the database
    const beerData = await fetchBeer(parseInt(beerId));
    const beerStyle = beerData[0].style;

    expect(beerStyle).toBe("American IPA");

    //See if the beers have the correct style
    await expect(page.getByText("American IPA")).toBeVisible();

    //Deselect the style
    await page.getByRole("link", { name: "Back to menu" }).click();
    await page.getByText("American IPA").click();

    //Select another style
    await page.getByText("Witbier").click();
    await page.getByRole("button", { name: "Apply Filters" }).click();

    await page.locator("ul>li").nth(0).click();
    const beerId2 = page.url().split("/")[5];

    //fetch beer data from the database
    const beerData2 = await fetchBeer(parseInt(beerId2));
    const beerStyle2 = beerData2[0].style;

    expect(beerStyle2).toBe("Witbier");

    //See if the beers have the correct style
    await expect(page.getByText("Witbier")).toBeVisible();
    await page.getByRole("link", { name: "Back to menu" }).click();

    console.log("####### Test filtering on multiple style");
    //Select two styles at the same time
    await page.getByText("American Blonde Ale").click();
    await page.getByRole("button", { name: "Apply Filters" }).click();

    await page.locator("ul>li").nth(0).click();
    const beerId3 = page.url().split("/")[5];

    //fetch beer data from the database
    const beerData3 = await fetchBeer(parseInt(beerId3));
    const beerStyle3 = beerData3[0].style;

    expect(beerStyle3 == "American Blonde Ale" || beerStyle3 == "Witbier").toBe(
      true
    );
  });
});
