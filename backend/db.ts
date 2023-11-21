import { Sequelize } from "sequelize";

// setup connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  logging: false,
});

export default sequelize;
