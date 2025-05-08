import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/sequelize";

export const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  published_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Authors",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});
