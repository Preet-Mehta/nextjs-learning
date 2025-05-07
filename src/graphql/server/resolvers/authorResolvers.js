import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthoredBooks,
  getAuthors,
  updateAuthor,
  getAuthorNames,
} from "@/db/author";

export default {
  Query: {
    authors: async (_, args) => await getAuthors(args),
    author: async (_, args) => await getAuthorById(args.id),
    authorNames: async () => await getAuthorNames(),
  },

  Author: {
    books: async (parent) => await getAuthoredBooks(parent.id),
  },

  Mutation: {
    addAuthor: async (_, args) => await createAuthor(args.author),
    deleteAuthor: async (_, args) => await deleteAuthor(args.id),
    updateAuthor: async (_, args) => await updateAuthor(args.id, args.author),
  },
};
