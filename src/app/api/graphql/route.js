import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";

import typeDefs from "@/graphql/server/schema";
import resolvers from "@/graphql/server/resolvers";
import models from "@/models";
import { connectToPostgres } from "@/lib/postgres";

// Connect Postgresql database
await connectToPostgres();

// Setup Apollo GraphQL server
const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ models }),
});

export { handler as GET, handler as POST };
