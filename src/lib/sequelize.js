import { Sequelize } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize(
  "sprinto_learning",
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    dialectModule: pg,
  }
);
