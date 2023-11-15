# About the project

BeerBuddy is a website where you can find and review beers. The website displays craft beers from the US, and uses a dataset [from Kaggle](https://www.kaggle.com/datasets/nickhould/craft-cans/data). The website is made with a frontend in React and a backend in GraphQL. The backend uses a PostgreSQL database.

## How to use the website

To be able to use the website you must first register to the website. You only need to register your name, and then a unique ID is generated and stored in the localstorage. This will then be used to identify you and your actions.

You can search for beers, and also alter filters to be able to find just the type of beer you're after. You can also sort the beers by popularity.

When you click on a beer you are able to see more information about it. Here you may find information about the brewery, and some detailed information about it's alcohol percentage and IBU. You are also to be able to vote it up or down, and you're able to comment. You can also see other people's comments.

# Run the project

## Set up backend and database

To set up the backend and database, please go to the [backend documentation](./backend/README.md).

## Set up frontend

To set up the frontend, please go to the [frontend documentation](./frontend/README.md).

# Run tests

## Run backend tests

To be implemented...

## Run frontend tests

To test the frontend, please go to the [frontend documentation](./frontend/README.md).

## Run end-to-end tests

**NB: REQUIRES CONNECTION TO NTNU VPN TO WORK**

To test the end-to-end tests, run the following command in the root folder:

```bash
npx playwright test
```

Keep in mind that the amount of workers performing the testing is set to 1. This is to avoid the tests to fail due to the database not being able to handle multiple users with the same name at the same time.

If you encounter any problems running the tests, then make sure [playwright](https://playwright.dev/docs/intro) is installed before trying again.
