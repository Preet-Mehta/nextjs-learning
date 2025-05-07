import { Author } from "@/models/author";

export async function getAuthors() {
  return await Author.findAll();
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
