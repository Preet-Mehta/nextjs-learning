import { mergeResolvers } from "@graphql-tools/merge";

import bookResolvers from "./resolvers/bookResolvers.js";
import authorResolvers from "./resolvers/authorResolvers.js";
import ratingResolvers from "./resolvers/ratingResolvers.js";

export default mergeResolvers([
  bookResolvers,
  authorResolvers,
  ratingResolvers,
]);
