const client = require("./db.js");

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
  comments: async ({ id, size, start }) => {
    return await sqlQuery(
      `SELECT 
        comments.comment_text, 
        comments.created_at, 
        users.username 
      FROM comments 
      JOIN users 
      ON comments.user_id = users.id 
      WHERE comments.beer_id = ${id} 
      ORDER BY created_at DESC
      LIMIT ${size} OFFSET ${start || 0};`
    );
  },
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
        comments.comment_count
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
            COUNT(comment_text) AS comment_count
        FROM comments 
        JOIN users ON comments.user_id = users.id
        GROUP BY beer_id
    ) AS comments ON beers.id = comments.beer_id 
    WHERE beers.id = ${id};
    `);
  },
  beers: async ({
    size,
    start,
    userId,
    sort,
    search,
    minAbv,
    maxAbv,
    minIbu,
    maxIbu,
    styles,
  }) => {
    const minAbvs = minAbv || 0;
    const maxAbvs = maxAbv || 40;

    const minIbus = minIbu || 0;
    const maxIbus = maxIbu || 140;

    const minAbvProsent = minAbvs / 100;
    const maxAbvProsent = maxAbvs / 100;

    const otherStyles = [
      "Cider",
      "German Pilsener",
      "American Black Ale",
      "Märzen / Oktoberfest",
      "American Amber / Red Lager",
      "Cream Ale",
      "Czech Pilsener",
      "American Pilsner",
      "Belgian Pale Ale",
      "Pumpkin Ale",
      "Munich Helles Lager",
      "Vienna Lager",
      "Extra Special / Strong Bitter (ESB)",
      "Scottish Ale",
      "Belgian IPA",
      "English Brown Ale",
      "American Adjunct Lager",
      "Oatmeal Stout",
      "Rye Beer",
      "Winter Warmer",
      "Scotch Ale / Wee Heavy",
      "American Strong Ale",
      "Altbier",
      "English India Pale Ale (IPA)",
      "English Pale Ale",
      "Irish Red Ale",
      "Light Lager",
      "American White IPA",
      "Berliner Weissbier",
      "Belgian Dark Ale",
      "Russian Imperial Stout",
      "Tripel",
      "Milk / Sweet Stout",
      "Gose",
      "Herbed / Spiced Beer",
      "Schwarzbier",
      "American Double / Imperial Stout",
      "Bock",
      "American Dark Wheat Ale",
      "Belgian Strong Pale Ale",
      "Bière de Garde",
      "Doppelbock",
      "American Wild Ale",
      "English Dark Mild Ale",
      "Foreign / Export Stout",
      "Belgian Strong Dark Ale",
      "California Common / Steam Beer",
      "Dortmunder / Export Lager",
      "Baltic Porter",
      "Mead",
      "Dubbel",
      "Maibock / Helles Bock",
      "",
      "Euro Dark Lager",
      "Irish Dry Stout",
      "Quadrupel (Quad)",
      "Munich Dunkel Lager",
      "Dunkelweizen",
      "English Strong Ale",
      "Radler",
      "English Pale Mild Ale",
      "Keller Bier / Zwickel Bier",
      "Chile Beer",
      "American Barleywine",
      "English Barleywine",
      "American India Pale Lager",
      "Shandy",
      "English Bitter",
      "Euro Pale Lager",
      "Rauchbier",
      "American Double / Imperial Pilsner",
      "Abbey Single Ale",
      "English Stout",
      "Old Ale",
      "Roggenbier",
      "Grisette",
      "Other",
      "Smoked Beer",
      "Kristalweizen",
      "Braggot",
      "American Malt Liquor",
      "Flanders Oud Bruin",
      "Low Alcohol Beer",
      "Flanders Red Ale",
      "Wheat Ale",
    ];

    const beerStyles = styles || [];

    if (beerStyles.includes("Other")) {
      beerStyles.push(...otherStyles);
    }

    const searchQuery = search || "";

    const sorting = sort
      ? sort === "low"
        ? "vote_sum ASC"
        : sort === "atoz"
        ? "beer_name ASC"
        : sort === "ztoa"
        ? "beer_name DESC"
        : "vote_sum DESC"
      : "vote_sum DESC";

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
      WHERE
          beers.abv > ${minAbvProsent} AND beers.abv < ${maxAbvProsent} AND
          beers.ibu > ${minIbus} AND beers.ibu < ${maxIbus} AND
          beers.name LIKE '%${searchQuery}%'
          ${
            beerStyles.length > 0
              ? `AND beers.style IN (${beerStyles
                  .map((style) => `'${style}'`)
                  .join(", ")})`
              : ""
          }
      GROUP BY 
        beers.id,
        beers.name, 
        breweries.name,
        beers.id
      ORDER BY
        ${sorting},
        beer_name ASC,
        beer_id
      LIMIT ${size} OFFSET ${start};
      `
    );
  },
};

const userResolver = {
  login: ({ username }) => {
    return sqlQuery(
      `SELECT id FROM users WHERE username = '${username}' LIMIT 1;`
    );
  },

  signUp: async ({ username, uuid }) => {
    const userExists = await sqlQuery(
      `SELECT id FROM users WHERE username = '${username}' LIMIT 1;`
    );
    if (userExists.length > 0) {
      throw new Error("Username already exists");
    }

    const res = await sqlQuery(
      `INSERT INTO users (username, id) VALUES ('${username}', '${uuid}') RETURNING id;`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }

    return res[0].id;
  },

  updateUser: async ({ userId, username }) => {
    const userExists = await sqlQuery(
      `SELECT id FROM users WHERE username = '${username}' LIMIT 1;`
    );
    if (userExists.length > 0) {
      throw new Error("Username already exists");
    }
    const user = await sqlQuery(
      `SELECT id FROM users WHERE id = '${userId}' LIMIT 1;`
    );
    if (user.length === 0) {
      throw new Error("User does not exist");
    }
    const res = sqlQuery(
      `UPDATE users SET username = '${username}' WHERE id = '${userId}';`
    );

    return "You updated your user!";
  },

  deleteUser: async ({ userId }) => {
    const user = await sqlQuery(
      `SELECT id FROM users WHERE id = '${userId}' LIMIT 1;`
    );
    if (user.length === 0) {
      throw new Error("User does not exist");
    }
    const res = sqlQuery(`DELETE FROM users WHERE id = '${userId}';`);
    return "You deleted your user!";
  },

  loginOrSignUp: async ({ username, uuid }) => {
    const userExists = await sqlQuery(
      `SELECT id FROM users WHERE username = '${username}' LIMIT 1;`
    );
    if (userExists.length > 0) {
      return { id: userExists[0].id, isNewUser: "no" };
    }

    const res = await sqlQuery(
      `INSERT INTO users (username, id) VALUES ('${username}', '${uuid}') RETURNING id;`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }

    return { id: res[0].id, isNewUser: "yes" };
  },
};

const actionResolver = {
  react: async ({ userId, beerId, action }) => {
    if (!["upvote", "downvote", "unreact"].includes(action)) {
      throw new Error("Invalid action");
    }

    const user = await sqlQuery(
      `SELECT id FROM users WHERE id = '${userId}' LIMIT 1;`
    );
    if (user.length === 0) {
      throw new Error("User does not exist");
    }

    const userReaction = await sqlQuery(
      `SELECT vote_type FROM votes WHERE user_id = '${userId}' AND beer_id = ${beerId} LIMIT 1;`
    );
    if (userReaction.length > 0) {
      if (userReaction[0].vote_type === action) {
        throw new Error("User has already reacted");
      }
      const res = await sqlQuery(
        `UPDATE votes SET vote_type = '${action}' WHERE user_id = '${userId}' AND beer_id = ${beerId};`
      );
      return "You reacted!";
    }

    const res = await sqlQuery(
      `INSERT INTO votes (user_id, beer_id, vote_type) VALUES ('${userId}', ${beerId}, '${action}');`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }

    return "You reacted!";
  },

  comment: async ({ userId, beerId, comment }) => {
    const res = await sqlQuery(
      `INSERT INTO comments (user_id, beer_id, comment_text) VALUES ('${userId}', ${beerId}, '${comment}');`
    );

    if (res === "Error in query") {
      throw new Error("Error in query");
    }
    return "You commented!";
  },
};

const queryResolver = {
  query: ({ query }) => {
    return sqlQuery(query);
  },
};

module.exports = {
  beerResolver,
  queryResolver,
  userResolver,
  actionResolver,
};
