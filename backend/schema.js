const { buildSchema } = require("graphql");

const beerSchema = buildSchema(`
  type Query {
    beerName(id: Int!): String
    beers(size: Int! start: Int): [String]
  }
`);

const loginSchema = buildSchema(`
  type Query {
    login(username: String! password: String!): String
  }
`);

const signUpSchema = buildSchema(`
  type Query {
    signUp(username: String! password: String!): String
  }
`);

const reactSchema = buildSchema(`
  type Query {
    react(id: Int! action: String!): String
  }
`);

const commentSchema = buildSchema(`
  type Query {
    comment(id: Int! comment: String!): String
  }
`);

const updateUserSchema = buildSchema(`
  type Query {
    updateUser(username: String! password: String!): String
  }
`);

const deleteUserSchema = buildSchema(`
  type Query {
    deleteUser(username: String! password: String!): String
  }
`);


module.exports = {
  beerSchema,
  loginSchema,
  signUpSchema,
  reactSchema,
  commentSchema,
  updateUserSchema,
  deleteUserSchema
};
