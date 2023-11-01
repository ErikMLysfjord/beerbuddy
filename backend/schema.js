const { buildSchema, GraphQLScalarType, Kind } = require("graphql");

// Creates type Any for testing purposes
const AnyType = new GraphQLScalarType({
  name: "Any",
  description: "Any type",
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT:
        throw new Error(`Not sure how to parse object: ${ast}`);
      default:
        return null;
    }
  },
});

const beerSchema = buildSchema(`
  scalar Any

  type Query {
    beer(id: Int! ): Any
    beers(size: Int! start: Int userId: Int! filters: Any sort: Any search: String): Any
  }
`);

const loginSchema = buildSchema(`
  scalar Any

  type Query {
    login(username: String!): Any
  }
`);

const signUpSchema = buildSchema(`
  type Query {
    signUp(username: String!): Int
  }
`);

const reactSchema = buildSchema(`
  type Query {
    react(userId: Int! beerId: Int! action: String!): String
  }
`);

const commentSchema = buildSchema(`
  type Query {
    comment(userId: Int! beerId: Int! comment: String!): String
  }
`);

const updateUserSchema = buildSchema(`
  type Query {
    updateUser(userId: Int! username: String!): String
  }
`);

const deleteUserSchema = buildSchema(`
  type Query {
    deleteUser(userId: Int!): String
  }
`);

const loginOrSignUpSchema = buildSchema(`
  type Query {
    loginOrSignUp(username: String!): Int
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
  loginSchema,
  signUpSchema,
  reactSchema,
  commentSchema,
  updateUserSchema,
  deleteUserSchema,
  querySchema,
  loginOrSignUpSchema,
};
