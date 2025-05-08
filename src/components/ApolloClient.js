"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function ApolloClientProvider({ children, url, nodeEnv }) {
  const backendUri =
    nodeEnv === "development" ? "http://localhost:3000" : `https://${url}`;

  const client = new ApolloClient({
    uri: `${backendUri}/api/graphql`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
