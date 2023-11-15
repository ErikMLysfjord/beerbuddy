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
