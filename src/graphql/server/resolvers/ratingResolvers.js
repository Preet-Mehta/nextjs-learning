import { createRating, getRatingsForBook } from "@/db/rating";

const ratingResolvers = {
  Query: {
    rating: async (_, args) => await getRatingsForBook(args.book_id),
  },

  Mutation: {
    addRating: async (_, args) => await createRating(args.rating),
  },
};

export default ratingResolvers;
