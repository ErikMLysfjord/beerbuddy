import { buildSchema } from "graphql";

/**
 * GraphQL schema for beer-related queries
 */
const beerSchema = buildSchema(`
  scalar Any

  type Query {
    comments(id: Int! size: Int! start: Int ): Any
    beer(id: Int! userId: String!): Any
    beers(size: Int! start: Int userId: String! sort: String search: String minAbv: Int maxAbv: Int minIbu: Int maxIbu: Int styles: Any ): Any
  }
`);

/**
 * GraphQL schema for user-related queries
 */
const userSchema = buildSchema(`
  scalar Any

  type Query {
    login(username: String!): Any
    signUp(username: String!): Any
    updateUser(userId: String! username: String!): String
    deleteUser(userId: String!): String
    loginOrSignUp(username: String! uuid: String!): Any
  }
`);

/**
 * GraphQL schema for action-related queries
 */
const actionSchema = buildSchema(`
  type Query {
    react(userId: String! beerId: Int! action: String!): String
    comment(userId: String! beerId: Int! comment: String!): String
    deleteComment(userId: String! commentId: Int!): String
  }
`);

export { beerSchema, userSchema, actionSchema };
