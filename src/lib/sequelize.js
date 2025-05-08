import { Sequelize } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    dialect: "postgres",
    dialectModule: pg,
  }
);
