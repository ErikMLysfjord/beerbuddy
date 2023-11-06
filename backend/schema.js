const { buildSchema } = require("graphql");

const beerSchema = buildSchema(`
  scalar Any

  type Query {
    beer(id: Int! ): Any
    beers(size: Int! start: Int userId: Int! filters: Any sort: Any search: String): Any
  }
`);

const userSchema = buildSchema(`
  scalar Any

  type Query {
    login(username: String!): Any
    signUp(username: String!): Int
    updateUser(userId: Int! username: String!): String
    deleteUser(userId: Int!): String
    loginOrSignUp(username: String!): Int
  }
`);

const actionSchema = buildSchema(`
  type Query {
    react(userId: Int! beerId: Int! action: String!): String
    comment(userId: Int! beerId: Int! comment: String!): String
  }
`);

const querySchema = buildSchema(`
  scalar Any

  type Query {
    query(query: String!): Any
  }
`);

module.exports = {
  beerSchema,
  querySchema,
  userSchema,
  actionSchema,
};
