const { graphqlHTTP } = require("express-graphql");
const {
  beerSchema,
  loginSchema,
  signUpSchema,
  reactSchema,
  commentSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("./schema");
const {
  beerResolver,
  loginResolver,
  signUpResolver,
  reactResolver,
  commentResolver,
  updateUserResolver,
  deleteUserResolver,
} = require("./resolvers");


const { Client } = require("pg");
const express = require("express");

const app = express();

// Connect to postgres database
const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

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


app.get("/employees", async (req, res) => {
  const results = await client
    .query("SELECT * FROM employees")
    .then((payload) => {
      console.log("test");
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

(async () => {
  await client.connect();

  app.listen(4000, () => {
    console.log(`Example app listening at http://localhost:4000`);
  });
})();
