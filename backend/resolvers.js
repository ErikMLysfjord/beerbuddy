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
  beer: ({ id }) => {
    return sqlQuery(`
      SELECT 
        beers.abv, 
        beers.ibu, 
        beers.name, 
        beers.style, 
        beers.ounces, 
        beers.id, 
        breweries.name AS brewery_name, 
        SUM(CASE WHEN votes.vote_type = 'upvote' THEN 1 WHEN votes.vote_type = 'downvote' THEN -1 ELSE 0 END) AS rating, 
        COUNT(CASE WHEN votes.vote_type IN ('upvote', 'downvote') THEN 1 ELSE NULL END) AS vote_count, 
        ARRAY_AGG((comments.comment_text, comments.created_at, users.username) ORDER BY comments.created_at DESC) AS comments 
      FROM beers 
      JOIN breweries ON beers.brewery_id = breweries.id 
      LEFT JOIN votes ON beers.id = votes.beer_id 
      LEFT JOIN comments ON beers.id = comments.beer_id 
      LEFT JOIN users ON comments.user_id = users.id
      WHERE beers.id = ${id} 
      GROUP BY beers.id, breweries.name;
    `);
  },
  beers: ({ size, start }) => {
    return sqlQuery(
      `
      SELECT 
        beers.name AS beer_name, 
        breweries.name AS brewery_name, 
        beers.id AS beer_id,
        SUM(CASE WHEN votes.vote_type = 'upvote' THEN 1 WHEN votes.vote_type = 'downvote' THEN -1 ELSE 0 END) AS vote_sum,
        COALESCE((SELECT vote_type FROM votes JOIN users ON votes.user_id = users.id WHERE users.username = 'admin' AND votes.beer_id = beers.id), 'unreact') AS admin_reaction
      FROM 
        beers
      JOIN 
        breweries ON beers.brewery_id = breweries.id
      LEFT JOIN 
          votes ON beers.id = votes.beer_id
      GROUP BY 
        beers.name, 
        breweries.name,
        beers.id
      LIMIT ${size} OFFSET ${start};
      `
    );
  },
};

const loginResolver = {
  login: ({ username }) => {
    // Does something to username and password
    return "You are logged in!";
  },
};

const signUpResolver = {
  signUp: async ({ username }) => {
    const res = await sqlQuery(
      `INSERT INTO users (username) VALUES ('${username}') RETURNING id;`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }

    return res[0].id;
  },
};

const reactResolver = {
  react: ({ userId, beerId, action }) => {
    if (!["upvote", "downvote", "unreact"].includes(action)) {
      throw new Error("Invalid action");
    }
    const res = sqlQuery(
      `INSERT INTO votes (user_id, beer_id, vote_type) VALUES (${userId}, ${beerId}, '${action}');`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }

    return "You reacted!";
  },
};

const commentResolver = {
  comment: ({ userId, beerId, comment }) => {
    const res = sqlQuery(
      `INSERT INTO comments (user_id, beer_id, comment_text) VALUES (${userId}, ${beerId}, '${comment}');`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }
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
