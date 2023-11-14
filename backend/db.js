const { Sequelize } = require("sequelize");

// setup connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  logging: false,
});

module.exports = sequelize;
