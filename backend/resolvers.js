const { Client } = require("pg");
const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

const sqlQuery = async (query) => {
  await client.connect();
  const results = await client
    .query(query)
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      return "Error in query";
    });
  return results;
}

const beerResolver = {
  beerName: ({ id }) => {
    // Does something to id
    return "Beer id: " + id;
  },
  beers: ({ size, start }) => {
    // Does something to size and start
    return ["Beers size: " + size + " start: " + start];
  },
};

const loginResolver = {
  login: ({ username, password }) => {
    // Does something to username and password
    return "You are logged in!";
  },
};

const signUpResolver = {
  signUp: ({ username, password }) => {
    // Does something to username and password
    return "You are signed up!";
  },
};

const reactResolver = {
  react: ({ id, action }) => {
    // Does something to id and action
    return "You reacted!";
  },
};

const commentResolver = {
  comment: ({ id, comment }) => {
    // Does something to id and comment
    return "You commented!";
  },
};

const updateUserResolver = {
  updateUser: ({ username, password }) => {
    // Does something to username and password
    return "You updated your user!";
  },
};

const deleteUserResolver = {
  deleteUser: ({ username, password }) => {
    // Does something to username and password
    return "You deleted your user!";
  },
};

const queryResolver = {
  query: ({ query }) => {
    return sqlQuery(query);
  },
};

module.exports = {
  beerResolver,
  loginResolver,
  signUpResolver,
  reactResolver,
  commentResolver,
  updateUserResolver,
  deleteUserResolver,
  queryResolver,
};
