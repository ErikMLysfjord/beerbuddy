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

test("beer-page", async ({ page }) => {
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

test("vote", async ({ page }) => {
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

test("comment", async ({ page }) => {
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

  // --------User Deletion Logic--------- //
  console.log("####### Cleaning up");
  console.log("\n");
  const storageState2 = page.context().storageState();
  const userId2 = (await storageState2).origins[0].localStorage.filter(
    (item) => item.name === "userIdBeerBuddy"
  );
  deleteUser(`"${userId2[0].value}"`);
  await page.evaluate(() => window.localStorage.clear());
  // ------------------------------------ //
});
