const { Client } = require("pg");
const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

const sqlQuery = async (query) => {
  if (!client._connected) {
    await client.connect();
  }

  const results = await client
    .query(query)
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      return "Error in query";
    });

  // console.log("results", results);
  return results;
};

const beerResolver = {
  beerName: ({ id }) => {
    // Does something to id
    return "Beer id: " + id;
  },
  beers: ({ size, start }) => {
    // Does something to size and start
    const result = sqlQuery(
      `
      SELECT 
        beers.name AS beer_name, 
        breweries.name AS brewery_name, 
        SUM(CASE WHEN votes.vote_type = 'upvote' THEN 1 WHEN votes.vote_type = 'downvote' THEN -1 ELSE 0 END) AS vote_sum
      FROM 
        beers
      JOIN 
        breweries ON beers.brewery_id = breweries.id
      LEFT JOIN 
        votes ON beers.id = votes.beer_id
      GROUP BY 
        beers.name, 
        breweries.name
      LIMIT ${size} OFFSET ${start};
      `
    );
    return result;
  },
};

const loginResolver = {
  login: ({ username }) => {
    // Does something to username and password
    return "You are logged in!";
  },
};

const signUpResolver = {
  signUp: ({ username }) => {
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
  updateUser: ({ username }) => {
    // Does something to username and password
    return "You updated your user!";
  },
};

const deleteUserResolver = {
  deleteUser: ({ username }) => {
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
