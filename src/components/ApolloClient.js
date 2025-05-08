"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: `http://${process.env.VERCEL_URL}/api/graphql`,
  cache: new InMemoryCache(),
});

export default function ApolloClientProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
