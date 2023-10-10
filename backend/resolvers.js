const fs = require("fs");
const csv = require("csv-parser");

const beerResolver = {
  beerName: ({ id }) => {
    // query beers.csv, not json, for a beer name:
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream("public/beers.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          const beer = results.find((beer) => beer.id == id);
          if (beer) {
            resolve(beer.name);
          } else {
            reject(new Error(`Beer with ID ${id} not found`));
          }
        });
    });
  },
  beers: ({ size, start }) => {
    // query beers.csv, not json, for a beer name:
    return new Promise((resolve, reject) => {
      const startFrom = start || 0;
      const endAt = startFrom + size;
      const results = [];
      fs.createReadStream("public/beers.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          if (size) {
            resolve(results.slice(startFrom, endAt).map((beer) => beer.name));
          } else {
            resolve(results.map((beer) => beer.name));
          }
        });
    });
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


module.exports = {
  beerResolver,
  loginResolver,
  signUpResolver,
  reactResolver,
  commentResolver,
  updateUserResolver,
  deleteUserResolver
};
