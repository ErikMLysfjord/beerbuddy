const { graphqlHTTP } = require("express-graphql");
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

// Allow CORS
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,token");
  next();
};

const client = require("./db.js");
app.use(allowCrossDomain);

// Access static files from backend
app.use(express.static("public"));

app.use(
  "/beer",
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
  await client.connect();

  app.listen(4000, () => {
    console.log(`App listening at http://localhost:4000`);
  });
})();
