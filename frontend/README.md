# Frontend

## Run frontend

Make sure you have node installed on your machine. Then run the following command in the root of the project:

- cd frontend
- npm install
- npm run dev
  The frontend should now be running on localhost:3000.

## Run all frontend tests

**NB: REQUIRES CONNECTION TO NTNU VPN TO WORK**

(End-to-end tests may fail for various reasons as described in the [run end-to-end tests](#run-end-to-end-tests) section. See that section for more information on how to ensure that the tests pass in case of failure.)

To run all the frontend tests, run the following commands in the root of the project:

```bash
cd frontend
npm install
npx playwright install
npm run test
```

If you want to then view the test coverage, you can run the following command:

```bash
npm run coverage
```

There will then be displayed information about the test coverage is the terminal. There will also be generated HTML pages in the `coverage`-folder. You can then open the `index.html`-file in your browser to view the test coverage in a more user-friendly way.

## Run only frontend unit-tests

To run only the frontend unit-tests, run the following commands in the root of the project:

```bash
cd frontend
npm install
npm run test:vitest
```

If you want to then view the test coverage, you can run the following command:

```bash
npm run coverage
```

## Run only end-to-end tests

**NB: REQUIRES CONNECTION TO NTNU VPN TO WORK**

Keep in mind that this test takes ~1.5 minutes to complete. This is due to the fact that the tests are run and simulated in a headless browser, and the browser needs to wait for the backend to respond to the requests.

To test the end-to-end tests, run the following command in the root of the project:

```bash
cd frontend
npm ci
npx playwright install
npm run test:e2e
```

The tests can also be run in parallel, however this is **not recommended** as the VM the backend is hosted on may not always be able to handle the load of multiple simultaneous requests.
To run the tests in parallel, run the following command:

```bash
npx playwright test --workers 2
```

Keep in mind that the tests may fail just on the basis of the backend being slow to respond. If this happens, just run the tests again and they should pass.

It may also be worth noting that if multiple people run the tests at the same time, they may interfere with each other and subsequently fail. This is due to the fact that the tests are not run in a sandboxed environment, but rather on the same database. If you quit a test run before it is finished, then the database may be left in an inconsistent state as the cleanup is not run. If this happens, just run the tests again and they should pass.

If you encounter any other problems running the tests, make sure [playwright](https://playwright.dev/docs/intro) is installed correctly before trying again.

![test results](tests/testResults.png)
