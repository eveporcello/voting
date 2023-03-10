import {
  InMemoryCache,
  HttpLink,
  ApolloClient,
  split,
} from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: "https://host-election.fly.dev/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://host-election.fly.dev/graphql",
  options: {
    reconnect: true,
    lazy: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === "OperationDefinition" &&
      operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export default new ApolloClient({ cache, link });
