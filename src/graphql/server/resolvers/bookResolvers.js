import {
  createBook,
  deleteBook,
  getBookAuthor,
  getBookById,
  getBooks,
  updateBook,
} from "@/db/book";
import { getRatingsForBook } from "@/db/rating";

const bookResolvers = {
  Query: {
    books: async (_, args) => await getBooks(args),
    book: async (_, args) => getBookById(args.id),
  },

  Book: {
    author: async (parent) => await getBookAuthor(parent.id),
    rating: async (parent) => await getRatingsForBook(parent.id),
  },

  Mutation: {
    addBook: async (_, args) => await createBook(args.book),
    deleteBook: async (_, args) => await deleteBook(args.id),
    updateBook: async (_, args) => await updateBook(args.id, args.book),
  },
};

export default bookResolvers;
