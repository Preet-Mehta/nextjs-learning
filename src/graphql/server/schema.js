import { mergeTypeDefs } from "@graphql-tools/merge";

import bookTypeDefs from "./schema/bookSchema.js";
import authorTypeDefs from "./schema/authorSchema.js";
import ratingTypeDefs from "./schema/ratingSchema.js";

const baseTypeDefs = `
  type Query
  type Mutation
`;

export default mergeTypeDefs([
  baseTypeDefs,
  bookTypeDefs,
  authorTypeDefs,
  ratingTypeDefs,
]);
