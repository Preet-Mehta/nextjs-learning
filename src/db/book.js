import { Book } from "@/models/book";
import { Op } from "sequelize";

export async function getBooks({
  offset = 0,
  limit = 9,
  title,
  published_date,
}) {
  const params = {
    offset,
    limit,
    order: [["published_date", "DESC"]],
  };

  const where = {};
  if (title) where.title = { [Op.iLike]: `%${title}%` };
  if (published_date) where.published_date = published_date;
  if (Object.keys(where).length > 0) params.where = where;

  const { rows, count } = await Book.findAndCountAll(params);
  return { books: rows, totalCount: count };
}

export async function getBookById(id) {
  return await Book.findByPk(id);
}

export async function getBookAuthor(id) {
  const book = await Book.findByPk(id);
  return await book.getAuthor();
}

export async function createBook(bookParams) {
  try {
    return await Book.create(bookParams);
  } catch (error) {
    console.log(`Failed to add Book: ${error}`);
  }
}

export async function deleteBook(id) {
  try {
    await Book.destroy({ where: { id } });
  } catch (error) {
    console.log(`Failed to delete Book: ${error}`);
  }
}

export async function updateBook(id, bookParams) {
  console.log(bookParams);

  try {
    return await Book.update({ ...bookParams }, { where: { id } });
  } catch (error) {
    console.log(`Failed to update Book: ${error}`);
  }
}
