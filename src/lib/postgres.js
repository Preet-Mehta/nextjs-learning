import { sequelize } from "@/lib/sequelize";
import models from "@/models";
import { BOOKS, AUTHORS } from "./data";

export const connectToPostgres = async () => {
  const { Author, Book } = models;

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // Initiialize data (seed) if database is empty
    const [authorCount, bookCount] = await Promise.all([
      Author.count(),
      Book.count(),
    ]);
    if (!authorCount || !bookCount) {
      AUTHORS.map((author) => Author.create(author));
      BOOKS.map((book) => Book.create(book));
    }
  } catch (error) {
    console.error("Unable to connect to Postgresql database:", error);
    process.exit(1);
  }

  console.log("Connection with Postgresql has been established successfully.");
};
