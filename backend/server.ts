import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import bodyParser from "body-parser";
import { cacheMiddleware } from "./caching.js";

import { beerSchema, userSchema, actionSchema } from "./schema.js";
import { beerResolver, userResolver, actionResolver } from "./resolvers.js";

import express from "express";

const app = express();

// Enable CORS
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Access static files from backend
app.use(express.static("public"));

// GraphQL endpoints
app.use(
  "/beer",
  cacheMiddleware,
  graphqlHTTP({ schema: beerSchema, rootValue: beerResolver, graphiql: true }),
);

app.use(
  "/user",
  graphqlHTTP({ schema: userSchema, rootValue: userResolver, graphiql: true }),
);

app.use(
  "/action",
  graphqlHTTP({
    schema: actionSchema,
    rootValue: actionResolver,
    graphiql: true,
  }),
);

// Start the server
(async () => {
  app.listen(3000, () => {
    console.log(`App listening at port 3000`);
  });
})();
