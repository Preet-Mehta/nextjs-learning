import { Sequelize } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectModule: pg,
  dialect: "postgres",
});
