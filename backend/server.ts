import { graphqlHTTP } from "express-graphql";
import { mergeSchemas } from "@graphql-tools/schema";
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

// Merge all schemas
const mergedSchema = mergeSchemas({
  schemas: [beerSchema, userSchema, actionSchema],
});

// Access static files from backend
app.use(express.static("public"));

// GraphQL endpoint
app.use(
  "/graphql",
  cacheMiddleware,
  graphqlHTTP({
    schema: mergedSchema,
    rootValue: { ...beerResolver, ...userResolver, ...actionResolver },
    graphiql: true,
  })
);

// Start the server
(async () => {
  app.listen(3000, () => {
    console.log(`App listening at port 3000`);
  });
})();
