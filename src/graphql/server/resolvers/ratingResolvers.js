import { createRating, getRatingsForBook } from "@/db/rating";

export default {
  Query: {
    rating: async (_, args) => await getRatingsForBook(args.book_id),
  },

  Mutation: {
    addRating: async (_, args) => await createRating(args.rating),
  },
};
