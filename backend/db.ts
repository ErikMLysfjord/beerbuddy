import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

// setup connection
const sequelize = new Sequelize(
  process.env.DATABASE === "sqlite3"
    ? {
        dialect: "sqlite",
        storage: "./database.db",
        logging: false,
      }
    : {
        dialect: "mysql",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME || "beers",
        logging: false,
      },
);

export default sequelize;
