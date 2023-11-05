//const { graphqlHTTP } = require("express-graphql");
const {
  beerSchema,
  querySchema,
  userSchema,
  actionSchema,
} = require("./schema.js");
const {
  beerResolver,
  queryResolver,
  userResolver,
  actionResolver,
} = require("./resolvers.js");

const { Client } = require("pg");
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const app = express();

/*
// Allow CORS
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,token");
  next();
};

app.use(allowCrossDomain);
*/

const server = new ApolloServer({
  typeDefs: [beerSchema, querySchema, userSchema, actionSchema],
  resolvers: [beerResolver, queryResolver, userResolver, actionResolver],
});

// Connect to postgres database
const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

// Access static files from backend
app.use(express.static("public"));

/*
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
*/

//Q: How do i make the server start before it is used?
//A: Use async/await
//Q: Show how

(async () => {
  await client.connect();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Example app listening at ${url}`);

  /*
  app.use("/", cors(), express.json(), expressMiddleware({ server }));
  app.use("/beer", cors(), express.json(), expressMiddleware({ server }));
  app.use("/user", cors(), express.json(), expressMiddleware({ server }));
  app.use("/action", cors(), express.json(), expressMiddleware({ server }));
  app.use("/sqlQuery", cors(), express.json(), expressMiddleware({ server }));

  app.listen(4000, () => {
    console.log(`Example app listening at http://localhost:4000`);
  });
  */
})();
