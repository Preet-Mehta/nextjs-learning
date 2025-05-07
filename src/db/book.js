import { Book } from "@/models/book";

export async function getBooks() {
  return await Book.findAll();
}

export async function getBookById(id) {
  return await Book.findByPk(id);
}

export async function getBookAuthor(id) {
  const book = await Book.findByPk(id);
  return await book.getAuthor();
}
