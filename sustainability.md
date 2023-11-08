# Sustainability

## Design

We have decided to make our entire site "dark mode" by default as this requires less energy to display on a screen than a bright website. The design is also mostly comprised of text and icons which are quite sustainable.

## Lazy loading

Both the list of beers on the main page as well as the comments on each beer are lazy loaded. This means that the browser only fetches and loads the beers and comments that are about to appear on the screen when scrolling. This saves a lot of energy as we avoid unnecessary calls to the server and unnecessary loading and rendering of elements that are not visible.

## Fetching

Our fetching does not fetch more data than necessary, saving a lot of bandwidth and energy. For example, when fetching a beer, we only fetch the comments for that beer, not all comments for all beers. We also only fetch the first 10 beers when loading the main page, and then fetch more when the user scrolls down.

## Database

Our database is designed to be as efficient as possible. We have a table for beers, a table for breweries, a table for comments, a table for users, and a table for votes. This means that we easily can fetch all the information we need with as few joins as possible.

## GraphQL

We use GraphQL to fetch data from the database. This means that we can fetch exactly the data we need and nothing more. This saves a lot of bandwidth and energy.

## Delayed searching, sorting and filtering

The website will not update immediately when you start typing in the searchbar or start selecting filters or sorting methods. Instead, it will wait for the user to press a button confirming their search/choice, and then fetch the results. This saves a lot of bandwidth and energy as we avoid unnecessary calls to the server.

## User handling

Instead of relying on a third party SaaS/BaaS for user handling, we have implemented our own user handling. This way we avoid unnecessary calls to a third party server, saving bandwidth and energy.

## Images

Our icons and images are made with SVG. This means that they are very small in size and can be scaled to any size without losing quality. This is a more sustainable solution than using PNG or JPG images.

## Hosting

Our website is hosted in Norway which means that the data does not have to travel as far as if it was hosted in another country, saving bandwidth and data.

## Dependencies

We have tried to keep our dependencies to a minimum. This means that we avoid unnecessary code and unnecessary updates. Each npm install and npm update requires a lot of energy, so by keeping our dependencies to a minimum we can reduce the energy consumption of our website. We also remove unused dependencies when we no longer need them.
