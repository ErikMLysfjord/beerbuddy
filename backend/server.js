const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  beerSchema,
  loginSchema,
  signUpSchema,
  reactSchema,
  commentSchema,
  updateUserSchema,
  deleteUserSchema
} = require("./schema");
const {
  beerResolver,
  loginResolver,
  signUpResolver,
  reactResolver,
  commentResolver,
  updateUserResolver,
  deleteUserResolver
} = require("./resolvers");

// Create an express server and a GraphQL endpoint
const app = express();

// Access static files from backend
app.use(express.static("public"));

app.get(
  "/beer",
  graphqlHTTP({
    schema: beerSchema,
    rootValue: beerResolver,
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

// Start the server
app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/");
});
