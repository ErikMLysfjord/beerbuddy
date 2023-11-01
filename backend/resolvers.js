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
  beer: async ({ id }) => {
    return await sqlQuery(`
    SELECT 
        beers.abv, 
        beers.ibu, 
        beers.name, 
        beers.style, 
        beers.ounces, 
        beers.id, 
        breweries.name AS brewery_name, 
        rating.rating, 
        rating.vote_count, 
        comments.comments
    FROM beers 
    JOIN breweries ON beers.brewery_id = breweries.id 
    LEFT JOIN (
        SELECT 
            beer_id, 
            SUM(CASE WHEN vote_type = 'upvote' THEN 1 WHEN vote_type = 'downvote' THEN -1 ELSE 0 END) AS rating, 
            COUNT(CASE WHEN vote_type IN ('upvote', 'downvote') THEN 1 ELSE NULL END) AS vote_count
        FROM votes 
        GROUP BY beer_id
    ) AS rating ON beers.id = rating.beer_id 
    LEFT JOIN (
        SELECT 
            beer_id, 
            ARRAY_AGG((comment_text, created_at, username) ORDER BY created_at DESC) AS comments
        FROM comments 
        JOIN users ON comments.user_id = users.id
        GROUP BY beer_id
    ) AS comments ON beers.id = comments.beer_id 
    WHERE beers.id = ${id};
    `);
  },
  beers: async ({ size, start, userId }) => {
    return await sqlQuery(
      `
      SELECT 
        beers.id AS beer_id,
        beers.name AS beer_name, 
        breweries.name AS brewery_name, 
        beers.id AS beer_id,
        SUM(CASE WHEN votes.vote_type = 'upvote' THEN 1 WHEN votes.vote_type = 'downvote' THEN -1 ELSE 0 END) AS vote_sum,
        COALESCE((SELECT vote_type FROM votes JOIN users ON votes.user_id = users.id WHERE users.id = '${userId}' AND votes.beer_id = beers.id), 'unreact') AS reaction
      FROM 
        beers
      JOIN 
        breweries ON beers.brewery_id = breweries.id
      LEFT JOIN 
          votes ON beers.id = votes.beer_id
      GROUP BY 
        beers.id,
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
    return sqlQuery(
      `SELECT id FROM users WHERE username = '${username}' LIMIT 1;`
    );
  },
};

const signUpResolver = {
  signUp: async ({ username }) => {
    const userExists = await sqlQuery(
      `SELECT id FROM users WHERE username = '${username}' LIMIT 1;`
    );
    if (userExists.length > 0) {
      throw new Error("Username already exists");
    }

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
  react: async ({ userId, beerId, action }) => {
    if (!["upvote", "downvote", "unreact"].includes(action)) {
      throw new Error("Invalid action");
    }

    const user = await sqlQuery(
      `SELECT id FROM users WHERE id = ${userId} LIMIT 1;`
    );
    if (user.length === 0) {
      throw new Error("User does not exist");
    }

    const userReaction = await sqlQuery(
      `SELECT vote_type FROM votes WHERE user_id = ${userId} AND beer_id = ${beerId} LIMIT 1;`
    );
    if (userReaction.length > 0) {
      if (userReaction[0].vote_type === action) {
        throw new Error("User has already reacted");
      }
      const res = await sqlQuery(
        `UPDATE votes SET vote_type = '${action}' WHERE user_id = ${userId} AND beer_id = ${beerId};`
      );
      return "You reacted!";
    }

    const res = await sqlQuery(
      `INSERT INTO votes (user_id, beer_id, vote_type) VALUES (${userId}, ${beerId}, '${action}');`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }

    return "You reacted!";
  },
};

const commentResolver = {
  comment: async ({ userId, beerId, comment }) => {
    const res = await sqlQuery(
      `INSERT INTO comments (user_id, beer_id, comment_text) VALUES (${userId}, ${beerId}, '${comment}');`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }
    return "You commented!";
  },
};

const updateUserResolver = {
  updateUser: async ({ userId, username }) => {
    const userExists = await sqlQuery(
      `SELECT id FROM users WHERE username = '${username}' LIMIT 1;`
    );
    if (userExists.length > 0) {
      throw new Error("Username already exists");
    }
    const user = await sqlQuery(
      `SELECT id FROM users WHERE id = ${userId} LIMIT 1;`
    );
    if (user.length === 0) {
      throw new Error("User does not exist");
    }
    const res = sqlQuery(
      `UPDATE users SET username = '${username}' WHERE id = ${userId};`
    );

    return "You updated your user!";
  },
};

const deleteUserResolver = {
  deleteUser: async ({ userId }) => {
    const user = await sqlQuery(
      `SELECT id FROM users WHERE id = ${userId} LIMIT 1;`
    );
    if (user.length === 0) {
      throw new Error("User does not exist");
    }
    const res = sqlQuery(`DELETE FROM users WHERE id = ${userId};`);
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
