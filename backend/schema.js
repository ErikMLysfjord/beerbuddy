const { buildSchema, GraphQLScalarType, Kind } = require('graphql');

// Creates type Any for testing purposes
const AnyType = new GraphQLScalarType({
  name: 'Any',
  description: 'Any type',
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
  }
});

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
  querySchema
};
