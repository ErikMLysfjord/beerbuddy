const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const bodyParser = require('body-parser');
const { cacheMiddleware } = require("./caching.js");

const {
  beerSchema,
  userSchema,
  actionSchema,
  querySchema,
} = require("./schema");
const {
  beerResolver,
  userResolver,
  actionResolver,
  queryResolver,
} = require("./resolvers");

const express = require("express");

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 

// Access static files from backend
app.use(express.static("public"));

app.use(
  "/beer",
  cacheMiddleware,
  graphqlHTTP({ schema: beerSchema, rootValue: beerResolver, graphiql: true })
);

app.use(
  "/user",
  graphqlHTTP({ schema: userSchema, rootValue: userResolver, graphiql: true })
);

app.use(
  "/action",
  graphqlHTTP({
    schema: actionSchema,
    rootValue: actionResolver,
    graphiql: true,
  })
);

// Testing only
// app.use(
//   "/sqlQuery",
//   graphqlHTTP({ schema: querySchema, rootValue: queryResolver, graphiql: true })
// );

(async () => {
  app.listen(4000, () => {
    console.log(`App listening at http://localhost:4000`);
  });
})();
