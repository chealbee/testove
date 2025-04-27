import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://europe-west1-lasertag-test.cloudfunctions.net/graphql/PEXwvC",
  }),
  cache: new InMemoryCache(),
});

export default client;
