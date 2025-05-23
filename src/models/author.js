import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/sequelize";

export const Author = sequelize.define("Author", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  born_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});
