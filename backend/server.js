const { graphqlHTTP } = require("express-graphql");
const {
  beerSchema,
  loginSchema,
  signUpSchema,
  reactSchema,
  commentSchema,
  updateUserSchema,
  deleteUserSchema,
  querySchema,
} = require("./schema");
const {
  beerResolver,
  loginResolver,
  signUpResolver,
  reactResolver,
  commentResolver,
  updateUserResolver,
  deleteUserResolver,
  queryResolver,
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

app.post(
  "/beer",
  graphqlHTTP({
    schema: beerSchema,
    rootValue: beerResolver,
    graphiql: true,
  })
);

app.get(
  "/sqlQuery",
  graphqlHTTP({
    schema: querySchema,
    rootValue: queryResolver,
    graphiql: true,
  })
);

app.post(
  "/login",
  graphqlHTTP({
    schema: loginSchema,
    rootValue: loginResolver,
    graphiql: true,
  })
);

app.post(
  "/signup",
  graphqlHTTP({
    schema: signUpSchema,
    rootValue: signUpResolver,
    graphiql: true,
  })
);

app.post(
  "/react",
  graphqlHTTP({
    schema: reactSchema,
    rootValue: reactResolver,
    graphiql: true,
  })
);

app.post(
  "/comment",
  graphqlHTTP({
    schema: commentSchema,
    rootValue: commentResolver,
    graphiql: true,
  })
);

app.post(
  "/updateuser",
  graphqlHTTP({
    schema: updateUserSchema,
    rootValue: updateUserResolver,
    graphiql: true,
  })
);

app.post(
  "/deleteuser",
  graphqlHTTP({
    schema: deleteUserSchema,
    rootValue: deleteUserResolver,
    graphiql: true,
  })
);

(async () => {
  await client.connect();

  app.listen(4000, () => {
    console.log(`Example app listening at http://localhost:4000`);
  });
})();
