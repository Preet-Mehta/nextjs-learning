import { Author } from "@/models/author";
import { Op } from "sequelize";

export async function getAuthors({ offset = 0, limit = 9, name, born_date }) {
  const params = {
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  };

  const where = {};
  if (name) where.name = { [Op.iLike]: `%${name}%` };
  if (born_date) where.born_date = born_date;
  if (Object.keys(where).length > 0) params.where = where;

  const { rows, count } = await Author.findAndCountAll(params);
  return { authors: rows, totalCount: count };
}

export async function getAuthorById(id) {
  return await Author.findByPk(id);
}

export async function getAuthoredBooks(id) {
  const author = await Author.findByPk(id);
  return await author.getBooks();
}

export async function createAuthor(authorParams) {
  try {
    return await Author.create(authorParams);
  } catch (error) {
    console.log(`Failed to add Author: ${error}`);
  }
}

export async function deleteAuthor(id) {
  try {
    await Author.destroy({ where: { id } });
  } catch (error) {
    console.log(`Failed to delete Author: ${error}`);
  }
}

export async function updateAuthor(id, authorParams) {
  try {
    return await Author.update({ ...authorParams }, { where: { id } });
  } catch (error) {
    console.log(`Failed to delete Author: ${error}`);
  }
}
