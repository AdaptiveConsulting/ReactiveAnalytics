import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"

import { getUri, getWebsocketUri } from "@/helpers/uriHelper"

const cache = new InMemoryCache()

const wsLink = new WebSocketLink({
  uri: getWebsocketUri("/graphql"),
  options: {
    reconnect: true,
  },
})

const httpLink = new HttpLink({
  uri: getUri("/graphql"),
})

const links = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  link: from([links]),
})

export default client
