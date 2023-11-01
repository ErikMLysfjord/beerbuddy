const { graphqlHTTP } = require("express-graphql");
const {
  beerSchema,
  querySchema,
  userSchema,
  actionSchema,
} = require("./schema");
const {
  beerResolver,
  queryResolver,
  userResolver,
  actionResolver,
} = require("./resolvers");

const { Client } = require("pg");
const express = require("express");

const app = express();

// Allow CORS
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,token");
  next();
};

app.use(allowCrossDomain);

// Connect to postgres database
const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

// Access static files from backend
app.use(express.static("public"));

app.use(
  "/beer",
  graphqlHTTP({
    schema: beerSchema,
    rootValue: beerResolver,
    graphiql: true,
  })
);

app.use(
  "/user",
  graphqlHTTP({
    schema: userSchema,
    rootValue: userResolver,
    graphiql: true,
  })
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
app.use(
  "/sqlQuery",
  graphqlHTTP({
    schema: querySchema,
    rootValue: queryResolver,
    graphiql: true,
  })
);

(async () => {
  await client.connect();

  app.listen(4000, () => {
    console.log(`Example app listening at http://localhost:4000`);
  });
})();
