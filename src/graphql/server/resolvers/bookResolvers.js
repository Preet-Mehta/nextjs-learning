import { getBookAuthor, getBookById, getBooks } from "@/db/book";

export default {
  Query: {
    books: async () => await getBooks(),
    book: async (_, args) => getBookById(args.id),
  },

  Book: {
    author: async (parent) => await getBookAuthor(parent.id),
  },

  // Mutation: {
  //   addBook: (_, args) => BOOKS.push(args.book),
  //   deleteBook: async (_, args) =>
  //     await Book.destroy({ where: { id: args.id } }),
  //   updateBook: async (_, args) =>
  //     await Book.update({ ...args.book }, { where: { id: args.id } }),

  //   addAuthor: async (_, args) => await Author.create(args.author),
  //   deleteAuthor: async (_, args) =>
  //     await Author.destroy({ where: { id: args.id } }),
  //   updateAuthor: async (_, args) =>
  //     await Author.update({ ...args.author }, { where: { id: args.id } }),
  // },
};

// import { Book, Author } from "../models/index.js";

// export const resolvers = {
//   Query: {
//     books: async () => await Book.findAll(),
//     book: async (_, args) => await Book.findByPk(args.id),
//     authors: async () => await Author.findAll(),
//     author: async (_, args) => await Author.findByPk(args.id),
//   },

//   Book: {
//     author: async (parent) => {
//       const book = await Book.findByPk(parent.id);
//       return await book.getAuthor();
//     },
//   },
//   Author: {
//     books: async (parent) => {
//       const author = await Author.findByPk(parent.id);
//       return await author.getBooks();
//     },
//   },

//   Mutation: {
//     addBook: async (_, args) => await Book.create(args.book),
//     deleteBook: async (_, args) =>
//       await Book.destroy({ where: { id: args.id } }),
//     updateBook: async (_, args) =>
//       await Book.update({ ...args.book }, { where: { id: args.id } }),

//     addAuthor: async (_, args) => await Author.create(args.author),
//     deleteAuthor: async (_, args) =>
//       await Author.destroy({ where: { id: args.id } }),
//     updateAuthor: async (_, args) =>
//       await Author.update({ ...args.author }, { where: { id: args.id } }),
//   },
// };
