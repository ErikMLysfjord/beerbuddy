const { Client } = require("pg");

// Connect to postgres database
const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

module.exports = client;
