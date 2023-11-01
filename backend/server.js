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
  loginOrSignUpSchema,
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
  loginOrSignUpResolver,
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
  "/sqlQuery",
  graphqlHTTP({
    schema: querySchema,
    rootValue: queryResolver,
    graphiql: true,
  })
);

app.use(
  "/loginorsignup",
  graphqlHTTP({
    schema: loginOrSignUpSchema,
    rootValue: loginOrSignUpResolver,
    graphiql: true,
  })
)

app.use(
  "/login",
  graphqlHTTP({
    schema: loginSchema,
    rootValue: loginResolver,
    graphiql: true,
  })
);

app.use(
  "/signup",
  graphqlHTTP({
    schema: signUpSchema,
    rootValue: signUpResolver,
    graphiql: true,
  })
);

app.use(
  "/react",
  graphqlHTTP({
    schema: reactSchema,
    rootValue: reactResolver,
    graphiql: true,
  })
);

app.use(
  "/comment",
  graphqlHTTP({
    schema: commentSchema,
    rootValue: commentResolver,
    graphiql: true,
  })
);

app.use(
  "/updateuser",
  graphqlHTTP({
    schema: updateUserSchema,
    rootValue: updateUserResolver,
    graphiql: true,
  })
);

app.use(
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
